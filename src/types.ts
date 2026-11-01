export interface FormatItem {
  formatId: string;
  type: 'video' | 'audio';
  quality: string;
  ext: string;
  resolution: string;
  approxSize: string;
  recommended?: boolean;
  hasAudio?: boolean;
}

export interface VideoInfo {
  url: string;
  title: string;
  uploader: string;
  thumbnail: string;
  duration: number;
  formattedDuration: string;
  viewCount: number | null;
  platform: string;
  formats: FormatItem[];
  directStreamUrl?: string;
}

export interface DownloadHistoryItem {
  id: string;
  url: string;
  title: string;
  uploader: string;
  thumbnail: string;
  format: string;
  downloadedAt: string;
  platform: string;
}

export interface AiQuickAnalysis {
  summary: string;
  category: string;
  tags: string[];
  sentiment: string;
  safeForWork: boolean;
}

export interface AiDeepInspection {
  chapterBreakdown: { timestamp: string; topic: string }[];
  keyHooks: string[];
  fairUseAdvice: string;
  engagementScore: number;
  targetAudience: string;
  recommendedFormat: string;
}

export type ActivePage =
  | 'home'
  | 'faq'
  | 'terms'
  | 'privacy'
  | 'dmca'
  | 'youtube'
  | 'tiktok'
  | 'instagram'
  | 'twitter'
  | 'facebook'
  | 'reddit'
  | 'vimeo';
