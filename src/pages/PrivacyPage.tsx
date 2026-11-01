import React from 'react';
import { Lock, EyeOff, ShieldCheck, Database, Server } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" />
          <span>Privacy Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-slate-400 text-xs">Strict Zero-Logging & Zero-Storage Standard</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 text-cyan-300 text-xs flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <p>
            <strong>Core Privacy Guarantee:</strong> OmniStream does not track your identity, does not log the video URLs you submit to persistent storage, and never retains copies of your media files on disk.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-400" />
            1. No User Accounts & No Cookies
          </h2>
          <p>
            We do not require account registration, passwords, social logins, or persistent tracking cookies. Your session history is saved purely within your local browser's localStorage and never transmitted to our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-400" />
            2. Ephemeral In-Memory Data Piping
          </h2>
          <p>
            When you request a download, the video chunk stream flows directly through volatile system memory buffers into your client's response stream. No temporary files or persistent logs are retained once the HTTP pipe completes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" />
            3. Transient Security Rate Limiting
          </h2>
          <p>
            To prevent distributed denial of service and server abuse, IP addresses are temporarily tracked in volatile memory exclusively for rate-limiting calculations (sliding window). These records are automatically discarded every 5 minutes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Cloudflare Turnstile Verification</h2>
          <p>
            We employ Cloudflare Turnstile to verify human requests without intrusive image captchas or cross-site behavioral tracking cookies. Turnstile validates device telemetry without associating it with personal identity.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Changes to This Policy</h2>
          <p>
            Any future revisions to our architectural privacy guidelines will be published directly on this page.
          </p>
        </section>
      </div>
    </div>
  );
};
