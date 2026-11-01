import React, { useState } from 'react';
import { Download, Terminal, Shield, HelpCircle, FileText, ChevronDown, CheckCircle2 } from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  openCodeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage, openCodeModal }) => {
  const [platformMenuOpen, setPlatformMenuOpen] = useState(false);

  const platforms: { id: ActivePage; name: string; color: string }[] = [
    { id: 'youtube', name: 'YouTube Downloader', color: 'text-red-400' },
    { id: 'tiktok', name: 'TikTok Downloader', color: 'text-cyan-400' },
    { id: 'instagram', name: 'Instagram Downloader', color: 'text-pink-400' },
    { id: 'twitter', name: 'X / Twitter Downloader', color: 'text-blue-400' },
    { id: 'facebook', name: 'Facebook Downloader', color: 'text-indigo-400' },
    { id: 'reddit', name: 'Reddit Downloader', color: 'text-orange-400' },
    { id: 'vimeo', name: 'Vimeo Downloader', color: 'text-emerald-400' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
              <Download className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                OmniStream
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                v2.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Universal Media Extractor</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActivePage('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePage === 'home' ? 'bg-slate-800 text-white font-semibold' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            Home
          </button>

          {/* Platforms dropdown */}
          <div className="relative">
            <button
              onClick={() => setPlatformMenuOpen(!platformMenuOpen)}
              onBlur={() => setTimeout(() => setPlatformMenuOpen(false), 200)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                platforms.some(p => p.id === activePage)
                  ? 'bg-slate-800 text-white'
                  : 'hover:text-white hover:bg-slate-900'
              }`}
            >
              Platforms
              <ChevronDown className="w-4 h-4 opacity-70" />
            </button>

            {platformMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {platforms.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActivePage(p.id);
                      setPlatformMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      activePage === p.id
                        ? 'bg-cyan-500/20 text-cyan-300'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className={`w-2 h-2 rounded-full ${p.color.replace('text-', 'bg-')}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setActivePage('faq')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePage === 'faq' ? 'bg-slate-800 text-white font-semibold' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            FAQ
          </button>

          <button
            onClick={() => setActivePage('dmca')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activePage === 'dmca' ? 'bg-slate-800 text-white font-semibold' : 'hover:text-white hover:bg-slate-900'
            }`}
          >
            DMCA
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-[11px] font-medium text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>yt-dlp Core Ready</span>
          </div>

          {/* Docker & API Modal Button */}
          <button
            onClick={openCodeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 transition-all shadow-sm hover:border-cyan-500/40"
            title="Inspect Docker & FastAPI Code"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">API & Docker</span>
          </button>
        </div>
      </div>
    </header>
  );
};
