'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { BENEFITS } from '@/lib/product-data'

export function BenefitsSection() {
  return (
    <section 
      className="py-32 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 id="benefits-heading" className="text-5xl md:text-6xl font-black text-white mb-6">
            Compra con total
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              tranquilidad
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {BENEFITS.map((benefit, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/5 hover:border-white/10 transition-all duration-500">
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} text-white shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="w-8 h-8" aria-hidden="true" />
                  </div>

                  <h3 className="text-2xl font-black text-white mb-4 leading-tight">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-zinc-400 leading-relaxed mb-6">
                    {benefit.description}
                  </p>

                  <Link 
                    href={benefit.link}
                    className="inline-flex items-center text-violet-400 font-bold hover:text-violet-300 transition-colors group/link"
                    aria-label={`${benefit.cta} - ${benefit.title}`}
                  >
                    <span>{benefit.cta}</span>
                    <ChevronRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}