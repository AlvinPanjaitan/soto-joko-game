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
      style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        right: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 30,
        pointerEvents: 'auto',
      }}
    >
      {/* HUD KIRI: STATISTIK PENDAPATAN & UANG */}
      <div className="hud-badge-main">
        {/* ROW ATAS: JUMLAH UANG */}
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

        {/* ROW BAHAW: PASIF & KLIK */}
        <div className="hud-stats-row">
          <div className="hud-stat-pill passive-pill">
            <img
              src={PASSIVE_ICON}
              alt="Passive"
              className="hud-icon-small"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <span>Pasif:</span>
            <strong>+Rp {passiveIncome.toLocaleString('id-ID')}/s</strong>
          </div>

          <div className="hud-stat-pill click-pill">
            <img
              src={CLICK_ICON}
              alt="Click"
              className="hud-icon-small"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <span>Klik:</span>
            <strong>+Rp {clickPower.toLocaleString('id-ID')}</strong>
          </div>
        </div>
      </div>

      {/* HUD KANAN: LOKASI & RESET */}
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