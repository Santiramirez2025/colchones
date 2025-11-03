'use client'

import { useAuth } from '@/lib/firebase/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

const Icons = {
  ArrowLeft: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  MapPin: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Home: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
}

export default function DireccionesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/mi-cuenta/direcciones')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  // Dirección predeterminada del perfil
  const defaultAddress = user.address ? {
    label: 'Dirección Principal',
    address: user.address,
    city: user.city || '',
    postalCode: user.postalCode || '',
    province: user.province || '',
    isDefault: true
  } : null

  return (
    <div className="min-h-screen bg-zinc-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/mi-cuenta"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition mb-4"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Volver</span>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            Mis Direcciones
          </h1>
          <p className="text-zinc-400">
            Gestiona tus direcciones de envío
          </p>
        </div>

        {/* Addresses */}
        {defaultAddress ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <Icons.Home className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">{defaultAddress.label}</div>
                  <div className="text-xs text-emerald-400 font-semibold">Predeterminada</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-1 text-zinc-300">
              <div>{defaultAddress.address}</div>
              <div>{defaultAddress.city}, {defaultAddress.postalCode}</div>
              <div>{defaultAddress.province}, España</div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <Link
                href="/mi-cuenta/perfil"
                className="text-violet-400 hover:text-violet-300 text-sm font-semibold transition"
              >
                Editar en Mi Perfil →
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
              <Icons.MapPin className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No tienes direcciones guardadas
            </h3>
            <p className="text-zinc-400 mb-6">
              Añade tu dirección en tu perfil para envíos más rápidos
            </p>
            <Link
              href="/mi-cuenta/perfil"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:scale-105 transition shadow-lg"
            >
              Ir a Mi Perfil
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}