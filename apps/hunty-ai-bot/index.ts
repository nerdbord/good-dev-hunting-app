import { DiscordBot } from './interface/discord/bot';

if (!Bun.env.DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN is not set');
}

if (!Bun.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set');
}

// Create and start Discord Bot
const discordBot = new DiscordBot();
discordBot.start(Bun.env.DISCORD_BOT_TOKEN);