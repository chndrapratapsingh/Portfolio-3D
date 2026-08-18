import React from 'react';
import { Canvas } from '@react-three/fiber';
import { HeroObject } from './3d/HeroObject';
import { GraphicSettings } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { Github, FileText, Sparkles, Layers, Send, Gamepad2, Code, Bot, GraduationCap } from 'lucide-react';

interface HeroProps {
  graphicSettings: GraphicSettings;
  onOpenLab: () => void;
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ graphicSettings, onOpenLab, onOpenResume }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Typography & Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Headline pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-400 text-xs font-mono tracking-widest uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>{PERSONAL_INFO.headline}</span>
          </div>

          {/* Name Header */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
                {PERSONAL_INFO.name}
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-mono italic text-indigo-300 pt-1">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          {/* Badge / Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {PERSONAL_INFO.badges.map((badge, idx) => {
              const icons = [<Code className="w-3.5 h-3.5 text-indigo-400" />, <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />, <Bot className="w-3.5 h-3.5 text-cyan-400" />, <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />];
              return (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono font-semibold text-slate-200"
                >
                  {icons[idx % icons.length]}
                  {badge}
                </span>
              );
            })}
          </div>

          {/* Bio overview */}
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            {PERSONAL_INFO.whoAmI}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02]"
            >
              <Github className="w-4 h-4" /> View My Work
            </a>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenResume();
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all shadow-lg hover:border-slate-600"
            >
              <FileText className="w-4 h-4 text-cyan-400" /> Download Resume
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenLab();
              }}
              className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-sm transition-colors"
            >
              <Layers className="w-4 h-4 text-purple-400" /> 3D Controls
            </button>
          </div>

          {/* Social quick links */}
          <div className="pt-2 flex flex-wrap items-center gap-5 text-xs font-mono text-slate-400">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
            >
              <Github className="w-4 h-4 text-indigo-400" /> GitHub
            </a>
            <a
              href={PERSONAL_INFO.youtube}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-red-400 transition-colors"
            >
              <span className="text-red-500 font-bold">YT</span> YouTube
            </a>
            <a
              href={PERSONAL_INFO.twitter}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            >
              <span className="text-cyan-400 font-bold">X</span> Twitter
            </a>
            <a
              href={PERSONAL_INFO.discordUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-purple-400 transition-colors"
            >
              <span className="text-purple-400 font-bold">DC</span> Discord ({PERSONAL_INFO.discordUser})
            </a>
          </div>
        </div>

        {/* Right Column: 3D Interactive Core */}
        <div className="lg:col-span-5 h-[420px] sm:h-[480px] rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/80 border border-slate-800/80 backdrop-blur-xl relative shadow-2xl overflow-hidden group">
          <Canvas camera={{ position: [0, 0, 6.8], fov: 48 }}>
            <HeroObject settings={graphicSettings} />
          </Canvas>

          {/* Interactive hint overlay */}
          <div className="absolute top-4 right-4 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" /> Click & Drag 3D Interactive Core
          </div>
        </div>
      </div>
    </section>
  );
};

