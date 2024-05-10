import { Chat } from './components/Chat'

export default function Home () {
  return (
    <section>
      <div className='bg-white rounded-lg border border-gray-200
          drop-shadow-sm shadow-sm'
      >
        <Chat />
      </div>
    </section>
  )
}
