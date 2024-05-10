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

  // Get a language model
  const model = google('models/gemini-pro-vision')

  const formattedImage = base64ToUint8Array(image)

  // Call the language model with the prompt
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
    temperature: 0.7,
    topP: 0.4
  })

  // Respond with a streaming response
  return result.toAIStreamResponse()
}
