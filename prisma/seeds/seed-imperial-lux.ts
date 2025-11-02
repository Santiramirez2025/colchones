// prisma/seeds/seed-imperial-lux.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

async function seedImperialLux() {
  console.log('🌱 Seeding Imperial Lux product...')

  // Buscar o crear categoría de Muelles Ensacados
  let category = await prisma.category.findUnique({
    where: { slug: 'muelles-ensacados' }
  })

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: 'Muelles Ensacados',
        slug: 'muelles-ensacados',
        description: 'Colchones con sistema de muelles ensacados individuales para máxima independencia de lechos',
        gradient: 'from-indigo-500 to-purple-600',
        icon: '🛏️',
        isActive: true,
        isFeatured: true,
        order: 2,
        metaTitle: 'Colchones de Muelles Ensacados | Máximo Confort',
        metaDescription: 'Descubre nuestra selección de colchones con muelles ensacados. Independencia de lechos, durabilidad y confort premium.'
      }
    })
    console.log('✅ Categoría "Muelles Ensacados" creada')
  } else {
    console.log('✅ Categoría "Muelles Ensacados" encontrada')
  }

  // Crear el producto Imperial Lux
  const product = await prisma.product.create({
    data: {
      // Identificación
      name: 'Colchón Imperial Lux',
      slug: 'colchon-imperial-lux-muelles-ensacados-doble-cara-viscoelastica',
      subtitle: 'Muelles Ensacados y Doble Cara Viscoelástica',
      
      // Descripción
      description: 'El Imperial Lux combina elegancia, tecnología y confort absoluto. Su doble cara viscoelástica y núcleo de muelles ensacados ofrecen una tumbada suave, ergonómica y silenciosa.',
      
      story: `El Colchón Imperial Lux es sinónimo de distinción y descanso majestuoso. Inspirado en la elegancia clásica y la tecnología más avanzada del descanso, este colchón ofrece una firmeza equilibrada y una adaptabilidad envolvente que transforman cada noche en una experiencia sensorial única.

Su núcleo de muelles ensacados de alta densidad (275 muelles/m²) garantiza una independencia total de lechos: cada muelle responde de forma individual al peso y movimiento, ofreciendo un soporte estable y silencioso. El acolchado viscoelástica + viscosoft de 3,5 cm en ambas caras envuelve el cuerpo con un efecto nube, aliviando puntos de presión y favoreciendo la relajación muscular profunda.

El tejido Stretch Luxury, suave y resistente, junto al sistema de doble cara, prolongan la vida útil del colchón y mantienen su confort y estética impecables durante años. Un modelo pensado para quienes buscan un descanso noble, con diseño elegante y un confort superior.`,
      
      // Precios (base para 90x190)
      price: 319.99,
      originalPrice: 639.99,
      compareAtPrice: 749.99,
      discount: 50,
      
      // Características técnicas
      firmness: Firmness.MEDIA_ALTA,
      firmnessValue: 80,
      transpirability: 50,
      adaptability: 80,
      height: 30,
      weight: 26.0,
      maxWeightPerPerson: 110,
      
      // Imágenes (actualiza con tus URLs reales)
      image: '/images/products/imperial-lux/main.jpg',
      images: JSON.stringify([
        '/images/products/imperial-lux/main.jpg',
        '/images/products/imperial-lux/detail-1.jpg',
        '/images/products/imperial-lux/detail-2.jpg',
        '/images/products/imperial-lux/detail-3.jpg',
        '/images/products/imperial-lux/lifestyle.jpg',
        '/images/products/imperial-lux/materials.jpg',
        '/images/products/imperial-lux/texture.jpg'
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=example',
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      
      // Ratings y stats
      rating: 4.8,
      reviewCount: 0, // Se actualizará después
      salesCount: 289,
      viewsCount: 2341,
      
      // Features principales
      features: JSON.stringify([
        '💤 Comodidad suprema: viscoelástica + viscosoft en ambas caras para una tumbada envolvente',
        '💪 Soporte ergonómico y firmeza media-alta (80%)',
        '🌬️ Transpirabilidad equilibrada (50%) y frescor continuo',
        '🔇 Independencia total de lechos sin ruidos ni molestias',
        '🧵 Tejido Stretch Luxury de máxima suavidad y durabilidad',
        '🦠 Tejido TNT protector antibacteriano del núcleo',
        '🪶 Refuerzo en HR que aporta estabilidad perimetral y firmeza lateral',
        '🚚 Envío gratuito a toda España peninsular en 3–6 días hábiles'
      ]),
      
      // Características técnicas detalladas
      techFeatures: JSON.stringify([
        'Núcleo de muelles ensacados de alta densidad (275 muelles/m²)',
        'Acolchado viscoelástica + viscosoft 3,5 cm por cara',
        'Box perimetral HR reforzado para mayor durabilidad',
        'Tejido Stretch Luxury premium',
        'Tejido TNT antibacteriano protector del núcleo',
        'Sistema de independencia de lechos avanzado',
        'Doble cara reversible para mayor vida útil',
        'Altura total: ±30 cm',
        'Peso máximo recomendado: 110 kg/persona',
        'Acolchado tapa a tapa de alta gama'
      ]),
      
      // Certificaciones
      certifications: JSON.stringify([
        'OEKO-TEX Standard 100',
        'CertiPUR-ES',
        'ISO 9001:2015',
        'Tratamiento antibacteriano certificado',
        'Fabricado en España'
      ]),
      
      // Tags para búsqueda
      tags: JSON.stringify([
        'colchón viscoelástico',
        'colchón muelles ensacados',
        'colchón doble cara',
        'colchón premium',
        'colchón Imperial Lux',
        'colchón firme cómodo',
        'colchón lujo',
        'imperial lux',
        'muelles ensacados',
        'viscoelástica',
        'alta gama',
        'elegante',
        'antibacteriano'
      ]),
      
      // Highlights
      highlights: JSON.stringify([
        'Doble cara viscoelástica premium',
        '275 muelles ensacados/m²',
        'Tejido Stretch Luxury',
        'Barrera antibacteriana TNT',
        'Refuerzo perimetral HR'
      ]),
      
      // Garantía y prueba
      warranty: 10,
      trialNights: 100,
      
      // Materiales
      materials: JSON.stringify([
        'Viscoelástica termosensible premium',
        'Viscosoft de alta densidad',
        'Muelles ensacados de acero templado',
        'Espuma HR perimetral reforzada',
        'Tejido Stretch Luxury',
        'Tejido TNT antibacteriano'
      ]),
      
      // Capas del colchón
      layers: JSON.stringify([
        {
          name: 'Tejido Stretch Luxury',
          description: 'Tacto suave y elegante de máxima calidad'
        },
        {
          name: 'Viscoelástica + Viscosoft 3,5 cm',
          description: 'Cara superior: adaptabilidad suprema'
        },
        {
          name: 'Tejido TNT Antibacteriano',
          description: 'Barrera protectora del núcleo'
        },
        {
          name: 'Núcleo muelles ensacados',
          description: '275 muelles/m² - Independencia y soporte'
        },
        {
          name: 'Box perimetral HR',
          description: 'Refuerzo de durabilidad y estabilidad'
        },
        {
          name: 'Tejido TNT Antibacteriano',
          description: 'Protección inferior del núcleo'
        },
        {
          name: 'Viscoelástica + Viscosoft 3,5 cm',
          description: 'Cara inferior: mismo confort reversible'
        },
        {
          name: 'Tejido Stretch Luxury',
          description: 'Acabado inferior premium'
        }
      ]),
      
      // Badges y estados
      badge: 'LUXURY',
      isNew: false,
      isBestSeller: false,
      isFeatured: true,
      isActive: true,
      isEco: false,
      
      // Stock
      stock: 130,
      inStock: true,
      lowStockThreshold: 20,
      sku: 'IL-ME-DC-30',
      barcode: '8421234567891',
      
      // Envío
      deliveryDays: 5,
      freeShipping: true,
      shippingCost: 0,
      
      // Propiedades del colchón
      cooling: false,
      hypoallergenic: true,
      washable: false,
      antiDustMite: true,
      reversible: true,
      silent: true,
      motionIsolation: true,
      edgeSupport: true,
      verified: true,
      bestValue: false,
      satisfaction: 96,
      
      // SEO
      metaTitle: 'Colchón Imperial Lux - Muelles Ensacados y Doble Cara Viscoelástica',
      metaDescription: 'Colchón de lujo con muelles ensacados y doble cara viscoelástica. Tejido Luxury, barrera antibacteriana, firmeza media-alta. Envío gratis 3-6 días.',
      metaKeywords: 'colchón viscoelástico, colchón muelles ensacados, colchón doble cara, colchón premium, colchón Imperial Lux, colchón firme cómodo, colchón lujo',
      
      // Posición y categoría
      position: 2,
      categoryId: category.id,
      
      publishedAt: new Date()
    }
  })

  console.log(`✅ Producto "${product.name}" creado con ID: ${product.id}`)

  // Crear variantes (tamaños) - Incluye hasta 200x200
  const sizes = [
    // Individual
    { size: '80x180', width: 80, length: 180, price: 269.99, popular: false },
    { size: '80x190', width: 80, length: 190, price: 279.99, popular: false },
    { size: '80x200', width: 80, length: 200, price: 289.99, popular: false },
    { size: '90x180', width: 90, length: 180, price: 289.99, popular: false },
    { size: '90x190', width: 90, length: 190, price: 319.99, popular: true },
    { size: '90x200', width: 90, length: 200, price: 329.99, popular: true },
    
    // Matrimonio pequeño
    { size: '100x180', width: 100, length: 180, price: 339.99, popular: false },
    { size: '100x190', width: 100, length: 190, price: 349.99, popular: false },
    { size: '100x200', width: 100, length: 200, price: 359.99, popular: false },
    { size: '105x180', width: 105, length: 180, price: 349.99, popular: false },
    { size: '105x190', width: 105, length: 190, price: 359.99, popular: false },
    { size: '105x200', width: 105, length: 200, price: 369.99, popular: false },
    
    // Matrimonio estándar
    { size: '120x180', width: 120, length: 180, price: 379.99, popular: false },
    { size: '120x190', width: 120, length: 190, price: 389.99, popular: false },
    { size: '120x200', width: 120, length: 200, price: 399.99, popular: false },
    { size: '135x180', width: 135, length: 180, price: 409.99, popular: true },
    { size: '135x190', width: 135, length: 190, price: 419.99, popular: true },
    { size: '135x200', width: 135, length: 200, price: 429.99, popular: true },
    
    // Matrimonio grande
    { size: '140x180', width: 140, length: 180, price: 429.99, popular: false },
    { size: '140x190', width: 140, length: 190, price: 439.99, popular: true },
    { size: '140x200', width: 140, length: 200, price: 449.99, popular: true },
    { size: '150x180', width: 150, length: 180, price: 459.99, popular: true },
    { size: '150x190', width: 150, length: 190, price: 469.99, popular: true },
    { size: '150x200', width: 150, length: 200, price: 479.99, popular: true },
    { size: '160x180', width: 160, length: 180, price: 489.99, popular: true },
    { size: '160x190', width: 160, length: 190, price: 499.99, popular: true },
    { size: '160x200', width: 160, length: 200, price: 519.99, popular: true },
    
    // King size
    { size: '180x180', width: 180, length: 180, price: 549.99, popular: false },
    { size: '180x190', width: 180, length: 190, price: 569.99, popular: true },
    { size: '180x200', width: 180, length: 200, price: 589.99, popular: true },
    { size: '200x180', width: 200, length: 180, price: 599.99, popular: false },
    { size: '200x190', width: 200, length: 190, price: 619.99, popular: true },
    { size: '200x200', width: 200, length: 200, price: 649.99, popular: true },
  ]

  for (const sizeData of sizes) {
    await prisma.productVariant.create({
      data: {
        productId: product.id,
        size: sizeData.size,
        width: sizeData.width,
        length: sizeData.length,
        dimensions: `${sizeData.width} x ${sizeData.length} cm`,
        price: sizeData.price,
        originalPrice: sizeData.price * 2,
        stock: 20,
        sku: `IL-ME-DC-30-${sizeData.size.replace('x', '-')}`,
        barcode: `8421234568${String(sizeData.width).padStart(3, '0')}${String(sizeData.length).padStart(3, '0')}`,
        weight: (sizeData.width * sizeData.length * 30) / 10000,
        isAvailable: true,
        isPopular: sizeData.popular
      }
    })
  }

  console.log(`✅ ${sizes.length} variantes creadas`)

  // Crear reviews realistas
  const reviews = [
    {
      rating: 5,
      title: 'Elegancia y confort unidos',
      comment: 'El Imperial Lux es realmente lujoso. El tejido es suavísimo y el confort es espectacular. Perfecto para nuestra suite principal. La independencia de lechos funciona de maravilla.',
      userName: 'Patricia Jiménez',
      userLocation: 'Madrid',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 60,
      productSize: '160x200',
      pros: JSON.stringify(['Elegante', 'Muy cómodo', 'Tejido premium', 'Excelente calidad']),
      cons: JSON.stringify([]),
      helpfulCount: 28
    },
    {
      rating: 5,
      title: 'Inversión que vale la pena',
      comment: 'Tras probar varios colchones, este es sin duda el mejor. La firmeza es perfecta, ni muy duro ni muy blando. El acabado es impecable y se nota la calidad en cada detalle.',
      userName: 'Fernando Castro',
      userLocation: 'Barcelona',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 4,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 85,
      productSize: '150x190',
      pros: JSON.stringify(['Firmeza ideal', 'Calidad visible', 'Acabado perfecto']),
      cons: JSON.stringify([]),
      helpfulCount: 24
    },
    {
      rating: 4,
      title: 'Muy bueno pero necesita adaptación',
      comment: 'Excelente colchón en general. Al principio me pareció un poco firme, pero tras dos semanas el cuerpo se adaptó y ahora duermo genial. La calidad es indiscutible.',
      userName: 'Isabel Moreno',
      userLocation: 'Valencia',
      comfortRating: 4,
      qualityRating: 5,
      valueRating: 4,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 45,
      productSize: '135x190',
      pros: JSON.stringify(['Alta calidad', 'Buen soporte', 'Silencioso']),
      cons: JSON.stringify(['Requiere periodo de adaptación']),
      helpfulCount: 19
    },
    {
      rating: 5,
      title: 'Lujo accesible',
      comment: 'No puedo creer la calidad por este precio. El colchón parece de hotel de 5 estrellas. Mi espalda lo agradece cada mañana. Compra 100% recomendada.',
      userName: 'Alberto Díaz',
      userLocation: 'Sevilla',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 4,
      verified: true,
      purchaseVerified: true,
      usageDays: 70,
      productSize: '150x200',
      pros: JSON.stringify(['Precio-calidad increíble', 'Confort de hotel', 'Mejora el dolor de espalda']),
      cons: JSON.stringify([]),
      helpfulCount: 31
    },
    {
      rating: 5,
      title: 'Perfecto para parejas',
      comment: 'Mi pareja y yo tenemos horarios muy diferentes y este colchón ha sido la solución perfecta. Cero transmisión de movimientos y super silencioso. Estamos encantados.',
      userName: 'Mónica Ruiz',
      userLocation: 'Bilbao',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 50,
      productSize: '160x200',
      pros: JSON.stringify(['Independencia de lechos perfecta', 'Silencioso', 'Ideal parejas']),
      cons: JSON.stringify([]),
      helpfulCount: 26
    },
    {
      rating: 4,
      title: 'Calidad superior',
      comment: 'Muy satisfecho con la compra. Los materiales son de primera calidad y el colchón es muy cómodo. Le doy 4 estrellas porque tardó un poco más de lo esperado en llegar, pero por lo demás, perfecto.',
      userName: 'Luis García',
      userLocation: 'Zaragoza',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 3,
      verified: true,
      purchaseVerified: true,
      usageDays: 35,
      productSize: '140x190',
      pros: JSON.stringify(['Materiales premium', 'Muy cómodo', 'Buena firmeza']),
      cons: JSON.stringify(['Entrega un poco lenta']),
      helpfulCount: 15
    }
  ]

  for (const reviewData of reviews) {
    await prisma.review.create({
      data: {
        productId: product.id,
        ...reviewData,
        isPublished: true,
        wouldRecommend: true,
        userEmail: `${reviewData.userName.toLowerCase().replace(/ /g, '.')}@example.com`,
        userAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewData.userName)}&background=random`
      }
    })
  }

  console.log(`✅ ${reviews.length} reviews creadas`)

  // Actualizar contador de reviews en el producto
  await prisma.product.update({
    where: { id: product.id },
    data: {
      reviewCount: reviews.length,
      rating: reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    }
  })

  console.log('✅ Producto actualizado con contador de reviews')
  console.log('🎉 Seed Imperial Lux completado exitosamente!')
}

// Ejecutar seed
seedImperialLux()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })