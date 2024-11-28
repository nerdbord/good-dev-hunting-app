#!/bin/bash

# Create necessary directories
mkdir -p logs
mkdir -p data

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cat > .env << EOL
DISCORD_BOT_TOKEN=
GROQ_API_KEY=
DISCORD_BOT_ID=
GDH_API_KEY=
GDH_API_URL=
DROPBOX_ACCESS_TOKEN=
EOL
    echo "Created .env file. Please fill in the required values."
fi

# Set execute permissions for other scripts
chmod +x scripts/*.sh 