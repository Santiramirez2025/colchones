'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) {
      return
    }

    setDeleting(true)
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Error al eliminar')

      router.refresh()
    } catch (error) {
      console.error('Error:', error)
      alert('Error al eliminar el producto')
      setDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
    >
      {deleting ? 'Eliminando...' : 'Eliminar'}
    </button>
  )
}