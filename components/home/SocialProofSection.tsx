'use client'

import { motion } from 'framer-motion'
import { Star, CheckCircle2 } from 'lucide-react'
import { AnimatedCounter } from '../AnimatedCounter'
import { SOCIAL_PROOF } from '@/lib/product-data'

export function SocialProofSection() {
  return (
    <section 
      className="py-20 bg-zinc-900 relative overflow-hidden"
      aria-labelledby="social-proof-heading"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 id="social-proof-heading" className="text-4xl md:text-5xl font-black text-white mb-4">
            Miles de clientes duermen mejor
          </h2>
          <p className="text-zinc-400 text-lg">
            Opiniones verificadas de clientes reales
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SOCIAL_PROOF.reviews.map((review, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center gap-1 mb-3" role="img" aria-label={`Valoración: ${review.rating} de 5 estrellas`}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-zinc-300 mb-4 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-sm">{review.name}</p>
                  <p className="text-zinc-500 text-xs">{review.location}</p>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-emerald-400 text-xs">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span className="font-medium">Verificado</span>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Stats with animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
          {SOCIAL_PROOF.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                <AnimatedCounter 
                  value={stat.value} 
                  decimal={stat.decimal} 
                  suffix={stat.suffix} 
                />
              </div>
              <p className="text-zinc-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}