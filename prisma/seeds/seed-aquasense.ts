// prisma/seeds/seed-aquasense.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

async function seedAquaSense() {
  console.log('🌱 Seeding AquaSense product...')

  // Buscar o crear categoría de Viscoelástica
  let category = await prisma.category.findUnique({
    where: { slug: 'viscoelastica' }
  })

  if (!category) {
    category = await prisma.category.create({
      data: {
        name: 'Viscoelástica',
        slug: 'viscoelastica',
        description: 'Colchones viscoelásticos que se adaptan perfectamente a tu cuerpo, aliviando puntos de presión',
        gradient: 'from-blue-500 to-cyan-500',
        icon: '☁️',
        isActive: true,
        isFeatured: true,
        order: 1,
        metaTitle: 'Colchones Viscoelásticos | Máxima Adaptabilidad',
        metaDescription: 'Descubre nuestra colección de colchones viscoelásticos. Confort envolvente, alivio de presión y descanso superior.'
      }
    })
    console.log('✅ Categoría "Viscoelástica" creada')
  } else {
    console.log('✅ Categoría "Viscoelástica" encontrada')
  }

  // Crear el producto AquaSense
  const product = await prisma.product.create({
    data: {
      // Identificación
      name: 'Colchón AquaSense',
      slug: 'colchon-aquasense-doble-cara-viscogel-viscoelastica',
      subtitle: 'Doble Cara ViscoGel & Viscoelástica',
      
      // Descripción
      description: 'El AquaSense combina tecnología avanzada y equilibrio térmico para ofrecerte confort absoluto todo el año. Su doble cara con ViscoGel refrescante y Viscoelástica envolvente adapta tu descanso a cada estación.',
      
      story: `Descubre el Colchón AquaSense, una experiencia de descanso diseñada para quienes buscan frescura, adaptabilidad y elegancia en un solo colchón.

Gracias a su tecnología de doble cara, disfrutarás del confort perfecto en cualquier época del año:

🌞 **Cara Verano** – ViscoGel termorregulador que disipa el calor y mantiene una sensación fresca y ligera.
❄️ **Cara Invierno** – Viscoelástica envolvente con efecto nube cálido y acogedor.

Su núcleo HR de alta densidad con viscoelástica a ambos lados garantiza firmeza, durabilidad y una acogida ergonómica que favorece la postura y la circulación.

Cada detalle, desde el tejido Stretch Blue Bubble termorregulador hasta su lateral bicolor con diseño "Wave", transmite estilo, higiene y resistencia.

✅ El resultado: un descanso profundo, equilibrado y elegante durante los 365 días del año.`,
      
      // Precios (base para 90x190)
      price: 279.99,
      originalPrice: 559.99,
      compareAtPrice: 649.99,
      discount: 50,
      
      // Características técnicas
      firmness: Firmness.FIRME,
      firmnessValue: 100,
      transpirability: 50,
      adaptability: 100,
      height: 30,
      weight: 24.0,
      maxWeightPerPerson: 110,
      
      // Imágenes (actualiza con tus URLs reales)
      image: '/images/products/aquasense/main.jpg',
      images: JSON.stringify([
        '/images/products/aquasense/main.jpg',
        '/images/products/aquasense/summer-side.jpg',
        '/images/products/aquasense/winter-side.jpg',
        '/images/products/aquasense/viscogel-detail.jpg',
        '/images/products/aquasense/wave-design.jpg',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=example',
      gradient: 'from-blue-400 via-cyan-500 to-teal-400',
      
      // Ratings y stats
      rating: 4.9,
      reviewCount: 0, // Se actualizará después
      salesCount: 412,
      viewsCount: 3156,
      
      // Features principales
      features: JSON.stringify([
        '❄️ Frescura en verano gracias al ViscoGel termorregulador',
        '☁️ Calidez envolvente en invierno con viscoelástica de alta adaptabilidad',
        '💪 Soporte firme y duradero con núcleo HR de alta resiliencia',
        '🧼 Tejido higiénico y transpirable Stretch Blue Bubble',
        '🔄 Doble cara funcional con señal de orientación por estación',
        '💙 Diseño contemporáneo azul/blanco con estética premium',
        '🌡️ Termorregulación inteligente para confort todo el año',
        '🚚 Envío gratis a España peninsular en 3-6 días hábiles'
      ]),
      
      // Características técnicas detalladas
      techFeatures: JSON.stringify([
        'Núcleo HR de alta densidad y resiliencia',
        'Cara verano: ViscoGel + Supersoft 3,5 cm',
        'Cara invierno: Viscoelástica + Supersoft 3,5 cm',
        'Viscoelástica 2 cm a ambos lados del núcleo',
        'Tejido Stretch Blue Bubble termorregulador',
        'Lateral Wave Azul/Blanco de alta resistencia',
        'Sistema de señalización por estación',
        'Altura total: ±30 cm',
        'Peso máximo recomendado: 110 kg/persona',
        'Firmeza alta (100%) ideal para múltiples posturas'
      ]),
      
      // Certificaciones
      certifications: JSON.stringify([
        'OEKO-TEX Standard 100',
        'CertiPUR-ES',
        'ISO 9001:2015',
        'Certificado termorregulador',
        'Fabricado en España'
      ]),
      
      // Tags para búsqueda
      tags: JSON.stringify([
        'colchón viscoelástico',
        'colchón viscogel',
        'colchón doble cara',
        'colchón verano invierno',
        'colchón termorregulador',
        'colchón refrescante',
        'aquasense',
        'viscogel',
        'doble cara',
        'alta firmeza',
        'confort todo el año',
        'termorregulación'
      ]),
      
      // Highlights
      highlights: JSON.stringify([
        'Doble cara: Verano/Invierno',
        'ViscoGel termorregulador',
        'Núcleo HR alta densidad',
        'Tejido Blue Bubble',
        'Diseño Wave bicolor'
      ]),
      
      // Garantía y prueba
      warranty: 10,
      trialNights: 100,
      
      // Materiales
      materials: JSON.stringify([
        'ViscoGel termorregulador',
        'Viscoelástica termosensible',
        'Supersoft de alta densidad',
        'Espuma HR alta resiliencia',
        'Tejido Stretch Blue Bubble',
        'Tejido Wave bicolor'
      ]),
      
      // Capas del colchón
      layers: JSON.stringify([
        {
          name: 'Tejido Stretch Blue Bubble',
          description: 'Cara verano: termorregulador y refrescante'
        },
        {
          name: 'ViscoGel + Supersoft 3,5 cm',
          description: 'Acolchado verano: frescor y adaptabilidad'
        },
        {
          name: 'Viscoelástica 2 cm',
          description: 'Capa superior de confort'
        },
        {
          name: 'Núcleo HR Alta Densidad',
          description: 'Soporte firme y duradero'
        },
        {
          name: 'Viscoelástica 2 cm',
          description: 'Capa inferior de confort'
        },
        {
          name: 'Viscoelástica + Supersoft 3,5 cm',
          description: 'Acolchado invierno: calidez envolvente'
        },
        {
          name: 'Tejido Stretch Blue Bubble',
          description: 'Cara invierno: confort térmico'
        }
      ]),
      
      // Badges y estados
      badge: 'ECO+',
      isNew: true,
      isBestSeller: true,
      isFeatured: true,
      isActive: true,
      isEco: true,
      
      // Stock
      stock: 180,
      inStock: true,
      lowStockThreshold: 25,
      sku: 'AS-VG-DC-30',
      barcode: '8421234567892',
      
      // Envío
      deliveryDays: 5,
      freeShipping: true,
      shippingCost: 0,
      
      // Propiedades del colchón
      cooling: true, // ViscoGel refrescante
      hypoallergenic: true,
      washable: false,
      antiDustMite: true,
      reversible: true, // Doble cara verano/invierno
      silent: true,
      motionIsolation: true,
      edgeSupport: true,
      verified: true,
      bestValue: true,
      satisfaction: 98,
      
      // SEO
      metaTitle: 'Colchón AquaSense Doble Cara ViscoGel y Viscoelástica | 30 cm Confort Premium',
      metaDescription: 'Descubre el Colchón AquaSense: frescor en verano, calidez en invierno y confort total con su núcleo HR de alta densidad. Envío gratis y entrega en 3-6 días.',
      metaKeywords: 'colchón viscoelástico, colchón viscogel, colchón doble cara, colchón verano invierno, colchón termorregulador, colchón refrescante',
      
      // Posición y categoría
      position: 1, // Producto destacado
      categoryId: category.id,
      
      publishedAt: new Date()
    }
  })

  console.log(`✅ Producto "${product.name}" creado con ID: ${product.id}`)

  // Crear variantes (tamaños estándar)
  const sizes = [
    // Individual
    { size: '80x180', width: 80, length: 180, price: 229.99, popular: false },
    { size: '80x190', width: 80, length: 190, price: 239.99, popular: false },
    { size: '80x200', width: 80, length: 200, price: 249.99, popular: false },
    { size: '90x180', width: 90, length: 180, price: 249.99, popular: false },
    { size: '90x190', width: 90, length: 190, price: 279.99, popular: true },
    { size: '90x200', width: 90, length: 200, price: 289.99, popular: true },
    
    // Matrimonio pequeño
    { size: '100x180', width: 100, length: 180, price: 299.99, popular: false },
    { size: '100x190', width: 100, length: 190, price: 309.99, popular: false },
    { size: '100x200', width: 100, length: 200, price: 319.99, popular: false },
    { size: '105x180', width: 105, length: 180, price: 309.99, popular: false },
    { size: '105x190', width: 105, length: 190, price: 319.99, popular: false },
    { size: '105x200', width: 105, length: 200, price: 329.99, popular: false },
    
    // Matrimonio estándar
    { size: '120x180', width: 120, length: 180, price: 339.99, popular: false },
    { size: '120x190', width: 120, length: 190, price: 349.99, popular: false },
    { size: '120x200', width: 120, length: 200, price: 359.99, popular: false },
    { size: '135x180', width: 135, length: 180, price: 369.99, popular: true },
    { size: '135x190', width: 135, length: 190, price: 379.99, popular: true },
    { size: '135x200', width: 135, length: 200, price: 389.99, popular: true },
    
    // Matrimonio grande
    { size: '140x180', width: 140, length: 180, price: 389.99, popular: false },
    { size: '140x190', width: 140, length: 190, price: 399.99, popular: true },
    { size: '140x200', width: 140, length: 200, price: 409.99, popular: true },
    { size: '150x180', width: 150, length: 180, price: 419.99, popular: true },
    { size: '150x190', width: 150, length: 190, price: 429.99, popular: true },
    { size: '150x200', width: 150, length: 200, price: 439.99, popular: true },
    { size: '160x180', width: 160, length: 180, price: 449.99, popular: true },
    { size: '160x190', width: 160, length: 190, price: 459.99, popular: true },
    { size: '160x200', width: 160, length: 200, price: 479.99, popular: true },
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
        stock: 30,
        sku: `AS-VG-DC-30-${sizeData.size.replace('x', '-')}`,
        barcode: `8421234569${String(sizeData.width).padStart(3, '0')}${String(sizeData.length).padStart(3, '0')}`,
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
      title: 'Revolucionario para quien tiene calor',
      comment: 'Soy de los que siempre tiene calor durmiendo y este colchón ha sido un cambio total. La cara de verano con ViscoGel es increíblemente fresca. En invierno lo volteo y perfecto también. Muy inteligente.',
      userName: 'Raúl Mendoza',
      userLocation: 'Sevilla',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 90,
      productSize: '135x190',
      pros: JSON.stringify(['ViscoGel muy refrescante', 'Doble cara práctica', 'Alta calidad', 'Firmeza perfecta']),
      cons: JSON.stringify([]),
      helpfulCount: 42
    },
    {
      rating: 5,
      title: 'La mejor compra del año',
      comment: 'Llevo tres meses usándolo (verano e inicios de otoño) y es espectacular. La cara de verano realmente funciona, no pasé calor ni una noche. Ahora en otoño ya lo volteé a la cara de invierno. Genial poder adaptarlo.',
      userName: 'Carmen Vega',
      userLocation: 'Málaga',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 95,
      productSize: '150x190',
      pros: JSON.stringify(['Sistema verano/invierno real', 'Muy fresco', 'Cómodo', 'Buena firmeza']),
      cons: JSON.stringify([]),
      helpfulCount: 38
    },
    {
      rating: 5,
      title: 'Tecnología que funciona',
      comment: 'Tenía dudas sobre si el ViscoGel realmente refrescaba, pero sí lo hace. Es un colchón firme pero muy cómodo. El diseño azul es muy bonito y moderno. Relación calidad-precio excelente.',
      userName: 'Jorge Campos',
      userLocation: 'Valencia',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 4,
      verified: true,
      purchaseVerified: true,
      usageDays: 60,
      productSize: '150x200',
      pros: JSON.stringify(['ViscoGel efectivo', 'Diseño bonito', 'Buena firmeza', 'Precio justo']),
      cons: JSON.stringify([]),
      helpfulCount: 29
    },
    {
      rating: 4,
      title: 'Muy bueno pero firme',
      comment: 'Excelente colchón en general. Eso sí, es bastante firme, si te gustan blanditos este no es para ti. A mí me gusta así y estoy muy contento. El efecto refrescante es real.',
      userName: 'Andrea Soto',
      userLocation: 'Murcia',
      comfortRating: 4,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 45,
      productSize: '135x190',
      pros: JSON.stringify(['Fresco y cómodo', 'Buena calidad', 'Doble cara útil']),
      cons: JSON.stringify(['Bastante firme (no para todos)']),
      helpfulCount: 24
    },
    {
      rating: 5,
      title: 'Ideal para verano mediterráneo',
      comment: 'Vivo en la costa y los veranos son muy calurosos. Este colchón ha sido una bendición. Duermo mucho mejor desde que lo tengo. La firmeza también es ideal para mi espalda. Lo recomiendo 100%.',
      userName: 'Miguel Ángel Torres',
      userLocation: 'Alicante',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 75,
      productSize: '140x190',
      pros: JSON.stringify(['Muy refrescante', 'Ideal climas cálidos', 'Buen soporte espalda']),
      cons: JSON.stringify([]),
      helpfulCount: 33
    },
    {
      rating: 5,
      title: 'Innovación y confort',
      comment: 'Me encanta poder cambiar de cara según la estación. Es muy práctico y funciona de verdad. Los materiales se ven de calidad y el acabado es perfecto. Muy satisfecho con la compra.',
      userName: 'Silvia Martín',
      userLocation: 'Madrid',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 55,
      productSize: '160x200',
      pros: JSON.stringify(['Sistema inteligente', 'Alta calidad', 'Práctico', 'Bonito diseño']),
      cons: JSON.stringify([]),
      helpfulCount: 27
    },
    {
      rating: 5,
      title: 'No más noches de calor',
      comment: 'Sufría mucho con el calor nocturno y este colchón lo ha solucionado. El ViscoGel es mágico. Además es cómodo y tiene buena firmeza. El mejor colchón que he tenido.',
      userName: 'Pablo Navarro',
      userLocation: 'Córdoba',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 80,
      productSize: '150x190',
      pros: JSON.stringify(['Soluciona problema de calor', 'Muy cómodo', 'Buena firmeza']),
      cons: JSON.stringify([]),
      helpfulCount: 35
    },
    {
      rating: 4,
      title: 'Buena inversión',
      comment: 'Colchón de muy buena calidad. El sistema de doble cara es genial. Le doy 4 estrellas porque al principio me pareció muy firme, pero ya me acostumbré y ahora me encanta.',
      userName: 'Nuria Fernández',
      userLocation: 'Granada',
      comfortRating: 4,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 40,
      productSize: '135x200',
      pros: JSON.stringify(['Sistema doble cara', 'Alta calidad', 'Refrescante']),
      cons: JSON.stringify(['Muy firme inicialmente']),
      helpfulCount: 18
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
  console.log('🎉 Seed AquaSense completado exitosamente!')
}

// Ejecutar seed
seedAquaSense()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })