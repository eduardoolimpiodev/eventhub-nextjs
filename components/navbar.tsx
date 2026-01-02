'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSavedEvents } from '@/store/saved-events'

export function Navbar() {
  const pathname = usePathname()
  const { savedEvents } = useSavedEvents()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-[1000]">
      <div className="max-w-[1400px] mx-auto px-4 flex items-center justify-between h-[70px]">
        <Link 
          href="/" 
          className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          🎉 EventHub
        </Link>

        <ul className="flex list-none gap-8 items-center">
          <li>
            <Link
              href="/"
              className={`
                text-gray-600 font-medium text-base px-2 py-2 
                flex items-center gap-2 transition-colors relative
                hover:text-primary
                ${isActive('/') ? 'text-primary' : ''}
              `}
            >
              Início
              {isActive('/') && (
                <span className="absolute -bottom-[18px] left-0 right-0 h-[3px] bg-primary rounded-t-sm" />
              )}
            </Link>
          </li>

          <li>
            <Link
              href="/buscar"
              className={`
                text-gray-600 font-medium text-base px-2 py-2 
                flex items-center gap-2 transition-colors relative
                hover:text-primary
                ${isActive('/buscar') ? 'text-primary' : ''}
              `}
            >
              Buscar Eventos
              {isActive('/buscar') && (
                <span className="absolute -bottom-[18px] left-0 right-0 h-[3px] bg-primary rounded-t-sm" />
              )}
            </Link>
          </li>

          <li>
            <Link
              href="/salvos"
              className={`
                text-gray-600 font-medium text-base px-2 py-2 
                flex items-center gap-2 transition-colors relative
                hover:text-primary
                ${isActive('/salvos') ? 'text-primary' : ''}
              `}
            >
              Meus Eventos
              <span className="bg-secondary text-white text-xs font-semibold px-2 py-0.5 rounded-xl min-w-[20px] text-center">
                {savedEvents.length}
              </span>
              {isActive('/salvos') && (
                <span className="absolute -bottom-[18px] left-0 right-0 h-[3px] bg-primary rounded-t-sm" />
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
