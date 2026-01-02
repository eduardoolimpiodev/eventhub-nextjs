import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SavedEvent } from '@/types/event'

interface SavedEventsState {
  savedEvents: SavedEvent[]
  addEvent: (event: SavedEvent) => void
  removeEvent: (eventId: string) => void
  isEventSaved: (eventId: string) => boolean
  clearAll: () => void
}

export const useSavedEvents = create<SavedEventsState>()(
  persist(
    (set, get) => ({
      savedEvents: [],
      
      addEvent: (event) => {
        const { savedEvents } = get()
        
        if (savedEvents.length >= 5) {
          alert('Você já salvou o máximo de 5 eventos!')
          return
        }
        
        if (savedEvents.some(e => e.id === event.id)) {
          return
        }
        
        set({ savedEvents: [...savedEvents, event] })
      },
      
      removeEvent: (eventId) => {
        set((state) => ({
          savedEvents: state.savedEvents.filter(e => e.id !== eventId)
        }))
      },
      
      isEventSaved: (eventId) => {
        return get().savedEvents.some(e => e.id === eventId)
      },
      
      clearAll: () => {
        if (confirm('Tem certeza que deseja remover todos os eventos salvos?')) {
          set({ savedEvents: [] })
        }
      }
    }),
    {
      name: 'eventhub-saved-events'
    }
  )
)
