import { OpenAI } from 'openai'

type MessageRole = 'system' | 'user' | 'assistant'

export interface Message {
  role: MessageRole
  content: string
}

/**
 * Service for interacting with OpenAI's API
 */
export class OpenAIService {
  private openai: OpenAI
  private defaultModel: string

  /**
   * Creates a new OpenAI service instance
   * @param apiKey - OpenAI API key
   * @param defaultModel - Default model to use (defaults to gpt-4o)
   */
  constructor(apiKey: string, defaultModel = 'gpt-4o') {
    if (!apiKey) {
      throw new Error('OpenAI API key is required')
    }

    this.openai = new OpenAI({ apiKey })
    this.defaultModel = defaultModel
  }

  /**
   * Generates a response using OpenAI's chat completions API
   * @param messages - Array of chat messages
   * @param options - Optional configuration parameters
   * @returns The generated response content
   */
  async generateResponse(
    messages: Message[],
    options?: {
      model?: string
      temperature?: number
      max_tokens?: number
      response_format?: 'text' | 'json' | { type: 'json_object' }
      top_p?: number
      frequency_penalty?: number
      presence_penalty?: number
      timeout?: number
    },
  ): Promise<string> {
    try {
      // Convert response_format if needed
      let responseFormat: { type: 'json_object' } | undefined
      if (options?.response_format === 'json') {
        responseFormat = { type: 'json_object' }
      } else if (options?.response_format === 'text') {
        responseFormat = undefined
      } else if (
        options?.response_format &&
        typeof options.response_format === 'object'
      ) {
        responseFormat = { type: 'json_object' }
      }

      const requestOptions: {
        model: string
        messages: Message[]
        temperature?: number
        max_tokens?: number
        response_format?: { type: 'json_object' } | undefined
        top_p?: number
        frequency_penalty?: number
        presence_penalty?: number
        signal?: AbortSignal
      } = {
        model: options?.model || this.defaultModel,
        messages,
        temperature: options?.temperature ?? 0,
        max_tokens: options?.max_tokens ?? 2000,
        response_format: responseFormat,
      }

      // Add optional parameters if they are provided
      if (options?.top_p !== undefined) {
        requestOptions.top_p = options.top_p
      }
      if (options?.frequency_penalty !== undefined) {
        requestOptions.frequency_penalty = options.frequency_penalty
      }
      if (options?.presence_penalty !== undefined) {
        requestOptions.presence_penalty = options.presence_penalty
      }

      // Set request timeout if specified
      const abortController = options?.timeout
        ? new AbortController()
        : undefined
      let timeoutId: NodeJS.Timeout | undefined

      if (options?.timeout && abortController) {
        timeoutId = setTimeout(() => {
          abortController.abort()
        }, options.timeout)

        requestOptions.signal = abortController.signal
      }

      try {
        const response = await this.openai.chat.completions.create(
          requestOptions,
        )

        if (timeoutId) {
          clearTimeout(timeoutId)
        }

        return response.choices[0].message?.content || ''
      } catch (error) {
        if (abortController?.signal.aborted) {
          throw new Error(
            `OpenAI request timed out after ${options?.timeout}ms`,
          )
        }
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('OpenAI API error:', error.message)
        throw new Error(
          `Failed to generate response from OpenAI: ${error.message}`,
        )
      }

      console.error('OpenAI API unknown error:', error)
      throw new Error('Failed to generate response from OpenAI: Unknown error')
    }
  }

  /**
   * Convenience method to generate text without JSON formatting
   */
  async generateText(
    messages: Message[],
    options?: Omit<
      Parameters<OpenAIService['generateResponse']>[1],
      'response_format'
    >,
  ): Promise<string> {
    return this.generateResponse(messages, {
      ...options,
      response_format: 'text',
    })
  }

  /**
   * Convenience method to generate JSON responses
   */
  async generateJson<T = any>(
    messages: Message[],
    options?: Omit<
      Parameters<OpenAIService['generateResponse']>[1],
      'response_format'
    >,
  ): Promise<T> {
    const jsonString = await this.generateResponse(messages, {
      ...options,
      response_format: 'json',
    })

    try {
      return JSON.parse(jsonString) as T
    } catch (error) {
      throw new Error('Failed to parse JSON response from OpenAI')
    }
  }
}

// Create service instance (set the appropriate API key in your application environment)
const openaiService = new OpenAIService(process.env.OPENAI_API_KEY || '')
export default openaiService
