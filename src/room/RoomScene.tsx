import { useMemo } from 'react';
import * as THREE from 'three';
import { createWoodFloorTexture, createWallpaperTexture, createRugTexture } from './proceduralTextures';
import { LightingRig } from './LightingRig';
import { MorphableDesk } from './MorphableDesk';
import { Bookshelf } from './Bookshelf';
import { PhotoGallery } from './PhotoGallery';
import { LeftWallPaperSheets } from './LeftWallPaperSheets';
import { Decorations } from './Decorations';
import { type SkillBook } from '../data/skills';

interface RoomSceneProps {
  onSelectHotspot: (id: string) => void;
  hoveredHotspot: string | null;
  setHoveredHotspot: (id: string | null) => void;
  selectedBookId: string | null;
  onSelectSkillBook: (book: SkillBook) => void;
  morphProgress: number;
  isNightMode: boolean;
  onToggleLight: () => void;
  lowPowerMode: boolean;
  reducedMotion: boolean;
  terminalInput?: string;
  terminalHistory?: string[];
  monitorMode?: 'code' | 'terminal';
}

export function RoomScene({
  onSelectHotspot,
  hoveredHotspot,
  setHoveredHotspot,
  selectedBookId,
  onSelectSkillBook,
  morphProgress,
  isNightMode,
  onToggleLight,
  lowPowerMode,
  reducedMotion,
  terminalInput,
  terminalHistory,
  monitorMode,
}: RoomSceneProps) {
  const woodFloorTexture = useMemo(() => createWoodFloorTexture(), []);
  const wallpaperTexture = useMemo(() => createWallpaperTexture(), []);
  const rugTexture = useMemo(() => createRugTexture(), []);

  return (
    <group>
      {/* Studio Lighting Rig */}
      <LightingRig isNightMode={isNightMode} lowPowerMode={lowPowerMode} />

      {/* ========================================================
          1. ARCHITECTURAL DIORAMA ENCLOSURE (9m x 3.2m x 6m)
          ======================================================== */}
      {/* Floor with procedural wood parquet */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        onClick={(e) => {
          // Clicking empty floor resets to overview
          e.stopPropagation();
          onSelectHotspot('overview');
        }}
      >
        <planeGeometry args={[9.0, 6.0]} />
        <meshStandardMaterial
          map={woodFloorTexture}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* Center Circular Woven Mandala Rug */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.005, -0.6]}
        receiveShadow
      >
        <planeGeometry args={[3.2, 3.2]} />
        <meshStandardMaterial
          map={rugTexture}
          transparent
          roughness={0.9}
        />
      </mesh>

      {/* Back Wall with warm wallpaper */}
      <mesh
        position={[0, 1.6, -3.0]}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('overview');
        }}
      >
        <planeGeometry args={[9.0, 3.2]} />
        <meshStandardMaterial
          map={wallpaperTexture}
          roughness={0.8}
        />
      </mesh>

      {/* Left Wall */}
      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[-4.5, 1.6, 0]}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('overview');
        }}
      >
        <planeGeometry args={[6.0, 3.2]} />
        <meshStandardMaterial
          map={wallpaperTexture}
          roughness={0.8}
        />
      </mesh>

      {/* Right Wall */}
      <mesh
        rotation={[0, -Math.PI / 2, 0]}
        position={[4.5, 1.6, 0]}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelectHotspot('overview');
        }}
      >
        <planeGeometry args={[6.0, 3.2]} />
        <meshStandardMaterial
          map={wallpaperTexture}
          roughness={0.8}
        />
      </mesh>

      {/* Ceiling panel with soft warm bone-dark tone */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, 0]}>
        <planeGeometry args={[9.0, 6.0]} />
        <meshStandardMaterial color="#EAE3D4" roughness={0.9} />
      </mesh>

      {/* Baseboards (Lis bawah kayu / wainscot plinth) */}
      <mesh position={[0, 0.08, -2.99]} receiveShadow>
        <boxGeometry args={[9.0, 0.16, 0.02]} />
        <meshStandardMaterial color="#C7862F" roughness={0.6} />
      </mesh>
      <mesh position={[-4.49, 0.08, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[6.0, 0.16, 0.02]} />
        <meshStandardMaterial color="#C7862F" roughness={0.6} />
      </mesh>
      <mesh position={[4.49, 0.08, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[6.0, 0.16, 0.02]} />
        <meshStandardMaterial color="#C7862F" roughness={0.6} />
      </mesh>

      {/* ========================================================
          2. INTERACTIVE ROOM CONTENT & FURNITURE
          ======================================================== */}
      {/* Morphable Desk, Laptop, Monitor, Phone, and Filing Cabinet / Server Rack */}
      <MorphableDesk
        morphProgress={morphProgress}
        onSelectHotspot={onSelectHotspot}
        hoveredHotspot={hoveredHotspot}
        setHoveredHotspot={setHoveredHotspot}
        isNightMode={isNightMode}
        terminalInput={terminalInput}
        terminalHistory={terminalHistory}
        monitorMode={monitorMode}
      />

      {/* Interactive Bookshelf with Skill Books */}
      <Bookshelf
        onSelectHotspot={onSelectHotspot}
        onSelectSkillBook={onSelectSkillBook}
        selectedBookId={selectedBookId}
        hoveredHotspot={hoveredHotspot}
        setHoveredHotspot={setHoveredHotspot}
      />

      {/* Photo Gallery on Back Wall & Light Switch */}
      <PhotoGallery
        onSelectHotspot={onSelectHotspot}
        hoveredHotspot={hoveredHotspot}
        setHoveredHotspot={setHoveredHotspot}
        isNightMode={isNightMode}
        onToggleLight={onToggleLight}
      />

      {/* Left Wall Typewriter Sheets & Blackboard */}
      <LeftWallPaperSheets
        onSelectHotspot={onSelectHotspot}
        hoveredHotspot={hoveredHotspot}
        setHoveredHotspot={setHoveredHotspot}
      />

      {/* Clock, Window, Posters, Sleeping Cat, Plants, Poufs, Floor Lamp */}
      <Decorations
        onSelectHotspot={onSelectHotspot}
        hoveredHotspot={hoveredHotspot}
        setHoveredHotspot={setHoveredHotspot}
        isNightMode={isNightMode}
        reducedMotion={reducedMotion}
      />
    </group>
  );
}
