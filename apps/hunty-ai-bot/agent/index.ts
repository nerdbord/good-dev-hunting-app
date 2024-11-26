import { huntyAssistantConversationPrompt } from "./prompts/assistant-conversation";
import { huntySummarizeConversationPrompt } from "./prompts/summarize-conversation";
import { GroqService, type GroqMessageParam } from "../services/groq.service";
import { approveProfile, rejectProfile, messageProfile } from "./tools/profile.tools";

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
            return "Przepraszam, wystąpił błąd podczas przetwarzania wiadomości.";
        }
    }

    private async plan(question: string, conversationSummary: string) {
        const response = await this.groqService.completion({
            messages: [
                {
                    role: "system",
                    content: `Based on the user's question and conversation context, determine what actions need to be taken.
                    Available actions:
                    - approve_profile: Approve a user's profile
                    - reject_profile: Reject a user's profile
                    - message_profile: Send a message to a profile
                    - none: Just respond to the user normally

                    Return JSON in format:
                    {
                        "action": "approve_profile" | "reject_profile" | "message_profile" | "none",
                        "params": {} // Additional parameters if needed
                    }
                    
                    <conversation_context>${conversationSummary}</conversation_context>
                    `
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
                    content: huntySummarizeConversationPrompt(messages),
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
                    content: huntyAssistantConversationPrompt(context)
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