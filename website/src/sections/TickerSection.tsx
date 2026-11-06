import React from 'react';

export const TickerSection: React.FC = () => {
  const tickerItems = [
    "AI Automation",
    "AI Agents",
    "Workflow Engineering",
    "Intelligent Systems",
    "RAG Solutions",
    "AI Creative",
    "Business Automation",
    "Multi-Agent Orchestration",
    "Autonomous Operations"
  ];

  // Repeat sequence 4 times for seamless infinite looping
  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="relative border-y border-white/[0.08] bg-[#0C1017] py-4.5 overflow-hidden select-none">
      {/* Left/Right Edge Gradient Mask for Smooth Fade */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-mrk-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-mrk-bg to-transparent z-10 pointer-events-none" />

      <div className="flex items-center w-max animate-ticker">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-8 mx-3 sm:mx-4">
            <span className="font-display font-medium text-xs sm:text-sm tracking-widest uppercase text-mrk-muted hover:text-white transition-colors cursor-default">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-mrk-cyan shadow-[0_0_8px_#00F2FE]" />
          </div>
        ))}
      </div>
    </div>
  );
};
