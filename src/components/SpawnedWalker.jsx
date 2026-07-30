import { useEffect, memo } from 'react';

export const SpawnedWalker = memo(({ id, image, icon, height, amount, onRemove }) => {
  // Safe Fallback: Otomatis hapus dari state setelah 4.6 detik jika onAnimationEnd miss
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, 4600); // Sedikit lebih lama dari durasi animasi (4.5s)

    return () => clearTimeout(timer);
  }, [id, onRemove]);

  const handleAnimationEnd = (e) => {
    if (e.target === e.currentTarget) {
      onRemove(id);
    }
  };

  // Menentukan sumber gambar (prioritaskan image PNG, fallback ke icon jika image tidak ada)
  const imageSrc = image || icon;
  const isPng = imageSrc && (imageSrc.endsWith('.png') || imageSrc.startsWith('/assets'));

  return (
    <div
      className="customer-walker-spawn"
      onAnimationEnd={handleAnimationEnd}
      style={{ userSelect: 'none', pointerEvents: 'none' }}
    >
      <span className="buying-popup-spawn">+Rp{amount.toLocaleString('id-ID')}</span>
      
      <div className="customer-bounce" style={{ display: 'flex', justifyContent: 'center' }}>
        {isPng ? (
          <img
            src={imageSrc}
            alt="Customer Spawn"
            style={{
              height: height || '80px', // Fallback default height jika prop tidak terlempar
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
            }}
          />
        ) : (
          /* Fallback jika masih ada data lama yang menggunakan emoji */
          <span style={{ fontSize: '30px' }}>{imageSrc}</span>
        )}
      </div>
    </div>
  );
});