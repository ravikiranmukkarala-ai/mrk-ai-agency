import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Mail, Instagram, ArrowUpRight, Terminal, CheckCircle2 } from 'lucide-react';

export const FounderSection: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();

  return (
    <section id="about" className="py-20 lg:py-28 relative">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Profile Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-mrk-surface-2 to-mrk-surface-1 border border-white/10 shadow-2xl overflow-hidden">
              {/* Ambient Badge Glow */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-20"
                style={{ background: '#00F2FE' }}
              />

              {/* Monogram Avatar & Status */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-mrk-cyan to-mrk-blue flex items-center justify-center font-display font-bold text-3xl text-[#041B24] shadow-cyan-glow">
                  RK
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-white">Ravi Kiran</h3>
                  <p className="text-xs font-mono text-mrk-cyan uppercase tracking-wider mt-0.5">
                    Founder & AI Automation Engineer
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-2 text-[11px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    MRK AI Agency
                  </span>
                </div>
              </div>

              {/* Guiding Principles Card */}
              <div className="p-4 rounded-xl bg-mrk-surface-3/60 border border-white/[0.08] space-y-2.5 text-xs text-mrk-muted mb-6">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Terminal className="w-3.5 h-3.5 text-mrk-cyan" />
                  <span>Engineering Principles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mrk-cyan shrink-0" />
                  <span>Real problems over speculative tech hype</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mrk-cyan shrink-0" />
                  <span>Deterministic logic with self-healing retries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mrk-cyan shrink-0" />
                  <span>Measurable time savings for business operators</span>
                </div>
              </div>

              {/* Founder Social & Contact Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="mailto:kiranmukkarula.work@gmail.com"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-mrk-cyan hover:text-mrk-cyan text-xs font-mono text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Ravi</span>
                </a>
                <a
                  href="https://www.instagram.com/mrk.aiworks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-mrk-cyan hover:text-mrk-cyan text-xs font-mono text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@mrk.aiworks</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Founder Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-400/30 text-mrk-cyan text-xs font-mono">
              <span>●</span>
              <span className="tracking-wider uppercase">AGENCY LEADERSHIP</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Meet the mind behind{' '}
              <span className="cyan-gradient-text">MRK AI.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-mrk-muted leading-relaxed font-light">
              <p>
                Hi, I'm <strong className="text-white font-medium">Ravi Kiran</strong>, founder of MRK AI. I explore and build AI-powered systems, automation workflows, and digital experiences that help businesses reduce repetitive work and improve how they operate.
              </p>
              <p>
                My focus is on turning practical business problems into useful AI-powered solutions.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-display font-semibold text-sm text-[#041B24] bg-gradient-to-r from-mrk-cyan to-mrk-blue hover:shadow-cyan-glow transition-all"
              >
                <span>Schedule an Automation Discovery</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/mrk.aiworks/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-mono text-mrk-muted hover:text-white border border-white/10 hover:border-white/30 transition-colors"
              >
                <span>Follow on Instagram @mrk.aiworks</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
