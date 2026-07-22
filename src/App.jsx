import { useState, useEffect, useRef, useMemo } from 'react';

// ==========================================
// 1. KOMPONEN VIRTUAL VIEWPORT (Skala 800x500)
// ==========================================
const VIRTUAL_WIDTH = 800;
const VIRTUAL_HEIGHT = 500;

function GameViewport({ children }) {
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
          backgroundColor: '#0f172a',
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
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ==========================================
// 2. KOMPONEN CROWD (Pembeli)
// ==========================================
function Crowd({ passiveIncome }) {
  const maxCustomers = Math.min(Math.max(Math.floor(passiveIncome / 1500) + 2, 2), 8);
  const customerTypes = ['👨‍🎓', '👩‍🎓', '🧑‍🏫', '🎒', '🚶‍♂️', '🚶‍♀️'];

  const customers = useMemo(() => {
    return Array.from({ length: 8 }).map((_, index) => {
      const icon = customerTypes[index % customerTypes.length];
      const duration = 6 + (index % 3) * 2; 
      const delay = index * 1.8; 

      return {
        id: index,
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
        height: '80px',
        backgroundColor: 'rgba(2, 6, 23, 0.7)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(51, 65, 85, 0.5)',
        margin: '8px 0',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span 
        style={{
          position: 'absolute',
          top: '4px',
          left: '8px',
          fontSize: '10px',
          color: '#64748b',
          fontFamily: 'monospace',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        AREA KANTIN (TERISOLASI)
      </span>

      {customers.slice(0, maxCustomers).map((customer) => (
        <div
          key={customer.id}
          className="customer-walker"
          style={{
            '--duration': customer.duration,
            '--delay': customer.delay,
            userSelect: 'none',
          }}
        >
          <span className="customer-bounce" style={{ fontSize: '30px' }}>
            {customer.icon}
          </span>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 3. MAIN APP
// ==========================================
export default function App() {
  const [money, setMoney] = useState(0);
  const [passiveIncome, setPassiveIncome] = useState(0);
  const [clickPower, setClickPower] = useState(10);
  const [floatingTexts, setFloatingTexts] = useState([]);

  const [upgrades, setUpgrades] = useState([
    {
      id: 'table',
      name: 'Tambah Meja Kantin',
      icon: '🪑',
      level: 0,
      baseCost: 150,
      costMultiplier: 1.5,
      type: 'passive',
      power: 50,
      desc: '+50/dtk Pendapatan Pasif',
    },
    {
      id: 'bowl',
      name: 'Mangkuk Keramik',
      icon: '🥣',
      level: 0,
      baseCost: 300,
      costMultiplier: 1.8,
      type: 'click',
      power: 10,
      desc: '+10 Uang tiap Klik',
    },
    {
      id: 'chef',
      name: 'Sewa Asisten Koki',
      icon: '👨‍🍳',
      level: 0,
      baseCost: 1000,
      costMultiplier: 1.6,
      type: 'passive',
      power: 300,
      desc: '+300/dtk Pendapatan Pasif',
    },
    {
      id: 'banner',
      name: 'Pasang Spanduk Promo',
      icon: '🪧',
      level: 0,
      baseCost: 2500,
      costMultiplier: 2.0,
      type: 'click',
      power: 50,
      desc: '+50 Uang tiap Klik',
    },
    {
      id: 'booth',
      name: 'Cabang Stand Baru',
      icon: '🏪',
      level: 0,
      baseCost: 8000,
      costMultiplier: 2.2,
      type: 'passive',
      power: 1500,
      desc: '+1.500/dtk Pendapatan Pasif',
    },
  ]);

  useEffect(() => {
    if (passiveIncome <= 0) return;
    const interval = setInterval(() => {
      setMoney((prev) => prev + passiveIncome / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [passiveIncome]);

  const handleBowlClick = (e) => {
    setMoney((prev) => prev + clickPower);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newText = {
      id: Date.now() + Math.random(),
      x,
      y,
      text: `+Rp${clickPower.toLocaleString('id-ID')}`,
    };

    setFloatingTexts((prev) => [...prev, newText]);
  };

  const removeFloatingText = (id) => {
    setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
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
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '12px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#f59e0b', margin: 0, tracking: '1px' }}>
          WARUNG SOTO JOKO
        </h1>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>
          Klik mangkuk soto & raih keuntungan maksimal!
        </p>
      </header>

      {/* Top Bar Stats */}
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
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', tracking: '1px' }}>
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
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#94a3b8', tracking: '1px' }}>
            PENDAPATAN PASIF
          </span>
          <span style={{ fontSize: '20px', fontFamily: 'monospace', fontWeight: '800', color: '#22d3ee', marginTop: '2px' }}>
            Rp {passiveIncome.toLocaleString('id-ID')}<span style={{ fontSize: '12px', color: '#64748b' }}>/dtk</span>
          </span>
        </div>
      </div>

      {/* VIRTUAL GAME VIEWPORT */}
      <GameViewport>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#94a3b8', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
          <span>📍 Kantin Utama</span>
          <span style={{ color: '#34d399', fontFamily: 'monospace' }}>Daya Klik: Rp {clickPower}/klik</span>
        </div>

        {/* Mangkuk Soto Clicker */}
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
          <span style={{ fontSize: '11px', color: '#cbd5e1', marginTop: '8px', backgroundColor: '#1e293b', padding: '4px 12px', borderRadius: '9999px', border: '1px solid #334155' }}>
            Tekan Mangkuk (+Rp {clickPower})
          </span>

          {floatingTexts.map((ft) => (
            <span
              key={ft.id}
              onAnimationEnd={() => removeFloatingText(ft.id)}
              className="animate-float-up"
              style={{
                position: 'absolute',
                left: `${ft.x}px`,
                top: `${ft.y}px`,
                color: '#34d399',
                fontWeight: 'bold',
                fontFamily: 'monospace',
                fontSize: '18px',
                pointerEvents: 'none',
              }}
            >
              {ft.text}
            </span>
          ))}
        </div>

        <Crowd passiveIncome={passiveIncome} />
      </GameViewport>

      {/* STORE & UPGRADE PANEL */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', color: '#e2e8f0', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🛒</span> STORE & UPGRADE
          </h2>
          <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
            {upgrades.length} Item Tersedia
          </span>
        </div>

        {/* List Upgrade Container */}
        <div style={{ maxHeight: '260px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
          {upgrades.map((item) => {
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
                {/* Info Kiri */}
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

                {/* Tombol Beli */}
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