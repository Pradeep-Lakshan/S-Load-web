import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Shield, Zap, Sparkles } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How does OmniStream download videos without ads or popups?',
    a: 'OmniStream connects directly to social media content delivery networks via a high-performance backend running yt-dlp and ffmpeg. We don’t run malicious adware, third-party redirects, or shady popups. The video stream is piped directly to your browser memory.',
  },
  {
    q: 'Are downloaded videos permanently saved or stored on your servers?',
    a: 'Absolutely not. OmniStream operates under a strict Zero-Storage Architecture. The media data is streamed on-the-fly as an HTTP attachment response directly to your device. As soon as the transfer finishes, the connection closes and no copy resides on our systems.',
  },
  {
    q: 'Can I extract MP3 audio only from music or podcasts?',
    a: 'Yes! For every video analyzed, OmniStream provides dedicated audio options: MP3 320 kbps (Studio Fidelity) and MP3 128 kbps (Standard). This allows you to save background music, spoken podcasts, and lectures effortlessly.',
  },
  {
    q: 'What video resolutions are available for download?',
    a: 'Depending on the source video quality uploaded by the original creator, you can choose from 1080p Full HD, 720p HD, and 480p SD. If the original author only uploaded in 720p, that will be the maximum resolution available.',
  },
  {
    q: 'What happens if a video is private or age-restricted?',
    a: 'Private videos and videos requiring account sign-in cannot be downloaded. OmniStream respects private privacy boundaries and will present an error stating that the video is private or restricted.',
  },
  {
    q: 'Why are TikTok videos downloaded without watermarks?',
    a: 'TikTok provides both watermarked and original unwatermarked render streams through its public API. OmniStream automatically targets the clean source stream to give you crisp, watermark-free playback.',
  },
  {
    q: 'Is it legal to download videos using OmniStream?',
    a: 'Downloading copyrighted media without authorization may breach platform terms. OmniStream is designed for personal offline backup, educational research, and fair-use archiving of content that you own or have permission to access. Always respect creators’ rights.',
  },
  {
    q: 'How does the rate limiter work?',
    a: 'To guarantee uptime and prevent automated bot spam, our server enforces an IP-based sliding rate limit (e.g. 15 requests/minute). If you hit this limit, the system informs you of the cool-down seconds before your next request.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Everything you need to know about formats, privacy, direct streaming, and legal compliance.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-100 hover:text-cyan-300 transition-colors"
              >
                <span>{item.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-cyan-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
