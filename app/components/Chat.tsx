'use client'

import { useCompletion } from 'ai/react'
import { useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'

import { TranslateTextOutput } from './TranslateTextOutput'
import { LanguageSelector } from './LanguageSelector'
import { TranslateTextInput } from './TranslateTextInput'

import { FROM_LANGUAGES, TO_LANGUAGES } from '../consts'

export function Chat () {
  const [from, setFrom] = useState(FROM_LANGUAGES[0])
  const [to, setTo] = useState(TO_LANGUAGES[0])

  // 1. Create state to store user text
  // 2. Pass text and onChange callback to TranslateTextInput
  // 3. Add useCompletion hook to call to `/api/translate`
  // 4. Call `complete` on changing the input
  // 5. Call `complete` with useEffect when changing from or to
  // 6. Add useDebounce to improve performance
  // 7. Add useEffect to call complete when param changes

  return (
    <>
      <LanguageSelector from={from} setFrom={setFrom} to={to} setTo={setTo} />

      <div className='flex'>
        <TranslateTextInput />
        <TranslateTextOutput />
      </div>
    </>
  )
}
