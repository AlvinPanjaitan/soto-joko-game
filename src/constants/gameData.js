export const STORAGE_KEY = 'warung_soto_game_save_v1';

export const BACKGROUND_LOCATIONS = [
  {
    id: 'kabel',
    name: 'Kantin Belakang (KABEL)',
    shortName: 'KABEL',
    bgColor: '#1e1b4b',
    bgImage: '/assets/kabel-full.png',
    bgPosition: 'center',        // Desktop
    bgSize: 'cover',             // Desktop
    mobileBgPosition: '38% center', // Khusus Mobile
    mobileBgSize: 'cover',       // Khusus Mobile
    jokoPos: {
      bottom: '15%',
      left: '39%',
      height: '70vh',
    },
    mobileJokoPos: {
      bottom: '22%',             // Posisinya disesuaikan agar pas di atas meja/lantai mobile
      left: '40%',               // Center-ish sesuai layout mobile
      height: '40vh',            // Menggunakan vh
    },
    crowdPos: {
      top: '63%',                // Posisi berjalan di KABEL (Desktop) -> Makin kecil, makin naik
      mobileTop: '68%',          // Posisi berjalan di KABEL (Mobile)
      height: '120px',
    },
  },
  {
    id: 'kandep',
    name: 'Kantin Depan (KANDEP)',
    shortName: 'KANDEP',
    bgColor: '#064e3b',
    bgImage: '/assets/kandep-full.png',
    bgPosition: 'center',        // Desktop
    bgSize: 'cover',             // Desktop
    mobileBgPosition: '50% center', // Khusus Mobile
    mobileBgSize: 'cover',       // Khusus Mobile
    jokoPos: {
      bottom: '18%',
      left: '38%',
      height: '35vh',
    },
    mobileJokoPos: {
      bottom: '26%',
      left: '23%',
      height: '20vh',            // Menggunakan vh
    },
    crowdPos: {
      top: '75%',                // Posisi berjalan di KANDEP (Desktop)
      mobileTop: '70%',          // Posisi berjalan di KANDEP (Mobile)
      height: '80px',
    },
  },
];

// ==========================================
// MASTER DATA POOL KARAKTER PEMBELI (CROWD)
// ==========================================
// Setiap karakter memiliki `image` (pose jalan) & `payImage` (pose bayar).
// Property `height` & `mobileHeight` mendukung spesifikasi per lokasi.
export const CUSTOMER_POOL = [
  // 1. Cowo Putih Abu-abu (Ada di semua tempat - 3 karakter)
  {
    id: 'cowo_sma_1',
    name: 'Siswa SMA 1',
    image: '/assets/customers/cowo-sma-1.png',
    payImage: '/assets/customers/cowo-sma-1-pay.png', // Dynamic pose saat beli
    locations: ['all'],
    height: {
      kabel: '430px',   // Ukuran Desktop di KABEL
      kandep: '300px',  // Ukuran Desktop di KANDEP
    },
    mobileHeight: {
      kabel: '350px',    // Ukuran Mobile di KABEL
      kandep: '265px',   // Ukuran Mobile di KANDEP
    },
  },
  {
    id: 'cowo_sma_2',
    name: 'Siswa SMA 2',
    image: '/assets/customers/cowo-sma-2.png',
    payImage: '/assets/customers/cowo-sma-2-pay.png',
    locations: ['all'],
    height: {
      kabel: '120px',
      kandep: '95px',
    },
    mobileHeight: {
      kabel: '80px',
      kandep: '60px',
    },
  },
  {
    id: 'cowo_sma_3',
    name: 'Siswa SMA 3',
    image: '/assets/customers/cowo-sma-3.png',
    payImage: '/assets/customers/cowo-sma-3-pay.png',
    locations: ['all'],
    height: {
      kabel: '120px',
      kandep: '95px',
    },
    mobileHeight: {
      kabel: '80px',
      kandep: '60px',
    },
  },

  // 2. Cewe Putih Abu-abu (Ada di semua tempat - 3 karakter)
  {
    id: 'cewe_sma_1',
    name: 'Siswi SMA 1',
    image: '/assets/customers/cewe-sma-1.png',
    payImage: '/assets/customers/cewe-sma-1-pay.png',
    locations: ['all'],
    height: {
      kabel: '115px',
      kandep: '90px',
    },
    mobileHeight: {
      kabel: '75px',
      kandep: '55px',
    },
  },
  {
    id: 'cewe_sma_2',
    name: 'Siswi SMA 2',
    image: '/assets/customers/cewe-sma-2.png',
    payImage: '/assets/customers/cewe-sma-2-pay.png',
    locations: ['all'],
    height: {
      kabel: '115px',
      kandep: '90px',
    },
    mobileHeight: {
      kabel: '75px',
      kandep: '55px',
    },
  },
  {
    id: 'cewe_sma_3',
    name: 'Siswi SMA 3',
    image: '/assets/customers/cewe-sma-3.png',
    payImage: '/assets/customers/cewe-sma-3-pay.png',
    locations: ['all'],
    height: {
      kabel: '115px',
      kandep: '90px',
    },
    mobileHeight: {
      kabel: '75px',
      kandep: '55px',
    },
  },

  // 3. Cowo Batik (Ada di semua tempat - 2 karakter)
  {
    id: 'cowo_batik_1',
    name: 'Siswa Batik 1',
    image: '/assets/customers/cowo-batik-1.png',
    payImage: '/assets/customers/cowo-batik-1-pay.png',
    locations: ['all'],
    height: {
      kabel: '120px',
      kandep: '95px',
    },
    mobileHeight: {
      kabel: '80px',
      kandep: '60px',
    },
  },
  {
    id: 'cowo_batik_2',
    name: 'Siswa Batik 2',
    image: '/assets/customers/cowo-batik-2.png',
    payImage: '/assets/customers/cowo-batik-2-pay.png',
    locations: ['all'],
    height: {
      kabel: '120px',
      kandep: '95px',
    },
    mobileHeight: {
      kabel: '80px',
      kandep: '60px',
    },
  },

  // 4. Cewe Batik (Ada di semua tempat - 2 karakter)
  {
    id: 'cewe_batik_1',
    name: 'Siswi Batik 1',
    image: '/assets/customers/cewe-batik-1.png',
    payImage: '/assets/customers/cewe-batik-1-pay.png',
    locations: ['all'],
    height: {
      kabel: '115px',
      kandep: '90px',
    },
    mobileHeight: {
      kabel: '75px',
      kandep: '55px',
    },
  },
  {
    id: 'cewe_batik_2',
    name: 'Siswi Batik 2',
    image: '/assets/customers/cewe-batik-2.png',
    payImage: '/assets/customers/cewe-batik-2-pay.png',
    locations: ['all'],
    height: {
      kabel: '115px',
      kandep: '90px',
    },
    mobileHeight: {
      kabel: '75px',
      kandep: '55px',
    },
  },

  // 5. Cowo Polo (HANYA di KABEL - 2 karakter)
  {
    id: 'cowo_polo_1',
    name: 'Mahasiswa Polo 1',
    image: '/assets/customers/cowo-polo-1.png',
    payImage: '/assets/customers/cowo-polo-1-pay.png',
    locations: ['kabel'],
    height: {
      kabel: '125px',
    },
    mobileHeight: {
      kabel: '85px',
    },
  },
  {
    id: 'cowo_polo_2',
    name: 'Mahasiswa Polo 2',
    image: '/assets/customers/cowo-polo-2.png',
    payImage: '/assets/customers/cowo-polo-2-pay.png',
    locations: ['kabel'],
    height: {
      kabel: '125px',
    },
    mobileHeight: {
      kabel: '85px',
    },
  },

  // 6. Cewe Polo (HANYA di KABEL - 2 karakter)
  {
    id: 'cewe_polo_1',
    name: 'Mahasiswi Polo 1',
    image: '/assets/customers/cewe-polo-1.png',
    payImage: '/assets/customers/cewe-polo-1-pay.png',
    locations: ['kabel'],
    height: {
      kabel: '120px',
    },
    mobileHeight: {
      kabel: '80px',
    },
  },
  {
    id: 'cewe_polo_2',
    name: 'Mahasiswi Polo 2',
    image: '/assets/customers/cewe-polo-2.png',
    payImage: '/assets/customers/cewe-polo-2-pay.png',
    locations: ['kabel'],
    height: {
      kabel: '120px',
    },
    mobileHeight: {
      kabel: '80px',
    },
  },
];

// Helper function untuk memfilter dan mengekstrak ukuran karakter sesuai lokasi aktif
export const getCustomersByLocation = (locationId) => {
  return CUSTOMER_POOL
    .filter(
      (customer) => customer.locations.includes('all') || customer.locations.includes(locationId)
    )
    .map((customer) => {
      // Ambil height spesifik lokasi jika berupa object, atau fallback ke default/string
      const resolvedHeight = typeof customer.height === 'object'
        ? customer.height[locationId] || customer.height['kabel'] || '120px'
        : customer.height;

      const resolvedMobileHeight = typeof customer.mobileHeight === 'object'
        ? customer.mobileHeight[locationId] || customer.mobileHeight['kabel'] || '80px'
        : customer.mobileHeight;

      return {
        ...customer,
        height: resolvedHeight,
        mobileHeight: resolvedMobileHeight,
        // Sertakan payImage (fallback ke image biasa jika payImage belum disiapkan)
        payImage: customer.payImage || customer.image, 
      };
    });
};

export const CUSTOMER_ICONS = ['👨‍🎓', '👩‍🎓', '🧑‍🏫', '🎒', '🚶‍♂️', '🚶‍♀️', '🙏', '⭐'];

export const INITIAL_UPGRADES = [
  { id: 'risol', category: 'menu', name: 'Risol Mayo', icon: '🥐', level: 0, baseCost: 50, costMultiplier: 1.4, type: 'click', power: 5000, desc: '+Rp5.000 Uang tiap Klik' },
  { id: 'kopi', category: 'menu', name: 'Kopi Hitam', icon: '☕', level: 0, baseCost: 120, costMultiplier: 1.5, type: 'click', power: 5000, desc: '+Rp5.000 Uang tiap Klik' },
  { id: 'soto_ayam', category: 'menu', name: 'Soto Ayam Komplit', icon: '🍲', level: 0, baseCost: 300, costMultiplier: 1.6, type: 'click', power: 15000, desc: '+Rp15.000 Uang tiap Klik' },
  { id: 'soto_daging', category: 'menu', name: 'Soto Daging Spesial', icon: '🥣', level: 0, baseCost: 800, costMultiplier: 1.7, type: 'click', power: 20000, desc: '+Rp20.000 Uang tiap Klik' },
  { id: 'meja', category: 'facility', name: 'Meja & Kursi Kantin', icon: '🪑', level: 0, baseCost: 150, costMultiplier: 1.5, type: 'passive', power: 50, desc: '+50/dtk Pendapatan Pasif' },
  { id: 'toa', category: 'facility', name: 'Toa Promosi Kantin', icon: '📢', level: 0, baseCost: 500, costMultiplier: 1.6, type: 'passive', power: 200, desc: '+200/dtk Pendapatan Pasif' },
  { id: 'spanduk', category: 'facility', name: 'Spanduk Mbah Joko', icon: '🪧', level: 0, baseCost: 2000, costMultiplier: 1.8, type: 'passive', power: 800, desc: '+800/dtk Pendapatan Pasif' },
  { id: 'pembeli_guru', category: 'customer', name: 'Langganan Guru', icon: '🧑‍🏫', level: 0, baseCost: 3500, costMultiplier: 1.9, type: 'passive', power: 1200, desc: '+1.200/dtk Pendapatan Pasif' },
  { id: 'pembeli_pater', category: 'customer', name: 'Rombongan Pater & Frater', icon: '🙏', level: 0, baseCost: 8000, costMultiplier: 2.1, type: 'passive', power: 3000, desc: '+3.000/dtk Pendapatan Pasif' },
  { id: 'pembeli_special', category: 'customer', name: 'Pelanggan Spesial', icon: '⭐', level: 0, baseCost: 20000, costMultiplier: 2.3, type: 'passive', power: 8000, desc: '+8.000/dtk Pendapatan Pasif' },
];