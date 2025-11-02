// prisma/seeds/seed-royal-zen.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

async function seedRoyalZen() {
  console.log('🌱 Seeding Royal Zen product...')

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
  }

  // Crear el producto Royal Zen
  const product = await prisma.product.create({
    data: {
      // Identificación
      name: 'Colchón Royal Zen',
      slug: 'colchon-royal-zen-muelles-ensacados-visco-doble-confort',
      subtitle: 'Muelles Ensacados con Visco Doble Confort',
      
      // Descripción
      description: 'Descubre la esencia del descanso premium con el Royal Zen, un colchón de doble cara con viscoelástica avanzada y un núcleo de muelles ensacados de alta precisión. Confort envolvente + soporte firme y silencioso para dormir como nunca.',
      
      story: `El Colchón Royal Zen ha sido creado para quienes desean dormir profundamente y despertar renovados cada día.

Su doble cara viscoelástica convierte cualquier noche en una experiencia de suavidad y acogida, distribuyendo el peso de manera equilibrada y cuidando puntos de presión como hombros y caderas.

Su núcleo de muelles ensacados de alta densidad (275 muelles/m²) aporta independencia total de lechos y una firmeza ergonómica ideal para parejas, evitando sentir los movimientos de la otra persona.

El diseño se acompaña de un box perimetral HR reforzado para garantizar mayor durabilidad y mantener la estabilidad del colchón a lo largo de los años.

El tejido Stretch Royal en tonos grises y su acolchado tapa a tapa —propio de los colchones de alta gama— le otorgan un acabado impecable, elegante y resistente.

Cada noche, el Royal Zen equilibra firmeza, adaptabilidad y estética para ofrecer el descanso que tu cuerpo se merece.`,
      
      // Precios (base para 90x190)
      price: 299.99,
      originalPrice: 599.99,
      compareAtPrice: 699.99,
      discount: 50,
      
      // Características técnicas
      firmness: Firmness.MEDIA_ALTA,
      firmnessValue: 80,
      transpirability: 50,
      adaptability: 80,
      height: 30,
      weight: 25.0,
      maxWeightPerPerson: 110,
      
      // Imágenes (actualiza con tus URLs reales)
      image: '/images/products/royal-zen/main.jpg',
      images: JSON.stringify([
        '/images/products/royal-zen/main.jpg',
        '/images/products/royal-zen/detail-1.jpg',
        '/images/products/royal-zen/detail-2.jpg',
        '/images/products/royal-zen/detail-3.jpg',
        '/images/products/royal-zen/lifestyle.jpg',
        '/images/products/royal-zen/materials.jpg'
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=example',
      gradient: 'from-indigo-600 via-purple-600 to-pink-500',
      
      // Ratings y stats
      rating: 4.9,
      reviewCount: 127,
      salesCount: 342,
      viewsCount: 2847,
      
      // Features principales
      features: JSON.stringify([
        '🌬️ Sensación efecto nube en ambas caras gracias a su visco + viscosoft (3,5 cm por lado)',
        '🧠 Se adapta y recupera su forma sin deformaciones',
        '💤 Firmeza media-alta (80%), óptima para todas las posturas',
        '🌡️ Termosensible: responde a la temperatura del cuerpo',
        '💨 Transpirable y fresco: regulación eficiente del calor',
        '🔇 Silencioso e independiente: cero ruidos, cero molestias',
        '🪶 Refuerzo perimetral HR: máxima durabilidad y estabilidad',
        '🎀 Diseño elegante con relieve premium y tacto ultrasuave'
      ]),
      
      // Características técnicas detalladas
      techFeatures: JSON.stringify([
        'Núcleo de muelles ensacados de alta densidad (275 muelles/m²)',
        'Acolchado viscoelástica + viscosoft 3,5 cm por cara',
        'Box perimetral HR reforzado para mayor durabilidad',
        'Tejido Stretch Royal con relieve premium',
        'Acolchado tapa a tapa de alta gama',
        'Sistema de independencia de lechos avanzado',
        'Asas laterales para fácil manejo',
        'Altura total: ±30 cm',
        'Peso máximo recomendado: 110 kg/persona'
      ]),
      
      // Certificaciones
      certifications: JSON.stringify([
        'OEKO-TEX Standard 100',
        'CertiPUR-ES',
        'ISO 9001:2015',
        'Fabricado en España'
      ]),
      
      // Tags para búsqueda
      tags: JSON.stringify([
        'muelles ensacados',
        'viscoelástica',
        'doble cara',
        'alta gama',
        'parejas',
        'independencia de lechos',
        'silencioso',
        'transpirable',
        'firmeza media-alta',
        'royal zen'
      ]),
      
      // Highlights
      highlights: JSON.stringify([
        'Doble cara viscoelástica',
        '275 muelles ensacados/m²',
        'Box perimetral reforzado',
        'Tejido Stretch Royal premium',
        'Independencia total de lechos'
      ]),
      
      // Garantía y prueba
      warranty: 10,
      trialNights: 100,
      
      // Materiales
      materials: JSON.stringify([
        'Viscoelástica termosensible',
        'Viscosoft de alta densidad',
        'Muelles ensacados de acero',
        'Espuma HR perimetral',
        'Tejido Stretch Royal'
      ]),
      
      // Capas del colchón
      layers: JSON.stringify([
        {
          name: 'Tejido Stretch Royal',
          description: 'Tacto suave y elegante con relieve premium'
        },
        {
          name: 'Viscoelástica + Viscosoft 3,5 cm',
          description: 'Cara superior: adaptabilidad y confort'
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
          name: 'Viscoelástica + Viscosoft 3,5 cm',
          description: 'Cara inferior: mismo confort reversible'
        },
        {
          name: 'Tejido Stretch Royal',
          description: 'Acabado inferior de alta calidad'
        }
      ]),
      
      // Badges y estados
      badge: 'PREMIUM',
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      isActive: true,
      isEco: false,
      
      // Stock
      stock: 150,
      inStock: true,
      lowStockThreshold: 20,
      sku: 'RZ-ME-DC-30',
      barcode: '8421234567890',
      
      // Envío
      deliveryDays: 5, // 3-6 días = promedio 5
      freeShipping: true,
      shippingCost: 0,
      
      // Propiedades del colchón
      cooling: false,
      hypoallergenic: true,
      washable: false,
      antiDustMite: true,
      reversible: true, // Doble cara
      silent: true, // Muelles ensacados
      motionIsolation: true, // Independencia de lechos
      edgeSupport: true, // Box perimetral reforzado
      verified: true,
      bestValue: true,
      satisfaction: 97,
      
      // SEO
      metaTitle: 'Colchón Royal Zen - Muelles Ensacados con Visco Doble Confort',
      metaDescription: 'Colchón premium de muelles ensacados con doble cara viscoelástica. Firmeza media-alta, independencia de lechos, silencioso. Envío gratis 3-6 días.',
      metaKeywords: 'colchón muelles ensacados, colchón viscoelástica, colchón doble cara, colchón parejas, royal zen',
      
      // Posición y categoría
      position: 1,
      categoryId: category.id,
      
      publishedAt: new Date()
    }
  })

  console.log(`✅ Producto "${product.name}" creado con ID: ${product.id}`)

  // Crear variantes (tamaños)
  const sizes = [
    // Individual
    { size: '80x180', width: 80, length: 180, price: 249.99, popular: false },
    { size: '80x190', width: 80, length: 190, price: 259.99, popular: false },
    { size: '80x200', width: 80, length: 200, price: 269.99, popular: false },
    { size: '90x180', width: 90, length: 180, price: 269.99, popular: false },
    { size: '90x190', width: 90, length: 190, price: 299.99, popular: true },
    { size: '90x200', width: 90, length: 200, price: 309.99, popular: true },
    
    // Matrimonio pequeño
    { size: '100x180', width: 100, length: 180, price: 319.99, popular: false },
    { size: '100x190', width: 100, length: 190, price: 329.99, popular: false },
    { size: '100x200', width: 100, length: 200, price: 339.99, popular: false },
    { size: '105x180', width: 105, length: 180, price: 329.99, popular: false },
    { size: '105x190', width: 105, length: 190, price: 339.99, popular: false },
    { size: '105x200', width: 105, length: 200, price: 349.99, popular: false },
    
    // Matrimonio estándar
    { size: '120x180', width: 120, length: 180, price: 359.99, popular: false },
    { size: '120x190', width: 120, length: 190, price: 369.99, popular: false },
    { size: '120x200', width: 120, length: 200, price: 379.99, popular: false },
    { size: '135x180', width: 135, length: 180, price: 389.99, popular: true },
    { size: '135x190', width: 135, length: 190, price: 399.99, popular: true },
    { size: '135x200', width: 135, length: 200, price: 409.99, popular: true },
    
    // Matrimonio grande
    { size: '140x180', width: 140, length: 180, price: 409.99, popular: false },
    { size: '140x190', width: 140, length: 190, price: 419.99, popular: true },
    { size: '140x200', width: 140, length: 200, price: 429.99, popular: true },
    { size: '150x180', width: 150, length: 180, price: 439.99, popular: true },
    { size: '150x190', width: 150, length: 190, price: 449.99, popular: true },
    { size: '150x200', width: 150, length: 200, price: 459.99, popular: true },
    { size: '160x180', width: 160, length: 180, price: 469.99, popular: true },
    { size: '160x190', width: 160, length: 190, price: 479.99, popular: true },
    { size: '160x200', width: 160, length: 200, price: 499.99, popular: true },
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
        originalPrice: sizeData.price * 2, // 50% descuento
        stock: 25,
        sku: `RZ-ME-DC-30-${sizeData.size.replace('x', '-')}`,
        barcode: `8421234567${sizeData.width}${sizeData.length}`,
        weight: (sizeData.width * sizeData.length * 30) / 10000, // Cálculo aproximado
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
      title: 'El mejor colchón que he probado',
      comment: 'Llevamos 3 meses durmiendo en el Royal Zen y es una maravilla. La firmeza es perfecta, no es ni muy duro ni muy blando. Mi pareja se mueve mucho por la noche y yo no noto absolutamente nada. Además, el acabado es muy elegante.',
      userName: 'María González',
      userLocation: 'Madrid',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 90,
      productSize: '150x190',
      pros: JSON.stringify(['Firmeza perfecta', 'Independencia de lechos', 'Acabado premium', 'Sin ruidos']),
      cons: JSON.stringify([]),
      helpfulCount: 34
    },
    {
      rating: 5,
      title: 'Ideal para parejas',
      comment: 'Lo compramos porque mi mujer es muy sensible a los movimientos. Con este colchón el problema está resuelto. Los muelles ensacados funcionan de maravilla y es super silencioso. Calidad-precio imbatible.',
      userName: 'Carlos Ruiz',
      userLocation: 'Barcelona',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 45,
      productSize: '150x200',
      pros: JSON.stringify(['Independencia total', 'Silencioso', 'Buena firmeza']),
      cons: JSON.stringify([]),
      helpfulCount: 28
    },
    {
      rating: 5,
      title: 'Calidad excepcional',
      comment: 'Es el tercer colchón que compro en esta web y sin duda el mejor. La viscoelástica es de muy buena calidad, se adapta perfectamente y no da calor. El box perimetral se nota que es robusto. Muy recomendable.',
      userName: 'Laura Martínez',
      userLocation: 'Valencia',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 60,
      productSize: '135x190',
      pros: JSON.stringify(['Calidad premium', 'Adaptable', 'Refuerzo perimetral excelente']),
      cons: JSON.stringify([]),
      helpfulCount: 22
    },
    {
      rating: 4,
      title: 'Muy buen colchón, pequeño inconveniente',
      comment: 'El colchón es excelente en todos los aspectos: comodidad, firmeza, independencia. Solo un pequeño pero: al principio tenía un olor fuerte, pero se fue en un par de días. Por lo demás, perfecto.',
      userName: 'Javier López',
      userLocation: 'Sevilla',
      comfortRating: 5,
      qualityRating: 4,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 30,
      productSize: '150x190',
      pros: JSON.stringify(['Comodidad', 'Firmeza ideal', 'Buen precio']),
      cons: JSON.stringify(['Olor inicial (normal y temporal)']),
      helpfulCount: 18
    },
    {
      rating: 5,
      title: 'Impresionante relación calidad-precio',
      comment: 'Por este precio no esperaba tanta calidad. El colchón es grueso, los materiales se ven y se sienten premium. Duermo mucho mejor desde que lo tengo. La entrega fue rapidísima, en 4 días lo tenía en casa.',
      userName: 'Ana Fernández',
      userLocation: 'Bilbao',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 75,
      productSize: '140x190',
      pros: JSON.stringify(['Precio increíble', 'Calidad top', 'Entrega rápida']),
      cons: JSON.stringify([]),
      helpfulCount: 25
    },
    {
      rating: 5,
      title: 'Adiós al dolor de espalda',
      comment: 'Sufro de problemas lumbares y este colchón ha sido una bendición. La combinación de firmeza y adaptabilidad es justo lo que necesitaba. Por las mañanas me levanto sin dolor. Totalmente recomendado.',
      userName: 'Roberto Sánchez',
      userLocation: 'Zaragoza',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 4,
      verified: true,
      purchaseVerified: true,
      usageDays: 120,
      productSize: '135x190',
      pros: JSON.stringify(['Soporte lumbar excelente', 'Firmeza perfecta', 'Me levanto sin dolor']),
      cons: JSON.stringify([]),
      helpfulCount: 31
    },
    {
      rating: 4,
      title: 'Muy bueno pero necesita tiempo de adaptación',
      comment: 'Al principio me pareció un poco firme, pero después de una semana me acostumbré y ahora duermo genial. Es verdad que no se mueven los muelles, eso es una pasada. El tejido es muy suave.',
      userName: 'Elena Torres',
      userLocation: 'Málaga',
      comfortRating: 4,
      qualityRating: 5,
      valueRating: 4,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 40,
      productSize: '150x200',
      pros: JSON.stringify(['Independencia de lechos', 'Tejido suave', 'Silencioso']),
      cons: JSON.stringify(['Necesita periodo de adaptación']),
      helpfulCount: 15
    },
    {
      rating: 5,
      title: 'Perfecta compra',
      comment: 'Teníamos dudas entre varios modelos pero elegimos este por las opiniones y no nos equivocamos. Es cómodo, bonito y de calidad. El servicio de atención al cliente también fue excelente.',
      userName: 'David Moreno',
      userLocation: 'Murcia',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 55,
      productSize: '160x200',
      pros: JSON.stringify(['Todo perfecto', 'Atención al cliente', 'Calidad visible']),
      cons: JSON.stringify([]),
      helpfulCount: 19
    }
  ]

  for (const reviewData of reviews) {
    await prisma.review.create({
      data: {
        productId: product.id,
        ...reviewData,
        isPublished: true,
        wouldRecommend: true,
        userEmail: `${reviewData.userName.toLowerCase().replace(' ', '.')}@example.com`,
        userAvatar: `https://ui-avatars.com/api/?name=${reviewData.userName}&background=random`
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
  console.log('🎉 Seed completado exitosamente!')
}

// Ejecutar seed
seedRoyalZen()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })