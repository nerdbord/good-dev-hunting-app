FROM oven/bun:1.0

WORKDIR /app/apps/hunty-ai-bot

# Copy package files and config
COPY package.json .
COPY bun.lockb .
COPY tsconfig.json .
COPY .eslintrc.json .
COPY index.ts .

# Copy all source files maintaining directory structure
COPY . .

# Install dependencies
RUN bun install

# Set environment variables (these should be overridden at runtime)
ENV DISCORD_BOT_TOKEN=""
ENV GROQ_API_KEY=""
ENV DISCORD_BOT_ID=""
ENV GDH_API_KEY=""
ENV GDH_API_URL=""
ENV DROPBOX_ACCESS_TOKEN=""

# Start the bot
CMD ["bun", "run", "start"]
