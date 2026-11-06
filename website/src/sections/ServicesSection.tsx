import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { SERVICES_DATA, ServiceItem } from '../data/servicesData';
import {
  Workflow,
  Bot,
  PhoneCall,
  Cpu,
  Database,
  Sparkles,
  Video,
  ArrowRight,
  Check,
  ChevronDown
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Workflow,
  Bot,
  PhoneCall,
  Cpu,
  Database,
  Sparkles,
  Video
};

export const ServicesSection: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <section id="services" className="py-20 lg:py-28 relative">
      {/* Background Accent Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, #00F2FE 0%, #6366F1 60%, transparent 80%)' }}
      />

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
            <span className="tracking-wider uppercase">CORE CAPABILITIES</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Intelligent solutions for{' '}
            <span className="cyan-gradient-text">modern businesses.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-mrk-muted leading-relaxed">
            From autonomous multi-step agents to intelligent document pipelines. Engineered for stability, precision, and measurable operational leverage.
          </p>
        </div>

        {/* Services Grid (7 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((srv, idx) => {
            const Icon = iconMap[srv.iconName] || Bot;
            const isExpanded = expandedService === srv.id;

            return (
              <div
                key={srv.id}
                className={`group relative p-8 rounded-2xl bg-mrk-surface-1 border transition-all duration-300 flex flex-col justify-between ${
                  isExpanded
                    ? 'border-mrk-cyan shadow-cyan-glow bg-mrk-surface-2'
                    : 'border-white/[0.08] hover:border-cyan-400/40 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-cyan-950/20'
                }`}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <div>
                  {/* Card Header & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mrk-surface-2 to-mrk-surface-3 border border-white/10 group-hover:border-mrk-cyan/40 flex items-center justify-center transition-colors shadow-sm">
                      <Icon className="w-6 h-6 text-mrk-cyan group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <span className="text-[11px] font-mono tracking-wider text-cyan-300/80 uppercase px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-400/20">
                      {srv.badge}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-display font-bold text-xl text-white mb-2.5 group-hover:text-cyan-200 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-mrk-muted leading-relaxed mb-6 font-light">
                    {srv.shortDesc}
                  </p>

                  {/* Expanded Capabilities List (Toggleable) */}
                  {isExpanded && (
                    <div className="pt-4 pb-2 border-t border-white/[0.08] space-y-3 animate-fadeIn">
                      <p className="text-xs text-white/80 leading-relaxed italic mb-3">
                        {srv.longDesc}
                      </p>
                      <ul className="space-y-2">
                        {srv.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-mrk-muted">
                            <Check className="w-3.5 h-3.5 text-mrk-cyan shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Bottom Card Action */}
                <div className="pt-6 border-t border-white/[0.06] mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleExpand(srv.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-mrk-cyan hover:text-white transition-colors"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Explore Capabilities'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <a
                    href="#contact"
                    className="text-xs font-mono text-mrk-muted hover:text-white flex items-center gap-1 group/link"
                  >
                    <span>Consult</span>
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
