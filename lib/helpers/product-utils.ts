// @/lib/helpers/product-utils.ts

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
  
  // Puedes añadir más funciones de utilidad relacionadas con el producto aquí
  // como: formatPrice, calculateDiscount, etc.