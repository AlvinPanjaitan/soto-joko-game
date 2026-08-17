import { useState, useEffect, memo } from 'react';

export const SpawnedWalker = memo(({ id, image, payImage, icon, height, mobileHeight, amount, onRemove }) => {
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    const startBuyTimer = setTimeout(() => {
      setIsBuying(true);
    }, 1575);

    const endBuyTimer = setTimeout(() => {
      setIsBuying(false);
    }, 2475);

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

  const activeImage = isBuying && payImage ? payImage : image;
  const imageSrc = activeImage || icon;

  const isImageFile =
    typeof imageSrc === 'string' &&
    (imageSrc.includes('/') || imageSrc.includes('.') || imageSrc.startsWith('data:'));

  return (
    <div
      className="customer-walker-spawn"
      onAnimationEnd={handleAnimationEnd}
      style={{
        '--walker-height': height || '50vh',
        '--walker-mobile-height': mobileHeight || '30vh',
      }}
    >
      <span className="buying-popup-spawn">+Rp{amount.toLocaleString('id-ID')}</span>

      <div className="customer-bounce-wrapper">
        {isImageFile ? (
          <img
            src={imageSrc}
            alt="Customer Spawn"
            className={`customer-bounce ${isBuying ? 'is-buying' : ''}`}
          />
        ) : (
          <span style={{ fontSize: '30px' }}>{imageSrc}</span>
        )}
      </div>
    </div>
  );
});