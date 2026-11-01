import React, { useState } from 'react';
import { ShieldCheck, Mail, AlertCircle, CheckCircle2, Send, FileSignature } from 'lucide-react';

export const DmcaPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    workUrl: '',
    reason: '',
    affirmation: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.affirmation) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-rose-400 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Copyright & DMCA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">DMCA Compliance & Takedown</h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
          OmniStream respects the intellectual property rights of creators and copyright owners. We respond expediently to all qualified Digital Millennium Copyright Act notices.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs text-slate-300 leading-relaxed">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>Important Architecture Notice</span>
            </h3>
            <p>
              OmniStream is an automated technical converter and media streaming proxy. <strong>We do not host or store any media content on our servers.</strong>
            </p>
            <p>
              If a video is hosted on YouTube, TikTok, Instagram, Reddit, etc., the most effective remedy to remove the content from the Internet is to submit your DMCA notice directly to the host platform hosting the file.
            </p>
            <p>
              However, if you wish to block specific URLs from being processed through our converter proxy, you may submit a domain exclusion request using the form.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-2">
            <span className="font-semibold text-slate-200 block">Direct DMCA Agent Email:</span>
            <div className="flex items-center gap-2 font-mono text-cyan-400 select-all">
              <Mail className="w-4 h-4" />
              <span>dmca@omnistream-app.com</span>
            </div>
            <p className="text-[11px] text-slate-400">Average response window: 12-24 business hours.</p>
          </div>
        </div>

        {/* Submission Form */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Notice Successfully Received</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you. Your notification has been queued for our legal compliance team. A confirmation receipt has been dispatched to <span className="text-cyan-300 font-mono">{formData.email}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                <FileSignature className="w-4 h-4 text-cyan-400" />
                <span>Notice Submission Form</span>
              </h3>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Copyright Owner / Authorized Agent Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Jane Doe or Studio Media LLC"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Official Contact Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Original Work Reference URL / Infringing Link *
                </label>
                <input
                  type="url"
                  required
                  value={formData.workUrl}
                  onChange={(e) => setFormData({ ...formData, workUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Reason for Request & Description of Infringement
                </label>
                <textarea
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Please state details regarding your ownership of the copyrighted work..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="affirm"
                  required
                  checked={formData.affirmation}
                  onChange={(e) => setFormData({ ...formData, affirmation: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-cyan-500"
                />
                <label htmlFor="affirm" className="text-[11px] text-slate-400 leading-tight">
                  I state under penalty of perjury that I am the copyright owner or authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all mt-4"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit DMCA Takedown Request</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
