'use client'

import { Star, CheckCircle, ThumbsUp, MessageCircle, Filter } from 'lucide-react'
import { useState } from 'react'

export default function OpinionesPage() {
  const [filterStars, setFilterStars] = useState<number | null>(null)

  // Datos de ejemplo
  const stats = {
    average: 4.9,
    total: 3247,
    distribution: {
      5: 2847,
      4: 312,
      3: 54,
      2: 21,
      1: 13
    }
  }

  const reviews = [
    {
      id: 1,
      name: 'María González',
      rating: 5,
      date: '2025-10-15',
      verified: true,
      comment: 'El mejor colchón que he probado. La calidad es excepcional y el servicio de entrega fue perfecto. Llevo 3 meses durmiéndolo y mi espalda lo agradece.',
      helpful: 24,
      product: 'Colchón Multisac Premium'
    },
    {
      id: 2,
      name: 'Carlos Ruiz',
      rating: 5,
      date: '2025-10-10',
      verified: true,
      comment: 'Compré el colchón viscoelástico y estoy encantado. La firmeza es perfecta para mí. Envío rápido y bien embalado.',
      helpful: 18,
      product: 'Colchón Viscoelástico Adaptable'
    },
    {
      id: 3,
      name: 'Ana Martínez',
      rating: 5,
      date: '2025-10-05',
      verified: true,
      comment: 'Excelente relación calidad-precio. El colchón es muy confortable y la atención al cliente impecable. 100% recomendable.',
      helpful: 31,
      product: 'Colchón Híbrido Comfort'
    },
    {
      id: 4,
      name: 'Pedro Sánchez',
      rating: 4,
      date: '2025-09-28',
      verified: true,
      comment: 'Muy buen colchón, aunque tardó un poco más de lo esperado en llegar. La calidad es buena.',
      helpful: 12,
      product: 'Colchón Multisac Premium'
    },
    {
      id: 5,
      name: 'Laura Fernández',
      rating: 5,
      date: '2025-09-20',
      verified: true,
      comment: 'Increíble compra. Duermo muchísimo mejor desde que lo tengo. El proceso de compra fue muy fácil.',
      helpful: 27,
      product: 'Colchón Látex Natural'
    },
    {
      id: 6,
      name: 'Javier López',
      rating: 5,
      date: '2025-09-15',
      verified: true,
      comment: 'Calidad premium a buen precio. El colchón es firme pero cómodo. Muy contento con la compra.',
      helpful: 19,
      product: 'Colchón Viscoelástico Adaptable'
    }
  ]

  const filteredReviews = filterStars 
    ? reviews.filter(r => r.rating === filterStars)
    : reviews

  const getPercentage = (count: number) => ((count / stats.total) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl mb-6 border border-amber-500/30">
            <Star className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Opiniones de Clientes
          </h1>
          <p className="text-zinc-400 text-lg">
            {stats.total.toLocaleString()} opiniones reales de clientes verificados
          </p>
        </div>

        {/* Overall Rating */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Score */}
            <div className="text-center md:border-r border-white/10">
              <div className="text-7xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-4">
                {stats.average}
              </div>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(stats.average)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-zinc-400 text-sm">
                Basado en <span className="font-bold text-white">{stats.total.toLocaleString()}</span> opiniones
              </p>
            </div>

            {/* Distribution */}
            <div className="md:col-span-2 space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setFilterStars(filterStars === stars ? null : stars)}
                  className={`w-full flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-all ${
                    filterStars === stars ? 'bg-white/5' : ''
                  }`}
                >
                  <span className="text-sm text-zinc-400 w-12">{stars} ★</span>
                  <div className="flex-1 h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-400"
                      style={{ width: `${getPercentage(stats.distribution[stars as keyof typeof stats.distribution])}%` }}
                    />
                  </div>
                  <span className="text-sm text-zinc-400 w-16 text-right">
                    {getPercentage(stats.distribution[stars as keyof typeof stats.distribution])}%
                  </span>
                  <span className="text-sm font-semibold text-white w-16 text-right">
                    {stats.distribution[stars as keyof typeof stats.distribution].toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Info */}
        {filterStars && (
          <div className="mb-6 bg-violet-500/10 border border-violet-500/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-violet-400" />
              <span className="text-white font-semibold">
                Mostrando opiniones de {filterStars} estrellas ({filteredReviews.length})
              </span>
            </div>
            <button
              onClick={() => setFilterStars(null)}
              className="text-violet-400 hover:text-violet-300 text-sm font-semibold"
            >
              Limpiar filtro
            </button>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{review.name}</h3>
                      {review.verified && (
                        <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-lg">
                          <CheckCircle className="w-3 h-3" />
                          <span className="text-xs font-bold">Verificado</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500">
                      {new Date(review.date).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-zinc-700'
                    }`}
                  />
                ))}
              </div>

              {/* Product */}
              <p className="text-xs text-violet-400 mb-3 font-semibold">
                {review.product}
              </p>

              {/* Comment */}
              <p className="text-zinc-300 leading-relaxed mb-4 text-sm">
                {review.comment}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Útil ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">¿Ya compraste tu colchón?</h2>
          <p className="text-zinc-300 mb-6">
            Comparte tu experiencia y ayuda a otros clientes a elegir mejor
          </p>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/30">
            <MessageCircle className="w-5 h-5" />
            Escribir opinión
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-500">
            Todas las opiniones son de clientes verificados que han comprado en nuestra tienda
          </p>
        </div>
      </div>
    </div>
  )
}