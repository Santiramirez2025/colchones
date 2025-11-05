// prisma/seed-astral-nature.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================================
// DATOS DE PRODUCTOS - ASTRAL NATURE 2025
// ============================================================================

const products = [
  // ========== COLCHÓN NERVA ==========
  {
    name: 'Colchón Nerva',
    slug: 'colchon-nerva-astral-nature',
    subtitle: 'El placer saludable de un sueño natural',
    description: 'El colchón Nerva de Astral Nature es un colchón artesanal fabricado a mano con materiales 100% naturales. Equipado con 1.600-1.800 muelles ensacados en 5 zonas diferenciadas y látex 100% natural. Sus capas de seda natural, lana de camello, algodón puro y lino se disponen a mano para una perfecta colocación. Combina la naturaleza y la artesanía en un equipo de descanso único y exclusivo.',
    story: 'Hecho a mano por artesanos especializados en descanso. El Nerva es el producto estrella de Astral Nature, un colchón donde la naturaleza y la artesanía se unen para crear el descanso óptimo. Cada capa natural se coloca a mano con precisión y cuidado.',
    price: 1749,
    originalPrice: 3499,
    compareAtPrice: 3499,
    discount: 50,
    firmnessValue: 65,
    firmness: Firmness.MEDIA_ALTA,
    transpirability: 95,
    adaptability: 92,
    height: 31,
    weight: 42,
    maxWeightPerPerson: 140,
    image: '/images/colchones/nerva-astral-nature.jpg',
    images: JSON.stringify([
      '/images/colchones/nerva-astral-nature.jpg',
      '/images/colchones/nerva-astral-nature-2.jpg',
      '/images/colchones/nerva-detalle.jpg',
      '/images/colchones/nerva-capas.jpg'
    ]),
    gradient: 'from-emerald-700 via-green-600 to-teal-600',
    rating: 4.8,
    reviewCount: 89,
    salesCount: 456,
    viewsCount: 6780,
    features: JSON.stringify([
      '1.600-1.800 muelles ensacados',
      'Látex 100% natural',
      'Seda natural y lana de camello',
      'Algodón puro y lino',
      'Fabricación artesanal a mano',
      '5 zonas de descanso independientes',
      'Climatización natural',
      'Doble cara: verano e invierno'
    ]),
    techFeatures: JSON.stringify([
      '575 muelles/m² ensacados Multipocket',
      'Látex 100% natural',
      'Altura de 31 cm (28+3)',
      'Firmeza 65% (Media-Alta)',
      'Transpirabilidad 95%',
      'Tejido viscosa 100%',
      'Sistema Pur Cell Bio Natural',
      '5 zonas diferenciadas'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'ISO 9001:2000',
      'Tratamiento Sanitized',
      'Materiales 100% Naturales',
      'Fabricado en España'
    ]),
    tags: JSON.stringify(['natural', 'artesanal', 'muelles-ensacados', 'latex-natural', 'premium', 'ecologico']),
    highlights: JSON.stringify([
      '100% materiales naturales',
      'Hecho a mano',
      'Látex natural',
      'Climatización natural'
    ]),
    warranty: 15,
    trialNights: 100,
    materials: JSON.stringify([
      'Muelles ensacados Multipocket',
      'Látex 100% natural',
      'Seda natural',
      'Lana de camello',
      'Algodón puro',
      'Lino natural',
      'Viscosa 100%',
      'Pur Cell Bio Natural System'
    ]),
    layers: JSON.stringify([
      'Tejido viscosa 100%',
      'Acolchado cara verano: Algodón 100%',
      'Acolchado cara invierno: Lana de camello',
      'Seda natural',
      'Lino de gran pureza',
      'Látex 100% natural',
      'Sistema Pur Cell Bio Natural',
      'Bloque 1.600-1.800 muelles ensacados 5 zonas',
      'Base estabilizadora'
    ]),
    badge: 'ARTESANAL',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: true,
    stock: 34,
    inStock: true,
    sku: 'AN-NERVA-001',
    deliveryDays: 15,
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
    satisfaction: 96,
    position: 1
  },

  // ========== COLCHÓN NERVA FIRM ==========
  {
    name: 'Colchón Nerva Firm',
    slug: 'colchon-nerva-firm-astral-nature',
    subtitle: 'La versión más firme del Nerva',
    description: 'El colchón Nerva Firm es la versión más firme del icónico Nerva de Astral Nature. Mantiene todos los materiales naturales premium como lana de camello y algodón orgánico, pero con una configuración que proporciona mayor firmeza. Ofrece una gran adaptabilidad con climatización natural, siendo un colchón firme pero para nada duro, ideal para quienes buscan mayor soporte.',
    story: 'Para los que aman el Nerva pero buscan más firmeza. El Nerva Firm mantiene toda la calidad artesanal y materiales naturales, pero con una configuración optimizada para proporcionar mayor soporte sin perder la comodidad.',
    price: 1849,
    originalPrice: 3699,
    compareAtPrice: 3699,
    discount: 50,
    firmnessValue: 80,
    firmness: Firmness.FIRME,
    transpirability: 95,
    adaptability: 88,
    height: 31,
    weight: 43,
    maxWeightPerPerson: 150,
    image: '/images/colchones/nerva-firm-astral-nature.jpg',
    images: JSON.stringify([
      '/images/colchones/nerva-firm-astral-nature.jpg',
      '/images/colchones/nerva-firm-2.jpg',
      '/images/colchones/nerva-firm-detalle.jpg'
    ]),
    gradient: 'from-slate-700 via-gray-600 to-zinc-600',
    rating: 4.7,
    reviewCount: 52,
    salesCount: 289,
    viewsCount: 4560,
    features: JSON.stringify([
      'Versión más firme del Nerva',
      'Muelles ensacados alta densidad',
      'Lana de camello premium',
      'Algodón orgánico',
      'Climatización natural',
      'Gran adaptabilidad',
      'Firme pero no duro',
      'Fabricación artesanal'
    ]),
    techFeatures: JSON.stringify([
      'Muelles ensacados configuración firme',
      'Altura de 31 cm',
      'Firmeza 80% (Firme)',
      'Transpirabilidad 95%',
      'Materiales naturales premium',
      '5 zonas de descanso',
      'Doble cara estacional'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'ISO 9001',
      'Tratamiento Sanitized',
      'Materiales 100% Naturales',
      'Fabricado en España'
    ]),
    tags: JSON.stringify(['natural', 'firme', 'muelles-ensacados', 'artesanal', 'premium']),
    highlights: JSON.stringify([
      'Mayor firmeza',
      'Materiales naturales',
      'Hecho a mano',
      'Climatización natural'
    ]),
    warranty: 15,
    trialNights: 100,
    materials: JSON.stringify([
      'Muelles ensacados alta densidad',
      'Lana de camello',
      'Algodón orgánico',
      'Viscosa 100%',
      'Materiales naturales'
    ]),
    layers: JSON.stringify([
      'Tejido viscosa 100%',
      'Acolchado lana de camello',
      'Acolchado algodón orgánico',
      'Sistema de soporte reforzado',
      'Bloque muelles ensacados firme',
      'Base estabilizadora'
    ]),
    badge: 'FIRME',
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    isActive: true,
    isEco: true,
    stock: 28,
    inStock: true,
    sku: 'AN-NERVA-FIRM-001',
    deliveryDays: 15,
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
    bestValue: false,
    satisfaction: 94,
    position: 2
  },

  // ========== COLCHÓN TABIT ==========
  {
    name: 'Colchón Tabit',
    slug: 'colchon-tabit-astral-nature',
    subtitle: 'Confort natural y adaptabilidad excepcional',
    description: 'El colchón Tabit de Astral Nature combina muelles ensacados con 5 zonas de descanso y acolchados de materiales naturales premium como Biolana y Biocotton orgánico. Gracias a la Pur Cell Bio y la Viscosa 100% Natural, proporciona una gran suavidad, comodidad y adaptabilidad excepcional con climatización natural. Un colchón de firmeza media-suave ideal para un descanso envolvente.',
    story: 'El Tabit representa la perfecta armonía entre tecnología de muelles ensacados y materiales orgánicos naturales. Cada capa ha sido diseñada para proporcionar el equilibrio perfecto entre soporte y adaptabilidad.',
    price: 2527,
    originalPrice: 5054,
    compareAtPrice: 5054,
    discount: 50,
    firmnessValue: 55,
    firmness: Firmness.MEDIA,
    transpirability: 92,
    adaptability: 95,
    height: 30,
    weight: 40,
    maxWeightPerPerson: 130,
    image: '/images/colchones/tabit-astral-nature.jpg',
    images: JSON.stringify([
      '/images/colchones/tabit-astral-nature.jpg',
      '/images/colchones/tabit-2.jpg',
      '/images/colchones/tabit-detalle.jpg',
      '/images/colchones/tabit-capas.jpg'
    ]),
    gradient: 'from-amber-700 via-orange-600 to-yellow-600',
    rating: 4.9,
    reviewCount: 73,
    salesCount: 378,
    viewsCount: 5890,
    features: JSON.stringify([
      'Muelles ensacados 5 zonas',
      'Biolana orgánica premium',
      'Biocotton orgánico',
      'Pur Cell Bio Natural',
      'Viscosa 100% natural',
      'Gran adaptabilidad',
      'Climatización natural',
      'Suavidad excepcional'
    ]),
    techFeatures: JSON.stringify([
      'Muelles ensacados 5 zonas independientes',
      'Altura de 30 cm',
      'Firmeza 55% (Media-Suave)',
      'Transpirabilidad 92%',
      'Tejido viscosa 100%',
      'Sistema Pur Cell Bio',
      'Asas de sujeción',
      'Válvulas laterales de ventilación'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Materiales Orgánicos Certificados',
      'ISO 9001',
      'Tratamiento Sanitized',
      'Fabricado en España'
    ]),
    tags: JSON.stringify(['natural', 'organico', 'muelles-ensacados', 'adaptable', 'premium', 'ecologico']),
    highlights: JSON.stringify([
      'Materiales orgánicos',
      'Alta adaptabilidad',
      '5 zonas diferenciadas',
      'Suavidad premium'
    ]),
    warranty: 15,
    trialNights: 100,
    materials: JSON.stringify([
      'Muelles ensacados',
      'Biolana orgánica',
      'Biocotton orgánico',
      'Pur Cell Bio',
      'Viscosa 100% natural',
      'Fibra de coco'
    ]),
    layers: JSON.stringify([
      'Tejido viscosa 100%',
      'Acolchado Biocotton orgánico',
      'Acolchado Biolana orgánica',
      'Sistema Pur Cell Bio Natural',
      'Bloque muelles ensacados 5 zonas',
      'Núcleo de soporte',
      'Base estabilizadora'
    ]),
    badge: 'PREMIUM',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: true,
    stock: 22,
    inStock: true,
    sku: 'AN-TABIT-001',
    deliveryDays: 18,
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
    satisfaction: 97,
    position: 3
  },

  // ========== COLCHÓN TABIT DOUBLE CONFORT ==========
  {
    name: 'Colchón Tabit Double Confort',
    slug: 'colchon-tabit-double-confort-astral-nature',
    subtitle: 'Doble capa de confort excepcional',
    description: 'El colchón Tabit Double Confort de Astral Nature eleva el concepto de descanso natural al máximo nivel. Con muelles ensacados en 5 zonas, una carcasa adicional de micromuelles ensacados y Bio Pure Cell, ofrece un nivel de adaptabilidad y confort sin precedentes. Sus acolchados naturales de bioalgodón, biolana y fibra de coco proporcionan una experiencia de descanso única y excepcional.',
    story: 'La evolución del Tabit. El Double Confort añade una carcasa de micromuelles ensacados para duplicar la sensación de adaptabilidad y confort, creando un colchón de dos niveles de respuesta que se adapta milimétricamente a tu cuerpo.',
    price: 2899,
    originalPrice: 5799,
    compareAtPrice: 5799,
    discount: 50,
    firmnessValue: 50,
    firmness: Firmness.MEDIA,
    transpirability: 92,
    adaptability: 98,
    height: 30,
    weight: 44,
    maxWeightPerPerson: 135,
    image: '/images/colchones/tabit-double-confort.jpg',
    images: JSON.stringify([
      '/images/colchones/tabit-double-confort.jpg',
      '/images/colchones/tabit-double-2.jpg',
      '/images/colchones/tabit-double-detalle.jpg',
      '/images/colchones/tabit-double-capas.jpg'
    ]),
    gradient: 'from-rose-700 via-pink-600 to-fuchsia-600',
    rating: 4.9,
    reviewCount: 41,
    salesCount: 167,
    viewsCount: 3450,
    features: JSON.stringify([
      'Muelles ensacados + Carcasa micromuelles',
      'Doble sistema de confort',
      'Bio Pure Cell avanzado',
      'Bioalgodón premium',
      'Biolana orgánica',
      'Fibra de coco natural',
      'Máxima adaptabilidad',
      'Climatización óptima'
    ]),
    techFeatures: JSON.stringify([
      'Doble sistema: Muelles + Micromuelles',
      'Carcasa micropocket adicional',
      'Altura de 30 cm',
      'Firmeza 50% (Media-Suave)',
      'Transpirabilidad 92%',
      'Adaptabilidad 98%',
      'Tejido viscosa 100%',
      '5 zonas independientes'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Materiales Orgánicos Certificados',
      'ISO 9001',
      'Tratamiento Sanitized',
      'Certificado Bio',
      'Fabricado en España'
    ]),
    tags: JSON.stringify(['natural', 'organico', 'micromuelles', 'doble-confort', 'ultra-premium', 'ecologico']),
    highlights: JSON.stringify([
      'Doble sistema muelles',
      'Máxima adaptabilidad 98%',
      'Micromuelles ensacados',
      'Ultra premium'
    ]),
    warranty: 15,
    trialNights: 120,
    materials: JSON.stringify([
      'Muelles ensacados',
      'Micromuelles ensacados',
      'Bio Pure Cell',
      'Bioalgodón',
      'Biolana orgánica',
      'Fibra de coco',
      'Viscosa 100%'
    ]),
    layers: JSON.stringify([
      'Tejido viscosa 100%',
      'Acolchado bioalgodón',
      'Acolchado biolana orgánica',
      'Fibra de coco natural',
      'Carcasa micromuelles ensacados',
      'Sistema Bio Pure Cell',
      'Bloque muelles ensacados 5 zonas',
      'Núcleo de soporte reforzado',
      'Base estabilizadora'
    ]),
    badge: 'ULTRA PREMIUM',
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    isActive: true,
    isEco: true,
    stock: 15,
    inStock: true,
    sku: 'AN-TABIT-DC-001',
    deliveryDays: 20,
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
    satisfaction: 98,
    position: 4
  }
]

// ============================================================================
// VARIANTES DE TAMAÑOS - ASTRAL NATURE
// ============================================================================

const variants = [
  { size: 'Individual 90x190', width: 90, length: 190, priceMultiplier: 0.55 },
  { size: 'Individual 90x200', width: 90, length: 200, priceMultiplier: 0.6 },
  { size: 'Matrimonio 135x190', width: 135, length: 190, priceMultiplier: 0.8 },
  { size: 'Matrimonio 150x190', width: 150, length: 190, priceMultiplier: 0.9 },
  { size: 'Queen 150x200', width: 150, length: 200, priceMultiplier: 1.0, isPopular: true },
  { size: 'King 160x200', width: 160, length: 200, priceMultiplier: 1.15 },
  { size: 'Super King 180x200', width: 180, length: 200, priceMultiplier: 1.3 },
  { size: 'Super King 200x200', width: 200, length: 200, priceMultiplier: 1.5 }
]

// ============================================================================
// FUNCIÓN SEED
// ============================================================================

async function main() {
  console.log('🌱 Iniciando seed de productos Astral Nature...\n')

  // NO LIMPIAR - Solo añadir productos
  console.log('➕ Añadiendo productos Astral Nature a la base de datos existente...\n')

  // Crear productos
  console.log('📦 Creando productos Astral Nature...\n')
  
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
          stock: Math.floor(Math.random() * 30) + 15,
          sku: `${productData.sku}-${variantData.width}X${variantData.length}`,
          barcode: `8${String(Math.random()).slice(2, 14)}`,
          weight: productData.weight ? Math.round(productData.weight * variantData.priceMultiplier) : null,
          isAvailable: true,
          isPopular: variantData.isPopular || false
        }
      })
    }
  }

  console.log(`\n✅ ${products.length} productos Astral Nature creados con éxito`)
  console.log(`✅ ${products.length * variants.length} variantes creadas\n`)

  // Estadísticas
  const totalProducts = await prisma.product.count()
  const totalVariants = await prisma.productVariant.count()
  const astralnatureProducts = await prisma.product.count({
    where: {
      slug: {
        contains: 'astral-nature'
      }
    }
  })
  
  console.log('📊 Estadísticas finales:')
  console.log(`   • Productos totales en BD: ${totalProducts}`)
  console.log(`   • Variantes totales en BD: ${totalVariants}`)
  console.log(`   • Productos Astral Nature: ${astralnatureProducts}`)
  console.log(`   • Productos ECO Astral Nature: ${products.filter(p => p.isEco).length}`)
  console.log(`   • Productos bestseller: ${products.filter(p => p.isBestSeller).length}`)
  console.log(`   • Productos nuevos: ${products.filter(p => p.isNew).length}`)
  
  console.log('\n🎉 ¡Seed Astral Nature completado con éxito!')
  console.log('\n📋 Productos Astral Nature creados:')
  products.forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.name} - ${p.price}€ (${p.reviewCount} opiniones) [${p.badge}]`)
  })
  console.log('\n🌿 Todos los colchones Astral Nature están fabricados con materiales 100% naturales')
}

// Ejecutar seed
main()
  .catch((e) => {
    console.error('❌ Error en seed Astral Nature:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  