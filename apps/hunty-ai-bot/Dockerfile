FROM oven/bun:1.0

WORKDIR /app

# Copy package files
COPY package.json .
COPY bun.lockb .
COPY tsconfig.json .

# Copy source code
COPY src/ .

# Install dependencies
RUN bun install

# Set environment variables (these should be overridden at runtime)
ENV DISCORD_BOT_TOKEN=""
ENV GROQ_API_KEY=""
ENV DISCORD_BOT_ID=""
ENV GDH_API_KEY=""
ENV GDH_API_URL=""

# Start the bot
CMD ["bun", "run", "index.ts"]
