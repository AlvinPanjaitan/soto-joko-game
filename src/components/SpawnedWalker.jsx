import { useState, useEffect, memo } from 'react';

export const SpawnedWalker = memo(({ id, image, payImage, icon, height, amount, onRemove }) => {
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    // 1. Pada detik ke 1.57s (35% durasi animasi walkAndBuySpawn 4.5s) -> ganti ke pose bayar (payImage)
    const startBuyTimer = setTimeout(() => {
      setIsBuying(true);
    }, 1575);

    // 2. Pada detik ke 2.47s (55% durasi animasi walkAndBuySpawn 4.5s) -> kembalikan ke pose jalan biasa (image)
    const endBuyTimer = setTimeout(() => {
      setIsBuying(false);
    }, 2475);

    // 3. Fallback pembersihan komponen dari state jika animationEnd meleset
    const removeTimer = setTimeout(() => {
      onRemove(id);
    }, 4600);

    return () => {
      clearTimeout(startBuyTimer);
      clearTimeout(endBuyTimer);
      clearTimeout(removeTimer);
    };
  }, [id, onRemove]);

  const handleAnimationEnd = (e) => {
    if (e.target === e.currentTarget) {
      onRemove(id);
    }
  };

  // Switch image saat isBuying bernilai true
  const activeImage = isBuying && payImage ? payImage : image;
  const imageSrc = activeImage || icon;

  const isImageFile =
    typeof imageSrc === 'string' &&
    (imageSrc.includes('/') || imageSrc.includes('.') || imageSrc.startsWith('data:'));

  return (
    <div
      className="customer-walker-spawn"
      onAnimationEnd={handleAnimationEnd}
      style={{ userSelect: 'none', pointerEvents: 'none' }}
    >
      <span className="buying-popup-spawn">+Rp{amount.toLocaleString('id-ID')}</span>

      {/* Tambahkan class `is-buying` agar animasi bouncing jalan mati saat berhenti di tengah */}
      <div
        className={`customer-bounce ${isBuying ? 'is-buying' : ''}`}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {isImageFile ? (
          <img
            src={imageSrc}
            alt="Customer Spawn"
            style={{
              height: height || '80px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
            }}
          />
        ) : (
          <span style={{ fontSize: '30px' }}>{imageSrc}</span>
        )}
      </div>
    </div>
  );
});