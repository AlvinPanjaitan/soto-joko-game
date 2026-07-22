// src/data/upgrades.js

export const initialUpgrades = [
  // --- TYPE: TAP (Meningkatkan Pendapatan Per Click) ---
  {
    id: 'soto_biasa',
    name: 'Soto Ayam Biasa',
    type: 'tap',
    baseCost: 10000,
    costMultiplier: 1.5,
    basePower: 500, // Nambah Rp 500 per tap
    level: 0,
    icon: '🥣',
    desc: 'Menu standar porsi pelajar Gonzaga.',
  },
  {
    id: 'soto_daging',
    name: 'Soto Daging Spesial',
    type: 'tap',
    baseCost: 50000,
    costMultiplier: 1.6,
    basePower: 2500, // Nambah Rp 2.500 per tap
    level: 0,
    icon: '🍲',
    desc: 'Daging melimpah, favorit para guru.',
  },

  // --- TYPE: PASSIVE (Meningkatkan Pendapatan Per Detik) ---
  {
    id: 'asisten_joko',
    name: 'Rekrut Asisten Joko',
    type: 'passive',
    baseCost: 20000,
    costMultiplier: 1.6,
    basePower: 2000, // Nambah Rp 2.000 / detik
    level: 0,
    icon: '👨‍🍳',
    desc: 'Bantu racik bumbu pas jam ramai.',
  },
  {
    id: 'meja_tambahan',
    name: 'Sewa Meja Kantin Ekstra',
    type: 'passive',
    baseCost: 100000,
    costMultiplier: 1.7,
    basePower: 8000, // Nambah Rp 8.000 / detik
    level: 0,
    icon: '🪑',
    desc: 'Biar anak-anak Gonz gak nunggu berdiri.',
  },
];