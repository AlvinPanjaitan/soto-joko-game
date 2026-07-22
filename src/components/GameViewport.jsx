import { useEffect, useRef, useState } from 'react';

// Ukuran virtual "dunia game" yang dikunci
const VIRTUAL_WIDTH = 800;
const VIRTUAL_HEIGHT = 600;

export function GameViewport({ children }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement.clientWidth;
      // Hitung rasio skala berdasarkan lebar container luar
      const newScale = parentWidth / VIRTUAL_WIDTH;
      setScale(Math.min(newScale, 1)); // Maksimal skala 1x
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full flex justify-center items-center overflow-hidden my-4"
    >
      {/* Kotak Dunia Game Terisolasi */}
      <div
        style={{
          width: `${VIRTUAL_WIDTH}px`,
          height: `${VIRTUAL_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
        }}
        className="relative bg-slate-900 rounded-2xl border-2 border-slate-700 overflow-hidden shadow-2xl flex-shrink-0"
      >
        {children}
      </div>
    </div>
  );
}