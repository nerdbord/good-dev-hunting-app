import type { GroqMessageParam } from "../../services/groq.service";

export const huntySummarizeConversationPrompt = (messages: GroqMessageParam[]) => `

      <objective>
      Your goal is to summarize the conversation and extract key insights grouped by users that participated in the conversation.
      </objective>

      <rules>
      - Use conversation summary to understand the context of the conversation.
      - Stick to the example output format.
      - Remember to include your thoughts in the summary.
      - Your name is Hunty so analyze the conversation from Hunty's perspective.
      </rules>
      
      <context>
      ${messages.map((message) => message.content).join('\n')}
      </context>

      <example-output description="Examples of how Nerdy should respond">
      **Participants:**
      1. **Sumicki (ID: 752134958511947776)**
      2. **Nerdy (ID: 946913182763597896)**
      3. **Hania (ID: 946913182763597896)**
      4. **Ajmag (ID: 946913182763597896)**
      5. **wawrzon (ID: 946913182763597896)**

      **My thoughts (Hunty):**
      - I should be careful with my words next time.
      - Ajmag seems to like me.
      - Sumicki is not a fan of JavaScript.

      **Key Insights:**
      Sumicki:
      - He thinks that Javscript is the best and disagrees with me.
      Hania:
      - She looks like is in a pretty goog humour.
      wawrzon:
      He offended Ajmag but I think he did not mean it. It looks like he is not aware of it.
      Ajmag:
      - He is sharing his knowledge about the new technologies.
      - He was really excited about it.

      </example-output>
      
`