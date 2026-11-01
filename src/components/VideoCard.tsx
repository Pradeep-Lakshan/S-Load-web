import React, { useState } from 'react';
import { 
  Play, 
  Download, 
  FileVideo, 
  Music, 
  Clock, 
  Eye, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  X,
  Volume2
} from 'lucide-react';
import { VideoInfo, FormatItem } from '../types';

interface VideoCardProps {
  info: VideoInfo;
  onDownload: (info: VideoInfo, format: FormatItem) => void;
  onOpenAiModal: (info: VideoInfo) => void;
  downloadingFormatId: string | null;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  info,
  onDownload,
  onOpenAiModal,
  downloadingFormatId,
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'audio'>('video');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const videoFormats = info.formats.filter((f) => f.type === 'video');
  const audioFormats = info.formats.filter((f) => f.type === 'audio');
  const currentFormats = activeTab === 'video' ? videoFormats : audioFormats;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top Header Grid: Thumbnail + Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-slate-800/80">
        {/* Thumbnail with hover preview trigger */}
        <div className="md:col-span-5 relative group rounded-2xl overflow-hidden bg-slate-950 aspect-video border border-slate-800 shadow-lg">
          <img
            src={info.thumbnail}
            alt={info.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/90 border border-slate-800/80 text-[11px] font-mono font-medium text-slate-200 flex items-center gap-1 shadow">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{info.formattedDuration}</span>
          </div>

          {/* Platform Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-semibold text-cyan-300 shadow">
            {info.platform}
          </div>

          {/* Play Preview Overlay */}
          <button
            onClick={() => setIsPlayingPreview(true)}
            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-cyan-500/30 hover:scale-110"
            title="Preview Video Player"
          >
            <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
          </button>
        </div>

        {/* Video metadata */}
        <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug line-clamp-2">
              {info.title}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-300 font-medium">{info.uploader}</span>
              </div>

              {info.viewCount && (
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>{Number(info.viewCount).toLocaleString()} views</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setIsPlayingPreview(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-cyan-400" />
              <span>Watch Preview</span>
            </button>

            <button
              onClick={() => onOpenAiModal(info)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600/30 to-cyan-600/30 hover:from-violet-600/40 hover:to-cyan-600/40 border border-violet-500/40 text-xs font-semibold text-cyan-300 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>AI Smart Analysis & Chapters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Format Selector Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'video'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileVideo className="w-4 h-4" />
              <span>Video (MP4)</span>
            </button>

            <button
              onClick={() => setActiveTab('audio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'audio'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>Audio Only (MP3)</span>
            </button>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Direct streaming • Zero storage
          </span>
        </div>

        {/* Format Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentFormats.map((format) => {
            const isDownloading = downloadingFormatId === format.formatId;

            return (
              <div
                key={format.formatId}
                className={`relative flex flex-col justify-between p-4 rounded-2xl border transition-all ${
                  format.recommended
                    ? 'bg-slate-800/90 border-cyan-500/50 shadow-lg shadow-cyan-500/5'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {format.recommended && (
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                    Recommended
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-white">{format.quality}</span>
                    <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {format.ext}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                    <span>{format.resolution}</span>
                    <span className="font-mono text-slate-300">{format.approxSize}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => onDownload(info, format)}
                    disabled={isDownloading}
                    className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                      isDownloading
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-wait'
                        : format.recommended
                        ? 'bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-slate-950 shadow-cyan-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Streaming...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>Download {format.ext.toUpperCase()}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Player Preview Modal */}
      {isPlayingPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white line-clamp-1">{info.title}</h3>
              </div>
              <button
                onClick={() => setIsPlayingPreview(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-black flex items-center justify-center">
              <video
                src={info.directStreamUrl || '/sample-video.mp4'}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
              <span>Preview Mode • Original Media Stream</span>
              <button
                onClick={() => {
                  setIsPlayingPreview(false);
                  onDownload(info, info.formats[0]);
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors"
              >
                Download Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
