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

  // Realistic book dimensions
  const bookHeight = 0.38;
  const bookWidth = 0.084;
  const bookDepth = 0.28;

  // 4 Shelves with exact floor contact (no gap below, comfortable clearance above)
  // Shelf plank Ys: [0.10, 0.70, 1.30, 1.90, 2.50]
  // Plank top surface: plankY + 0.0225
  // Book center Y: plankY + 0.0225 + bookHeight / 2
  const shelvesData = [
    {
      title: 'Bahasa Pemrograman Utama (Rak Atas)',
      centerY: 1.90 + 0.0225 + bookHeight / 2, // 2.1125
      leftBooks: SKILL_BOOKS.slice(0, 4), // TS, JS, Go, Python
      rightBooks: SKILL_BOOKS.slice(4, 8), // SQL, HTML, Bash, JSON
      leftStartX: -0.60,
      rightStartX: 0.08,
    },
    {
      title: 'Frontend Framework & Tools (Rak 2)',
      centerY: 1.30 + 0.0225 + bookHeight / 2, // 1.5125
      leftBooks: SKILL_BOOKS.slice(8, 11), // React, Tailwind, Vite
      rightBooks: SKILL_BOOKS.slice(11, 14), // Framer, PWA, Recharts
      leftStartX: -0.54,
      rightStartX: 0.10,
    },
    {
      title: 'Backend & Basis Data (Rak 3)',
      centerY: 0.70 + 0.0225 + bookHeight / 2, // 0.9125
      leftBooks: SKILL_BOOKS.slice(14, 17), // Node.js, PostgreSQL, Firestore
      rightBooks: SKILL_BOOKS.slice(17, 20), // Drizzle, REST API, Auth JWT
      leftStartX: -0.54,
      rightStartX: 0.10,
    },
    {
      title: 'Administrasi & Data (Rak Bawah)',
      centerY: 0.10 + 0.0225 + bookHeight / 2, // 0.3125
      leftBooks: SKILL_BOOKS.slice(20, 22), // Excel, Notula
      rightBooks: SKILL_BOOKS.slice(22, 24), // Mail Merge, Workspace
      leftStartX: -0.48,
      rightStartX: 0.12,
    },
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
          1. REALISTIC BOOKCASE CABINET WITH VERTICAL PARTITIONS & BACKING
          ======================================================== */}
      {/* Outer frame left pillar */}
      <mesh position={[-0.88, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 2.8, 0.5]} />
        <meshStandardMaterial color="#4A3423" roughness={0.7} />
      </mesh>

      {/* Outer frame right pillar */}
      <mesh position={[0.88, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 2.8, 0.5]} />
        <meshStandardMaterial color="#4A3423" roughness={0.7} />
      </mesh>

      {/* Center vertical divider (Sekat pemisah vertikal agar tampak nyata seperti lemari sungguhan) */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.04, 2.72, 0.46]} />
        <meshStandardMaterial color="#5C422D" roughness={0.7} />
      </mesh>

      {/* Top crown molding */}
      <mesh position={[0, 2.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.09, 0.54]} />
        <meshStandardMaterial color="#C7862F" roughness={0.5} />
      </mesh>

      {/* Bottom base plinth with carved feet */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.88, 0.08, 0.52]} />
        <meshStandardMaterial color="#3D2919" roughness={0.6} />
      </mesh>

      {/* Backboard panel in warm textured wood finish */}
      <mesh position={[0, 1.4, -0.22]} receiveShadow>
        <boxGeometry args={[1.76, 2.7, 0.02]} />
        <meshStandardMaterial color="#D7CABA" roughness={0.8} />
      </mesh>

      {/* 5 Horizontal Shelf Planks with front golden edge lip */}
      {[0.10, 0.70, 1.30, 1.90, 2.50].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.72, 0.045, 0.46]} />
            <meshStandardMaterial color="#5C422D" roughness={0.6} />
          </mesh>
          {/* Front decorative molding strip */}
          <mesh position={[0, 0, 0.235]} castShadow>
            <boxGeometry args={[1.74, 0.02, 0.015]} />
            <meshStandardMaterial color="#C7862F" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Floating indicator sphere */}
      <mesh position={[0, 3.02, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#E8A855" />
      </mesh>

      {/* ========================================================
          2. SNUGLY PACKED BOOKS RESTING NATURALLY ON SHELF PLANKS
          ======================================================== */}
      {shelvesData.map((shelf, sIdx) => {
        // Render helper for tightly grouped books
        const renderBookGroup = (books: SkillBook[], startX: number, isRightGroup: boolean) => {
          return (
            <group key={isRightGroup ? 'right' : 'left'}>
              {books.map((book, bIdx) => {
                const isSelected = selectedBookId === book.id;
                const isHovered = hoveredBookId === book.id;
                // Books touching each other with tiny 2mm spacing
                const posX = startX + bIdx * (bookWidth + 0.002);
                const posZ = isSelected ? 0.12 : isHovered ? 0.05 : 0;

                const spineTex = createBookSpineTexture(book.spineText, book.color);

                return (
                  <group
                    key={book.id}
                    position={[posX, shelf.centerY, posZ]}
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
                    {/* Book Body (Grounded on shelf plank) */}
                    <mesh castShadow receiveShadow>
                      <boxGeometry args={[bookWidth, bookHeight, bookDepth]} />
                      <meshStandardMaterial
                        color={book.color}
                        roughness={0.7}
                      />
                    </mesh>

                    {/* Spine Front Face (High-resolution crisp title & logo) */}
                    <mesh position={[0, 0, bookDepth / 2 + 0.001]}>
                      <planeGeometry args={[bookWidth * 0.98, bookHeight * 0.99]} />
                      <meshBasicMaterial map={spineTex} />
                    </mesh>

                    {/* Paper pages block inside */}
                    <mesh position={[0, 0, -0.01]}>
                      <boxGeometry args={[bookWidth * 0.92, bookHeight * 0.98, bookDepth * 0.96]} />
                      <meshStandardMaterial color="#FFFDF7" roughness={0.9} />
                    </mesh>

                    {/* Subtle golden bottom bookmark ribbon */}
                    <mesh position={[0, -bookHeight / 2 - 0.03, 0.04]} rotation={[0, 0, 0.05]}>
                      <boxGeometry args={[0.012, 0.06, 0.002]} />
                      <meshStandardMaterial color="#E8A855" />
                    </mesh>

                    {/* Hover highlight border */}
                    {(isSelected || isHovered) && (
                      <mesh position={[0, 0, bookDepth / 2 + 0.002]}>
                        <planeGeometry args={[bookWidth, bookHeight]} />
                        <meshBasicMaterial color="#FFD27A" transparent opacity={isSelected ? 0.35 : 0.2} />
                      </mesh>
                    )}
                  </group>
                );
              })}

              {/* Decorative Bookend supporting the row of books */}
              <group position={[startX - 0.055, shelf.centerY - bookHeight / 2 + 0.08, 0]}>
                <mesh castShadow>
                  <boxGeometry args={[0.025, 0.16, 0.22]} />
                  <meshStandardMaterial color="#C7862F" metalness={0.4} roughness={0.5} />
                </mesh>
                <mesh position={[0.035, -0.07, 0]} castShadow>
                  <boxGeometry args={[0.07, 0.02, 0.22]} />
                  <meshStandardMaterial color="#C7862F" metalness={0.4} roughness={0.5} />
                </mesh>
              </group>
            </group>
          );
        };

        return (
          <group key={sIdx}>
            {renderBookGroup(shelf.leftBooks, shelf.leftStartX, false)}
            {renderBookGroup(shelf.rightBooks, shelf.rightStartX, true)}
          </group>
        );
      })}

      {/* Decorative Bookcase Accents */}
      {/* 1. Miniature Succulent Planter on Shelf 2 */}
      <group position={[0.62, 1.30 + 0.0225 + 0.08, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.045, 0.1, 16]} />
          <meshStandardMaterial color="#EAE3D4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.07, 0]} castShadow>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial color="#4A7856" roughness={0.7} />
        </mesh>
      </group>

      {/* 2. Golden Achievement Cup on Shelf 3 */}
      <group position={[0.62, 0.70 + 0.0225 + 0.09, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.02, 0.09, 16]} />
          <meshStandardMaterial color="#E8A855" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.05, 0]} castShadow>
          <boxGeometry args={[0.08, 0.02, 0.08]} />
          <meshStandardMaterial color="#242B38" roughness={0.5} />
        </mesh>
      </group>

      {/* 3. OPMAZ Archive Storage Document Box on Shelf 4 (Bottom) */}
      <group position={[0.55, 0.10 + 0.0225 + 0.14, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.26, 0.32]} />
          <meshStandardMaterial color="#2F5D5A" roughness={0.7} />
        </mesh>
        {/* Label plaque */}
        <mesh position={[0, 0.02, 0.161]}>
          <planeGeometry args={[0.16, 0.08]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
