import { AIAgent } from './agent';
import { DiscordBot } from './interface/discord';

if (!Bun.env.DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN is not set');
}

if (!Bun.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set');
}

// Create AI Agent
const aiAgent = new AIAgent();

// Create and start Discord Bot
const discordBot = new DiscordBot(aiAgent);
discordBot.start(Bun.env.DISCORD_BOT_TOKEN);