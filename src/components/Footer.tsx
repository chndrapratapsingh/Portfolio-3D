import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { ArrowUp, Sparkles, ExternalLink, Github, Youtube, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Left Brand */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xl font-mono font-bold text-white tracking-tight">{PERSONAL_INFO.brand}</span>
              <span className="text-xs font-mono text-indigo-400 px-2.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/50 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> 3D React Three Fiber Portfolio
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {PERSONAL_INFO.headline} • Developer • Gamer • Computer Science Student
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.youtube}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-red-400 hover:border-red-900 transition-colors"
              title="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-900 transition-colors"
              title="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/20 ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Chandrapratap Suryavanshi. All rights reserved. Built with Three.js & React Three Fiber.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://chandrapratapportfolio.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline flex items-center gap-1"
            >
              
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

