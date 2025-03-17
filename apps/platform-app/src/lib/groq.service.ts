import Groq from 'groq-sdk'

// Define LLM request parameters
interface LLMRequestParams {
  model?: string
  temperature?: number
  maxTokens?: number
  json?: boolean
}

// Define LLM message type
type LLMMessage = {
  role: string
  content: string
}

// Configuration for Groq
const config = {
  groq: {
    apiKey: process.env.GROQ_API_KEY || '',
    model: 'llama-3.3-70b-versatile',
    temperature: 0.5,
    maxTokens: 1000,
  },
}

// Convert LLM messages to Groq format
function convertToGroqMessages(messages: LLMMessage[]): any[] {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }))
}

class GroqService {
  private client: Groq

  constructor() {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('Groq API key is not set in environment variables')
    }

    this.client = new Groq({
      apiKey: config.groq.apiKey,
    })
  }

  async generateResponse(
    messages: LLMMessage[],
    params?: LLMRequestParams,
  ): Promise<string> {
    try {
      const groqMessages = convertToGroqMessages(messages)

      const response = await this.client.chat.completions.create({
        model: params?.model || config.groq.model,
        messages: groqMessages,
        temperature: params?.temperature || config.groq.temperature,
        max_tokens: params?.maxTokens || config.groq.maxTokens,
        response_format: params?.json ? { type: 'json_object' } : undefined,
      })

      return (
        response.choices[0]?.message?.content ||
        'Sorry, I could not generate a response.'
      )
    } catch (error) {
      console.error('Groq API Error:', error)
      throw new Error('Failed to generate response from Groq')
    }
  }

  async analyzeImage(imageUrl: string, prompt: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'llama-3.2-90b-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 2000,
      })

      return (
        response.choices[0]?.message?.content ||
        'Sorry, I could not analyze the image.'
      )
    } catch (error) {
      console.error('Groq Vision Error:', error)
      throw new Error('Failed to analyze image')
    }
  }

  // Groq doesn't support image generation, so we implement this as optional
  // The method is defined but throws an error if called
  async generateImage(prompt: string): Promise<string> {
    throw new Error('Image generation is not supported by Groq API')
  }
}

export default new GroqService()
