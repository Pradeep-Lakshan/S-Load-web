import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  History, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  FileVideo, 
  Music, 
  ExternalLink,
  ChevronRight,
  Layers,
  ArrowDown
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { UrlInput } from './components/UrlInput';
import { VideoCard } from './components/VideoCard';
import { TurnstileBadge } from './components/TurnstileBadge';
import { AiAnalysisModal } from './components/AiAnalysisModal';
import { CodeModal } from './components/CodeModal';

import { PlatformLanding } from './pages/PlatformLanding';
import { FaqPage } from './pages/FaqPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DmcaPage } from './pages/DmcaPage';

import { ActivePage, VideoInfo, FormatItem, DownloadHistoryItem } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>('verified-initial');
  const [isTurnstileVerified, setIsTurnstileVerified] = useState(true);

  const [downloadingFormatId, setDownloadingFormatId] = useState<string | null>(null);
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistoryItem[]>([]);
  const [aiModalInfo, setAiModalInfo] = useState<VideoInfo | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Load download history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('omnistream_history');
      if (stored) {
        setDownloadHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('History read failed:', e);
    }
  }, []);

  const saveHistory = (item: DownloadHistoryItem) => {
    try {
      const updated = [item, ...downloadHistory.filter((h) => h.url !== item.url)].slice(0, 10);
      setDownloadHistory(updated);
      localStorage.setItem('omnistream_history', JSON.stringify(updated));
    } catch (e) {
      console.warn('History save failed:', e);
    }
  };

  const clearHistory = () => {
    setDownloadHistory([]);
    localStorage.removeItem('omnistream_history');
  };

  // Inspect URL -> POST /api/info
  const handleInspectUrl = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setVideoInfo(null);

    try {
      const response = await fetch('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          turnstileToken,
        }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Failed to inspect media URL.');
      }

      setVideoInfo(json.data);
    } catch (err: any) {
      console.error('Info query error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred while fetching video info.');
    } finally {
      setIsLoading(false);
    }
  };

  // Stream File Back -> POST /api/download
  const handleDownload = async (info: VideoInfo, format: FormatItem) => {
    setDownloadingFormatId(format.formatId);
    setErrorMessage(null);

    try {
      // Trigger browser download by requesting the stream endpoint
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: info.url,
          formatId: format.formatId,
          title: info.title,
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error || `Download failed with HTTP ${response.status}`);
      }

      // Convert stream directly to blob & trigger browser download
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      const cleanTitle = (info.title || 'video').replace(/[^\w\s\-_]/gi, '').trim().replace(/\s+/g, '_');
      link.download = `${cleanTitle.slice(0, 50)}_${format.quality.replace(/\s+/g, '_')}.${format.ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      // Add to history
      saveHistory({
        id: Date.now().toString(),
        url: info.url,
        title: info.title,
        uploader: info.uploader,
        thumbnail: info.thumbnail,
        format: `${format.quality} (${format.ext.toUpperCase()})`,
        downloadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        platform: info.platform,
      });
    } catch (err: any) {
      console.error('Download stream error:', err);
      setErrorMessage(err.message || 'Failed to stream video. The link may have expired or is blocked.');
    } finally {
      setDownloadingFormatId(null);
    }
  };

  // Render Page Content
  const renderContent = () => {
    if (activePage === 'faq') {
      return <FaqPage />;
    }
    if (activePage === 'terms') {
      return <TermsPage />;
    }
    if (activePage === 'privacy') {
      return <PrivacyPage />;
    }
    if (activePage === 'dmca') {
      return <DmcaPage />;
    }
    if (
      activePage === 'youtube' ||
      activePage === 'tiktok' ||
      activePage === 'instagram' ||
      activePage === 'twitter' ||
      activePage === 'facebook' ||
      activePage === 'reddit' ||
      activePage === 'vimeo'
    ) {
      return (
        <div>
          <PlatformLanding
            platform={activePage}
            onSearch={handleInspectUrl}
            isLoading={isLoading}
          />
          {videoInfo && (
            <VideoCard
              info={videoInfo}
              onDownload={handleDownload}
              onOpenAiModal={(inf) => setAiModalInfo(inf)}
              downloadingFormatId={downloadingFormatId}
            />
          )}
        </div>
      );
    }

    // Default: Home Page
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 animate-in fade-in duration-300">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Universal Social Media Media Extractor</span>
            <span className="text-slate-400">•</span>
            <span className="text-cyan-400 font-bold">100% Free & Unlimited</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Download Any Video <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              In High Definition MP4 or MP3
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Paste any link from YouTube, TikTok, Instagram, X/Twitter, Facebook, Reddit, or Vimeo. Stream directly with multi-resolution formats and zero disk retention.
          </p>
        </div>

        {/* Input Bar */}
        <UrlInput onSearch={handleInspectUrl} isLoading={isLoading} />

        {/* Turnstile verification check */}
        <TurnstileBadge
          isVerified={isTurnstileVerified}
          onVerified={(token) => {
            setTurnstileToken(token);
            setIsTurnstileVerified(true);
          }}
        />

        {/* Error notification banner */}
        {errorMessage && (
          <div className="w-full max-w-2xl mx-auto mt-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs sm:text-sm flex items-start gap-3 shadow-xl animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-white">Extraction Notice</p>
              <p className="mt-0.5 text-rose-200/90 leading-relaxed">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-white p-1"
            >
              ✕
            </button>
          </div>
        )}

        {/* Extracted Video Card */}
        {videoInfo && (
          <VideoCard
            info={videoInfo}
            onDownload={handleDownload}
            onOpenAiModal={(inf) => setAiModalInfo(inf)}
            downloadingFormatId={downloadingFormatId}
          />
        )}

        {/* Platform Quick Filter Grid */}
        <div className="mt-16 pt-10 border-t border-slate-900">
          <div className="text-center mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Supported Platforms & Ecosystem
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Select a dedicated platform page for optimized resolution filters and guides
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { id: 'youtube', name: 'YouTube', color: 'hover:border-red-500/50 hover:text-red-400' },
              { id: 'tiktok', name: 'TikTok', color: 'hover:border-cyan-500/50 hover:text-cyan-400' },
              { id: 'instagram', name: 'Instagram', color: 'hover:border-pink-500/50 hover:text-pink-400' },
              { id: 'twitter', name: 'X / Twitter', color: 'hover:border-blue-500/50 hover:text-blue-400' },
              { id: 'facebook', name: 'Facebook', color: 'hover:border-indigo-500/50 hover:text-indigo-400' },
              { id: 'reddit', name: 'Reddit', color: 'hover:border-orange-500/50 hover:text-orange-400' },
              { id: 'vimeo', name: 'Vimeo', color: 'hover:border-emerald-500/50 hover:text-emerald-400' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePage(p.id as ActivePage)}
                className={`p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-300 text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 group ${p.color}`}
              >
                <span>{p.name}</span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300">
                  HD / MP3
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Grid: Architecture & Guarantees */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 shadow-md space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-white">Direct Stream Buffer</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Files are streamed directly back to client memory. No files are written or retained on our disks, ensuring extreme privacy and instantaneous speed.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 shadow-md space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-950 text-indigo-400 border border-indigo-800/60 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-white">Anti-SSRF Security</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Proactive IP validation blocks loopback, link-local, AWS IMDS metadata, and private network ranges to protect against server-side request forgery.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/80 shadow-md space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-violet-950 text-violet-400 border border-violet-800/60 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-white">AI Content Insights</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Includes Gemini 3.1 Flash Lite for low-latency video summaries and Gemini 4 Thinking for deep fair use, chapter breakdowns, and engagement scores.
            </p>
          </div>
        </div>

        {/* Local Download History */}
        {downloadHistory.length > 0 && (
          <div className="mt-14 p-6 rounded-3xl bg-slate-900/70 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Recent Session Downloads</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                  {downloadHistory.length}
                </span>
              </div>

              <button
                onClick={clearHistory}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors"
                title="Clear local history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            </div>

            <div className="divide-y divide-slate-800/60">
              {downloadHistory.map((h) => (
                <div key={h.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={h.thumbnail}
                      alt={h.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0 bg-slate-950"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-200 truncate">{h.title}</p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="text-cyan-300 font-medium">{h.platform}</span>
                        <span>•</span>
                        <span>{h.format}</span>
                        <span>•</span>
                        <span>{h.downloadedAt}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleInspectUrl(h.url)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>Re-inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        openCodeModal={() => setIsCodeModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* AI Analysis Modal */}
      <AiAnalysisModal
        info={aiModalInfo}
        onClose={() => setAiModalInfo(null)}
      />

      {/* Full-Stack Code & Deployment Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
