import type { TicketmasterEvent } from '@/types/event'

const API_KEY = process.env.NEXT_PUBLIC_TICKETMASTER_API_KEY
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

if (!API_KEY) {
  console.warn('⚠️ NEXT_PUBLIC_TICKETMASTER_API_KEY não está configurada')
}

export async function fetchPopularEvents() {
  if (!API_KEY) {
    throw new Error('API Key não configurada')
  }

  const response = await fetch(
    `${BASE_URL}/events.json?apikey=${API_KEY}&size=6&countryCode=US&sort=date,asc`,
    { next: { revalidate: 3600 } }
  )

  if (!response.ok) {
    throw new Error('Erro ao buscar eventos')
  }

  return response.json()
}

export async function searchEvents(params: {
  keyword?: string
  city?: string
  startDate?: string
  endDate?: string
  page?: number
}) {
  if (!API_KEY) {
    throw new Error('API Key não configurada')
  }

  const searchParams = new URLSearchParams({
    apikey: API_KEY,
    size: '12',
    countryCode: 'US',
    sort: 'date,asc',
  })

  if (params.keyword) searchParams.append('keyword', params.keyword)
  if (params.city) searchParams.append('city', params.city)
  if (params.startDate) searchParams.append('startDateTime', params.startDate)
  if (params.endDate) searchParams.append('endDateTime', params.endDate)
  if (params.page) searchParams.append('page', params.page.toString())

  const response = await fetch(`${BASE_URL}/events.json?${searchParams}`)

  if (!response.ok) {
    throw new Error('Erro ao buscar eventos')
  }

  return response.json()
}

export async function fetchEventById(id: string) {
  if (!API_KEY) {
    throw new Error('API Key não configurada')
  }

  const response = await fetch(
    `${BASE_URL}/events/${id}.json?apikey=${API_KEY}`,
    { next: { revalidate: 3600 } }
  )

  if (!response.ok) {
    throw new Error('Evento não encontrado')
  }

  return response.json()
}
