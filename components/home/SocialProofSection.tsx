'use client'

import { motion } from 'framer-motion'
import { Star, CheckCircle2 } from 'lucide-react'
import { AnimatedCounter } from '../AnimatedCounter'

const SOCIAL_PROOF = {
  reviews: [
    {
      rating: 5,
      text: "Llevo 3 meses y se acabaron los dolores de espalda. Mi fisio me preguntó qué había cambiado.",
      name: "Laura M.",
      location: "Barcelona",
      verified: true
    },
    {
      rating: 5,
      text: "Los materiales se notan al tacto. Es una inversión que merece la pena.",
      name: "Javier R.",
      location: "Madrid",
      verified: true
    },
    {
      rating: 5,
      text: "Duermo del tirón por primera vez en años. Despertar descansada ya no es un lujo.",
      name: "Carmen L.",
      location: "Valencia",
      verified: true
    }
  ],
  stats: [
    {
      value: 15000,
      suffix: "+",
      label: "clientes satisfechos"
    },
    {
      value: 4.9,
      suffix: "/5",
      label: "valoración media",
      decimal: true
    },
    {
      value: 96,
      suffix: "%",
      label: "lo recomendaría"
    }
  ]
}

export function SocialProofSection() {
  return (
    <section 
      className="py-20 bg-zinc-950 relative overflow-hidden"
      aria-labelledby="social-proof-heading"
    >
      {/* Single subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/30 to-zinc-950" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header - ÚNICO Y DIRECTO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="social-proof-heading" className="text-4xl md:text-5xl font-black text-white mb-3">
            +15.000 personas confían en nosotros
          </h2>
          <p className="text-zinc-400 text-lg">
            Reseñas verificadas de clientes reales
          </p>
        </motion.div>

        {/* Reviews Grid - SOLO 3 */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {SOCIAL_PROOF.reviews.map((review, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3" role="img" aria-label={`${review.rating} estrellas`}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                ))}
              </div>

              {/* Text - MÁS CORTO */}
              <p className="text-zinc-300 mb-4 text-sm leading-relaxed">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="text-white font-semibold">{review.name}</span>
                  <span className="text-zinc-500 ml-1">· {review.location}</span>
                </div>
                {review.verified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Stats - INLINE, SIN DESTACAR */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 max-w-3xl mx-auto">
          {SOCIAL_PROOF.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black text-white mb-1">
                <AnimatedCounter 
                  value={stat.value} 
                  decimal={stat.decimal} 
                  suffix={stat.suffix} 
                />
              </div>
              <p className="text-zinc-500 text-xs uppercase tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}