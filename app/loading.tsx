'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate progressive loading
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev
        return prev + Math.random() * 10
      })
    }, 200)

    return () => clearInterval(progressInterval)
  }, [])

  return (
    <div 
      className="min-h-screen w-full relative flex items-center justify-center bg-gradient-to-br from-zinc-950 via-purple-950/20 to-zinc-950 overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Cargando contenido"
    >
      {/* ========== ANIMATED BACKGROUND ========== */}
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-violet-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-[28rem] md:h-[28rem] bg-fuchsia-500/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[32rem] md:h-[32rem] bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* ===== LOGO ANIMATED ===== */}
          <div className="relative inline-block mb-8 md:mb-12">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-2xl opacity-50">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full animate-spin-slow" />
            </div>
            
            {/* Main Icon */}
            <div className="relative">
              <div className="text-7xl md:text-8xl lg:text-9xl animate-float-gentle filter drop-shadow-2xl">
                🛏️
              </div>
              
              {/* Rotating ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 border-2 border-violet-500/30 rounded-full animate-spin-slow" />
                <div className="absolute w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 border-2 border-fuchsia-500/20 rounded-full animate-spin-reverse" />
              </div>

              {/* Pulse rings */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 bg-violet-500/10 rounded-full animate-ping-slow" />
              </div>
            </div>
          </div>

          {/* ===== TEXT CONTENT ===== */}
          <div className="mb-8 md:mb-10 space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              Preparando tu
              <span className="block mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-shimmer">
                Experiencia Premium
              </span>
            </h1>
            
            <p className="text-sm md:text-base lg:text-lg text-zinc-400 max-w-md mx-auto leading-relaxed">
              Cargando la mejor selección de colchones viscoelásticos para tu descanso perfecto
            </p>
          </div>

          {/* ===== CIRCULAR PROGRESS ===== */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 md:mb-10">
            {/* Background circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-white/10"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="50%" stopColor="#e879f9" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Progress text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {Math.round(progress)}%
                </div>
                <div className="text-xs text-zinc-500 mt-1">Cargando</div>
              </div>
            </div>
          </div>

          {/* ===== LOADING DOTS ===== */}
          <div className="flex gap-2 justify-center mb-8" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-bounce-smooth"
                style={{
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>

          {/* ===== SKELETON PREVIEW CARDS ===== */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl overflow-hidden animate-pulse-gentle"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-slide" />
                
                {/* Card content */}
                <div className="aspect-square bg-white/5 mb-2" />
                <div className="p-2 md:p-3 space-y-1.5 md:space-y-2">
                  <div className="h-2 md:h-3 bg-white/10 rounded-full w-3/4" />
                  <div className="h-2 md:h-3 bg-white/10 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>

          {/* ===== STATUS TEXT ===== */}
          <div className="mt-8 md:mt-10">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs md:text-sm text-zinc-400 font-medium">
                Optimizando tu experiencia de compra
              </span>
            </div>
          </div>
        </div>

        {/* ===== ACCESSIBILITY ===== */}
        <span className="sr-only">
          Cargando Tienda Colchón. Progreso: {Math.round(progress)}%. Por favor espere.
        </span>
      </div>

      {/* ========== CSS ANIMATIONS ========== */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          33% { 
            transform: translate(30px, -30px) scale(1.1); 
          }
          66% { 
            transform: translate(-20px, 20px) scale(0.9); 
          }
        }

        @keyframes float-delayed {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          33% { 
            transform: translate(-30px, 30px) scale(1.1); 
          }
          66% { 
            transform: translate(20px, -20px) scale(0.9); 
          }
        }

        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-20px); 
          }
        }

        @keyframes pulse-slow {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.5; 
            transform: scale(1.05);
          }
        }

        @keyframes spin-slow {
          from { 
            transform: rotate(0deg); 
          }
          to { 
            transform: rotate(360deg); 
          }
        }

        @keyframes spin-reverse {
          from { 
            transform: rotate(360deg); 
          }
          to { 
            transform: rotate(0deg); 
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }

        @keyframes bounce-smooth {
          0%, 100% { 
            transform: translateY(0); 
            opacity: 1;
          }
          50% { 
            transform: translateY(-10px); 
            opacity: 0.7;
          }
        }

        @keyframes pulse-gentle {
          0%, 100% { 
            opacity: 0.6; 
          }
          50% { 
            opacity: 1; 
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes shimmer-slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes particle {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) scale(0);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-bounce-smooth {
          animation: bounce-smooth 1s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }

        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }

        .animate-shimmer-slide {
          animation: shimmer-slide 2s ease-in-out infinite;
        }

        .animate-particle {
          animation: particle linear infinite;
        }

        /* Reduce motion para accesibilidad */
        @media (prefers-reduced-motion: reduce) {
          .animate-float,
          .animate-float-delayed,
          .animate-float-gentle,
          .animate-pulse-slow,
          .animate-spin-slow,
          .animate-spin-reverse,
          .animate-ping-slow,
          .animate-bounce-smooth,
          .animate-pulse-gentle,
          .animate-shimmer,
          .animate-shimmer-slide,
          .animate-particle {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}