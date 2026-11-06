import React from 'react';
import { Bot, Mail, Instagram, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#07090D] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      {/* Subtle Ambient Bottom Glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full blur-[120px] pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, #00F2FE 0%, #6366F1 60%, transparent 80%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <a href="#home" className="flex items-center gap-2.5 font-display font-bold text-xl text-white">
              <div className="w-8 h-8 rounded-lg bg-mrk-surface-2 border border-cyan-400/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-mrk-cyan" />
              </div>
              <span>MRK <span className="text-mrk-cyan">AI</span></span>
            </a>
            <p className="text-sm text-mrk-muted leading-relaxed">
              We build intelligent automation systems and AI-powered digital experiences that help businesses save time, serve customers, and grow.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-mrk-surface-2 border border-white/10 text-mrk-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Available for New Projects
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-white/90 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-mrk-muted">
              <li><a href="#home" className="hover:text-mrk-cyan transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-mrk-cyan transition-colors">Services</a></li>
              <li><a href="#how-it-works" className="hover:text-mrk-cyan transition-colors">How It Works</a></li>
              <li><a href="#projects" className="hover:text-mrk-cyan transition-colors">Projects & Experiments</a></li>
              <li><a href="#lab" className="hover:text-mrk-cyan transition-colors">Technical Proof Lab</a></li>
              <li><a href="#about" className="hover:text-mrk-cyan transition-colors">About Ravi Kiran</a></li>
              <li><a href="#demo" className="hover:text-mrk-cyan transition-colors">Interactive Demo</a></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-white/90 mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-mrk-muted">
              <li><a href="#services" className="hover:text-mrk-cyan transition-colors">AI Workflow Automation</a></li>
              <li><a href="#services" className="hover:text-mrk-cyan transition-colors">AI Customer Support Agents</a></li>
              <li><a href="#services" className="hover:text-mrk-cyan transition-colors">AI Voice Receptionists</a></li>
              <li><a href="#services" className="hover:text-mrk-cyan transition-colors">Custom AI Agents & Tools</a></li>
              <li><a href="#services" className="hover:text-mrk-cyan transition-colors">RAG & Document Intelligence</a></li>
              <li><a href="#services" className="hover:text-mrk-cyan transition-colors">AI Creative & Video Production</a></li>
            </ul>
          </div>

          {/* Founder & Direct Contact */}
          <div>
            <h4 className="font-display font-semibold text-xs tracking-wider uppercase text-white/90 mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm text-mrk-muted">
              <a
                href="mailto:kiranmukkarula.work@gmail.com"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-mrk-surface-1 border border-white/10 hover:border-mrk-cyan transition-colors text-white group"
              >
                <Mail className="w-4 h-4 text-mrk-cyan shrink-0" />
                <span className="truncate text-xs sm:text-sm">kiranmukkarula.work@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-mrk-muted group-hover:text-mrk-cyan transition-colors" />
              </a>

              <a
                href="https://www.instagram.com/mrk.aiworks/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-mrk-surface-1 border border-white/10 hover:border-mrk-cyan transition-colors text-white group"
              >
                <Instagram className="w-4 h-4 text-mrk-cyan shrink-0" />
                <span className="text-xs sm:text-sm">@mrk.aiworks</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-auto text-mrk-muted group-hover:text-mrk-cyan transition-colors" />
              </a>

              <p className="text-xs text-mrk-muted/80 pt-1">
                Founder: <span className="text-white font-medium">Ravi Kiran</span>. Serving forward-thinking businesses across India and globally.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mrk-muted">
          <div>
            © {new Date().getFullYear()} MRK AI Agency. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Your Business. Smarter with AI.</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <a href="#home" className="hover:text-mrk-cyan transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
