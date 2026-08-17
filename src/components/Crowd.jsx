import { useMemo, useState, useEffect, memo } from 'react';
import { SpawnedWalker } from './SpawnedWalker';
import { getCustomersByLocation, BACKGROUND_LOCATIONS } from '../constants/gameData';
import '../styles/CustomerCrowd.css';

const AutoWalker = memo(({ customer, clickPower }) => {
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    const totalDurationMs = parseFloat(customer.duration) * 1000;
    const delayMs = parseFloat(customer.delay) * 1000;

    let arriveTimer;
    let leaveTimer;
    let intervalTimer;

    const startCycle = () => {
      arriveTimer = setTimeout(() => {
        setIsBuying(true);
      }, totalDurationMs * 0.4);

      leaveTimer = setTimeout(() => {
        setIsBuying(false);
      }, totalDurationMs * 0.6);
    };

    const initialTimer = setTimeout(() => {
      startCycle();
      intervalTimer = setInterval(startCycle, totalDurationMs);
    }, delayMs);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(arriveTimer);
      clearTimeout(leaveTimer);
      clearInterval(intervalTimer);
    };
  }, [customer.duration, customer.delay]);

  const currentImage = isBuying && customer.payImage ? customer.payImage : customer.image;

  return (
    <div
      className="customer-walker-auto"
      style={{
        '--duration': customer.duration,
        '--delay': customer.delay,
        '--walker-height': customer.height,
        '--walker-mobile-height': customer.mobileHeight,
      }}
    >
      <span className="buying-popup">
        +Rp{clickPower.toLocaleString('id-ID')}
      </span>

      <img
        src={currentImage}
        alt={customer.name}
        className={`customer-bounce ${isBuying ? 'is-buying' : ''}`}
      />
    </div>
  );
});

const SpawnedList = memo(({ spawnedWalkers, onRemoveWalker }) => {
  return (
    <>
      {spawnedWalkers.map((walker) => (
        <SpawnedWalker
          key={walker.id}
          id={walker.id}
          image={walker.image}
          payImage={walker.payImage} 
          icon={walker.icon}
          height={walker.height}
          mobileHeight={walker.mobileHeight}
          amount={walker.amount}
          onRemove={onRemoveWalker}
        />
      ))}
    </>
  );
});

export function Crowd({
  passiveIncome,
  spawnedWalkers,
  onRemoveWalker,
  clickPower,
  bgTheme = 'kabel',
}) {
  const maxCustomers = Math.min(Math.max(Math.floor(passiveIncome / 1500) + 2, 2), 6);

  const currentLocation = useMemo(() => {
    return BACKGROUND_LOCATIONS.find((loc) => loc.id === bgTheme) || BACKGROUND_LOCATIONS[0];
  }, [bgTheme]);

  const availableCustomers = useMemo(() => {
    return getCustomersByLocation(bgTheme);
  }, [bgTheme]);

  const autoCustomers = useMemo(() => {
    if (!availableCustomers || availableCustomers.length === 0) return [];

    return Array.from({ length: 6 }).map((_, index) => {
      const customerData = availableCustomers[index % availableCustomers.length];
      const duration = 6 + (index % 3) * 2;
      const delay = index * 1.8;

      return {
        id: `auto-${index}`,
        image: customerData.image,
        payImage: customerData.payImage,
        name: customerData.name,
        height: customerData.height,
        mobileHeight: customerData.mobileHeight,
        duration: `${duration}s`,
        delay: `${delay}s`,
      };
    });
  }, [availableCustomers]);

  const { top = '63%', mobileTop = '68%' } = currentLocation?.crowdPos || {};

  return (
    <div
      className="crowd-container"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 10,
        '--crowd-top': top,
        '--crowd-mobile-top': mobileTop,
      }}
    >
      {autoCustomers.slice(0, maxCustomers).map((customer) => (
        <AutoWalker
          key={customer.id}
          customer={customer}
          clickPower={clickPower}
        />
      ))}

      <SpawnedList
        spawnedWalkers={spawnedWalkers}
        onRemoveWalker={onRemoveWalker}
      />
    </div>
  );
}