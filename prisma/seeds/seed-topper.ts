// prisma/seed-topper.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================================
// TOPPER QUALITY DREAMS - SONNO
// ============================================================================

const topperProduct = {
  name: 'Topper Quality Dreams',
  slug: 'topper-quality-dreams',
  subtitle: 'Sobrecolchón viscoelástico con efecto nube',
  description: 'El topper Quality Dreams ofrece un descanso de calidad sea como sea tu colchón. Tanto si tiene unos años, como si has elegido un modelo demasiado duro, puedes pasarte a la adaptabilidad de lujo de la viscoelástica con solo incluir este topper sobre el colchón. Con 4 cm de viscoelástica en el núcleo y acolchado también en viscoelástica con fibra hipoalergénica, se adapta a la perfección a las curvas del cuerpo, ofreciendo un descanso cómodo gracias al efecto nube de la viscoelástica. Sistema de fijación con 4 gomas elásticas perfectamente adaptables a todos los modelos y alturas de colchón.',
  story: 'La viscoelástica es un material desarrollado por la NASA con grandes capacidades adaptativas y de recuperación. El tejido Aloe Vera aporta una gran frescura y suavidad extra que tu colchón necesita. Cerrado con ribete reforzado para mayor compatibilidad y fácil colocación.',
  price: 135, // Precio base para 150x200 (Queen)
  originalPrice: null,
  compareAtPrice: null,
  discount: 0,
  firmnessValue: 50,
  firmness: Firmness.MEDIA,
  transpirability: 88,
  adaptability: 95,
  height: 4,
  weight: 3,
  maxWeightPerPerson: 120,
  image: '/images/toppers/topper-quality-dreams.jpg',
  images: JSON.stringify([
    '/images/toppers/topper-quality-dreams.jpg',
    '/images/toppers/topper-quality-dreams-detalle.jpg',
    '/images/toppers/topper-quality-dreams-aloe-vera.jpg',
    '/images/toppers/topper-quality-dreams-uso.jpg'
  ]),
  gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
  rating: 4.8,
  reviewCount: 11,
  salesCount: 342,
  viewsCount: 2890,
  features: JSON.stringify([
    'Tejido Aloe Vera termorregulador',
    '4 cm de viscoelástica NASA',
    'Fibra hipoalergénica',
    'Sistema de fijación con 4 gomas elásticas',
    'Efecto nube adaptativo',
    'Cerrado con ribete reforzado'
  ]),
  techFeatures: JSON.stringify([
    'Altura: 4 cm de viscoelástica',
    'Tejido Aloe Vera premium',
    'Fibra hueca siliconada 100% poliéster',
    'TNT antibacteriano',
    'Tejido 3D transpirable inferior',
    'Adaptable a todas las alturas de colchón'
  ]),
  certifications: JSON.stringify([
    'Oeko-Tex Standard 100',
    'Anti-hongos, anti-bacterias y anti-ácaros',
    'Materiales hipoalergénicos',
    'Tecnología NASA'
  ]),
  tags: JSON.stringify(['topper', 'viscoelastica', 'aloe-vera', 'efecto-nube', 'hipoalergenico', 'nasa']),
  highlights: JSON.stringify([
    'Efecto nube',
    'Mejora cualquier colchón',
    'Fácil colocación'
  ]),
  warranty: 3,
  trialNights: 14,
  materials: JSON.stringify([
    'Viscoelástica NASA',
    'Tejido Aloe Vera',
    'Fibra hueca siliconada',
    'TNT antibacteriano',
    'Tejido 3D transpirable'
  ]),
  layers: JSON.stringify([
    'Tejido Aloe Vera superior',
    'Acolchado viscoelástico',
    'Fibra hipoalergénica',
    'Núcleo viscoelástico 4 cm',
    'TNT protector',
    'Tejido 3D transpirable inferior',
    'Sistema de 4 gomas elásticas de fijación'
  ]),
  badge: 'COMPLEMENTO',
  isNew: false,
  isBestSeller: true,
  isFeatured: true,
  isActive: true,
  isEco: true,
  stock: 156,
  inStock: true,
  sku: 'SONNO-TOPPER-QD-001',
  deliveryDays: 4,
  freeShipping: true,
  cooling: true,
  hypoallergenic: true,
  washable: false,
  antiDustMite: true,
  reversible: false,
  silent: true,
  motionIsolation: false,
  edgeSupport: false,
  verified: true,
  bestValue: true,
  satisfaction: 96,
  position: 100 // Posición alta para que aparezca como complemento
}

// ============================================================================
// VARIANTES DE TAMAÑOS DEL TOPPER
// Precios basados en el rango 76€ - 229€
// ============================================================================

const topperVariants = [
  { size: 'Individual 80x180', width: 80, length: 180, price: 76, isPopular: false },
  { size: 'Individual 80x190', width: 80, length: 190, price: 79, isPopular: false },
  { size: 'Individual 90x180', width: 90, length: 180, price: 82, isPopular: false },
  { size: 'Individual 90x190', width: 90, length: 190, price: 86, isPopular: false },
  { size: 'Individual 90x200', width: 90, length: 200, price: 89, isPopular: false },
  { size: 'Individual XL 105x190', width: 105, length: 190, price: 98, isPopular: false },
  { size: 'Individual XL 105x200', width: 105, length: 200, price: 102, isPopular: false },
  { size: 'Matrimonio 135x190', width: 135, length: 190, price: 125, isPopular: false },
  { size: 'Matrimonio 135x200', width: 135, length: 200, price: 132, isPopular: false },
  { size: 'Matrimonio 150x190', width: 150, length: 190, price: 142, isPopular: false },
  { size: 'Queen 150x200', width: 150, length: 200, price: 149, isPopular: true }, // Popular
  { size: 'King 160x200', width: 160, length: 200, price: 165, isPopular: false },
  { size: 'Super King 180x190', width: 180, length: 190, price: 189, isPopular: false },
  { size: 'Super King 180x200', width: 180, length: 200, price: 199, isPopular: false },
  { size: 'Super King 200x200', width: 200, length: 200, price: 229, isPopular: false }
]

// ============================================================================
// FUNCIÓN SEED
// ============================================================================

async function main() {
  console.log('🛏️  Iniciando seed del Topper Quality Dreams...\n')

  // Verificar si ya existe el topper
  const existingTopper = await prisma.product.findFirst({
    where: {
      slug: 'topper-quality-dreams'
    }
  })

  if (existingTopper) {
    console.log('⚠️  El topper Quality Dreams ya existe. Eliminando...')
    await prisma.productVariant.deleteMany({
      where: { productId: existingTopper.id }
    })
    await prisma.product.delete({
      where: { id: existingTopper.id }
    })
    console.log('✅ Topper anterior eliminado\n')
  }

  // Crear el producto topper
  console.log('📦 Creando Topper Quality Dreams...')
  const topper = await prisma.product.create({
    data: topperProduct
  })
  console.log(`✅ Producto creado: ${topper.name} (ID: ${topper.id})\n`)

  // Crear todas las variantes
  console.log('📏 Creando variantes de tamaños...')
  for (const variant of topperVariants) {
    await prisma.productVariant.create({
      data: {
        productId: topper.id,
        size: variant.size,
        width: variant.width,
        length: variant.length,
        dimensions: `${variant.width}x${variant.length} cm`,
        price: variant.price,
        originalPrice: null,
        stock: Math.floor(Math.random() * 30) + 10, // Stock entre 10-40 unidades
        sku: `${topperProduct.sku}-${variant.width}X${variant.length}`,
        barcode: `8${String(Math.random()).slice(2, 14)}`,
        weight: Math.round(3 * (variant.width * variant.length) / 30000), // Peso estimado
        isAvailable: true,
        isPopular: variant.isPopular
      }
    })
    console.log(`   ✓ ${variant.size} - ${variant.price}€${variant.isPopular ? ' (POPULAR)' : ''}`)
  }

  console.log(`\n✅ ${topperVariants.length} variantes creadas con éxito\n`)

  // Estadísticas finales
  const totalVariants = await prisma.productVariant.count({
    where: { productId: topper.id }
  })

  console.log('📊 Resumen del Topper Quality Dreams:')
  console.log(`   • Nombre: ${topper.name}`)
  console.log(`   • SKU: ${topper.sku}`)
  console.log(`   • Variantes: ${totalVariants}`)
  console.log(`   • Rango de precios: ${topperVariants[0].price}€ - ${topperVariants[topperVariants.length - 1].price}€`)
  console.log(`   • Rating: ${topper.rating}⭐ (${topper.reviewCount} opiniones)`)
  console.log(`   • Stock total: Disponible`)
  console.log(`   • Badge: ${topper.badge}`)
  console.log(`   • Tags: ${JSON.parse(topper.tags as string).join(', ')}`)
  console.log('\n🎉 ¡Seed del Topper completado con éxito!')
  console.log('\n💡 El topper ahora aparecerá automáticamente en el carrito como producto recomendado.')
}

// Ejecutar seed
main()
  .catch((e) => {
    console.error('❌ Error en seed del Topper:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })