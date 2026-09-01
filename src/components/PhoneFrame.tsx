import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 12 instead of 0
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto my-3 sm:my-6 w-full max-w-[390px] h-[820px] max-h-[calc(100vh-32px)] sm:max-h-[calc(100vh-48px)] min-h-[580px] bg-slate-950 rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50 flex flex-col overflow-hidden select-none">
      {/* Ear Speaker / Camera Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-full z-50 flex items-center justify-around px-3 border border-slate-800">
        <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
        <div className="w-10 h-1 bg-slate-800 rounded-full"></div>
        <div className="w-2.5 h-2.5 bg-blue-900 rounded-full border border-blue-950 flex items-center justify-center">
          <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
        </div>
      </div>

      {/* Screen Container with gorgeous saffron watercolor backdrop */}
      <div className="w-full h-full bg-saffron-watercolor rounded-[38px] overflow-hidden flex flex-col relative">
        {/* Status Bar */}
        <div className="h-10 pt-4 px-4 flex justify-between items-center text-xs font-medium text-amber-100 z-40 bg-[#18130E]/40 backdrop-blur-md shrink-0 select-none">
          <span className="text-[11px] tracking-tight font-bold shrink-0">{time}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] text-amber-200/60 font-black tracking-wider uppercase">MH-GOV</span>
            <Signal className="w-3 h-3 text-amber-200/80" />
            <Wifi className="w-3 h-3 text-amber-200/80" />
            <div className="flex items-center gap-0.5">
              <span className="text-[9px] text-amber-200/80 font-bold mr-0.5">100%</span>
              <Battery className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
            </div>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 w-full overflow-hidden flex flex-col relative">
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="h-6 w-full flex items-center justify-center bg-[#13110E] z-40">
          <div className="w-32 h-1 bg-[#2D231A] rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
