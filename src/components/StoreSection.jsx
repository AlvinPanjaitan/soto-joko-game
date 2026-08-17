import { useState } from 'react';
import '../styles/StoreDrawer.css';

export function StoreSection({ upgrades, money, onBuyUpgrade, bgTheme = 'kabel' }) {
  const [activeTab, setActiveTab] = useState('menu');
  const [isOpen, setIsOpen] = useState(true);

  
  const handleHeaderClick = () => {
    if (window.innerWidth > 768) {
      setIsOpen((prev) => !prev);
    }
  };

  
  const renderItemIcon = (icon, name) => {
    if (typeof icon === 'string' && (icon.startsWith('/') || icon.includes('.'))) {
      return (
        <img 
          src={icon} 
          alt={name} 
          className="store-item-img-icon" 
        />
      );
    }
    return icon;
  };

  return (
    <aside
      onClick={(e) => e.stopPropagation()} 
      className={`store-drawer ${isOpen ? 'is-open' : 'is-closed'} theme-${bgTheme}`}
    >
      
      <div className="store-header">
        <div className="store-header-clickable" onClick={handleHeaderClick}>
          <div className="store-title-group">
            <h2 className="store-title">STORE & UPGRADE</h2>
          </div>

          <div className="store-controls-group">
            <span className="store-item-count">
              {upgrades.filter((u) => u.category === activeTab).length} Item
            </span>
            <button className="store-toggle-btn" aria-label="Toggle Store">
              {isOpen ? '▲' : '▼'}
            </button>
          </div>
        </div>


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
                  
                  <div className="store-item-icon">
                    {renderItemIcon(item.icon, item.name)}
                  </div>


                  <div className="store-item-details">
                    <div className="store-item-title-row">
                      <h3 className="store-item-name">{item.name}</h3>
                      <span className="store-item-level">Lv.{item.level}</span>
                    </div>
                    <p className="store-item-desc">{item.desc}</p>
                  </div>


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