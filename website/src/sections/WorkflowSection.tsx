import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { WORKFLOW_STAGES } from '../data/workflowData';
import { Search, PenTool, Code2, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Search,
  PenTool,
  Code2,
  Sliders
};

export const WorkflowSection: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();
  const [activeStage, setActiveStage] = useState<number>(0);

  return (
    <section id="how-it-works" className="py-20 lg:py-28 relative bg-[#090C11] border-y border-white/[0.06]">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-400/30 text-mrk-cyan text-xs font-mono mb-4">
            <span>●</span>
            <span className="tracking-wider uppercase">EXECUTION METHODOLOGY</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            From business challenge to{' '}
            <span className="cyan-gradient-text">intelligent solution.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-mrk-muted leading-relaxed">
            A structured, disciplined engineering process from initial operational audit to live, self-healing automation.
          </p>
        </div>

        {/* Animated Connecting Line (Desktop) */}
        <div className="hidden lg:block relative mb-12">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-white/10 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 bg-gradient-to-r from-mrk-cyan to-indigo-500 z-0 transition-all duration-500"
            style={{ width: `${((activeStage + 1) / WORKFLOW_STAGES.length) * 100}%` }}
          />
        </div>

        {/* 4 Workflow Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {WORKFLOW_STAGES.map((stg, idx) => {
            const Icon = iconMap[stg.iconName] || Search;
            const isActive = activeStage === idx;

            return (
              <div
                key={stg.step}
                role="button"
                tabIndex={0}
                onClick={() => setActiveStage(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStage(idx);
                  }
                }}
                className={`cursor-pointer p-8 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-mrk-cyan ${
                  isActive
                    ? 'bg-mrk-surface-2 border-mrk-cyan shadow-cyan-glow -translate-y-2'
                    : 'bg-mrk-surface-1 border-white/[0.08] hover:border-white/20 hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-bold text-3xl text-white/30 group-hover:text-white/50">
                      {stg.step}
                    </span>
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors ${
                        isActive
                          ? 'bg-cyan-950/60 border-cyan-400 text-mrk-cyan shadow-cyan-subtle'
                          : 'bg-mrk-surface-2 border-white/10 text-mrk-muted'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Stage Title & Subtitle */}
                  <div className="mb-2">
                    <span className="text-[11px] font-mono tracking-wider text-mrk-cyan uppercase">
                      {stg.subtitle}
                    </span>
                    <h3 className="font-display font-bold text-xl text-white mt-1">
                      {stg.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-mrk-muted leading-relaxed mb-6 font-light">
                    {stg.description}
                  </p>
                </div>

                {/* Key Outputs */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block mb-1.5">
                    Key Outputs
                  </span>
                  {stg.outputs.map((out, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-2 text-xs text-mrk-muted">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Active Stage Highlight Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-mrk-surface-1 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-400/30 flex items-center justify-center text-mrk-cyan shrink-0">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-mrk-cyan tracking-wider uppercase">
                Active Stage Focus: Stage {WORKFLOW_STAGES[activeStage].step} — {WORKFLOW_STAGES[activeStage].title}
              </div>
              <h4 className="font-display font-semibold text-lg text-white mt-0.5">
                {WORKFLOW_STAGES[activeStage].subtitle}
              </h4>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-display font-semibold text-[#041B24] bg-mrk-cyan hover:shadow-cyan-glow transition-all shrink-0"
          >
            <span>Discuss your project with Ravi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
