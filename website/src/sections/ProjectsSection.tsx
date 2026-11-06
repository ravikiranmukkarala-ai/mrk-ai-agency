import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PROJECTS_DATA, ProjectItem } from '../data/projectsData';
import { Layers, Terminal, Sparkles, Check, ArrowUpRight, Code } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();
  const [selectedProject, setSelectedProject] = useState<ProjectItem>(PROJECTS_DATA[0]);

  return (
    <section id="projects" className="py-20 lg:py-28 relative">
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
            <span className="tracking-wider uppercase">LAB WORK & PORTFOLIO</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            Exploring what's{' '}
            <span className="cyan-gradient-text">possible with AI.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-mrk-muted leading-relaxed">
            A transparent look into our actual technical builds, prototypes, and research experiments. We validate architectures hands-on before proposing them to businesses.
          </p>
        </div>

        {/* 2-Column Showcase: Left List, Right Detailed Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Project Selector Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {PROJECTS_DATA.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-mrk-surface-2 border-mrk-cyan shadow-cyan-glow -translate-y-1'
                      : 'bg-mrk-surface-1 border-white/[0.08] hover:border-white/20 hover:bg-mrk-surface-2/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-mrk-muted">{proj.category}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${proj.statusColor}`}
                    >
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-1.5 flex items-center justify-between">
                    <span>{proj.title}</span>
                    {isSelected && <span className="text-mrk-cyan text-sm">→</span>}
                  </h3>
                  <p className="text-xs sm:text-sm text-mrk-muted line-clamp-2 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Architecture Terminal / Inspector (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-mrk-surface-2 to-[#0B0F15] border border-white/10 shadow-2xl relative">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-xs text-white/40">
                  mrk-ai://projects/{selectedProject.id}
                </span>
              </div>
              <span
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${selectedProject.statusColor}`}
              >
                {selectedProject.status}
              </span>
            </div>

            {/* Selected Project Overview */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-mrk-cyan uppercase tracking-wider block mb-1">
                  {selectedProject.category}
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                  {selectedProject.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-mrk-muted leading-relaxed font-light">
                  {selectedProject.summary}
                </p>
              </div>

              {/* Architecture Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-white/90 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-mrk-cyan" />
                  <span>Technical Architecture</span>
                </h4>
                <div className="space-y-2 font-mono text-xs text-mrk-muted bg-[#080B10] p-4 rounded-xl border border-white/[0.06]">
                  {selectedProject.architecture.map((arch, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2">
                      <span className="text-mrk-cyan font-bold">›</span>
                      <span className="text-white/80">{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="space-y-3">
                <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-white/90 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-mrk-cyan" />
                  <span>Verified Capabilities</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-mrk-muted">
                  {selectedProject.keyHighlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-mrk-cyan shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-white/40 mr-2">Stack:</span>
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-mrk-surface-3 border border-white/10 text-cyan-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
