import {
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  Message,
  REST,
  Routes,
  SlashCommandBuilder,
  type Interaction,
} from 'discord.js'
import { AIAgent } from '../../agent'
import type { GroqMessageParam } from '../../services/groq.service'
import { VoiceRecorder } from './services/voice-recorder'

export class DiscordBot {
  private client: Client
  private voiceRecorder: VoiceRecorder

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
    })
    //
    this.voiceRecorder = new VoiceRecorder()
    this.setupEventHandlers()
  }

  private handleReady = async () => {
    console.log(`Logged in as ${this.client.user?.tag}!`)
    // Register commands only after bot is ready
    await this.registerCommands()
  }

  private async registerCommands() {
    if (!this.client.user || !Bun.env.DISCORD_BOT_TOKEN) {
      console.error('Client not ready or token not set')
      return
    }

    const commands = [
      new SlashCommandBuilder()
        .setName('record')
        .setDescription('Start recording voice channel')
        .toJSON(),
      new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop recording voice channel')
        .toJSON(),
    ]

    const rest = new REST().setToken(Bun.env.DISCORD_BOT_TOKEN)

    try {
      console.log('Started refreshing application (/) commands.')

      // For testing in a specific guild (faster updates)
      if (Bun.env.DISCORD_GUILD_ID) {
        // First, delete all existing guild commands
        await rest.put(
          Routes.applicationGuildCommands(
            this.client.user.id,
            Bun.env.DISCORD_GUILD_ID,
          ),
          { body: [] },
        )
        console.log('Successfully deleted all guild commands.')

        // Then register new commands
        await rest.put(
          Routes.applicationGuildCommands(
            this.client.user.id,
            Bun.env.DISCORD_GUILD_ID,
          ),
          { body: commands },
        )
        console.log('Successfully registered guild commands.')
      } else {
        // For global commands
        await rest.put(Routes.applicationCommands(this.client.user.id), {
          body: commands,
        })
        console.log('Successfully registered global commands.')
      }
    } catch (error) {
      console.error('Error registering commands:', error)
      if (error instanceof Error) {
        console.error('Error details:', error.message)
      }
    }
  }

  private setupEventHandlers() {
    this.client.on('ready', this.handleReady.bind(this))
    this.client.on('messageCreate', this.handleMessage.bind(this))
    this.client.on('interactionCreate', this.handleInteraction.bind(this))
  }

  private async handleInteraction(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return

    try {
      switch (interaction.commandName) {
        case 'record':
          await this.handleRecordCommand(interaction)
          break
        case 'stop':
          await this.handleStopCommand(interaction)
          break
      }
    } catch (error) {
      console.error('Error handling command:', error)
      if (interaction.replied || interaction.deferred) {
        await interaction.editReply({
          content: 'An error occurred while processing the command',
        })
      } else {
        await interaction.reply({
          content: 'An error occurred while processing the command',
          ephemeral: true,
        })
      }
    }
  }

  private async handleRecordCommand(interaction: ChatInputCommandInteraction) {
    const member = await interaction.guild?.members.fetch(interaction.user.id)
    const voiceChannel = member?.voice.channel

    if (!voiceChannel) {
      await interaction.reply({
        content: 'You need to be in a voice channel first!',
        ephemeral: true,
      })
      return
    }

    await interaction.deferReply()
    await this.voiceRecorder.startRecording(voiceChannel)
    await interaction.editReply(
      'Started recording! Use `/stop` to end recording.',
    )
  }

  private async handleStopCommand(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    const recordingPath = await this.voiceRecorder.stopRecording()

    if (recordingPath) {
      await interaction.editReply({
        content: 'Recording stopped and saved!',
        files: [recordingPath],
      })
    } else {
      await interaction.editReply('No active recording found.')
    }
  }

  private async buildConversationHistory(
    currentMessage: Message,
  ): Promise<GroqMessageParam[]> {
    // Fetch previous messages
    const previousMessages = await this.fetchChannelHistory(currentMessage)

    // Convert previous messages to LangChain format
    const conversationHistory = previousMessages.map((msg) =>
      this.convertMessageToGroqParam(msg),
    )

    // Add current message
    const currentMessageContent = this.formatMessageContent(currentMessage)
    conversationHistory.push({
      role: 'user',
      content: currentMessageContent,
    })

    return conversationHistory
  }

  private async fetchChannelHistory(message: Message): Promise<Message[]> {
    const messages = await message.channel.messages.fetch({
      limit: 15,
      before: message.id,
    })

    return Array.from(messages.values()).reverse()
  }

  private convertMessageToGroqParam(message: Message): GroqMessageParam {
    const formattedContent = this.formatMessageContent(message)

    if (Bun.env.DISCORD_BOT_ID === message.author.id) {
      return {
        role: 'assistant',
        content: formattedContent,
      }
    }

    return {
      role: 'user',
      content: formattedContent,
    }
  }

  private formatMessageContent(message: Message): string {
    const content = message.content.replace('<@1193903827309559808>', '').trim()
    return `Author (ID: ${message.author.id}): ${message.author.username}\nMessage: ${content}`
  }

  private async handleMessage(message: Message) {
    console.log('=== New Message ===')
    console.log('Author:', message.author.username)
    console.log('Is bot:', message.author.bot)
    console.log('Content:', message.content)
    console.log('Channel:', message.channelId)

    // Ignore messages from bots (including itself)
    if (message.author.bot) {
      console.log('Ignoring bot message')
      return
    }

    // Only respond to messages that start with a mention of the bot
    if (!message.content.startsWith(`<@${Bun.env.DISCORD_BOT_ID}>`)) {
      console.log('Message does not start with bot mention')
      return
    }

    // Remove the bot mention from the message
    const question = message.content
      .replace(`<@${Bun.env.DISCORD_BOT_ID}>`, '')
      .trim()

    // If there's no actual question after the mention, ignore it
    if (!question) {
      console.log('No question content after mention')
      return
    }

    console.log('Processing question:', question)

    try {
      const aiAgent = new AIAgent()
      const conversationHistory = await this.buildConversationHistory(message)
      const response = await aiAgent.ask(
        question,
        message.channelId,
        conversationHistory,
      )

      if (!response) {
        throw new Error('I could not process your request.')
      }

      await message.reply({ content: response, failIfNotExists: true })
    } catch (error) {
      console.error('Error processing message:', error)
      await message.reply('Sorry, I had trouble processing that request.')
    }
  }

  async start(token: string) {
    await this.client.login(token)
  }
}
