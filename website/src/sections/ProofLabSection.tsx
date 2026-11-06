import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TECH_STACK_DATA, TechItem } from '../data/techStackData';
import { Terminal, Cpu, Database, Network, Code, Sparkles, Filter } from 'lucide-react';

export const ProofLabSection: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Frameworks & Orchestration',
    'Vector Databases & Storage',
    'Models & APIs',
    'Frontend & Integration'
  ];

  const filteredTech = selectedCategory === 'All'
    ? TECH_STACK_DATA
    : TECH_STACK_DATA.filter((t) => t.category === selectedCategory);

  return (
    <section id="lab" className="py-20 lg:py-28 relative bg-[#090C11] border-y border-white/[0.06]">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-400/30 text-mrk-cyan text-xs font-mono mb-4">
            <span>●</span>
            <span className="tracking-wider uppercase">PROOF LAB & STACK</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Built through experimentation.{' '}
            <span className="cyan-gradient-text">Designed for real-world problems.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-mrk-muted leading-relaxed font-light">
            We don't rely on hype or surface-level integrations. Every framework and tool in our stack is thoroughly evaluated for latency, deterministic logic, and real operational utility.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-mrk-cyan text-[#041B24] font-semibold shadow-cyan-subtle'
                  : 'bg-mrk-surface-2 border border-white/10 text-mrk-muted hover:text-white hover:border-white/25'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredTech.map((tech) => (
            <div
              key={tech.name}
              className="p-6 rounded-2xl bg-mrk-surface-1 border border-white/[0.08] hover:border-cyan-400/30 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-mrk-cyan font-semibold">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-mono text-white/40 uppercase">
                    {tech.category.split('&')[0]}
                  </span>
                </div>
                <p className="text-xs text-mrk-muted leading-relaxed font-light mb-4">
                  {tech.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-cyan-200/80">
                <span className="text-white/40">Lab Use Case: </span>
                {tech.useCase}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Status Note */}
        <div className="mt-12 text-center text-xs font-mono text-mrk-muted/60">
          * Technologies represented reflect hands-on development frameworks, tested APIs, and working architecture experiments.
        </div>
      </div>
    </section>
  );
};
