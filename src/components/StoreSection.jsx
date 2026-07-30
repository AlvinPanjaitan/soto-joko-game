import { useState } from 'react';

export function StoreSection({ upgrades, money, onBuyUpgrade }) {
  const [activeTab, setActiveTab] = useState('menu');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      onClick={(e) => e.stopPropagation()} // Mencegah klik di area toko memicu spawn pembeli
      className={`store-drawer ${isOpen ? 'is-open' : 'is-closed'}`}
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.94)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: '10px 12px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 25,
        boxSizing: 'border-box',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
    >
      {/* Header Toko + Tombol Hide/Show */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          paddingBottom: isOpen ? '8px' : '0', 
          borderBottom: isOpen ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
          flexShrink: 0
        }}
      >
        <div 
          onClick={() => setIsOpen((prev) => !prev)}
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px' }}>🛒</span>
            <h2 style={{ fontSize: '12px', fontWeight: '800', color: '#f8fafc', margin: 0, letterSpacing: '0.5px' }}>
              STORE & UPGRADE
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
              {upgrades.filter((u) => u.category === activeTab).length} Item
            </span>
            <button
              className="store-toggle-btn"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#f59e0b',
                border: 'none',
                borderRadius: '6px',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {isOpen ? '▼' : '▲'}
            </button>
          </div>
        </div>

        {/* Tab Navigasi Kategori */}
        {isOpen && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
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
                    padding: '5px 2px',
                    borderRadius: '6px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    border: '1px solid',
                    borderColor: isActive ? '#f59e0b' : '#334155',
                    backgroundColor: isActive ? 'rgba(245, 158, 11, 0.2)' : '#020617',
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
        )}
      </div>

      {/* List Item Upgrade Vertikal */}
      {isOpen && (
        <div 
          style={{ 
            flex: 1, 
            overflowY: 'auto', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px', 
            paddingRight: '2px',
            marginTop: '8px',
          }}
        >
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
                    gap: '8px',
                    padding: '8px 10px',
                    borderRadius: '10px',
                    border: '1px solid',
                    backgroundColor: canAfford ? 'rgba(30, 41, 59, 0.85)' : 'rgba(2, 6, 23, 0.5)',
                    borderColor: canAfford ? '#334155' : '#1e293b',
                    opacity: canAfford ? 1 : 0.6,
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Icon Box */}
                  <div 
                    style={{ 
                      fontSize: '18px', 
                      backgroundColor: '#020617', 
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '6px', 
                      border: '1px solid #1e293b', 
                      flexShrink: 0 
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Informasi Item */}
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <h3 
                        style={{ 
                          fontWeight: 'bold', 
                          fontSize: '11px', 
                          color: '#f1f5f9', 
                          margin: 0,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.name}
                      </h3>
                      <span 
                        style={{ 
                          fontSize: '8px', 
                          backgroundColor: 'rgba(245, 158, 11, 0.15)', 
                          color: '#f59e0b', 
                          fontWeight: 'bold', 
                          padding: '1px 4px', 
                          borderRadius: '4px',
                          border: '1px solid rgba(245, 158, 11, 0.25)',
                          flexShrink: 0
                        }}
                      >
                        Lv.{item.level}
                      </span>
                    </div>
                    <p style={{ fontSize: '9px', color: '#94a3b8', margin: '2px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Tombol Beli */}
                  <button
                    onClick={() => onBuyUpgrade(item)}
                    disabled={!canAfford}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      fontSize: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      border: 'none',
                      cursor: canAfford ? 'pointer' : 'not-allowed',
                      backgroundColor: canAfford ? '#f59e0b' : '#1e293b',
                      color: canAfford ? '#020617' : '#64748b',
                      transition: 'all 0.15s',
                      minWidth: '65px',
                    }}
                  >
                    <span>BELI</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '8px', fontWeight: '700', marginTop: '1px' }}>
                      Rp {currentCost.toLocaleString('id-ID')}
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </aside>
  );
}