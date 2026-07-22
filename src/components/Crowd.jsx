import { useMemo } from 'react';

export function Crowd({ passiveIncome }) {
  // Hitung berapa banyak pembeli yang dimunculkan berdasarkan passive income (minimal 2, maksimal 8)
  const maxCustomers = Math.min(Math.max(Math.floor(passiveIncome / 1500) + 2, 2), 8);

  // Variasi karakter pembeli di Kantin Gonzaga
  const customerTypes = ['👨‍🎓', '👩‍🎓', '🧑‍🏫', '🎒', '🚶‍♂️', '🚶‍♀️'];

  // Buat daftar properti pelanggan dengan durasi dan delay berjalan yang konsisten
  const customers = useMemo(() => {
    return Array.from({ length: 8 }).map((_, index) => {
      const icon = customerTypes[index % customerTypes.length];
      // Kecepatan jalan berkisar antara 6 s.d. 10 detik
      const duration = 6 + (index % 3) * 2; 
      // Delay bertahap (stagger) supaya tidak jalan bersamaan
      const delay = index * 1.8; 

      return {
        id: index,
        icon,
        duration: `${duration}s`,
        delay: `${delay}s`,
      };
    });
  }, []);

  return (
    <div className="@container relative w-full h-16 bg-slate-950/50 rounded-xl overflow-hidden border border-slate-700/50 my-3 flex items-center">
      {/* Label Info Area */}
      <span className="absolute top-1 left-2 text-[10px] text-slate-500 font-mono pointer-events-none z-10 select-none">
        AREA KANTIN
      </span>

      {/* Render Pembeli yang Berjalan */}
      {customers.slice(0, maxCustomers).map((customer) => (
        <div
          key={customer.id}
          className="customer-walker select-none"
          style={{
            '--duration': customer.duration,
            '--delay': customer.delay,
          }}
        >
          <span className="customer-bounce text-2xl">
            {customer.icon}
          </span>
        </div>
      ))}
    </div>
  );
}