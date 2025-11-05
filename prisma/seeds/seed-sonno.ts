// prisma/seed-sonno.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================================
// DATOS DE PRODUCTOS - COLCHONES SONNO 2025
// ============================================================================

const products = [
  // ========== COLCHÓN DUAL VINTAGE VISCOGRAFENO ==========
  {
    name: 'Colchón Dual Vintage Viscografeno',
    slug: 'colchon-dual-vintage-viscografeno',
    subtitle: 'Tecnología de grafeno con estilo vintage',
    description: 'Disfruta del descanso más agradable con este colchón de inspiración vintage con viscografeno. Las propiedades termoreguladoras e ionizantes del viscografeno hacen de este colchón de aspecto clásico uno de los más avanzados del mercado. El viscografeno cuenta también con efectos antiestres y antibacterianos, para un descanso completo e higiénico. Además con el núcleo HR disfrutarás de un soporte de firmeza extra para un reposo completo.',
    story: 'Un colchón de última tecnología con acabados de calidad y un look Vintage. El grafeno es un excelente conductor térmico y eléctrico, lo que ayuda a evitar que se acumule el calor mientras dormimos.',
    price: 359,
    originalPrice: 549,
    compareAtPrice: 549,
    discount: 35,
    firmnessValue: 80,
    firmness: Firmness.EXTRA_FIRME,
    transpirability: 85,
    adaptability: 88,
    height: 30,
    weight: 38,
    maxWeightPerPerson: 110,
    image: '/images/colchones/sonno-vintage.jpg',
    images: JSON.stringify([
      '/images/colchones/sonno-vintage.jpg',
      '/images/colchones/sonno-vintage-2.jpg',
      '/images/colchones/sonno-vintage-detalle.jpg'
    ]),
    gradient: 'from-amber-700 via-orange-600 to-amber-800',
    rating: 4.5,
    reviewCount: 2,
    salesCount: 145,
    viewsCount: 2340,
    features: JSON.stringify([
      'Viscografeno termorregulador',
      'Propiedades ionizantes',
      'Efectos antiestres',
      'Antibacteriano',
      'Núcleo HR firmeza extra',
      'Diseño vintage de calidad'
    ]),
    techFeatures: JSON.stringify([
      'Tecnología Viscografeno avanzada',
      'Tejido Vintage de calidad superior',
      'Altura de 30 cm',
      'Firmeza 80% (Extra Firme)',
      'Transpirabilidad 85%',
      'Conductor térmico y eléctrico'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Anti-hongos, anti-bacterias y anti-ácaros'
    ]),
    tags: JSON.stringify(['viscografeno', 'extra-firme', 'antibacteriano', 'termorregulador', 'vintage']),
    highlights: JSON.stringify([
      'Tecnología grafeno',
      'Efecto antiestres',
      'Look vintage elegante'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Viscografeno', 'Espuma HR', 'Acolchado viscosoft', 'TNT', 'Fibra hueca siliconada']),
    layers: JSON.stringify([
      'Tejido Vintage de calidad superior',
      'Acolchado viscosoft',
      'Capa de viscografeno termorregulador',
      'TNT antibacterias',
      'Núcleo HR firmeza extra',
      'Base TNT',
      'Acolchado inferior viscosoft',
      'Tejido 3D transpirable'
    ]),
    badge: 'TECNOLOGÍA',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 34,
    inStock: true,
    sku: 'SONNO-VINTAGE-001',
    deliveryDays: 5,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: false,
    verified: true,
    bestValue: false,
    satisfaction: 92,
    position: 1
  },

  // ========== COLCHÓN O'CLOCK ==========
  {
    name: 'Colchón O\'Clock',
    slug: 'colchon-oclock',
    subtitle: 'Especialmente diseñado para los más pequeños',
    description: 'Este alegre y cómodo colchón es el mejor soporte de descanso especialmente inspirado en los más pequeños de la casa. Con un suave acolchado de viscoelástica que se adapta a las formas del cuerpo para un descanso superior, combinado con un firme soporte gracias a su núcleo de HR microperforado pensado para adaptarse a las diferentes etapas del crecimiento. Un diseño alegre y juvenil que les encantará y un descanso cómodo y reparador, tan vital en la etapa de crecimiento de los más peques.',
    story: 'Diseñado especialmente para los más pequeños con un estampado divertido y alegre. Su núcleo HR microperforado se adapta perfectamente a las diferentes etapas del crecimiento.',
    price: 132,
    originalPrice: 168,
    compareAtPrice: 168,
    discount: 21,
    firmnessValue: 60,
    firmness: Firmness.MEDIA,
    transpirability: 85,
    adaptability: 80,
    height: 18,
    weight: 22,
    maxWeightPerPerson: 80,
    image: '/images/colchones/sonno-oclock.jpg',
    images: JSON.stringify([
      '/images/colchones/sonno-oclock.jpg',
      '/images/colchones/sonno-oclock-2.jpg'
    ]),
    gradient: 'from-blue-500 via-cyan-400 to-teal-500',
    rating: 5.0,
    reviewCount: 2,
    salesCount: 89,
    viewsCount: 1230,
    features: JSON.stringify([
      'Diseño alegre y juvenil',
      'Acolchado viscoelástico adaptable',
      'Núcleo HR microperforado',
      'Se adapta al crecimiento',
      'Firmeza media ideal para niños',
      'Descanso reparador'
    ]),
    techFeatures: JSON.stringify([
      'Tejido O\'Clock con estampado divertido',
      'Viscoelástica adaptativa',
      'Núcleo HR microperforado',
      'Altura de 18 cm',
      'Firmeza 60% (Media)',
      'Diseño especial para niños'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Anti-hongos, anti-bacterias y anti-ácaros'
    ]),
    tags: JSON.stringify(['infantil', 'juvenil', 'viscoelastica', 'media', 'crecimiento']),
    highlights: JSON.stringify([
      'Especial para niños',
      'Diseño divertido',
      'Se adapta al crecimiento'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Viscoelástica', 'Espuma HR microperforada', 'Acolchado viscosoft', 'TNT']),
    layers: JSON.stringify([
      'Tejido O\'Clock divertido',
      'Acolchado viscoelástico',
      'Acolchado viscosoft',
      'TNT protector',
      'Núcleo HR microperforado',
      'Base TNT',
      'Fibra hueca siliconada',
      'Acolchado inferior viscosoft',
      'Tejido 3D transpirable'
    ]),
    badge: 'INFANTIL',
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 48,
    inStock: true,
    sku: 'SONNO-OCLOCK-001',
    deliveryDays: 5,
    freeShipping: true,
    cooling: false,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: false,
    verified: true,
    bestValue: true,
    satisfaction: 100,
    position: 2
  },

  // ========== COLCHÓN MEMORY CARBON ==========
  {
    name: 'Colchón Memory Carbon',
    slug: 'colchon-memory-carbon',
    subtitle: 'Carbono activo para un descanso sin estrés',
    description: 'El colchón Memory Carbon aúna las propiedades del carbono activo junto con la comodidad y adaptabilidad del visco, especialmente diseñado para reducir la electricidad estática mientras descansas induciendo un sueño cómodo, reparador y libre de estrés. El carbono activo elimina la electricidad estática que acumulamos en el día a día y que desequilibra nuestro organismo, favoreciendo un sueño de mayor calidad. Sirve también de barrera antiácaros y bacterias y elimina los olores. Evita la sudoración, proporcionando un sueño más fresco.',
    story: 'El carbono activo elimina la electricidad estática, sirve de barrera antiácaros y bacterias, elimina los olores y evita la sudoración para un descanso más reparador.',
    price: 220,
    originalPrice: 329,
    compareAtPrice: 329,
    discount: 33,
    firmnessValue: 60,
    firmness: Firmness.MEDIA,
    transpirability: 88,
    adaptability: 85,
    height: 24,
    weight: 30,
    maxWeightPerPerson: 110,
    image: '/images/colchones/sonno-carbon.jpg',
    images: JSON.stringify([
      '/images/colchones/sonno-carbon.jpg',
      '/images/colchones/sonno-carbon-2.jpg',
      '/images/colchones/sonno-carbon-detalle.jpg'
    ]),
    gradient: 'from-gray-800 via-slate-700 to-gray-900',
    rating: 4.7,
    reviewCount: 9,
    salesCount: 267,
    viewsCount: 3450,
    features: JSON.stringify([
      'Carbono activo antiestático',
      'Elimina electricidad estática',
      'Barrera antiácaros y bacterias',
      'Elimina olores',
      'Evita sudoración',
      'Sueño libre de estrés'
    ]),
    techFeatures: JSON.stringify([
      'Tejido MemorySens Carbono',
      'Carbono activo integrado',
      'Viscoelástica de alta calidad',
      'Altura de 24 cm',
      'Firmeza 60% (Media)',
      'Transpirabilidad 88%'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Anti-hongos, anti-bacterias y anti-ácaros'
    ]),
    tags: JSON.stringify(['carbono-activo', 'viscoelastica', 'antiestatico', 'antibacteriano', 'media']),
    highlights: JSON.stringify([
      'Carbono activo',
      'Elimina electricidad estática',
      'Muy bien valorado'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Carbono activo', 'Viscoelástica', 'Espuma HR', 'Acolchado viscosoft', 'TNT']),
    layers: JSON.stringify([
      'Tejido MemorySens Carbono',
      'Acolchado con carbono activo',
      'Capa viscoelástica',
      'Acolchado viscosoft',
      'TNT protector',
      'Núcleo HR alta densidad',
      'Base TNT',
      'Fibra hueca siliconada',
      'Acolchado inferior viscosoft',
      'Tejido 3D transpirable'
    ]),
    badge: 'POPULAR',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 52,
    inStock: true,
    sku: 'SONNO-CARBON-001',
    deliveryDays: 5,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: false,
    verified: true,
    bestValue: true,
    satisfaction: 95,
    position: 3
  },

  // ========== COLCHÓN DUQUE ==========
  {
    name: 'Colchón Duque',
    slug: 'colchon-duque',
    subtitle: 'Elegancia y las mejores calidades',
    description: 'Este señorial colchón Duque aúna las mejores calidades y acabados con unas lineas limpias y un diseño elegante. Con un núcleo de HR perfilado de gran firmeza y una adaptabilidad superior; y acolchado de viscoelástica de la mejor calidad en ambas caras, para un tumbada suave y un descanso placentero. Gracias al perfilado del núcleo, el colchón se adapta a nuestra fisionomía, eliminando la presión sobre las 9 zonas de descanso. Elegancia y las mejores calidades para un sueño placentero.',
    story: 'Señorial y elegante, con núcleo HR perfilado en 9 zonas de descanso que se adapta perfectamente a tu fisionomía. Ayuda a corregir la postura cervical y lumbar al dormir.',
    price: 554,
    originalPrice: 829,
    compareAtPrice: 829,
    discount: 33,
    firmnessValue: 75,
    firmness: Firmness.MEDIA_ALTA,
    transpirability: 85,
    adaptability: 92,
    height: 30,
    weight: 36,
    maxWeightPerPerson: 120,
    image: '/images/colchones/sonno-duque.jpg',
    images: JSON.stringify([
      '/images/colchones/sonno-duque.jpg',
      '/images/colchones/sonno-duque-2.jpg',
      '/images/colchones/sonno-duque-detalle.jpg',
      '/images/colchones/sonno-duque-capas.jpg'
    ]),
    gradient: 'from-purple-800 via-purple-700 to-indigo-800',
    rating: 5.0,
    reviewCount: 0,
    salesCount: 78,
    viewsCount: 1890,
    features: JSON.stringify([
      'Núcleo HR perfilado 9 zonas',
      'Viscoelástica en ambas caras',
      'Gran firmeza y adaptabilidad',
      'Elimina presión corporal',
      'Corrige postura cervical y lumbar',
      'Diseño elegante y señorial'
    ]),
    techFeatures: JSON.stringify([
      'Tejido Strech Luxury premium',
      'Núcleo HR perfilado 9 zonas',
      'Doble cara viscoelástica',
      'Altura de 30 cm',
      'Firmeza 75% (Media-Alta)',
      'Sistema 9 zonas de descanso'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Anti-hongos, anti-bacterias y anti-ácaros'
    ]),
    tags: JSON.stringify(['premium', 'perfilado', '9-zonas', 'viscoelastica', 'media-alta', 'elegante']),
    highlights: JSON.stringify([
      'Sistema 9 zonas',
      'Doble cara viscoelástica',
      'Corrige postura'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Viscoelástica premium', 'Espuma HR perfilada', 'Acolchado viscosoft', 'TNT']),
    layers: JSON.stringify([
      'Tejido Strech Luxury',
      'Acolchado viscoelástico superior',
      'Acolchado viscosoft',
      'TNT protector',
      'Núcleo HR perfilado 9 zonas',
      'TNT protector',
      'Acolchado viscoelástico inferior',
      'Acolchado viscosoft',
      'Tejido 3D transpirable'
    ]),
    badge: 'PREMIUM',
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 28,
    inStock: true,
    sku: 'SONNO-DUQUE-001',
    deliveryDays: 5,
    freeShipping: true,
    cooling: false,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: true,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: false,
    satisfaction: 100,
    position: 4
  },

  // ========== COLCHÓN STONE ==========
  {
    name: 'Colchón Stone',
    slug: 'colchon-stone',
    subtitle: 'La mejor relación calidad-precio',
    description: 'El colchón Stone es ideal para la habitación de los mas peques, o para disfrutar de un colchón económico en una segunda residencia. Toda la familia puede descansar cómodamente en este colchón, gracias a su acolchado de fibras hipoalergénicas y su firme núcleo de espumación HR. Cuenta con una firmeza media-alta que ayuda a la correcta alineación de columna asegurando un descanso cómodo. Perfecto para camas nido ya que el espacio de la cama inferior suele ser para como máximo, un colchón de 15cm de altura.',
    story: 'El tejido Strech Aloe Vera es suave, fresco y resistente, además tiene propiedades antibacterianas e hipoalergénicas. Perfecto para camas nido y habitaciones infantiles. Doble cara para alargar su vida útil.',
    price: 149,
    originalPrice: 217,
    compareAtPrice: 217,
    discount: 31,
    firmnessValue: 70,
    firmness: Firmness.MEDIA_ALTA,
    transpirability: 80,
    adaptability: 75,
    height: 15,
    weight: 18,
    maxWeightPerPerson: 80,
    image: '/images/colchones/sonno-stone.jpg',
    images: JSON.stringify([
      '/images/colchones/sonno-stone.jpg',
      '/images/colchones/sonno-stone-2.jpg'
    ]),
    gradient: 'from-green-700 via-emerald-600 to-teal-700',
    rating: 4.5,
    reviewCount: 6,
    salesCount: 234,
    viewsCount: 2890,
    features: JSON.stringify([
      'Tejido Aloe Vera antibacteriano',
      'Acolchado hipoalergénico',
      'Núcleo HR firme',
      'Firmeza media-alta',
      'Ayuda alineación columna',
      'Perfecto para camas nido'
    ]),
    techFeatures: JSON.stringify([
      'Tejido Strech Aloe Vera',
      'Sistema Sanitized anti-ácaros',
      'Doble cara utilizable',
      'Altura de 15 cm ideal para camas nido',
      'Firmeza 70% (Media-Alta)',
      'Silencioso sin muelles'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Sistema Sanitized',
      'Anti-hongos, anti-bacterias y anti-ácaros'
    ]),
    tags: JSON.stringify(['economico', 'aloe-vera', 'cama-nido', 'infantil', 'media-alta', 'doble-cara']),
    highlights: JSON.stringify([
      'Mejor precio',
      'Perfecto camas nido',
      'Doble cara'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Tejido Aloe Vera', 'Espuma HR', 'Fibra hipoalergénica', 'Poliéster soft', 'TNT']),
    layers: JSON.stringify([
      'Tejido Aloe Vera antibacteriano',
      'Fibra hueca siliconada hipoalergénica',
      'Poliéster soft',
      'TNT protector',
      'Núcleo HR densidad alta',
      'TNT protector',
      'Poliéster soft',
      'Fibra hueca siliconada',
      'Tejido Aloe Vera antibacteriano'
    ]),
    badge: 'ECONÓMICO',
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    isActive: true,
    isEco: true,
    stock: 67,
    inStock: true,
    sku: 'SONNO-STONE-001',
    deliveryDays: 5,
    freeShipping: true,
    cooling: false,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: true,
    silent: true,
    motionIsolation: false,
    edgeSupport: false,
    verified: true,
    bestValue: true,
    satisfaction: 90,
    position: 5
  }
]

// ============================================================================
// VARIANTES DE TAMAÑOS - SONNO
// ============================================================================

const variants = [
  { size: 'Individual 80x180', width: 80, length: 180, priceMultiplier: 0.50 },
  { size: 'Individual 80x190', width: 80, length: 190, priceMultiplier: 0.53 },
  { size: 'Individual 90x180', width: 90, length: 180, priceMultiplier: 0.55 },
  { size: 'Individual 90x190', width: 90, length: 190, priceMultiplier: 0.58 },
  { size: 'Individual 90x200', width: 90, length: 200, priceMultiplier: 0.61 },
  { size: 'Individual XL 105x190', width: 105, length: 190, priceMultiplier: 0.68 },
  { size: 'Individual XL 105x200', width: 105, length: 200, priceMultiplier: 0.71 },
  { size: 'Matrimonio 135x190', width: 135, length: 190, priceMultiplier: 0.83 },
  { size: 'Matrimonio 135x200', width: 135, length: 200, priceMultiplier: 0.87 },
  { size: 'Matrimonio 150x190', width: 150, length: 190, priceMultiplier: 0.93 },
  { size: 'Queen 150x200', width: 150, length: 200, priceMultiplier: 1.0, isPopular: true },
  { size: 'King 160x200', width: 160, length: 200, priceMultiplier: 1.07 },
  { size: 'Super King 180x190', width: 180, length: 190, priceMultiplier: 1.18 },
  { size: 'Super King 180x200', width: 180, length: 200, priceMultiplier: 1.23 },
  { size: 'Super King 200x200', width: 200, length: 200, priceMultiplier: 1.36 }
]

// ============================================================================
// FUNCIÓN SEED
// ============================================================================

async function main() {
  console.log('🌱 Iniciando seed de productos Sonno...\n')

  // Limpiar productos existentes de Sonno
  console.log('🗑️  Limpiando productos Sonno...')
  const sonnoProducts = await prisma.product.findMany({
    where: {
      sku: {
        startsWith: 'SONNO-'
      }
    }
  })
  
  for (const product of sonnoProducts) {
    await prisma.productVariant.deleteMany({
      where: { productId: product.id }
    })
  }
  
  await prisma.product.deleteMany({
    where: {
      sku: {
        startsWith: 'SONNO-'
      }
    }
  })
  console.log('✅ Productos Sonno eliminados\n')

  // Crear productos
  console.log('📦 Creando productos Sonno...\n')
  
  for (const productData of products) {
    console.log(`   → ${productData.name}`)
    
    const product = await prisma.product.create({
      data: productData
    })

    // Crear variantes para cada producto
    for (const variantData of variants) {
      const variantPrice = Math.round(productData.price * variantData.priceMultiplier)
      const variantOriginalPrice = productData.originalPrice 
        ? Math.round(productData.originalPrice * variantData.priceMultiplier)
        : null

      await prisma.productVariant.create({
        data: {
          productId: product.id,
          size: variantData.size,
          width: variantData.width,
          length: variantData.length,
          dimensions: `${variantData.width}x${variantData.length} cm`,
          price: variantPrice,
          originalPrice: variantOriginalPrice,
          stock: Math.floor(Math.random() * 40) + 15,
          sku: `${productData.sku}-${variantData.width}X${variantData.length}`,
          barcode: `8${String(Math.random()).slice(2, 14)}`,
          weight: productData.weight ? Math.round(productData.weight * variantData.priceMultiplier) : null,
          isAvailable: true,
          isPopular: variantData.isPopular || false
        }
      })
    }
  }

  console.log(`\n✅ ${products.length} productos Sonno creados con éxito`)
  console.log(`✅ ${products.length * variants.length} variantes creadas\n`)

  // Estadísticas
  const totalProducts = await prisma.product.count({
    where: {
      sku: {
        startsWith: 'SONNO-'
      }
    }
  })
  const totalVariants = await prisma.productVariant.count()
  
  console.log('📊 Estadísticas finales Sonno:')
  console.log(`   • Productos Sonno: ${totalProducts}`)
  console.log(`   • Variantes totales: ${totalVariants}`)
  console.log(`   • Productos premium (>400€): ${products.filter(p => p.price > 400).length}`)
  console.log(`   • Productos bestseller: ${products.filter(p => p.isBestSeller).length}`)
  console.log(`   • Productos ECO: ${products.filter(p => p.isEco).length}`)
  console.log(`   • Productos infantiles: ${products.filter(p => p.tags.includes('infantil')).length}`)
  console.log('\n🎉 ¡Seed Sonno completado con éxito!')
  console.log('\n📋 Productos Sonno creados:')
  products.forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.name} - ${p.price}€ (${p.reviewCount} opiniones) - ${p.badge}`)
  })
}

// Ejecutar seed
main()
  .catch((e) => {
    console.error('❌ Error en seed Sonno:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })