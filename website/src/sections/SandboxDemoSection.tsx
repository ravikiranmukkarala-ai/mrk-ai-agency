import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  simulateAgentExecution,
  PRESET_AGENT_PROMPTS,
  SimulationResult,
  AgentStageLog
} from '../services/demoAgentService';
import { Terminal, Play, RotateCcw, CheckCircle2, Clock, Sparkles, AlertCircle } from 'lucide-react';

export const SandboxDemoSection: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();
  const [query, setQuery] = useState<string>(PRESET_AGENT_PROMPTS[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(-1);
  const [liveLogs, setLiveLogs] = useState<AgentStageLog[]>([]);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleRunDemo = async () => {
    if (!query.trim() || isRunning) return;

    setIsRunning(true);
    setResult(null);
    setLiveLogs([]);
    setCurrentStageIdx(0);

    try {
      const simResult = await simulateAgentExecution(query, (idx, log) => {
        setCurrentStageIdx(idx);
        setLiveLogs((prev) => {
          const updated = [...prev];
          updated[idx] = log;
          return updated;
        });
      });
      setResult(simResult);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStageIdx(-1);
    setLiveLogs([]);
    setResult(null);
  };

  return (
    <section id="demo" className="py-20 lg:py-28 relative bg-[#090C11] border-y border-white/[0.06]">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-400/30 text-mrk-cyan text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-mrk-cyan animate-pulse" />
            <span className="tracking-wider uppercase">INTERACTIVE SANDBOX</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            See how an AI agent{' '}
            <span className="cyan-gradient-text">thinks through a task.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-mrk-muted leading-relaxed font-light">
            Test our autonomous agent reasoning engine. Select a business scenario or enter your own challenge to watch the agent analyze, choose tools, and synthesize an execution plan.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono text-amber-300/80 bg-amber-950/20 px-3 py-1 rounded-full border border-amber-500/20">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Frontend Simulation Demo (Phase 1) — LLM API Connection ready for Phase 2</span>
          </div>
        </div>

        {/* Preset Prompt Pills */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-mono text-white/40 mr-1">Sample Scenarios:</span>
          {PRESET_AGENT_PROMPTS.map((promptText) => (
            <button
              key={promptText}
              type="button"
              disabled={isRunning}
              onClick={() => {
                setQuery(promptText);
                handleReset();
              }}
              className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all ${
                query === promptText
                  ? 'bg-mrk-surface-3 border-mrk-cyan text-cyan-200'
                  : 'bg-mrk-surface-1 border-white/10 text-mrk-muted hover:text-white hover:border-white/30'
              }`}
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Interactive Terminal Container */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#070A0F] border border-white/15 shadow-2xl overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="px-5 py-3.5 bg-mrk-surface-2 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-xs text-white/50 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-mrk-cyan" />
                <span>mrk-agent-sandbox v1.0.0</span>
              </span>
            </div>
            <div className="text-[11px] font-mono text-cyan-300">
              {isRunning ? '● RUNNING INFERENCE' : result ? '✔ TASK COMPLETED' : 'IDLE'}
            </div>
          </div>

          {/* Prompt Input Box */}
          <div className="p-5 sm:p-6 border-b border-white/[0.08] bg-[#0A0E15]">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  disabled={isRunning}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Describe a manual business task you want to automate..."
                  className="w-full bg-[#05070B] border border-white/15 focus:border-mrk-cyan rounded-xl px-4 py-3 text-sm text-white placeholder-mrk-muted/50 font-mono outline-none transition-colors"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isRunning || !query.trim()}
                  onClick={handleRunDemo}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-display font-semibold text-xs sm:text-sm text-[#041B24] bg-mrk-cyan hover:shadow-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isRunning ? 'Analyzing...' : 'Run Demo'}</span>
                </button>
                {result && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-3 rounded-xl bg-mrk-surface-2 border border-white/10 text-mrk-muted hover:text-white transition-colors"
                    title="Reset simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Terminal Execution Body */}
          <div className="p-6 font-mono text-xs sm:text-sm space-y-4 min-h-[300px] max-h-[460px] overflow-y-auto">
            {liveLogs.length === 0 && !result && (
              <div className="text-center py-12 text-mrk-muted space-y-3">
                <Sparkles className="w-8 h-8 text-mrk-cyan/40 mx-auto animate-pulse" />
                <p>Click "Run Demo" above to watch the agent decompose the prompt into an automated pipeline.</p>
                <p className="text-xs text-white/30">Latency simulator: 450ms per reasoning stage.</p>
              </div>
            )}

            {/* Live Sequential Stage Logs */}
            {liveLogs.map((stage, idx) => (
              <div
                key={stage.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 animate-fadeIn"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {stage.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-mrk-cyan animate-spin" />
                    )}
                    <span className="font-semibold text-white">
                      Stage {idx + 1}: {stage.stageName}
                    </span>
                  </div>
                  <span className="text-white/40 text-[10px]">{stage.timestamp}</span>
                </div>

                <div className="pl-6 space-y-1 text-xs text-mrk-muted">
                  {stage.details.map((det, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5">
                      <span className="text-mrk-cyan">›</span>
                      <span>{det}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Final Synthesized Blueprint Card */}
            {result && (
              <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-950/30 to-indigo-950/30 border border-cyan-400/40 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-cyan-400/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-mrk-cyan" />
                    <span className="font-bold text-white uppercase text-xs tracking-wider">
                      Synthesized Automation Architecture
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Confidence: {result.automationPlan.confidenceScore}%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-white/40 block mb-1">Trigger Event:</span>
                    <span className="text-cyan-200 font-medium">
                      {result.automationPlan.trigger}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/40 block mb-1">Estimated Leverage:</span>
                    <span className="text-emerald-300 font-medium">
                      {result.automationPlan.estimatedSavedHoursMonthly}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-white/40 block mb-2 text-xs">Generated Execution Flow:</span>
                  <div className="space-y-1.5 bg-[#05070B] p-3.5 rounded-lg border border-white/10 text-xs text-white/90">
                    {result.automationPlan.steps.map((st, sIdx) => (
                      <div key={sIdx} className="text-cyan-100">
                        {st}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-white/40 mr-1">Bound Toolchain:</span>
                    {result.automationPlan.toolsUsed.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] bg-white/[0.06] text-mrk-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-mrk-cyan text-[#041B24] font-display font-semibold text-xs hover:shadow-cyan-glow transition-all"
                  >
                    <span>Build This Pipeline for Your Team</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
