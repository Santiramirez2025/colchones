'use client'

import { useAuth } from '@/lib/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const Icons = {
  ArrowLeft: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  Package: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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
}

export default function PedidosPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/mi-cuenta/pedidos')
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
        .catch(() => setLoadingOrders(false))
    }
  }, [user])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    )
  }

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter)

  return (
    <div className="min-h-screen bg-zinc-950 py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
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
            Mis Pedidos
          </h1>
          <p className="text-zinc-400">
            {orders.length} pedido{orders.length !== 1 ? 's' : ''} en total
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: 'all', label: 'Todos' },
            { value: 'PROCESSING', label: 'En proceso' },
            { value: 'SHIPPED', label: 'Enviados' },
            { value: 'DELIVERED', label: 'Entregados' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition ${
                filter === f.value
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {loadingOrders ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-zinc-400">Cargando pedidos...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
            <Icons.Package className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 mb-6">
              {filter === 'all' ? 'No tienes pedidos aún' : 'No hay pedidos con este estado'}
            </p>
            <Link 
              href="/catalogo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl font-bold hover:scale-105 transition shadow-lg"
            >
              Explorar Catálogo
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING
              return (
                <Link
                  key={order.id}
                  href={`/mi-cuenta/pedidos/${order.orderNumber}`}
                  className="block p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all hover:scale-[1.01] group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-bold text-white text-xl mb-1 group-hover:text-violet-300 transition">
                        Pedido #{order.orderNumber}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {new Date(order.createdAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${statusConfig.bg} ${statusConfig.color} flex items-center gap-2`}>
                      {order.status === 'SHIPPED' && <Icons.Truck className="w-4 h-4" />}
                      {statusConfig.label}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-black text-white">
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
    </div>
  )
}