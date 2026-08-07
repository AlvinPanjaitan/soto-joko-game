import { useMemo, useState, useEffect, memo } from 'react';
import { SpawnedWalker } from './SpawnedWalker';
import { getCustomersByLocation, BACKGROUND_LOCATIONS } from '../constants/gameData';
import '../styles/CustomerCrowd.css';

// Komponen individual untuk mendeteksi siklus berjalan & membeli
const AutoWalker = memo(({ customer, clickPower }) => {
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    // 1. Ekstraksi durasi total animasi (contoh: "8s" -> 8000 ms)
    const totalDurationMs = parseFloat(customer.duration) * 1000;
    const delayMs = parseFloat(customer.delay) * 1000;

    let arriveTimer;
    let leaveTimer;
    let intervalTimer;

    const startCycle = () => {
      // Sampai di meja/kantin -> Ganti pose ke payImage
      arriveTimer = setTimeout(() => {
        setIsBuying(true);
      }, totalDurationMs * 0.4);

      // Selesai bayar -> Kembalikan ke pose berjalan biasa
      leaveTimer = setTimeout(() => {
        setIsBuying(false);
      }, totalDurationMs * 0.6);
    };

    // Jalankan siklus pertama setelah delay awal
    const initialTimer = setTimeout(() => {
      startCycle();
      // Repeating cycle untuk animasi infinite
      intervalTimer = setInterval(startCycle, totalDurationMs);
    }, delayMs);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(arriveTimer);
      clearTimeout(leaveTimer);
      clearInterval(intervalTimer);
    };
  }, [customer.duration, customer.delay]);

  // Pilih pose gambar berdasarkan status pembeli
  const currentImage = isBuying && customer.payImage ? customer.payImage : customer.image;

  return (
    <div
      className="customer-walker-auto"
      style={{
        '--duration': customer.duration,
        '--delay': customer.delay,
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <span
        className="buying-popup"
        style={{ '--duration': customer.duration, '--delay': customer.delay }}
      >
        +Rp{clickPower.toLocaleString('id-ID')}
      </span>

      {/* RENDER GAMBAR KARAKTER PNG (Ganti image & matikan bounce saat isBuying) */}
      <img
        src={currentImage}
        alt={customer.name}
        className={`customer-bounce ${isBuying ? 'is-buying' : ''}`}
        style={{
          height: customer.height,
          width: 'auto',
          objectFit: 'contain',
          filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
        }}
      />
    </div>
  );
});

const SpawnedList = memo(({ spawnedWalkers, onRemoveWalker, isMobile }) => {
  return (
    <>
      {spawnedWalkers.map((walker) => (
        <SpawnedWalker
          key={walker.id}
          id={walker.id}
          image={walker.image}
          payImage={walker.payImage} // ✅ DIPERBAIKI: Mengoper prop payImage ke SpawnedWalker
          icon={walker.icon}
          height={isMobile ? walker.mobileHeight : walker.height}
          amount={walker.amount}
          onRemove={onRemoveWalker}
        />
      ))}
    </>
  );
});

export function Crowd({
  passiveIncome,
  spawnedWalkers,
  onRemoveWalker,
  clickPower,
  bgTheme = 'kabel',
  isMobile = false,
}) {
  const maxCustomers = Math.min(Math.max(Math.floor(passiveIncome / 1500) + 2, 2), 6);

  // 1. Ambil data konfigurasi lokasi aktif (KABEL / KANDEP)
  const currentLocation = useMemo(() => {
    return BACKGROUND_LOCATIONS.find((loc) => loc.id === bgTheme) || BACKGROUND_LOCATIONS[0];
  }, [bgTheme]);

  // 2. Ambil daftar pembeli yang valid sesuai lokasi aktif
  const availableCustomers = useMemo(() => {
    return getCustomersByLocation(bgTheme);
  }, [bgTheme]);

  // 3. Generate list pembeli otomatis beserta payImage
  const autoCustomers = useMemo(() => {
    if (!availableCustomers || availableCustomers.length === 0) return [];

    return Array.from({ length: 6 }).map((_, index) => {
      const customerData = availableCustomers[index % availableCustomers.length];
      const duration = 6 + (index % 3) * 2;
      const delay = index * 1.8;

      return {
        id: `auto-${index}`,
        image: customerData.image,
        payImage: customerData.payImage,
        name: customerData.name,
        height: isMobile ? customerData.mobileHeight : customerData.height,
        duration: `${duration}s`,
        delay: `${delay}s`,
      };
    });
  }, [availableCustomers, isMobile]);

  // Destructure posisi dari crowdPos lokasi aktif
  const { top = '42%', mobileTop = '44%' } = currentLocation?.crowdPos || {};

  return (
    <div
      className="crowd-container"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 10,
        '--crowd-top': top,
        '--crowd-mobile-top': mobileTop,
      }}
    >
      {/* Pembeli Otomatis (Pasif) */}
      {autoCustomers.slice(0, maxCustomers).map((customer) => (
        <AutoWalker
          key={customer.id}
          customer={customer}
          clickPower={clickPower}
        />
      ))}

      {/* Pembeli Hasil Spam Klik */}
      <SpawnedList
        spawnedWalkers={spawnedWalkers}
        onRemoveWalker={onRemoveWalker}
        isMobile={isMobile}
      />
    </div>
  );
}