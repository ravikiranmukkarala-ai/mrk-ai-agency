import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Clock, MessageSquareX, UserX, DatabaseZap, Headphones, Film } from 'lucide-react';

export const ProblemsSection: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();

  const problems = [
    {
      icon: Clock,
      title: "Repetitive Manual Tasks",
      description: "Hours wasted every day copying data across tools, updating spreadsheets, and running predictable administrative routines.",
      impact: "Diverts valuable talent away from high-impact strategic growth."
    },
    {
      icon: MessageSquareX,
      title: "Missed Customer Enquiries",
      description: "Leads arriving outside business hours or during peak traffic wait too long for replies, losing interest and choosing competitors.",
      impact: "Unanswered inquiries directly result in missed revenue."
    },
    {
      icon: UserX,
      title: "Slow Lead Follow-Ups",
      description: "Inbound prospects cool down while waiting for manual review, qualification, and calendar coordination.",
      impact: "Conversion rates drop dramatically as response time extends."
    },
    {
      icon: DatabaseZap,
      title: "Manual Data Entry & Disjointed Tools",
      description: "Information trapped in silos between email, CRM, billing, and project management apps without reliable synchronization.",
      impact: "Introduces human transcription errors and duplicate records."
    },
    {
      icon: Headphones,
      title: "Repetitive Customer Support",
      description: "Support teams answering the same tier-1 questions repeatedly instead of resolving complex, high-touch client needs.",
      impact: "High support burnout and rising operational costs."
    },
    {
      icon: Film,
      title: "Time-Consuming Content Production",
      description: "Producing consistent social video, marketing assets, and brand content demands grueling manual editing schedules.",
      impact: "Inconsistent posting cadence and delayed campaign launches."
    }
  ];

  return (
    <section className="py-20 lg:py-28 relative">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/30 border border-red-500/20 text-red-400 text-xs font-mono mb-4">
            <span>●</span>
            <span className="tracking-wider uppercase">THE BOTTLENECK</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Still spending time on work{' '}
            <span className="text-red-300">AI could handle?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-mrk-muted leading-relaxed">
            Most modern teams don't suffer from a lack of ambition — they get slowed down by repetitive, manual operations that eat away productive hours every week.
          </p>
        </div>

        {/* 6 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.title}
                className="group relative p-6 sm:p-8 rounded-2xl bg-mrk-surface-1 border border-white/[0.08] hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-950/20"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-red-950/30 border border-red-500/20 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200">
                  <Icon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="font-display font-semibold text-lg sm:text-xl text-white mb-2.5">
                  {prob.title}
                </h3>
                <p className="text-sm text-mrk-muted leading-relaxed mb-4">
                  {prob.description}
                </p>
                <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-red-300/80">
                  <span className="font-semibold text-red-400">Impact: </span>
                  {prob.impact}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
