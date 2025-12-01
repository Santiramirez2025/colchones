import React, { RefObject } from 'react'
import { motion, MotionValue } from 'framer-motion'
import { Sparkles, Award, Star, TrendingUp, ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  heroRef: RefObject<HTMLDivElement>
  heroY: MotionValue<string>
  heroOpacity: MotionValue<number>
  heroScale: MotionValue<number>
  scrollToProducts: () => void
  avgPrice: number
}

export default function HeroSection({ 
  heroRef, 
  heroY, 
  heroOpacity, 
  heroScale, 
  scrollToProducts,
  avgPrice 
}: HeroSectionProps) {
  return (
    <motion.section 
      ref={heroRef}
      style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950"
    >
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse delay-700" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 backdrop-blur-sm mb-8 group hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Ofertas de luiquidacion 2025
            </span>
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
          </div>

          {/* Main Title - Modern Typography */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="block bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-2xl">
            Tu descanso 
            </span>
            <span className="block mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            merece lo mejor
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
          Una selección <span className="text-white font-semibold">exclusiva</span> de colchones y productos
          </p>

          {/* CTA Button - Centered */}
          <div className="flex justify-center items-center mb-16">
            <button
              onClick={scrollToProducts}
              className="group relative px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl font-semibold text-white text-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg shadow-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/60"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explorar Catálogo
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 border-2 border-zinc-700 rounded-full p-1">
          <div className="w-1.5 h-3 bg-violet-400 rounded-full animate-scroll" />
        </div>
        <span className="text-xs text-zinc-500 font-medium">Desliza</span>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </motion.section>
  )
}