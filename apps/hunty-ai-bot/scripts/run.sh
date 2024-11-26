#!/bin/bash

# Load environment variables
set -a
source .env
set +a

# Stop existing container if running
docker stop hunty-ai-bot || true
docker rm hunty-ai-bot || true

# Run the container
docker run -d \
    --name hunty-ai-bot \
    --restart unless-stopped \
    -e DISCORD_BOT_TOKEN="$DISCORD_BOT_TOKEN" \
    -e GROQ_API_KEY="$GROQ_API_KEY" \
    -e DISCORD_BOT_ID="$DISCORD_BOT_ID" \
    -e GDH_API_KEY="$GDH_API_KEY" \
    -e GDH_API_URL="$GDH_API_URL" \
    -v "$(pwd)/logs:/app/logs" \
    hunty-ai-bot

echo "Container started successfully" 