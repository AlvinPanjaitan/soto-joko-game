import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CUSTOMER_ICONS, INITIAL_UPGRADES } from './constants/gameData';
import { loadSavedData, saveGameData, clearGameData } from './utils/storage';

import { Header } from './components/Header';
import { GameHUD } from './components/GameHUD';
import { GameViewport } from './components/GameViewport';
import { BowlClicker } from './components/BowlClicker';
import { Crowd } from './components/Crowd';
import { StoreSection } from './components/StoreSection';

export default function App() {
  const savedData = useMemo(() => loadSavedData(), []);

  const [money, setMoney] = useState(() => savedData?.money ?? 0);
  const [passiveIncome, setPassiveIncome] = useState(() => savedData?.passiveIncome ?? 0);
  const [clickPower, setClickPower] = useState(() => savedData?.clickPower ?? 10);
  // Default bgTheme diubah ke ID lokasi 'kabel'
  const [bgTheme, setBgTheme] = useState(() => savedData?.bgTheme ?? 'kabel');
  
  const [upgrades, setUpgrades] = useState(() => {
    if (savedData?.upgrades) {
      return INITIAL_UPGRADES.map((item) => {
        const savedItem = savedData.upgrades.find((u) => u.id === item.id);
        return savedItem ? { ...item, level: savedItem.level } : item;
      });
    }
    return INITIAL_UPGRADES;
  });

  const [spawnedWalkers, setSpawnedWalkers] = useState([]);
  const spawnCounterRef = useRef(0);

  // Auto Save Progress
  useEffect(() => {
    saveGameData({
      money,
      passiveIncome,
      clickPower,
      bgTheme,
      upgrades: upgrades.map(({ id, level }) => ({ id, level })),
    });
  }, [money, passiveIncome, clickPower, bgTheme, upgrades]);

  // Loop Pendapatan Pasif (10x / detik)
  useEffect(() => {
    if (passiveIncome <= 0) return;
    const interval = setInterval(() => {
      setMoney((prev) => prev + passiveIncome / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [passiveIncome]);

  // Klik Layar (Spawn Pembeli)
  const handleBowlClick = () => {
    setMoney((prev) => prev + clickPower);

    spawnCounterRef.current += 1;
    const uniqueId = `spawn-${Date.now()}-${performance.now()}-${spawnCounterRef.current}`;
    const randomIcon = CUSTOMER_ICONS[Math.floor(Math.random() * CUSTOMER_ICONS.length)];
    
    setSpawnedWalkers((prev) => [
      ...prev,
      { id: uniqueId, icon: randomIcon, amount: clickPower },
    ]);
  };

  // Hapus Pejalan Kaki Selesai Animasi
  const removeWalker = useCallback((id) => {
    setSpawnedWalkers((prev) => prev.filter((w) => w.id !== id));
  }, []);

  // Beli Upgrade
  const buyUpgrade = (item) => {
    const currentCost = Math.floor(item.baseCost * Math.pow(item.costMultiplier, item.level));

    if (money >= currentCost) {
      setMoney((prev) => prev - currentCost);

      if (item.type === 'passive') {
        setPassiveIncome((prev) => prev + item.power);
      } else if (item.type === 'click') {
        setClickPower((prev) => prev + item.power);
      }

      setUpgrades((prev) =>
        prev.map((u) => (u.id === item.id ? { ...u, level: u.level + 1 } : u))
      );
    }
  };

  // Reset Data
  const resetGame = () => {
    if (window.confirm('Yakin ingin mereset seluruh progress game Warung Soto?')) {
      clearGameData();
      setMoney(0);
      setPassiveIncome(0);
      setClickPower(10);
      setBgTheme('kabel');
      setUpgrades(INITIAL_UPGRADES);
      setSpawnedWalkers([]);
    }
  };

  return (
    <div 
      style={{
        height: '100vh',
        backgroundColor: '#020617',
        color: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        padding: '12px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <Header />

      {/* AREA UTAMA PERMAINAN (MEMENUHI 100% LAYAR) */}
      <GameViewport bgTheme={bgTheme} onClick={handleBowlClick}>
        {/* HUD Statistik Melayang di Kiri Atas */}
        <GameHUD 
          money={money} 
          passiveIncome={passiveIncome} 
          clickPower={clickPower} 
          bgTheme={bgTheme} 
          setBgTheme={setBgTheme} 
          onReset={resetGame} 
        />

        {/* Mangkuk Soto di Tengah (Area Bermain Bebas Klik) */}
        <BowlClicker clickPower={clickPower} />

        {/* Panel Toko Upgrade Melayang di Pojok Kanan (Vertical Sidebar) */}
        <StoreSection 
          upgrades={upgrades} 
          money={money} 
          onBuyUpgrade={buyUpgrade} 
        />

        {/* Area Pejalan Kaki Terisolasi di Jalur Bawah */}
        <Crowd 
          passiveIncome={passiveIncome} 
          spawnedWalkers={spawnedWalkers} 
          onRemoveWalker={removeWalker}
          clickPower={clickPower}
        />
      </GameViewport>
    </div>
  );
}