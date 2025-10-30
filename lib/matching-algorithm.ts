// lib/matching-algorithm.ts
interface UserProfile {
    position: string
    weight: string
    firmness: string
    budget: string
  }
  
  interface Product {
    id: string
    name: string
    slug: string
    price: number
    originalPrice?: number | null
    firmnessValue: number
    transpirability: number
    height: number
    rating: number
    reviewCount: number
    cooling?: boolean
    eco?: boolean
    isEco?: boolean
    hypoallergenic?: boolean
    washable?: boolean
    isBestSeller?: boolean
    isNew?: boolean
    satisfaction?: number
    features?: string[]
    highlights?: string[]
    inStock?: boolean
    warranty?: number
    trialNights?: number
    [key: string]: any
  }
  
  interface ScoredProduct extends Product {
    matchScore: number
    matchPercentage: number
    matchReasons: string[]
  }
  
  // ============================================================================
  // CÁLCULO DE FIRMEZA IDEAL
  // ============================================================================
  function getIdealFirmness(position: string, weight: string, preference: string): number {
    let base = 65
  
    // Ajuste por posición de sueño
    switch (position) {
      case 'side': 
        base = 50  // Lado necesita más suavidad
        break
      case 'back': 
        base = 65  // Espalda necesita balance
        break
      case 'stomach': 
        base = 75  // Boca abajo necesita firmeza
        break
      case 'mixed': 
        base = 60  // Versátil
        break
    }
  
    // Ajuste por peso
    switch (weight) {
      case 'light': 
        base -= 10  // Personas ligeras prefieren más suave
        break
      case 'heavy': 
        base += 12  // Personas pesadas necesitan más soporte
        break
      // 'medium' no ajusta
    }
  
    // Ajuste por preferencia personal
    switch (preference) {
      case 'soft': 
        base -= 15
        break
      case 'firm': 
        base += 15
        break
      // 'medium' no ajusta
    }
  
    // Mantener dentro del rango 30-95
    return Math.max(30, Math.min(95, base))
  }
  
  // ============================================================================
  // RANGOS DE PRESUPUESTO
  // ============================================================================
  function getBudgetRange(budget: string): { min: number; max: number } {
    switch (budget) {
      case 'economic': 
        return { min: 0, max: 500 }
      case 'standard': 
        return { min: 500, max: 1000 }
      case 'premium': 
        return { min: 1000, max: 99999 }
      default: 
        return { min: 0, max: 99999 }
    }
  }
  
  // ============================================================================
  // PENALIZACIÓN POR DIFERENCIA DE FIRMEZA
  // ============================================================================
  function calculateFirmnessPenalty(idealFirmness: number, productFirmness: number): number {
    const diff = Math.abs(idealFirmness - productFirmness)
    
    if (diff <= 5) return 0        // Perfecta coincidencia
    if (diff <= 10) return diff * 0.5   // Muy buena
    if (diff <= 20) return diff * 1.0   // Buena
    return diff * 1.5                   // Regular
  }
  
  // ============================================================================
  // CÁLCULO DE SCORE DEL PRODUCTO
  // ============================================================================
  export function calculateProductScore(
    product: Product,
    profile: UserProfile
  ): { score: number; reasons: string[] } {
    let score = 0
    const reasons: string[] = []
  
    // ===== 1. FIRMEZA (40 puntos max) =====
    const idealFirmness = getIdealFirmness(profile.position, profile.weight, profile.firmness)
    const productFirmness = product.firmnessValue || 70 // Fallback si no existe
    const firmnessPenalty = calculateFirmnessPenalty(idealFirmness, productFirmness)
    const firmnessScore = Math.max(0, 40 - firmnessPenalty)
    score += firmnessScore
  
    if (firmnessScore >= 35) {
      reasons.push('Firmeza perfecta para ti')
    } else if (firmnessScore >= 25) {
      reasons.push('Firmeza muy compatible')
    } else if (firmnessScore >= 15) {
      reasons.push('Firmeza compatible')
    }
  
    // ===== 2. PRESUPUESTO (25 puntos max) =====
    const budgetRange = getBudgetRange(profile.budget)
    let budgetScore = 0
  
    if (product.price >= budgetRange.min && product.price <= budgetRange.max) {
      budgetScore = 25
      
      // Bonus si está en el centro del rango
      const midBudget = (budgetRange.min + budgetRange.max) / 2
      const distanceFromMid = Math.abs(product.price - midBudget) / (budgetRange.max - budgetRange.min)
      
      if (distanceFromMid < 0.3) {
        budgetScore += 2
        reasons.push('Precio óptimo en tu rango')
      } else {
        reasons.push('Dentro de tu presupuesto')
      }
    } else {
      // Penalización gradual si está fuera del rango
      const priceDiff = Math.min(
        Math.abs(product.price - budgetRange.min),
        Math.abs(product.price - budgetRange.max)
      )
      budgetScore = Math.max(0, 25 - priceDiff / 50)
    }
  
    score += budgetScore
  
    // ===== 3. CARACTERÍSTICAS ESPECÍFICAS (20 puntos max) =====
    let featuresScore = 0
  
    // Bonus por posición de sueño específica
    if (profile.position === 'side' && productFirmness >= 45 && productFirmness <= 65) {
      featuresScore += 5
      reasons.push('Ideal para dormir de lado')
    }
  
    if (profile.position === 'back' && productFirmness >= 60 && productFirmness <= 75) {
      featuresScore += 5
      reasons.push('Perfecto para dormir boca arriba')
    }
  
    if (profile.position === 'stomach' && productFirmness >= 70) {
      featuresScore += 5
      reasons.push('Firmeza ideal para boca abajo')
    }
  
    // Bonus por peso específico
    if (profile.weight === 'heavy' && productFirmness >= 70) {
      featuresScore += 4
      reasons.push('Soporte reforzado para tu peso')
    }
  
    if (profile.weight === 'light' && productFirmness <= 60) {
      featuresScore += 4
      reasons.push('Adaptabilidad perfecta')
    }
  
    // Bonus por características premium
    if (product.cooling) {
      featuresScore += 2
      reasons.push('Sistema de refrigeración')
    }
  
    if (product.eco || product.isEco) {
      featuresScore += 2
      reasons.push('Materiales ecológicos')
    }
  
    if (product.hypoallergenic) {
      featuresScore += 1
      reasons.push('Hipoalergénico')
    }
  
    if (product.washable) {
      featuresScore += 1
    }
  
    // Bonus por altura premium
    if (product.height >= 28) {
      featuresScore += 2
      reasons.push('Altura premium')
    }
  
    // Bonus por alta transpirabilidad
    if (product.transpirability >= 85) {
      featuresScore += 2
      reasons.push('Alta transpirabilidad')
    }
  
    score += Math.min(20, featuresScore)
  
    // ===== 4. SOCIAL PROOF (15 puntos max) =====
    let socialProofScore = 0
  
    // Rating (0-10 puntos)
    const ratingScore = (product.rating / 5) * 10
    socialProofScore += ratingScore
  
    // Número de reviews (0-5 puntos)
    const reviewsScore = Math.min(5, product.reviewCount / 200)
    socialProofScore += reviewsScore
  
    // Best seller bonus
    if (product.isBestSeller) {
      socialProofScore += 2
      reasons.push('Más vendido')
    }
  
    // Alta satisfacción
    if (product.satisfaction && product.satisfaction >= 95) {
      socialProofScore += 1
      reasons.push('Alta satisfacción')
    }
  
    score += Math.min(15, socialProofScore)
  
    // Limitar a top 5 razones más relevantes
    return {
      score: Math.round(score),
      reasons: reasons.slice(0, 5)
    }
  }
  
  // ============================================================================
  // OBTENER TOP RECOMENDACIONES
  // ============================================================================
  export function getTopRecommendations(
    products: Product[] | null | undefined,
    profile: UserProfile,
    limit: number = 3
  ): ScoredProduct[] {
    console.log('🔍 getTopRecommendations called')
    console.log('  - Products:', products?.length || 0)
    console.log('  - Profile:', profile)
  
    // Validación: productos existen
    if (!products || !Array.isArray(products) || products.length === 0) {
      console.warn('⚠️ No products available')
      return []
    }
  
    // Validación: perfil completo
    if (!profile || !profile.position || !profile.weight || !profile.firmness || !profile.budget) {
      console.warn('⚠️ Invalid profile:', profile)
      return []
    }
  
    try {
      // Filtrar productos válidos
      const validProducts = products.filter(p => {
        const isValid = (
          p &&
          typeof p === 'object' &&
          p.id &&
          p.name &&
          p.slug &&
          typeof p.price === 'number' &&
          p.price > 0 &&
          p.inStock !== false
        )
        
        if (!isValid) {
          console.warn('⚠️ Invalid product filtered out:', p?.name || 'Unknown')
        }
        
        return isValid
      })
  
      console.log('✅ Valid products:', validProducts.length)
  
      if (validProducts.length === 0) {
        console.warn('⚠️ No valid products after filtering')
        return []
      }
  
      // Calcular scores y ordenar
      const scoredProducts = validProducts
        .map(product => {
          const { score, reasons } = calculateProductScore(product, profile)
          
          return {
            ...product,
            matchScore: score,
            matchPercentage: calculateMatchPercentage(score),
            matchReasons: reasons
          }
        })
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, limit)
  
      console.log('🎯 Top recommendations generated:', scoredProducts.length)
      console.log('  - Top match:', scoredProducts[0]?.name, `(${scoredProducts[0]?.matchPercentage}%)`)
  
      return scoredProducts
  
    } catch (error) {
      console.error('❌ Error in getTopRecommendations:', error)
      return []
    }
  }
  
  // ============================================================================
  // CALCULAR PORCENTAJE DE MATCH (85-99%)
  // ============================================================================
  function calculateMatchPercentage(score: number): number {
    const minPercentage = 85
    const maxPercentage = 99
    const range = maxPercentage - minPercentage
    
    // Score máximo es 100, convertir a porcentaje 85-99
    const percentage = minPercentage + (score / 100) * range
    
    return Math.round(Math.min(maxPercentage, Math.max(minPercentage, percentage)))
  }
  
  // ============================================================================
  // RESUMEN DEL PERFIL DEL USUARIO
  // ============================================================================
  export function getProfileSummary(profile: UserProfile): string {
    const positionText: Record<string, string> = {
      side: 'de lado',
      back: 'boca arriba',
      stomach: 'boca abajo',
      mixed: 'variada'
    }
  
    const weightText: Record<string, string> = {
      light: 'ligero',
      medium: 'medio',
      heavy: 'pesado'
    }
  
    const firmnessText: Record<string, string> = {
      soft: 'suave',
      medium: 'media',
      firm: 'firme'
    }
  
    const budgetText: Record<string, string> = {
      economic: 'hasta 500€',
      standard: '500-1000€',
      premium: 'más de 1000€'
    }
  
    return `Duermes ${positionText[profile.position] || 'variada'}, peso ${weightText[profile.weight] || 'medio'}, prefieres firmeza ${firmnessText[profile.firmness] || 'media'}, presupuesto ${budgetText[profile.budget] || 'flexible'}`
  }