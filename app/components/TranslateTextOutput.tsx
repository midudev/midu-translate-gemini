import { MdContentCopy } from 'react-icons/md'

const Loading = () => <span className='animate-pulse'>⏺</span>

export function TranslateTextOutput ({ result = '', isLoading }: { result: string, isLoading: boolean }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  const renderResult = () => {
    if (isLoading && result.length === 0) return <Loading />
    if (!isLoading && result.length === 0) return <span className='text-gray-400'>Traducción... </span>
    if (isLoading && result.length > 0) return <span>{result}<Loading /></span>
    return <span>{result}</span>
  }

  return (
    <div className='w-6/12 bg-gray-100 rounded-br-lg p-4'>
      <div className='h-40'>
        <div className='text-base resize-none bg-transparent pointer-events-none lg:text-2xl text-black h-10'>
          {renderResult()}
        </div>
      </div>

      <div className='h-10'>
        <div className='flex flex-grow'>

          <div className='grow'>
            <div className='flex float-right'>
              <button
                className='hover:bg-gray-200 rounded-full
                  w-10 h-10 mt-1 flex justify-center items-center
                  transition-colors duration-100'
                onClick={copyToClipboard}
              >
                <MdContentCopy />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
