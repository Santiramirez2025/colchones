'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { COMPOSITION_LAYERS, HERO_PRODUCT } from '@/lib/product-data'

export function CompositionSection() {
  return (
    <section 
      id="composicion" 
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
      aria-labelledby="composition-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header - RESPONSIVE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 id="composition-heading" className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-3 md:mb-4 tracking-tight leading-[1.1]">
            Anatomía de
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              32 centímetros
            </span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg font-light px-4">
            15 capas independientes. Una sola misión: adaptarse a ti.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto items-center">
          {/* Left - IMAGEN PROTAGONISTA - RESPONSIVE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative order-1"
          >
            {/* Glow effect sutil */}
            <div className="absolute -inset-4 md:-inset-8 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20 blur-[80px] md:blur-[100px] rounded-full" aria-hidden="true" />
            
            <div className="relative">
              {/* Imagen del corte - ASPECT RATIO ADAPTATIVO */}
              <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
                <Image 
                  src={HERO_PRODUCT.images.composition}
                  alt="Anatomía del colchón - 15 capas de materiales certificados"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 60vw"
                  quality={95}
                  priority
                  placeholder="blur"
                  blurDataURL={HERO_PRODUCT.images.blurDataURL}
                />
                
                {/* Gradient sutil solo abajo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Stats flotantes - RESPONSIVE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 md:-bottom-6 left-4 right-4 md:left-8 md:right-8 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl"
              >
                <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
                  <div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-0.5 md:mb-1">15</div>
                    <div className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest">Capas</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-0.5 md:mb-1">32</div>
                    <div className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest">cm</div>
                  </div>
                  <div>
                    <div className="text-3xl md:text-4xl font-black text-white mb-0.5 md:mb-1">1.8K</div>
                    <div className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest">Muelles</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - CAPAS IMPORTANTES - RESPONSIVE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-3 md:space-y-4 order-2 mt-8 lg:mt-0"
          >
            {/* Mostrar solo las 5 capas más relevantes */}
            {COMPOSITION_LAYERS.filter(layer => 
              [1, 4, 8, 12, 15].includes(layer.num)
            ).map((layer, i) => (
              <motion.div
                key={layer.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="group bg-zinc-900/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/5 hover:border-violet-500/20 hover:bg-zinc-900/60 transition-all duration-500"
              >
                <div className="flex items-start gap-3 md:gap-5">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-black text-sm md:text-base shadow-lg shadow-violet-500/30">
                    {layer.num}
                  </div>
                  <div className="flex-1 pt-0.5 md:pt-1">
                    <h3 className="text-white font-bold text-sm md:text-base mb-1 md:mb-2 group-hover:text-violet-300 transition-colors">
                      {layer.name}
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Badge de certificación - RESPONSIVE */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="pt-4 md:pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-zinc-500 text-[11px] md:text-xs"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Certificado Oeko-Tex Standard 100</span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 sm:hidden" />
                <span>Fabricado en España</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}