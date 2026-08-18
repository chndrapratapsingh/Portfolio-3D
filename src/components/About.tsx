import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Terminal as TerminalIcon, Bot, Rocket, Copy, Check, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'whoami' | 'lucy'>('all');

  const copyTerminalText = () => {
    const text = `$ whoami\n${PERSONAL_INFO.terminal.whoami}\n\n$ ls skills/\n${PERSONAL_INFO.terminal.skills}\n\n$ cat projects/lucy.ai\n${PERSONAL_INFO.terminal.lucy}\n\n$ status\n${PERSONAL_INFO.terminal.status}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3.5 py-1 rounded-full border border-indigo-800/50">
            Portfolio Bio
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            ABOUT ME
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Bridging creativity & technology through code, AI innovation, and interactive gaming engines.
          </p>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Who Am I & My Mission */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            {/* Who Am I Card */}
            <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-xl space-y-4 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Who Am I?</h3>
                  <p className="text-xs font-mono text-indigo-400">Developer • Gamer • Student</p>
                </div>
              </div>
              <p className="text-slate-300 text-base leading-relaxed">
                {PERSONAL_INFO.whoAmI}
              </p>
            </div>

            {/* My Mission Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-slate-900/80 border border-purple-500/30 backdrop-blur-md shadow-xl space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bot className="w-24 h-24 text-purple-400" />
              </div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    My Mission <Sparkles className="w-4 h-4 text-purple-400" />
                  </h3>
                  <p className="text-xs font-mono text-purple-400">Developing Lucy AI (JARVIS)</p>
                </div>
              </div>
              <p className="text-slate-300 text-base leading-relaxed relative z-10">
                {PERSONAL_INFO.mission}
              </p>
            </div>
          </div>

          {/* Right Column: Terminal Component (`~/profile`) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden font-mono text-sm h-full flex flex-col justify-between">
              
              {/* Terminal Header */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-400 font-semibold ml-2 flex items-center gap-1">
                    <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" /> ~/profile
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800 text-[11px]">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-2 py-0.5 rounded ${activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveTab('whoami')}
                      className={`px-2 py-0.5 rounded ${activeTab === 'whoami' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      Bio
                    </button>
                    <button
                      onClick={() => setActiveTab('lucy')}
                      className={`px-2 py-0.5 rounded ${activeTab === 'lucy' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      Lucy AI
                    </button>
                  </div>
                  <button
                    onClick={copyTerminalText}
                    title="Copy terminal output"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 space-y-4 text-slate-200 overflow-y-auto flex-grow bg-slate-950/90">
                {(activeTab === 'all' || activeTab === 'whoami') && (
                  <>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-indigo-400">
                        <span className="text-emerald-400 font-bold">$</span> whoami
                      </div>
                      <div className="pl-4 text-emerald-300 font-semibold">{PERSONAL_INFO.terminal.whoami}</div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-indigo-400">
                        <span className="text-emerald-400 font-bold">$</span> ls skills/
                      </div>
                      <div className="pl-4 text-cyan-300 tracking-wide font-mono">
                        {PERSONAL_INFO.terminal.skills}
                      </div>
                    </div>
                  </>
                )}

                {(activeTab === 'all' || activeTab === 'lucy') && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <span className="text-emerald-400 font-bold">$</span> cat projects/lucy.ai
                    </div>
                    <div className="pl-4 text-purple-300 font-semibold bg-purple-950/30 p-2.5 rounded-lg border border-purple-800/40">
                      {PERSONAL_INFO.terminal.lucy}
                    </div>
                  </div>
                )}

                {activeTab === 'all' && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <span className="text-emerald-400 font-bold">$</span> status
                    </div>
                    <div className="pl-4 text-amber-300 font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      {PERSONAL_INFO.terminal.status}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center gap-2 text-slate-500 text-xs">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="inline-block w-2.5 h-4 bg-indigo-400 animate-pulse" />
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="bg-slate-900/80 px-4 py-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> System Active: Arch / Linux Kernel
                </span>
                <span className="font-mono text-indigo-400">Chandrapratap Suryavanshi v2025</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

