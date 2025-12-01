'use client'

import { useState, useRef, useMemo, useCallback } from 'react'
import { useScroll, useTransform, AnimatePresence, motion, MotionValue } from 'framer-motion'
// Importaciones de tipos y helpers
import { NormalizedProduct, CatalogoClientProps } from './components/types'

// Componentes modulares
import HeroSection from './components/HeroSection' 
import StickyBar from './components/StickyBar'
import ProductCard from './components/ProductCard'
import EmptyState from './components/EmptyState'
import TrustSection from './components/TrustSection'
import CTASection from './components/CTASection'
import FilterDrawer from './components/FilterDrawer'
import CategoryTabs from './components/CategoryTabs'

export default function CatalogoClient({ 
  initialProducts,
  totalProducts = 0 
}: CatalogoClientProps) {
  // ✅ Debug: Log productos recibidos
  console.log('🛍️ CatalogoClient mounted')
  console.log('📦 Initial products received:', initialProducts?.length || 0)
  console.log('📊 Total products:', totalProducts)
  
  // Manejo de la potencial prop undefined/null
  const productsToFilter: NormalizedProduct[] = useMemo(() => {
    const products = initialProducts || []
    console.log('🔄 Products to filter:', products.length)
    if (products.length > 0) {
      console.log('✅ First product sample:', {
        id: products[0].id,
        name: products[0].name,
        category: products[0].category,
        price: products[0].price,
        images: products[0].images,
        isActive: products[0].isActive
      })
    }
    return products
  }, [initialProducts])
  
  // 1. Estados
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]) // Para FilterDrawer
  const [activeCategory, setActiveCategory] = useState('todos') // Para CategoryTabs
  
  // ✅ CORREGIDO: Rango de precio que incluya todos los productos ($0 - $2.000.000)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000])
  const [minRating, setMinRating] = useState(0)
  
  // 2. Refs y Framer Motion
  const heroRef = useRef<HTMLDivElement>(null)
  const productsRef = useRef<HTMLDivElement>(null)
  
  // Hook de scroll
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  // Transformaciones de motion
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']) as MotionValue<string>
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]) as MotionValue<number>
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]) as MotionValue<number>

  // 3. Handlers
  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }, [])

  const clearFilters = useCallback(() => {
    setSearchTerm('')
    setSortBy('featured')
    setSelectedCategories([])
    setActiveCategory('todos') // Reset category tab
    setPriceRange([0, 2000000]) // ✅ CORREGIDO
    setMinRating(0)
  }, [])

  const scrollToProducts = useCallback(() => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Handler para cambio de categoría desde tabs
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId)
    // Sincronizar con selectedCategories del drawer
    if (categoryId === 'todos') {
      setSelectedCategories([])
    } else {
      setSelectedCategories([categoryId])
    }
  }, [])

  // 4. ✅ Categorías únicas disponibles (usando campo category)
  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    
    productsToFilter.forEach(p => {
      if (p.category && typeof p.category === 'string') {
        categories.add(p.category.trim())
      }
    })
    
    const cats = Array.from(categories).sort()
    console.log('🏷️ Available categories:', cats)
    return cats
  }, [productsToFilter])

  // 5. ✅ Categorías con contador para CategoryTabs
  const categoriesWithCount = useMemo(() => {
    const CATEGORY_CONFIG = [
      { id: 'todos', name: 'Todos', icon: '🏠' },
      { id: 'Colchones', name: 'Colchones', icon: '🛏️' },
      { id: 'Sommiers', name: 'Sommiers', icon: '📦' },
      { id: 'Bases', name: 'Bases', icon: '🔲' },
      { id: 'Almohadas', name: 'Almohadas', icon: '🛌' },
      { id: 'Blanquería', name: 'Blanquería', icon: '🧵' },
      { id: 'Cunas', name: 'Cunas', icon: '👶' },
      { id: 'Outlet', name: 'Outlet', icon: '🏷️' },
    ]

    return CATEGORY_CONFIG.map(cat => ({
      ...cat,
      count: cat.id === 'todos' 
        ? productsToFilter.length 
        : productsToFilter.filter(p => p.category === cat.id).length
    })).filter(cat => cat.count > 0) // Solo mostrar categorías con productos
  }, [productsToFilter])

  // 6. ✅ Lógica de Filtrado y Ordenamiento - CORREGIDA
  const filteredProducts = useMemo(() => {
    console.log('🔍 Filtering products...')
    console.log('  - Active category:', activeCategory)
    console.log('  - Search term:', searchTerm)
    console.log('  - Sort by:', sortBy)
    console.log('  - Selected categories (drawer):', selectedCategories)
    console.log('  - Price range:', priceRange)
    console.log('  - Min rating:', minRating)
    
    if (!productsToFilter.length) {
      console.log('⚠️ No products to filter!')
      return []
    }
    
    const filtered = productsToFilter.filter(product => {
      // ✅ AGREGADO: Verificar que el producto esté activo
      if (product.isActive === false) {
        console.log(`  ❌ Product ${product.name} is inactive`)
        return false
      }
      
      // Category from tabs (priority)
      const matchesTabCategory = activeCategory === 'todos' || 
        (product.category && product.category === activeCategory)
      
      if (!matchesTabCategory) {
        console.log(`  ❌ Product ${product.name} doesn't match category filter`)
        return false
      }
      
      // Search
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      
      if (!matchesSearch) {
        console.log(`  ❌ Product ${product.name} doesn't match search`)
        return false
      }
      
      // Price
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      if (!matchesPrice) {
        console.log(`  ❌ Product ${product.name} (${product.price}) out of price range ${priceRange[0]}-${priceRange[1]}`)
        return false
      }
      
      // Rating
      const matchesRating = product.rating >= minRating
      
      if (!matchesRating) {
        console.log(`  ❌ Product ${product.name} rating ${product.rating} below min ${minRating}`)
        return false
      }
      
      return true
    }).sort((a, b) => {
      // Sorting
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'newest') {
        if (a.isNew && !b.isNew) return -1
        if (!a.isNew && b.isNew) return 1
      }
      // Featured (default)
      if (a.isBestSeller && !b.isBestSeller) return -1
      if (!a.isBestSeller && b.isBestSeller) return 1
      if (a.isNew && !b.isNew) return -1
      if (!a.isNew && b.isNew) return 1
      return b.rating - a.rating
    })
    
    console.log('✅ Filtered products:', filtered.length)
    if (filtered.length === 0 && productsToFilter.length > 0) {
      console.log('⚠️ All products were filtered out! Check filter conditions.')
    }
    return filtered
  }, [productsToFilter, activeCategory, searchTerm, sortBy, priceRange, minRating])

  // 7. Cálculos derivados
  const avgPrice = useMemo(() => {
    if (!productsToFilter.length) return 300000
    const avg = productsToFilter.reduce((acc, p) => acc + p.price, 0) / productsToFilter.length
    console.log('💰 Average price:', avg)
    return avg
  }, [productsToFilter])

  // 8. Contador de filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (activeCategory !== 'todos') count++ // Categoría activa
    if (priceRange[0] > 0 || priceRange[1] < 2000000) count++
    if (minRating > 0) count++
    if (searchTerm) count++
    console.log('🎯 Active filters count:', count)
    return count
  }, [activeCategory, priceRange, minRating, searchTerm])

  // ✅ Early return si no hay productos
  if (productsToFilter.length === 0) {
    console.log('❌ No products available - showing empty state')
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="text-8xl mb-6">🛏️</div>
          <h2 className="text-3xl font-black text-white mb-4">
            No hay productos disponibles
          </h2>
          <p className="text-zinc-400 mb-6">
            La base de datos está vacía. Ejecutá el seed para cargar productos.
          </p>
          <code className="inline-block bg-zinc-800 text-blue-400 px-4 py-2 rounded-lg font-mono text-sm">
            npm run db:seed
          </code>
        </div>
      </div>
    )
  }

  // 9. Renderizado (Composición)
  console.log('🎨 Rendering catalog with', filteredProducts.length, 'products')
  
  return (
    <div className="min-h-screen bg-white relative">
      {/* Hero Section */}
      <HeroSection 
        heroRef={heroRef} 
        heroY={heroY} 
        heroOpacity={heroOpacity} 
        heroScale={heroScale} 
        scrollToProducts={scrollToProducts}
        avgPrice={avgPrice}
      />
      
      {/* Barra sticky con búsqueda y ordenamiento */}
      <StickyBar
        productsRef={productsRef}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        activeFiltersCount={activeFiltersCount}
        clearFilters={clearFilters}
        setIsFilterOpen={setIsFilterOpen}
        filteredProductsLength={filteredProducts.length}
      />

      {/* ⭐ NUEVO: Category Tabs - Integrado entre StickyBar y productos */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 py-4">
        <div className="container mx-auto px-4">
          <CategoryTabs
            categories={categoriesWithCount}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Drawer de filtros */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategories={selectedCategories}
        onCategoryChange={setSelectedCategories}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        availableCategories={availableCategories}
        onClearFilters={clearFilters}
      />

      {/* Grid de productos */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={activeCategory} // Re-render en cambio de categoría
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={() => toggleFavorite(product.id)}
                  avgPrice={avgPrice}
                />
              ))}
            </motion.div>
          ) : (
            <EmptyState onClearFilters={clearFilters} />
          )}
        </AnimatePresence>
      </div>

      {/* Secciones adicionales */}
      <TrustSection />
      <CTASection />
    </div>
  )
}