import React, { useState, useEffect } from 'react';
import { BACKGROUND_LOCATIONS } from '../constants/gameData';

export function GameViewport({ children, bgTheme, onClick }) {
  // Inisialisasi state langsung dari ukuran window saat ini
  const [isMobile, setIsMobile] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentLocation = BACKGROUND_LOCATIONS.find((loc) => loc.id === bgTheme) || BACKGROUND_LOCATIONS[0];

  // Tentukan bgPosition berdasarkan lebar layar
  const activeBgPosition = isMobile 
    ? (currentLocation.mobileBgPosition || currentLocation.bgPosition)
    : currentLocation.bgPosition;

  // Tentukan bgSize berdasarkan lebar layar
  const activeBgSize = isMobile
    ? (currentLocation.mobileBgSize || currentLocation.bgSize || 'cover')
    : (currentLocation.bgSize || 'cover');

  // Tentukan jokoPos berdasarkan lebar layar
  const activeJokoPos = isMobile && currentLocation.mobileJokoPos
    ? currentLocation.mobileJokoPos
    : currentLocation.jokoPos;

  return (
    <div
      onClick={onClick}
      className="game-viewport"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: currentLocation.bgColor,
        backgroundImage: currentLocation.bgImage ? `url(${currentLocation.bgImage})` : 'none',
        backgroundSize: activeBgSize,
        backgroundPosition: activeBgPosition,
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Meneruskan activeJokoPos dan isMobile ke setiap komponen anak */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            jokoPos: activeJokoPos,
            isMobile: isMobile 
          });
        }
        return child;
      })}
    </div>
  );
}