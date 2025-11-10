import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { OrderStatusUpdater } from '@/components/admin/OrderStatusUpdater'
import { Metadata } from 'next'

// Definimos el tipo de props completo para Next.js App Router (esencial para la tipificación)
type OrderDetailPageProps = {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
  
  export default async function OrderDetailPage({
    params,
  }: OrderDetailPageProps) {
    const { id } = await params
    const order = await prisma.order.findUnique({
      where: { id },
    include: { user: true },
  })

  if (!order) {
    notFound()
  }

  // Se asume que order.items es un string JSON que se puede parsear
  const items = JSON.parse(order.items)

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Pedido #{order.orderNumber}</h1>
        <p className="text-zinc-400 mt-2">
          Realizado el {new Date(order.createdAt).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Productos */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Productos</h2>
            <div className="space-y-4">
              {items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 bg-zinc-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium text-white">{item.name}</p>
                    {item.variant && (
                      <p className="text-sm text-zinc-400">Tamaño: {item.variant}</p>
                    )}
                    <p className="text-sm text-zinc-400">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">€{item.price.toFixed(2)}</p>
                    <p className="text-sm text-zinc-400">
                      Total: €{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totales */}
            <div className="mt-6 pt-6 border-t border-zinc-800 space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>€{order.subtotal.toFixed(2)}</span>
              </div>
              {order.shipping > 0 && (
                <div className="flex justify-between text-zinc-400">
                  <span>Envío</span>
                  <span>€{order.shipping.toFixed(2)}</span>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Descuento</span>
                  <span>-€{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-zinc-800">
                <span>Total</span>
                <span>€{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Dirección de envío */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Dirección de Envío</h2>
            <div className="space-y-2 text-zinc-300">
              <p className="font-medium">{order.shippingName}</p>
              <p>{order.shippingAddress}</p>
              <p>
                {order.shippingCity}, {order.shippingProvince} {order.shippingPostal}
              </p>
              <p>{order.shippingCountry}</p>
              {order.shippingPhone && (
                <p className="mt-2">Tel: {order.shippingPhone}</p>
              )}
              {order.shippingEmail && (
                <p>Email: {order.shippingEmail}</p>
              )}
            </div>
          </div>

          {/* Notas */}
          {order.customerNotes && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Notas del Cliente</h2>
              <p className="text-zinc-300">{order.customerNotes}</p>
            </div>
          )}
        </div>

        {/* Columna lateral */}
        <div className="space-y-6">
          {/* Estado del pedido */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Estado del Pedido</h2>
            <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
          </div>

          {/* Información de pago */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Información de Pago</h2>
            <div className="space-y-3 text-sm">
              {order.paymentMethod && (
                <div>
                  <p className="text-zinc-400">Método de pago</p>
                  <p className="text-white font-medium">{order.paymentMethod}</p>
                </div>
              )}
              {order.paymentId && (
                <div>
                  <p className="text-zinc-400">ID de pago</p>
                  <p className="text-white font-mono text-xs">{order.paymentId}</p>
                </div>
              )}
              {order.paidAt && (
                <div>
                  <p className="text-zinc-400">Pagado el</p>
                  <p className="text-white">
                    {new Date(order.paidAt).toLocaleDateString('es-ES')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cliente */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Cliente</h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-zinc-400">Nombre</p>
                <p className="text-white">{order.user.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-zinc-400">Email</p>
                <p className="text-white">{order.user.email}</p>
              </div>
              <div>
                <p className="text-zinc-400">Total de pedidos</p>
                <p className="text-white">{order.user.totalOrders}</p>
              </div>
              <div>
                <p className="text-zinc-400">Total gastado</p>
                <p className="text-white">€{order.user.totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}