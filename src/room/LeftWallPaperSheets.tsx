import { useMemo } from 'react';
import { createTypewriterSheetTexture, createChalkboardTexture } from './proceduralTextures';

interface LeftWallPaperSheetsProps {
  onSelectHotspot: (id: string) => void;
  hoveredHotspot: string | null;
  setHoveredHotspot: (id: string | null) => void;
}

export function LeftWallPaperSheets({
  onSelectHotspot,
  hoveredHotspot,
  setHoveredHotspot,
}: LeftWallPaperSheetsProps) {
  const texProfil = useMemo(() => createTypewriterSheetTexture('profil'), []);
  const texAdmin = useMemo(() => createTypewriterSheetTexture('administrasi'), []);
  const texProyek = useMemo(() => createTypewriterSheetTexture('proyek'), []);
  const texChalk = useMemo(() => createChalkboardTexture(), []);

  const isSheetHovered = hoveredHotspot === 'sertifikat';

  return (
    <group position={[-4.47, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* ========================================================
          1. THREE TYPEWRITER PAPER SHEETS (EXPERIENCE HOTSPOT)
          ======================================================== */}
      <group
        position={[0.1, 1.8, 0]}
        scale={isSheetHovered ? [1.03, 1.03, 1.03] : [1, 1, 1]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('sertifikat');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredHotspot('sertifikat');
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Wooden backing board */}
        <mesh position={[0, 0, -0.015]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.25, 0.02]} />
          <meshStandardMaterial color="#EAE3D4" roughness={0.7} />
        </mesh>

        {/* Sheet 1: Profil & Latar Belakang */}
        <group position={[-0.75, 0, 0]}>
          <mesh castShadow receiveShadow>
            <planeGeometry args={[0.68, 1.02]} />
            <meshStandardMaterial map={texProfil} roughness={0.8} />
          </mesh>
          {/* Metal binder clip on top */}
          <mesh position={[0, 0.51, 0.01]} castShadow>
            <boxGeometry args={[0.12, 0.04, 0.02]} />
            <meshStandardMaterial color="#2F5D5A" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>

        {/* Sheet 2: Kearsipan & Administrasi OPMAZ */}
        <group position={[0, 0, 0]}>
          <mesh castShadow receiveShadow>
            <planeGeometry args={[0.68, 1.02]} />
            <meshStandardMaterial map={texAdmin} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.51, 0.01]} castShadow>
            <boxGeometry args={[0.12, 0.04, 0.02]} />
            <meshStandardMaterial color="#C7862F" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>

        {/* Sheet 3: Proyek & Lomba */}
        <group position={[0.75, 0, 0]}>
          <mesh castShadow receiveShadow>
            <planeGeometry args={[0.68, 1.02]} />
            <meshStandardMaterial map={texProyek} roughness={0.8} />
          </mesh>
          <mesh position={[0, 0.51, 0.01]} castShadow>
            <boxGeometry args={[0.12, 0.04, 0.02]} />
            <meshStandardMaterial color="#2F5D5A" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>

        {/* Hotspot indicator */}
        <mesh position={[0, 0.68, 0.04]}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#E8A855" />
        </mesh>
      </group>

      {/* ========================================================
          2. CHALKBOARD ARCHITECTURAL DIAGRAM
          ======================================================== */}
      <group position={[-1.75, 1.8, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.7, 0.95, 0.03]} />
          <meshStandardMaterial color="#C7862F" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[1.62, 0.87]} />
          <meshStandardMaterial map={texChalk} roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
