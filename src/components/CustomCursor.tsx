import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const mouseRef = useRef({ x: -100, y: -100 });
  const cursorPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsHidden(false);
    document.documentElement.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Check current target or active element style to determine if cursor is pointer / grabbing
      const target = e.target as HTMLElement | null;
      const bodyCursor = document.body.style.cursor;

      const isClickable =
        bodyCursor === 'pointer' ||
        target?.tagName === 'A' ||
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.closest('a') !== null ||
        target?.closest('button') !== null ||
        target?.closest('.cursor-pointer') !== null ||
        target?.classList.contains('cursor-pointer');

      setIsPointer(Boolean(isClickable));
    };

    const handleMouseDown = () => {
      setIsGrabbing(true);
    };

    const handleMouseUp = () => {
      setIsGrabbing(false);
    };

    const handleMouseLeaveWindow = () => setIsHidden(true);
    const handleMouseEnterWindow = () => setIsHidden(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    let animationFrameId: number;
    const updateCursor = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      cursorPosRef.current.x += (targetX - cursorPosRef.current.x) * 0.35;
      cursorPosRef.current.y += (targetY - cursorPosRef.current.y) * 0.35;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.documentElement.classList.remove('has-custom-cursor');
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[999999] select-none will-change-transform"
      style={{
        transform: `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0)`,
        marginLeft: isPointer || isGrabbing ? '-6px' : '-4px',
        marginTop: isPointer || isGrabbing ? '-2px' : '-4px',
      }}
    >
      {/* 
        When hovered over interactive 3D books or clickable objects, 
        render an authentic, beautifully styled hand pointer cursor SVG with claymorphic accents.
      */}
      {isPointer ? (
        <div className="relative group transition-transform duration-150 ease-out scale-110 drop-shadow-[0_4px_10px_rgba(36,43,56,0.3)]">
          {/* Hand Pointer SVG */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-sm"
          >
            {/* Hand body with amber/teal clay accents */}
            <path
              d="M10 2C9.44772 2 9 2.44772 9 3V11.2L8.29289 10.4929C7.90237 10.1024 7.2692 10.1024 6.87868 10.4929C6.48816 10.8834 6.48816 11.5166 6.87868 11.9071L10.5858 15.6142C11.3668 16.3953 12.4265 16.8342 13.5312 16.8342H16C17.6569 16.8342 19 15.491 19 13.8342V9C19 8.44772 18.5523 8 18 8C17.4477 8 17 8.44772 17 9V10H16V7C16 6.44772 15.5523 6 15 6C14.4477 6 14 6.44772 14 7V10H13V5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V10H10V3C10 2.44772 9.55228 2 9 2H10Z"
              fill="#FFFDF8"
              stroke="#242B38"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sleek amber finger tip accent */}
            <circle cx="10" cy="4" r="1.5" fill="#E8A855" />
          </svg>
          {/* Subtle pulse ring around click point */}
          <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-amber-clay/30 animate-ping pointer-events-none" />
        </div>
      ) : isGrabbing ? (
        /* Grabbing Hand for dragging camera */
        <div className="relative group transition-transform duration-100 ease-out scale-95 drop-shadow-[0_4px_10px_rgba(36,43,56,0.3)]">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 11V8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V11M9 11V6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6V11M11 11V7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V11M13 11V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V13.5C15 15.433 13.433 17 11.5 17H10C8.34315 17 7 15.6569 7 14V11"
              fill="#EAE3D4"
              stroke="#242B38"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        /* Default subtle clay dot cursor */
        <div className="relative">
          <div className="w-3.5 h-3.5 rounded-full bg-deep-teal border border-white shadow-clay-subtle" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-clay absolute top-1 left-1" />
        </div>
      )}
    </div>
  );
}
