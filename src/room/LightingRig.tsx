import { useRef } from 'react';
import * as THREE from 'three';

interface LightingRigProps {
  isNightMode: boolean;
  lowPowerMode: boolean;
}

export function LightingRig({ isNightMode, lowPowerMode }: LightingRigProps) {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  // Lighting tokens from DESIGN.md:
  // lamp: #FFD27A, amber-clay: #E8A855, deep-teal: #2F5D5A, night: #15121A
  const dayKeyColor = '#FFF5E4';
  const nightKeyColor = '#94B4D6';
  const warmHemiSky = isNightMode ? '#181C26' : '#F7EFE1';
  const warmHemiGround = isNightMode ? '#0F1218' : '#E2D3BE';

  return (
    <group>
      {/* Ambient hemisphere light: Darker at night to accentuate desk & neon glows */}
      <hemisphereLight
        args={[warmHemiSky, warmHemiGround, isNightMode ? 0.22 : 0.85]}
      />

      {/* Main directional key light with soft shadow map */}
      <directionalLight
        ref={dirLightRef}
        position={[-3.5, 5.5, 4.0]}
        intensity={isNightMode ? 0.15 : 1.15}
        color={isNightMode ? nightKeyColor : dayKeyColor}
        castShadow={!lowPowerMode}
        shadow-mapSize-width={lowPowerMode ? 1024 : 2048}
        shadow-mapSize-height={lowPowerMode ? 1024 : 2048}
        shadow-camera-near={1}
        shadow-camera-far={18}
        shadow-camera-left={-5.5}
        shadow-camera-right={5.5}
        shadow-camera-top={4.5}
        shadow-camera-bottom={-4.5}
        shadow-bias={-0.0004}
      />

      {/* Desk SpotLight pointing down at the desk surface — powerful spotlight when night mode is on */}
      <spotLight
        position={[0.2, 2.6, -2.2]}
        target-position={[0.2, 0.75, -2.4]}
        intensity={isNightMode ? 3.8 : 0.6}
        color="#FFD27A"
        angle={Math.PI / 3.8}
        penumbra={0.75}
        distance={5.0}
        decay={1.8}
        castShadow={!lowPowerMode}
      />

      {/* Desk lamp local point light */}
      <pointLight
        position={[0.8, 1.35, -2.5]}
        intensity={isNightMode ? 2.5 : 0.4}
        distance={3.2}
        color="#FFD27A"
        decay={2}
      />

      {/* Neon zeynn.dev backlight (glows prominently in night mode, dim in daylight) */}
      <pointLight
        position={[0, 2.85, -2.75]}
        intensity={isNightMode ? 3.5 : 0.15}
        distance={4.8}
        color="#E8A855"
        decay={1.8}
      />

      {/* Monitor screen glow */}
      <pointLight
        position={[1.6, 1.25, -2.35]}
        intensity={isNightMode ? 1.2 : 0.4}
        distance={2.2}
        color="#4C8783"
        decay={2}
      />

      {/* Floor lamp warm corner light */}
      {!lowPowerMode && (
        <pointLight
          position={[-3.9, 2.2, 1.5]}
          intensity={isNightMode ? 1.8 : 0.5}
          distance={4.0}
          color="#FFD27A"
          decay={2}
        />
      )}

      {/* Window moonlight fill */}
      <pointLight
        position={[-2.8, 2.1, -2.8]}
        intensity={isNightMode ? 1.2 : 0.4}
        distance={5.0}
        color={isNightMode ? '#7AA0D0' : '#FFDE9B'}
        decay={2}
      />
    </group>
  );
}
