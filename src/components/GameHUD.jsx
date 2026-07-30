import { BACKGROUND_LOCATIONS } from '../constants/gameData';

export function GameHUD({ money, passiveIncome, clickPower, bgTheme, setBgTheme, onReset }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        right: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 30,
        pointerEvents: 'auto',
      }}
    >
      {/* HUD KIRI: UANG & STATISTIK */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '8px 12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '15px' }}>💰</span>
          <span style={{ fontSize: '16px', fontFamily: 'monospace', fontWeight: '800', color: '#34d399' }}>
            Rp {Math.floor(money).toLocaleString('id-ID')}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', fontSize: '10px', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4px' }}>
          <span>Pasif: <strong style={{ color: '#22d3ee' }}>Rp {passiveIncome.toLocaleString('id-ID')}/s</strong></span>
          <span>Klik: <strong style={{ color: '#f59e0b' }}>Rp {clickPower.toLocaleString('id-ID')}</strong></span>
        </div>
      </div>

      {/* HUD KANAN: TOGGLE SWITCH LOKASI & RESET */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
        {/* Switch Lokasi (KABEL / KANDEP) */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            padding: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        >
          {BACKGROUND_LOCATIONS.map((loc) => {
            const isActive = bgTheme === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setBgTheme(loc.id)}
                title={loc.name}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: 'none',
                  backgroundColor: isActive ? '#f59e0b' : 'transparent',
                  color: isActive ? '#020617' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'uppercase',
                }}
              >
                {loc.shortName || loc.id}
              </button>
            );
          })}
        </div>

        {/* Tombol Reset Kecil Mungil di Bawah Switch */}
        <button
          onClick={onReset}
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.8)',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '6px',
            padding: '2px 8px',
            fontSize: '9px',
            fontWeight: 'bold',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
}