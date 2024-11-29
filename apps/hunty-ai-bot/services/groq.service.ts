import Groq from "groq-sdk";

export interface GroqMessageParam {
    role: 'system' | 'assistant' | 'user';
    content: string;
}

export class GroqService {
    private groq: Groq;

    constructor() {
        const apiKey = Bun.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error('GROQ_API_KEY is not set in environment variables');
        }
        this.groq = new Groq({ apiKey });
    }

    async completion(config: {
        messages: GroqMessageParam[],
        model?: string,
        jsonMode?: boolean,
        maxTokens?: number
    }) {
        const { messages, model = "llama-3.1-70b-versatile", jsonMode, maxTokens } = config;
        try {
            const chatCompletion = await this.groq.chat.completions.create({
                messages: messages as GroqMessageParam[],
                model,
                max_tokens: maxTokens,
                response_format: { type: jsonMode ? 'json_object' : 'text' },
            });


            return chatCompletion;
        } catch (error) {
            console.error("Error in Groq completion:", error);
            throw error;
        }
    }

}
