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

  // Determine active camera shot
  const currentShot: CameraShot | null = React.useMemo(() => {
    if (!activeHotspotId || activeHotspotId === 'overview') {
      return null;
    }
    const found = HOTSPOTS.find((h) => h.id === activeHotspotId);
    return found ? found.shot : null;
  }, [activeHotspotId]);

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
