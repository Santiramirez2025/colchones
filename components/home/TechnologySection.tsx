'use client'

import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { TECHNOLOGIES } from '@/lib/product-data'

export function TechnologySection() {
  return (
    <section 
      className="py-32 bg-zinc-950 relative overflow-hidden"
      aria-labelledby="technology-heading"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-fuchsia-500/10 to-violet-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
            Materiales certificados
          </span>
          <h2 id="technology-heading" className="text-5xl md:text-6xl font-black text-white mb-6">
            Tecnologías que marcan
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              la diferencia
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {TECHNOLOGIES.map((tech, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl rounded-3xl p-8 border border-white/5 hover:border-violet-500/30 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <tech.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-violet-400 transition-colors">
                    {tech.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed mb-4">
                    {tech.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                    <Info className="w-4 h-4 text-violet-400" aria-hidden="true" />
                    <span className="text-xs text-zinc-300 font-medium">{tech.specs}</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}