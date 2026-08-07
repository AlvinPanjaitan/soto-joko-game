import { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

export function LoadingScreen({ onFinish, bgTheme = 'kabel' }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false); // State untuk trigger gambar senang Pak Joko
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Simulasi progress loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15) + 5;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Saat progress 100%, tandai game siap
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Handler saat tombol MULAI MAIN diklik
  const handleStartGame = () => {
    // 1. Ubah pose Pak Joko jadi senang!
    setIsGameStarted(true);

    // 2. Beri waktu pemain melihat pose senang Pak Joko (600ms) sebelum fade-out
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 400); // Durasi animasi fade out
    }, 600);
  };

  return (
    <div className={`loading-screen theme-${bgTheme} ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loading-card">
        
        {/* AVATAR PAK JOKO (BERGANTI POSE SAAT DIKLIK) */}
        <div className="loading-avatar-wrapper">
          <div className={`loading-avatar-frame ${isGameStarted ? 'joko-happy-active' : ''}`}>
            <img 
              src={isGameStarted ? '/assets/joko-happy.png' : '/assets/joko-stand.png'} 
              alt="Pak Joko" 
              className={`loading-joko-img ${isGameStarted ? 'happy-anim' : ''}`} 
            />
          </div>
        </div>

        {/* 1. TITLE GAME */}
        <div className="loading-title-group">
          <h1 className="loading-title">WARUNG SOTO</h1>
          <p className="loading-subtitle">JOKO</p>
        </div>

        {/* 2. ACTION AREA (LOADING BAR / TOMBOL MASUK) */}
        <div className="loading-action-area">
          {!isReady ? (
            <div className="loading-bar-container">
              <div className="loading-bar-outer">
                <div
                  className="loading-bar-inner"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="loading-percentage">LOADING {progress}%</span>
            </div>
          ) : (
            <button 
              className={`start-game-btn ${isGameStarted ? 'clicked' : ''}`} 
              onClick={handleStartGame}
              disabled={isGameStarted}
            >
              {isGameStarted ? 'BISMILLAH!' : 'MULAI MAIN'}
            </button>
          )}
        </div>

        {/* 3. INSTRUKSI GAME CLICKER */}
        <div className="loading-instructions">
          <div className="instruction-badge">💡 CARA MAIN</div>
          <p className="instruction-text">
            <strong>Klik area mana saja</strong> untuk melayani pembeli & mengumpulkan uang!
          </p>
          <p className="instruction-subtext">
            Beli Upgrade Menu, Fasilitas, dan Pelanggan untuk pendapatan otomatis!
          </p>
        </div>

      </div>
    </div>
  );
}