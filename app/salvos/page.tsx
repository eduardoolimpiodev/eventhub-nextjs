'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSavedEvents } from '@/store/saved-events'

export default function SavedEventsPage() {
  const { savedEvents, removeEvent, clearAll } = useSavedEvents()

  return (
    <div className="min-h-[calc(100vh-70px)] py-8 px-4 max-w-[1400px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Meus Eventos Salvos</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{savedEvents.length} de 5 eventos</span>
          {savedEvents.length > 0 && (
            <button
              onClick={clearAll}
              className="text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              Limpar Todos
            </button>
          )}
        </div>
      </div>

      {savedEvents.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">📅</span>
          <h2 className="text-2xl font-semibold mb-2">Nenhum evento salvo</h2>
          <p className="text-gray-600 mb-6">
            Você ainda não salvou nenhum evento. Explore e salve seus favoritos!
          </p>
          <Link
            href="/buscar"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Explorar Eventos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative w-full pt-[60%] overflow-hidden bg-gray-100">
                <Image
                  src={event.imageUrl}
                  alt={event.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold mb-4 line-clamp-2">
                  {event.name}
                </h3>

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">📅</span>
                    <span className="truncate">
                      {new Date(event.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">📍</span>
                    <span className="truncate">{event.venue}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-base">🌆</span>
                    <span className="truncate">{event.city}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/evento/${event.id}`}
                    className="flex-1 px-4 py-2 bg-primary text-white text-center rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Ver Detalhes
                  </Link>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="px-4 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
