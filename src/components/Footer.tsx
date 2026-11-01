import React from 'react';
import { Shield, Lock, Zap, Server, Heart } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="md:col-span-1">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent">
              OmniStream
            </span>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Ultra-fast social video and audio extractor. Built with direct HTTP piping without retaining any video data on servers.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>SSRF Protected & Zero Storage</span>
            </div>
          </div>

          {/* Supported Platforms */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Supported Platforms
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActivePage('youtube')} className="hover:text-cyan-400 transition-colors">
                  YouTube Video & MP3
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('tiktok')} className="hover:text-cyan-400 transition-colors">
                  TikTok (Watermark-Free)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('instagram')} className="hover:text-cyan-400 transition-colors">
                  Instagram Reels & Stories
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('twitter')} className="hover:text-cyan-400 transition-colors">
                  X / Twitter Video Downloader
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('facebook')} className="hover:text-cyan-400 transition-colors">
                  Facebook Watch & Reels
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('reddit')} className="hover:text-cyan-400 transition-colors">
                  Reddit Videos with Audio
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('vimeo')} className="hover:text-cyan-400 transition-colors">
                  Vimeo 1080p Stream
                </button>
              </li>
            </ul>
          </div>

          {/* Security & Reliability */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Architecture & Security
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>FastAPI + yt-dlp Core</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Private IP & SSRF Blocking</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-indigo-400" />
                <span>Direct Buffer Streaming</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cloudflare Turnstile Verified</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActivePage('terms')} className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('privacy')} className="hover:text-cyan-400 transition-colors">
                  Privacy Policy (No Logs)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('dmca')} className="hover:text-cyan-400 transition-colors">
                  DMCA & Copyright Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('faq')} className="hover:text-cyan-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer banner */}
        <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p>
            Disclaimer: OmniStream is an educational media utility tool and does not host, store, or archive copyrighted content. Users are responsible for adhering to source platform terms.
          </p>
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            Engineered with high performance & security
          </p>
        </div>
      </div>
    </footer>
  );
};
