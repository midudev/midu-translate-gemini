'use client'

import { useCompletion } from 'ai/react'
import { useEffect, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'
import { TranslateTextOutput } from './TranslateTextOutput'

import { FROM_LANGUAGES, TO_LANGUAGES } from '../consts'
import { LanguageSelector } from './LanguageSelector'
import { TranslateTextInput } from './TranslateTextInput'

export function Chat () {
  const [from, setFrom] = useState(FROM_LANGUAGES[0])
  const [to, setTo] = useState(TO_LANGUAGES[0])
  const [text, setText] = useState('')
  const debouncedSearchTerm = useDebounce(text, 300)

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/translate',
    body: { from, to }
  })

  useEffect(() => {
    if (debouncedSearchTerm === '') return
    complete(debouncedSearchTerm, { body: { from, to } })
  }, [debouncedSearchTerm, from, to])

  return (
    <>
      <LanguageSelector from={from} setFrom={setFrom} to={to} setTo={setTo} />

      <div className='flex'>
        <TranslateTextInput text={text} onChange={newText => { setText(newText) }} />
        <TranslateTextOutput result={completion} isLoading={isLoading} />
      </div>
    </>
  )
}
