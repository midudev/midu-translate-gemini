import Dropzone from 'react-dropzone'
import { MdClose } from 'react-icons/md'

export function TranslateImageInput (
  { image, onClose, onDrop }:
  { image: string | null, onClose: () => void, onDrop: (acceptedFiles: File[]) => void }
) {
  return (
    <div className='w-6/12 border-r border-gray-200 p-4 flex justify-center items-center'>
      {
        image !== null
          ? (
            <div className='relative'>
              <button onClick={onClose} className='absolute -right-1 -top-1 bg-red-500 text-white flex justify-center items-center rounded-full'><MdClose size={24} /></button>
              <img src={image} alt='Imagen seleccionada' className='max-w-full h-auto' />
            </div>
            )
          : (
            <Dropzone accept={{ 'image/*': [] }} onDrop={onDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className='h-full flex justify-center items-center flex-col gap-y-2'>
                    <img src='/drag_and_drop.png' alt='Arrastrar y soltar' className={`${isDragActive ? 'opacity-50 scale-90 inline-block' : ''} transition w-1/2 h-auto`} />
                    {isDragActive ? 'Suelta tu imagen aquí...' : 'Arrastra y suelta tu imagen aquí...'}
                  </div>
                </div>
              )}
            </Dropzone>
            )
      }
    </div>
  )
}
