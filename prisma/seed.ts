// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper para firmeza
function getFirmnessText(percentage: number): string {
  if (percentage <= 40) return 'Suave'
  if (percentage <= 60) return 'Media'
  if (percentage <= 80) return 'Media-Firme'
  return 'Firme'
}

// Helper para gradientes
function getGradient(firmness: number): string {
  if (firmness <= 40) return 'from-blue-500 to-cyan-500'
  if (firmness <= 60) return 'from-violet-500 to-fuchsia-600'
  if (firmness <= 80) return 'from-purple-500 to-pink-600'
  return 'from-slate-600 to-zinc-700'
}

async function main() {
  console.log('🌱 Iniciando seed...')

  // Limpiar datos existentes
  console.log('🗑️  Limpiando datos...')
  await prisma.review.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.newsletter.deleteMany()

  // ============================================================================
  // CATEGORÍAS
  // ============================================================================
  console.log('📁 Creando categorías...')
  
  const categoryPremium = await prisma.category.create({
    data: {
      name: 'Colchones Premium',
      slug: 'premium',
      description: 'Colección premium con la mejor tecnología',
      icon: '✨',
      gradient: 'from-violet-500 to-fuchsia-600',
      order: 1,
      isActive: true,
      isFeatured: true,
    }
  })

  const categoryMemoryFoam = await prisma.category.create({
    data: {
      name: 'Memory Foam',
      slug: 'memory-foam',
      description: 'Colchones de viscoelástica de alta densidad',
      icon: '☁️',
      gradient: 'from-blue-500 to-cyan-600',
      order: 2,
      isActive: true,
      isFeatured: true,
    }
  })

  const categoryHybrid = await prisma.category.create({
    data: {
      name: 'Híbridos',
      slug: 'hibridos',
      description: 'Combinación perfecta de muelles y viscoelástica',
      icon: '⚡',
      gradient: 'from-orange-500 to-red-600',
      order: 3,
      isActive: true,
    }
  })

  // ============================================================================
  // CUPONES
  // ============================================================================
  console.log('🎟️  Creando cupones...')
  
  await prisma.coupon.create({
    data: {
      code: 'BIENVENIDO10',
      name: 'Descuento bienvenida',
      description: '10% de descuento en tu primera compra',
      discountType: 'percentage',
      discountValue: 10,
      minPurchase: 300,
      maxDiscount: 150,
      usageLimit: 1000,
      isActive: true,
      expiresAt: new Date('2025-12-31')
    }
  })

  await prisma.coupon.create({
    data: {
      code: 'VERANO2025',
      name: 'Campaña verano',
      description: '100€ de descuento en compras superiores a 800€',
      discountType: 'fixed',
      discountValue: 100,
      minPurchase: 800,
      isActive: true,
      expiresAt: new Date('2025-09-30')
    }
  })

  // ============================================================================
  // PRODUCTOS PRINCIPALES (Solo 8 top)
  // ============================================================================
  console.log('🛏️  Creando productos principales...')

  const products = [
    {
      name: 'Colchón Lexus Premium',
      categoryId: categoryPremium.id,
      price: 1299,
      originalPrice: 1599,
      firmnessValue: 75,
      transpirability: 95,
      height: 32,
      weight: 38,
      isFeatured: true,
      isBestSeller: true,
      isNew: false,
      badge: 'PREMIUM',
      cooling: true,
      hypoallergenic: true,
      eco: true,
      washable: true,
      satisfaction: 98,
      subtitle: 'El colchón más exclusivo de nuestra colección',
      description: 'Tecnología europea de última generación con 7 zonas diferenciadas de confort. Sistema de muelles ensacados de precisión con capa superior de gel viscoelástico termorregulador.',
      story: 'Diseñado para quienes buscan el máximo confort y durabilidad. Cada detalle ha sido pensado para proporcionar el descanso perfecto.',
      features: [
        'Sistema de muelles ensacados de precisión',
        'Capa de gel viscoelástico termorregulador',
        '7 zonas diferenciadas de confort',
        'Tejido Air Fresh con tratamiento antiácaros',
        'Refuerzos perimetrales HD'
      ],
      techFeatures: [
        'Núcleo: 1200 muelles ensacados individuales',
        'Capa viscoelástica: 5cm de gel memory foam',
        'Altura total: 32cm',
        'Peso aproximado: 38kg',
        'Certificaciones: CertiPUR-US, OEKO-TEX Standard 100'
      ],
      highlights: [
        'Máxima adaptabilidad',
        'Sistema cooling avanzado',
        'Independencia de lechos total'
      ]
    },
    {
      name: 'Colchón Gaudí Elite',
      categoryId: categoryHybrid.id,
      price: 899,
      originalPrice: 1199,
      firmnessValue: 70,
      transpirability: 90,
      height: 30,
      weight: 33,
      isFeatured: true,
      isBestSeller: true,
      badge: '-25%',
      cooling: true,
      hypoallergenic: true,
      eco: false,
      washable: true,
      satisfaction: 96,
      subtitle: 'Obra maestra del descanso híbrido',
      description: 'Colchón híbrido que combina lo mejor de muelles ensacados y viscoelástica. Sistema Multisac de última generación para adaptación perfecta.',
      story: 'Inspirado en la genialidad de Gaudí, este colchón es una obra de arte funcional que transforma tu descanso.',
      features: [
        'Sistema híbrido muelles + viscoelástica',
        'Tecnología Multisac System',
        'Tejido 3D transpirable',
        'Acolchado progresivo',
        'Tratamiento higiénico permanente'
      ],
      techFeatures: [
        'Núcleo: 800 muelles Multisac',
        'Viscoelástica: 3cm de alta densidad',
        'Espuma HR: 2cm de transición',
        'Funda: Tejido Strech 3D',
        'Garantía: 10 años'
      ],
      highlights: [
        'Confort equilibrado',
        'Excelente ventilación',
        'Relación calidad-precio óptima'
      ]
    },
    {
      name: 'Colchón Golden Supreme',
      categoryId: categoryMemoryFoam.id,
      price: 649,
      originalPrice: 1299,
      firmnessValue: 65,
      transpirability: 85,
      height: 28,
      weight: 29,
      isFeatured: true,
      isBestSeller: true,
      badge: '50% OFF',
      cooling: false,
      hypoallergenic: true,
      eco: false,
      washable: true,
      satisfaction: 94,
      subtitle: 'Lujo accesible para todos',
      description: 'Memory foam de alta densidad con adaptación progresiva. Perfecto equilibrio entre soporte y confort a un precio excepcional.',
      story: 'Oro puro en relación calidad-precio. Un colchón premium ahora al alcance de todos.',
      features: [
        'Viscoelástica de alta densidad',
        'Adaptación progresiva al cuerpo',
        'Sistema de ventilación integrado',
        'Funda acolchada extraíble',
        'Tratamiento antiácaros'
      ],
      techFeatures: [
        'Núcleo: Espuma HR 30kg/m³',
        'Viscoelástica: 4cm adaptativa',
        'Altura: 28cm',
        'Densidad núcleo: Alta resistencia',
        'Prueba: 100 noches'
      ],
      highlights: [
        'Mejor precio garantizado',
        'Confort viscoelástico',
        'Oferta por tiempo limitado'
      ]
    },
    {
      name: 'Colchón Titán Ultra',
      categoryId: categoryPremium.id,
      price: 1099,
      originalPrice: null,
      firmnessValue: 95,
      transpirability: 88,
      height: 30,
      weight: 42,
      isFeatured: false,
      isBestSeller: false,
      badge: 'EXTRA FIRME',
      cooling: true,
      hypoallergenic: true,
      eco: true,
      washable: true,
      satisfaction: 97,
      subtitle: 'Máxima firmeza para soporte total',
      description: 'Diseñado específicamente para personas que necesitan firmeza extra. Ideal para durmientes de espalda y personas con peso elevado.',
      story: 'Firmeza titánica sin comprometer el confort. La solución definitiva para quienes necesitan soporte máximo.',
      features: [
        'Firmeza máxima 95%',
        'Refuerzos perimetrales reforzados',
        'Núcleo HR de ultra alta densidad',
        'Sistema de soporte lumbar',
        'Ideal para +90kg'
      ],
      techFeatures: [
        'Núcleo: HR 40kg/m³',
        'Capa firmeza: Espuma HD',
        'Refuerzos: Perimetrales 3D',
        'Sistema: Soporte lumbar activo',
        'Garantía: 15 años'
      ],
      highlights: [
        'Firmeza extrema',
        'Para durmientes pesados',
        'Soporte lumbar avanzado'
      ]
    },
    {
      name: 'Colchón Serena Cloud',
      categoryId: categoryMemoryFoam.id,
      price: 799,
      originalPrice: 999,
      firmnessValue: 45,
      transpirability: 80,
      height: 26,
      weight: 26,
      isFeatured: true,
      isBestSeller: false,
      isNew: true,
      badge: 'NUEVO',
      cooling: false,
      hypoallergenic: true,
      eco: true,
      washable: true,
      satisfaction: 95,
      subtitle: 'Suavidad envolvente como una nube',
      description: 'Viscoelástica premium de baja firmeza para quienes prefieren un colchón suave y acogedor. Perfecto para durmientes laterales.',
      story: 'Como descansar en una nube. Diseñado para proporcionar el abrazo perfecto durante toda la noche.',
      features: [
        'Suavidad premium',
        'Ideal para durmientes laterales',
        'Viscoelástica de célula abierta',
        'Acolchado extra mullido',
        'Funda ultra suave'
      ],
      techFeatures: [
        'Firmeza: Suave (45%)',
        'Viscoelástica: 6cm de baja densidad',
        'Núcleo: Espuma Soft HR',
        'Funda: Bambú hipoalergénico',
        'Certificado: OEKO-TEX'
      ],
      highlights: [
        'Máxima suavidad',
        'Perfecto para lateral',
        'Materiales ecológicos'
      ]
    },
    {
      name: 'Colchón Brisa Fresh',
      categoryId: categoryHybrid.id,
      price: 949,
      originalPrice: null,
      firmnessValue: 68,
      transpirability: 98,
      height: 29,
      weight: 31,
      isFeatured: true,
      isBestSeller: false,
      isNew: true,
      badge: 'COOLING',
      cooling: true,
      hypoallergenic: true,
      eco: false,
      washable: true,
      satisfaction: 96,
      subtitle: 'Máxima frescura toda la noche',
      description: 'Tecnología cooling avanzada con gel termorregulador y canales de ventilación. Ideal para personas calurosas y climas cálidos.',
      story: 'Como una brisa fresca en las noches de verano. Duerme fresco incluso en las noches más calurosas.',
      features: [
        'Sistema Cooling Pro',
        'Gel termorregulador activo',
        'Canales de ventilación 360º',
        'Tejido Air Cool transpirable',
        'Disipación rápida del calor'
      ],
      techFeatures: [
        'Gel cooling: Capa de 2cm',
        'Ventilación: Sistema 3D Flow',
        'Muelles: Micro ensacados',
        'Tejido: Air Cool Tech',
        'Transpirabilidad: 98%'
      ],
      highlights: [
        'Efecto refrigerante',
        'Perfecto para verano',
        'Sin sudoración nocturna'
      ]
    },
    {
      name: 'Colchón Element Natural',
      categoryId: categoryMemoryFoam.id,
      price: 699,
      originalPrice: 899,
      firmnessValue: 60,
      transpirability: 82,
      height: 27,
      weight: 27,
      isFeatured: false,
      isBestSeller: false,
      badge: null,
      cooling: false,
      hypoallergenic: true,
      eco: true,
      washable: true,
      satisfaction: 93,
      subtitle: 'Equilibrio natural perfecto',
      description: 'Materiales naturales y ecológicos. Látex natural combinado con espumas certificadas. Para los que buscan un descanso sostenible.',
      story: 'Los elementos de la naturaleza unidos para tu descanso. Sostenible y confortable.',
      features: [
        'Látex 100% natural',
        'Materiales ecológicos certificados',
        'Libre de químicos nocivos',
        'Tejido orgánico de algodón',
        'Producción sostenible'
      ],
      techFeatures: [
        'Látex: Natural Talalay',
        'Espumas: CertiPUR certificadas',
        'Funda: Algodón orgánico',
        'Certificaciones: GOTS, OEKO-TEX',
        'Reciclable: 95%'
      ],
      highlights: [
        'Materiales naturales',
        'Ecológico certificado',
        'Hipoalergénico total'
      ]
    },
    {
      name: 'Colchón Prisma Classic',
      categoryId: categoryMemoryFoam.id,
      price: 449,
      originalPrice: 599,
      firmnessValue: 70,
      transpirability: 75,
      height: 24,
      weight: 22,
      isFeatured: false,
      isBestSeller: true,
      badge: 'MEJOR PRECIO',
      cooling: false,
      hypoallergenic: true,
      eco: false,
      washable: false,
      satisfaction: 91,
      subtitle: 'Calidad esencial a precio increíble',
      description: 'Colchón de calidad esencial perfecto para habitaciones de invitados, segundas residencias o presupuestos ajustados sin renunciar al confort.',
      story: 'La opción inteligente. Calidad garantizada al mejor precio del mercado.',
      features: [
        'Precio imbatible',
        'Calidad garantizada',
        'Confort equilibrado',
        'Fácil mantenimiento',
        'Entrega rápida'
      ],
      techFeatures: [
        'Altura: 24cm compactos',
        'Espuma: HR 25kg/m³',
        'Acolchado: Confort basic',
        'Funda: Tejido acolchado',
        'Garantía: 10 años'
      ],
      highlights: [
        'Precio excepcional',
        'Calidad garantizada',
        'Ideal segunda vivienda'
      ]
    }
  ]

  // Tallas disponibles
  const sizes = [
    { size: '90x190', multiplier: 1 },
    { size: '105x190', multiplier: 1.15 },
    { size: '135x190', multiplier: 1.35 },
    { size: '150x190', multiplier: 1.5 },
    { size: '160x200', multiplier: 1.65 },
    { size: '180x200', multiplier: 1.85 }
  ]

  // Crear productos
  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    const slug = p.name.toLowerCase()
      .replace('colchón ', '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')

    const discount = p.originalPrice 
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : 0

    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: slug,
        subtitle: p.subtitle,
        description: p.description,
        story: p.story,
        
        price: p.price,
        originalPrice: p.originalPrice,
        discount: discount,
        
        firmnessValue: p.firmnessValue,
        firmness: getFirmnessText(p.firmnessValue),
        transpirability: p.transpirability,
        height: p.height,
        weight: p.weight,
        
        rating: 4.5 + Math.random() * 0.5,
        reviewCount: Math.floor(Math.random() * 1500) + 300,
        salesCount: Math.floor(Math.random() * 500) + 100,
        viewsCount: Math.floor(Math.random() * 5000) + 1000,
        
        image: `/products/${slug}/main.jpg`,
        images: JSON.stringify([
          `/products/${slug}/main.jpg`,
          `/products/${slug}/detail-1.jpg`,
          `/products/${slug}/detail-2.jpg`,
          `/products/${slug}/lifestyle.jpg`
        ]),
        videoUrl: null,
        gradient: getGradient(p.firmnessValue),
        
        features: JSON.stringify(p.features),
        techFeatures: JSON.stringify(p.techFeatures),
        highlights: JSON.stringify(p.highlights),
        certifications: JSON.stringify([
          'CertiPUR-US®',
          'OEKO-TEX Standard 100',
          'ISO 9001:2015'
        ]),
        tags: JSON.stringify([
          p.badge?.toLowerCase() || '',
          getFirmnessText(p.firmnessValue).toLowerCase(),
          p.cooling ? 'cooling' : '',
          p.eco ? 'eco' : ''
        ].filter(Boolean)),
        
        materials: JSON.stringify([
          'Viscoelástica premium',
          'Espuma HR',
          'Tejido técnico'
        ]),
        
        badge: p.badge,
        isNew: p.isNew || false,
        isBestSeller: p.isBestSeller,
        isFeatured: p.isFeatured,
        isActive: true,
        isEco: p.eco,
        
        cooling: p.cooling,
        hypoallergenic: p.hypoallergenic,
        eco: p.eco,
        washable: p.washable,
        verified: true,
        bestValue: discount >= 40,
        satisfaction: p.satisfaction,
        
        stock: Math.floor(Math.random() * 40) + 15,
        inStock: true,
        lowStockThreshold: 10,
        sku: `SP-${String(i + 1).padStart(3, '0')}`,
        deliveryDays: 2,
        freeShipping: true,
        warranty: 10,
        trialNights: 100,
        
        position: i,
        categoryId: p.categoryId,
        
        metaTitle: `${p.name} - Descanso Premium | Envío Gratis`,
        metaDescription: `${p.subtitle}. ${p.description.substring(0, 150)}...`,
        metaKeywords: `${slug}, colchón, ${getFirmnessText(p.firmnessValue)}`
      }
    })

    // Crear variantes
    for (const sizeData of sizes) {
      await prisma.productVariant.create({
        data: {
          productId: product.id,
          size: sizeData.size,
          dimensions: `${sizeData.size.split('x')[0]}cm x ${sizeData.size.split('x')[1]}cm x ${p.height}cm`,
          price: Math.round(p.price * sizeData.multiplier),
          originalPrice: p.originalPrice ? Math.round(p.originalPrice * sizeData.multiplier) : null,
          stock: Math.floor(Math.random() * 15) + 5,
          sku: `${product.sku}-${sizeData.size.replace('x', '')}`,
          weight: p.weight ? p.weight * sizeData.multiplier : null,
          isAvailable: true
        }
      })
    }

    console.log(`   ✓ ${p.name}`)
  }

  // ============================================================================
  // REVIEWS
  // ============================================================================
  console.log('⭐ Creando reviews...')

  const allProducts = await prisma.product.findMany({ take: 5 })

  const reviews = [
    {
      rating: 5,
      title: 'Excelente inversión',
      comment: 'Llevaba años buscando el colchón perfecto y finalmente lo encontré. Mi espalda lo agradece cada mañana. La calidad es excepcional.',
      userName: 'María González',
      userLocation: 'Madrid, España',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      usageDays: 60
    },
    {
      rating: 5,
      title: 'Muy recomendable',
      comment: 'Después de 3 meses de uso puedo decir que es el mejor colchón que he tenido. Duermo profundamente y sin dolores. 100% recomendado.',
      userName: 'Carlos Rodríguez',
      userLocation: 'Barcelona, España',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 4,
      usageDays: 90
    },
    {
      rating: 4,
      title: 'Buena calidad-precio',
      comment: 'Muy satisfecho con la compra. Es firme pero cómodo. La única pega es que tardó un par de días en expandirse completamente.',
      userName: 'Ana Martínez',
      userLocation: 'Valencia, España',
      comfortRating: 4,
      qualityRating: 5,
      valueRating: 5,
      usageDays: 45
    }
  ]

  for (const product of allProducts) {
    for (let i = 0; i < 2; i++) {
      const review = reviews[i]
      await prisma.review.create({
        data: {
          productId: product.id,
          rating: review.rating,
          title: review.title,
          comment: review.comment,
          verified: true,
          purchaseVerified: true,
          isPublished: true,
          userName: review.userName,
          userLocation: review.userLocation,
          comfortRating: review.comfortRating,
          qualityRating: review.qualityRating,
          valueRating: review.valueRating,
          usageDays: review.usageDays,
          wouldRecommend: true,
          helpfulCount: Math.floor(Math.random() * 30) + 5
        }
      })
    }
  }

  // ============================================================================
  // RESUMEN
  // ============================================================================
  console.log('\n✅ Seed completado exitosamente!')
  console.log(`📊 Resumen:`)
  console.log(`   - ${await prisma.category.count()} categorías`)
  console.log(`   - ${await prisma.product.count()} productos`)
  console.log(`   - ${await prisma.productVariant.count()} variantes`)
  console.log(`   - ${await prisma.review.count()} reviews`)
  console.log(`   - ${await prisma.coupon.count()} cupones`)
  console.log(`\n🛏️  ¡Todo listo para usar!`)
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })