import React, { useState } from 'react';
import { SKILLS, CATEGORY_BREAKDOWN } from '../data/portfolioData';
import { Skill } from '../types';
import { SkillOrbit3D } from './3d/SkillOrbit3D';
import { soundManager } from '../utils/sound';
import { Code, FileCode, Cpu, Sparkles, Server, Database, Globe, Smartphone, Brain, Layers, CheckCircle } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS[0]);

  const categories = ['All', 'Full-Stack & Web', 'Android Development', 'AI & Machine Learning', 'System Programming'];

  const filteredSkills = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => {
        const cat = activeCategory.toLowerCase();
        const skillCat = s.category.toLowerCase();
        if (cat.includes('android')) return skillCat.includes('android');
        if (cat.includes('full-stack') || cat.includes('web')) return skillCat.includes('web') || skillCat.includes('backend');
        if (cat.includes('ai') || cat.includes('machine')) return skillCat.includes('ai') || skillCat.includes('machine');
        if (cat.includes('system')) return skillCat.includes('system');
        return skillCat.includes(cat);
      });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return Code;
      case 'FileCode': return FileCode;
      case 'Cpu': return Cpu;
      case 'Sparkles': return Sparkles;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'Globe': return Globe;
      case 'Smartphone': return Smartphone;
      case 'Brain': return Brain;
      default: return Layers;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Expert': return 'text-emerald-400 bg-emerald-950/80 border-emerald-500/40';
      case 'Advanced': return 'text-indigo-400 bg-indigo-950/80 border-indigo-500/40';
      case 'Medium': return 'text-amber-400 bg-amber-950/80 border-amber-500/40';
      case 'Learning': return 'text-purple-400 bg-purple-950/80 border-purple-500/40';
      default: return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3.5 py-1 rounded-full border border-indigo-800/50">
            Skills & Mastery
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            TECH STACK
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click on 3D skill nodes or categories to explore language proficiencies and framework mastery.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Orbit + Skill Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 3D Orbit Galaxy */}
          <div className="lg:col-span-7">
            <SkillOrbit3D
              skills={filteredSkills}
              selectedSkill={selectedSkill}
              onSelectSkill={(skill) => {
                soundManager.playHover();
                setSelectedSkill(skill);
              }}
            />
          </div>

          {/* Right: Selected Skill Inspector Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                {(() => {
                  const IconComp = getIcon(selectedSkill.icon);
                  return (
                    <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                      <IconComp className="w-6 h-6" />
                    </div>
                  );
                })()}
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedSkill.name}</h3>
                  <span className="text-xs font-mono text-slate-400">{selectedSkill.category}</span>
                </div>
              </div>

              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${getBadgeColor(selectedSkill.levelBadge)}`}>
                  {selectedSkill.levelBadge}
                </span>
              </div>
            </div>

            {/* Level Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Proficiency Level</span>
                <span>{selectedSkill.level}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${selectedSkill.level}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 font-mono">
              {selectedSkill.description}
            </p>
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {filteredSkills.map((s) => {
            const IconComp = getIcon(s.icon);
            const isSel = selectedSkill.name === s.name;
            return (
              <button
                key={s.name}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedSkill(s);
                }}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSel
                    ? 'bg-indigo-950/70 border-indigo-500 shadow-xl shadow-indigo-500/20 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <IconComp className={`w-5 h-5 ${isSel ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span className="text-sm font-bold text-white">{s.name}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${getBadgeColor(s.levelBadge)}`}>
                    {s.levelBadge}
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800/50">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: `${s.level}%` }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Category Breakdown Cards */}
        <div className="pt-6 border-t border-slate-800/80 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white tracking-tight">Category Breakdown</h3>
            <p className="text-xs font-mono text-slate-400 pt-1">Specialized Engineering Domains & Capabilities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORY_BREAKDOWN.map((cat) => {
              const icons: Record<string, React.FC<{ className?: string }>> = {
                'System Programming': Cpu,
                'Web Development': Globe,
                'AI & Machine Learning': Brain,
              };
              const IconComp = icons[cat.title] || Layers;
              return (
                <div
                  key={cat.title}
                  className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/90 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold text-white">{cat.title}</h4>
                  </div>

                  <ul className="space-y-2.5 pt-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

