#!/usr/bin/env bash
set -euo pipefail

# OmniStream Scheduled Maintenance Script
# Updates yt-dlp to the latest upstream release and reloads uvicorn worker processes.
# Recommended cron setup on VPS:
# 0 4 * * * /path/to/omnistream/cron/update_ytdlp.sh >> /var/log/omnistream_update.log 2>&1

echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Starting daily yt-dlp update check..."

if command -v docker >/dev/null 2>&1 && docker ps | grep -q omnistream-backend; then
    echo "Updating yt-dlp inside Docker container..."
    docker exec omnistream-backend pip install --upgrade --no-cache-dir yt-dlp
    echo "Reloading FastAPI backend worker processes gracefully..."
    docker exec omnistream-backend pkill -HUP -f uvicorn || true
else
    echo "Updating system yt-dlp..."
    pip install --upgrade --no-cache-dir yt-dlp || true
    if command -v systemctl >/dev/null 2>&1; then
        systemctl reload-or-restart omnistream-backend.service || true
    fi
fi

echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Update successfully applied. Current version:"
(command -v yt-dlp && yt-dlp --version) || echo "yt-dlp updated."
