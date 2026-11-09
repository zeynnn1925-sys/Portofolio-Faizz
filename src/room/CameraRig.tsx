import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { OVERVIEW_SHOT, ZOOMED_FOV, type CameraShot } from '../data/room';

interface CameraRigProps {
  currentShot: CameraShot | null;
  onResetToOverview: () => void;
  pointerPos: { x: number; y: number };
  isOverview: boolean;
  reducedMotion: boolean;
}

export function CameraRig({
  currentShot,
  onResetToOverview,
  pointerPos,
  isOverview,
  reducedMotion,
}: CameraRigProps) {
  const { camera, size, gl } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(...OVERVIEW_SHOT.target));
  const tweenRef = useRef<gsap.core.Timeline | null>(null);
  const aspectAdjustedZ = useRef(OVERVIEW_SHOT.pos[2]);

  // Orbit drag interaction variables
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const orbitRotation = useRef({ yaw: 0, pitch: 0 });

  // Handle responsive camera distance on mobile viewports
  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height);
    if (aspect < 1) {
      aspectAdjustedZ.current = OVERVIEW_SHOT.pos[2] + (1 - aspect) * 3.8;
    } else if (aspect < 1.4) {
      aspectAdjustedZ.current = OVERVIEW_SHOT.pos[2] + (1.4 - aspect) * 1.5;
    } else {
      aspectAdjustedZ.current = OVERVIEW_SHOT.pos[2];
    }
  }, [size.width, size.height]);

  // Setup initial camera
  useEffect(() => {
    const perspCamera = camera as THREE.PerspectiveCamera;
    perspCamera.fov = OVERVIEW_SHOT.fov || 46;
    perspCamera.position.set(
      OVERVIEW_SHOT.pos[0],
      OVERVIEW_SHOT.pos[1],
      aspectAdjustedZ.current
    );
    perspCamera.lookAt(...OVERVIEW_SHOT.target);
    perspCamera.updateProjectionMatrix();
  }, [camera]);

  // Drag-to-look camera listeners
  useEffect(() => {
    const domElement = gl.domElement;

    const handlePointerDown = (e: PointerEvent) => {
      // Only drag if left click or touch
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDragging.current = true;
      previousPointer.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousPointer.current.x;
      const deltaY = e.clientY - previousPointer.current.y;
      previousPointer.current = { x: e.clientX, y: e.clientY };

      // Adjust camera yaw and pitch
      orbitRotation.current.yaw -= deltaX * 0.0035;
      // Clamp pitch to avoid flipping over
      orbitRotation.current.pitch = THREE.MathUtils.clamp(
        orbitRotation.current.pitch - deltaY * 0.0025,
        -0.45,
        0.45
      );
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    domElement.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gl.domElement]);

  // Handle shot transitions smoothly with GSAP
  useEffect(() => {
    if (tweenRef.current) {
      tweenRef.current.kill();
      tweenRef.current = null;
    }

    // Reset orbit offset when transitioning between hotspots or to overview
    orbitRotation.current = { yaw: 0, pitch: 0 };

    const perspCamera = camera as THREE.PerspectiveCamera;
    const targetShot = currentShot || {
      pos: [OVERVIEW_SHOT.pos[0], OVERVIEW_SHOT.pos[1], aspectAdjustedZ.current] as [number, number, number],
      target: OVERVIEW_SHOT.target,
      fov: OVERVIEW_SHOT.fov || 46,
    };

    if (reducedMotion) {
      perspCamera.position.set(...targetShot.pos);
      currentLookAt.current.set(...targetShot.target);
      perspCamera.fov = targetShot.fov || 46;
      perspCamera.lookAt(...targetShot.target);
      perspCamera.updateProjectionMatrix();
      return;
    }

    const startPos = {
      x: perspCamera.position.x,
      y: perspCamera.position.y,
      z: perspCamera.position.z,
    };

    const startTarget = {
      x: currentLookAt.current.x,
      y: currentLookAt.current.y,
      z: currentLookAt.current.z,
    };

    const startFov = { fov: perspCamera.fov };
    const destFov = targetShot.fov || (isOverview ? 46 : ZOOMED_FOV);
    const midY = (startPos.y + targetShot.pos[1]) / 2 + 0.18;

    const tl = gsap.timeline({
      onUpdate: () => {
        perspCamera.lookAt(currentLookAt.current);
        perspCamera.updateProjectionMatrix();
      },
    });

    tl.to(
      perspCamera.position,
      {
        x: targetShot.pos[0],
        z: targetShot.pos[2],
        duration: 1.3,
        ease: 'power3.inOut',
      },
      0
    );

    tl.to(
      perspCamera.position,
      {
        y: midY,
        duration: 0.65,
        ease: 'power2.out',
      },
      0
    );

    tl.to(
      perspCamera.position,
      {
        y: targetShot.pos[1],
        duration: 0.65,
        ease: 'power2.in',
      },
      0.65
    );

    tl.to(
      currentLookAt.current,
      {
        x: targetShot.target[0],
        y: targetShot.target[1],
        z: targetShot.target[2],
        duration: 1.3,
        ease: 'power3.inOut',
      },
      0
    );

    tl.to(
      startFov,
      {
        fov: destFov,
        duration: 1.3,
        ease: 'power3.inOut',
        onUpdate: () => {
          perspCamera.fov = startFov.fov;
        },
      },
      0
    );

    tweenRef.current = tl;

    return () => {
      if (tl) tl.kill();
    };
  }, [currentShot, isOverview, reducedMotion, camera]);

  // Frame update for drag rotation & pointer parallax
  useFrame(() => {
    if (reducedMotion) return;
    const perspCamera = camera as THREE.PerspectiveCamera;

    if (isOverview) {
      // Parallax in overview + orbit rotation from user drag
      const baseLookAt = new THREE.Vector3(...OVERVIEW_SHOT.target);
      const targetLookAtX = baseLookAt.x + Math.sin(orbitRotation.current.yaw) * 4.5;
      const targetLookAtY = baseLookAt.y + orbitRotation.current.pitch * 3.5 + pointerPos.y * 0.25;
      const targetLookAtZ = baseLookAt.z - (1 - Math.cos(orbitRotation.current.yaw)) * 4.5;

      currentLookAt.current.x += (targetLookAtX - currentLookAt.current.x) * 0.08;
      currentLookAt.current.y += (targetLookAtY - currentLookAt.current.y) * 0.08;
      currentLookAt.current.z += (targetLookAtZ - currentLookAt.current.z) * 0.08;

      // Slight camera position shift with mouse
      const targetCamX = pointerPos.x * 0.45;
      const targetCamY = OVERVIEW_SHOT.pos[1] + pointerPos.y * 0.2;
      perspCamera.position.x += (targetCamX - perspCamera.position.x) * 0.05;
      perspCamera.position.y += (targetCamY - perspCamera.position.y) * 0.05;

      perspCamera.lookAt(currentLookAt.current);
    } else {
      // When zoomed into an object, allow slight pan around the focused object
      const currentTarget = currentShot ? currentShot.target : OVERVIEW_SHOT.target;
      const targetLookAtX = currentTarget[0] + Math.sin(orbitRotation.current.yaw) * 1.5;
      const targetLookAtY = currentTarget[1] + orbitRotation.current.pitch * 1.2;
      const targetLookAtZ = currentTarget[2] - (1 - Math.cos(orbitRotation.current.yaw)) * 1.5;

      currentLookAt.current.x += (targetLookAtX - currentLookAt.current.x) * 0.1;
      currentLookAt.current.y += (targetLookAtY - currentLookAt.current.y) * 0.1;
      currentLookAt.current.z += (targetLookAtZ - currentLookAt.current.z) * 0.1;

      perspCamera.lookAt(currentLookAt.current);
    }
  });

  // Handle Esc key to return to overview
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isOverview) {
        onResetToOverview();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOverview, onResetToOverview]);

  return null;
}
