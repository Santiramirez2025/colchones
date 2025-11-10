import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  })

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-500/10 text-yellow-500',
    PROCESSING: 'bg-blue-500/10 text-blue-500',
    SHIPPED: 'bg-purple-500/10 text-purple-500',
    DELIVERED: 'bg-green-500/10 text-green-500',
    CANCELLED: 'bg-red-500/10 text-red-500',
    REFUNDED: 'bg-zinc-500/10 text-zinc-400',
  }

  const statusLabels: Record<string, string> = {
    PENDING: 'Pendiente',
    PROCESSING: 'Procesando',
    SHIPPED: 'Enviado',
    DELIVERED: 'Entregado',
    CANCELLED: 'Cancelado',
    REFUNDED: 'Reembolsado',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Pedidos</h1>
          <p className="text-zinc-400 mt-2">Gestiona todos los pedidos de la tienda</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-zinc-400">Total de pedidos</p>
          <p className="text-3xl font-bold text-white">{orders.length}</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400 text-lg">No hay pedidos aún</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800/50 border-b border-zinc-800">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Número
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Cliente
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Fecha
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Total
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Estado
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-zinc-800/30">
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">#{order.orderNumber}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{order.shippingName}</p>
                      <p className="text-sm text-zinc-400">{order.user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">
                      {new Date(order.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {new Date(order.createdAt).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-white">€{order.total.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColors[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/pedidos/${order.id}`}
                      className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block"
                    >
                      Ver Detalle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}