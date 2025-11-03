'use client'

import { useAuth } from '@/lib/firebase/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Icons = {
  ArrowLeft: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  Bell: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Mail: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
}

export default function ConfiguracionPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  
  const [preferences, setPreferences] = useState({
    newsletter: true,
    notifications: true,
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/mi-cuenta/configuracion')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      setPreferences({
        newsletter: user.newsletter ?? true,
        notifications: user.notifications ?? true,
      })
    }
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    
    try {
      const response = await fetch('/api/user/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          ...preferences,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Error saving preferences:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (confirm('¿Estás seguro? Esta acción no se puede deshacer.')) {
      // Aquí iría la lógica de eliminación
      alert('Funcionalidad de eliminación de cuenta (próximamente)')
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-3xl">
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
            Configuración
          </h1>
          <p className="text-zinc-400">
            Personaliza tu experiencia
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm">
            ✅ Preferencias guardadas correctamente
          </div>
        )}

        {/* Notifications */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Notificaciones</h2>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition">
              <div className="flex items-center gap-3">
                <Icons.Mail className="w-5 h-5 text-violet-400" />
                <div>
                  <div className="font-semibold text-white">Newsletter</div>
                  <div className="text-sm text-zinc-400">Recibe ofertas y novedades</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.newsletter}
                onChange={(e) => setPreferences({ ...preferences, newsletter: e.target.checked })}
                className="w-5 h-5 rounded bg-white/5 border-white/10 text-violet-600 focus:ring-violet-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition">
              <div className="flex items-center gap-3">
                <Icons.Bell className="w-5 h-5 text-violet-400" />
                <div>
                  <div className="font-semibold text-white">Notificaciones de pedidos</div>
                  <div className="text-sm text-zinc-400">Estado de tus envíos</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                className="w-5 h-5 rounded bg-white/5 border-white/10 text-violet-600 focus:ring-violet-500"
              />
            </label>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full mt-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:scale-[1.02] transition disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Preferencias'}
          </button>
        </div>

        {/* Account Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Información de la cuenta</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-400">Email</span>
              <span className="text-white font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Miembro desde</span>
              <span className="text-white font-medium">
                {new Date(user.createdAt).toLocaleDateString('es-ES', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-red-400 mb-4">Zona de peligro</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Una vez eliminada tu cuenta, no hay vuelta atrás. Por favor, ten cuidado.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-6 py-3 bg-red-600/20 border border-red-500/30 text-red-400 font-semibold rounded-xl hover:bg-red-600/30 transition"
          >
            Eliminar mi cuenta
          </button>
        </div>
      </div>
    </div>
  )
}