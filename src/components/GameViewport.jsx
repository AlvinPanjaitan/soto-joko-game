import { BACKGROUND_LOCATIONS } from '../constants/gameData';

export function GameViewport({ children, bgTheme, onClick }) {
  const currentLocation = BACKGROUND_LOCATIONS.find((loc) => loc.id === bgTheme) || BACKGROUND_LOCATIONS[0];

  return (
    <div
      onClick={onClick}
      style={{
        width: '100%',
        flex: 1,
        minHeight: '380px',
        backgroundColor: currentLocation.bgColor,
        backgroundImage: currentLocation.bgImage ? `url(${currentLocation.bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderRadius: '16px',
        border: '2px solid #334155',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',
        userSelect: 'none',
        boxSizing: 'border-box',
        transition: 'background-color 0.4s ease',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}