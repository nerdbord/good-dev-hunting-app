#!/bin/bash

# Load environment variables
set -a
source .env
set +a

# Build the Docker image
docker build -t hunty-ai-bot .

echo "Build completed successfully" 