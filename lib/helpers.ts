import type { TicketmasterEvent, SavedEvent } from '@/types/event'

export function getEventImage(event: TicketmasterEvent): string {
  if (!event.images || event.images.length === 0) {
    return 'https://via.placeholder.com/400x240?text=Sem+Imagem'
  }
  
  const image = event.images.find(img => img.width >= 640) || event.images[0]
  return image.url
}

export function getEventVenue(event: TicketmasterEvent): string {
  const venue = event._embedded?.venues?.[0]
  return venue?.name || 'Local não informado'
}

export function getEventCity(event: TicketmasterEvent): string {
  const venue = event._embedded?.venues?.[0]
  if (!venue) return 'Cidade não informada'
  
  const city = venue.city.name
  const state = venue.state?.name
  return state ? `${city}, ${state}` : city
}

export function getEventDate(event: TicketmasterEvent): string {
  const date = new Date(event.dates.start.localDate)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export function getEventTime(event: TicketmasterEvent): string | null {
  return event.dates.start.localTime || null
}

export function getEventStatus(event: TicketmasterEvent | SavedEvent): string {
  if ('dates' in event) {
    const statusCode = event.dates.status?.code
    
    if (statusCode === 'offsale' || statusCode === 'cancelled') {
      return 'Esgotado'
    }
    
    if (event.sales?.public) {
      const now = new Date()
      const startDate = event.sales.public.startDateTime 
        ? new Date(event.sales.public.startDateTime)
        : null
      const endDate = event.sales.public.endDateTime
        ? new Date(event.sales.public.endDateTime)
        : null
      
      if (startDate && now < startDate) {
        return 'Em Breve'
      }
      
      if (endDate && now > endDate) {
        return 'Esgotado'
      }
    }
    
    return 'Inscrições Abertas'
  }
  
  return 'Inscrições Abertas'
}

export function getEventPrice(event: TicketmasterEvent): string {
  if (!event.priceRanges || event.priceRanges.length === 0) {
    return 'Preço não informado'
  }
  
  const price = event.priceRanges[0]
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: price.currency || 'USD'
  })
  
  if (price.min === price.max) {
    return formatter.format(price.min)
  }
  
  return `${formatter.format(price.min)} - ${formatter.format(price.max)}`
}

export function convertToSavedEvent(event: TicketmasterEvent): SavedEvent {
  return {
    id: event.id,
    name: event.name,
    date: event.dates.start.localDate,
    venue: getEventVenue(event),
    city: getEventCity(event),
    imageUrl: getEventImage(event),
    url: event.url
  }
}
