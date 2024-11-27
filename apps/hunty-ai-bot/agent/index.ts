import { answerPrompt } from "./prompts/answer";
import { summarizeConversationPrompt } from "./prompts/summarize-conversation";
import { GroqService, type GroqMessageParam } from "../services/groq.service";
import { approveProfile, rejectProfile, messageProfile } from "./tools/profile.tools";
import { planPrompt } from "./prompts/plan";

export class AIAgent {

    private groqService: GroqService;
    constructor() {
        this.groqService = new GroqService();
    }

    async ask(
        question: string,
        channelId: string,
        conversationHistory: GroqMessageParam[]
    ) {
        try {
            // Step 1: Analyze conversation context
            const conversationSummary = await this.analyzeContext(conversationHistory) || "No conversation previous history";

            // Step 2: Plan actions
            const actions = await this.plan(question, conversationSummary);

            // Step 3: Execute actions
            const results = await this.execute(actions);

            // Step 4: Generate final response
            const response = await this.answer(question, conversationSummary, results);

            return response.choices[0].message.content;
        } catch (error) {
            console.error('Error processing message:', error);
            return "Sorry, something went wrong. Please try again later.";
        }
    }

    private async plan(question: string, conversationSummary: string) {
        const response = await this.groqService.completion({
            messages: [
                {
                    role: "system",
                    content: planPrompt(conversationSummary)
                },
                {
                    role: "user",
                    content: question
                }
            ],
            jsonMode: true
        });

        return JSON.parse(response.choices[0].message.content as string);
    }

    private async execute(actions: { action: string; params: any }) {
        if (actions.action === 'none') {
            return { type: 'none' };
        }

        const actionMap = {
            'approve_profile': approveProfile,
            'reject_profile': rejectProfile,
            'message_profile': messageProfile
        };

        const actionFn = actionMap[actions.action as keyof typeof actionMap];
        if (!actionFn) {
            throw new Error(`Unknown action: ${actions.action}`);
        }

        const result = await actionFn(actions.params);
        return { type: actions.action, result };
    }

    private async analyzeContext(messages: GroqMessageParam[]) {
        const response = await this.groqService.completion({
            messages: [
                {
                    role: "system",
                    content: summarizeConversationPrompt(messages),
                },
                ...messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            ],
        });

        return response.choices[0].message.content;
    }

    private async answer(
        question: string,
        conversationSummary: string,
        executionResults: { type: string; result?: any }
    ) {
        const context = `
        <action_results>
        ${executionResults.type === 'none'
                ? 'No actions were taken'
                : `Action "${executionResults.type}" was performed with result: ${executionResults.result}`
            }
        </action_results>

        <conversation_context>
        ${conversationSummary}
        </conversation_context>
        `;

        return await this.groqService.completion({
            messages: [
                {
                    role: "system",
                    content: answerPrompt(context)
                },
                {
                    role: "user",
                    content: question
                }
            ],
            model: "llama-3.1-70b-versatile"
        });
    }

}