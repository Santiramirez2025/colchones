import { ProductForm } from '@/components/admin/ProductForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { variants: true },
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' },
    }),
  ])

  if (!product) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Editar Producto</h1>
        <p className="text-zinc-400 mt-2">{product.name}</p>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  )
}