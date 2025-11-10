'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Product, ProductVariant, Category } from '@prisma/client'

type ProductWithVariants = Product & { variants: ProductVariant[] }

interface ProductFormProps {
  product?: ProductWithVariants | null
  categories: Category[]
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    subtitle: product?.subtitle || '',
    description: product?.description || '',
    price: product?.price || 0,
    originalPrice: product?.originalPrice || 0,
    stock: product?.stock || 100,
    image: product?.image || '',
    categoryId: product?.categoryId || '',
    isActive: product?.isActive ?? true,
    isFeatured: product?.isFeatured ?? false,
    isBestSeller: product?.isBestSeller ?? false,
    firmness: product?.firmness || 'MEDIA',
    height: product?.height || 25,
    warranty: product?.warranty || 10,
    trialNights: product?.trialNights || 100,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = product
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products'
      
      const method = product ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Error al guardar')
      }

      router.push('/admin/productos')
      router.refresh()
    } catch (error: any) {
      alert(error.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-6">
        
        {/* Información básica */}
        <div className="border-b border-zinc-800 pb-6">
          <h2 className="text-xl font-bold text-white mb-4">Información Básica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Nombre del producto *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="Ej: Colchón Premium Viscoelástico"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                placeholder="colchon-premium-viscoelastico"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Adaptabilidad perfecta y máximo confort"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Descripción detallada del producto..."
            />
          </div>
        </div>

        {/* Precios y Stock */}
        <div className="border-b border-zinc-800 pb-6">
          <h2 className="text-xl font-bold text-white mb-4">Precio y Stock</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Precio *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                step="0.01"
                min="0"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Precio Original
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="border-b border-zinc-800 pb-6">
          <h2 className="text-xl font-bold text-white mb-4">Características</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Firmeza
              </label>
              <select
                name="firmness"
                value={formData.firmness}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="SUAVE">Suave</option>
                <option value="MEDIA">Media</option>
                <option value="MEDIA_ALTA">Media-Alta</option>
                <option value="FIRME">Firme</option>
                <option value="EXTRA_FIRME">Extra Firme</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Altura (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                min="0"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Categoría
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Garantía (años)
              </label>
              <input
                type="number"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                min="0"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Noches de prueba
              </label>
              <input
                type="number"
                name="trialNights"
                value={formData.trialNights}
                onChange={handleChange}
                min="0"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div className="border-b border-zinc-800 pb-6">
          <h2 className="text-xl font-bold text-white mb-4">Imagen</h2>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              URL de la imagen *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
        </div>

        {/* Estados */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Estados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-violet-500 focus:ring-2 focus:ring-violet-500"
              />
              <span className="text-white">Producto activo</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-violet-500 focus:ring-2 focus:ring-violet-500"
              />
              <span className="text-white">Destacado</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="isBestSeller"
                checked={formData.isBestSeller}
                onChange={handleChange}
                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-violet-500 focus:ring-2 focus:ring-violet-500"
              />
              <span className="text-white">Más vendido</span>
            </label>
          </div>
        </div>

      </div>

      {/* Botones */}
      <div className="flex items-center gap-4 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {loading ? 'Guardando...' : product ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
        
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}