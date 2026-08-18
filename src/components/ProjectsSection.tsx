import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectCard3D } from './3d/ProjectCard3D';
import { soundManager } from '../utils/sound';
import { ExternalLink, Github, Eye, Youtube, Bot, Sparkles, Star, CheckCircle2 } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const lucyProject = PROJECTS.find((p) => p.id === 'lucy-ai') || PROJECTS[0];
  const otherProjects = PROJECTS.filter((p) => p.id !== 'lucy-ai');

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3.5 py-1 rounded-full border border-indigo-800/50">
            Portfolio Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            FEATURED PROJECTS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Exploring next-generation artificial intelligence, low-level graphics game engines, and full-stack web architectures.
          </p>
        </div>

        {/* 1. Featured Main Card: LUCY AI */}
        {lucyProject && (
          <div
            onMouseEnter={() => {
              soundManager.playHover();
              setHoveredCardId(lucyProject.id);
            }}
            onMouseLeave={() => setHoveredCardId(null)}
            className="rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900/90 to-purple-950/60 border border-indigo-500/40 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group hover:border-indigo-400 transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-xs font-bold flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-indigo-400" /> {lucyProject.subhead}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold animate-pulse">
                    {lucyProject.statusBadge}
                  </span>
                </div>

                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    {lucyProject.title} <Sparkles className="w-6 h-6 text-purple-400" />
                  </h3>
                  <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-3">
                    {lucyProject.description}
                  </p>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-mono text-slate-400 mr-2">Tech Stack:</span>
                  {lucyProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-slate-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Key Features Grid */}
                {lucyProject.keyFeatures && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Key Capabilities:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {lucyProject.keyFeatures.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs font-mono text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main Card CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-indigo-900/40">
                  {lucyProject.videoUrl && (
                    <a
                      href={lucyProject.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => soundManager.playClick()}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02]"
                    >
                      <Youtube className="w-4 h-4" /> View Video Demo <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onSelectProject(lucyProject);
                    }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-400 text-slate-200 font-semibold text-sm transition-all"
                  >
                    <Eye className="w-4 h-4 text-indigo-400" /> Deep Architecture
                  </button>

                  <a
                    href={lucyProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    <Github className="w-4 h-4" /> GitHub Repo
                  </a>
                </div>
              </div>

              {/* Right 3D Interactive Model Viewport */}
              <div className="lg:col-span-5 h-[320px] rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden relative shadow-inner">
                <ProjectCard3D
                  modelType={lucyProject.modelType}
                  color={lucyProject.color}
                  isHovered={hoveredCardId === lucyProject.id}
                  isLucyAi={true}
                />
                <div className="absolute bottom-3 right-3 bg-slate-950/90 px-2.5 py-1 rounded-md text-[10px] font-mono text-indigo-300 border border-indigo-800/60">
                  JARVIS Plasma Reactor Core
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Other Projects Grid */}
        <div className="space-y-6 pt-6">
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white tracking-tight">More Projects & Engines</h3>
            <p className="text-xs font-mono text-slate-400 pt-1">Custom C++ OpenGL game engines, Firebase ecosystems, and Android Java applications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProjects.map((project) => {
              const isHovered = hoveredCardId === project.id;
              return (
                <div
                  key={project.id}
                  onMouseEnter={() => {
                    soundManager.playHover();
                    setHoveredCardId(project.id);
                  }}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md p-6 flex flex-col justify-between group hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* 3D Viewport Box */}
                    <ProjectCard3D
                      modelType={project.modelType}
                      color={project.color}
                      isHovered={isHovered}
                    />

                    {/* Category */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-800/60 text-indigo-300">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-indigo-300 font-medium mt-1">
                        {project.subhead || project.tagline}
                      </p>
                      <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Key features pill list */}
                    {project.keyFeatures && (
                      <div className="space-y-1 pt-1">
                        {project.keyFeatures.slice(0, 3).map((kf) => (
                          <div key={kf} className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            <span>{kf}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded bg-slate-950 text-[11px] font-mono text-slate-300 border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-5 mt-4 border-t border-slate-800/80">
                    <button
                      onClick={() => {
                        soundManager.playClick();
                        onSelectProject(project);
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => soundManager.playClick()}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold transition-all hover:scale-[1.03]"
                        >
                          <ExternalLink className="w-3 h-3" /> Prototype
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => soundManager.playClick()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

