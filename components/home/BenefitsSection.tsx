'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function BenefitsSection() {
  return (
    <section 
      className="py-32 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Card 1: Entrega Segura */}
          <motion.article
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group"
          >
            <div className="relative h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/5 hover:border-white/10 transition-all duration-500">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              <div className="relative z-10 p-10">
                <p className="text-zinc-400 text-sm font-semibold tracking-wider uppercase mb-3">
                  De fábrica a tu casa
                </p>
                
                <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  Entrega segura
                </h3>

                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/colchon-enrollado.jpg"
                    alt="Colchón enrollado para transporte seguro"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <p className="text-zinc-300 text-lg leading-relaxed">
                  Nuestros colchones <span className="text-white font-bold">son enviados enrollados y al vacío</span> para garantizar un transporte eficiente y seguro. Asegurando una higiene superior, ya que están totalmente aislados de agentes externos.
                </p>
              </div>
            </div>
          </motion.article>

          {/* Card 2: Tipo de Cama */}
          <motion.article
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group"
          >
            <div className="relative h-full bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/5 hover:border-white/10 transition-all duration-500">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              <div className="relative z-10 p-10">
                <p className="text-zinc-400 text-sm font-semibold tracking-wider uppercase mb-3">
                  Qué tipo de cama es ideal
                </p>
                
                <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Beneficios de nuestros colchones
                </h3>

                <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/capas.jpg"
                    alt="Familia disfrutando en la cama con su colchón"
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                </div>

                <p className="text-zinc-300 text-lg leading-relaxed">
                Cada muelle se adapta y amolda a la perfección a cada uno de los puntos de presión generados por el cuerpo. Mejora la posición de tu columna y favorece la circulación sanguínea, previniendo los habituales dolores de espalda.
                </p>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}