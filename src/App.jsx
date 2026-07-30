import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CUSTOMER_ICONS, INITIAL_UPGRADES } from './constants/gameData';
import { loadSavedData, saveGameData, clearGameData } from './utils/storage';

import { GameHUD } from './components/GameHUD';
import { GameViewport } from './components/GameViewport';
import { BowlClicker } from './components/BowlClicker';
import { Crowd } from './components/Crowd';
import { StoreSection } from './components/StoreSection';
import { JokoCharacter } from './components/JokoCharacter';

export default function App() {
  const savedData = useMemo(() => loadSavedData(), []);

  const [money, setMoney] = useState(() => savedData?.money ?? 0);
  const [passiveIncome, setPassiveIncome] = useState(() => savedData?.passiveIncome ?? 0);
  const [clickPower, setClickPower] = useState(() => savedData?.clickPower ?? 10);
  const [bgTheme, setBgTheme] = useState(() => savedData?.bgTheme ?? 'kabel');
  
  const [isCooking, setIsCooking] = useState(0);

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

  // Handler Klik Layar
  const handleBowlClick = () => {
    setMoney((prev) => prev + clickPower);
    setIsCooking(Date.now());

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
      className="game-container"
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#020617',
        color: '#f8fafc',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    >
      {/* AREA UTAMA PERMAINAN */}
      <GameViewport bgTheme={bgTheme} onClick={handleBowlClick}>
        {/* HUD Statistik Melayang */}
        <GameHUD 
          money={money} 
          passiveIncome={passiveIncome} 
          clickPower={clickPower} 
          bgTheme={bgTheme} 
          setBgTheme={setBgTheme} 
          onReset={resetGame} 
        />

        {/* Karakter Pak Joko */}
        <JokoCharacter isCooking={isCooking} bgTheme={bgTheme} />

        {/* Mangkuk Soto Component */}
        <BowlClicker clickPower={clickPower} />

        {/* Pejalan Kaki */}
        <Crowd 
          passiveIncome={passiveIncome} 
          spawnedWalkers={spawnedWalkers} 
          onRemoveWalker={removeWalker}
          clickPower={clickPower}
          bgTheme={bgTheme}
        />
      </GameViewport>

      {/* Panel Toko Upgrade (Berada di luar GameViewport agar bisa menjadi stacked vertical di mobile) */}
      <StoreSection 
        upgrades={upgrades} 
        money={money} 
        onBuyUpgrade={buyUpgrade} 
      />
    </div>
  );
}