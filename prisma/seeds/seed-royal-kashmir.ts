// prisma/seeds/seed-royal-kashmir.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

async function seedRoyalKashmir() {
  console.log('🌱 Seeding Royal Kashmir product...')

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

  // Crear el producto Royal Kashmir
  const product = await prisma.product.create({
    data: {
      // Identificación
      name: 'Colchón Royal Kashmir',
      slug: 'colchon-royal-kashmir-muelles-ensacados-viscoelastica-premium',
      subtitle: 'Muelles Ensacados & Viscoelástica Premium',
      
      // Descripción
      description: 'El Colchón Royal Kashmir combina tecnología avanzada y suavidad natural. Su tejido con fibras de Kashmir aporta una sensación lujosa y envolvente, mientras la viscoelástica de alta densidad ofrece el efecto nube más buscado. El núcleo de muelles ensacados con 9 zonas de confort garantiza un descanso silencioso, firme y sin interrupciones.',
      
      story: `Descubre el poder del descanso con el Colchón Royal Kashmir, donde la tecnología de muelles ensacados se une al lujo de las fibras de Kashmir para ofrecer una experiencia de confort superior.

Cada noche sentirás cómo su acolchado viscoelástico con efecto nube abraza tu cuerpo, aliviando tensiones musculares y adaptándose a cada forma sin perder soporte. El Kashmir, una de las fibras naturales más suaves del mundo, añade una textura elegante y cálida, aportando una sensación de suavidad incomparable desde el primer contacto.

Su núcleo de muelles ensacados con 275 muelles/m² está diseñado para crear 9 zonas de descanso independientes, garantizando el soporte exacto que cada parte del cuerpo necesita. Además, su independencia de lechos convierte al Royal Kashmir en el colchón ideal para dormir en pareja, sin notar los movimientos del otro.

Silencioso, transpirable y duradero, el Royal Kashmir transforma tu descanso en un momento de auténtico placer sensorial. El resultado es un equilibrio perfecto entre firmeza, adaptabilidad y elegancia: un colchón que no solo cuida tu cuerpo, sino que eleva tu bienestar nocturno a un nivel superior.

✨ **Royal Kashmir: lujo, tecnología y bienestar para un descanso real.**`,
      
      // Precios (base para 90x190)
      price: 359.99,
      originalPrice: 719.99,
      compareAtPrice: 849.99,
      discount: 50,
      
      // Características técnicas
      firmness: Firmness.MEDIA_ALTA,
      firmnessValue: 80,
      transpirability: 50,
      adaptability: 80,
      height: 30,
      weight: 28.0,
      maxWeightPerPerson: 110,
      
      // Imágenes (actualiza con tus URLs reales)
      image: '/images/products/royal-kashmir/main.jpg',
      images: JSON.stringify([
        '/images/products/royal-kashmir/main.jpg',
        '/images/products/royal-kashmir/kashmir-fabric.jpg',
        '/images/products/royal-kashmir/9-zones.jpg',
        '/images/products/royal-kashmir/springs-detail.jpg',
        '/images/products/royal-kashmir/layers.jpg',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=example',
      gradient: 'from-purple-600 via-pink-500 to-rose-500',
      
      // Ratings y stats
      rating: 4.9,
      reviewCount: 0, // Se actualizará después
      salesCount: 198,
      viewsCount: 2893,
      
      // Features principales
      features: JSON.stringify([
        '🩵 Tejido Kashmir Premium: máxima suavidad y sensación de lujo',
        '☁️ Efecto nube viscoelástico: tumbada envolvente y ergonómica',
        '💤 9 zonas de descanso: soporte individualizado en cada punto del cuerpo',
        '🔇 Independencia total de lechos: ideal para dormir en pareja',
        '🌬️ Transpirabilidad media (50%) que mantiene el colchón fresco y seco',
        '💪 Firmeza equilibrada (80%): confort estable sin perder adaptabilidad',
        '🔒 Núcleo de muelles ensacados con Box HR: máxima durabilidad y soporte',
        '🚚 Envío gratuito a toda España peninsular en 3–6 días hábiles'
      ]),
      
      // Características técnicas detalladas
      techFeatures: JSON.stringify([
        'Núcleo de muelles ensacados (275 muelles/m²)',
        'Sistema de 9 zonas de descanso diferenciadas',
        'Acolchado superior Visco + Viscosoft 3,5 cm',
        'Tejido Stretch con fibras naturales de Kashmir',
        'Box perimetral HR reforzado',
        'Tejido TNT antibacteriano protector',
        'Sistema de independencia de lechos avanzado',
        'Refuerzo perimetral para máxima durabilidad',
        'Altura total: ±30 cm',
        'Peso máximo recomendado: 110 kg/persona'
      ]),
      
      // Certificaciones
      certifications: JSON.stringify([
        'OEKO-TEX Standard 100',
        'CertiPUR-ES',
        'ISO 9001:2015',
        'Fibras Kashmir certificadas',
        'Tejido antibacteriano',
        'Fabricado en España'
      ]),
      
      // Tags para búsqueda
      tags: JSON.stringify([
        'colchón Royal Kashmir',
        'colchón muelles ensacados',
        'colchón viscoelástico premium',
        'colchón kashmir',
        'colchón efecto nube',
        'colchón para parejas',
        'colchón alta gama',
        'colchón silencioso',
        'royal kashmir',
        '9 zonas confort',
        'muelles ensacados',
        'luxury',
        'premium'
      ]),
      
      // Highlights
      highlights: JSON.stringify([
        'Tejido Kashmir Premium',
        '9 zonas de descanso',
        '275 muelles ensacados/m²',
        'Efecto nube viscoelástico',
        'Box perimetral reforzado'
      ]),
      
      // Garantía y prueba
      warranty: 10,
      trialNights: 100,
      
      // Materiales
      materials: JSON.stringify([
        'Fibras naturales de Kashmir',
        'Viscoelástica de alta densidad',
        'Viscosoft premium',
        'Muelles ensacados de acero templado',
        'Espuma HR perimetral reforzada',
        'Tejido Stretch Premium',
        'Tejido TNT antibacteriano'
      ]),
      
      // Capas del colchón
      layers: JSON.stringify([
        {
          name: 'Tejido Stretch Kashmir',
          description: 'Fibras naturales de Kashmir para máxima suavidad'
        },
        {
          name: 'Acolchado Visco + Viscosoft 3,5 cm',
          description: 'Efecto nube envolvente y ergonómico'
        },
        {
          name: 'Tejido TNT Antibacteriano',
          description: 'Barrera protectora higiénica'
        },
        {
          name: 'Núcleo Muelles Ensacados 9 Zonas',
          description: '275 muelles/m² con soporte diferenciado'
        },
        {
          name: 'Box Perimetral HR',
          description: 'Refuerzo de durabilidad y estabilidad'
        },
        {
          name: 'Base Tejido Premium',
          description: 'Acabado inferior de alta calidad'
        }
      ]),
      
      // Badges y estados
      badge: 'ROYAL',
      isNew: false,
      isBestSeller: false,
      isFeatured: true,
      isActive: true,
      isEco: false,
      
      // Stock
      stock: 95,
      inStock: true,
      lowStockThreshold: 15,
      sku: 'RK-ME-KS-30',
      barcode: '8421234567894',
      
      // Envío
      deliveryDays: 5,
      freeShipping: true,
      shippingCost: 0,
      
      // Propiedades del colchón
      cooling: false,
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
      
      // SEO
      metaTitle: 'Colchón Royal Kashmir - Muelles Ensacados & Viscoelástica Premium | 9 Zonas',
      metaDescription: 'Colchón Royal Kashmir con fibras de Kashmir, 9 zonas de descanso, muelles ensacados y viscoelástica premium. Lujo y tecnología para tu descanso. Envío gratis 3-6 días.',
      metaKeywords: 'colchón Royal Kashmir, colchón muelles ensacados, colchón viscoelástico premium, colchón kashmir, colchón efecto nube, colchón para parejas, colchón alta gama, colchón silencioso',
      
      // Posición y categoría
      position: 4,
      categoryId: category.id,
      
      publishedAt: new Date()
    }
  })

  console.log(`✅ Producto "${product.name}" creado con ID: ${product.id}`)

  // Crear variantes (tamaños) - Incluye King size
  const sizes = [
    // Individual
    { size: '80x180', width: 80, length: 180, price: 309.99, popular: false },
    { size: '80x190', width: 80, length: 190, price: 319.99, popular: false },
    { size: '80x200', width: 80, length: 200, price: 329.99, popular: false },
    { size: '90x180', width: 90, length: 180, price: 329.99, popular: false },
    { size: '90x190', width: 90, length: 190, price: 359.99, popular: true },
    { size: '90x200', width: 90, length: 200, price: 369.99, popular: true },
    
    // Matrimonio pequeño
    { size: '105x180', width: 105, length: 180, price: 389.99, popular: false },
    { size: '105x190', width: 105, length: 190, price: 399.99, popular: false },
    { size: '105x200', width: 105, length: 200, price: 409.99, popular: false },
    
    // Matrimonio estándar
    { size: '135x180', width: 135, length: 180, price: 449.99, popular: true },
    { size: '135x190', width: 135, length: 190, price: 459.99, popular: true },
    { size: '135x200', width: 135, length: 200, price: 469.99, popular: true },
    
    // Matrimonio grande
    { size: '150x180', width: 150, length: 180, price: 499.99, popular: true },
    { size: '150x190', width: 150, length: 190, price: 509.99, popular: true },
    { size: '150x200', width: 150, length: 200, price: 519.99, popular: true },
    { size: '160x180', width: 160, length: 180, price: 539.99, popular: true },
    { size: '160x190', width: 160, length: 190, price: 549.99, popular: true },
    { size: '160x200', width: 160, length: 200, price: 569.99, popular: true },
    
    // King size
    { size: '180x180', width: 180, length: 180, price: 609.99, popular: false },
    { size: '180x190', width: 180, length: 190, price: 629.99, popular: true },
    { size: '180x200', width: 180, length: 200, price: 649.99, popular: true },
    { size: '200x180', width: 200, length: 180, price: 669.99, popular: false },
    { size: '200x190', width: 200, length: 190, price: 689.99, popular: true },
    { size: '200x200', width: 200, length: 200, price: 719.99, popular: true },
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
        stock: 15,
        sku: `RK-ME-KS-30-${sizeData.size.replace('x', '-')}`,
        barcode: `8421234571${String(sizeData.width).padStart(3, '0')}${String(sizeData.length).padStart(3, '0')}`,
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
      title: 'Lujo absoluto para el descanso',
      comment: 'El tejido Kashmir es una pasada, es como dormir en una nube de suavidad. Las 9 zonas de confort se notan mucho, especialmente en la zona lumbar. Es el colchón más cómodo que he tenido. Totalmente recomendado.',
      userName: 'Victoria Sánchez',
      userLocation: 'Madrid',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 80,
      productSize: '160x200',
      pros: JSON.stringify(['Kashmir increíblemente suave', '9 zonas efectivas', 'Comodidad suprema', 'Alta calidad']),
      cons: JSON.stringify([]),
      helpfulCount: 43
    },
    {
      rating: 5,
      title: 'Tecnología de 9 zonas que funciona',
      comment: 'Tenía curiosidad sobre si las 9 zonas realmente se notaban y sí, se notan. Cada parte del cuerpo tiene el soporte que necesita. Mi espalda lo agradece muchísimo. Y el Kashmir es un plus de lujo.',
      userName: 'Roberto Díaz',
      userLocation: 'Barcelona',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 4,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 65,
      productSize: '150x190',
      pros: JSON.stringify(['9 zonas perceptibles', 'Soporte lumbar excelente', 'Kashmir suave', 'Sin dolor']),
      cons: JSON.stringify([]),
      helpfulCount: 38
    },
    {
      rating: 5,
      title: 'El colchón más lujoso',
      comment: 'He dormido en hoteles de 5 estrellas y este colchón está al mismo nivel o superior. El Kashmir le da un toque de elegancia y suavidad único. La independencia de lechos es perfecta. Vale cada euro.',
      userName: 'Carmen Iglesias',
      userLocation: 'Valencia',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 90,
      productSize: '180x200',
      pros: JSON.stringify(['Nivel hotel 5 estrellas', 'Kashmir excepcional', 'Independencia total', 'Lujo real']),
      cons: JSON.stringify([]),
      helpfulCount: 41
    },
    {
      rating: 5,
      title: 'Adiós a los dolores de espalda',
      comment: 'Sufro de hernias discales y este colchón ha sido una bendición. Las 9 zonas proporcionan el soporte exacto donde lo necesito. Duermo toda la noche sin dolor. La mejor inversión en salud.',
      userName: 'Miguel Ángel Pérez',
      userLocation: 'Sevilla',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 75,
      productSize: '150x200',
      pros: JSON.stringify(['Alivia dolor de espalda', 'Soporte diferenciado', 'Excelente para hernias', 'Calidad top']),
      cons: JSON.stringify([]),
      helpfulCount: 46
    },
    {
      rating: 4,
      title: 'Excelente pero hay que adaptarse',
      comment: 'Colchón de altísima calidad. El Kashmir es maravilloso. Le doy 4 estrellas porque al principio me pareció firme, pero tras una semana de adaptación es perfecto. Si buscas lo mejor, este es tu colchón.',
      userName: 'Lucía Fernández',
      userLocation: 'Málaga',
      comfortRating: 4,
      qualityRating: 5,
      valueRating: 4,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 35,
      productSize: '135x190',
      pros: JSON.stringify(['Kashmir suave', 'Alta calidad', '9 zonas útiles']),
      cons: JSON.stringify(['Necesita adaptación inicial']),
      helpfulCount: 27
    },
    {
      rating: 5,
      title: 'Perfecto para parejas exigentes',
      comment: 'Mi marido y yo tenemos pesos y preferencias diferentes. Este colchón con sus 9 zonas nos va perfecto a ambos. Además, no notamos movimientos. Es silencioso y muy cómodo. Lo mejor que hemos comprado.',
      userName: 'Ana María Torres',
      userLocation: 'Bilbao',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 70,
      productSize: '160x200',
      pros: JSON.stringify(['Perfecto para 2 personas', 'Adaptación individual', 'Silencioso', 'Kashmir delicioso']),
      cons: JSON.stringify([]),
      helpfulCount: 35
    },
    {
      rating: 5,
      title: 'Calidad que se ve y se siente',
      comment: 'Desde que lo sacas del embalaje se nota la calidad. El tejido, el grosor, los acabados... todo es premium. Las 9 zonas no son marketing, funcionan de verdad. Duermo como nunca.',
      userName: 'Francisco Martín',
      userLocation: 'Zaragoza',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 60,
      productSize: '150x190',
      pros: JSON.stringify(['Calidad visible', '9 zonas reales', 'Acabados perfectos', 'Muy cómodo']),
      cons: JSON.stringify([]),
      helpfulCount: 32
    },
    {
      rating: 5,
      title: 'Inversión en bienestar',
      comment: 'No es barato, pero es una inversión en tu salud y descanso. La tecnología de 9 zonas combinada con el Kashmir es simplemente perfecta. Me levanto descansado y sin dolores. Lo recomiendo 100%.',
      userName: 'Isabel Gómez',
      userLocation: 'Granada',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 4,
      verified: true,
      purchaseVerified: true,
      usageDays: 85,
      productSize: '150x200',
      pros: JSON.stringify(['Vale la inversión', 'Tecnología avanzada', 'Sin dolores', 'Kashmir exquisito']),
      cons: JSON.stringify([]),
      helpfulCount: 39
    },
    {
      rating: 5,
      title: 'El rey de los colchones',
      comment: 'Royal Kashmir le hace justicia al nombre. Es realmente real en calidad y confort. El efecto nube es increíble y el Kashmir aporta esa sensación de lujo que otros colchones no tienen. Maravilloso.',
      userName: 'Pedro Ramírez',
      userLocation: 'Murcia',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 95,
      productSize: '180x200',
      pros: JSON.stringify(['Nombre merecido', 'Efecto nube real', 'Kashmir único', 'Confort supremo']),
      cons: JSON.stringify([]),
      helpfulCount: 44
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
  console.log('🎉 Seed Royal Kashmir completado exitosamente!')
}

// Ejecutar seed
seedRoyalKashmir()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })