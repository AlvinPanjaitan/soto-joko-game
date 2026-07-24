import { useEffect, memo } from 'react';

export const SpawnedWalker = memo(({ id, icon, amount, onRemove }) => {
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

  return (
    <div
      className="customer-walker-spawn"
      onAnimationEnd={handleAnimationEnd}
      style={{ userSelect: 'none', pointerEvents: 'none' }}
    >
      <span className="buying-popup-spawn">+Rp{amount.toLocaleString('id-ID')}</span>
      <span className="customer-bounce" style={{ fontSize: '30px' }}>
        {icon}
      </span>
    </div>
  );
});