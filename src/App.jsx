import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { getCustomersByLocation, INITIAL_UPGRADES } from './constants/gameData';
import { loadSavedData, saveGameData, clearGameData } from './utils/storage';

import { LoadingScreen } from './components/LoadingScreen';
import { GameHUD } from './components/GameHUD';
import { GameViewport } from './components/GameViewport';
import { Crowd } from './components/Crowd';
import { StoreSection } from './components/StoreSection';
import { JokoCharacter } from './components/JokoCharacter';
import { ResetModal } from './components/ResetModal';

export default function App() {
  const savedData = useMemo(() => loadSavedData(), []);

  const [isLoading, setIsLoading] = useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
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

  
  useEffect(() => {
    saveGameData({
      money,
      passiveIncome,
      clickPower,
      bgTheme,
      upgrades: upgrades.map(({ id, level }) => ({ id, level })),
    });
  }, [money, passiveIncome, clickPower, bgTheme, upgrades]);

  
  useEffect(() => {
    if (passiveIncome <= 0) return;
    const interval = setInterval(() => {
      setMoney((prev) => prev + passiveIncome / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [passiveIncome]);

  const handleBowlClick = () => {
    setMoney((prev) => prev + clickPower);
    setIsCooking(Date.now());

    spawnCounterRef.current += 1;
    const uniqueId = `spawn-${Date.now()}-${performance.now()}-${spawnCounterRef.current}`;
    
    const availableCustomers = getCustomersByLocation(bgTheme, upgrades);

    if (availableCustomers && availableCustomers.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCustomers.length);
      const selectedCustomer = availableCustomers[randomIndex];

      setSpawnedWalkers((prev) => [
        ...prev,
        {
          id: uniqueId,
          image: selectedCustomer.image,
          payImage: selectedCustomer.payImage,
          height: selectedCustomer.height,
          mobileHeight: selectedCustomer.mobileHeight,
          amount: clickPower,
        },
      ]);
    }
  };

  
  const removeWalker = useCallback((id) => {
    setSpawnedWalkers((prev) => prev.filter((w) => w.id !== id));
  }, []);

  
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

  
  const handleConfirmReset = () => {
    clearGameData();
    setMoney(0);
    setPassiveIncome(0);
    setClickPower(10);
    setBgTheme('kabel');
    setUpgrades(INITIAL_UPGRADES);
    setSpawnedWalkers([]);
    setIsResetModalOpen(false);
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
      
      {isLoading && (
        <LoadingScreen 
          bgTheme={bgTheme} 
          onFinish={() => setIsLoading(false)} 
        />
      )}


      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        bgTheme={bgTheme}
      />


      <GameViewport bgTheme={bgTheme} onClick={handleBowlClick}>
       
        <GameHUD 
          money={money} 
          passiveIncome={passiveIncome} 
          clickPower={clickPower} 
          bgTheme={bgTheme} 
          setBgTheme={setBgTheme} 
          onReset={() => setIsResetModalOpen(true)} 
        />


        <JokoCharacter isCooking={isCooking} bgTheme={bgTheme} />

        
        <Crowd 
          passiveIncome={passiveIncome} 
          spawnedWalkers={spawnedWalkers} 
          onRemoveWalker={removeWalker}
          clickPower={clickPower}
          bgTheme={bgTheme}
        />
      </GameViewport>

      <StoreSection 
        upgrades={upgrades} 
        money={money} 
        onBuyUpgrade={buyUpgrade} 
        bgTheme={bgTheme} 
      />
    </div>
  );
}