import React, { useEffect } from 'react';
import { Project } from '../types';
import { ProjectCard3D } from './3d/ProjectCard3D';
import { soundManager } from '../utils/sound';
import { X, ExternalLink, Github, CheckCircle2, Sparkles, Star } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3D Model Header Preview */}
        <ProjectCard3D
          modelType={project.modelType}
          color={project.color}
          isHovered={true}
        />

        {/* Info Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-mono text-amber-400 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-800/80 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" /> Featured Project
              </span>
            )}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h3>
          <p className="text-sm font-semibold text-indigo-300 mt-1">{project.tagline}</p>
        </div>

        {/* Metrics Bar */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <span className="text-slate-400 text-[10px] uppercase font-mono block">{m.label}</span>
                <span className="text-cyan-400 font-bold font-mono text-base sm:text-lg">{m.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Description */}
        <div className="space-y-3">
          <h4 className="text-sm font-mono uppercase text-slate-400 tracking-wider">Project Overview</h4>
          <p className="text-slate-300 text-sm leading-relaxed">
            {project.longDescription || project.description}
          </p>
        </div>

        {/* Key Architectural Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-mono uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Key Features & Architecture
            </h4>
            <div className="space-y-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Tags */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase text-slate-400">Technologies Utilized</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Github className="w-4 h-4" /> View Source Code
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
          >
            Open Live App <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
