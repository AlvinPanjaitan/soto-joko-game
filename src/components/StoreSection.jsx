import { useState } from 'react';
import '../styles/StoreDrawer.css';

export function StoreSection({ upgrades, money, onBuyUpgrade, bgTheme = 'kabel' }) {
  const [activeTab, setActiveTab] = useState('menu');
  const [isOpen, setIsOpen] = useState(true);

  // Toggle minimize hanya diizinkan untuk layar desktop (> 768px)
  const handleHeaderClick = () => {
    if (window.innerWidth > 768) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <aside
      onClick={(e) => e.stopPropagation()} // Mencegah klik di area toko memicu spawn pembeli
      className={`store-drawer ${isOpen ? 'is-open' : 'is-closed'} theme-${bgTheme}`}
    >
      {/* Header Toko + Tombol Hide/Show */}
      <div className="store-header">
        <div className="store-header-clickable" onClick={handleHeaderClick}>
          <div className="store-title-group">
            <h2 className="store-title">STORE & UPGRADE</h2>
          </div>

          <div className="store-controls-group">
            <span className="store-item-count">
              {upgrades.filter((u) => u.category === activeTab).length} Item
            </span>
            {/* PANAH DIPERBAIKI: Terbuka = ▲, Tertutup = ▼ */}
            <button className="store-toggle-btn" aria-label="Toggle Store">
              {isOpen ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {/* Tab Navigasi Kategori (Tanpa Emoticon) */}
        {(isOpen || window.innerWidth <= 768) && (
          <div className="store-tabs">
            {[
              { id: 'menu', label: 'Menu' },
              { id: 'facility', label: 'Fasilitas' },
              { id: 'customer', label: 'Pembeli' },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`store-tab-btn ${isActive ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* List Item Upgrade Vertikal */}
      {(isOpen || window.innerWidth <= 768) && (
        <div className="store-content-scroll">
          {upgrades
            .filter((item) => item.category === activeTab)
            .map((item) => {
              const currentCost = Math.floor(item.baseCost * Math.pow(item.costMultiplier, item.level));
              const canAfford = money >= currentCost;

              return (
                <div
                  key={item.id}
                  className={`store-item-card ${canAfford ? 'can-afford' : 'cannot-afford'}`}
                >
                  {/* Icon Box */}
                  <div className="store-item-icon">
                    {item.icon}
                  </div>

                  {/* Informasi Item */}
                  <div className="store-item-details">
                    <div className="store-item-title-row">
                      <h3 className="store-item-name">{item.name}</h3>
                      <span className="store-item-level">Lv.{item.level}</span>
                    </div>
                    <p className="store-item-desc">{item.desc}</p>
                  </div>

                  {/* Tombol Beli */}
                  <button
                    onClick={() => onBuyUpgrade(item)}
                    disabled={!canAfford}
                    className="store-buy-btn"
                  >
                    <span>BELI</span>
                    <small>Rp {currentCost.toLocaleString('id-ID')}</small>
                  </button>
                </div>
              );
            })}
        </div>
      )}
    </aside>
  );
}