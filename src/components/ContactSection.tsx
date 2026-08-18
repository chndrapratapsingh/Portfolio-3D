import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';
import { soundManager } from '../utils/sound';
import { Mail, Send, CheckCircle2, Copy, Check, Github, Youtube, Twitter, Terminal as TerminalIcon, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'AI & Code Collaboration',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const prefillSubjects = ['AI & Code Collaboration', 'Lucy AI Discussion', 'AiCamX Mobile App', 'General Chat'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    setErrorMessage(null);
    soundManager.playClick();

    try {
      // Dispatching directly to Chandrapratap's verified email endpoint
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio Contact] ${formData.subject || 'New Message'} from ${formData.name}`,
          message: formData.message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      if (response.ok || data.success === 'true' || data.success === true) {
        setSubmitted(true);
        soundManager.playSuccess();

        // Trigger celebratory confetti
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#06b6d4', '#ec4899', '#10b981', '#38bdf8'],
        });

        setFormData({
          name: '',
          email: '',
          subject: 'AI & Code Collaboration',
          message: '',
        });
      } else {
        throw new Error(data.message || 'Transmission could not be confirmed.');
      }
    } catch (err: unknown) {
      console.warn('Form submission fallback:', err);
      // If network or ad-blocker prevented the AJAX request, offer instant fallback to mailto
      setErrorMessage(
        'Direct submission encountered a network block. You can still transmit your message directly using the mailto fallback below.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[Portfolio] ${formData.subject || 'Collaboration Inquiry'}`);
    const body = encodeURIComponent(
      `Hello Chandrapratap,\n\nMy name: ${formData.name || 'Visitor'}\nMy email: ${formData.email || 'Not specified'}\n\nMessage:\n${formData.message || ''}\n\nSent from Portfolio Contact Form`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3.5 py-1 rounded-full border border-indigo-800/50">
            Let's Connect
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            GET IN TOUCH
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {PERSONAL_INFO.contactText}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 space-y-6 p-8 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-xl">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Direct Contact Info</h3>
              <p className="text-slate-400 text-xs font-mono">Available for Remote Work & AI Collaborations</p>
            </div>

            {/* Email Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Primary Email Address</span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs sm:text-sm font-mono text-indigo-300 hover:text-indigo-200 underline decoration-indigo-500/40 truncate"
                  title="Click to compose email"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="pt-1">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition-colors font-mono"
                >
                  <Mail className="w-3.5 h-3.5" /> Open default email app <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Discord & Status */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Discord Handle</span>
                <span className="text-purple-400 font-bold">{PERSONAL_INFO.discordUser}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono border-t border-slate-900 pt-2">
                <span className="text-slate-400">Availability</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {PERSONAL_INFO.availability}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-slate-800/80 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Official Channels</span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500 text-slate-300 hover:text-white transition-all flex items-center gap-2.5 text-xs font-mono"
                >
                  <Github className="w-4 h-4 text-indigo-400" /> GitHub
                </a>

                <a
                  href={PERSONAL_INFO.youtube}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-500 text-slate-300 hover:text-white transition-all flex items-center gap-2.5 text-xs font-mono"
                >
                  <Youtube className="w-4 h-4 text-red-500" /> YouTube
                </a>

                <a
                  href={PERSONAL_INFO.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500 text-slate-300 hover:text-white transition-all flex items-center gap-2.5 text-xs font-mono"
                >
                  <Twitter className="w-4 h-4 text-cyan-400" /> Twitter / X
                </a>

                <a
                  href={PERSONAL_INFO.discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500 text-slate-300 hover:text-white transition-all flex items-center gap-2.5 text-xs font-mono"
                >
                  <span className="text-purple-400 font-bold">DC</span> Discord Profile
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (`~/contact-form`) */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out! Your message has been sent directly to{' '}
                  <span className="text-indigo-400 font-mono font-medium">{PERSONAL_INFO.email}</span>. I will review your message and reply promptly.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setSubmitted(false);
                      setErrorMessage(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between text-indigo-400 font-mono text-xs uppercase border-b border-slate-800 pb-3">
                  <span className="flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4" /> ~/contact-form &gt; {PERSONAL_INFO.email}
                  </span>
                  <span className="text-slate-500 text-[11px]">Direct Relay</span>
                </div>

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs space-y-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p>{errorMessage}</p>
                    </div>
                    <a
                      href={getMailtoUrl()}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/40 text-amber-100 font-semibold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" /> Open in Email App to Send Now
                    </a>
                  </div>
                )}

                {/* Pre-fill subject buttons */}
                <div>
                  <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Select Topic
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {prefillSubjects.map((subj) => (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setFormData((prev) => ({ ...prev, subject: subj }));
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          formData.subject === subj
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow'
                            : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1.5">Your Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1.5">Message *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your project, AI development ideas, or tech chat..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" /> Transmitting to {PERSONAL_INFO.email}...
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <a
                      href={getMailtoUrl()}
                      className="text-xs text-slate-500 hover:text-indigo-400 transition-colors font-mono inline-flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" /> Or compose directly in your email client
                    </a>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


