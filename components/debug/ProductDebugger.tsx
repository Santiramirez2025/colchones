// components/debug/ProductDebugger.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, Image as ImageIcon, AlertCircle, CheckCircle } from 'lucide-react'

interface ProductDebuggerProps {
  products: any[]
}

export function ProductDebugger({ products }: ProductDebuggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(0)

  if (!products || products.length === 0) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500/90 backdrop-blur-xl border border-red-300 rounded-lg p-4 z-50">
        <p className="text-white font-bold">⚠️ No products loaded</p>
      </div>
    )
  }

  const product = products[selectedProduct]
  const hasImages = product.images && Array.isArray(product.images) && product.images.length > 0

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 font-bold"
      >
        <ImageIcon className="w-4 h-4" />
        Debug Products
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {/* Debug Panel */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-96 max-h-[600px] overflow-y-auto bg-zinc-900 border border-white/20 rounded-lg shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-zinc-800 border-b border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-bold">Product Debugger</h3>
              <span className={`px-2 py-1 rounded text-xs font-bold ${
                hasImages ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {hasImages ? <CheckCircle className="w-3 h-3 inline" /> : <AlertCircle className="w-3 h-3 inline" />}
                {' '}
                {hasImages ? 'Images OK' : 'No Images'}
              </span>
            </div>

            {/* Product Selector */}
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(Number(e.target.value))}
              className="w-full bg-zinc-700 text-white rounded px-3 py-2 text-sm"
            >
              {products.map((p, i) => (
                <option key={i} value={i}>
                  {p.name} ({p.images?.length || 0} images)
                </option>
              ))}
            </select>
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-4">
            {/* Basic Info */}
            <div className="bg-zinc-800 rounded-lg p-3 space-y-2">
              <h4 className="text-white font-bold text-sm mb-2">Basic Info</h4>
              <div className="text-xs space-y-1">
                <p className="text-zinc-400">Name: <span className="text-white">{product.name}</span></p>
                <p className="text-zinc-400">Slug: <span className="text-white">{product.slug}</span></p>
                <p className="text-zinc-400">Price: <span className="text-white">{product.price}€</span></p>
              </div>
            </div>

            {/* Images Debug */}
            <div className="bg-zinc-800 rounded-lg p-3">
              <h4 className="text-white font-bold text-sm mb-2">Images Debug</h4>
              
              <div className="space-y-2 text-xs">
                <p className="text-zinc-400">
                  Type: <span className="text-cyan-400">{typeof product.images}</span>
                </p>
                <p className="text-zinc-400">
                  Is Array: <span className="text-cyan-400">{String(Array.isArray(product.images))}</span>
                </p>
                <p className="text-zinc-400">
                  Length: <span className="text-cyan-400">{product.images?.length || 0}</span>
                </p>
              </div>

              {/* Show raw data */}
              {product.images && (
                <div className="mt-3">
                  <p className="text-zinc-400 text-xs mb-1">Raw Data:</p>
                  <pre className="bg-zinc-900 rounded p-2 text-[10px] text-green-400 overflow-x-auto">
                    {JSON.stringify(product.images, null, 2)}
                  </pre>
                </div>
              )}

              {/* Image Previews */}
              {hasImages && (
                <div className="mt-3">
                  <p className="text-zinc-400 text-xs mb-2">Preview:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {product.images.slice(0, 4).map((img: string, i: number) => (
                      <div key={i} className="relative aspect-video bg-zinc-900 rounded overflow-hidden">
                        <Image
                          src={img}
                          alt={`${product.name} ${i + 1}`}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', img)
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1 py-0.5">
                          <p className="text-[8px] text-white truncate">{img}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Arrays */}
            <div className="bg-zinc-800 rounded-lg p-3 space-y-2">
              <h4 className="text-white font-bold text-sm mb-2">Other Arrays</h4>
              <div className="text-xs space-y-1">
                <p className="text-zinc-400">
                  Features: <span className="text-white">{product.features?.length || 0}</span>
                </p>
                <p className="text-zinc-400">
                  Tech Features: <span className="text-white">{product.techFeatures?.length || 0}</span>
                </p>
                <p className="text-zinc-400">
                  Highlights: <span className="text-white">{product.highlights?.length || 0}</span>
                </p>
                <p className="text-zinc-400">
                  Materials: <span className="text-white">{product.materials?.length || 0}</span>
                </p>
              </div>
            </div>

            {/* Algorithm Values */}
            <div className="bg-zinc-800 rounded-lg p-3 space-y-2">
              <h4 className="text-white font-bold text-sm mb-2">Algorithm Values</h4>
              <div className="text-xs space-y-1">
                <p className="text-zinc-400">
                  Firmness: <span className="text-white">{product.firmnessValue}</span>
                </p>
                <p className="text-zinc-400">
                  Transpirability: <span className="text-white">{product.transpirability}</span>
                </p>
                <p className="text-zinc-400">
                  Height: <span className="text-white">{product.height}cm</span>
                </p>
                <p className="text-zinc-400">
                  Cooling: <span className="text-white">{String(product.cooling)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}