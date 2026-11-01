import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, X, FileCode, Server, Shield, RefreshCw } from 'lucide-react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'docker' | 'fastapi' | 'curl' | 'cron' | 'health'>('docker');
  const [copied, setCopied] = useState(false);
  const [healthData, setHealthData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/health')
        .then((res) => res.json())
        .then((data) => setHealthData(data))
        .catch((err) => console.error(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const files: Record<string, string> = {
    docker: `# docker-compose.yml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: omnistream-backend
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - MAX_DURATION_SECONDS=7200
      - MAX_FILESIZE_BYTES=524288000
      - RATE_LIMIT_RULE=15/minute
      - TURNSTILE_SECRET_KEY=\${TURNSTILE_SECRET_KEY:-}
    volumes:
      - /tmp/omnistream_downloads:/tmp/omnistream_downloads

  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    container_name: omnistream-frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    depends_on:
      - backend

  ytdlp-updater:
    image: python:3.11-slim
    container_name: omnistream-ytdlp-updater
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    entrypoint: >
      /bin/sh -c '
        while true; do
          sleep 86400;
          docker exec omnistream-backend pip install --upgrade yt-dlp;
          docker kill -s HUP omnistream-backend;
        done
      '`,

    fastapi: `# backend/main.py
import yt_dlp
from fastapi import FastAPI, HTTPException, Request, BackgroundTasks
from fastapi.responses import StreamingResponse
from slowapi import Limiter
from slowapi.util import get_remote_address

app = FastAPI(title="OmniStream API")
limiter = Limiter(key_func=get_remote_address)

# SSRF Guard
ALLOWED_DOMAINS = ["youtube.com", "tiktok.com", "instagram.com", "x.com", "reddit.com"]

@app.post("/api/info")
@limiter.limit("15/minute")
async def get_info(request: Request, payload: dict):
    url = payload.get("url")
    # Validates URL against SSRF and extract metadata
    ydl_opts = {"skip_download": True}
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        return ydl.extract_info(url, download=False)

@app.post("/api/download")
async def download(request: Request, payload: dict, bg: BackgroundTasks):
    # Streams media directly back to client
    ...`,

    curl: `# 1. Fetch Video Metadata & Formats
curl -X POST "http://localhost:3000/api/info" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://www.youtube.com/watch?v=sample-nature-timelapse"}'

# 2. Direct Stream Download (Save to disk)
curl -X POST "http://localhost:3000/api/download" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://www.youtube.com/watch?v=sample-nature-timelapse", "formatId": "video-1080p", "title": "nature_timelapse"}' \\
  -o "downloaded_video.mp4"

# 3. Quick AI Video Summary (gemini-3.1-flash-lite)
curl -X POST "http://localhost:3000/api/ai/quick-analyze" \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Ocean Wildlife Timelapse", "platform": "YouTube"}'`,

    cron: `#!/usr/bin/env bash
# /opt/omnistream/cron/update_ytdlp.sh
# Scheduled daily yt-dlp maintenance
set -euo pipefail

echo "[$(date -u)] Updating yt-dlp inside backend container..."
docker exec omnistream-backend pip install --upgrade --no-cache-dir yt-dlp
docker exec omnistream-backend pkill -HUP -f uvicorn || true
echo "Update applied successfully."`,
  };

  const handleCopy = () => {
    const textToCopy = activeTab === 'health' ? JSON.stringify(healthData, null, 2) : files[activeTab];
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/80">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Full-Stack Code & Deployment Hub</h3>
              <p className="text-xs text-slate-400">FastAPI, Docker Compose, yt-dlp updater, and REST APIs</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-5 pt-3 gap-2 overflow-x-auto">
          {[
            { id: 'docker', label: 'docker-compose.yml' },
            { id: 'fastapi', label: 'FastAPI Backend' },
            { id: 'curl', label: 'cURL API Commands' },
            { id: 'cron', label: 'Daily Cron Script' },
            { id: 'health', label: 'Live Server Health' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab.id
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Editor / viewer */}
        <div className="p-5 flex-1 overflow-auto bg-slate-950 font-mono text-xs text-slate-300">
          {activeTab === 'health' ? (
            <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  Current Running Daemon Health
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                  {healthData?.status?.toUpperCase() || 'ONLINE'}
                </span>
              </div>
              <pre className="font-mono text-xs bg-slate-900/80 p-4 rounded-xl border border-slate-800 text-cyan-300 overflow-x-auto">
                {JSON.stringify(healthData, null, 2)}
              </pre>
            </div>
          ) : (
            <pre className="overflow-x-auto leading-relaxed selection:bg-cyan-500/30">
              <code>{files[activeTab]}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
