import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { object, picklist, safeParse, string } from 'valibot'
import { base64ToUint8Array } from '@/app/utils'

const RequestSchema = object({
  prompt: string(),
  image: string(),
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

  const { from, to, image } = output

  // 1. Get google model gemini-pro-vision
  // check available models:
  // https://ai.google.dev/gemini-api/docs/models/gemini?hl=es-419

  // 2. Transform image base64 to ArrayBuffer Uint8

  // 3. Call streamText, passing the model, imageArray, from and to and get the response

  // 4. Response with stream response
}
