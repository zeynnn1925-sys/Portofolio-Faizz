import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  // Position tracks
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsHidden(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Instantly position the small dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.interactive-card') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeaveWindow = () => setIsHidden(true);
    const handleMouseEnterWindow = () => setIsHidden(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Lerp loop for the larger ring
    let animationFrameId: number;
    const updateRing = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;
      
      // Lerp logic
      ringPosRef.current.x += (targetX - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (targetY - ringPosRef.current.y) * 0.12;

      if (ringRef.current) {
        // Center of the ring is offset
        const offset = isHovered ? 24 : 16;
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x - offset}px, ${ringPosRef.current.y - offset}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateRing);
    };

    animationFrameId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  if (isHidden) return null;

  return (
    <>
      {/* Tiny instantly following cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999] bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-gold transition-transform duration-75 mix-blend-difference"
      />
      {/* Larger smooth lerp cursor ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[99998] border mix-blend-difference transition-all duration-300 ease-out ${
          isHovered 
            ? 'w-12 h-12 border-cyber-pink bg-cyber-pink/10 scale-125' 
            : 'w-8 h-8 border-cyber-cyan bg-transparent'
        }`}
      />
    </>
  );
}
