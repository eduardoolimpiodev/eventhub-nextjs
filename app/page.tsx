'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { EventCard } from '@/components/event-card'
import { fetchPopularEvents } from '@/lib/ticketmaster-api'
import type { TicketmasterEvent } from '@/types/event'

export default function HomePage() {
  const [events, setEvents] = useState<TicketmasterEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true)
        const data = await fetchPopularEvents()
        setEvents(data._embedded?.events || [])
        setError(null)
      } catch (err) {
        setError('Erro ao carregar eventos. Tente novamente mais tarde.')
        console.error('Erro:', err)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  return (
    <div className="min-h-[calc(100vh-70px)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 text-center">
        <div className="max-w-[800px] mx-auto px-4">
          <h1 className="text-[3rem] font-extrabold mb-4 leading-[1.2]">
            Descubra eventos incríveis perto de você
          </h1>
          <p className="text-xl mb-8 opacity-95">
            Encontre shows, festivais, esportes e muito mais
          </p>
          <Link
            href="/buscar"
            className="inline-block px-8 py-4 bg-white text-primary text-lg font-semibold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Explorar Eventos
          </Link>
        </div>
      </section>

      {/* Eventos Populares */}
      <section className="py-12 px-4 max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-8 px-4">
          <h2 className="text-3xl font-bold">Eventos Populares</h2>
          <Link
            href="/buscar"
            className="text-primary font-medium hover:opacity-70 transition-opacity"
          >
            Ver todos →
          </Link>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
            <p className="text-gray-600">Carregando eventos...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Nenhum evento encontrado no momento.</p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 text-center">
        <h2 className="text-3xl font-bold mb-12">Por que usar o EventHub?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto px-4">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <span className="text-5xl block mb-4">🎫</span>
            <h3 className="text-xl font-semibold mb-2">Variedade de Eventos</h3>
            <p className="text-gray-600 leading-relaxed">
              Shows, esportes, teatro e muito mais em um só lugar
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <span className="text-5xl block mb-4">📍</span>
            <h3 className="text-xl font-semibold mb-2">Eventos Locais</h3>
            <p className="text-gray-600 leading-relaxed">
              Descubra o que está acontecendo na sua cidade
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <span className="text-5xl block mb-4">❤️</span>
            <h3 className="text-xl font-semibold mb-2">Salve Favoritos</h3>
            <p className="text-gray-600 leading-relaxed">
              Guarde seus eventos preferidos para não perder
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
            <span className="text-5xl block mb-4">🔔</span>
            <h3 className="text-xl font-semibold mb-2">Fácil de Usar</h3>
            <p className="text-gray-600 leading-relaxed">
              Interface simples e intuitiva para encontrar eventos
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
