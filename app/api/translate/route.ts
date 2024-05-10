import { object, picklist, safeParse, string } from 'valibot'
import { generateText, streamText } from 'ai'
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

  // TODO
  // 1. Get the Google language model
  // 2. Call generateText with the model, prompt, system message, maxTokens and temperature
  // 3. Return the response text
  // 4. Use streamText and toAIStreamResponse to improve performance and UX
}
