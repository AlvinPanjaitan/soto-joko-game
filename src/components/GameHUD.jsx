import { BACKGROUND_LOCATIONS } from '../constants/gameData';
import '../styles/GameHUD.css';

export function GameHUD({ money, passiveIncome, clickPower, bgTheme = 'kabel', setBgTheme, onReset }) {
  const MONEY_ICON = '/assets/money.webp';
  const PASSIVE_ICON = '/assets/icons/passive.webp';
  const CLICK_ICON = '/assets/icons/click.webp';

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`hud-container theme-${bgTheme}`}
    >
      
      <div className="hud-badge-main">
        
        <div className="hud-money-row">
          <img
            src={MONEY_ICON}
            alt="Coin"
            className="hud-icon-webp"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="hud-money-text">
            <span className="hud-currency-label">Rp</span>
            <span className="hud-money-val">
              {Math.floor(money).toLocaleString('id-ID')}
            </span>
          </div>
        </div>


        <div className="hud-stats-row">
          <div className="hud-stat-pill passive-pill">
            <img
              src={PASSIVE_ICON}
              alt="Passive"
              className="hud-icon-small"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <span className="hud-stat-label">Pasif:</span>
            <strong className="hud-stat-value">+{passiveIncome.toLocaleString('id-ID')}/s</strong>
          </div>

          <div className="hud-stat-pill click-pill">
            <img
              src={CLICK_ICON}
              alt="Click"
              className="hud-icon-small"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <span className="hud-stat-label">Klik:</span>
            <strong className="hud-stat-value">+{clickPower.toLocaleString('id-ID')}</strong>
          </div>
        </div>
      </div>


      <div className="hud-right-panel">
        <div className="hud-location-switch">
          {BACKGROUND_LOCATIONS.map((loc) => {
            const isActive = bgTheme === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setBgTheme(loc.id)}
                className={`hud-loc-btn ${isActive ? 'active' : ''}`}
              >
                {loc.shortName || loc.id}
              </button>
            );
          })}
        </div>

        <button onClick={onReset} className="hud-reset-btn">
          <span>⚙️ Reset</span>
        </button>
      </div>
    </div>
  );
}