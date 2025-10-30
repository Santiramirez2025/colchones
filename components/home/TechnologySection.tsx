'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { TECHNOLOGIES } from '@/lib/product-data'

export function TechnologySection() {
  return (
    <section 
      className="py-20 md:py-32 bg-zinc-950 relative overflow-hidden"
      aria-labelledby="technology-heading"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,.02)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(139,92,246,.02)_1.5px,transparent_1.5px)] bg-[size:64px_64px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20 max-w-4xl mx-auto"
        >
          {/* Badge limpio */}
          <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 text-zinc-300 rounded-full text-xs font-semibold mb-6 uppercase tracking-widest">
            Control de calidad · Certificaciones europeas
          </span>

          {/* Título sin gradiente, más sobrio */}
          <h2 id="technology-heading" className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Tecnología comprobada,
            <br />
            <span className="text-white/80">no promesas</span>
          </h2>

          {/* Texto introductorio - NUEVO */}
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Trabajamos con laboratorios independientes para validar cada componente.
            No vendemos innovación: vendemos años de investigación aplicada
            al descanso real de más de 15.000 personas.
          </p>
        </motion.div>

        {/* Grid de tecnologías */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {TECHNOLOGIES.map((tech, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/5 hover:border-violet-500/20 hover:bg-zinc-900/70 transition-all duration-500"
            >
              <div className="flex items-start gap-4 md:gap-6">
                {/* Icono */}
                <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <tech.icon className="w-7 h-7 md:w-8 md:h-8 text-white" aria-hidden="true" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Título técnico */}
                  <h3 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-violet-300 transition-colors">
                    {tech.title}
                  </h3>

                  {/* Descripción */}
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-4">
                    {tech.description}
                  </p>

                  {/* Badge certificación - MEJORADO */}
                  <div className="flex items-start gap-2 px-4 py-2.5 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-xs text-zinc-300 font-medium leading-relaxed">
                      {tech.specs}
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer de confianza - NUEVO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-20 pt-12 border-t border-white/5 text-center"
        >
          <p className="text-zinc-500 text-sm max-w-2xl mx-auto">
            Todas las tecnologías cumplen normativas europeas de seguridad, emisiones y durabilidad. 
            Cada material pasa controles de calidad antes, durante y después de la fabricación.
          </p>
        </motion.div>
      </div>
    </section>
  )
}