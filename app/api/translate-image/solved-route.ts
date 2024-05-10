import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { object, picklist, safeParse, string } from 'valibot'
import { base64ToUint8Array } from '@/app/utils'
import { FROM_LANGUAGES, TO_LANGUAGES } from '@/app/consts'

const RequestSchema = object({
  prompt: string(),
  image: string(),
  from: picklist(FROM_LANGUAGES),
  to: picklist(TO_LANGUAGES)
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
  const model = google('models/gemini-pro-vision')

  // 2. Transform image base64 to ArrayBuffer Uint8
  const formattedImage = base64ToUint8Array(image)

  // 3. Call streamText,
  const result = await streamText({
    model,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: `Translate the following text from ${from} to ${to}. If "Auto" is the from language, then try to detect the original language automatically after reading the text from the image. If no text is detected in the image, return an empty string. Always return directly the translated text. Do not include the prompt in the response.` },
          { type: 'image', image: formattedImage }
        ]
      }
    ],
    maxTokens: 4096,
    temperature: 0.7
  })

  // 4. Response with stream response
  return result.toAIStreamResponse()
}
