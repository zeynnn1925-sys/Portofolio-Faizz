import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { soundSynth } from './AudioSynthesis';

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
  // Real-time clock hand refs
  const hourHandRef = useRef<THREE.Mesh>(null);
  const minHandRef = useRef<THREE.Mesh>(null);
  const secHandRef = useRef<THREE.Mesh>(null);

  // Cat breathing & jump animation
  const catGroupRef = useRef<THREE.Group>(null);
  const [catJumpProgress, setCatJumpProgress] = useState(0);

  // Posters on right wall
  const isPosterRightHovered = hoveredHotspot === 'posters_project';
  const isCatHovered = hoveredHotspot === 'kucing';

  // Animation frame loop for clock and cat
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
        // Breathing
        const breathe = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.035;
        catGroupRef.current.scale.y = breathe;
      }

      // Handle jump arc if triggered
      if (catJumpProgress > 0) {
        const next = Math.max(0, catJumpProgress - delta * 2.5);
        setCatJumpProgress(next);
        const jumpY = Math.sin((1 - next) * Math.PI) * 0.22;
        catGroupRef.current.position.y = 0.06 + jumpY;
      } else {
        catGroupRef.current.position.y = 0.06;
      }
    }
  });

  const handleCatClick = (e: any) => {
    e.stopPropagation();
    soundSynth.playCatMeow();
    setCatJumpProgress(1);
    onSelectHotspot('kucing');
  };

  return (
    <group>
      {/* ========================================================
          1. REAL-TIME ANALOG WALL CLOCK
          ======================================================== */}
      <group position={[-0.8, 2.7, -2.96]}>
        {/* Outer wooden rim */}
        <mesh castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 32]} />
          <meshStandardMaterial color="#C7862F" roughness={0.6} />
        </mesh>
        {/* Clock white face */}
        <mesh position={[0, 0, 0.021]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.23, 32]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.9} />
        </mesh>
        {/* Clock center pin */}
        <mesh position={[0, 0, 0.035]}>
          <sphereGeometry args={[0.015, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
        {/* Hour Hand */}
        <mesh ref={hourHandRef} position={[0, 0, 0.028]}>
          <boxGeometry args={[0.015, 0.11, 0.005]} />
          <meshBasicMaterial color="#242B38" />
        </mesh>
        {/* Minute Hand */}
        <mesh ref={minHandRef} position={[0, 0, 0.03]}>
          <boxGeometry args={[0.01, 0.16, 0.004]} />
          <meshBasicMaterial color="#2F5D5A" />
        </mesh>
        {/* Second Hand */}
        <mesh ref={secHandRef} position={[0, 0, 0.032]}>
          <boxGeometry args={[0.005, 0.19, 0.003]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          2. WINDOW WITH NIGHT SKY, MOON, AND DEEP TEAL CURTAINS
          ======================================================== */}
      <group position={[-2.8, 2.0, -2.96]}>
        {/* Window outer wooden frame */}
        <mesh castShadow>
          <boxGeometry args={[1.5, 1.8, 0.06]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>

        {/* Window glass background pane showing night sky & moon */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[1.36, 1.66]} />
          <meshBasicMaterial
            color={isNightMode ? '#0F121C' : '#E8B682'} // Night sky vs Warm sunset
          />
        </mesh>

        {/* Crescent Moon */}
        <mesh position={[0.35, 0.45, 0.002]}>
          <circleGeometry args={[0.16, 32]} />
          <meshBasicMaterial color={isNightMode ? '#FFF4D4' : '#FFE8AA'} />
        </mesh>
        <mesh position={[0.41, 0.47, 0.004]}>
          <circleGeometry args={[0.15, 32]} />
          <meshBasicMaterial color={isNightMode ? '#0F121C' : '#E8B682'} />
        </mesh>

        {/* City silhouette at the bottom of window */}
        <mesh position={[0, -0.55, 0.005]}>
          <planeGeometry args={[1.36, 0.55]} />
          <meshBasicMaterial color="#0A0C14" />
        </mesh>

        {/* Window muntin mullions (crossbars) */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.04, 1.66, 0.03]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[1.36, 0.04, 0.03]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
        </mesh>

        {/* Curtain rod */}
        <mesh position={[0, 0.98, 0.12]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 1.75, 16]} />
          <meshStandardMaterial color="#C7862F" metalness={0.4} />
        </mesh>

        {/* Deep Teal drapery curtains */}
        <mesh position={[-0.72, 0, 0.08]} castShadow>
          <boxGeometry args={[0.26, 1.9, 0.12]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.85} />
        </mesh>
        <mesh position={[0.72, 0, 0.08]} castShadow>
          <boxGeometry args={[0.26, 1.9, 0.12]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.85} />
        </mesh>
      </group>

      {/* ========================================================
          3. RIGHT WALL: THREE PROJECT POSTERS (PROJECTS HOTSPOT)
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
        {/* Poster 1: LifeFlow System Blueprint */}
        <group position={[-1.0, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.75, 1.05, 0.03]} />
            <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <planeGeometry args={[0.68, 0.98]} />
            <meshStandardMaterial color="#2F5D5A" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.32, 0.02]}>
            <planeGeometry args={[0.55, 0.15]} />
            <meshBasicMaterial color="#E8A855" />
          </mesh>
        </group>

        {/* Poster 2: Al-Zaytun Portal Architecture */}
        <group position={[0, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.75, 1.05, 0.03]} />
            <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <planeGeometry args={[0.68, 0.98]} />
            <meshStandardMaterial color="#1E2330" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.32, 0.02]}>
            <planeGeometry args={[0.55, 0.15]} />
            <meshBasicMaterial color="#C7862F" />
          </mesh>
        </group>

        {/* Poster 3: Kamen Rider 3D Interactive Catalog */}
        <group position={[1.0, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.75, 1.05, 0.03]} />
            <meshStandardMaterial color="#FFFDF8" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <planeGeometry args={[0.68, 0.98]} />
            <meshStandardMaterial color="#C7862F" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.32, 0.02]}>
            <planeGeometry args={[0.55, 0.15]} />
            <meshBasicMaterial color="#2F5D5A" />
          </mesh>
        </group>

        {/* Hotspot indicator */}
        <mesh position={[0, 0.65, 0.04]}>
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
        {/* Cat curled body in warm ginger/amber clay */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#E8A855" roughness={0.8} />
        </mesh>

        {/* Cat head */}
        <mesh position={[0.11, 0.11, 0.04]} castShadow>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#C7862F" roughness={0.8} />
        </mesh>

        {/* Left ear */}
        <mesh position={[0.14, 0.19, 0.09]} rotation={[0.2, 0.2, 0]}>
          <coneGeometry args={[0.03, 0.06, 8]} />
          <meshStandardMaterial color="#242B38" />
        </mesh>

        {/* Right ear */}
        <mesh position={[0.07, 0.19, 0.09]} rotation={[0.2, -0.2, 0]}>
          <coneGeometry args={[0.03, 0.06, 8]} />
          <meshStandardMaterial color="#242B38" />
        </mesh>

        {/* Sleeping curled tail */}
        <mesh position={[-0.12, 0.03, 0.08]} rotation={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.022, 0.015, 0.22, 12]} />
          <meshStandardMaterial color="#242B38" />
        </mesh>
      </group>

      {/* ========================================================
          5. TWO FLOOR POUFS IN AMBER CLAY AND DEEP TEAL
          ======================================================== */}
      {/* Pouf 1: Amber Clay */}
      <group position={[-1.2, 0.12, -0.7]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.32, 0.35, 0.24, 24]} />
          <meshStandardMaterial color="#E8A855" roughness={0.85} />
        </mesh>
      </group>

      {/* Pouf 2: Deep Teal */}
      <group position={[-1.6, 0.1, -0.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.26, 0.28, 0.2, 24]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.85} />
        </mesh>
      </group>

      {/* ========================================================
          6. LARGE POTTED MONSTERA PLANT (IN CORNER)
          ======================================================== */}
      <group position={[-3.8, 0, 1.8]}>
        {/* Ceramic pot */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.22, 0.7, 24]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.6} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.68, 0]}>
          <circleGeometry args={[0.28, 24]} />
          <meshStandardMaterial color="#3E2723" roughness={0.9} />
        </mesh>
        {/* Stems & Leaves */}
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

      {/* ========================================================
          7. TALL STANDING FLOOR LAMP
          ======================================================== */}
      <group position={[-3.9, 0, 1.0]}>
        {/* Heavy circular base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
          <meshStandardMaterial color="#1E2330" roughness={0.4} />
        </mesh>
        {/* Metal pole */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 2.2, 16]} />
          <meshStandardMaterial color="#C7862F" metalness={0.4} />
        </mesh>
        {/* Warm lamp cone shade */}
        <mesh position={[0, 2.15, 0]} castShadow>
          <coneGeometry args={[0.24, 0.32, 24, 1, true]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.8} />
        </mesh>
      </group>

      {/* ========================================================
          8. FAIRY LIGHTS STRING ALONG UPPER PERIMETER
          ======================================================== */}
      <group position={[0, 3.05, -2.94]}>
        {/* Golden wire */}
        <mesh>
          <boxGeometry args={[8.6, 0.01, 0.01]} />
          <meshStandardMaterial color="#C7862F" />
        </mesh>
        {/* Fairy light glowing bulbs */}
        {[-4, -3.2, -2.4, -1.6, -0.8, 0, 0.8, 1.6, 2.4, 3.2, 4].map((x, i) => (
          <mesh key={i} position={[x, -0.04 - (i % 2) * 0.03, 0.015]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#FFD27A' : i % 3 === 1 ? '#E8A855' : '#FFFDF8'}
              emissive={isNightMode ? (i % 2 === 0 ? '#FFD27A' : '#E8A855') : '#000000'}
              emissiveIntensity={isNightMode ? 2.2 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* ========================================================
          9. COZY SLIPPERS ON THE WOOD FLOOR NEAR DESK
          ======================================================== */}
      <group position={[0.6, 0.02, -1.0]} rotation={[0, 0.25, 0]}>
        {/* Left Slipper */}
        <mesh position={[-0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.03, 0.22]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.9} />
        </mesh>
        {/* Right Slipper */}
        <mesh position={[0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 0.03, 0.22]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.9} />
        </mesh>
      </group>

      {/* ========================================================
          10. WALL SHELF WITH TROPHY & TECH GADGET ACCENTS
          ======================================================== */}
      <group position={[-3.2, 2.6, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        {/* Wooden shelf plank */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.03, 0.24]} />
          <meshStandardMaterial color="#C7862F" roughness={0.6} />
        </mesh>
        {/* Mini Gold Trophy (Lomba & Prestasi) */}
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
        {/* Mini Potted Cactus */}
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
