import React, { useState, useEffect } from 'react';
import { Bot, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0D12]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 font-display font-bold text-xl sm:text-22 tracking-tight text-white"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mrk-surface-2 to-mrk-surface-3 border border-cyan-400/30 flex items-center justify-center shadow-cyan-subtle group-hover:border-mrk-cyan transition-colors duration-200">
              <Bot className="w-5 h-5 text-mrk-cyan" />
            </div>
            <span>
              MRK <span className="text-mrk-cyan">AI</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-mrk-muted">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors duration-200 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mrk-cyan group-hover:w-full transition-all duration-200" />
              </a>
            ))}
          </nav>

          {/* Right Action: Let's Talk CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-display font-semibold text-[#041B24] bg-gradient-to-r from-mrk-cyan to-mrk-blue hover:shadow-cyan-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-20 md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-mrk-surface-2 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-mrk-cyan cursor-pointer"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'translate-y-1.5 rotate-45' : '-translate-y-1'
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? '-translate-y-1.5 -rotate-45' : 'translate-y-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-[60px] bg-[#0A0D12]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all duration-300"
        >
          <nav className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className="py-2.5 text-mrk-muted hover:text-white border-b border-white/[0.06] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-mrk-cyan text-xs">→</span>
              </a>
            ))}
            <div className="pt-4">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-display font-semibold text-[#041B24] bg-gradient-to-r from-mrk-cyan to-mrk-blue shadow-cyan-glow"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
