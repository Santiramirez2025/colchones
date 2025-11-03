'use client'

import { useAuth } from '@/lib/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Icons = {
  User: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Package: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Logout: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  Settings: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  MapPin: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Truck: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  PENDING: { label: 'Pendiente', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  PROCESSING: { label: 'Procesando', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  SHIPPED: { label: 'Enviado', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  DELIVERED: { label: 'Entregado', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  CANCELLED: { label: 'Cancelado', color: 'text-red-400', bg: 'bg-red-500/20' },
  REFUNDED: { label: 'Reembolsado', color: 'text-zinc-400', bg: 'bg-zinc-500/20' },
}

interface Order {
  id: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
  items: string
}

export default function MiCuentaPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/mi-cuenta')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetch(`/api/orders?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data.orders || [])
          setLoadingOrders(false)
        })
        .catch(err => {
          console.error('Error loading orders:', err)
          setLoadingOrders(false)
        })
    }
  }, [user])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-zinc-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            Mi Cuenta
          </h1>
          <p className="text-zinc-400">
            Hola <span className="text-white font-semibold">{user.name || user.email}</span> 👋
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2 sticky top-24">
              <Link 
                href="/mi-cuenta/perfil"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-zinc-300 hover:text-white group"
              >
                <Icons.User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Mi Perfil</span>
              </Link>
              
              <Link 
                href="/mi-cuenta/pedidos"
                className="flex items-center gap-3 p-3 rounded-xl bg-violet-500/10 text-violet-300 font-semibold"
              >
                <Icons.Package className="w-5 h-5" />
                <span>Mis Pedidos</span>
              </Link>

              <Link 
                href="/mi-cuenta/direcciones"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-zinc-300 hover:text-white group"
              >
                <Icons.MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Direcciones</span>
              </Link>

              <Link 
                href="/mi-cuenta/configuracion"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition text-zinc-300 hover:text-white group"
              >
                <Icons.Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Configuración</span>
              </Link>

              <div className="border-t border-white/10 pt-2 mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition text-red-400 hover:text-red-300 group"
                >
                  <Icons.Logout className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-2xl p-6">
                <div className="text-4xl font-black text-white mb-2">
                  {user.totalOrders}
                </div>
                <div className="text-sm text-zinc-300 font-medium">Pedidos realizados</div>
              </div>

              <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-2xl p-6">
                <div className="text-4xl font-black text-white mb-2">
                  {orders.filter(o => o.status === 'DELIVERED').length}
                </div>
                <div className="text-sm text-zinc-300 font-medium">Pedidos entregados</div>
              </div>

              <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-6">
                <div className="text-4xl font-black text-white mb-2">
                  €{user.totalSpent.toFixed(2)}
                </div>
                <div className="text-sm text-zinc-300 font-medium">Total invertido</div>
              </div>
            </div>

            {/* Orders Section */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Pedidos Recientes
                </h2>
                <Link 
                  href="/mi-cuenta/pedidos"
                  className="text-sm text-violet-400 hover:text-violet-300 font-semibold transition"
                >
                  Ver todos →
                </Link>
              </div>

              {loadingOrders ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-zinc-400">Cargando pedidos...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icons.Package className="w-10 h-10 text-zinc-600" />
                  </div>
                  <p className="text-zinc-400 mb-6 text-lg">
                    Aún no has realizado ningún pedido
                  </p>
                  <Link 
                    href="/catalogo"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:scale-105 transition shadow-lg shadow-violet-500/30"
                  >
                    <Icons.Package className="w-5 h-5" />
                    Explorar Catálogo
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => {
                    const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING
                    return (
                      <Link
                        key={order.id}
                        href={`/mi-cuenta/pedidos/${order.orderNumber}`}
                        className="block p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all hover:scale-[1.01] group"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-bold text-white text-lg mb-1 group-hover:text-violet-300 transition">
                              Pedido #{order.orderNumber}
                            </div>
                            <div className="text-sm text-zinc-400">
                              {new Date(order.createdAt).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusConfig.bg} ${statusConfig.color} flex items-center gap-1.5`}>
                            {order.status === 'SHIPPED' && <Icons.Truck className="w-3.5 h-3.5" />}
                            {statusConfig.label}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-black text-white">
                            €{order.total.toFixed(2)}
                          </div>
                          <span className="text-violet-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                            Ver detalles →
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}