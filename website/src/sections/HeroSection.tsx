import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { NeuralCore } from '../components/NeuralCore';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Ambient Gradient Glow Accents */}
      <div
        className="absolute top-1/4 -left-32 w-[460px] h-[460px] rounded-full blur-[120px] pointer-events-none opacity-25"
        style={{ background: 'radial-gradient(circle, #00F2FE 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full blur-[130px] pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mrk-surface-2 border border-cyan-400/30 text-xs font-mono text-cyan-300 shadow-cyan-subtle">
              <span className="w-2 h-2 rounded-full bg-mrk-cyan animate-pulse" />
              <span className="tracking-wider uppercase">AI AUTOMATION AGENCY</span>
              <span className="text-white/30">•</span>
              <span className="text-mrk-muted hidden sm:inline">FOUNDED BY RAVI KIRAN</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
              <span className="block text-white">Your Business.</span>
              <span className="block cyan-gradient-text">Smarter with AI.</span>
            </h1>

            {/* Supporting Message */}
            <p className="text-base sm:text-lg lg:text-xl text-mrk-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              From repetitive tasks to intelligent workflows. We build AI automation systems, intelligent agents, and creative digital experiences that help businesses work smarter.
            </p>

            {/* Value Highlights Pill List */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-mrk-muted pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-mrk-cyan" />
                <span>Autonomous Workflow Engines</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-mrk-cyan" />
                <span>24/7 AI Customer Agents</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-mrk-cyan" />
                <span>Custom RAG Knowledge Systems</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm sm:text-base text-[#041B24] bg-gradient-to-r from-mrk-cyan via-mrk-blue to-mrk-cyan bg-[length:200%_auto] hover:bg-right hover:shadow-cyan-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm sm:text-base text-white bg-mrk-surface-2 border border-white/15 hover:border-mrk-cyan hover:bg-mrk-surface-3 transition-all duration-200"
              >
                <Sparkles className="w-4 h-4 text-mrk-cyan" />
                <span>Let's Build Something</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Neural Core (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <NeuralCore />
          </div>
        </div>
      </div>
    </section>
  );
};
