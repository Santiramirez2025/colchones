// @/lib/helpers/product-utils.ts

/**
 * Calcula el precio con descuento aplicado.
 * @param price Precio original
 * @param discount Porcentaje de descuento (0-100)
 * @returns Precio con descuento aplicado
 */
export function calculateDiscount(price: number, discount: number): number {
  if (discount < 0 || discount > 100) {
    throw new Error('El descuento debe estar entre 0 y 100')
  }
  return price - (price * discount / 100)
}

/**
 * Formatea un precio en euros con formato español.
 * @param price Precio a formatear
 * @returns Precio formateado con símbolo de euro
 */
export function formatPrice(price: number): string {
  return `${price.toLocaleString('es-ES')} €`
}

/**
 * Calcula el porcentaje de descuento entre dos precios.
 * @param originalPrice Precio original
 * @param currentPrice Precio actual
 * @returns Porcentaje de descuento redondeado
 */
export function getDiscountPercentage(originalPrice: number, currentPrice: number): number {
  if (currentPrice >= originalPrice) return 0
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

/**
 * Filtra productos por nivel de firmeza.
 * @param products Array de productos
 * @param firmness Nivel de firmeza opcional
 * @returns Array de productos filtrados
 */
export function filterProductsByFirmness(products: any[], firmness?: string) {
  if (!firmness) return products
  return products.filter(p => p.firmness === firmness)
}

/**
 * Ordena productos según el criterio especificado.
 * @param products Array de productos
 * @param sortBy Criterio de ordenación
 * @returns Array de productos ordenados
 */
export function sortProducts(products: any[], sortBy: string) {
  const sorted = [...products]
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

/**
 * Calcula el promedio de las valoraciones y su distribución.
 * @param reviews Array de objetos de review.
 * @param productRating Valoración por defecto del producto si no hay reviews.
 * @returns Objeto con ratings promedio, conteo y distribución.
 */
export function calculateRatings(reviews: any[], productRating?: number) {
  // Asegura que reviews sea un array y no nulo.
  const validReviews = Array.isArray(reviews) ? reviews.filter(r => r && typeof r.rating === 'number') : [];
  
  const averageRating = validReviews.length > 0 
    ? validReviews.reduce((acc, r) => acc + r.rating, 0) / validReviews.length 
    : productRating || 4.8

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
  
  validReviews.forEach(r => {
    const rating = Math.floor(r.rating); // Usamos el entero para la distribución
    if (rating >= 1 && rating <= 5) {
      distribution[rating as keyof typeof distribution]++
    }
  })

  // Calcula promedios para sub-ratings si existen
  const getSubRatingAverage = (key: string, defaultValue: number) => 
    validReviews.length > 0 
      ? validReviews.reduce((acc, r) => acc + (r[key] || 0), 0) / validReviews.length 
      : defaultValue;

  return {
    average: averageRating,
    count: validReviews.length,
    // Sub-ratings, si tu modelo de reviews los incluye:
    comfort: getSubRatingAverage('comfortRating', 4.5),
    quality: getSubRatingAverage('qualityRating', 4.7),
    value: getSubRatingAverage('valueRating', 4.6),
    delivery: getSubRatingAverage('deliveryRating', 4.8),
    distribution
  }
}

/**
 * Genera un conjunto de Preguntas Frecuentes (FAQ) basadas en los datos del producto.
 * @param product Objeto del producto con detalles.
 * @returns Array de objetos FAQ.
 */
export function generateFaqs(product: any) {
  // Parámetros de respaldo en caso de que falten datos
  const deliveryDays = product.deliveryDays || '3-5';
  const warranty = product.warranty || 5;
  const trialNights = product.trialNights || 100;
  const shippingCost = product.shippingCost || 50;

  return [
    {
      q: '¿Cuánto tarda en llegar el colchón?',
      a: `El colchón se entrega en **${deliveryDays} días laborables**. El envío es ${product.freeShipping ? '**gratuito**' : `**${shippingCost}€**`} y con seguimiento.`
    },
    {
      q: `¿Qué incluye la garantía de ${warranty} años?`,
      a: `La garantía cubre defectos de fabricación y hundimiento superior a 2,5cm. Tienes **${trialNights} noches de prueba** para asegurarte de que es el colchón perfecto para ti.`
    },
    {
      q: '¿Necesito una base especial?',
      a: 'Funciona con cualquier base firme: somier de láminas, base tapizada o canapé. **No recomendado** para bases blandas.'
    },
    {
      q: '¿El colchón viene comprimido?',
      a: 'Sí, viene enrollado en caja para facilitar el transporte. Se expande completamente en **24-48 horas** tras desembalarlo.'
    }
  ]
}