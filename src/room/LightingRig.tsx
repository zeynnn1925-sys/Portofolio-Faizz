import { useRef } from 'react';
import * as THREE from 'three';

interface LightingRigProps {
  isNightMode: boolean;
  lowPowerMode: boolean;
}

export function LightingRig({ isNightMode, lowPowerMode }: LightingRigProps) {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);

  // Clear, crisp studio illumination tokens:
  // Daylight: crisp sunbeam + vibrant ambient illumination
  // Night: deep moody room with bright spot focus on desk, window & neon
  const dayKeyColor = '#FFFDF5';
  const nightKeyColor = '#A0C2E8';
  const warmHemiSky = isNightMode ? '#1C2232' : '#FFFFFF';
  const warmHemiGround = isNightMode ? '#121620' : '#EAE3D4';

  return (
    <group>
      {/* Ambient hemisphere light: Clear & luminous in day, atmospheric at night */}
      <hemisphereLight
        args={[warmHemiSky, warmHemiGround, isNightMode ? 0.35 : 1.15]}
      />

      {/* Main directional key light */}
      <directionalLight
        ref={dirLightRef}
        position={[-3.5, 6.0, 4.5]}
        intensity={isNightMode ? 0.3 : 1.45}
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

      {/* Soft Fill Light from the right to avoid murky corners */}
      <directionalLight
        position={[4.0, 3.5, 2.5]}
        intensity={isNightMode ? 0.15 : 0.65}
        color={isNightMode ? '#85A6CC' : '#FFF8EE'}
      />

      {/* Desk SpotLight pointing down at the desk surface */}
      <spotLight
        position={[0.2, 2.6, -2.2]}
        target-position={[0.2, 0.75, -2.4]}
        intensity={isNightMode ? 4.2 : 1.2}
        color="#FFD27A"
        angle={Math.PI / 3.6}
        penumbra={0.7}
        distance={5.5}
        decay={1.8}
        castShadow={!lowPowerMode}
      />

      {/* Desk lamp local point light */}
      <pointLight
        position={[0.8, 1.4, -2.5]}
        intensity={isNightMode ? 2.8 : 0.8}
        distance={3.5}
        color="#FFD27A"
        decay={2}
      />

      {/* Neon zeynn.dev backlight */}
      <pointLight
        position={[0, 2.9, -2.75]}
        intensity={isNightMode ? 4.0 : 0.35}
        distance={5.0}
        color="#E8A855"
        decay={1.8}
      />

      {/* Monitor screen glow */}
      <pointLight
        position={[1.6, 1.25, -2.35]}
        intensity={isNightMode ? 1.4 : 0.6}
        distance={2.4}
        color="#4C8783"
        decay={2}
      />

      {/* Bookshelf accent light to keep books crisp and clearly readable */}
      <pointLight
        position={[3.2, 2.0, -1.8]}
        intensity={isNightMode ? 1.6 : 0.9}
        distance={3.8}
        color="#FFF6E5"
        decay={2}
      />

      {/* Floor lamp warm corner light */}
      {!lowPowerMode && (
        <pointLight
          position={[-3.9, 2.2, 1.5]}
          intensity={isNightMode ? 2.2 : 0.8}
          distance={4.5}
          color="#FFD27A"
          decay={2}
        />
      )}

      {/* Window light fill */}
      <pointLight
        position={[-2.8, 2.1, -2.8]}
        intensity={isNightMode ? 1.6 : 1.8}
        distance={5.5}
        color={isNightMode ? '#7AA0D0' : '#FFF2D4'}
        decay={2}
      />
    </group>
  );
}
