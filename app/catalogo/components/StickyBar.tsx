// app/catalogo/components/StickyBar.tsx
'use client'

import { Search, SlidersHorizontal, X } from 'lucide-react'
import React from 'react'
import { filters } from './utils' // Si necesitas las constantes aquí

interface StickyBarProps {
  productsRef: React.RefObject<HTMLDivElement>
  searchTerm: string
  setSearchTerm: (term: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
  activeFiltersCount: number
  clearFilters: () => void
  setIsFilterOpen: (isOpen: boolean) => void
  filteredProductsLength: number
}

export default function StickyBar({
  productsRef,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  activeFiltersCount,
  clearFilters,
  setIsFilterOpen,
  filteredProductsLength,
}: StickyBarProps) {
  
  // 🔥 La clave es el 'return' para evitar el Type Error
  return (
    <div 
      ref={productsRef} 
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          {/* Mobile: Botón Filtrar */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="lg:hidden flex-shrink-0 relative px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-md"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filtrar</span>
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-indigo-600 text-white text-xs font-black rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Barra de búsqueda */}
          <div className="relative flex-1">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-9 md:pl-12 pr-3 md:pr-4 py-2.5 md:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all text-sm md:text-base text-gray-900 placeholder:text-gray-400 font-medium"
            />
          </div>

          {/* Desktop: Ordenar inline */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="hidden lg:block px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-gray-700 bg-white cursor-pointer font-medium"
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: ↑</option>
            <option value="price-desc">Precio: ↓</option>
            <option value="rating">Mejor valorados</option>
          </select>
        </div>

        {/* Contador de resultados */}
        <div className="flex items-center justify-between mt-3 text-sm">
          <span className="text-gray-600">
            <span className="font-bold text-gray-900">{filteredProductsLength}</span> {filteredProductsLength === 1 ? 'colchón' : 'Productos'}
          </span>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Limpiar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}