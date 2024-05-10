export const TextCounter = ({ text }: { text: string }) => {
  return (
    <div className='h-10'>
      <div className='flex flex-grow'>
        <div className='grow'>
          <div className='flex float-right'>
            <div className='text-sm text-gray-400 pt-5'>{text.length}/5000</div>
          </div>
        </div>
      </div>
    </div>
  )
}
