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
  // Load real user photos provided by the user
  const fotoHeroTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/photos/whatsapp_hero.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const foto1Texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/photos/foto1.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const foto2Texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/photos/foto2.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const foto3Texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/photos/foto3.png');
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Glowing neon sign with literal "ZEYNN" typography
  const neonTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#141822';
      ctx.fillRect(0, 0, 512, 128);
      
      // Outer neon border
      ctx.strokeStyle = '#E8A855';
      ctx.lineWidth = 6;
      ctx.strokeRect(12, 12, 488, 104);
      
      // Neon text
      ctx.font = 'bold 54px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFE6A3';
      ctx.shadowColor = '#FFB84D';
      ctx.shadowBlur = 18;
      ctx.fillText('⚡ Z E Y N N ⚡', 256, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const isPosterHovered = hoveredHotspot === 'poster';
  const isSwitchHovered = hoveredHotspot === 'saklar';
  const isCorkboardHovered = hoveredHotspot === 'papan_gabus';

  return (
    <group>
      {/* ========================================================
          1. CENTER HERO POSTER: REAL HERO PHOTO (Gambar WhatsApp)
          ======================================================== */}
      <group
        position={[0, 2.05, -2.96]}
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
        {/* Frame Outer Wooden Molding */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.32, 1.68, 0.045]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.6} />
        </mesh>

        {/* Inner Clay Border in Warm Amber Clay */}
        <mesh position={[0, 0, 0.023]}>
          <boxGeometry args={[1.22, 1.58, 0.005]} />
          <meshStandardMaterial color="#C7862F" roughness={0.4} />
        </mesh>

        {/* Crisp Photo Canvas Plate */}
        <mesh position={[0, 0, 0.027]}>
          <planeGeometry args={[1.18, 1.52]} />
          <meshStandardMaterial
            map={fotoHeroTexture}
            roughness={0.4}
          />
        </mesh>

        {/* Hotspot indicator badge */}
        <mesh position={[0, 0.94, 0.04]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          2. FOTO 1 FRAME (TOP-LEFT): REAL PORTRAIT (FOTO 1.png)
          ======================================================== */}
      <group position={[-1.3, 2.3, -2.96]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.72, 0.95, 0.04]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.66, 0.89, 0.005]} />
          <meshStandardMaterial color="#C7862F" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.62, 0.85]} />
          <meshStandardMaterial map={foto1Texture} roughness={0.4} />
        </mesh>
      </group>

      {/* ========================================================
          3. FOTO 2 FRAME (TOP-RIGHT): REAL PORTRAIT (FOTO 2.png)
          ======================================================== */}
      <group position={[1.3, 2.3, -2.96]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.72, 0.95, 0.04]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.66, 0.89, 0.005]} />
          <meshStandardMaterial color="#C7862F" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.62, 0.85]} />
          <meshStandardMaterial map={foto2Texture} roughness={0.4} />
        </mesh>
      </group>

      {/* ========================================================
          4. FOTO 3 FRAME (LOWER-LEFT): REAL PORTRAIT (FOTO 3.png)
          ======================================================== */}
      <group position={[-1.3, 1.25, -2.96]}>
        <mesh castShadow>
          <boxGeometry args={[0.68, 0.88, 0.035]} />
          <meshStandardMaterial color="#EAE3D4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.018]}>
          <boxGeometry args={[0.62, 0.82, 0.005]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.58, 0.78]} />
          <meshStandardMaterial map={foto3Texture} roughness={0.4} />
        </mesh>
      </group>

      {/* Casual Frame (Right side balance) */}
      <group position={[1.85, 1.45, -2.96]}>
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.65, 0.03]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.017]}>
          <planeGeometry args={[0.44, 0.58]} />
          <meshStandardMaterial map={fotoHeroTexture} roughness={0.4} />
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
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.24, 0.02]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.5} />
        </mesh>

        <mesh position={[0, 0, 0.012]}>
          <boxGeometry args={[0.16, 0.22, 0.005]} />
          <meshStandardMaterial color="#C7862F" roughness={0.4} />
        </mesh>

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
        <mesh castShadow>
          <boxGeometry args={[1.35, 0.95, 0.04]} />
          <meshStandardMaterial color="#C7862F" roughness={0.8} />
        </mesh>

        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[1.25, 0.85]} />
          <meshStandardMaterial color="#C49A6C" roughness={0.95} />
        </mesh>

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
            <mesh position={[0, 0.09, 0.01]}>
              <sphereGeometry args={[0.015, 12, 12]} />
              <meshStandardMaterial color="#E53935" roughness={0.3} />
            </mesh>
          </group>
        ))}

        <mesh position={[0, 0.58, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          7. NEON "ZEYNN" (GLOWS PROMINENTLY IN NIGHT MODE)
          ======================================================== */}
      <group position={[0, 2.95, -2.96]}>
        <mesh>
          <boxGeometry args={[1.9, 0.46, 0.02]} />
          <meshStandardMaterial color="#0E121A" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[1.84, 0.42]} />
          <meshStandardMaterial
            map={neonTexture}
            emissiveMap={neonTexture}
            emissive={isNightMode ? '#FFD27A' : '#443311'}
            emissiveIntensity={isNightMode ? 2.5 : 0.4}
            roughness={0.3}
          />
        </mesh>
        {isNightMode && (
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[1.92, 0.48]} />
            <meshBasicMaterial color="#E8A855" transparent opacity={0.25} />
          </mesh>
        )}
      </group>
    </group>
  );
}
