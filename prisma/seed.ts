// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Helper function para calcular firmeza en texto
function getFirmnessText(percentage: number): string {
  if (percentage <= 40) return 'Suave'
  if (percentage <= 55) return 'Media-Suave'
  if (percentage <= 75) return 'Media'
  if (percentage <= 85) return 'Media-Firme'
  return 'Firme'
}

// Helper para generar gradientes basados en firmeza
function getGradient(firmness: number): string {
  if (firmness <= 40) return 'from-blue-400 to-cyan-400'
  if (firmness <= 55) return 'from-indigo-400 to-blue-500'
  if (firmness <= 75) return 'from-purple-500 to-indigo-500'
  if (firmness <= 85) return 'from-violet-500 to-purple-600'
  return 'from-slate-600 to-gray-700'
}

async function main() {
  console.log('🌱 Iniciando seed de la base de datos Sonpura...')

  // Limpiar datos existentes
  console.log('🗑️  Limpiando datos existentes...')
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // Crear categorías
  console.log('📁 Creando categorías...')
  const categoryPremium = await prisma.category.create({
    data: {
      name: 'Colchones Premium Sonpura',
      slug: 'premium-sonpura',
      description: 'Colección premium de colchones Sonpura con la mejor tecnología'
    }
  })

  const categoryCorteIngles = await prisma.category.create({
    data: {
      name: 'Colección El Corte Inglés',
      slug: 'el-corte-ingles',
      description: 'Colección exclusiva disponible en El Corte Inglés'
    }
  })

  // Crear productos Sonpura
  console.log('🛏️  Creando colchones Sonpura...')
  
  const products = [
    {
      name: 'Colchón Lexus',
      price: 1367,
      firmness: 80,
      transpirability: 90,
      height: 30,
      collection: 'premium',
      features: ['Firmeza adaptable', 'Máxima transpirabilidad', 'Tecnología Multisac'],
      techFeatures: ['Núcleo de muelles ensacados', 'Capa viscoelástica premium', 'Tejido Air Fresh'],
      story: 'El colchón más exclusivo de Sonpura, diseñado para quienes buscan el máximo confort y durabilidad'
    },
    {
      name: 'Colchón Serena',
      price: 1306,
      firmness: 70,
      transpirability: 80,
      height: 28,
      collection: 'premium',
      features: ['Confort equilibrado', 'Alta transpirabilidad', 'Diseño ergonómico'],
      techFeatures: ['Sistema Multiadapt', 'Gel termorregulador', 'Acolchado de lujo'],
      story: 'Diseñado para proporcionar un descanso sereno y reparador cada noche'
    },
    {
      name: 'Colchón Royal',
      price: 855,
      originalPrice: 1140,
      discount: 25,
      firmness: 70,
      transpirability: 90,
      height: 32,
      collection: 'corte-ingles',
      badge: 'Oferta',
      features: ['Altura extra confort', 'Excelente transpirabilidad', 'Garantía premium'],
      techFeatures: ['32cm de altura', 'Sistema Advanced', 'Tratamiento higiénico'],
      story: 'Calidad real para un descanso digno de realeza'
    },
    {
      name: 'Colchón Carisma',
      price: 855,
      originalPrice: 1140,
      discount: 25,
      firmness: 50,
      transpirability: 90,
      height: 32,
      collection: 'corte-ingles',
      badge: 'Oferta',
      features: ['Suavidad media', 'Alta transpirabilidad', 'Gran altura'],
      techFeatures: ['Viscoelástica de alta densidad', 'Micromuelles', 'Tejido Strech'],
      story: 'El carisma del buen descanso en cada noche'
    },
    {
      name: 'Colchón Spirit',
      price: 803,
      originalPrice: 1071,
      discount: 25,
      firmness: 50,
      transpirability: 80,
      height: 30,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Confort envolvente', 'Adaptabilidad progresiva', 'Diseño moderno'],
      techFeatures: ['Espuma HR alta densidad', 'Sistema de ventilación', 'Funda extraíble'],
      story: 'El espíritu del descanso perfecto'
    },
    {
      name: 'Colchón Titán',
      price: 739,
      originalPrice: 985,
      discount: 25,
      firmness: 100,
      transpirability: 90,
      height: 32,
      collection: 'premium',
      badge: 'Extra Firme',
      features: ['Firmeza máxima', 'Para durmientes pesados', 'Ultra resistente'],
      techFeatures: ['Núcleo HR de alta densidad', 'Refuerzos perimetrales', 'Capa de firmeza'],
      story: 'Firmeza titánica para un soporte incomparable'
    },
    {
      name: 'Colchón Gaudí 25',
      price: 691,
      originalPrice: 921,
      discount: 25,
      firmness: 70,
      transpirability: 90,
      height: 25,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Diseño compacto', 'Confort equilibrado', 'Fácil manejo'],
      techFeatures: ['25cm de altura optimizada', 'Muelles Multisac', 'Acolchado Soft'],
      story: 'Inspirado en la genialidad de Gaudí, arte y confort'
    },
    {
      name: 'Colchón Gaudí',
      price: 691,
      originalPrice: 921,
      discount: 25,
      firmness: 70,
      transpirability: 90,
      height: 31,
      collection: 'premium',
      badge: 'Oferta',
      isBestSeller: true,
      features: ['Altura premium', 'Excelente ventilación', 'Confort superior'],
      techFeatures: ['31cm de grosor', 'Tecnología Multisac System', 'Tejido 3D transpirable'],
      story: 'La obra maestra del descanso'
    },
    {
      name: 'Colchón Silence',
      price: 647,
      originalPrice: 862,
      discount: 25,
      firmness: 60,
      transpirability: 80,
      height: 29,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Confort silencioso', 'Independencia de lechos', 'Aislamiento de movimientos'],
      techFeatures: ['Muelles silenciosos', 'Capa anti-ruido', 'Viscoelástica adaptativa'],
      story: 'El silencio perfecto para noches sin interrupciones'
    },
    {
      name: 'Colchón Brisa',
      price: 849,
      firmness: 70,
      transpirability: 90,
      height: 29,
      collection: 'premium',
      features: ['Máxima frescura', 'Ventilación óptima', 'Confort veraniego'],
      techFeatures: ['Tejido Air Cool', 'Canales de ventilación', 'Gel refrigerante'],
      story: 'Como una brisa fresca en las noches de verano'
    },
    {
      name: 'Colchón Golden',
      price: 424,
      originalPrice: 848,
      discount: 50,
      firmness: 70,
      transpirability: 90,
      height: 29,
      collection: 'corte-ingles',
      badge: '50% OFF',
      isBestSeller: true,
      features: ['Mejor precio', 'Calidad garantizada', 'Oferta limitada'],
      techFeatures: ['Muelles bonell', 'Acolchado confort', 'Tejido acolchado'],
      story: 'Oro puro en calidad-precio'
    },
    {
      name: 'Colchón Indra',
      price: 600,
      originalPrice: 800,
      discount: 25,
      firmness: 90,
      transpirability: 90,
      height: 31,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Alta firmeza', 'Soporte reforzado', 'Muy transpirable'],
      techFeatures: ['Núcleo extra firme', 'Sistema de refuerzo lumbar', 'Tejido 4D'],
      story: 'Soporte divino para tu espalda'
    },
    {
      name: 'Colchón Element',
      price: 565,
      originalPrice: 753,
      discount: 25,
      firmness: 60,
      transpirability: 80,
      height: 28,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Balance natural', 'Confort adaptable', 'Diseño versátil'],
      techFeatures: ['Espumas HR combinadas', 'Sistema de zonas', 'Funda lavable'],
      story: 'Los elementos perfectos del descanso unidos'
    },
    {
      name: 'Colchón Zenit',
      price: 565,
      originalPrice: 753,
      discount: 25,
      firmness: 80,
      transpirability: 80,
      height: 27,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Firmeza superior', 'Soporte óptimo', 'Compacto y eficiente'],
      techFeatures: ['Alta densidad', 'Refuerzos laterales', 'Núcleo estable'],
      story: 'Alcanza el cenit del descanso'
    },
    {
      name: 'Colchón Lotus',
      price: 565,
      originalPrice: 753,
      discount: 25,
      firmness: 60,
      transpirability: 90,
      height: 30,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Pureza y confort', 'Alta ventilación', 'Adaptabilidad zen'],
      techFeatures: ['Muelles Micro', 'Viscoelástica natural', 'Tejido orgánico'],
      story: 'Como una flor de loto, puro y natural'
    },
    {
      name: 'Colchón Bloom',
      price: 417,
      originalPrice: 556,
      discount: 25,
      firmness: 90,
      transpirability: 70,
      height: 27,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Firmeza elevada', 'Precio accesible', 'Calidad garantizada'],
      techFeatures: ['Núcleo firme HR', 'Acolchado básico', 'Tratamiento higiénico'],
      story: 'Florece tu descanso cada mañana'
    },
    {
      name: 'Colchón Fusión',
      price: 417,
      originalPrice: 556,
      discount: 25,
      firmness: 60,
      transpirability: 90,
      height: 30,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Tecnología combinada', 'Excelente ventilación', 'Precio competitivo'],
      techFeatures: ['Fusión de espumas', 'Muelles y viscoelástica', 'Sistema híbrido'],
      story: 'La fusión perfecta de tecnologías'
    },
    {
      name: 'Colchón Solei',
      price: 417,
      originalPrice: 556,
      discount: 25,
      firmness: 80,
      transpirability: 90,
      height: 30,
      collection: 'premium',
      badge: 'Oferta',
      features: ['Firmeza media-alta', 'Gran transpirabilidad', 'Relación calidad-precio'],
      techFeatures: ['Núcleo HR plus', 'Capa confort', 'Tejido transpirable'],
      story: 'Brilla con energía cada mañana'
    },
    {
      name: 'Colchón Prisma24',
      price: 360,
      originalPrice: 480,
      discount: 25,
      firmness: 70,
      transpirability: 80,
      height: 24,
      collection: 'premium',
      badge: 'Mejor Precio',
      isBestSeller: true,
      features: ['Altura compacta', 'Excelente calidad', 'Precio imbatible'],
      techFeatures: ['24cm optimizados', 'Espuma confort', 'Funda acolchada'],
      story: 'La mejor opción para presupuestos ajustados'
    },
    {
      name: 'Colchón Prisma',
      price: 360,
      originalPrice: 480,
      discount: 25,
      firmness: 70,
      transpirability: 80,
      height: 29,
      collection: 'premium',
      badge: 'Mejor Precio',
      features: ['Altura estándar', 'Confort garantizado', 'Precio excepcional'],
      techFeatures: ['29cm de confort', 'Espumas HR', 'Acabado premium'],
      story: 'Refleja el mejor descanso a un precio brillante'
    }
  ]

  // Crear todos los productos
  for (let index = 0; index < products.length; index++) {
    const productData = products[index]
    const categoryId = productData.collection === 'corte-ingles' 
      ? categoryCorteIngles.id 
      : categoryPremium.id

    const slug = productData.name.toLowerCase()
      .replace('colchón ', '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')

    await prisma.product.create({
      data: {
        name: productData.name,
        slug: slug,
        subtitle: `Firmeza ${productData.firmness}% - Transpirabilidad ${productData.transpirability}%`,
        description: `${productData.story}. Altura de ${productData.height}cm para máximo confort.`,
        price: productData.price,
        originalPrice: productData.originalPrice || null,
        firmness: getFirmnessText(productData.firmness),
        rating: 4.5 + Math.random() * 0.4, // Entre 4.5 y 4.9
        reviewCount: Math.floor(Math.random() * 2000) + 500,
        story: productData.story,
        image: `/products/${slug}.jpg`,
        images: JSON.stringify([
          `/products/${slug}.jpg`,
          `/products/${slug}-2.jpg`
        ]),
        features: JSON.stringify([
          ...productData.features,
          `Altura: ${productData.height}cm`,
          `Transpirabilidad: ${productData.transpirability}%`
        ]),
        techFeatures: JSON.stringify(productData.techFeatures),
        certifications: JSON.stringify([
          'Oeko-Tex Standard 100',
          'CertiPUR',
          'ISO 9001',
          'Garantía Sonpura'
        ]),
        badge: productData.badge || null,
        isNew: false,
        isBestSeller: productData.isBestSeller || false,
        isActive: true,
        gradient: getGradient(productData.firmness),
        discount: productData.discount || 0,
        stock: Math.floor(Math.random() * 50) + 10,
        sku: `SP-${String(index + 1).padStart(3, '0')}-${Date.now().toString().slice(-4)}`,
        categoryId: categoryId,
        metaTitle: `${productData.name} - Sonpura | Descanso Premium`,
        metaDescription: `${productData.name} con ${productData.firmness}% de firmeza y ${productData.transpirability}% de transpirabilidad. ${productData.story}`
      }
    })
  }

  // Crear algunas reviews de ejemplo
  console.log('⭐ Creando reviews de ejemplo...')
  
  const allProducts = await prisma.product.findMany()
  
  const reviewTemplates = [
    {
      rating: 5,
      title: 'Excelente calidad',
      comment: 'Muy contento con la compra. La calidad es excepcional y el confort es justo lo que buscaba.',
      userName: 'María González',
      userLocation: 'Madrid'
    },
    {
      rating: 5,
      title: 'Muy recomendable',
      comment: 'El mejor colchón que he tenido. Mi espalda lo nota cada mañana.',
      userName: 'Carlos Rodríguez',
      userLocation: 'Barcelona'
    },
    {
      rating: 4,
      title: 'Buena compra',
      comment: 'Relación calidad-precio muy buena. Estoy satisfecho con la elección.',
      userName: 'Ana Martínez',
      userLocation: 'Valencia'
    }
  ]

  // Añadir 2-3 reviews a algunos productos
  for (let i = 0; i < Math.min(5, allProducts.length); i++) {
    const product = allProducts[i]
    const numReviews = Math.floor(Math.random() * 2) + 1
    
    for (let j = 0; j < numReviews; j++) {
      const template = reviewTemplates[j % reviewTemplates.length]
      await prisma.review.create({
        data: {
          productId: product.id,
          rating: template.rating,
          title: template.title,
          comment: template.comment,
          verified: true,
          userName: template.userName,
          userLocation: template.userLocation
        }
      })
    }
  }

  console.log('✅ Seed completado exitosamente!')
  console.log(`📊 Creados:`)
  console.log(`   - ${await prisma.category.count()} categorías`)
  console.log(`   - ${await prisma.product.count()} productos Sonpura`)
  console.log(`   - ${await prisma.review.count()} reviews`)
  console.log(`\n🛏️  Catálogo Sonpura listo para usar!`)
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })