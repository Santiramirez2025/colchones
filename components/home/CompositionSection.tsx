'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { COMPOSITION_LAYERS, HERO_PRODUCT } from '@/lib/product-data'

export function CompositionSection() {
  return (
    <section 
      id="composicion" 
      className="py-32 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden"
      aria-labelledby="composition-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 text-violet-400 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
            Tecnología Multisac®
          </span>
          <h2 id="composition-heading" className="text-5xl md:text-6xl font-black text-white mb-6">
            15 capas de
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              ingeniería del sueño
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Cada capa ha sido diseñada para ofrecerte el mejor descanso posible
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
          {/* Left - Layers diagram */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image 
                  src={HERO_PRODUCT.images.composition}
                  alt="Composición del colchón - 15 capas premium de materiales certificados"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={80}
                  placeholder="blur"
                  blurDataURL={HERO_PRODUCT.images.blurDataURL}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent rounded-3xl pointer-events-none" />
              
              {/* Floating info */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-black text-white">15</div>
                    <div className="text-white/60 text-xs">Capas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">32cm</div>
                    <div className="text-white/60 text-xs">Altura</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">1.800</div>
                    <div className="text-white/60 text-xs">Muelles</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Layers list */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-3"
          >
            <div className="max-h-[700px] overflow-y-auto pr-4 space-y-3 custom-scrollbar">
              {COMPOSITION_LAYERS.map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl rounded-xl p-4 border border-white/5 hover:border-violet-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-black text-sm">
                      {layer.num}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-sm mb-1 group-hover:text-violet-400 transition-colors">
                        {layer.name}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(139, 92, 246), rgb(236, 72, 153));
          border-radius: 10px;
        }
      `}</style>
    </section>
  )
}