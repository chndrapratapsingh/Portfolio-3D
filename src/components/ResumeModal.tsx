import React, { useState } from 'react';
import { PERSONAL_INFO, EXPERIENCES, SKILLS } from '../data/portfolioData';
import { soundManager } from '../utils/sound';
import { X, Download, Copy, Check, FileText, Mail, MapPin, Globe } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    soundManager.playClick();
    const resumeText = `
${PERSONAL_INFO.name} - ${PERSONAL_INFO.headline}
Email: ${PERSONAL_INFO.email} | Availability: ${PERSONAL_INFO.availability}
Portfolio: https://chandrapratapportfolio.vercel.app/ | GitHub: ${PERSONAL_INFO.github}

SUMMARY:
${PERSONAL_INFO.whoAmI}

EXPERIENCE:
${EXPERIENCES.map(e => `${e.role} at ${e.company} (${e.period})\n- ${e.description.join('\n- ')}`).join('\n\n')}

KEY SKILLS:
${SKILLS.map(s => `${s.name} (${s.category})`).join(', ')}
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = () => {
    soundManager.playSuccess();
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.resumeUrl;
    link.download = 'Chandrapratap_Suryavanshi_Resume.pdf';
    link.target = '_blank';
    link.click();
  };

  const handleDownloadFile = () => {
    soundManager.playSuccess();
    const content = `====================================================
CHANDRA PRATAP SURYAVANSHI - DEVELOPER • GAMER • STUDENT
====================================================
Email: ${PERSONAL_INFO.email}
Availability: ${PERSONAL_INFO.availability}
Portfolio: https://chandrapratapportfolio.vercel.app/
GitHub: ${PERSONAL_INFO.github}
YouTube: ${PERSONAL_INFO.youtube}

----------------------------------------------------
PROFESSIONAL SUMMARY
----------------------------------------------------
${PERSONAL_INFO.whoAmI}

----------------------------------------------------
WORK EXPERIENCE & PROJECTS
----------------------------------------------------
${EXPERIENCES.map(e => `[${e.period}] ${e.role} — ${e.company} (${e.location})
${e.description.map(d => ` • ${d}`).join('\n')}
 Technologies: ${e.skills.join(', ')}
`).join('\n')}
----------------------------------------------------
TECHNICAL SKILLS
----------------------------------------------------
Languages & Frameworks: C, C++, Spring Boot, Node.js, Python, Java, Kotlin, HTML5, CSS3, JavaScript
AI & Machine Learning: PyTorch, TensorFlow, NLP, ML Kit Vision, Lucy AI Architecture
====================================================
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Chandrapratap_Suryavanshi_Resume.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Chandrapratap's Resume</h3>
              <p className="text-xs text-slate-400 font-mono">Curriculum Vitae • AI Developer & CS Student</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" /> Download Resume PDF
          </button>

          <button
            onClick={handleDownloadFile}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Plain Text (.txt)
          </button>

          <button
            onClick={handleCopyText}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Plain Text'}
          </button>
        </div>

        {/* Resume Content View */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6 text-slate-300 font-sans">
          {/* Contact Bar */}
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-extrabold text-white">{PERSONAL_INFO.name}</h2>
            <p className="text-indigo-400 font-mono text-xs font-semibold mt-0.5">{PERSONAL_INFO.headline}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono mt-2">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {PERSONAL_INFO.email}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {PERSONAL_INFO.availability}</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> chandrapratapportfolio.vercel.app</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h4 className="text-xs font-mono uppercase text-indigo-400 tracking-wider mb-2">Professional Summary</h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{PERSONAL_INFO.whoAmI}</p>
          </div>

          {/* Work Experience */}
          <div>
            <h4 className="text-xs font-mono uppercase text-indigo-400 tracking-wider mb-3">Experience</h4>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white">
                    <span>{exp.role} — {exp.company}</span>
                    <span className="font-mono text-slate-400">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                    {exp.description.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills summary */}
          <div>
            <h4 className="text-xs font-mono uppercase text-indigo-400 tracking-wider mb-2">Key Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS.map((s) => (
                <span key={s.name} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

