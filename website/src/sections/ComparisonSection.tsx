import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();

  const withoutAutomation = [
    { title: "Manual Repetitive Work", desc: "Teams manually copying data, managing spreadsheets, and performing routine handoffs." },
    { title: "Delayed Responses", desc: "Inquiries wait hours or days during off-hours, weekends, or high-volume periods." },
    { title: "Disconnected Tools", desc: "Data scattered across fragmented tools requiring manual export, import, and sync." },
    { title: "Human-Dependent Processes", desc: "Operations stall whenever key team members are busy, sick, or out of office." },
    { title: "Time-Consuming Operations", desc: "Significant work hours spent maintaining systems instead of serving clients." }
  ];

  const withAutomation = [
    { title: "Automated Workflows", desc: "Predictable operations execute autonomously via high-reliability webhook and API pipelines." },
    { title: "Faster Responses", desc: "AI agents engage prospective leads and customer inquiries immediately, 24 hours a day." },
    { title: "Connected Systems", desc: "CRMs, communication apps, databases, and forms synchronize in real time without human effort." },
    { title: "AI-Assisted Processes", desc: "Intelligent agents handle triage, classification, and drafting, elevating team output." },
    { title: "More Time for Important Work", desc: "Founders and teams focus their creative energy on high-leverage client growth." }
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-[#090C11] border-y border-white/[0.06]">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-400/30 text-mrk-cyan text-xs font-mono mb-4">
            <span>●</span>
            <span className="tracking-wider uppercase">THE TRANSFORMATION</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            The difference intelligent automation makes.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-mrk-muted leading-relaxed">
            A clear comparison of traditional manual processes versus modern AI-augmented business workflows.
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Column 1: Without Automation (Traditional) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-mrk-surface-1/70 border border-red-500/15 relative overflow-hidden">
            <div className="flex items-center gap-3 pb-6 border-b border-white/[0.08] mb-6">
              <div className="w-8 h-8 rounded-full bg-red-950/40 border border-red-500/25 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-white">Without Automation</h3>
                <span className="text-xs font-mono text-red-400 uppercase tracking-wider">Manual Operations</span>
              </div>
            </div>

            <ul className="space-y-5">
              {withoutAutomation.map((item) => (
                <li key={item.title} className="flex items-start gap-3.5">
                  <span className="w-5 h-5 rounded-full bg-red-950/40 text-red-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✕
                  </span>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-white/90">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-mrk-muted mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: With Intelligent Automation (MRK AI) */}
          <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-mrk-surface-2 to-mrk-surface-1 border border-cyan-400/30 shadow-lg shadow-cyan-950/20 relative overflow-hidden">
            {/* Corner Cyan Accent */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-mrk-cyan/10 rounded-bl-full pointer-events-none blur-2xl" />

            <div className="flex items-center gap-3 pb-6 border-b border-white/[0.08] mb-6 relative z-10">
              <div className="w-8 h-8 rounded-full bg-cyan-950/50 border border-cyan-400/40 flex items-center justify-center shadow-cyan-subtle">
                <CheckCircle2 className="w-5 h-5 text-mrk-cyan" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-white">With Intelligent Automation</h3>
                <span className="text-xs font-mono text-mrk-cyan uppercase tracking-wider">MRK AI Systems</span>
              </div>
            </div>

            <ul className="space-y-5 relative z-10">
              {withAutomation.map((item) => (
                <li key={item.title} className="flex items-start gap-3.5">
                  <span className="w-5 h-5 rounded-full bg-cyan-950/60 text-mrk-cyan flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-[0_0_8px_rgba(0,242,254,0.3)]">
                    ✓
                  </span>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-white">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-mrk-muted mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-xs font-mono font-medium text-mrk-cyan hover:text-white transition-colors"
              >
                <span>Explore the service architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
