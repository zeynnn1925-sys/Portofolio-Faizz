import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomScene } from './RoomScene';
import { CameraRig } from './CameraRig';
import { HOTSPOTS, type CameraShot } from '../data/room';
import { type SkillBook } from '../data/skills';

interface RoomCanvasProps {
  activeHotspotId: string;
  onSelectHotspot: (id: string) => void;
  selectedBook: SkillBook | null;
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

export function RoomCanvas({
  activeHotspotId,
  onSelectHotspot,
  selectedBook,
  onSelectSkillBook,
  morphProgress,
  isNightMode,
  onToggleLight,
  lowPowerMode,
  reducedMotion,
  terminalInput,
  terminalHistory,
  monitorMode,
}: RoomCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointerPos, setPointerPos] = useState({ x: 0, y: 0 });
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Determine active camera shot with dynamic shelf positioning
  const currentShot: CameraShot | null = React.useMemo(() => {
    if (!activeHotspotId || activeHotspotId === 'overview') {
      return null;
    }

    if (activeHotspotId === 'rak_buku') {
      if (selectedBook) {
        let shelfTargetY = 1.75;
        if (selectedBook.category === 'Bahasa Pemrograman Utama') {
          shelfTargetY = 2.11; // Top shelf (Rak 1)
        } else if (selectedBook.category === 'Frontend Framework & Tools') {
          shelfTargetY = 1.51; // Shelf 2
        } else if (selectedBook.category === 'Backend & Basis Data') {
          shelfTargetY = 0.91; // Shelf 3
        } else if (selectedBook.category === 'Administrasi & Data') {
          shelfTargetY = 0.31; // Bottom shelf (Rak 4)
        }

        return {
          pos: [2.45, shelfTargetY, -0.65],
          target: [3.85, shelfTargetY, -2.5],
          fov: 32,
        };
      }

      // Default bookshelf view: angled slightly towards upper middle
      return {
        pos: [2.4, 1.85, -0.55],
        target: [3.85, 1.75, -2.5],
        fov: 36,
      };
    }

    const found = HOTSPOTS.find((h) => h.id === activeHotspotId);
    return found ? found.shot : null;
  }, [activeHotspotId, selectedBook]);

  const isOverview = !activeHotspotId || activeHotspotId === 'overview';

  // Pointer tracking for parallax
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointerPos({ x: nx, y: ny });
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative w-full h-full select-none outline-none overflow-hidden"
      tabIndex={0}
      aria-label="Kamar interaktif Zeynn"
      role="region"
    >
      <Canvas
        shadows={!lowPowerMode}
        dpr={lowPowerMode ? 1 : [1, 2]}
        gl={{
          antialias: !lowPowerMode,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        onPointerMissed={() => {
          onSelectHotspot('overview');
        }}
      >
        {/* Camera Rig with smooth GSAP flight */}
        <CameraRig
          currentShot={currentShot}
          onResetToOverview={() => onSelectHotspot('overview')}
          pointerPos={pointerPos}
          isOverview={isOverview}
          reducedMotion={reducedMotion}
        />

        {/* Complete 3D Room Scene */}
        <RoomScene
          onSelectHotspot={onSelectHotspot}
          hoveredHotspot={hoveredHotspot}
          setHoveredHotspot={setHoveredHotspot}
          selectedBookId={selectedBook?.id || null}
          onSelectSkillBook={onSelectSkillBook}
          morphProgress={morphProgress}
          isNightMode={isNightMode}
          onToggleLight={onToggleLight}
          lowPowerMode={lowPowerMode}
          reducedMotion={reducedMotion}
          terminalInput={terminalInput}
          terminalHistory={terminalHistory}
          monitorMode={monitorMode}
        />
      </Canvas>
    </div>
  );
}
