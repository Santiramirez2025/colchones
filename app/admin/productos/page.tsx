import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { DeleteProductButton } from '@/components/admin/DeleteProductButton'

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
      _count: {
        select: { variants: true },
      },
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Productos</h1>
          <p className="text-zinc-400 mt-2">Gestiona el catálogo de productos</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          + Nuevo Producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-400 text-lg mb-4">No hay productos aún</p>
          <Link
            href="/admin/productos/nuevo"
            className="text-violet-400 hover:text-violet-300 font-medium"
          >
            Crear el primer producto →
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800/50 border-b border-zinc-800">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Producto
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Precio
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Stock
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Estado
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-zinc-400">
                  Variantes
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-zinc-400">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-800/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-800">
                        <Image
                          src={product.image || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-sm text-zinc-400">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-white">€{product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-zinc-400 line-through">
                        €{product.originalPrice}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <p className={`font-medium ${product.stock < 10 ? 'text-red-400' : 'text-white'}`}>
                      {product.stock}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.isActive
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-zinc-700 text-zinc-400'
                      }`}
                    >
                      {product.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-zinc-400">{product._count.variants}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/productos/${product.id}`}
                        className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Editar
                      </Link>
                      <DeleteProductButton productId={product.id} />
                    </div>
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