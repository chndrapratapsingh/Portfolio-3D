import React, { useState, useEffect } from 'react';
import { GraphicSettings, Project } from './types';
import { ScrollCanvas } from './components/3d/ScrollCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Playground3D } from './components/3d/Playground3D';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  const [graphicSettings, setGraphicSettings] = useState<GraphicSettings>({
    quality: 'high',
    enableParticles: true,
    enableWireframe: false,
    autoRotate: true,
    activeGeometry: 'torusKnot',
    primaryColor: '#6366f1',
    secondaryColor: '#06b6d4',
  });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdateSettings = (newSettings: Partial<GraphicSettings>) => {
    setGraphicSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const scrollToLab = () => {
    const el = document.getElementById('lab');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Scroll-Driven 3D Canvas Background */}
      <ScrollCanvas scrollProgress={scrollProgress} />

      {/* Navigation Header */}
      <Navbar onOpenResume={() => setResumeOpen(true)} />

      {/* Hero Section */}
      <Hero
        graphicSettings={graphicSettings}
        onOpenLab={scrollToLab}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* About Section */}
      <About />

      {/* Skills 3D Constellation */}
      <SkillsSection />

      {/* Projects Grid with 3D Viewports */}
      <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />

      {/* Career & Education Experience Timeline */}
      <ExperienceSection />

      {/* 3D Interactive Lab / Customization Station */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Playground3D
          settings={graphicSettings}
          onUpdateSettings={handleUpdateSettings}
        />
      </div>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Project Architecture Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume View / Download Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}
