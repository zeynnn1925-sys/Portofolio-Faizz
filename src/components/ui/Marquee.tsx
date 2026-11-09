import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function Marquee({
  children,
  direction = 'left',
  speed = 30,
  className = '',
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden flex select-none ${className}`}>
      <div
        className="flex shrink-0 items-center gap-4 py-2 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
      <div
        className="flex shrink-0 items-center gap-4 py-2 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
