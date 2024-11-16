import { Client, GatewayIntentBits, type Interaction, Message } from 'discord.js';
import { AIAgent } from '../agent';
import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";

export class DiscordBot {
    private client: Client;
    private aiAgent: AIAgent;

    constructor(aiAgent: AIAgent) {
        this.aiAgent = aiAgent;
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });

        this.setupEventHandlers();
    }

    private setupEventHandlers() {
        this.client.on('ready', this.handleReady.bind(this));
        this.client.on('messageCreate', this.handleMessage.bind(this));
    }


    private async buildConversationHistory(currentMessage: Message): Promise<BaseMessage[]> {
        // Fetch previous messages
        const previousMessages = await this.fetchChannelHistory(currentMessage);

        // Convert previous messages to LangChain format
        const conversationHistory = previousMessages.map(msg => this.convertToLangChainMessage(msg));

        // Add current message
        const currentMessageContent = this.formatMessageContent(currentMessage);
        conversationHistory.push(new HumanMessage(currentMessageContent));

        return conversationHistory;
    }

    private async fetchChannelHistory(message: Message): Promise<Message[]> {
        const messages = await message.channel.messages.fetch({
            limit: 15,
            before: message.id
        });

        return Array.from(messages.values()).reverse();
    }

    private convertToLangChainMessage(message: Message): BaseMessage {
        const formattedContent = this.formatMessageContent(message);

        if (Bun.env.DISCORD_BOT_ID === message.author.id) {
            return new AIMessage(formattedContent);
        }

        return new HumanMessage(formattedContent);
    }

    private formatMessageContent(message: Message): string {
        const content = message.content.replace('<@1193903827309559808>', '').trim();
        return `Author (ID: ${message.author.id}): ${message.author.username}\nMessage: ${content}`;
    }

    private handleReady() {
        console.log(`Logged in as ${this.client.user?.tag}!`);
    }

    private async handleMessage(message: Message) {
        console.log('=== New Message ===');
        console.log('Author:', message.author.username);
        console.log('Is bot:', message.author.bot);
        console.log('Content:', message.content);
        console.log('Channel:', message.channelId);

        // Ignore messages from bots (including itself)
        if (message.author.bot) {
            console.log('Ignoring bot message');
            return;
        }

        // Only respond to messages that start with a mention of the bot
        if (!message.content.startsWith(`<@${Bun.env.DISCORD_BOT_ID}>`)) {
            console.log('Message does not start with bot mention');
            return;
        }

        // Remove the bot mention from the message
        const question = message.content
            .replace(`<@${Bun.env.DISCORD_BOT_ID}>`, '')
            .trim();

        // If there's no actual question after the mention, ignore it
        if (!question) {
            console.log('No question content after mention');
            return;
        }

        console.log('Processing question:', question);

        try {
            const conversationHistory = await this.buildConversationHistory(message);
            const response = await this.aiAgent.processMessage(
                question,
                message.channelId,
                conversationHistory
            );
            await message.reply({ content: response, failIfNotExists: true });
        } catch (error) {
            console.error('Error processing message:', error);
            await message.reply('Sorry, I had trouble processing that request.');
        }
    }

    async start(token: string) {
        await this.client.login(token);
    }
}