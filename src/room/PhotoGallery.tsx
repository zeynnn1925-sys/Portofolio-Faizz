import { useEffect, useState, useMemo } from 'react';
import * as THREE from 'three';

interface PhotoGalleryProps {
  onSelectHotspot: (id: string) => void;
  hoveredHotspot: string | null;
  setHoveredHotspot: (id: string | null) => void;
  isNightMode: boolean;
  onToggleLight: () => void;
}

export function PhotoGallery({
  onSelectHotspot,
  hoveredHotspot,
  setHoveredHotspot,
  isNightMode,
  onToggleLight,
}: PhotoGalleryProps) {
  const [duotoneTexture, setDuotoneTexture] = useState<THREE.Texture | null>(null);
  const [brightNightTexture, setBrightNightTexture] = useState<THREE.Texture | null>(null);

  // 1. Process Formal Photo into Duotone (Teal #2F5D5A to Amber #E8A855)
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/photos/formal.jpg';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Dark tone: Deep Teal (47, 93, 90)
      // Light tone: Amber Clay (232, 168, 85)
      for (let i = 0; i < data.length; i += 4) {
        // Luminance
        const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const t = lum / 255;

        data[i] = Math.round(47 * (1 - t) + 232 * t);
        data[i + 1] = Math.round(93 * (1 - t) + 168 * t);
        data[i + 2] = Math.round(90 * (1 - t) + 85 * t);
      }

      ctx.putImageData(imgData, 0, 0);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      setDuotoneTexture(tex);
    };
  }, []);

  // 2. Process Night Photo with 2.4x Brightness
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/photos/night.jpg';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * 2.4);
        data[i + 1] = Math.min(255, data[i + 1] * 2.4);
        data[i + 2] = Math.min(255, data[i + 2] * 2.4);
      }

      ctx.putImageData(imgData, 0, 0);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      setBrightNightTexture(tex);
    };
  }, []);

  // Standard textures loaded via THREE.TextureLoader
  const hoodieTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/photos/hoodie.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const khotibTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/photos/khotib.jpg');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const sweaterTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/photos/sweater.jpeg');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const profileTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/photos/profile.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const isPosterHovered = hoveredHotspot === 'poster';
  const isSwitchHovered = hoveredHotspot === 'saklar';
  const isCorkboardHovered = hoveredHotspot === 'papan_gabus';

  return (
    <group>
      {/* ========================================================
          1. CENTER HERO POSTER: HOODIE PHOTO (ABOUT ME)
          ======================================================== */}
      <group
        position={[0, 2.0, -2.96]}
        scale={isPosterHovered ? [1.04, 1.04, 1.04] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('poster');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('poster');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Frame Outer Wooden/Clay Molding */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.28, 1.58, 0.04]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>

        {/* Inner Clay Border in Amber Clay */}
        <mesh position={[0, 0, 0.021]}>
          <boxGeometry args={[1.2, 1.5, 0.005]} />
          <meshStandardMaterial color="#C7862F" roughness={0.5} />
        </mesh>

        {/* Photo Canvas Plate */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[1.14, 1.44]} />
          <meshStandardMaterial
            map={hoodieTexture}
            roughness={0.6}
          />
        </mesh>

        {/* Hotspot indicator badge */}
        <mesh position={[0, 0.88, 0.04]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          2. FORMAL PHOTO FRAME (TOP-LEFT) WITH DUOTONE
          ======================================================== */}
      <group position={[-1.25, 2.25, -2.96]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.65, 0.85, 0.035]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[0.57, 0.77]} />
          {duotoneTexture ? (
            <meshStandardMaterial map={duotoneTexture} roughness={0.5} />
          ) : (
            <meshStandardMaterial color="#4C8783" />
          )}
        </mesh>
      </group>

      {/* ========================================================
          3. KHOTIB PHOTO FRAME (TOP-RIGHT)
          ======================================================== */}
      <group position={[1.25, 2.25, -2.96]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.65, 0.85, 0.035]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[0.57, 0.77]} />
          <meshStandardMaterial map={khotibTexture} roughness={0.5} />
        </mesh>
      </group>

      {/* ========================================================
          4. SMALL ACCENT FRAMES (NIGHT, SWEATER, PROFILE)
          ======================================================== */}
      {/* Night frame (brightened) */}
      <group position={[-1.25, 1.35, -2.96]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.65, 0.03]} />
          <meshStandardMaterial color="#EAE3D4" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[0.44, 0.59]} />
          {brightNightTexture ? (
            <meshStandardMaterial map={brightNightTexture} />
          ) : (
            <meshStandardMaterial color="#242B38" />
          )}
        </mesh>
      </group>

      {/* Sweater casual frame */}
      <group position={[-1.9, 1.85, -2.96]}>
        <mesh castShadow>
          <boxGeometry args={[0.48, 0.58, 0.03]} />
          <meshStandardMaterial color="#C7862F" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[0.42, 0.52]} />
          <meshStandardMaterial map={sweaterTexture} />
        </mesh>
      </group>

      {/* Profile ID frame */}
      <group position={[1.85, 1.45, -2.96]}>
        <mesh castShadow>
          <boxGeometry args={[0.46, 0.56, 0.03]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[0.4, 0.5]} />
          <meshStandardMaterial map={profileTexture} />
        </mesh>
      </group>

      {/* ========================================================
          5. WALL LIGHT SWITCH "LAMPU" (HOTSPOT & INTERACTIVE ROCKER)
          ======================================================== */}
      <group
        position={[0.7, 1.65, -2.97]}
        scale={isSwitchHovered ? [1.12, 1.12, 1.12] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onToggleLight();
          onSelectHotspot('saklar');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('saklar');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Switch mounting plate */}
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.24, 0.02]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.5} />
        </mesh>

        {/* Amber Clay border */}
        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.16, 0.22, 0.005]} />
          <meshStandardMaterial color="#C7862F" roughness={0.4} />
        </mesh>

        {/* Switch toggle rocker */}
        <mesh
          position={[0, 0, 0.02]}
          rotation={[isNightMode ? 0.2 : -0.2, 0, 0]}
        >
          <boxGeometry args={[0.07, 0.1, 0.02]} />
          <meshStandardMaterial
            color={isNightMode ? '#242B38' : '#E8A855'}
            roughness={0.4}
          />
        </mesh>

        {/* Hotspot indicator */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          6. CORKBOARD WITH STICKY NOTES & TASK BACKLOG (PROJECTS)
          ======================================================== */}
      <group
        position={[2.75, 2.3, -2.97]}
        scale={isCorkboardHovered ? [1.04, 1.04, 1.04] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('papan_gabus');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('papan_gabus');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Pine wooden frame */}
        <mesh castShadow>
          <boxGeometry args={[1.35, 0.95, 0.04]} />
          <meshStandardMaterial color="#C7862F" roughness={0.8} />
        </mesh>

        {/* Corkboard texture board */}
        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[1.25, 0.85]} />
          <meshStandardMaterial color="#C49A6C" roughness={0.95} />
        </mesh>

        {/* Colorful sticky notes pinned on the board */}
        {[
          { x: -0.42, y: 0.22, color: '#FFEB3B', rot: 0.05 },
          { x: -0.15, y: 0.25, color: '#81C784', rot: -0.06 },
          { x: 0.15, y: 0.2, color: '#4DD0E1', rot: 0.04 },
          { x: 0.42, y: 0.24, color: '#FF8A65', rot: -0.03 },
          { x: -0.32, y: -0.15, color: '#BA68C8', rot: 0.07 },
          { x: 0.0, y: -0.18, color: '#FFF176', rot: -0.02 },
          { x: 0.35, y: -0.12, color: '#81D4FA', rot: 0.05 },
        ].map((note, idx) => (
          <group key={idx} position={[note.x, note.y, 0.024]} rotation={[0, 0, note.rot]}>
            <mesh>
              <planeGeometry args={[0.22, 0.22]} />
              <meshStandardMaterial color={note.color} roughness={0.8} />
            </mesh>
            {/* Red pushpin */}
            <mesh position={[0, 0.09, 0.01]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <meshStandardMaterial color="#E53935" roughness={0.3} />
            </mesh>
          </group>
        ))}

        {/* Hotspot indicator */}
        <mesh position={[0, 0.58, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          7. NEON "zeynn.dev" (GLOWS PROMINENTLY IN NIGHT MODE)
          ======================================================== */}
      <group position={[0, 2.9, -2.96]}>
        <mesh>
          <boxGeometry args={[1.9, 0.28, 0.02]} />
          <meshStandardMaterial color="#12151E" roughness={0.9} />
        </mesh>
        {/* Neon tube */}
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[1.75, 0.16, 0.01]} />
          <meshStandardMaterial
            color={isNightMode ? '#FFD27A' : '#A48250'}
            emissive={isNightMode ? '#FFB84D' : '#000000'}
            emissiveIntensity={isNightMode ? 2.8 : 0}
            roughness={0.2}
          />
        </mesh>
        {/* Glowing border outline for neon */}
        {isNightMode && (
          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[1.82, 0.22, 0.005]} />
            <meshBasicMaterial color="#E8A855" transparent opacity={0.35} />
          </mesh>
        )}
      </group>
    </group>
  );
}
