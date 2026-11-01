import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  Zap, 
  X, 
  Loader2, 
  ShieldCheck, 
  Tag, 
  BookOpen, 
  Scale, 
  Flame, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { VideoInfo, AiQuickAnalysis, AiDeepInspection } from '../types';

interface AiAnalysisModalProps {
  info: VideoInfo | null;
  onClose: () => void;
}

export const AiAnalysisModal: React.FC<AiAnalysisModalProps> = ({ info, onClose }) => {
  const [activeMode, setActiveMode] = useState<'quick' | 'deep'>('quick');
  const [quickData, setQuickData] = useState<AiQuickAnalysis | null>(null);
  const [deepData, setDeepData] = useState<AiDeepInspection | null>(null);
  const [isLoadingQuick, setIsLoadingQuick] = useState(false);
  const [isLoadingDeep, setIsLoadingDeep] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (info) {
      fetchQuickAnalysis();
    }
  }, [info]);

  const fetchQuickAnalysis = async () => {
    if (!info) return;
    setIsLoadingQuick(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/quick-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: info.title,
          platform: info.platform,
          uploader: info.uploader,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Quick analysis failed');
      }
      setQuickData(json.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to complete quick analysis.');
    } finally {
      setIsLoadingQuick(false);
    }
  };

  const fetchDeepInspection = async () => {
    if (!info) return;
    setIsLoadingDeep(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/deep-inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: info.title,
          platform: info.platform,
          uploader: info.uploader,
          duration: info.duration,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Deep inspection failed');
      }
      setDeepData(json.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Deep thinking failed. Please verify API key setup.');
    } finally {
      setIsLoadingDeep(false);
    }
  };

  if (!info) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-md">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>AI Video Insights</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/80">
                  Multimodal
                </span>
              </h3>
              <p className="text-xs text-slate-400 line-clamp-1">{info.title}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/20 px-5 pt-3 gap-3">
          <button
            onClick={() => setActiveMode('quick')}
            className={`flex items-center gap-2 pb-3 text-xs font-bold transition-all border-b-2 ${
              activeMode === 'quick'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Low-Latency Overview</span>
            <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-800/40">
              gemini-3.1-flash-lite
            </span>
          </button>

          <button
            onClick={() => {
              setActiveMode('deep');
              if (!deepData && !isLoadingDeep) fetchDeepInspection();
            }}
            className={`flex items-center gap-2 pb-3 text-xs font-bold transition-all border-b-2 ${
              activeMode === 'deep'
                ? 'border-indigo-400 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
            <span>Deep Thinking & Fair Use</span>
            <span className="text-[10px] font-mono text-indigo-400/80 bg-indigo-950/60 px-1.5 py-0.2 rounded border border-indigo-800/40">
              gemini-4-argon
            </span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Analysis Notice</p>
                <p className="mt-0.5 text-rose-200/80">{error}</p>
              </div>
            </div>
          )}

          {/* Quick Mode */}
          {activeMode === 'quick' && (
            <div>
              {isLoadingQuick ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
                  <p className="text-sm font-semibold text-slate-300">Generating low-latency summary...</p>
                  <p className="text-xs text-slate-400">Powered by gemini-3.1-flash-lite</p>
                </div>
              ) : quickData ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Summary */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                    <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300 mb-2">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Executive Summary</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{quickData.summary}</p>
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
                      <span className="text-[11px] text-slate-400 block">Category</span>
                      <span className="text-xs font-bold text-slate-200 mt-1 block">
                        {quickData.category}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
                      <span className="text-[11px] text-slate-400 block">Tone / Sentiment</span>
                      <span className="text-xs font-bold text-emerald-400 mt-1 block">
                        {quickData.sentiment}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 col-span-2 sm:col-span-1">
                      <span className="text-[11px] text-slate-400 block">Safety Rating</span>
                      <span className="text-xs font-bold text-cyan-300 mt-1 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        {quickData.safeForWork ? 'Family Friendly' : 'General Audience'}
                      </span>
                    </div>
                  </div>

                  {/* Viral Tags */}
                  {quickData.tags && quickData.tags.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-2.5">
                        <Tag className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Recommended Hashtags</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {quickData.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 text-[11px] font-medium text-cyan-300 border border-slate-700 hover:border-cyan-500/40 cursor-default"
                          >
                            {tag.startsWith('#') ? tag : `#${tag}`}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <button
                    onClick={fetchQuickAnalysis}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                  >
                    Run Quick Analysis
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Deep Mode */}
          {activeMode === 'deep' && (
            <div>
              {isLoadingDeep ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
                  <p className="text-sm font-semibold text-slate-300">Deep Reasoning in Progress...</p>
                  <p className="text-xs text-slate-400">
                    Executing gemini-4-argon with high thinking mode
                  </p>
                </div>
              ) : deepData ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  {/* Copyright & Fair Use Assessment */}
                  <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40">
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 mb-2">
                      <Scale className="w-4 h-4 text-indigo-400" />
                      <span>Fair Use & Archival Legal Assessment</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {deepData.fairUseAdvice}
                    </p>
                  </div>

                  {/* Chapters Breakdown */}
                  {deepData.chapterBreakdown && deepData.chapterBreakdown.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-3">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        <span>Content Outline & Chapter Timestamps</span>
                      </div>
                      <div className="space-y-2">
                        {deepData.chapterBreakdown.map((ch, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs"
                          >
                            <span className="font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-slate-950 border border-cyan-900/60">
                              {ch.timestamp}
                            </span>
                            <span className="text-slate-300 font-medium">{ch.topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Engagement & Format recommendation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-1.5">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Viral Hook Score</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">
                          {deepData.engagementScore}
                        </span>
                        <span className="text-xs text-slate-400">/ 100</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Recommended Format</span>
                      </div>
                      <span className="text-xs font-bold text-white block mt-1">
                        {deepData.recommendedFormat}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <button
                    onClick={fetchDeepInspection}
                    className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-bold text-xs hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20"
                  >
                    Start Deep Thinking Inspection
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
