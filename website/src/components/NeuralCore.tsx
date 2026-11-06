import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Bot, Cpu, Zap, Activity } from 'lucide-react';

export const NeuralCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const irisRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [irisOffset, setIrisOffset] = useState<React.CSSProperties>({});

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (prefersReducedMotion || !isFinePointer) return;

    let pending = false;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!pending) {
        pending = true;
        requestAnimationFrame(() => {
          pending = false;
          const orb = orbRef.current;
          if (!orb) return;

          const rect = orb.getBoundingClientRect();
          // Check if orb is visible in viewport
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;

          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;

          const dx = mouseX - cx;
          const dy = mouseY - cy;
          const dist = Math.hypot(dx, dy) || 1;
          const pull = Math.min(dist / 350, 1);

          // 3D perspective rotation (max 12 degrees)
          const rotY = (dx / dist) * 12 * pull;
          const rotX = (-dy / dist) * 12 * pull;

          setTiltStyle({
            transform: `perspective(800px) rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`,
            transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)'
          });

          // Iris translation (max 18px horizontal, 14px vertical)
          const transX = (dx / dist) * 18 * pull;
          const transY = (dy / dist) * 14 * pull;

          setIrisOffset({
            transform: `translate(${transX.toFixed(1)}px, ${transY.toFixed(1)}px)`,
            transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)'
          });
        });
      }
    };

    const handleMouseLeave = () => {
      setTiltStyle({
        transform: 'perspective(800px) rotateY(0deg) rotateX(0deg)',
        transition: 'transform 0.4s ease-out'
      });
      setIrisOffset({
        transform: 'translate(0px, 0px)',
        transition: 'transform 0.4s ease-out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full max-w-[440px] h-[400px] sm:h-[440px] mx-auto select-none"
      aria-label="MRK AI Autonomous Neural Core"
    >
      {/* Ambient Radial Core Lighting */}
      <div
        className="absolute w-[320px] h-[320px] rounded-full blur-[80px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 242, 254, 0.18) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)'
        }}
      />

      {/* Layer 1: Outer Orbit Ring (420px) with 3 Satellite Agent Nodes */}
      <div
        className={`absolute w-[340px] h-[340px] sm:w-[410px] sm:h-[410px] rounded-full border border-dashed border-cyan-400/25 pointer-events-none ${
          prefersReducedMotion ? '' : 'animate-spin-slow'
        }`}
      >
        {/* Satellite Node 1: Parser */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mrk-surface-2 border border-cyan-400/40 shadow-cyan-subtle"
          title="Autonomous Parser Agent"
        >
          <Bot className="w-3.5 h-3.5 text-mrk-cyan" />
          <span className="text-[10px] font-mono text-cyan-200 hidden sm:inline">PARSER</span>
        </div>

        {/* Satellite Node 2: Dispatcher */}
        <div
          className="absolute top-2/3 -right-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-mrk-surface-2 border border-indigo-400/40 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
          title="Workflow Dispatcher"
        >
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[10px] font-mono text-indigo-200 hidden sm:inline">DISPATCH</span>
        </div>

        {/* Satellite Node 3: LLM Engine */}
        <div
          className="absolute bottom-4 left-6 flex items-center gap-1.5 px-2 py-1 rounded-full bg-mrk-surface-2 border border-cyan-400/30"
          title="Reasoning Engine"
        >
          <Cpu className="w-3.5 h-3.5 text-cyan-300" />
          <span className="text-[10px] font-mono text-cyan-200 hidden sm:inline">REASON</span>
        </div>
      </div>

      {/* Layer 2: Middle Workflow Orbit (Counter-Rotating 18s) */}
      <div
        className={`absolute w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] rounded-full border border-indigo-500/20 pointer-events-none ${
          prefersReducedMotion ? '' : 'animate-spin-reverse'
        }`}
      >
        <div className="absolute top-0 right-1/4 w-2 h-2 rounded-full bg-mrk-cyan shadow-[0_0_10px_#00F2FE]" />
        <div className="absolute bottom-2 left-1/3 w-1.5 h-1.5 rounded-full bg-indigo-400" />
      </div>

      {/* Layer 3: Central Neural Nucleus (Obsidian Metallic Sphere) */}
      <div
        ref={orbRef}
        style={tiltStyle}
        className="relative z-10 w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full flex items-center justify-center transition-all duration-300"
      >
        {/* Sphere Body with Inset Metallic Shadows & Gradient */}
        <div
          className="w-full h-full rounded-full relative flex items-center justify-center overflow-hidden border border-white/10"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #232E40 0%, #141B26 45%, #0B0E14 85%)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.8), inset 0 2px 6px rgba(255,255,255,0.2), inset -8px -8px 24px rgba(0,0,0,0.6)'
          }}
        >
          {/* Subtle Circuit Grid Overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #00F2FE 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          />

          {/* Core Face Shield (Dark Glass Visor) */}
          <div
            className="w-[140px] sm:w-[165px] h-[95px] sm:h-[110px] rounded-[36px] bg-[#070A0F]/90 border border-cyan-500/20 flex flex-col items-center justify-center relative shadow-[inset_0_4px_16px_rgba(0,0,0,0.9)]"
          >
            {/* Dynamic Interactive Gaze Iris */}
            <div
              ref={irisRef}
              style={irisOffset}
              className="flex items-center gap-4 sm:gap-5"
            >
              {/* Left Eye / Sensor */}
              <div className="relative flex items-center justify-center">
                <div className="w-3.5 sm:w-4 h-9 sm:h-11 rounded-full bg-mrk-cyan shadow-[0_0_16px_#00F2FE,0_0_32px_rgba(0,242,254,0.4)]" />
                <div className="absolute w-1 h-3 rounded-full bg-white opacity-80" />
              </div>

              {/* Central Neural Pulse Indicator */}
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_#6366F1]" />

              {/* Right Eye / Sensor */}
              <div className="relative flex items-center justify-center">
                <div className="w-3.5 sm:w-4 h-9 sm:h-11 rounded-full bg-mrk-cyan shadow-[0_0_16px_#00F2FE,0_0_32px_rgba(0,242,254,0.4)]" />
                <div className="absolute w-1 h-3 rounded-full bg-white opacity-80" />
              </div>
            </div>

            {/* Micro Status Pill */}
            <div className="absolute bottom-2.5 flex items-center gap-1.5 opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-mono tracking-widest text-mrk-muted uppercase">SYSTEM ONLINE</span>
            </div>
          </div>

          {/* Metallic Brand Watermark */}
          <div className="absolute bottom-4 text-[9px] font-display font-semibold tracking-[0.25em] text-white/30 uppercase pointer-events-none">
            MRK // NEURAL
          </div>
        </div>
      </div>
    </div>
  );
};
