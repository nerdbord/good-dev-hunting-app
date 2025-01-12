'use server'
import Groq from 'groq-sdk'
import { prompt as systemPrompt } from './groq/prompt'
import type { SubmissionFormData } from './groq/schema'

const groq = new Groq()

export async function analyzeMessage({
  question,
  userResponse,
  currentState,
}: {
  question: string
  userResponse: string
  currentState: string
}): Promise<Partial<SubmissionFormData>> {
  const userPrompt = `Question: ${question}\nUser Response: ${userResponse}\nCurrent state: ${currentState}`

  const chat_completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    stream: false,
    temperature: 0,
    response_format: { type: 'json_object' },
  })

  return JSON.parse(chat_completion.choices[0].message.content || '{}')
}
