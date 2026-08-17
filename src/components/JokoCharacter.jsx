import { useState, useEffect, useRef } from 'react';
import { BACKGROUND_LOCATIONS } from '../constants/gameData';

export function JokoCharacter({ isCooking, bgTheme = 'kabel' }) {
  const POSE_IDLE = '/assets/joko-idle.webp';
  const POSE_COOKING = '/assets/joko-cook.webp';

  const [currentPose, setCurrentPose] = useState(POSE_IDLE);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isCooking) {
      setCurrentPose(POSE_COOKING);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setCurrentPose(POSE_IDLE);
      }, 250);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isCooking]);

  const currentLocation = BACKGROUND_LOCATIONS.find((loc) => loc.id === bgTheme) || BACKGROUND_LOCATIONS[0];
  const pos = isMobile && currentLocation.mobileJokoPos ? currentLocation.mobileJokoPos : currentLocation.jokoPos;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: pos.bottom || '15%',
        left: pos.left || '40%',
        transform: pos.transform || 'translateX(-50%)',
        zIndex: 5,
        pointerEvents: 'none',
        userSelect: 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <img
        src={currentPose}
        alt="Pak Joko"
        className="pixel-art"
        style={{
          height: pos.height || '60vh',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}