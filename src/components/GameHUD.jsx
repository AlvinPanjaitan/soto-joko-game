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
        justify: 'space-between',
        alignItems: 'flex-start',
        zIndex: 30,
        pointerEvents: 'auto',
      }}
    >
      {/* HUD Kiri: Total Uang & Pendapatan Pasif */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '8px 14px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>💰</span>
          <span style={{ fontSize: '18px', fontFamily: 'monospace', fontWeight: '800', color: '#34d399' }}>
            Rp {Math.floor(money).toLocaleString('id-ID')}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4px' }}>
          <span>Pasif: <strong style={{ color: '#22d3ee' }}>Rp {passiveIncome.toLocaleString('id-ID')}/s</strong></span>
          <span>Klik: <strong style={{ color: '#f59e0b' }}>Rp {clickPower.toLocaleString('id-ID')}</strong></span>
        </div>
      </div>

      {/* HUD Kanan: Switch Lokasi (KABEL / KANDEP) & Reset */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '12px',
          padding: '6px 10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}
      >
        <span style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: 'bold' }}>📍 Lokasi:</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {BACKGROUND_LOCATIONS.map((loc) => {
            const isActive = bgTheme === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setBgTheme(loc.id)}
                title={loc.name}
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  border: '1px solid',
                  borderColor: isActive ? '#f59e0b' : '#334155',
                  backgroundColor: isActive ? '#f59e0b' : '#020617',
                  color: isActive ? '#020617' : '#94a3b8',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {loc.shortName}
              </button>
            );
          })}
        </div>

        <button
          onClick={onReset}
          style={{
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginLeft: '4px',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}