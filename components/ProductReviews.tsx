// components/ProductReviews.tsx
// Componente de ejemplo para mostrar reviews del producto
import { Star } from 'lucide-react'

interface Review {
  id: string
  rating: number
  title: string
  comment: string
  verified: boolean
  createdAt: Date
  user: {
    name: string
  }
}

interface ProductReviewsProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export default function ProductReviews({ 
  reviews, 
  averageRating, 
  totalReviews 
}: ProductReviewsProps) {
  return (
    <section className="py-12 border-t border-white/10">
      {/* Rating Summary */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-6">Opiniones de clientes</h2>
        
        <div className="flex items-center gap-8 mb-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-400 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-600'
                  }`} 
                />
              ))}
            </div>
            <div className="text-sm text-gray-400">
              {totalReviews} opiniones
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter(r => r.rating === stars).length
              const percentage = (count / totalReviews) * 100
              
              return (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm w-12">{stars} ⭐</span>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-12 text-right">
                    {count}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/30 transition-colors"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < review.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-600'
                        }`} 
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                      ✓ Compra verificada
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">{review.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{review.user.name}</span>
                  <span>•</span>
                  <span>
                    {new Date(review.createdAt).toLocaleDateString('es-AR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <p className="text-gray-300 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* =============================================================================
   USO EN PRODUCT-CLIENT.TSX
   =============================================================================

import ProductReviews from '@/components/ProductReviews'

// En el componente ProductClient:
<ProductReviews 
  reviews={reviews}
  averageRating={product.rating}
  totalReviews={product.reviewCount}
/>

============================================================================= */