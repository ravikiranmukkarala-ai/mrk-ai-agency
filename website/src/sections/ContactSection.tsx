import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  ContactFormData,
  submitContactEnquiry,
  validateContactForm
} from '../services/contactService';
import { Mail, Instagram, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { elementRef, isRevealed } = useScrollReveal();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: 'AI Workflow Automation',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const serviceOptions = [
    'AI Workflow Automation',
    'AI Customer Support Agents',
    'AI Voice Agents',
    'Custom AI Agents',
    'RAG and Knowledge Systems',
    'AI Creative Services',
    'Video Editing and Content Production',
    'General Automation Consultation'
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateContactForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await submitContactEnquiry(formData);
      if (result.success) {
        setSuccessMessage(result.message);
        setFormData({
          name: '',
          email: '',
          company: '',
          service: 'AI Workflow Automation',
          description: ''
        });
      } else if (result.errors) {
        setErrors(result.errors);
      }
    } catch (err: any) {
      setErrors({ global: 'An unexpected error occurred. Please reach out via email directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div
        ref={elementRef}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 transition-all duration-700 ${
          isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Outreach & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-400/30 text-mrk-cyan text-xs font-mono mb-4">
                <span>●</span>
                <span className="tracking-wider uppercase">START A PROJECT</span>
              </div>
              <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Let's build something{' '}
                <span className="cyan-gradient-text">intelligent.</span>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-mrk-muted leading-relaxed font-light">
                Have a business process you want to automate or an AI idea you want to explore? Let's talk.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              <a
                href="mailto:kiranmukkarula.work@gmail.com"
                className="flex items-center gap-4 p-5 rounded-2xl bg-mrk-surface-1 border border-white/10 hover:border-mrk-cyan transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-400/30 flex items-center justify-center text-mrk-cyan shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-mrk-muted uppercase tracking-wider">
                    Direct Email
                  </div>
                  <div className="text-sm sm:text-base font-medium text-white truncate group-hover:text-mrk-cyan transition-colors">
                    kiranmukkarula.work@gmail.com
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-mrk-muted ml-auto group-hover:text-mrk-cyan transition-colors" />
              </a>

              <a
                href="https://www.instagram.com/mrk.aiworks/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-mrk-surface-1 border border-white/10 hover:border-mrk-cyan transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-950/40 border border-indigo-400/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-mono text-mrk-muted uppercase tracking-wider">
                    Instagram Updates
                  </div>
                  <div className="text-sm sm:text-base font-medium text-white group-hover:text-mrk-cyan transition-colors">
                    @mrk.aiworks
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-mrk-muted ml-auto group-hover:text-mrk-cyan transition-colors" />
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-[#080B10] border border-white/[0.08] text-xs font-mono text-mrk-muted space-y-2">
              <div className="text-white font-semibold">Response Commitment:</div>
              <p>Ravi Kiran personally reviews every inquiry within 24 business hours.</p>
            </div>
          </div>

          {/* Right Column: Enquiry Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-mrk-surface-1 border border-white/10 shadow-2xl relative">
            {successMessage ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-950/40 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_24px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-2xl text-white">Enquiry Received</h3>
                <p className="text-sm text-mrk-muted max-w-md mx-auto leading-relaxed">
                  {successMessage}
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSuccessMessage(null)}
                    className="px-6 py-2.5 rounded-full text-xs font-mono bg-mrk-surface-2 border border-white/15 text-white hover:border-mrk-cyan transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="border-b border-white/[0.08] pb-4 mb-2">
                  <h3 className="font-display font-bold text-xl text-white">Project Consultation Form</h3>
                  <p className="text-xs text-mrk-muted mt-1">
                    Tell us about your operations. Phase 1 frontend ready; Phase 2 webhook auto-sync.
                  </p>
                </div>

                {errors.global && (
                  <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errors.global}</span>
                  </div>
                )}

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-mrk-muted uppercase tracking-wider mb-2">
                    Your Name <span className="text-mrk-cyan">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Smith"
                    className={`w-full bg-[#070A0F] border rounded-xl px-4 py-3 text-sm text-white placeholder-mrk-muted/40 font-mono outline-none transition-colors ${
                      errors.name ? 'border-red-500/80 focus:border-red-400' : 'border-white/15 focus:border-mrk-cyan'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1 font-mono">{errors.name}</p>}
                </div>

                {/* Email & Company (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-mrk-muted uppercase tracking-wider mb-2">
                      Business Email <span className="text-mrk-cyan">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={`w-full bg-[#070A0F] border rounded-xl px-4 py-3 text-sm text-white placeholder-mrk-muted/40 font-mono outline-none transition-colors ${
                        errors.email ? 'border-red-500/80 focus:border-red-400' : 'border-white/15 focus:border-mrk-cyan'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1 font-mono">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs font-mono text-mrk-muted uppercase tracking-wider mb-2">
                      Company Name <span className="text-white/30 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Systems"
                      className="w-full bg-[#070A0F] border border-white/15 focus:border-mrk-cyan rounded-xl px-4 py-3 text-sm text-white placeholder-mrk-muted/40 font-mono outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection Dropdown */}
                <div>
                  <label htmlFor="service" className="block text-xs font-mono text-mrk-muted uppercase tracking-wider mb-2">
                    Service Required <span className="text-mrk-cyan">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#070A0F] border border-white/15 focus:border-mrk-cyan rounded-xl px-4 py-3 text-sm text-white font-mono outline-none transition-colors"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-mrk-surface-2 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-mono text-mrk-muted uppercase tracking-wider mb-2">
                    Describe your workflow or challenge <span className="text-mrk-cyan">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about the manual task eating your team's time, or the AI experience you want to build..."
                    className={`w-full bg-[#070A0F] border rounded-xl px-4 py-3 text-sm text-white placeholder-mrk-muted/40 font-mono outline-none transition-colors resize-none ${
                      errors.description ? 'border-red-500/80 focus:border-red-400' : 'border-white/15 focus:border-mrk-cyan'
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-400 mt-1 font-mono">{errors.description}</p>
                  )}
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-display font-semibold text-sm sm:text-base text-[#041B24] bg-gradient-to-r from-mrk-cyan to-mrk-blue hover:shadow-cyan-glow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Verifying Enquiry...' : 'Request Automation Consultation'}</span>
                  </button>
                  <p className="text-[11px] font-mono text-center text-mrk-muted/70 mt-3">
                    Phase 1 frontend demonstration. No spam, no marketing newsletters.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
