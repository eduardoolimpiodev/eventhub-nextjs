'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { fetchEventById } from '@/lib/ticketmaster-api'
import { useSavedEvents } from '@/store/saved-events'
import { getEventImage, getEventVenue, getEventCity, getEventDate, getEventTime, getEventStatus, getEventPrice, convertToSavedEvent } from '@/lib/helpers'
import type { TicketmasterEvent } from '@/types/event'

export default function EventDetailsPage() {
  const params = useParams()
  const id = params.id as string
  
  const [event, setEvent] = useState<TicketmasterEvent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const { addEvent, removeEvent, isEventSaved } = useSavedEvents()
  const isSaved = event ? isEventSaved(event.id) : false

  useEffect(() => {
    async function loadEvent() {
      try {
        setLoading(true)
        const data = await fetchEventById(id)
        setEvent(data)
        setError(null)
      } catch (err) {
        setError('Evento não encontrado')
        console.error('Erro:', err)
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [id])

  const handleSaveToggle = () => {
    if (!event) return
    
    if (isSaved) {
      removeEvent(event.id)
    } else {
      addEvent(convertToSavedEvent(event))
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        <p className="text-gray-600">Carregando evento...</p>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-[calc(100vh-70px)] flex flex-col items-center justify-center py-12">
        <span className="text-6xl mb-4">😕</span>
        <h2 className="text-2xl font-bold mb-2">Algo deu errado!</h2>
        <p className="text-gray-600 mb-6">{error || 'Evento não encontrado'}</p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Voltar para Home
        </Link>
      </div>
    )
  }

  const status = getEventStatus(event)

  return (
    <div className="min-h-[calc(100vh-70px)]">
      {/* Hero Image */}
      <div className="relative w-full h-[400px] bg-gray-900">
        <Image
          src={getEventImage(event)}
          alt={event.name}
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className={`
                inline-block px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide mb-4
                ${status === 'Inscrições Abertas' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
              `}>
                {status}
              </span>
              <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Informações do Evento</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-medium">Data e Hora</p>
                    <p className="text-gray-600">
                      {getEventDate(event)}
                      {getEventTime(event) && ` • ${getEventTime(event)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium">Local</p>
                    <p className="text-gray-600">{getEventVenue(event)}</p>
                    <p className="text-gray-600">{getEventCity(event)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">💰</span>
                  <div>
                    <p className="font-medium">Preço</p>
                    <p className="text-gray-600">{getEventPrice(event)}</p>
                  </div>
                </div>

                {event.classifications && event.classifications[0] && (
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🎭</span>
                    <div>
                      <p className="font-medium">Categoria</p>
                      <p className="text-gray-600">
                        {event.classifications[0].segment?.name || 'Não informado'}
                        {event.classifications[0].genre?.name && 
                          ` • ${event.classifications[0].genre.name}`
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <button
                onClick={handleSaveToggle}
                className={`
                  w-full px-6 py-3 rounded-lg font-semibold mb-4 transition-colors
                  ${isSaved 
                    ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                    : 'bg-primary text-white hover:bg-primary-dark'
                  }
                `}
              >
                {isSaved ? '❤️ Remover dos Favoritos' : '🤍 Salvar Evento'}
              </button>

              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-3 bg-secondary text-white text-center rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Comprar Ingressos →
              </a>

              <p className="text-xs text-gray-500 text-center mt-4">
                Você será redirecionado para o site oficial
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
