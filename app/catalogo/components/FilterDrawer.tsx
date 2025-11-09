'use client'

import { Dispatch, SetStateAction } from 'react'
import { X, Filter, Check, Star } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  selectedCategories: string[]
  onCategoryChange: Dispatch<SetStateAction<string[]>>
  priceRange: [number, number]
  onPriceRangeChange: Dispatch<SetStateAction<[number, number]>>
  minRating: number
  onMinRatingChange: Dispatch<SetStateAction<number>>
  availableCategories: string[]
  onClearFilters: () => void
}

const ratingOptions = [
  { label: 'Todas', value: 0 },
  { label: '4+ Estrellas', value: 4 },
  { label: '4.5+ Estrellas', value: 4.5 },
  { label: '4.7+ Estrellas', value: 4.7 },
  { label: '4.9+ Estrellas', value: 4.9 }
]

export default function FilterDrawer({
  isOpen,
  onClose,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  availableCategories,
  onClearFilters
}: FilterDrawerProps) {
  
  const toggleCategory = (category: string) => {
    onCategoryChange(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const activeFiltersCount = 
    selectedCategories.length + 
    (priceRange[0] > 0 || priceRange[1] < 10000 ? 1 : 0) + 
    (minRating > 0 ? 1 : 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop / Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-full sm:w-96 bg-zinc-900 shadow-2xl z-[101] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Filtros</h2>
                  {activeFiltersCount > 0 && (
                    <p className="text-xs text-zinc-400">
                      {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              
              {/* Categorías */}
              {availableCategories.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="text-violet-400">🏷️</span>
                    Categorías
                  </h3>
                  <div className="space-y-2">
                    {availableCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`
                          w-full px-4 py-3 rounded-xl text-left text-sm font-medium
                          transition-all duration-200
                          flex items-center justify-between
                          ${selectedCategories.includes(category)
                            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                          }
                        `}
                      >
                        <span>{category}</span>
                        {selectedCategories.includes(category) && (
                          <Check className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rango de Precio */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="text-violet-400">💰</span>
                  Precio
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-zinc-400 mb-2">Mínimo</label>
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:border-violet-500 focus:outline-none"
                        min="0"
                        max={priceRange[1]}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-zinc-400 mb-2">Máximo</label>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                        className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:border-violet-500 focus:outline-none"
                        min={priceRange[0]}
                        max="10000"
                      />
                    </div>
                  </div>
                  
                  {/* Range Slider */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-600"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                      className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fuchsia-600"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Valoración Mínima */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="text-violet-400">⭐</span>
                  Valoración Mínima
                </h3>
                <div className="space-y-2">
                  {ratingOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onMinRatingChange(option.value)}
                      className={`
                        w-full px-4 py-3 rounded-xl text-left text-sm font-medium
                        transition-all duration-200
                        flex items-center justify-between
                        ${minRating === option.value
                          ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        }
                      `}
                    >
                      <span className="flex items-center gap-2">
                        {option.label}
                        {option.value > 0 && (
                          <div className="flex">
                            {[...Array(Math.floor(option.value))].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        )}
                      </span>
                      {minRating === option.value && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-zinc-900 border-t border-zinc-800 p-6 space-y-3">
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    onClearFilters()
                  }}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold transition-colors"
                >
                  Limpiar Filtros
                </button>
              )}
              <button
                onClick={onClose}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black shadow-lg hover:shadow-xl transition-all"
              >
                Aplicar Filtros
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}