'use client'

import { useEffect, useState } from 'react'
import { useCompletion } from 'ai/react'

import { TranslateTextOutput } from './TranslateTextOutput'
import { LanguageSelector } from './LanguageSelector'

import { fileToBase64 } from '../utils'
import { FROM_LANGUAGES, TO_LANGUAGES } from '../consts'
import { TranslateImageInput } from './TranslateImageInput'

export function Image () {
  const [from, setFrom] = useState(FROM_LANGUAGES[0])
  const [to, setTo] = useState(TO_LANGUAGES[0])

  // 1. Create state to store the file
  // 2. Create handleDrop function to set the file
  // 3. Create `image` variable to show the image
  // 4. Pass all the necessary props to TranslateImageInput
  // 5. Add `onClose` to remove the file on clicking X

  // 6. Add useCompletion hook to call to `/api/translate-image`
  // 7. useEffect: `complete` on changing the file, from or to fields
  // 7a. Transform image to base64 and pass it to `complete` body
  // 8. Pass `completion` and `isLoading` to TranslateTextOutput

  const image = null

  return (
    <>
      <LanguageSelector from={from} setFrom={setFrom} to={to} setTo={setTo} />

      <div className='flex'>
        <TranslateImageInput image={image} />
        <TranslateTextOutput />
      </div>
    </>
  )
}
