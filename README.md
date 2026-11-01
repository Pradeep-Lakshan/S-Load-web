# ⚡ OmniStream - Social Media Video Downloader

A high-performance, mobile-first social media video & audio downloader supporting **YouTube**, **TikTok**, **Instagram**, **X (Twitter)**, **Facebook**, **Reddit**, and **Vimeo**.

Includes direct streaming (no permanent disk storage), SSRF protection, rate limiting per IP, AI-powered content analysis (with Gemini 3.1 Flash Lite & Gemini 4 Thinking), Cloudflare Turnstile bot deterrence, and automated daily yt-dlp maintenance.

---

## 🌟 Key Features

1. **One-Click Instant Processing**: Paste any supported link, inspect video info, and select quality format.
2. **True Direct Streaming**: Streams directly back through HTTP `Content-Disposition: attachment` without accumulating files on disk.
3. **Multi-Format Extraction**:
   - MP4 Video: 1080p (Full HD), 720p (HD), 480p (SD)
   - MP3 Audio: 320 kbps (High Fidelity), 128 kbps (Standard)
4. **Hardened Security**:
   - **SSRF Defense**: Blocks private IP ranges (RFC 1918), loopback, link-local, AWS metadata (`169.254.169.254`), and non-HTTP(S) schemes.
   - **Domain Allowlist**: Strict regex validation against verified platform hosts.
   - **DNS Rebinding Guard**: Resolves hostnames to verify resulting IP isn't internal before connection.
   - **Rate Limiting**: Configurable sliding window per client IP.
   - **Filename Sanitization**: Cleans malicious traversal characters, control bytes, and limits filename length.
5. **AI-Powered Insights**:
   - **Low-Latency Summary (`gemini-3.1-flash-lite`)**: Instant video summary, virality hashtags, and category breakdown.
   - **Deep Thinking Inspector (`gemini-4-argon`, ThinkingLevel.HIGH)**: Fair use copyright analysis, chapter timeline breakdown, and engagement mechanics.
6. **Mobile-First UX**: Responsive dark mode design with instant clipboard paste, platform auto-detection, video preview player, batch queue, and download history.
7. **SEO Landing Pages**: Built-in platform routes (`/youtube-downloader`, `/tiktok-downloader`, `/instagram-downloader`, etc.).
8. **Compliance & Legal**: Included FAQ, Terms of Service, Privacy Policy, and DMCA Takedown Notice center.

---

## 🏗️ Architecture & Project Structure

```
├── backend/
│   ├── main.py              # FastAPI backend (yt-dlp, ffmpeg merging, SlowAPI, SSRF)
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Python 3.11-slim + ffmpeg container
├── cron/
│   └── update_ytdlp.sh      # Daily automated update and zero-downtime worker reload
├── src/
│   ├── App.tsx              # Main interactive React application
│   ├── index.css            # Tailwind CSS styling
│   └── main.tsx             # React entry point
├── server.ts                # Integrated full-stack Node.js + Express + Gemini server
├── Dockerfile.frontend      # Multi-stage production frontend Dockerfile
├── docker-compose.yml       # Complete Docker orchestration
├── .env.example             # Environment variable template
└── README.md                # Documentation and deployment manual
```

---

## 🚀 Local Quickstart

### Option 1: Integrated Full-Stack (Node + Express + yt-dlp)
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Option 2: Docker Compose (FastAPI + Next/Node + Auto Updater)

```bash
cp .env.example .env
docker-compose up -d --build
```

Frontend will be available at `http://localhost:3000`, and the FastAPI backend at `http://localhost:8000/docs`.

---

## 🌐 Production VPS Deployment (Ubuntu / Debian)

### 1. Server Prerequisites
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y docker.io docker-compose git nginx certbot python3-certbot-nginx
sudo systemctl enable --now docker
```

### 2. Deploy OmniStream via Docker Compose
```bash
git clone <your-repo-url> /opt/omnistream
cd /opt/omnistream
cp .env.example .env
docker-compose up -d --build
```

### 3. Automated Daily yt-dlp Updates (Cron)
```bash
chmod +x /opt/omnistream/cron/update_ytdlp.sh
(crontab -l 2>/dev/null; echo "0 3 * * * /opt/omnistream/cron/update_ytdlp.sh >> /var/log/omnistream_cron.log 2>&1") | crontab -
```
