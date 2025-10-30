'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { COMPOSITION_LAYERS, HERO_PRODUCT } from '@/lib/product-data'

/**
 * CompositionSection - Sección de anatomía del colchón optimizada
 * 
 * Mejoras implementadas:
 * ✅ Mobile-first responsive (360px → 1440px+)
 * ✅ Performance: useReducedMotion, lazy loading optimizado
 * ✅ Accesibilidad: ARIA completo, roles semánticos, contraste WCAG AA
 * ✅ SEO: Structured data, jerarquía H2→H3, alt descriptivos
 * ✅ Core Web Vitals: Reducción CLS, optimización animaciones
 * ✅ UX: Microinteracciones sutiles, jerarquía visual clara
 */

export function CompositionSection() {
  const shouldReduceMotion = useReducedMotion()

  // Variantes de animación optimizadas
  const fadeInUp = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: shouldReduceMotion ? 0.01 : 0.6, ease: [0.4, 0, 0.2, 1] }
  }

  const fadeInScale = {
    initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: shouldReduceMotion ? 0.01 : 0.8, ease: [0.4, 0, 0.2, 1] }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08
      }
    }
  }

  // Capas organizadas por zonas funcionales (usando todas las capas directamente)
  const layersByZone = {
    confort: [COMPOSITION_LAYERS[0], COMPOSITION_LAYERS[1]], // Capas 1-2: Muelles + Fibras
    adaptacion: [COMPOSITION_LAYERS[2]], // Capa 3: Látex
    soporte: [COMPOSITION_LAYERS[3], COMPOSITION_LAYERS[4]] // Capas 4-5: HR + Multisac
  }

  return (
    <>
      {/* JSON-LD Structured Data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: HERO_PRODUCT.name,
            description: 'Colchón de 32cm con 15 capas certificadas y 1.800 muelles ensacados',
            material: 'Látex, Viscosa, Winesoja',
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Número de capas',
                value: '15'
              },
              {
                '@type': 'PropertyValue',
                name: 'Altura total',
                value: '32',
                unitText: 'cm'
              },
              {
                '@type': 'PropertyValue',
                name: 'Número de muelles',
                value: '1800'
              },
              {
                '@type': 'PropertyValue',
                name: 'Certificación',
                value: 'Oeko-Tex Standard 100'
              }
            ]
          })
        }}
      />

      <section 
        id="composicion" 
        className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"
        aria-labelledby="composition-heading"
        // Padding responsive mobile-first
        style={{
          paddingTop: 'clamp(4rem, 8vw, 8rem)',
          paddingBottom: 'clamp(4rem, 8vw, 8rem)'
        }}
      >
        {/* Background gradient - Reducido blur para performance */}
        <div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent pointer-events-none" 
          aria-hidden="true"
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header - Responsive optimizado */}
          <motion.header
            {...fadeInUp}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto"
          >
            <h2 
              id="composition-heading" 
              className="font-black text-white mb-3 sm:mb-4 tracking-tight leading-[1.1]"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4.5rem)'
              }}
            >
              Anatomía de
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                32 centímetros
              </span>
            </h2>
            <p 
              className="text-zinc-400 font-light max-w-2xl mx-auto"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
              }}
            >
              15 capas independientes. Una sola misión: adaptarse a ti.
            </p>
          </motion.header>

          <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-8 sm:gap-12 lg:gap-16 max-w-7xl mx-auto items-center">
            
            {/* IMAGEN PRINCIPAL - Optimización CLS y Performance */}
            <motion.figure
              {...fadeInScale}
              viewport={{ once: true, margin: "-50px" }}
              className="relative order-1"
              role="img"
              aria-label="Corte transversal del colchón mostrando las 15 capas de materiales certificados"
            >
              {/* Glow effect - Reducido blur de 100px a 60px para performance */}
              <div 
                className="absolute -inset-4 sm:-inset-8 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-cyan-600/20 rounded-full pointer-events-none"
                style={{ filter: 'blur(60px)' }}
                aria-hidden="true"
              />
              
              <div className="relative">
                {/* Imagen del corte - Aspect ratio fijo para evitar CLS */}
                <div 
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
                  style={{
                    aspectRatio: 'clamp(0.75, 1, 0.8)' // Responsive aspect ratio
                  }}
                >
                  <Image 
                    src={HERO_PRODUCT.images.composition}
                    alt="Anatomía detallada del colchón Premium Multisac: 15 capas certificadas incluyendo tejido viscosa, látex 65kg/m³, winesoja sostenible y 1.800 micromuelles ensacados para máximo confort"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 60vw"
                    quality={90} // Reducido de 95 a 90 para mejor LCP
                    priority
                    placeholder="blur"
                    blurDataURL={HERO_PRODUCT.images.blurDataURL}
                    loading="eager" // Critical image
                  />
                  
                  {/* Gradient overlay sutil */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" 
                    aria-hidden="true"
                  />
                </div>

                {/* Stats flotantes - Optimizado para mobile */}
                <motion.aside
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: 0.6 }}
                  className="absolute -bottom-4 sm:-bottom-6 left-4 right-4 sm:left-8 sm:right-8 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl shadow-2xl"
                  style={{
                    padding: 'clamp(1rem, 3vw, 1.5rem)'
                  }}
                  role="complementary"
                  aria-label="Especificaciones técnicas del colchón"
                >
                  <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
                    <div>
                      <div 
                        className="font-black text-white mb-0.5 sm:mb-1"
                        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
                      >
                        15
                      </div>
                      <div 
                        className="text-white/50 uppercase tracking-widest"
                        style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}
                      >
                        Capas
                      </div>
                    </div>
                    <div>
                      <div 
                        className="font-black text-white mb-0.5 sm:mb-1"
                        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
                      >
                        32
                      </div>
                      <div 
                        className="text-white/50 uppercase tracking-widest"
                        style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}
                      >
                        cm
                      </div>
                    </div>
                    <div>
                      <div 
                        className="font-black text-white mb-0.5 sm:mb-1"
                        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
                      >
                        1.8K
                      </div>
                      <div 
                        className="text-white/50 uppercase tracking-widest"
                        style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}
                      >
                        Muelles
                      </div>
                    </div>
                  </div>
                </motion.aside>
              </div>
            </motion.figure>

            {/* LISTADO DE CAPAS - Diseño innovador con agrupación visual */}
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 mt-8 lg:mt-0 space-y-6 sm:space-y-8"
              role="list"
              aria-label="Capas principales del colchón"
            >
              {/* Grupo 1: Capas superiores (Confort) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
                  <span className="text-violet-400 text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 bg-violet-500/10 rounded-full border border-violet-500/20">
                    Innovación Superior
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
                </div>
                
                {layersByZone.confort.map((layer) => (
                  <motion.article
                    key={layer.num}
                    variants={fadeInUp}
                    className="group bg-zinc-900/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/5 hover:border-violet-500/30 hover:bg-zinc-900/60 transition-all duration-300 will-change-transform"
                    style={{
                      padding: 'clamp(1rem, 3vw, 1.5rem)'
                    }}
                    role="listitem"
                    whileHover={{ 
                      scale: shouldReduceMotion ? 1 : 1.02,
                      x: shouldReduceMotion ? 0 : 4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-start gap-3 sm:gap-5">
                      <div 
                        className="flex-shrink-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-black shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow"
                        style={{
                          width: 'clamp(2.5rem, 6vw, 3rem)',
                          height: 'clamp(2.5rem, 6vw, 3rem)',
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                        aria-label={`Capa número ${layer.num}`}
                      >
                        {layer.num}
                      </div>
                      
                      <div className="flex-1 pt-0.5 sm:pt-1">
                        <h3 
                          className="text-white font-bold mb-1 sm:mb-2 group-hover:text-violet-300 transition-colors"
                          style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                        >
                          {layer.name}
                        </h3>
                        <p 
                          className="text-zinc-400 leading-relaxed"
                          style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)' }}
                        >
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Grupo 2: Capa intermedia (Adaptación) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                  <span className="text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                    Capa de Adaptación
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                </div>
                
                {layersByZone.adaptacion.map((layer) => (
                  <motion.article
                    key={layer.num}
                    variants={fadeInUp}
                    className="group bg-zinc-900/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/5 hover:border-cyan-500/30 hover:bg-zinc-900/60 transition-all duration-300 will-change-transform"
                    style={{
                      padding: 'clamp(1rem, 3vw, 1.5rem)'
                    }}
                    role="listitem"
                    whileHover={{ 
                      scale: shouldReduceMotion ? 1 : 1.02,
                      x: shouldReduceMotion ? 0 : 4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-start gap-3 sm:gap-5">
                      <div 
                        className="flex-shrink-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-shadow"
                        style={{
                          width: 'clamp(2.5rem, 6vw, 3rem)',
                          height: 'clamp(2.5rem, 6vw, 3rem)',
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                        aria-label={`Capa número ${layer.num}`}
                      >
                        {layer.num}
                      </div>
                      
                      <div className="flex-1 pt-0.5 sm:pt-1">
                        <h3 
                          className="text-white font-bold mb-1 sm:mb-2 group-hover:text-cyan-300 transition-colors"
                          style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                        >
                          {layer.name}
                        </h3>
                        <p 
                          className="text-zinc-400 leading-relaxed"
                          style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)' }}
                        >
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Grupo 3: Capas inferiores (Soporte) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                  <span className="text-emerald-400 text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    Núcleo de Soporte
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                </div>
                
                {layersByZone.soporte.map((layer) => (
                  <motion.article
                    key={layer.num}
                    variants={fadeInUp}
                    className="group bg-zinc-900/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all duration-300 will-change-transform"
                    style={{
                      padding: 'clamp(1rem, 3vw, 1.5rem)'
                    }}
                    role="listitem"
                    whileHover={{ 
                      scale: shouldReduceMotion ? 1 : 1.02,
                      x: shouldReduceMotion ? 0 : 4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-start gap-3 sm:gap-5">
                      <div 
                        className="flex-shrink-0 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-shadow"
                        style={{
                          width: 'clamp(2.5rem, 6vw, 3rem)',
                          height: 'clamp(2.5rem, 6vw, 3rem)',
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                        aria-label={`Capa número ${layer.num}`}
                      >
                        {layer.num}
                      </div>
                      
                      <div className="flex-1 pt-0.5 sm:pt-1">
                        <h3 
                          className="text-white font-bold mb-1 sm:mb-2 group-hover:text-emerald-300 transition-colors"
                          style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                        >
                          {layer.name}
                        </h3>
                        <p 
                          className="text-zinc-400 leading-relaxed"
                          style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)' }}
                        >
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Trust Tips - Optimizado mobile/desktop */}
              <motion.footer
                variants={fadeInUp}
                className="pt-4 sm:pt-6 space-y-3"
                role="contentinfo"
                aria-label="Características premium del colchón"
              >
                {/* Tips principales - Siempre visibles */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-zinc-500" style={{ fontSize: 'clamp(0.6875rem, 1.5vw, 0.75rem)' }}>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full hover:bg-violet-500/15 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" aria-hidden="true" />
                    <span>Edición limitada</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full hover:bg-amber-500/15 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
                    <span>Calidad hotelera</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full hover:bg-cyan-500/15 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
                    <span>Normablock + Visco Air</span>
                  </div>
                </div>

                {/* Tips adicionales - Ocultos en mobile para evitar saturación */}
                <div className="hidden sm:flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-zinc-500" style={{ fontSize: 'clamp(0.6875rem, 1.5vw, 0.75rem)' }}>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full hover:bg-emerald-500/15 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                    <span>Acogida progresiva</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full hover:bg-blue-500/15 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
                    <span>Confort toda la noche</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full hover:bg-purple-500/15 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" aria-hidden="true" />
                    <span>Certificado Oeko-Tex</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full hover:bg-red-500/15 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" aria-hidden="true" />
                    <span>Fabricado en España</span>
                  </div>
                </div>
              </motion.footer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Estilos para animaciones optimizadas */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Optimización para reducir CLS */
        @supports (content-visibility: auto) {
          section {
            content-visibility: auto;
            contain-intrinsic-size: auto 800px;
          }
        }

        /* Respeto a preferencias de movimiento */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Optimización GPU para animaciones */
        .will-change-transform {
          will-change: transform;
        }

        /* Focus visible mejorado para a11y */
        :focus-visible {
          outline: 2px solid rgb(168 85 247);
          outline-offset: 4px;
          border-radius: 0.75rem;
        }
      `}</style>
    </>
  )
}