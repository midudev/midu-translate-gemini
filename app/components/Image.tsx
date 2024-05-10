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
  const [file, setFile] = useState<File | null>(null)

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/translate-image',
    body: { from, to, image: file }
  })

  const handleDrop = async (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }

  useEffect(() => {
    async function run () {
      if (file === null) return
      const image = await fileToBase64(file)
      complete('', { body: { from, to, image } })
    }

    run()
  }, [from, to, file])

  const image = file != null ? URL.createObjectURL(file) : null

  return (
    <>
      <LanguageSelector from={from} setFrom={setFrom} to={to} setTo={setTo} />

      <div className='flex'>
        <TranslateImageInput onDrop={handleDrop} image={image} onClose={() => { setFile(null) }} />
        <TranslateTextOutput result={completion} isLoading={isLoading} />
      </div>
    </>
  )
}
