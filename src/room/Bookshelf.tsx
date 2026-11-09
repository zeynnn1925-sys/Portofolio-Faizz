import { useState } from 'react';
import * as THREE from 'three';
import { SKILL_BOOKS, type SkillBook } from '../data/skills';
import { createBookSpineTexture } from './proceduralTextures';

interface BookshelfProps {
  onSelectHotspot: (id: string) => void;
  onSelectSkillBook: (book: SkillBook) => void;
  selectedBookId: string | null;
  hoveredHotspot: string | null;
  setHoveredHotspot: (id: string | null) => void;
}

export function Bookshelf({
  onSelectHotspot,
  onSelectSkillBook,
  selectedBookId,
  hoveredHotspot,
  setHoveredHotspot,
}: BookshelfProps) {
  const [hoveredBookId, setHoveredBookId] = useState<string | null>(null);

  const isShelfHovered = hoveredHotspot === 'rak_buku';

  // Group books onto 4 spacious shelves:
  // Shelf 1 (y: 2.15): Bahasa Pemrograman Utama (8 books)
  // Shelf 2 (y: 1.55): Frontend Framework & Tools (6 books)
  // Shelf 3 (y: 0.95): Backend & Basis Data (6 books)
  // Shelf 4 (y: 0.35): Administrasi & Data (4 books)
  const shelvesData = [
    { y: 2.15, books: SKILL_BOOKS.slice(0, 8), title: 'Bahasa Pemrograman' },
    { y: 1.55, books: SKILL_BOOKS.slice(8, 14), title: 'Frontend & Tools' },
    { y: 0.95, books: SKILL_BOOKS.slice(14, 20), title: 'Backend & DB' },
    { y: 0.35, books: SKILL_BOOKS.slice(20, 24), title: 'Administrasi & Data' },
  ];

  return (
    <group
      position={[3.85, 0, -2.5]}
      scale={isShelfHovered ? [1.02, 1.02, 1.02] : [1, 1, 1]}
      onClick={(e) => {
        e.stopPropagation();
        onSelectHotspot('rak_buku');
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredHotspot('rak_buku');
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHoveredHotspot(null);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* ========================================================
          1. WIDER & TALLER WOODEN BOOKCASE STRUCTURE
          ======================================================== */}
      {/* Outer frame left pillar */}
      <mesh position={[-0.85, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 2.8, 0.48]} />
        <meshStandardMaterial color="#EAE3D4" roughness={0.7} />
      </mesh>

      {/* Outer frame right pillar */}
      <mesh position={[0.85, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.07, 2.8, 0.48]} />
        <meshStandardMaterial color="#EAE3D4" roughness={0.7} />
      </mesh>

      {/* Top crown molding */}
      <mesh position={[0, 2.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.82, 0.08, 0.52]} />
        <meshStandardMaterial color="#C7862F" roughness={0.6} />
      </mesh>

      {/* Bottom base plinth */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.08, 0.5]} />
        <meshStandardMaterial color="#C7862F" roughness={0.6} />
      </mesh>

      {/* Backboard panel */}
      <mesh position={[0, 1.4, -0.22]} receiveShadow>
        <boxGeometry args={[1.72, 2.7, 0.02]} />
        <meshStandardMaterial color="#F4EFE6" roughness={0.8} />
      </mesh>

      {/* 5 Horizontal Shelf Planks */}
      {[0.08, 0.68, 1.28, 1.88, 2.48].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.68, 0.04, 0.46]} />
          <meshStandardMaterial color="#E0D7C6" roughness={0.7} />
        </mesh>
      ))}

      {/* Hotspot indicator sphere floating above shelf */}
      <mesh position={[0, 3.0, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#E8A855" />
      </mesh>

      {/* ========================================================
          2. SKILL BOOKS ON SHELVES WITH SLIDING & HOVER INTERACTION
          ======================================================== */}
      {shelvesData.map((shelf, sIdx) => {
        const count = shelf.books.length;
        // Calculate dynamic spacing so all books fit comfortably
        const shelfSpan = 1.45;
        const spacing = shelfSpan / Math.max(count, 1);
        const startX = -shelfSpan / 2 + spacing / 2;

        return (
          <group key={sIdx} position={[0, shelf.y, 0]}>
            {shelf.books.map((book, bIdx) => {
              const isSelected = selectedBookId === book.id;
              const isHovered = hoveredBookId === book.id;
              const posX = startX + bIdx * spacing;
              // When selected or hovered, slide book forward out of the shelf
              const posZ = isSelected ? 0.14 : isHovered ? 0.06 : 0;
              const bookWidth = Math.min(0.065, spacing * 0.78);

              const spineTex = createBookSpineTexture(book.spineText, book.color);

              return (
                <group
                  key={book.id}
                  position={[posX, 0.18, posZ]}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHotspot('rak_buku');
                    onSelectSkillBook(book);
                  }}
                  onPointerOver={(e) => {
                    e.stopPropagation();
                    setHoveredBookId(book.id);
                    document.body.style.cursor = 'pointer';
                  }}
                  onPointerOut={() => {
                    setHoveredBookId(null);
                  }}
                >
                  {/* Book Body (Clay beveled volume) */}
                  <mesh castShadow receiveShadow>
                    <boxGeometry args={[bookWidth, 0.32, 0.28]} />
                    <meshStandardMaterial
                      color={book.color}
                      roughness={0.7}
                    />
                  </mesh>

                  {/* Spine Front Face with Title Text */}
                  <mesh position={[0, 0, 0.141]}>
                    <planeGeometry args={[bookWidth * 0.95, 0.315]} />
                    <meshBasicMaterial map={spineTex} />
                  </mesh>

                  {/* Pages texture edge on top and side */}
                  <mesh position={[0, 0, -0.01]}>
                    <boxGeometry args={[bookWidth * 0.9, 0.31, 0.26]} />
                    <meshStandardMaterial color="#FFFDF7" roughness={0.9} />
                  </mesh>

                  {/* Golden bookmark ribbon hanging down */}
                  <mesh position={[0, -0.17, 0.04]} rotation={[0, 0, 0.05]}>
                    <boxGeometry args={[0.01, 0.08, 0.002]} />
                    <meshStandardMaterial color="#E8A855" />
                  </mesh>
                </group>
              );
            })}
          </group>
        );
      })}

      {/* Decorative Bookends & Mini Clay Artifacts on shelf */}
      <group position={[0.62, 1.34, 0]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.08]} />
          <meshStandardMaterial color="#242B38" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.06, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.03, 16]} />
          <meshStandardMaterial color="#C7862F" metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}
