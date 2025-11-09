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


// --- Lógica del componente principal (Contenedor) ---

export default function CatalogoClient({ initialProducts }: CatalogoClientProps) {
  // Manejo de la potencial prop undefined/null
  const productsToFilter: NormalizedProduct[] = useMemo(() => initialProducts || [], [initialProducts]);
  
  // 1. Estados
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
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
    setPriceRange([0, 10000])
    setMinRating(0)
  }, [])

  const scrollToProducts = useCallback(() => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // 4. Categorías únicas disponibles (usando tags como categorías)
  const availableCategories = useMemo(() => {
    const categories = new Set<string>()
    productsToFilter.forEach(p => {
      if (p.tags) {
        // Si tags es un string, dividirlo por comas
        const tagArray = typeof p.tags === 'string' ? p.tags.split(',').map(t => t.trim()) : []
        tagArray.forEach(tag => {
          if (tag) categories.add(tag)
        })
      }
    })
    return Array.from(categories)
  }, [productsToFilter])

  // 5. Lógica de Filtrado y Ordenamiento
  const filteredProducts = useMemo(() => {
    if (!productsToFilter.length) return []
    
    return productsToFilter.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Convertir tags string a array para comparar
      const productTags = product.tags ? 
        (typeof product.tags === 'string' ? product.tags.split(',').map(t => t.trim()) : []) 
        : []
      const matchesCategory = selectedCategories.length === 0 || 
                             productTags.some(tag => selectedCategories.includes(tag))
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesRating = product.rating >= minRating
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      if (a.isBestSeller && !b.isBestSeller) return -1
      if (!a.isBestSeller && b.isBestSeller) return 1
      if (a.isNew && !b.isNew) return -1
      if (!a.isNew && b.isNew) return 1
      return b.rating - a.rating
    })
  }, [productsToFilter, searchTerm, sortBy, selectedCategories, priceRange, minRating])

  // 6. Cálculos derivados
  const avgPrice = useMemo(() => {
    if (!productsToFilter.length) return 0;
    return productsToFilter.reduce((acc, p) => acc + p.price, 0) / productsToFilter.length
  }, [productsToFilter])

  // 7. Contador de filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCategories.length > 0) count++
    if (priceRange[0] > 0 || priceRange[1] < 10000) count++
    if (minRating > 0) count++
    return count
  }, [selectedCategories, priceRange, minRating])

  // 8. Renderizado (Composición)
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