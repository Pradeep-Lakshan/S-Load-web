import React from 'react';
import { UrlInput } from '../components/UrlInput';
import { ActivePage, VideoInfo, FormatItem } from '../types';
import { CheckCircle2, Shield, Zap, Sparkles, ArrowRight } from 'lucide-react';

interface PlatformLandingProps {
  platform: ActivePage;
  onSearch: (url: string) => void;
  isLoading: boolean;
}

interface PlatformMeta {
  title: string;
  tagline: string;
  description: string;
  features: string[];
  placeholderUrl: string;
  badgeColor: string;
}

const PLATFORM_CONFIGS: Record<string, PlatformMeta> = {
  youtube: {
    title: 'YouTube Video & MP3 Downloader',
    tagline: 'Download YouTube videos in 1080p, 720p, 480p and extract studio-quality 320kbps MP3 audio.',
    description: 'Fast, secure, and watermark-free YouTube extraction. No registration or software installation required.',
    features: [
      'Full HD 1080p and 720p video downloads with high frame rate',
      'Ultra high-quality MP3 audio extraction at 320 kbps & 128 kbps',
      'YouTube Shorts and standard video link support',
      'Direct HTTP streaming without server caching',
    ],
    placeholderUrl: 'https://www.youtube.com/watch?v=sample-nature-timelapse',
    badgeColor: 'text-red-400 bg-red-950/60 border-red-800/60',
  },
  tiktok: {
    title: 'TikTok Downloader (No Watermark)',
    tagline: 'Download TikTok videos and sound clips in original HD resolution without any watermark.',
    description: 'Save trending TikTok videos, dance clips, and tutorials directly to your phone or PC with zero loss in quality.',
    features: [
      'Removes the floating TikTok watermark automatically',
      'Supports both mobile vt.tiktok.com and desktop web URLs',
      'Extracts background TikTok sound / audio in MP3 format',
      'Lightning-fast CDN direct pipe extraction',
    ],
    placeholderUrl: 'https://www.tiktok.com/@creator/video/sample-tips',
    badgeColor: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
  },
  instagram: {
    title: 'Instagram Reels & Video Downloader',
    tagline: 'Download Instagram Reels, IGTV, and feed videos in original high-definition MP4 format.',
    description: 'Clean and private Instagram downloader. Save travel clips, cooking reels, and creators’ public videos effortlessly.',
    features: [
      'Full resolution Reels & video post extraction',
      'Audio soundtrack extraction in crystal clear MP3',
      'Works seamlessly on iOS, Android, macOS, and Windows',
      'Zero tracking and 100% anonymous processing',
    ],
    placeholderUrl: 'https://www.instagram.com/reel/sample-amalfi-sunset',
    badgeColor: 'text-pink-400 bg-pink-950/60 border-pink-800/60',
  },
  twitter: {
    title: 'X / Twitter Video Downloader',
    tagline: 'Download videos and GIFs from X (Twitter) tweets in 1080p, 720p, and mobile formats.',
    description: 'Paste any tweet link containing a video or GIF. Choose your preferred quality and download immediately.',
    features: [
      'Supports x.com and twitter.com link formats',
      'Multiple bitrates and resolution options available',
      'Extract speech and commentary to MP3 audio',
      'No browser extensions or popups required',
    ],
    placeholderUrl: 'https://x.com/tech/status/sample-drone-flight',
    badgeColor: 'text-blue-400 bg-blue-950/60 border-blue-800/60',
  },
  facebook: {
    title: 'Facebook Video & Reels Downloader',
    tagline: 'Save Facebook Watch videos, public feed clips, and Reels in crisp 1080p and 720p.',
    description: 'Paste links from fb.watch or facebook.com to download videos directly without compression artifacts.',
    features: [
      'Full HD Facebook video extraction',
      'Supports fb.watch short links and desktop video links',
      'Fast audio ripping to standalone MP3',
      'Strict SSRF verification and secure streams',
    ],
    placeholderUrl: 'https://www.facebook.com/watch/?v=sample-video',
    badgeColor: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60',
  },
  reddit: {
    title: 'Reddit Video Downloader (With Audio)',
    tagline: 'Download Reddit v.redd.it videos with combined audio and video streams in sync.',
    description: 'Reddit stores video and audio in separate streams. OmniStream merges them with ffmpeg so you get complete video with clear sound.',
    features: [
      'Guaranteed audio-video sync merging via ffmpeg',
      'Supports reddit.com post URLs and short redd.it links',
      'Audio-only MP3 rip option for podcasts and discussions',
      'High-speed pipe directly to your browser download manager',
    ],
    placeholderUrl: 'https://www.reddit.com/r/aww/comments/sample-kitten',
    badgeColor: 'text-orange-400 bg-orange-950/60 border-orange-800/60',
  },
  vimeo: {
    title: 'Vimeo Video Downloader',
    tagline: 'Download Vimeo cinematic masterpieces, documentaries, and creative reels in up to 1080p.',
    description: 'Reliable Vimeo media grabber for filmmakers, creators, and students archiving public creative works.',
    features: [
      'Original source bitrate preservation',
      'Multi-quality selection from 360p to 1080p Full HD',
      'Separate high-bitrate audio export',
      'Compliant with creator fair use and educational study',
    ],
    placeholderUrl: 'https://vimeo.com/sample-architectural-film',
    badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
  },
};

export const PlatformLanding: React.FC<PlatformLandingProps> = ({ platform, onSearch, isLoading }) => {
  const meta = PLATFORM_CONFIGS[platform] || PLATFORM_CONFIGS.youtube;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider shadow-sm">
          <span className={`px-2 py-0.5 rounded-full border ${meta.badgeColor}`}>
            Dedicated Platform Tool
          </span>
          <span className="text-slate-400">Ultra Fast</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          {meta.title}
        </h1>

        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          {meta.tagline}
        </p>
      </div>

      {/* Main Input Box */}
      <UrlInput onSearch={onSearch} isLoading={isLoading} prefillUrl={meta.placeholderUrl} />

      {/* Feature Highlights Grid */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
        {meta.features.map((feat, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 shadow-md"
          >
            <div className="w-6 h-6 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-800/60">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">{feat}</p>
            </div>
          </div>
        ))}
      </div>

      {/* How to use guide */}
      <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>How to Download {platform.toUpperCase()} Videos in 3 Steps</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-7 h-7 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center">
              1
            </span>
            <h4 className="font-bold text-sm text-white">Copy Video Link</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Open the social app or website, find your desired video, and copy its link to your clipboard.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-7 h-7 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center">
              2
            </span>
            <h4 className="font-bold text-sm text-white">Paste & Inspect</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Paste the link into the box above and press "Download". Our backend retrieves available media resolutions.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2">
            <span className="w-7 h-7 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm flex items-center justify-center">
              3
            </span>
            <h4 className="font-bold text-sm text-white">Save Instantly</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pick your preferred video resolution (1080p, 720p) or MP3 audio file. The stream begins immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
