import { Suspense, lazy, useEffect, useRef, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: '100px', // pre-renders or unloads with a comfortable fallback gap
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative spline-wrapper w-full h-full ${className || ''}`}>
      {isVisible ? (
        <Suspense 
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-black/5">
              <span className="w-8 h-8 border-2 border-t-cyber-cyan border-neutral-800 rounded-full animate-spin"></span>
            </div>
          }
        >
          <Spline
            scene={scene}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-black/5">
          <div className="w-2 h-2 rounded-full bg-cyber-cyan/20 animate-pulse"></div>
        </div>
      )}
      <style>{`
        .spline-wrapper canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
        }
      `}</style>
    </div>
  );
}

