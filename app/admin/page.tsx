// admin/page.tsx CORREGIDO con manejo de errores de base de datos

import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

/**
 * Obtiene las estadísticas del dashboard con manejo de errores de conexión.
 */
async function getStats() {
  try {
    const [
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: 'CANCELLED' } },
      }),
    ])

    return {
      totalProducts,
      activeProducts,
      totalOrders,
      pendingOrders,
      totalRevenue: totalRevenue._sum.total || 0,
    }
  } catch (error) {
    // 🚨 Manejo de errores de Prisma/DB
    console.error('PRISMA STATS ERROR:', error)
    // Devolver valores por defecto/fallback para permitir que la página cargue
    return {
      totalProducts: 0,
      activeProducts: 0,
      totalOrders: 0,
      pendingOrders: 0,
      totalRevenue: 0,
      dbError: true, // Indicador de error para mostrar un mensaje en el dashboard
    }
  }
}

/**
 * Obtiene las órdenes recientes con manejo de errores de conexión.
 */
async function getRecentOrders() {
  try {
    return prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    })
  } catch (error) {
    // 🚨 Manejo de errores de Prisma/DB
    console.error('PRISMA ORDERS ERROR:', error)
    return null // Retornar null para indicar que no se pudo cargar
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentOrders = await getRecentOrders()
  
  // Determinar si hubo un error en la base de datos
  const dbError = (stats as any).dbError;

  const statCards = [
    {
      label: 'Productos Totales',
      value: stats.totalProducts,
      subtext: `${stats.activeProducts} activos`,
      icon: '🛏️',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Pedidos Totales',
      value: stats.totalOrders,
      subtext: `${stats.pendingOrders} pendientes`,
      icon: '📦',
      color: 'from-violet-500 to-purple-500',
    },
    {
      label: 'Ingresos Totales',
      value: `€${stats.totalRevenue.toFixed(2)}`,
      subtext: 'Todos los pedidos',
      icon: '💰',
      color: 'from-green-500 to-emerald-500',
    },
  ]

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-500/10 text-yellow-500',
    PROCESSING: 'bg-blue-500/10 text-blue-500',
    SHIPPED: 'bg-purple-500/10 text-purple-500',
    DELIVERED: 'bg-green-500/10 text-green-500',
    CANCELLED: 'bg-red-500/10 text-red-500',
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Vista general de tu tienda</p>
      </div>

      {dbError && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-semibold">
          🚨 Error de Conexión: No se pudieron cargar las estadísticas. Verifica tu servidor de base de datos o la configuración de Prisma.
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`text-4xl p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-zinc-400 text-sm mb-1">{stat.label}</p>
              {/* Manejo de valor en caso de error */}
              <p className="text-3xl font-bold text-white">
                {dbError ? 'N/A' : stat.value}
              </p>
              <p className="text-zinc-500 text-sm mt-1">{stat.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Pedidos Recientes</h2>
          <Link
            href="/admin/pedidos"
            className="text-violet-400 hover:text-violet-300 text-sm font-medium"
          >
            Ver todos →
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders === null ? (
            <p className="text-red-400 text-center py-8">No se pudieron cargar los pedidos debido a un error de base de datos.</p>
          ) : recentOrders.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">No hay pedidos aún</p>
          ) : (
            recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/pedidos/${order.id}`}
                className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <div className="flex-1">
                  {/* ... (resto del código de la orden) */}
                  <p className="font-medium text-white">#{order.orderNumber}</p>
                  <p className="text-sm text-zinc-400">{order.user.email}</p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-bold text-white">€{order.total.toFixed(2)}</p>
                  <p className="text-sm text-zinc-400">
                    {new Date(order.createdAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}