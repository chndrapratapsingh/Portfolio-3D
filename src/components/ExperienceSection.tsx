import React from 'react';
import { EXPERIENCES } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800/50">
            Career & Education
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Professional Experience Timeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Track record of building enterprise full-stack apps, 3D platforms, and high-impact web products.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-indigo-950/80 sm:ml-6 md:ml-32 space-y-10 pl-6 sm:pl-8">
          {EXPERIENCES.map((exp) => {
            const isEdu = exp.type === 'Education';
            return (
              <div key={exp.id} className="relative group">
                {/* Timeline Dot Marker */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center text-indigo-400 group-hover:scale-125 group-hover:border-cyan-400 transition-all shadow-lg shadow-indigo-500/20">
                  {isEdu ? <GraduationCap className="w-3 h-3 text-cyan-400" /> : <Briefcase className="w-3 h-3 text-indigo-400" />}
                </div>

                {/* Card Container */}
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-xl hover:border-slate-700 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-800/80 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-indigo-300 flex items-center gap-2 mt-0.5">
                        {exp.company}
                        <span className="text-slate-600">•</span>
                        <span className="text-xs text-slate-400 font-normal flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" /> {exp.location}
                        </span>
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5" /> {exp.period}
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-2.5 mb-6">
                    {exp.description.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-slate-950 text-xs font-mono text-indigo-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
