import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
})

export const analyzeImage = async (imagePath: string, prompt: string) => {
  const chatCompletion = await groq.chat.completions.create({
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
              url: imagePath,
            },
          },
        ],
      },
    ],
    model: 'llama-3.2-90b-vision-preview',
    temperature: 0.5,
    max_tokens: 1024,
    stream: false,
    stop: null,
  })

  const result = chatCompletion.choices[0].message.content

  return result
}
