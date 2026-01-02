export interface TicketmasterEvent {
  id: string
  name: string
  url: string
  images: Array<{
    url: string
    width: number
    height: number
  }>
  dates: {
    start: {
      localDate: string
      localTime?: string
    }
    status?: {
      code: string
    }
  }
  sales?: {
    public?: {
      startDateTime?: string
      endDateTime?: string
    }
  }
  priceRanges?: Array<{
    min: number
    max: number
    currency: string
  }>
  _embedded?: {
    venues?: Array<{
      name: string
      city: {
        name: string
      }
      state?: {
        name: string
      }
      country: {
        name: string
      }
    }>
  }
  classifications?: Array<{
    segment?: {
      name: string
    }
    genre?: {
      name: string
    }
  }>
}

export interface SavedEvent {
  id: string
  name: string
  date: string
  venue: string
  city: string
  imageUrl: string
  url: string
}
