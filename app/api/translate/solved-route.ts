import { object, picklist, safeParse, string } from 'valibot'
import { streamText } from 'ai'
import { google } from '@ai-sdk/google'

const RequestSchema = object({
  prompt: string(),
  from: picklist(['Auto', 'English', 'Español']),
  to: picklist(['English', 'Español', 'Japanese'])
})

export async function POST (req: Request) {
  // Extract the message, from and to from the request
  const { success, output, issues } = safeParse(RequestSchema, await req.json())
  if (!success) {
    return new Response(
      JSON.stringify({ issues }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { prompt, from, to } = output

  // 1. Get the Google language model
  const model = google('models/gemini-pro')

  // 2. Call generateText with the model, prompt, system message, maxTokens and temperature
  const result = await streamText({
    model,
    prompt,
    system: `Translate the following text from ${from} to ${to}. If "Auto" is the from language, then try to detect the original language automatically after reading the text. Return directly the translated text. Do not include the prompt in the response.`,
    maxTokens: 4096,
    temperature: 0.7
  })

  // 3. Return the response text
  // 4. Use streamText and toAIStreamResponse to improve performance and UX
  return result.toAIStreamResponse()
}
