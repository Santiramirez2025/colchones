'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { OrderStatus } from '@prisma/client'

const statusOptions: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'PENDING', label: 'Pendiente', color: 'bg-yellow-500/10 text-yellow-500' },
  { value: 'PROCESSING', label: 'Procesando', color: 'bg-blue-500/10 text-blue-500' },
  { value: 'SHIPPED', label: 'Enviado', color: 'bg-purple-500/10 text-purple-500' },
  { value: 'DELIVERED', label: 'Entregado', color: 'bg-green-500/10 text-green-500' },
  { value: 'CANCELLED', label: 'Cancelado', color: 'bg-red-500/10 text-red-500' },
  { value: 'REFUNDED', label: 'Reembolsado', color: 'bg-zinc-500/10 text-zinc-400' },
]

interface OrderStatusUpdaterProps {
  orderId: string
  currentStatus: OrderStatus
}

export function OrderStatusUpdater({ orderId, currentStatus }: OrderStatusUpdaterProps) {
  const router = useRouter()
  const [status, setStatus] = useState<OrderStatus>(currentStatus)
  const [updating, setUpdating] = useState(false)

  const handleUpdate = async () => {
    if (status === currentStatus) return

    setUpdating(true)
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) throw new Error('Error al actualizar')

      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert('Error al actualizar el estado')
      setStatus(currentStatus)
    } finally {
      setUpdating(false)
    }
  }

  const currentOption = statusOptions.find((opt) => opt.value === status)

  return (
    <div className="space-y-4">
      <div className={`px-4 py-3 rounded-lg text-center font-medium ${currentOption?.color}`}>
        {currentOption?.label}
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as OrderStatus)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {status !== currentStatus && (
        <button
          onClick={handleUpdate}
          disabled={updating}
          className="w-full bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {updating ? 'Actualizando...' : 'Actualizar Estado'}
        </button>
      )}
    </div>
  )
}