export const STORAGE_KEY = 'warung_soto_game_save_v1';

export const BACKGROUND_LOCATIONS = [
  {
    id: 'kabel',
    name: 'Kantin Belakang (KABEL)',
    shortName: 'KABEL',
    bgColor: '#1e1b4b',
    bgImage: '/assets/kabel-full.webp',
    bgPosition: 'center',
    bgSize: 'cover',
    mobileBgPosition: '38% center',
    mobileBgSize: 'cover',
    jokoPos: {
      bottom: '15%',
      left: '40%',
      height: '60vh',
    },
    mobileJokoPos: {
      bottom: '22%',
      left: '40%',
      height: '32vh',
    },
    crowdPos: {
      top: '63%',
      mobileTop: '70%',
      height: '430px',        
      mobileHeight: '38vh',   
    },
  },
  {
    id: 'kandep',
    name: 'Kantin Depan (KANDEP)',
    shortName: 'KANDEP',
    bgColor: '#064e3b',
    bgImage: '/assets/kandep-full.webp',
    bgPosition: 'center',
    bgSize: 'cover',
    mobileBgPosition: '50% center', 
    mobileBgSize: 'cover',
    jokoPos: {
      bottom: '18%',
      left: '38.5%',
      height: '33vh',
    },
    mobileJokoPos: {
      bottom: '26%',
      left: '48%',                     
      transform: 'translateX(-120%)',  
      height: '18vh',
    },
    crowdPos: {
      top: '75%',
      mobileTop: '75%',
      height: '300px',        
      mobileHeight: '28vh',   
    },
  },
];

export const CUSTOMER_POOL = [
  { id: 'cowo_sma_1', name: 'Siswa SMA 1', image: '/assets/customers/cowo-sma-1.webp', payImage: '/assets/customers/cowo-sma-1-pay.webp', locations: ['all'] },
  { id: 'cowo_sma_2', name: 'Siswa SMA 2', image: '/assets/customers/cowo-sma-2.webp', payImage: '/assets/customers/cowo-sma-2-pay.webp', locations: ['all'] },
  { id: 'cowo_sma_3', name: 'Siswa SMA 3', image: '/assets/customers/cowo-sma-3.webp', payImage: '/assets/customers/cowo-sma-3-pay.webp', locations: ['all'] },
  { id: 'cewe_sma_1', name: 'Siswi SMA 1', image: '/assets/customers/cewe-sma-1.webp', payImage: '/assets/customers/cewe-sma-1-pay.webp', locations: ['all'] },
  { id: 'cewe_sma_2', name: 'Siswi SMA 2', image: '/assets/customers/cewe-sma-2.webp', payImage: '/assets/customers/cewe-sma-2-pay.webp', locations: ['all'] },
  { id: 'cewe_sma_3', name: 'Siswi SMA 3', image: '/assets/customers/cewe-sma-3.webp', payImage: '/assets/customers/cewe-sma-3-pay.webp', locations: ['all'] },

  { id: 'cowo_batik_1', name: 'Siswa Batik 1', image: '/assets/customers/cowo-batik-1.webp', payImage: '/assets/customers/cowo-batik-1-pay.webp', locations: ['all'] },
  { id: 'cowo_batik_2', name: 'Siswa Batik 2', image: '/assets/customers/cowo-batik-2.webp', payImage: '/assets/customers/cowo-batik-2-pay.webp', locations: ['all'] },
  { id: 'cewe_batik_1', name: 'Siswi Batik 1', image: '/assets/customers/cewe-batik-1.webp', payImage: '/assets/customers/cewe-batik-1-pay.webp', locations: ['all'] },
  { id: 'cewe_batik_2', name: 'Siswi Batik 2', image: '/assets/customers/cewe-batik-2.webp', payImage: '/assets/customers/cewe-batik-2-pay.webp', locations: ['all'] },

  { id: 'cowo_polo_1', name: 'Mahasiswa Polo 1', image: '/assets/customers/cowo-polo-1.webp', payImage: '/assets/customers/cowo-polo-1-pay.webp', locations: ['kabel'] },
  { id: 'cowo_polo_2', name: 'Mahasiswa Polo 2', image: '/assets/customers/cowo-polo-2.webp', payImage: '/assets/customers/cowo-polo-2-pay.webp', locations: ['kabel'] },
  { id: 'cewe_polo_1', name: 'Mahasiswi Polo 1', image: '/assets/customers/cewe-polo-1.webp', payImage: '/assets/customers/cewe-polo-1-pay.webp', locations: ['kabel'] },
  { id: 'cewe_polo_2', name: 'Mahasiswi Polo 2', image: '/assets/customers/cewe-polo-2.webp', payImage: '/assets/customers/cewe-polo-2-pay.webp', locations: ['kabel'] },

  { id: 'guru_pakis', name: 'Guru Pakis', image: '/assets/customers/guru-pakis.webp', payImage: '/assets/customers/guru-pakis-pay.webp', locations: ['all'], unlockedBy: 'pembeli_guru' },
  { id: 'guru_pakyo', name: 'Guru Pak Yo', image: '/assets/customers/guru-pakyo.webp', payImage: '/assets/customers/guru-pakyo-pay.webp', locations: ['all'], unlockedBy: 'pembeli_guru' },
  { id: 'guru_sensei', name: 'Guru Sensei', image: '/assets/customers/guru-sensei.webp', payImage: '/assets/customers/guru-sensei-pay.webp', locations: ['all'], unlockedBy: 'pembeli_guru' },

  { id: 'pater_edu', name: 'Pater Edu', image: '/assets/customers/pater-edu.webp', payImage: '/assets/customers/pater-edu-pay.webp', locations: ['all'], unlockedBy: 'pembeli_pater' },
  { id: 'pater_suroso', name: 'Pater Suroso', image: '/assets/customers/pater-suroso.webp', payImage: '/assets/customers/pater-suroso-pay.webp', locations: ['all'], unlockedBy: 'pembeli_pater' },
  { id: 'pater_wibi', name: 'Pater Wibi', image: '/assets/customers/pater-wibi.webp', payImage: '/assets/customers/pater-wibi-pay.webp', locations: ['all'], unlockedBy: 'pembeli_pater' },

  { id: 'spesial_pandji', name: 'Spesial Pandji', image: '/assets/customers/spesial-pandji.webp', payImage: '/assets/customers/spesial-pandji-pay.webp', locations: ['all'], unlockedBy: 'pembeli_special' },
  { id: 'spesial_renata', name: 'Spesial Renata', image: '/assets/customers/spesial-renata.webp', payImage: '/assets/customers/spesial-renata-pay.webp', locations: ['all'], unlockedBy: 'pembeli_special' },
];

export const getCustomersByLocation = (locationId, userUpgrades = []) => {
  const currentLocation = BACKGROUND_LOCATIONS.find((loc) => loc.id === locationId) || BACKGROUND_LOCATIONS[0];
  const { height = '430px', mobileHeight = '38vh' } = currentLocation.crowdPos || {};

  return CUSTOMER_POOL
    .filter((customer) => {
      const matchesLocation = customer.locations.includes('all') || customer.locations.includes(locationId);
      if (!matchesLocation) return false;

      if (customer.unlockedBy) {
        const matchingUpgrade = userUpgrades.find((u) => u.id === customer.unlockedBy);
        return matchingUpgrade && matchingUpgrade.level > 0;
      }

      return true;
    })
    .map((customer) => ({
      ...customer,
      height,
      mobileHeight,
      payImage: customer.payImage || customer.image,
    }));
};

export const CUSTOMER_ICONS = ['👨‍🎓', '👩‍🎓', '🧑‍🏫', '🎒', '🚶‍♂️', '🚶‍♀️', '🙏', '⭐'];

export const INITIAL_UPGRADES = [
  { id: 'risol', category: 'menu', name: 'Risol', icon: '/assets/upgrades/risol.webp', level: 0, baseCost: 50, costMultiplier: 1.4, type: 'click', power: 5000, desc: '+Rp5.000 Uang tiap Klik' },
  { id: 'soto_ayam', category: 'menu', name: 'Soto Ayam', icon: '/assets/upgrades/soto-ayam.webp', level: 0, baseCost: 120, costMultiplier: 1.5, type: 'click', power: 5000, desc: '+Rp5.000 Uang tiap Klik' },
  { id: 'soto_babat', category: 'menu', name: 'Soto Babat', icon: '/assets/upgrades/soto-babat.webp', level: 0, baseCost: 300, costMultiplier: 1.6, type: 'click', power: 15000, desc: '+Rp15.000 Uang tiap Klik' },
  { id: 'soto_betawi', category: 'menu', name: 'Soto Betawi', icon: '/assets/upgrades/soto-betawi.webp', level: 0, baseCost: 800, costMultiplier: 1.7, type: 'click', power: 20000, desc: '+Rp20.000 Uang tiap Klik' },
  { id: 'meja', category: 'facility', name: 'Meja & Kursi Kantin', icon: '/assets/upgrades/meja.webp', level: 0, baseCost: 150, costMultiplier: 1.5, type: 'passive', power: 50, desc: '+50/dtk Pendapatan Pasif' },
  { id: 'toa', category: 'facility', name: 'Toa Promosi Kantin', icon: '/assets/upgrades/toa.webp', level: 0, baseCost: 500, costMultiplier: 1.6, type: 'passive', power: 200, desc: '+200/dtk Pendapatan Pasif' },
  { id: 'spanduk', category: 'facility', name: 'Spanduk Mbah Joko', icon: '/assets/upgrades/spanduk.webp', level: 0, baseCost: 2000, costMultiplier: 1.8, type: 'passive', power: 800, desc: '+800/dtk Pendapatan Pasif' },
  { id: 'pembeli_guru', category: 'customer', name: 'Guru', icon: '/assets/upgrades/guru.webp', level: 0, baseCost: 3500, costMultiplier: 1.9, type: 'passive', power: 1200, desc: '+1.200/dtk Pendapatan Pasif' },
  { id: 'pembeli_pater', category: 'customer', name: 'Pater', icon: '/assets/upgrades/pater.webp', level: 0, baseCost: 8000, costMultiplier: 2.1, type: 'passive', power: 3000, desc: '+3.000/dtk Pendapatan Pasif' },
  { id: 'pembeli_special', category: 'customer', name: 'Spesial', icon: '/assets/upgrades/spesial.webp', level: 0, baseCost: 20000, costMultiplier: 2.3, type: 'passive', power: 8000, desc: '+8.000/dtk Pendapatan Pasif' },
];