// prisma/seed-pikolin.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================================
// DATOS DE PRODUCTOS - COLCHONES PIKOLIN 2025
// ============================================================================

const products = [
  // ========== COLCHÓN MARISMA SEAQUAL ==========
  {
    name: 'Colchón Marisma Seaqual',
    slug: 'colchon-marisma-seaqual',
    subtitle: 'Viscoelástico de muelles ensacados ecológico',
    description: 'El colchón Marisma es un colchón viscoelástico de muelles ensacados de firmeza medio-alta respetuoso con el medio ambiente gracias a su tejido Seaqual fabricado con materiales reciclados procedentes de los océanos. Gracias al acolchado Progression Visco, al descansar sobre él se produce un efecto de suave acogida que se adapta perfectamente a cada persona en función de la presión y de su huella térmica. Ofrece una gran transpirabilidad gracias a su núcleo de muelles ensacados Adapt-Tech que se adapta punto por punto a cada persona y favorece la independencia de lechos.',
    story: 'Colchón ecológico fabricado con tejido Seaqual de alta calidad elaborado a partir de plásticos reciclados capturados del mar. Recomendado por la OCU 2025. Su núcleo de muelles ensacados Adapt-Tech ofrece 3 zonas diferenciadas para el descanso.',
    price: 549,
    originalPrice: 799,
    compareAtPrice: 799,
    discount: 31,
    firmnessValue: 75,
    firmness: Firmness.MEDIA_ALTA,
    transpirability: 95,
    adaptability: 90,
    height: 30,
    weight: 35,
    maxWeightPerPerson: 120,
    image: '/images/colchones/pikolin-marisma.jpg',
    images: JSON.stringify([
      '/images/colchones/pikolin-marisma.jpg',
      '/images/colchones/pikolin-marisma-2.jpg',
      '/images/colchones/pikolin-marisma-capas.jpg',
      '/images/colchones/pikolin-marisma-detalle.jpg'
    ]),
    gradient: 'from-blue-600 via-cyan-500 to-teal-600',
    rating: 4.8,
    reviewCount: 24,
    salesCount: 389,
    viewsCount: 5240,
    features: JSON.stringify([
      'Tejido Seaqual ecológico',
      'Muelles ensacados Adapt-Tech',
      'Progression Visco adaptativo',
      'Triple Barrera higiénica',
      '3 zonas de descanso',
      'Independencia de lechos total'
    ]),
    techFeatures: JSON.stringify([
      'Tecnología Adapt-Tech® muelles ensacados',
      'Progression Visco® (Supersoft + ViscoFoam)',
      'Tejido Seaqual de materiales reciclados',
      'Altura de 30 cm',
      'Firmeza 75% (Media-Alta)',
      'Transpirabilidad máxima 95%'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Triple Barrera® (ácaros, bacterias, hongos)',
      'Recomendado OCU 2025',
      'Seaqual Initiative'
    ]),
    tags: JSON.stringify(['ecologico', 'muelles-ensacados', 'viscoelastica', 'media-alta', 'ocu', 'seaqual']),
    highlights: JSON.stringify([
      'Recomendado OCU 2025',
      'Ecológico Seaqual',
      'Alta transpirabilidad'
    ]),
    warranty: 3,
    trialNights: 100,
    materials: JSON.stringify(['Tejido Seaqual', 'Viscoelástica Progression Visco', 'Muelles Adapt-Tech', 'Poliéter alta densidad', 'Fibra atérmica']),
    layers: JSON.stringify([
      'Tejido exterior Seaqual ecológico',
      'Progression Visco (Supersoft + ViscoFoam)',
      'Poliéter reforzado alta densidad',
      'Núcleo Adapt-Tech muelles ensacados',
      'Poliéter reforzado',
      'Progression Visco inferior',
      'Tejido malla transpirable'
    ]),
    badge: 'OCU 2025',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: true,
    stock: 45,
    inStock: true,
    sku: 'PIKOLIN-MARISMA-CM11802',
    deliveryDays: 3,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: false,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: true,
    satisfaction: 95,
    position: 1
  },

  // ========== COLCHÓN SLEEP ADAPT-TECH ==========
  {
    name: 'Colchón Sleep Adapt-Tech',
    slug: 'colchon-sleep-adapt-tech',
    subtitle: 'Muelles ensacados con Progression Fiber Plus',
    description: 'Sleep es un buen colchón sobre el que descansar. De firmeza media y 30 cm de altura. Con su núcleo de muelles ensacados Adapt-Tech y su acolchado Progression Fiber Plus es un colchón que ofrece el máximo confort durante el descanso. El elemento diferencial de este colchón es su acolchado Progression Fiber Plus: dos capas de espuma suave y una de fibra de poliéster. Gracias a esta tecnología se produce un contacto dulce y suave acompañado con propiedades termorreguladoras.',
    story: 'Colchón de firmeza media con tecnología Adapt-Tech que ofrece 3 zonas de descanso diferenciadas para aportar máxima estabilidad. Perfecto para quienes buscan un descanso sin dificultades en sus movimientos.',
    price: 479,
    originalPrice: 699,
    compareAtPrice: 699,
    discount: 31,
    firmnessValue: 60,
    firmness: Firmness.MEDIA,
    transpirability: 90,
    adaptability: 88,
    height: 30,
    weight: 34,
    maxWeightPerPerson: 120,
    image: '/images/colchones/pikolin-sleep.jpg',
    images: JSON.stringify([
      '/images/colchones/pikolin-sleep.jpg',
      '/images/colchones/pikolin-sleep-2.jpg',
      '/images/colchones/pikolin-sleep-capas.jpg'
    ]),
    gradient: 'from-indigo-600 via-purple-500 to-pink-500',
    rating: 4.7,
    reviewCount: 18,
    salesCount: 312,
    viewsCount: 4560,
    features: JSON.stringify([
      'Muelles ensacados Adapt-Tech',
      'Progression Fiber Plus termorregulador',
      'Firmeza media confortable',
      '3 zonas de descanso',
      'Tejido Stretch transpirable',
      'Triple Barrera protección'
    ]),
    techFeatures: JSON.stringify([
      'Tecnología Adapt-Tech® muelles ensacados',
      'Progression Fiber Plus® (HR Supersoft + Fibra)',
      'Tejido Stretch elástico',
      'Altura de 30 cm',
      'Firmeza 60% (Media)',
      'Transpirabilidad 90%'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Triple Barrera® higiénica',
      'Fabricado con 20% energías verdes'
    ]),
    tags: JSON.stringify(['muelles-ensacados', 'media', 'termorregulador', 'adapt-tech', 'progression-fiber']),
    highlights: JSON.stringify([
      'Confort alto',
      'Termorregulador',
      'Silencioso total'
    ]),
    warranty: 3,
    trialNights: 100,
    materials: JSON.stringify(['Tejido Stretch', 'Progression Fiber Plus', 'Muelles Adapt-Tech', 'Poliéter alta densidad', 'Fibra atérmica']),
    layers: JSON.stringify([
      'Tejido Stretch transpirable',
      'Progression Fiber Plus (2 capas Supersoft + Fibra)',
      'Poliéter reforzado alta densidad',
      'Núcleo Adapt-Tech muelles ensacados',
      'Tejido malla transpirable'
    ]),
    badge: 'CONFORT ALTO',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 38,
    inStock: true,
    sku: 'PIKOLIN-SLEEP-CM11868',
    deliveryDays: 4,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: false,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: true,
    satisfaction: 94,
    position: 2
  },

  // ========== COLCHÓN GALEÓN SEAQUAL ==========
  {
    name: 'Colchón Galeón Seaqual',
    slug: 'colchon-galeon-seaqual',
    subtitle: 'Viscoelástico ecológico de firmeza media',
    description: 'El colchón Galeón es un colchón de muelles ensacados con tejido Seaqual fabricado con materiales reciclados procedentes de los océanos. Al tumbarse en este colchón, se experimenta una sensación de confort elevado gracias a su tecnología Viscofoam, y una gran transpirabilidad gracias a su núcleo de muelles ensacados Adapt-Tech que favorece la independencia de lechos. Tiene firmeza media y cuenta con envío exprés para que puedas tenerlo en casa en menos de 72 horas.',
    story: 'Colchón ecosostenible perfecto para deportistas y personas con dolores de espalda. Al ser un colchón de muelles ensacados independientes y viscoelástica, ofrece alta transpiración, frescor, firmeza media con alta adaptabilidad y estabilidad.',
    price: 489,
    originalPrice: 699,
    compareAtPrice: 699,
    discount: 30,
    firmnessValue: 60,
    firmness: Firmness.MEDIA,
    transpirability: 95,
    adaptability: 90,
    height: 28,
    weight: 32,
    maxWeightPerPerson: 110,
    image: '/images/colchones/pikolin-galeon.jpg',
    images: JSON.stringify([
      '/images/colchones/pikolin-galeon.jpg',
      '/images/colchones/pikolin-galeon-2.jpg',
      '/images/colchones/pikolin-galeon-capas.jpg'
    ]),
    gradient: 'from-emerald-600 via-teal-500 to-cyan-600',
    rating: 4.6,
    reviewCount: 16,
    salesCount: 278,
    viewsCount: 3890,
    features: JSON.stringify([
      'Tejido Seaqual ecológico',
      'Viscofoam adaptativo',
      'Muelles Adapt-Tech',
      'Firmeza media confortable',
      'Triple Barrera protección',
      'Enrollado envío exprés'
    ]),
    techFeatures: JSON.stringify([
      'Tecnología Adapt-Tech® muelles ensacados',
      'Viscofoam® adaptación térmica',
      'Tejido Seaqual reciclado',
      'Altura de 28 cm',
      'Firmeza 60% (Media)',
      'Dos caras de descanso'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Triple Barrera® higiénica',
      'Seaqual Initiative',
      '65% acero reciclado'
    ]),
    tags: JSON.stringify(['ecologico', 'muelles-ensacados', 'viscoelastica', 'media', 'seaqual', 'enrollado']),
    highlights: JSON.stringify([
      'Ecológico marino',
      'Envío express 72h',
      'Deportistas'
    ]),
    warranty: 3,
    trialNights: 100,
    materials: JSON.stringify(['Tejido Seaqual', 'Viscofoam', 'Muelles Adapt-Tech', 'Poliéter alta densidad', 'Fibra atérmica']),
    layers: JSON.stringify([
      'Tejido exterior Seaqual',
      'Viscofoam adaptativo',
      'Capa poliéter acogida',
      'Fibra atérmica',
      'Poliéter reforzado alta densidad',
      'Núcleo Adapt-Tech muelles ensacados',
      'Poliéter reforzado',
      'Fibra atérmica',
      'Viscofoam inferior',
      'Tejido Seaqual'
    ]),
    badge: 'ECO',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: true,
    stock: 41,
    inStock: true,
    sku: 'PIKOLIN-GALEON-CM11801',
    deliveryDays: 3,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: false,
    antiDustMite: true,
    reversible: true,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: true,
    satisfaction: 93,
    position: 3
  },

  // ========== COLCHÓN GALEÓN COMPACT ==========
  {
    name: 'Colchón Galeón Compact',
    slug: 'colchon-galeon-compact',
    subtitle: 'Muelles ensacados y visco en 24cm',
    description: 'El colchón Galeón Compact es un colchón de muelles ensacados con tejido Seaqual. Gracias a sus 24cm de altura y su firmeza media disfrutarás de un descanso totalmente confortable. La combinación de su acolchado Viscofoam y su núcleo Adapt-Tech ofrece una adaptación excelente. Este colchón se sirve enrollado y cuenta con envío exprés para que puedas tenerlo en tu casa en menos de 72 horas. Excelente relación calidad/precio.',
    story: 'Todo lo que esperas en 24 cm de altura. Perfecto para segunda residencia, habitaciones juveniles o para quienes buscan un colchón funcional de firmeza media con tecnología de muelles ensacados y viscoelástica a un precio ajustado.',
    price: 359,
    originalPrice: 519,
    compareAtPrice: 519,
    discount: 31,
    firmnessValue: 60,
    firmness: Firmness.MEDIA,
    transpirability: 90,
    adaptability: 85,
    height: 24,
    weight: 28,
    maxWeightPerPerson: 85,
    image: '/images/colchones/pikolin-galeon-compact.jpg',
    images: JSON.stringify([
      '/images/colchones/pikolin-galeon-compact.jpg',
      '/images/colchones/pikolin-galeon-compact-2.jpg'
    ]),
    gradient: 'from-teal-600 via-cyan-500 to-blue-500',
    rating: 4.5,
    reviewCount: 12,
    salesCount: 198,
    viewsCount: 2890,
    features: JSON.stringify([
      'Tejido Seaqual ecológico',
      'Altura compacta 24cm',
      'Viscofoam confortable',
      'Adapt-Tech 3 zonas',
      'Firmeza media funcional',
      'Precio ajustado'
    ]),
    techFeatures: JSON.stringify([
      'Núcleo Adapt-Tech® muelles ensacados',
      'Viscofoam® adaptativo',
      'Tejido Seaqual sostenible',
      'Altura de 24 cm',
      'Firmeza 60% (Media)',
      'Doble cara de descanso'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Triple Barrera® protección',
      'Seaqual Initiative'
    ]),
    tags: JSON.stringify(['ecologico', 'muelles-ensacados', 'compacto', 'media', 'economico', 'enrollado']),
    highlights: JSON.stringify([
      'Mejor precio',
      'Compacto 24cm',
      'Envío express'
    ]),
    warranty: 3,
    trialNights: 100,
    materials: JSON.stringify(['Tejido Seaqual', 'Viscofoam', 'Muelles Adapt-Tech', 'Poliéter', 'Fibra atérmica']),
    layers: JSON.stringify([
      'Tejido Seaqual ecológico',
      'Viscofoam',
      'Capa poliéter',
      'Fibra atérmica',
      'Poliéter reforzado alta densidad',
      'Núcleo Adapt-Tech muelles ensacados',
      'Poliéter reforzado',
      'Fibra atérmica',
      'Capa poliéter',
      'Viscofoam',
      'Tejido Seaqual'
    ]),
    badge: 'ECONÓMICO',
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    isActive: true,
    isEco: true,
    stock: 56,
    inStock: true,
    sku: 'PIKOLIN-GALEON-COMPACT-CM11675',
    deliveryDays: 3,
    freeShipping: true,
    cooling: false,
    hypoallergenic: true,
    washable: false,
    antiDustMite: true,
    reversible: true,
    silent: true,
    motionIsolation: true,
    edgeSupport: false,
    verified: true,
    bestValue: true,
    satisfaction: 90,
    position: 4
  },

  // ========== COLCHÓN PIKUP FUSSION ==========
  {
    name: 'Colchón PikUp Fussion',
    slug: 'colchon-pikup-fussion',
    subtitle: 'Premium enrollado de visco y muelles',
    description: 'PikUp Fussion es el modelo premium de los colchones PikUp. Este colchón de muelles ensacados ofrece el máximo nivel de confort y se adapta perfectamente a cada persona. De firmeza media-alta, mide 27 centímetros de altura. Al tumbarte sentirás una sensación de confort extra suave gracias a la combinación de su núcleo con una capa de espuma supersuave y otra de espuma viscoelástica. Este colchón cuenta con envío exprés, se sirve enrollado y llega a tu casa en 72 horas.',
    story: 'El modelo premium de la gama enrollada de Pikolin. Combina dos capas de viscoelástica (soft y firm) con muelles ensacados Adapt-Tech para ofrecer confort extrasuave con firmeza adicional. Perfecto para deportistas y parejas.',
    price: 529,
    originalPrice: 769,
    compareAtPrice: 769,
    discount: 31,
    firmnessValue: 70,
    firmness: Firmness.MEDIA_ALTA,
    transpirability: 92,
    adaptability: 93,
    height: 27,
    weight: 31,
    maxWeightPerPerson: 120,
    image: '/images/colchones/pikolin-pikup-fussion.jpg',
    images: JSON.stringify([
      '/images/colchones/pikolin-pikup-fussion.jpg',
      '/images/colchones/pikolin-pikup-fussion-2.jpg',
      '/images/colchones/pikolin-pikup-fussion-capas.jpg'
    ]),
    gradient: 'from-purple-600 via-fuchsia-500 to-pink-600',
    rating: 4.8,
    reviewCount: 21,
    salesCount: 345,
    viewsCount: 4780,
    features: JSON.stringify([
      'Doble capa viscoelástica',
      'Viscofoam Soft + Firm',
      'Muelles Adapt-Tech premium',
      'Confort extra suave',
      'Enrollado express 72h',
      'Independencia lechos total'
    ]),
    techFeatures: JSON.stringify([
      'Tecnología Adapt-Tech® muelles ensacados',
      'Viscofoam Soft + Viscofoam Firm',
      'Tejido Stretch premium',
      'Altura de 27 cm',
      'Firmeza 70% (Media-Alta)',
      'Enrollado en caja'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Triple Barrera® protección total',
      'Pikolin Sostenible',
      '65% acero reciclado'
    ]),
    tags: JSON.stringify(['premium', 'enrollado', 'muelles-ensacados', 'viscoelastica', 'media-alta', 'pikup']),
    highlights: JSON.stringify([
      'Premium enrollado',
      'Doble visco',
      'Express 72h'
    ]),
    warranty: 3,
    trialNights: 100,
    materials: JSON.stringify(['Tejido Stretch', 'Viscofoam Soft', 'Viscofoam Firm', 'Muelles Adapt-Tech', 'Poliéter Supersoft']),
    layers: JSON.stringify([
      'Tejido Stretch suave',
      'Capa poliéter supersuave',
      'Viscofoam Soft adaptativo',
      'Viscofoam Firm con firmeza',
      'Poliéter reforzado estabilizador',
      'Núcleo Adapt-Tech muelles ensacados',
      'Tejido malla transpirable'
    ]),
    badge: 'PREMIUM',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 32,
    inStock: true,
    sku: 'PIKOLIN-PIKUP-FUSSION-CM21679',
    deliveryDays: 3,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: false,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: false,
    satisfaction: 96,
    position: 5
  }
]

// ============================================================================
// VARIANTES DE TAMAÑOS - PIKOLIN
// ============================================================================

const variants = [
  { size: 'Individual 80x180', width: 80, length: 180, priceMultiplier: 0.48 },
  { size: 'Individual 90x190', width: 90, length: 190, priceMultiplier: 0.55 },
  { size: 'Individual 90x200', width: 90, length: 200, priceMultiplier: 0.58 },
  { size: 'Individual XL 105x190', width: 105, length: 190, priceMultiplier: 0.67 },
  { size: 'Individual XL 105x200', width: 105, length: 200, priceMultiplier: 0.70 },
  { size: 'Matrimonio 135x190', width: 135, length: 190, priceMultiplier: 0.82 },
  { size: 'Matrimonio 135x200', width: 135, length: 200, priceMultiplier: 0.86 },
  { size: 'Matrimonio 140x190', width: 140, length: 190, priceMultiplier: 0.88 },
  { size: 'Matrimonio 150x190', width: 150, length: 190, priceMultiplier: 0.94 },
  { size: 'Queen 150x200', width: 150, length: 200, priceMultiplier: 1.0, isPopular: true },
  { size: 'King 160x200', width: 160, length: 200, priceMultiplier: 1.07 },
  { size: 'Super King 180x190', width: 180, length: 190, priceMultiplier: 1.17 },
  { size: 'Super King 180x200', width: 180, length: 200, priceMultiplier: 1.23 },
  { size: 'Super King 200x200', width: 200, length: 200, priceMultiplier: 1.37 }
]

// ============================================================================
// FUNCIÓN SEED
// ============================================================================

async function main() {
  console.log('🌱 Iniciando seed de productos Pikolin...\n')

  // Limpiar productos existentes de Pikolin
  console.log('🗑️  Limpiando productos Pikolin...')
  const pikolinProducts = await prisma.product.findMany({
    where: {
      sku: {
        startsWith: 'PIKOLIN-'
      }
    }
  })
  
  for (const product of pikolinProducts) {
    await prisma.productVariant.deleteMany({
      where: { productId: product.id }
    })
  }
  
  await prisma.product.deleteMany({
    where: {
      sku: {
        startsWith: 'PIKOLIN-'
      }
    }
  })
  console.log('✅ Productos Pikolin eliminados\n')

  // Crear productos
  console.log('📦 Creando productos Pikolin...\n')
  
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
          stock: Math.floor(Math.random() * 35) + 18,
          sku: `${productData.sku}-${variantData.width}X${variantData.length}`,
          barcode: `8${String(Math.random()).slice(2, 14)}`,
          weight: productData.weight ? Math.round(productData.weight * variantData.priceMultiplier) : null,
          isAvailable: true,
          isPopular: variantData.isPopular || false
        }
      })
    }
  }

  console.log(`\n✅ ${products.length} productos Pikolin creados con éxito`)
  console.log(`✅ ${products.length * variants.length} variantes creadas\n`)

  // Estadísticas
  const totalProducts = await prisma.product.count({
    where: {
      sku: {
        startsWith: 'PIKOLIN-'
      }
    }
  })
  const totalVariants = await prisma.productVariant.count()
  
  console.log('📊 Estadísticas finales Pikolin:')
  console.log(`   • Productos Pikolin: ${totalProducts}`)
  console.log(`   • Variantes totales: ${totalVariants}`)
  console.log(`   • Productos premium (>500€): ${products.filter(p => p.price > 500).length}`)
  console.log(`   • Productos bestseller: ${products.filter(p => p.isBestSeller).length}`)
  console.log(`   • Productos ECO (Seaqual): ${products.filter(p => p.isEco).length}`)
  console.log(`   • Productos enrollados: ${products.filter(p => p.tags.includes('enrollado')).length}`)
  console.log(`   • Recomendado OCU: ${products.filter(p => p.tags.includes('ocu')).length}`)
  console.log('\n🎉 ¡Seed Pikolin completado con éxito!')
  console.log('\n📋 Productos Pikolin creados:')
  products.forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.name} - ${p.price}€ (${p.reviewCount} opiniones) - ${p.badge}`)
  })
}

// Ejecutar seed
main()
  .catch((e) => {
    console.error('❌ Error en seed Pikolin:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })