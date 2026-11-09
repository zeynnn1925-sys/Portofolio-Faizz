import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createScreenCodeTexture, createTerminalScreenTexture } from './proceduralTextures';

interface MorphableDeskProps {
  morphProgress: number; // 0 (analog) to 1 (digital)
  onSelectHotspot: (id: string) => void;
  hoveredHotspot: string | null;
  setHoveredHotspot: (id: string | null) => void;
  isNightMode: boolean;
  terminalInput?: string;
  terminalHistory?: string[];
  monitorMode?: 'code' | 'terminal';
}

export function MorphableDesk({
  morphProgress,
  onSelectHotspot,
  hoveredHotspot,
  setHoveredHotspot,
  isNightMode,
  terminalInput = 'cat portfolio.json',
  terminalHistory = [
    '➜ whoami',
    'Muhammad Faiz Dzahin (Zeynn)',
    '➜ role',
    'Web Developer & Pembangun Sistem',
    '➜ projects --featured',
    '* LifeFlow System (Productivity & Wealth AI)',
    '* OPMAZ Admin Hub (200+ Arsip Digital)',
    '➜ type "help" in panel to run CLI',
  ],
  monitorMode = 'code',
}: MorphableDeskProps) {
  const laptopHingeRef = useRef<THREE.Group>(null);
  const serverRackRef = useRef<THREE.Mesh>(null);
  const cardGroup1Ref = useRef<THREE.Group>(null);
  const cardGroup2Ref = useRef<THREE.Group>(null);
  const cardGroup3Ref = useRef<THREE.Group>(null);
  const steamRef = useRef<THREE.Mesh>(null);

  const [codeIndex, setCodeIndex] = useState(0);

  // Monitor code scroll ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const monitorTexture = useMemo(() => {
    if (monitorMode === 'terminal') {
      return createTerminalScreenTexture(terminalHistory, terminalInput);
    }
    return createScreenCodeTexture(codeIndex);
  }, [codeIndex, monitorMode, terminalHistory, terminalInput]);

  // Interpolate morph transforms every frame with smooth easing
  useFrame(() => {
    // 1. Laptop hinge rotation: from flat book (Math.PI / 2) to open screen (-0.22 rad)
    if (laptopHingeRef.current) {
      const targetRotation = THREE.MathUtils.lerp(Math.PI / 2, -0.22, morphProgress);
      laptopHingeRef.current.rotation.x = targetRotation;
    }

    // 2. 3 floating UI cards elevation & rotation
    if (cardGroup1Ref.current && cardGroup2Ref.current && cardGroup3Ref.current) {
      const elev1 = THREE.MathUtils.lerp(0.01, 0.42, morphProgress);
      const elev2 = THREE.MathUtils.lerp(0.01, 0.58, morphProgress);
      const elev3 = THREE.MathUtils.lerp(0.01, 0.35, morphProgress);

      const rot1 = THREE.MathUtils.lerp(0, -0.28, morphProgress);
      const rot2 = THREE.MathUtils.lerp(0, -0.32, morphProgress);
      const rot3 = THREE.MathUtils.lerp(0, -0.25, morphProgress);

      cardGroup1Ref.current.position.y = 0.77 + elev1;
      cardGroup1Ref.current.rotation.x = rot1;

      cardGroup2Ref.current.position.y = 0.77 + elev2;
      cardGroup2Ref.current.rotation.x = rot2;

      cardGroup3Ref.current.position.y = 0.77 + elev3;
      cardGroup3Ref.current.rotation.x = rot3;
    }
  });

  const isBukuHovered = hoveredHotspot === 'buku_laptop';
  const isMonitorHovered = hoveredHotspot === 'monitor';
  const isServerHovered = hoveredHotspot === 'lemari_server';
  const isPhoneHovered = hoveredHotspot === 'telepon';

  return (
    <group>
      {/* ========================================================
          1. THE MAIN LARGE WORK DESK
          ======================================================== */}
      <group position={[0.2, 0, -2.4]}>
        {/* Desk wooden top slab */}
        <mesh position={[0, 0.73, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.8, 0.08, 1.4]} />
          <meshStandardMaterial
            color="#EFE6D8"
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>

        {/* Desk beveled edge trim in Amber Clay accent */}
        <mesh position={[0, 0.73, 0.7]} castShadow>
          <boxGeometry args={[4.82, 0.04, 0.02]} />
          <meshStandardMaterial color="#C7862F" roughness={0.5} />
        </mesh>

        {/* 4 Sturdy Claymorphic Desk Legs */}
        {[
          [-2.25, 0.36, -0.55],
          [-2.25, 0.36, 0.55],
          [2.25, 0.36, -0.55],
          [2.25, 0.36, 0.55],
        ].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]} castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.72, 16]} />
            <meshStandardMaterial color="#2F5D5A" roughness={0.6} />
          </mesh>
        ))}

        {/* Crossbar support beam */}
        <mesh position={[0, 0.3, -0.5]} castShadow>
          <boxGeometry args={[4.4, 0.03, 0.03]} />
          <meshStandardMaterial color="#242B38" roughness={0.6} />
        </mesh>

        {/* Large desk mat (felt mousepad) under monitor & laptop */}
        <mesh position={[0.4, 0.772, 0.05]} receiveShadow>
          <boxGeometry args={[3.2, 0.005, 0.95]} />
          <meshStandardMaterial color="#242B38" roughness={0.9} />
        </mesh>
      </group>

      {/* ========================================================
          2. ERGONOMIC OFFICE CHAIR
          ======================================================== */}
      <group position={[0.2, 0, -1.35]}>
        {/* Seat cushion */}
        <mesh position={[0, 0.48, 0]} castShadow>
          <boxGeometry args={[0.55, 0.08, 0.52]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.8} />
        </mesh>

        {/* Curved backrest */}
        <mesh position={[0, 0.85, 0.24]} rotation={[-0.08, 0, 0]} castShadow>
          <boxGeometry args={[0.5, 0.65, 0.06]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.8} />
        </mesh>

        {/* Central piston */}
        <mesh position={[0, 0.24, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.44, 16]} />
          <meshStandardMaterial color="#C7862F" roughness={0.4} metalness={0.2} />
        </mesh>

        {/* 5-star wheeled base */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh
              key={i}
              position={[Math.cos(rad) * 0.25, 0.04, Math.sin(rad) * 0.25]}
              rotation={[0, -rad, 0]}
              castShadow
            >
              <boxGeometry args={[0.28, 0.03, 0.04]} />
              <meshStandardMaterial color="#1E2330" roughness={0.7} />
            </mesh>
          );
        })}
      </group>

      {/* ========================================================
          3. MORPH OBJECT: BUKU BESAR <-> LAPTOP
          ======================================================== */}
      <group
        position={[-1.8, 0.772, -2.4]}
        scale={isBukuHovered ? [1.06, 1.06, 1.06] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('buku_laptop');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('buku_laptop');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Base body: Buku besar cover / Laptop bottom chassis */}
        <mesh position={[0, 0.012, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.024, 0.38]} />
          <meshStandardMaterial
            color={morphProgress > 0.5 ? '#1E2330' : '#4A3525'} // Leather brown -> Dark slate
            roughness={0.7}
          />
        </mesh>

        {/* Inner page spread / Keyboard keyboard deck */}
        <mesh position={[0, 0.025, 0]} receiveShadow>
          <boxGeometry args={[0.5, 0.005, 0.35]} />
          <meshStandardMaterial
            color={morphProgress > 0.5 ? '#242B38' : '#FFFDF7'} // Cream pages -> Key deck
            roughness={0.8}
          />
        </mesh>

        {/* Keyboard keys (fade in with morphProgress) */}
        {morphProgress > 0.1 && (
          <group position={[0, 0.03, 0.02]} scale={[morphProgress, 1, morphProgress]}>
            {/* Keyboard grid block */}
            <mesh receiveShadow>
              <boxGeometry args={[0.42, 0.004, 0.18]} />
              <meshStandardMaterial color="#151821" roughness={0.6} />
            </mesh>
            {/* Trackpad */}
            <mesh position={[0, 0.001, 0.12]} receiveShadow>
              <boxGeometry args={[0.16, 0.003, 0.09]} />
              <meshStandardMaterial color="#2B3242" roughness={0.5} />
            </mesh>
          </group>
        )}

        {/* Ledger lines when in analog mode */}
        {morphProgress < 0.6 && (
          <group position={[0, 0.029, 0]} scale={[1 - morphProgress, 1, 1 - morphProgress]}>
            {/* Center binding seam */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.015, 0.002, 0.34]} />
              <meshStandardMaterial color="#C7862F" roughness={0.8} />
            </mesh>
            {/* Red margin lines */}
            <mesh position={[-0.18, 0, 0]}>
              <boxGeometry args={[0.003, 0.002, 0.32]} />
              <meshStandardMaterial color="#E8A855" />
            </mesh>
            <mesh position={[0.18, 0, 0]}>
              <boxGeometry args={[0.003, 0.002, 0.32]} />
              <meshStandardMaterial color="#E8A855" />
            </mesh>
          </group>
        )}

        {/* Hinge group at the back edge: Lid / Standing Screen */}
        <group ref={laptopHingeRef} position={[0, 0.024, -0.19]}>
          {/* Lid outer shell */}
          <mesh position={[0, 0.18, 0.008]} castShadow>
            <boxGeometry args={[0.54, 0.36, 0.016]} />
            <meshStandardMaterial
              color={morphProgress > 0.5 ? '#1E2330' : '#4A3525'}
              roughness={0.6}
            />
          </mesh>

          {/* Screen surface with glowing code when morphProgress > 0.3 */}
          <mesh position={[0, 0.18, 0.017]}>
            <boxGeometry args={[0.5, 0.32, 0.002]} />
            <meshStandardMaterial
              map={monitorTexture}
              emissive="#2F5D5A"
              emissiveIntensity={morphProgress * (isNightMode ? 0.7 : 0.35)}
              roughness={0.4}
            />
          </mesh>
        </group>

        {/* Interactive indicator pill above laptop */}
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          4. 3 FLOATING UI CARDS (MORPH FROM 3 FLAT PAPER SHEETS)
          ======================================================== */}
      {/* Card 1: Kearsipan & Presensi */}
      <group
        ref={cardGroup1Ref}
        position={[-1.1, 0.78, -2.1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('buku_laptop');
        }}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.01, 0.44]} />
          <meshStandardMaterial
            color="#FFFDF8"
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>
        {/* Card Header (Deep Teal appears with morph) */}
        <mesh position={[0, 0.008, -0.17]}>
          <boxGeometry args={[0.32, 0.004, 0.07]} />
          <meshStandardMaterial
            color={morphProgress > 0.4 ? '#2F5D5A' : '#C7862F'}
            roughness={0.6}
          />
        </mesh>
      </group>

      {/* Card 2: Habit Tracker & AI Daily Planner */}
      <group
        ref={cardGroup2Ref}
        position={[-0.7, 0.78, -2.55]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('buku_laptop');
        }}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.01, 0.44]} />
          <meshStandardMaterial
            color="#FFFDF8"
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>
        <mesh position={[0, 0.008, -0.17]}>
          <boxGeometry args={[0.32, 0.004, 0.07]} />
          <meshStandardMaterial
            color={morphProgress > 0.4 ? '#4C8783' : '#C7862F'}
            roughness={0.6}
          />
        </mesh>
      </group>

      {/* Card 3: Financial Wealth Advisor 50/30/20 */}
      <group
        ref={cardGroup3Ref}
        position={[-0.3, 0.78, -2.2]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('buku_laptop');
        }}
      >
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.01, 0.44]} />
          <meshStandardMaterial
            color="#FFFDF8"
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>
        <mesh position={[0, 0.008, -0.17]}>
          <boxGeometry args={[0.32, 0.004, 0.07]} />
          <meshStandardMaterial
            color={morphProgress > 0.4 ? '#E8A855' : '#C7862F'}
            roughness={0.6}
          />
        </mesh>
      </group>

      {/* ========================================================
          5. MONITOR SHOWCASE (PROJECTS HOTSPOT)
          ======================================================== */}
      <group
        position={[1.6, 0.772, -2.6]}
        scale={isMonitorHovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('monitor');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('monitor');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Curved monitor stand base */}
        <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.02, 32]} />
          <meshStandardMaterial color="#1E2330" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Vertical monitor neck */}
        <mesh position={[0, 0.24, -0.08]} castShadow>
          <boxGeometry args={[0.07, 0.44, 0.05]} />
          <meshStandardMaterial color="#2B3242" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Ultra-wide Monitor Frame */}
        <group position={[0, 0.46, 0]}>
          {/* Bezel frame */}
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.85, 0.06]} />
            <meshStandardMaterial color="#151821" roughness={0.3} metalness={0.4} />
          </mesh>

          {/* Active display screen */}
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[1.44, 0.79]} />
            <meshBasicMaterial map={monitorTexture} />
          </mesh>

          {/* Glowing bottom indicator LED */}
          <mesh position={[0, -0.41, 0.033]}>
            <sphereGeometry args={[0.008, 16, 16]} />
            <meshBasicMaterial color="#E8A855" />
          </mesh>
        </group>

        {/* Keyboard & Mouse on desk in front of monitor */}
        <mesh position={[0, 0.012, 0.42]} castShadow receiveShadow>
          <boxGeometry args={[0.62, 0.018, 0.19]} />
          <meshStandardMaterial color="#1E2330" roughness={0.7} />
        </mesh>

        {/* Ergonomic mouse */}
        <mesh position={[0.42, 0.018, 0.42]} castShadow>
          <boxGeometry args={[0.075, 0.03, 0.12]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.5} />
        </mesh>

        {/* Hotspot anchor pin */}
        <mesh position={[0, 0.95, 0]}>
          <sphereGeometry args={[0.032, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          6. TELEPON MEJA (CONTACT HOTSPOT)
          ======================================================== */}
      <group
        position={[2.3, 0.772, -2.3]}
        scale={isPhoneHovered ? [1.08, 1.08, 1.08] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('telepon');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('telepon');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Telephone base cradle */}
        <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.26, 0.08, 0.28]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.6} />
        </mesh>

        {/* Number buttons grid */}
        <mesh position={[-0.04, 0.085, 0.02]} receiveShadow>
          <boxGeometry args={[0.12, 0.01, 0.14]} />
          <meshStandardMaterial color="#242B38" roughness={0.7} />
        </mesh>

        {/* Handset resting on top */}
        <group position={[0.06, 0.09, 0]} rotation={[0, 0, -0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.07, 0.04, 0.32]} />
            <meshStandardMaterial color="#2F5D5A" roughness={0.5} />
          </mesh>
          {/* Earpiece */}
          <mesh position={[0, -0.02, -0.12]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
            <meshStandardMaterial color="#242B38" />
          </mesh>
          {/* Mouthpiece */}
          <mesh position={[0, -0.02, 0.12]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
            <meshStandardMaterial color="#242B38" />
          </mesh>
        </group>

        {/* Hotspot indicator */}
        <mesh position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          7. LEMARI ARSIP <-> SERVER RACK (EXPERIENCE HOTSPOT)
          ======================================================== */}
      <group
        position={[-3.8, 0.65, -2.55]}
        scale={isServerHovered ? [1.04, 1.04, 1.04] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('lemari_server');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('lemari_server');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Main Cabinet Body (Color lerp between Cream and Deep Teal) */}
        <mesh ref={serverRackRef} position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.05, 1.3, 0.75]} />
          <meshStandardMaterial
            color={morphProgress > 0.5 ? '#2F5D5A' : '#EAE3D4'}
            roughness={0.7}
            metalness={morphProgress * 0.3}
          />
        </mesh>

        {/* Drawers / Rack Slots */}
        {[-0.4, -0.13, 0.14, 0.41].map((y, idx) => (
          <group key={idx} position={[0, y, 0.38]}>
            {/* Slot panel */}
            <mesh receiveShadow>
              <boxGeometry args={[0.92, 0.22, 0.02]} />
              <meshStandardMaterial
                color={morphProgress > 0.5 ? '#1E2330' : '#FFFDF8'}
                roughness={0.6}
              />
            </mesh>

            {/* Handle in Analog mode */}
            {morphProgress < 0.6 && (
              <mesh position={[0, 0, 0.025]} castShadow>
                <boxGeometry args={[0.24, 0.025, 0.02]} />
                <meshStandardMaterial color="#C7862F" roughness={0.4} />
              </mesh>
            )}

            {/* Blinking LEDs in Server mode */}
            {morphProgress > 0.3 && (
              <group position={[0.32, 0, 0.015]}>
                <mesh>
                  <sphereGeometry args={[0.014, 16, 16]} />
                  <meshBasicMaterial color="#27C93F" />
                </mesh>
                <mesh position={[-0.05, 0, 0]}>
                  <sphereGeometry args={[0.014, 16, 16]} />
                  <meshBasicMaterial color={idx % 2 === 0 ? '#E8A855' : '#4C8783'} />
                </mesh>
              </group>
            )}
          </group>
        ))}

        {/* Indicator marker */}
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* Desk Small Accessories: Desk Lamp, Coffee Mug, Pen Holder, Retro Camera */}
      {/* Desk Gooseneck Lamp with glowing bulb */}
      <group position={[-0.8, 0.772, -2.6]}>
        {/* Lamp Base */}
        <mesh position={[0, 0.015, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.09, 0.03, 24]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.5} />
        </mesh>
        {/* Lamp Curved Arm */}
        <mesh position={[0, 0.18, 0]} rotation={[0, 0, 0.15]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.34, 16]} />
          <meshStandardMaterial color="#C7862F" metalness={0.4} />
        </mesh>
        {/* Lamp Cone Shade */}
        <group position={[0.08, 0.35, 0.08]} rotation={[0.6, 0, -0.2]}>
          <mesh castShadow>
            <coneGeometry args={[0.09, 0.14, 24, 1, true]} />
            <meshStandardMaterial color="#2F5D5A" roughness={0.6} side={THREE.DoubleSide} />
          </mesh>
          {/* Glowing bulb inside lamp */}
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.032, 16, 16]} />
            <meshStandardMaterial
              color="#FFD27A"
              emissive="#FFD27A"
              emissiveIntensity={isNightMode ? 3.5 : 0.8}
            />
          </mesh>
        </group>
      </group>

      <group position={[0.75, 0.772, -2.1]}>
        {/* Ceramic coffee mug */}
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.11, 16]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.4} />
        </mesh>
        {/* Coffee inside */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.005, 16]} />
          <meshStandardMaterial color="#3E2723" roughness={0.3} />
        </mesh>
        {/* Procedural steam puff */}
        <mesh ref={steamRef} position={[0, 0.16, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshBasicMaterial color="#EAE3D4" transparent opacity={0.35} />
        </mesh>
      </group>

      {/* Small potted desk succulent */}
      <group position={[0.95, 0.772, -2.7]}>
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.04, 0.08, 16]} />
          <meshStandardMaterial color="#E8A855" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.1, 0]} castShadow>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color="#4C8783" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
