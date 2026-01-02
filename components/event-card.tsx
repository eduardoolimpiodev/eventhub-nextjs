'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSavedEvents } from '@/store/saved-events'
import { getEventImage, getEventVenue, getEventCity, getEventDate, getEventTime, getEventStatus, convertToSavedEvent } from '@/lib/helpers'
import type { TicketmasterEvent } from '@/types/event'

interface EventCardProps {
  event: TicketmasterEvent
}

export function EventCard({ event }: EventCardProps) {
  const { addEvent, removeEvent, isEventSaved } = useSavedEvents()
  const isSaved = isEventSaved(event.id)
  const status = getEventStatus(event)

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isSaved) {
      removeEvent(event.id)
    } else {
      addEvent(convertToSavedEvent(event))
    }
  }

  return (
    <Link
      href={`/evento/${event.id}`}
      className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
    >
      <div className="relative w-full pt-[60%] overflow-hidden bg-gray-100">
        <Image
          src={getEventImage(event)}
          alt={event.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <button
          onClick={handleSaveToggle}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform z-10"
          aria-label={isSaved ? 'Remover dos favoritos' : 'Salvar evento'}
        >
          <span className="text-xl">
            {isSaved ? '❤️' : '🤍'}
          </span>
        </button>

        <span className={`
          absolute bottom-3 left-3 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide backdrop-blur-sm
          ${status === 'Inscrições Abertas' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'}
        `}>
          {status}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-4 line-clamp-2 leading-snug">
          {event.name}
        </h3>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-base flex-shrink-0">📅</span>
            <span className="truncate">
              {getEventDate(event)}
              {getEventTime(event) && ` • ${getEventTime(event)}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-base flex-shrink-0">📍</span>
            <span className="truncate">{getEventVenue(event)}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-base flex-shrink-0">🌆</span>
            <span className="truncate">{getEventCity(event)}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
