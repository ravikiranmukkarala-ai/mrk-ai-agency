import React from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AmbientCanvas } from './components/AmbientCanvas';

import { HeroSection } from './sections/HeroSection';
import { TickerSection } from './sections/TickerSection';
import { ProblemsSection } from './sections/ProblemsSection';
import { ComparisonSection } from './sections/ComparisonSection';
import { ServicesSection } from './sections/ServicesSection';
import { WorkflowSection } from './sections/WorkflowSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ProofLabSection } from './sections/ProofLabSection';
import { FounderSection } from './sections/FounderSection';
import { SandboxDemoSection } from './sections/SandboxDemoSection';
import { ContactSection } from './sections/ContactSection';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-mrk-bg text-mrk-text selection:bg-mrk-cyan selection:text-black">
      {/* Background Interactive Cyber Mesh Canvas */}
      <AmbientCanvas />

      {/* Sticky Glassmorphic Header */}
      <Navbar />

      {/* Main Page Content */}
      <main className="relative z-10">
        <HeroSection />
        <TickerSection />
        <ProblemsSection />
        <ComparisonSection />
        <ServicesSection />
        <WorkflowSection />
        <ProjectsSection />
        <ProofLabSection />
        <FounderSection />
        <SandboxDemoSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
