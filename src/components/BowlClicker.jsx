export function BowlClicker({ clickPower }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto 0',
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      {/* Visual Mangkuk Soto */}
      <div 
        style={{ 
          fontSize: '72px', 
          filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.6))',
          userSelect: 'none',
        }}
      >
        🍲
      </div>

      <div
        style={{
          marginTop: '12px',
          padding: '8px 18px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
          color: '#f1f5f9',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
        }}
      >
        Panggil Pembeli (+Rp {clickPower.toLocaleString('id-ID')})
      </div>
    </div>
  );
}