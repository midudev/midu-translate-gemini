'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdDocumentScanner, MdImage, MdTranslate, MdWeb } from 'react-icons/md'

const TABS = [{
  path: '/',
  label: 'Texto',
  icon: <MdTranslate />
}, {
  path: '/images',
  label: 'Imágenes',
  icon: <MdImage />
}, {
  path: '/documents',
  label: 'Documentos',
  icon: <MdDocumentScanner />
}, {
  path: '/websites',
  label: 'Sitios Web',
  icon: <MdWeb />
}]

export function Nav () {
  const pathname = usePathname()

  return (
    <div className='flex'>
      <div className='py-4 z-10 flex gap-2'>
        {
            TABS.map(({ path, label, icon }) => (
              <NavButton key={path} href={path} className={pathname === path ? 'bg-blue-100' : 'bg-white'}>
                {icon}
                <span>{label}</span>
              </NavButton>
            ))
          }
      </div>
    </div>
  )
}

const NavButton: React.FC<{ children: React.ReactNode, href: string, className?: string }> = ({ children, href, className = '' }) => {
  return (
    <Link
      href={href} className={`${className} hover:bg-blue-50 transition rounded px-3 py-1 flex justify-center items-center gap-1
    border border-blue-200 text-base text-blue-600 font-semibold
    focus:outline-none focus:ring-1 focus:ring-blue-600`}
    >
      {children}
    </Link>
  )
}
