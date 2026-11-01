import React from 'react';
import { FileText, ShieldAlert, CheckCircle, Scale } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-slate-400 text-xs">Last Updated: October 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-cyan-400" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using OmniStream ("the Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our software or web interfaces.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            2. Permitted Educational & Personal Use
          </h2>
          <p>
            OmniStream is provided strictly as a technical utility for format shifting, personal offline viewing, academic research, and non-commercial study. You agree not to use the Service to infringe on intellectual property rights, trademarks, or copyrights held by third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            3. User Responsibility & Third-Party Platforms
          </h2>
          <p>
            You acknowledge that third-party platforms (such as YouTube, TikTok, Instagram, X/Twitter, Reddit, and Vimeo) maintain their own individual Terms of Service. You are solely responsible for ensuring that your extraction and archiving activities comply with the policies of the respective source platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. No Hosting or Content Storage</h2>
          <p>
            OmniStream does not host, index, cache, or maintain any video or audio files on its servers. All data transfer is initiated by user request and streamed in real-time directly between upstream CDN nodes and the user’s client.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Abuse Prevention & Rate Limiting</h2>
          <p>
            Any attempt to bypass rate limits, launch denial-of-service (DoS) attacks, scrape server endpoints, or exploit security vulnerabilities will result in immediate permanent IP prohibition and automated reporting.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">6. Disclaimer of Warranties</h2>
          <p>
            The service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. OmniStream makes no guarantees regarding 100% platform availability, uninterrupted streaming, or content compatibility.
          </p>
        </section>
      </div>
    </div>
  );
};
