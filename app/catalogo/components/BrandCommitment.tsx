import { SlidersHorizontal, Star, Sparkles, Check, TrendingUp, Filter } from 'lucide-react'

interface FiltersSidebarProps {
  selectedFirmness: string
  setSelectedFirmness: (value: string) => void
  selectedPrice: string
  setSelectedPrice: (value: string) => void
  selectedRating: string
  setSelectedRating: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
  activeFiltersCount: number
  clearFilters: () => void
  resultsCount: number
}

const firmness = ['Todas', 'Suave', 'Media-Suave', 'Media', 'Media-Firme', 'Firme']
const price = ['Todos', 'Menos de €500', '€500 - €1000', '€1000 - €1500', 'Más de €1500']
const rating = ['Todas', '4+ estrellas', '4.5+ estrellas', '4.8+ estrellas']

export default function FiltersSidebar2025({
  selectedFirmness,
  setSelectedFirmness,
  selectedPrice,
  setSelectedPrice,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
  activeFiltersCount,
  clearFilters,
  resultsCount
}: FiltersSidebarProps) {
  
  return (
    <aside className="hidden lg:block sticky top-24 h-fit">
      <div className="w-full max-w-xs">
        
        {/* Main Card Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-800 shadow-2xl">
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-fuchsia-600/10 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative p-6 space-y-6">
            
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">
                    Filtros
                  </h2>
                  {activeFiltersCount > 0 && (
                    <p className="text-xs text-zinc-500 font-medium">
                      {activeFiltersCount} {activeFiltersCount === 1 ? 'activo' : 'activos'}
                    </p>
                  )}
                </div>
              </div>

              {/* Results Badge */}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                <span className="text-sm font-semibold text-zinc-400">Productos</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-lg font-black text-white">{resultsCount}</span>
                </div>
              </div>
            </div>

            {/* Ordenar */}
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-white mb-3 uppercase tracking-widest">
                <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                Ordenar
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border-2 border-zinc-800 rounded-xl bg-zinc-800/50 backdrop-blur-sm text-white text-sm font-semibold focus:outline-none focus:border-violet-500 transition-all hover:bg-zinc-800 cursor-pointer"
              >
                <option value="featured">✨ Destacados</option>
                <option value="price-asc">💰 Menor precio</option>
                <option value="price-desc">💎 Mayor precio</option>
                <option value="rating">⭐ Mejor valorados</option>
              </select>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            {/* Firmeza */}
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-white mb-3 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Firmeza
              </label>
              <div className="space-y-2">
                {firmness.map(f => (
                  <button
                    key={f}
                    onClick={() => setSelectedFirmness(f)}
                    className={`
                      relative w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left overflow-hidden group
                      ${selectedFirmness === f
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50 scale-[1.02]'
                        : 'bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800/60 border border-zinc-700/50 hover:border-zinc-600'
                      }
                    `}
                  >
                    <div className="relative flex items-center justify-between">
                      <span>{f}</span>
                      {selectedFirmness === f && (
                        <Check className="w-4 h-4" />
                      )}
                    </div>
                    {selectedFirmness === f && (
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            {/* Precio */}
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-white mb-3 uppercase tracking-widest">
                💰 Precio
              </label>
              <div className="space-y-2">
                {price.map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPrice(p)}
                    className={`
                      relative w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left overflow-hidden
                      ${selectedPrice === p
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50 scale-[1.02]'
                        : 'bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800/60 border border-zinc-700/50 hover:border-zinc-600'
                      }
                    `}
                  >
                    <div className="relative flex items-center justify-between">
                      <span>{p}</span>
                      {selectedPrice === p && (
                        <Check className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

            {/* Valoración */}
            <div>
              <label className="flex items-center gap-2 text-xs font-black text-white mb-3 uppercase tracking-widest">
                ⭐ Valoración
              </label>
              <div className="space-y-2">
                {rating.map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRating(r)}
                    className={`
                      relative w-full px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left overflow-hidden
                      ${selectedRating === r
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/50 scale-[1.02]'
                        : 'bg-zinc-800/40 text-zinc-300 hover:bg-zinc-800/60 border border-zinc-700/50 hover:border-zinc-600'
                      }
                    `}
                  >
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {r !== 'Todas' && <Star className="w-3.5 h-3.5 fill-current text-amber-400" />}
                        <span>{r}</span>
                      </div>
                      {selectedRating === r && (
                        <Check className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Button */}
            {activeFiltersCount > 0 && (
              <>
                <div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-bold transition-all border border-zinc-700 hover:border-zinc-600 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Limpiar filtros</span>
                  <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-black">
                    {activeFiltersCount}
                  </div>
                </button>
              </>
            )}
          </div>

        </div>

        {/* Quick Stats Card */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 border border-violet-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Envío gratis</p>
              <p className="text-xs text-zinc-400">En pedidos +€50</p>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </aside>
  )
}