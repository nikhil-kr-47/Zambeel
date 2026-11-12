import React from 'react';

export default function AlertBanner() {
  const alertItem = (
    <span className="inline-flex items-center gap-3 text-sm sm:text-base font-bold text-[#A51C1C] tracking-wide mx-8 select-none">
      <span className="text-base sm:text-lg">⚠️ 🚨🚨🚨</span>
      <span>Due to the political situation in KSA, you MIGHT face some delays in air shipments from UAE TO KSA. Our team is monitoring the on-ground situation and dispatching your orders on priority</span>
    </span>
  );

  return (
    <div className="w-full h-12 sm:h-13 bg-[#FFFF00] border-b border-yellow-400 overflow-hidden flex items-center select-none relative z-40 shadow-xs">
      <div className="flex whitespace-nowrap animate-marquee will-change-transform items-center">
        {alertItem}
        {alertItem}
        {alertItem}
        {alertItem}
      </div>
    </div>
  );
}
