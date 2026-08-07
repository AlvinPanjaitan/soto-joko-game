import { useState, useEffect, useRef } from 'react';

export function JokoCharacter({ isCooking, jokoPos }) {
  const POSE_IDLE = '/assets/joko-idle.webp';
  const POSE_COOKING = '/assets/joko-cook.webp';

  const [currentPose, setCurrentPose] = useState(POSE_IDLE);
  const timerRef = useRef(null);

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

  // Fallback aman jika jokoPos belum terdefinisi
  const pos = jokoPos || { bottom: '15%', left: '39%', height: '70vh' };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: pos.bottom,
        left: pos.left,
        transform: 'translateX(-50%)',
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
          height: pos.height,
          objectFit: 'contain',
        }}
      />
    </div>
  );
}