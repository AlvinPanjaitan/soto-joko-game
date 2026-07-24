import { useState, useEffect, useRef, useMemo, memo } from 'react';

// ==========================================
// KUNCI STORAGE & DATA DEFAULT
// ==========================================
const STORAGE_KEY = 'warung_soto_game_save_v1';

const INITIAL_UPGRADES = [
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

// Helper untuk membaca save data
function loadSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error('Gagal membaca data dari localStorage', e);
    return null;
  }
}

// ==========================================
// 1. KOMPONEN VIRTUAL VIEWPORT (Skala 800x500)
// ==========================================
const VIRTUAL_WIDTH = 800;
const VIRTUAL_HEIGHT = 500;

function GameViewport({ children, bgTheme }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;
      const parentWidth = containerRef.current.parentElement.clientWidth;
      const newScale = parentWidth / VIRTUAL_WIDTH;
      setScale(Math.min(newScale, 1));
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        margin: '8px 0',
      }}
    >
      <div
        style={{
          width: `${VIRTUAL_WIDTH}px`,
          height: `${VIRTUAL_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          backgroundColor: bgTheme,
          borderRadius: '16px',
          border: '2px solid #334155',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '16px',
          flexShrink: 0,
          userSelect: 'none',
          boxSizing: 'border-box',
          transition: 'background-color 0.3s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ==========================================
// 2. KOMPONEN WALKER HASIL SPAM KLIK
// ==========================================
const SpawnedWalker = memo(({ id, icon, amount, onRemove }) => {
  const handleAnimationEnd = (e) => {
    if (e.target === e.currentTarget) {
      onRemove(id);
    }
  };

  return (
    <div
      className="customer-walker-spawn"
      onAnimationEnd={handleAnimationEnd}
      style={{ userSelect: 'none' }}
    >
      <span className="buying-popup-spawn">+Rp{amount.toLocaleString('id-ID')}</span>
      <span className="customer-bounce" style={{ fontSize: '30px' }}>
        {icon}
      </span>
    </div>
  );
});

// ==========================================
// 3. KOMPONEN CROWD (Pembeli Otomatis + Spawned)
// ==========================================
function Crowd({ passiveIncome, spawnedWalkers, onRemoveWalker, clickPower }) {
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
        position: 'relative',
        width: '100%',
        height: '90px',
        backgroundColor: 'rgba(2, 6, 23, 0.7)',
        borderRadius: '12px',
        border: '1px solid rgba(51, 65, 85, 0.5)',
        margin: '8px 0',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span 
        style={{
          position: 'absolute',
          top: '6px',
          left: '8px',
          fontSize: '10px',
          color: '#64748b',
          fontFamily: 'monospace',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        AREA KANTIN (TRANSAKSI)
      </span>

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
          <span className="customer-bounce" style={{ fontSize: '30px' }}>
            {customer.icon}
          </span>
        </div>
      ))}

      {/* Pembeli Hasil Spam Klik */}
      {spawnedWalkers.map((walker) => (
        <SpawnedWalker
          key={walker.id}
          id={walker.id}
          icon={walker.icon}
          amount={walker.amount}
          onRemove={onRemoveWalker}
        />
      ))}
    </div>
  );
}

// ==========================================
// 4. MAIN APP
// ==========================================
export default function App() {
  const savedData = useMemo(() => loadSavedData(), []);

  // Inisialisasi State dari LocalStorage (atau Default)
  const [money, setMoney] = useState(() => savedData?.money ?? 0);
  const [passiveIncome, setPassiveIncome] = useState(() => savedData?.passiveIncome ?? 0);
  const [clickPower, setClickPower] = useState(() => savedData?.clickPower ?? 10);
  const [bgTheme, setBgTheme] = useState(() => savedData?.bgTheme ?? '#0f172a');
  
  const [upgrades, setUpgrades] = useState(() => {
    if (savedData?.upgrades) {
      // Sinkronisasi data lama dengan list upgrade bawaan
      return INITIAL_UPGRADES.map((item) => {
        const savedItem = savedData.upgrades.find((u) => u.id === item.id);
        return savedItem ? { ...item, level: savedItem.level } : item;
      });
    }
    return INITIAL_UPGRADES;
  });

  const [spawnedWalkers, setSpawnedWalkers] = useState([]);
  const [activeTab, setActiveTab] = useState('menu');

  const colorOptions = [
    { name: 'Default Dark', value: '#0f172a' },
    { name: 'Kantin Warm', value: '#451a03' },
  ];

  const customerIcons = ['👨‍🎓', '👩‍🎓', '🧑‍🏫', '🎒', '🚶‍♂️', '🚶‍♀️', '🙏', '⭐'];
  const spawnCounterRef = useRef(0);

  // AUTO SAVE: Simpan setiap kali nilai penting berubah
  useEffect(() => {
    const dataToSave = {
      money,
      passiveIncome,
      clickPower,
      bgTheme,
      upgrades: upgrades.map(({ id, level }) => ({ id, level })),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Gagal menyimpan progress game ke localStorage', e);
    }
  }, [money, passiveIncome, clickPower, bgTheme, upgrades]);

  // Loop Pendapatan Pasif (10x per detik)
  useEffect(() => {
    if (passiveIncome <= 0) return;
    const interval = setInterval(() => {
      setMoney((prev) => prev + passiveIncome / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [passiveIncome]);

  const handleBowlClick = () => {
    setMoney((prev) => prev + clickPower);

    spawnCounterRef.current += 1;
    const uniqueId = `spawn-${spawnCounterRef.current}`;
    const randomIcon = customerIcons[Math.floor(Math.random() * customerIcons.length)];
    
    const newWalker = {
      id: uniqueId,
      icon: randomIcon,
      amount: clickPower,
    };

    setSpawnedWalkers((prev) => [...prev, newWalker]);
  };

  const removeWalker = (id) => {
    setSpawnedWalkers((prev) => prev.filter((w) => w.id !== id));
  };

  const buyUpgrade = (item) => {
    const currentCost = Math.floor(item.baseCost * Math.pow(item.costMultiplier, item.level));

    if (money >= currentCost) {
      setMoney((prev) => prev - currentCost);

      if (item.type === 'passive') {
        setPassiveIncome((prev) => prev + item.power);
      } else if (item.type === 'click') {
        setClickPower((prev) => prev + item.power);
      }

      setUpgrades((prev) =>
        prev.map((u) => (u.id === item.id ? { ...u, level: u.level + 1 } : u))
      );
    }
  };

  // Fungsi Opsional: Reset Progress
  const resetGame = () => {
    if (window.confirm('Yakin ingin mereset seluruh progress game Warung Soto?')) {
      localStorage.removeItem(STORAGE_KEY);
      setMoney(0);
      setPassiveIncome(0);
      setClickPower(10);
      setBgTheme('#0f172a');
      setUpgrades(INITIAL_UPGRADES);
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundColor: '#020617',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: '12px', position: 'relative', width: '100%', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#f59e0b', margin: 0 }}>
          WARUNG SOTO JOKO
        </h1>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
          Klik mangkuk soto untuk mendatangkan pembeli!
        </p>
        
        {/* Tombol Reset Data */}
        <button
          onClick={resetGame}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
            opacity: 0.8,
          }}
        >
          Reset Data
        </button>
      </header>

      <div 
        style={{
          width: '100%',
          maxWidth: '800px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '8px',
          boxSizing: 'border-box',
        }}
      >
        <div 
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8' }}>
            TOTAL UANG
          </span>
          <span style={{ fontSize: '20px', fontFamily: 'monospace', fontWeight: '800', color: '#34d399', marginTop: '2px' }}>
            Rp {Math.floor(money).toLocaleString('id-ID')}
          </span>
        </div>

        <div 
          style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8' }}>
            PENDAPATAN PASIF
          </span>
          <span style={{ fontSize: '20px', fontFamily: 'monospace', fontWeight: '800', color: '#22d3ee', marginTop: '2px' }}>
            Rp {passiveIncome.toLocaleString('id-ID')}<span style={{ fontSize: '12px', color: '#64748b' }}>/dtk</span>
          </span>
        </div>
      </div>

      <GameViewport bgTheme={bgTheme}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
          <span>📍 Kantin Utama</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: '#cbd5e1' }}>🎨 Latar:</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setBgTheme(opt.value)}
                  title={opt.name}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: opt.value,
                    border: bgTheme === opt.value ? '2px solid #f59e0b' : '1px solid #64748b',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          <span style={{ color: '#34d399', fontFamily: 'monospace' }}>Daya Klik: Rp {clickPower.toLocaleString('id-ID')}/pembeli</span>
        </div>

        <div 
          onClick={handleBowlClick}
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            margin: '4px 0',
          }}
        >
          <div style={{ fontSize: '80px', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.5))' }}>
            🍲
          </div>
          <span style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '8px', backgroundColor: 'rgba(0,0,0,0.4)', padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.15)' }}>
            Panggil Pembeli (+Rp {clickPower.toLocaleString('id-ID')})
          </span>
        </div>

        <Crowd 
          passiveIncome={passiveIncome} 
          spawnedWalkers={spawnedWalkers} 
          onRemoveWalker={removeWalker}
          clickPower={clickPower}
        />
      </GameViewport>

      <section 
        style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
          margin: '8px 0',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#e2e8f0', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🛒</span> STORE & UPGRADE
            </h2>
            <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
              {upgrades.filter((u) => u.category === activeTab).length} Item Tersedia
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {[
              { id: 'menu', label: '🍜 Menu' },
              { id: 'facility', label: '🪑 Fasilitas' },
              { id: 'customer', label: '👥 Pembeli' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    border: '1px solid',
                    borderColor: isActive ? '#f59e0b' : '#334155',
                    backgroundColor: isActive ? 'rgba(245, 158, 11, 0.15)' : '#020617',
                    color: isActive ? '#f59e0b' : '#94a3b8',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
          {upgrades
            .filter((item) => item.category === activeTab)
            .map((item) => {
              const currentCost = Math.floor(item.baseCost * Math.pow(item.costMultiplier, item.level));
              const canAfford = money >= currentCost;

              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid',
                    backgroundColor: canAfford ? 'rgba(30, 41, 59, 0.8)' : 'rgba(2, 6, 23, 0.4)',
                    borderColor: canAfford ? '#334155' : '#1e293b',
                    opacity: canAfford ? 1 : 0.6,
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '28px', backgroundColor: '#020617', padding: '8px', borderRadius: '8px', border: '1px solid #1e293b', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '13px', color: '#f1f5f9', margin: 0 }}>{item.name}</h3>
                        <span style={{ fontSize: '10px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                          Lv. {item.level}
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0 0' }}>{item.desc}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => buyUpgrade(item)}
                    disabled={!canAfford}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      flexShrink: 0,
                      border: 'none',
                      cursor: canAfford ? 'pointer' : 'not-allowed',
                      backgroundColor: canAfford ? '#f59e0b' : '#1e293b',
                      color: canAfford ? '#020617' : '#64748b',
                      transition: 'all 0.15s',
                    }}
                  >
                    <span>BELI</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: '600' }}>
                      Rp {currentCost.toLocaleString('id-ID')}
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}