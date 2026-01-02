'use client'

import { useState, useEffect } from 'react'
import { EventCard } from '@/components/event-card'
import { searchEvents } from '@/lib/ticketmaster-api'
import type { TicketmasterEvent } from '@/types/event'

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    startDate: '',
    endDate: '',
    priceRange: 'all'
  })
  
  const [events, setEvents] = useState<TicketmasterEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() || filters.city || filters.category) {
        handleSearch()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, filters])

  const handleSearch = async () => {
    if (!searchTerm.trim() && !filters.city && !filters.category) {
      setEvents([])
      setHasSearched(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      setHasSearched(true)
      
      const data = await searchEvents({
        keyword: searchTerm.trim() || undefined,
        city: filters.city || undefined,
      })
      
      setEvents(data._embedded?.events || [])
    } catch (err) {
      setError('Erro ao buscar eventos. Tente novamente.')
      console.error('Erro:', err)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      city: '',
      category: '',
      startDate: '',
      endDate: '',
      priceRange: 'all'
    })
  }

  const hasActiveFilters = filters.city || filters.category || filters.startDate || filters.endDate || filters.priceRange !== 'all'

  return (
    <div className="min-h-[calc(100vh-70px)] py-8 px-4 max-w-[1400px] mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Buscar Eventos</h1>
      
      {/* Search Bar */}
      <div className="max-w-[600px] mx-auto mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
            🔍
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar eventos por nome, artista, local..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Filters Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span>{showFilters ? '▼' : '▶'}</span>
          <span className="font-medium">Filtros</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-primary rounded-full"></span>
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cidade
              </label>
              <select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todas as cidades</option>
                <option value="New York">New York</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="Chicago">Chicago</option>
                <option value="Houston">Houston</option>
                <option value="Miami">Miami</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Todas as categorias</option>
                <option value="Music">Música</option>
                <option value="Sports">Esportes</option>
                <option value="Arts & Theatre">Arte e Teatro</option>
                <option value="Family">Família</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data início
              </label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data fim
              </label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                min={filters.startDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todos os preços</option>
                <option value="free">Gratuito</option>
                <option value="paid">Pago</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4">
              <button
                onClick={handleResetFilters}
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
          <p className="text-gray-600">Buscando eventos...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Erro ao buscar eventos. Tente novamente.</p>
          <button 
            onClick={handleSearch}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && !error && hasSearched && events.length === 0 && (
        <div className="text-center py-16">
          <span className="text-6xl block mb-4">🔍</span>
          <h2 className="text-2xl font-semibold mb-2">Busque por eventos</h2>
          <p className="text-gray-600">
            Digite o nome do evento ou cidade para começar
          </p>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Encontrados <span className="font-semibold text-primary">{events.length}</span> eventos
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
