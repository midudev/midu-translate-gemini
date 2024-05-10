import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Nav } from './components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Google Translate Clone',
  description: 'Usando Gemini AI para crear un clone de Google Translate'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='container mx-auto px-0 lg:px-24'>
          <Nav />
          <main className='w-[800px]'>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
