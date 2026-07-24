import { useMemo, memo } from 'react';
import { SpawnedWalker } from './SpawnedWalker';

const SpawnedList = memo(({ spawnedWalkers, onRemoveWalker }) => {
  return (
    <>
      {spawnedWalkers.map((walker) => (
        <SpawnedWalker
          key={walker.id}
          id={walker.id}
          icon={walker.icon}
          amount={walker.amount}
          onRemove={onRemoveWalker}
        />
      ))}
    </>
  );
});

export function Crowd({ passiveIncome, spawnedWalkers, onRemoveWalker, clickPower }) {
  const maxCustomers = Math.min(Math.max(Math.floor(passiveIncome / 1500) + 2, 2), 6);
  const customerTypes = ['👨‍🎓', '👩‍🎓', '🧑‍🏫', '🎒', '🚶‍♂️', '🚶‍♀️', '🙏', '⭐'];

  const autoCustomers = useMemo(() => {
    return Array.from({ length: 6 }).map((_, index) => {
      const icon = customerTypes[index % customerTypes.length];
      const duration = 6 + (index % 3) * 2; 
      const delay = index * 1.8; 

      return {
        id: `auto-${index}`,
        icon,
        duration: `${duration}s`,
        delay: `${delay}s`,
      };
    });
  }, []);

  return (
    <div 
      style={{
        position: 'absolute',
        bottom: '40px', // Posisi jalur jalan di bagian bawah layar utama
        left: 0,
        width: '100%',
        height: '80px',
        pointerEvents: 'none', // Supaya klik tembus ke layar utama
        overflow: 'hidden',
        zIndex: 10,
      }}
    >
      {/* Pembeli Otomatis (Pasif) */}
      {autoCustomers.slice(0, maxCustomers).map((customer) => (
        <div
          key={customer.id}
          className="customer-walker-auto"
          style={{
            '--duration': customer.duration,
            '--delay': customer.delay,
            userSelect: 'none',
          }}
        >
          <span className="buying-popup" style={{ '--duration': customer.duration, '--delay': customer.delay }}>
            +Rp{clickPower.toLocaleString('id-ID')}
          </span>
          <span className="customer-bounce" style={{ fontSize: '32px' }}>
            {customer.icon}
          </span>
        </div>
      ))}

      {/* Pembeli Hasil Spam Klik */}
      <SpawnedList spawnedWalkers={spawnedWalkers} onRemoveWalker={onRemoveWalker} />
    </div>
  );
}