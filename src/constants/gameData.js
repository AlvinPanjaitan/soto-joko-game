export const STORAGE_KEY = 'warung_soto_game_save_v1';

export const BACKGROUND_LOCATIONS = [
  {
    id: 'kabel',
    name: 'Kantin Belakang (KABEL)',
    shortName: 'KABEL',
    bgColor: '#1e1b4b', // Color fallback sebelum ada gambar pixel art
    bgImage: null, // Nanti isi misal: '/assets/backgrounds/kabel.png'
  },
  {
    id: 'kandep',
    name: 'Kantin Depan (KANDEP)',
    shortName: 'KANDEP',
    bgColor: '#064e3b', // Color fallback sebelum ada gambar pixel art
    bgImage: null, // Nanti isi misal: '/assets/backgrounds/kandep.png'
  },
];
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