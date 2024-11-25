import { AIMessage, BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { StateGraph } from "@langchain/langgraph";
import { Annotation, MemorySaver } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { profileTools } from "./tools/profile.tools";
import { ChatGroq } from '@langchain/groq'
import { huntyAssistantConversationPrompt } from "./prompts/assistant-conversation";
import { huntySummarizeConversationPrompt } from "./prompts/summarize-conversation";
import { ChatOpenAI } from "@langchain/openai";

export class AIAgent {
    private app;
    private workflow;
    private checkpointer: MemorySaver;

    constructor() {
        // Define state management
        const StateAnnotation = Annotation.Root({
            messages: Annotation<BaseMessage[]>({
                reducer: (x, y) => x.concat(y),
            })
        });

        const toolNode = new ToolNode(profileTools);


        // const model = new ChatOpenAI({
        //     model: 'gpt-4o-mini',
        //     temperature: 0,
        // }).bindTools(profileTools, {
        //     tool_choice: 'auto',
        // });

        const model = new ChatGroq({
            model: 'llama3-groq-70b-8192-tool-use-preview',
            temperature: 0,
        }).bindTools(profileTools, {
            tool_choice: 'auto',
        });

        // Define control flow
        function shouldContinue(state: typeof StateAnnotation.State) {
            const messages = state.messages;
            const lastMessage = messages[messages.length - 1] as AIMessage;

            // If the LLM makes a tool call, then we route to the "tools" node
            if (lastMessage.tool_calls?.length) {
                return "tools";
            }
            // Otherwise, we stop (reply to the user)
            return "__end__";
        }

        const callModel = async (state: typeof StateAnnotation.State) => {
            const messages = state.messages;
            const response = await model.invoke(messages);
            console.log('response', response.content);
            return { messages: [response] };
        };
        //
        // Initialize workflow
        this.workflow = new StateGraph(StateAnnotation)
            .addNode("agent", callModel)
            .addNode("tools", toolNode)
            .addEdge("__start__", "agent")
            .addConditionalEdges("agent", shouldContinue)
            .addEdge("tools", "agent");

        // Initialize checkpointer
        this.checkpointer = new MemorySaver();

        // Compile workflow
        this.app = this.workflow.compile({
            checkpointer: this.checkpointer
        });
    }

    async summarizeConversation(messages: BaseMessage[]) {
        const model = new ChatGroq({
            model: 'llama3-70b-8192',
            temperature: 0,
        })
        const prompt = new SystemMessage(huntySummarizeConversationPrompt(messages));
        const response = await model.invoke([prompt, ...messages]);
        return response;
    }

    async processMessage(message: string, threadId: string, conversationHistory: BaseMessage[]) {
        try {
            const summary = await this.summarizeConversation(conversationHistory);
            const systemPrompt = new SystemMessage(huntyAssistantConversationPrompt(summary.content as string));
            const finalState = await this.app.invoke(
                {
                    messages: [
                        systemPrompt,
                        new HumanMessage(message)
                    ]
                },
                { configurable: { thread_id: threadId } }
            );

            console.log('finalState', finalState);

            return finalState.messages[finalState.messages.length - 1].content;
        } catch (error) {
            console.error('AI Processing Error:', error);
            throw new Error('Failed to process message');
        }
    }
}