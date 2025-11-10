import { ProductForm } from '@/components/admin/ProductForm'
import { prisma } from '@/lib/prisma'

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Nuevo Producto</h1>
        <p className="text-zinc-400 mt-2">Completa la información del producto</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  )
}