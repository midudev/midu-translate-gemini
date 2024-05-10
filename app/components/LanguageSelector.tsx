import { FROM_LANGUAGES, TO_LANGUAGES } from '../consts'
import { SelectLanguage } from './SelectLanguage'

export const LanguageSelector: React.FC<{ from: string, setFrom: (language: string) => void, to: string, setTo: (language: string) => void }> = ({ from, setFrom, to, setTo }) => {
  return (
    <div className='flex border-b border-gray-300'>
      <div className='w-7/12'>
        <SelectLanguage languages={FROM_LANGUAGES} selected={from} setSelected={setFrom} />
      </div>

      <div className='w-7/12'>
        <SelectLanguage languages={TO_LANGUAGES} selected={to} setSelected={setTo} />
      </div>
    </div>
  )
}
