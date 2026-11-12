import { useRef, useState, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundSynth } from './AudioSynthesis';
import { drawWindowView } from './windowView';

interface DecorationsProps {
  onSelectHotspot: (id: string) => void;
  hoveredHotspot: string | null;
  setHoveredHotspot: (id: string | null) => void;
  isNightMode: boolean;
  reducedMotion: boolean;
}

export function Decorations({
  onSelectHotspot,
  hoveredHotspot,
  setHoveredHotspot,
  isNightMode,
  reducedMotion,
}: DecorationsProps) {
  const hourHandRef = useRef<THREE.Mesh>(null);
  const minHandRef = useRef<THREE.Mesh>(null);
  const secHandRef = useRef<THREE.Mesh>(null);

  const catGroupRef = useRef<THREE.Group>(null);
  const [catJumpProgress, setCatJumpProgress] = useState(0);

  // Interactive Window Curtains (Open / Close on click!)
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const leftCurtainRef = useRef<THREE.Group>(null);
  const rightCurtainRef = useRef<THREE.Group>(null);

  // Dynamic Animated Neighborhood Window Texture (drawWindowView)
  const windowCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const windowTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const windowMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const lastWindowRenderTime = useRef<number>(0);
  const currentV = useRef<number>(isNightMode ? 0 : 1);

  const [windowCanvasTexture] = useState(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 560;
    windowCanvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      drawWindowView(ctx, 512, 560, isNightMode ? 0 : 1, 0);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    windowTextureRef.current = texture;
    return texture;
  });

  useEffect(() => {
    // Biarkan useFrame melakukan interpolasi halus (smooth lerp) dari currentV ke targetV
    if (windowMaterialRef.current) {
      windowMaterialRef.current.needsUpdate = true;
    }
  }, [isNightMode]);

  const isPosterRightHovered = hoveredHotspot === 'posters_project';
  const isCatHovered = hoveredHotspot === 'kucing';
  const isWindowHovered = hoveredHotspot === 'jendela';

  useFrame((state, delta) => {
    // 1. Update clock hands in real time
    const now = new Date();
    const hours = now.getHours() % 12;
    const mins = now.getMinutes();
    const secs = now.getSeconds() + now.getMilliseconds() / 1000;

    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -((hours + mins / 60) / 12) * Math.PI * 2;
    }
    if (minHandRef.current) {
      minHandRef.current.rotation.z = -(mins / 60) * Math.PI * 2;
    }
    if (secHandRef.current) {
      secHandRef.current.rotation.z = -(secs / 60) * Math.PI * 2;
    }

    // 2. Cat gentle breathing and jumping
    if (catGroupRef.current) {
      if (!reducedMotion) {
        const breathe = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.035;
        catGroupRef.current.scale.y = breathe;
      }

      if (catJumpProgress > 0) {
        const next = Math.max(0, catJumpProgress - delta * 2.5);
        setCatJumpProgress(next);
        const jumpY = Math.sin((1 - next) * Math.PI) * 0.22;
        catGroupRef.current.position.y = 0.06 + jumpY;
      } else {
        catGroupRef.current.position.y = 0.06;
      }
    }

    // 3. Smooth curtain sliding animation (buka-tutup gorden jendela)
    if (leftCurtainRef.current && rightCurtainRef.current) {
      const targetLeftX = curtainsOpen ? -0.72 : -0.28;
      const targetRightX = curtainsOpen ? 0.72 : 0.28;
      const targetScaleX = curtainsOpen ? 0.28 : 0.68;

      leftCurtainRef.current.position.x += (targetLeftX - leftCurtainRef.current.position.x) * 0.12;
      rightCurtainRef.current.position.x += (targetRightX - rightCurtainRef.current.position.x) * 0.12;
      leftCurtainRef.current.scale.x += (targetScaleX - leftCurtainRef.current.scale.x) * 0.12;
      rightCurtainRef.current.scale.x += (targetScaleX - rightCurtainRef.current.scale.x) * 0.12;
    }

    // 4. Dynamic window animated rendering (awan berarak & kerlip bintang ~10 fps, smooth day/night transition)
    const targetV = isNightMode ? 0 : 1;
    currentV.current += (targetV - currentV.current) * 0.08;
    const elapsed = state.clock.elapsedTime;
    if (elapsed - lastWindowRenderTime.current > 0.085 || Math.abs(targetV - currentV.current) > 0.005) {
      lastWindowRenderTime.current = elapsed;
      if (windowCanvasRef.current) {
        const ctx = windowCanvasRef.current.getContext('2d');
        if (ctx) {
          drawWindowView(ctx, 512, 560, currentV.current, elapsed);
          if (windowTextureRef.current) {
            windowTextureRef.current.needsUpdate = true;
          }
        }
      }
    }
  });

  const handleCatClick = (e: any) => {
    e.stopPropagation();
    soundSynth.playCatMeow();
    setCatJumpProgress(1);
    onSelectHotspot('kucing');
  };

  const handleToggleCurtains = (e: any) => {
    e.stopPropagation();
    soundSynth.playPaperRustle();
    setCurtainsOpen((prev) => !prev);
  };

  return (
    <group>
      {/* ========================================================
          1. REAL-TIME ANALOG WALL CLOCK
          ======================================================== */}
      <group position={[-0.8, 2.7, -2.96]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
          <meshStandardMaterial color="#C7862F" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.021]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.23, 32]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
        <mesh ref={hourHandRef} position={[0, 0, 0.028]}>
          <boxGeometry args={[0.015, 0.11, 0.005]} />
          <meshBasicMaterial color="#242B38" />
        </mesh>
        <mesh ref={minHandRef} position={[0, 0, 0.03]}>
          <boxGeometry args={[0.01, 0.16, 0.004]} />
          <meshBasicMaterial color="#2F5D5A" />
        </mesh>
        <mesh ref={secHandRef} position={[0, 0, 0.032]}>
          <boxGeometry args={[0.005, 0.19, 0.003]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          2. INTERACTIVE WINDOW: VIEW OUTSIDE + OPENABLE CURTAINS + ZOOM IN/OUT
          ======================================================== */}
      <group
        position={[-2.8, 2.0, -2.96]}
        scale={isWindowHovered ? [1.02, 1.02, 1.02] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('jendela');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('jendela');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Outer View: Dynamic Animated Neighborhood Canvas Texture ("Perumahan yang Asri") */}
        <mesh position={[0, 0, 0.015]} renderOrder={2}>
          <planeGeometry args={[1.36, 1.66]} />
          <meshBasicMaterial
            ref={windowMaterialRef}
            map={windowCanvasTexture}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Window Wooden Frame (Hollow 4-piece border surrounding the canvas) */}
        {/* Top frame molding */}
        <mesh position={[0, 0.865, 0.03]} castShadow receiveShadow>
          <boxGeometry args={[1.54, 0.07, 0.05]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>
        {/* Bottom window sill / ledge */}
        <mesh position={[0, -0.865, 0.045]} castShadow receiveShadow>
          <boxGeometry args={[1.60, 0.09, 0.10]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>
        {/* Left frame bar */}
        <mesh position={[-0.71, 0, 0.03]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 1.80, 0.05]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>
        {/* Right frame bar */}
        <mesh position={[0.71, 0, 0.03]} castShadow receiveShadow>
          <boxGeometry args={[0.08, 1.80, 0.05]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>

        {/* Window Crossbars (Thin Mullions in front of the glass) */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.025, 1.66, 0.02]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.12, 0.02]}>
          <boxGeometry args={[1.36, 0.025, 0.02]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>

        {/* Curtain Rod in Brass Finish */}
        <mesh position={[0, 0.98, 0.12]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 1.75, 16]} />
          <meshStandardMaterial color="#C7862F" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Interactive Curtains (Clickable to Open/Close) */}
        <group
          onClick={(e) => {
            e.stopPropagation();
            handleToggleCurtains(e);
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Left Curtain */}
          <group ref={leftCurtainRef} position={[-0.72, 0, 0.08]} scale={[0.28, 1, 1]}>
            <mesh castShadow>
              <boxGeometry args={[1, 1.9, 0.1]} />
              <meshStandardMaterial color="#2F5D5A" roughness={0.8} />
            </mesh>
          </group>

          {/* Right Curtain */}
          <group ref={rightCurtainRef} position={[0.72, 0, 0.08]} scale={[0.28, 1, 1]}>
            <mesh castShadow>
              <boxGeometry args={[1, 1.9, 0.1]} />
              <meshStandardMaterial color="#2F5D5A" roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* Floating hotspot indicator badge */}
        <mesh position={[0, 1.05, 0.04]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          3. RIGHT WALL: AUTHENTIC ARCHITECTURAL & PROJECT BLUEPRINTS
          ======================================================== */}
      <group
        position={[4.47, 1.7, -0.5]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={isPosterRightHovered ? [1.03, 1.03, 1.03] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('posters_project');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('posters_project');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Poster 1: LifeFlow System Architectural Blueprint */}
        <group position={[-1.0, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.78, 1.08, 0.035]} />
            <meshStandardMaterial color="#242B38" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.72, 1.02]} />
            <meshStandardMaterial color="#1B2230" roughness={0.5} />
          </mesh>
          {/* Header Bar */}
          <mesh position={[0, 0.38, 0.023]}>
            <planeGeometry args={[0.62, 0.14]} />
            <meshBasicMaterial color="#2F5D5A" />
          </mesh>
          {/* Wireframe Mockup Lines */}
          <mesh position={[-0.15, 0.08, 0.023]}>
            <planeGeometry args={[0.28, 0.32]} />
            <meshBasicMaterial color="#E8A855" />
          </mesh>
          <mesh position={[0.15, 0.08, 0.023]}>
            <planeGeometry args={[0.24, 0.32]} />
            <meshBasicMaterial color="#4C8783" />
          </mesh>
          <mesh position={[0, -0.22, 0.023]}>
            <planeGeometry args={[0.58, 0.2]} />
            <meshBasicMaterial color="#C7862F" />
          </mesh>
        </group>

        {/* Poster 2: OPMAZ Central Hub & Archive System */}
        <group position={[0, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.78, 1.08, 0.035]} />
            <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.72, 1.02]} />
            <meshStandardMaterial color="#F4EFE6" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.38, 0.023]}>
            <planeGeometry args={[0.62, 0.14]} />
            <meshBasicMaterial color="#C7862F" />
          </mesh>
          {/* Table Spreadsheet lines representation */}
          {[-0.05, -0.15, -0.25, -0.35].map((ly, li) => (
            <mesh key={li} position={[0, ly, 0.023]}>
              <planeGeometry args={[0.58, 0.04]} />
              <meshBasicMaterial color="#2F5D5A" />
            </mesh>
          ))}
        </group>

        {/* Poster 3: Kamen Rider 3D Interactive Catalog */}
        <group position={[1.0, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.78, 1.08, 0.035]} />
            <meshStandardMaterial color="#1E2330" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.72, 1.02]} />
            <meshStandardMaterial color="#242B38" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.38, 0.023]}>
            <planeGeometry args={[0.62, 0.14]} />
            <meshBasicMaterial color="#E8A855" />
          </mesh>
          {/* Belt Hexagon Emblem */}
          <mesh position={[0, 0.05, 0.023]}>
            <circleGeometry args={[0.18, 6]} />
            <meshBasicMaterial color="#C7862F" />
          </mesh>
          <mesh position={[0, -0.25, 0.023]}>
            <planeGeometry args={[0.55, 0.16]} />
            <meshBasicMaterial color="#2F5D5A" />
          </mesh>
        </group>

        {/* Hotspot indicator */}
        <mesh position={[0, 0.68, 0.04]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          4. SLEEPING CLAY CAT (EASTER EGG & COMPANION)
          ======================================================== */}
      <group
        ref={catGroupRef}
        position={[0.1, 0.06, -0.6]}
        scale={isCatHovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
        onClick={handleCatClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('kucing');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh position={[0, 0.06, 0]} castShadow>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#E8A855" roughness={0.8} />
        </mesh>

        <mesh position={[0.11, 0.11, 0.04]} castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#C7862F" roughness={0.8} />
        </mesh>

        <mesh position={[0.14, 0.19, 0.09]} rotation={[0.2, 0.2, 0]}>
          <coneGeometry args={[0.03, 0.06, 8]} />
          <meshStandardMaterial color="#242B38" />
        </mesh>

        <mesh position={[0.07, 0.19, 0.09]} rotation={[0.2, -0.2, 0]}>
          <coneGeometry args={[0.03, 0.06, 8]} />
          <meshStandardMaterial color="#242B38" />
        </mesh>

        <mesh position={[-0.12, 0.03, 0.08]} rotation={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.022, 0.015, 0.22, 12]} />
          <meshStandardMaterial color="#242B38" />
        </mesh>
      </group>

      {/* Poufs */}
      <group position={[-1.2, 0.12, -0.7]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.32, 0.35, 0.24, 24]} />
          <meshStandardMaterial color="#E8A855" roughness={0.85} />
        </mesh>
      </group>
      <group position={[-1.6, 0.1, -0.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.28, 0.2, 24]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.85} />
        </mesh>
      </group>

      {/* Large Potted Monstera Plant */}
      <group position={[-3.8, 0, 1.8]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.22, 0.7, 24]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.68, 0]}>
          <circleGeometry args={[0.28, 24]} />
          <meshStandardMaterial color="#3E2723" roughness={0.9} />
        </mesh>
        {[
          { rotX: 0.3, rotZ: 0.2, scale: 0.8 },
          { rotX: -0.4, rotZ: 0.4, scale: 0.95 },
          { rotX: 0.1, rotZ: -0.5, scale: 1.1 },
          { rotX: -0.2, rotZ: -0.3, scale: 0.85 },
          { rotX: 0.5, rotZ: -0.1, scale: 0.75 },
        ].map((leaf, idx) => (
          <group
            key={idx}
            position={[0, 0.7, 0]}
            rotation={[leaf.rotX, (idx * Math.PI) / 2.5, leaf.rotZ]}
          >
            <mesh position={[0, 0.4, 0]} castShadow>
              <cylinderGeometry args={[0.015, 0.02, 0.8, 8]} />
              <meshStandardMaterial color="#2F5D5A" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.8, 0]} rotation={[0.4, 0, 0]} castShadow>
              <sphereGeometry args={[0.22, 12, 12]} />
              <meshStandardMaterial color="#4C8783" roughness={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Floor Lamp */}
      <group position={[-3.9, 0, 1.0]}>
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
          <meshStandardMaterial color="#1E2330" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 2.2, 16]} />
          <meshStandardMaterial color="#C7862F" metalness={0.4} />
        </mesh>
        <mesh position={[0, 2.15, 0]} castShadow>
          <coneGeometry args={[0.24, 0.32, 24, 1, true]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.8} />
        </mesh>
      </group>

      {/* Fairy lights string */}
      <group position={[0, 3.05, -2.94]}>
        <mesh>
          <boxGeometry args={[8.6, 0.01, 0.01]} />
          <meshStandardMaterial color="#C7862F" />
        </mesh>
        {[-4, -3.2, -2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4, 3.2, 4].map((x, i) => (
          <mesh key={i} position={[x, -0.04 - (i % 2) * 0.03, 0.015]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#FFD27A' : i % 3 === 1 ? '#E8A855' : '#FFFDF8'}
              emissive={isNightMode ? (i % 2 === 0 ? '#FFD27A' : '#E8A855') : '#000000'}
              emissiveIntensity={isNightMode ? 2.5 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* Cozy slippers on floor */}
      <group position={[0.6, 0.02, -1.0]} rotation={[0, 0.25, 0]}>
        <mesh position={[-0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.03, 0.22]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.9} />
        </mesh>
        <mesh position={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.03, 0.22]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.9} />
        </mesh>
      </group>

      {/* Wall shelf with trophy */}
      <group position={[-3.2, 2.6, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.03, 0.24]} />
          <meshStandardMaterial color="#C7862F" roughness={0.6} />
        </mesh>
        <group position={[-0.35, 0.1, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.04, 0.02, 0.12, 16]} />
            <meshStandardMaterial color="#FFD27A" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[0.06, 0.03, 0.06]} />
            <meshStandardMaterial color="#1E2330" roughness={0.5} />
          </mesh>
        </group>
        <group position={[0.35, 0.08, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.035, 0.025, 0.06, 12]} />
            <meshStandardMaterial color="#FFFDF8" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.05, 0]} castShadow>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#4C8783" roughness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
