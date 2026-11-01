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

---

## 🐙 How to Deploy on GitHub

### Step 1: Initialize Git and Push to GitHub

1. Create a new empty repository on [GitHub](https://github.com/new) (e.g. `omnistream`). Do not initialize with README since this project already contains one.
2. Run the following commands in your terminal:

```bash
# Initialize git
git init

# Stage all files
git add .

# Create initial commit
git commit -m "feat: complete social media video downloader"

# Rename branch to main
git branch -M main

# Add your GitHub remote repository (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/omnistream.git

# Push code to GitHub
git push -u origin main
```

---

### Step 2: Configure GitHub Repository Secrets (Optional)

In your GitHub repository, navigate to **Settings > Secrets and variables > Actions**, then click **New repository secret**:

| Secret Name | Value Description |
|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key for AI summaries and deep thinking analysis. |
| `TURNSTILE_SECRET_KEY` | *(Optional)* Cloudflare Turnstile captcha secret key. |
| `VPS_HOST` | *(Optional)* Server public IP address for automated SSH deployment. |
| `VPS_USER` | *(Optional)* Server SSH username (e.g., `root` or `ubuntu`). |
| `VPS_SSH_KEY` | *(Optional)* Server SSH private key for auto-deployment on git push. |

---

### Step 3: Automated CI/CD (GitHub Actions)

A preconfigured GitHub Actions workflow is included at `.github/workflows/deploy.yml`. Whenever you push code to `main`:
1. It automatically runs TypeScript linting and build checks.
2. It builds and validates the Docker images for both backend and frontend.
3. It can automatically execute deployment commands on your server.

---

### Step 4: 1-Click Hosting Platforms from GitHub

Because OmniStream includes standard `Dockerfile`s and `docker-compose.yml`, you can easily deploy it on modern container hosting platforms directly from your GitHub repo:

- **Coolify / Dokku / CapRover**: Point directly to your GitHub repo URL. Coolify will detect `docker-compose.yml` and provision both frontend and FastAPI backend automatically with automated SSL.
- **Railway / Render**: Connect your GitHub repository. Select `Dockerfile.frontend` for the web interface and `backend/Dockerfile` for the Python API.
- **DigitalOcean / Hetzner / AWS VPS**: SSH into your server, run `git clone https://github.com/YOUR_USERNAME/omnistream.git`, and run `docker-compose up -d --build`.

