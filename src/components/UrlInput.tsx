import React, { useState, useEffect } from 'react';
import { Search, Clipboard, X, ArrowRight, Loader2, Sparkles, Check, AlertCircle } from 'lucide-react';

interface UrlInputProps {
  onSearch: (url: string) => void;
  isLoading: boolean;
  prefillUrl?: string;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onSearch, isLoading, prefillUrl }) => {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);

  useEffect(() => {
    if (prefillUrl) {
      setUrl(prefillUrl);
      detectPlatform(prefillUrl);
    }
  }, [prefillUrl]);

  const detectPlatform = (val: string) => {
    const lower = val.toLowerCase();
    if (lower.includes('youtube.com') || lower.includes('youtu.be')) setDetectedPlatform('YouTube');
    else if (lower.includes('tiktok.com')) setDetectedPlatform('TikTok');
    else if (lower.includes('instagram.com')) setDetectedPlatform('Instagram');
    else if (lower.includes('twitter.com') || lower.includes('x.com')) setDetectedPlatform('X / Twitter');
    else if (lower.includes('facebook.com') || lower.includes('fb.watch')) setDetectedPlatform('Facebook');
    else if (lower.includes('reddit.com') || lower.includes('redd.it')) setDetectedPlatform('Reddit');
    else if (lower.includes('vimeo.com')) setDetectedPlatform('Vimeo');
    else setDetectedPlatform(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUrl(val);
    detectPlatform(val);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        detectPlatform(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Clipboard read failed:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !isLoading) {
      onSearch(url.trim());
    }
  };

  // Quick sample links for testing immediately
  const sampleLinks = [
    { name: 'YouTube', url: 'https://www.youtube.com/watch?v=sample-nature-timelapse' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@creator/video/sample-tips' },
    { name: 'Instagram', url: 'https://www.instagram.com/reel/sample-amalfi-sunset' },
    { name: 'X / Twitter', url: 'https://x.com/tech/status/sample-drone-flight' },
    { name: 'Reddit', url: 'https://www.reddit.com/r/aww/comments/sample-kitten' },
    { name: 'Vimeo', url: 'https://vimeo.com/sample-architectural-film' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex items-center bg-slate-900/90 border-2 border-slate-700/80 rounded-2xl p-2 shadow-2xl transition-all duration-300 focus-within:border-cyan-500/80 focus-within:ring-4 focus-within:ring-cyan-500/20">
          {/* Left search icon or detected platform badge */}
          <div className="pl-3 pr-2 flex items-center">
            {detectedPlatform ? (
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800/80 flex items-center gap-1 animate-in fade-in">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                {detectedPlatform}
              </span>
            ) : (
              <Search className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            )}
          </div>

          {/* Input field */}
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Paste video link from YouTube, TikTok, Instagram, X, Facebook, Reddit..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base px-2 py-2 focus:outline-none"
            disabled={isLoading}
          />

          {/* Action buttons inside input */}
          <div className="flex items-center gap-1.5 pr-1">
            {url && (
              <button
                type="button"
                onClick={() => {
                  setUrl('');
                  setDetectedPlatform(null);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handlePaste}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-medium text-slate-300 border border-slate-700 transition-all hover:text-white"
              title="Paste from clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Pasted</span>
                </>
              ) : (
                <>
                  <Clipboard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Paste</span>
                </>
              )}
            </button>

            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:via-sky-400 hover:to-indigo-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span className="hidden sm:inline">Inspecting...</span>
                </>
              ) : (
                <>
                  <span>Download</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Quick Test Links */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-slate-400 font-medium mr-1">Quick Test Demo Links:</span>
        {sampleLinks.map((s) => (
          <button
            key={s.name}
            onClick={() => {
              setUrl(s.url);
              detectPlatform(s.url);
              onSearch(s.url);
            }}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 transition-all"
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
};
