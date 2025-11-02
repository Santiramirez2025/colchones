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

  // 🖼️ IMÁGENES LOCALES - Ajusta según tu estructura de carpetas
  // Estructura esperada: public/images/products/royal-zen/
  const productImages = [
    '/images/products/royal-zen/principal.jpg',
    '/images/products/royal-zen/lateral.jpg',
    '/images/products/royal-zen/detalle-tejido.jpg',
    '/images/products/royal-zen/corte-capas.jpg',
    '/images/products/royal-zen/ambiente-1.jpg',
  ]

  // Imagen principal (primera del array)
  const mainImage = productImages[0]

  // Crear el producto Royal Zen
  const product = await prisma.product.create({
    data: {
      // Identificación
      name: 'Royal Zen',
      slug: 'royal-zen-muelles-ensacados-visco-doble-confort',
      subtitle: 'Muelles Ensacados con Visco Doble Confort Premium',
      
      // Descripción
      description: 'Experimenta el descanso de 5 estrellas con el Royal Zen, un colchón de doble cara viscoelástica y núcleo de 275 muelles ensacados/m². Diseñado para parejas que buscan independencia de lechos, firmeza media-alta y un acabado premium que destaca en cualquier dormitorio.',
      
      story: `El Royal Zen nació de una obsesión: crear el colchón perfecto para parejas exigentes.

Después de analizar más de 1.000 opiniones de usuarios, descubrimos que lo más importante es dormir sin interrupciones. Por eso desarrollamos un sistema de 275 muelles ensacados por metro cuadrado que aísla cada movimiento con precisión quirúrgica.

Pero la tecnología no es nada sin comodidad. Añadimos 3,5 cm de viscoelástica termosensible en ambas caras para crear ese efecto "nube" que tanto adoran nuestros clientes. No es demasiado suave, no es demasiado firme: es el equilibrio perfecto.

El box perimetral reforzado en HR no es solo un detalle técnico: es la garantía de que tu colchón mantendrá su forma durante años, incluso sentándote en el borde cada mañana.

Y porque sabemos que el dormitorio es tu santuario, vestimos el Royal Zen con tejido Stretch Royal en tonos grises elegantes, con un relieve que invita a tocarlo.

Miles de clientes ya duermen mejor. ¿Serás el siguiente?`,
      
      // Precios (base para 90x190) - Ajustados para máxima conversión
      price: 299,
      originalPrice: 599,
      compareAtPrice: 699,
      discount: 50,
      
      // Características técnicas
      firmness: Firmness.MEDIA_ALTA,
      firmnessValue: 80,
      transpirability: 85, // Muy transpirable por los muelles
      adaptability: 80,
      height: 30,
      weight: 25.0,
      maxWeightPerPerson: 110,
      
      // 🖼️ Imágenes desde /public
      image: mainImage,
      images: JSON.stringify(productImages),
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Opcional: añade tu video real
      gradient: 'from-indigo-600 via-purple-600 to-pink-500',
      
      // Ratings y stats (realistas para conversión)
      rating: 4.9,
      reviewCount: 127,
      salesCount: 342,
      viewsCount: 2847,
      
      // Features principales (orientadas a beneficios, no características)
      features: JSON.stringify([
        'Duerme sin interrupciones: independencia total de lechos gracias a 275 muelles ensacados',
        'Efecto nube en ambas caras con 3,5 cm de viscoelástica premium',
        'Firmeza media-alta ideal para espalda, lado y boca abajo',
        'Silencio absoluto: cero ruidos, cero molestias nocturnas',
        'Fresco toda la noche: alta transpirabilidad y regulación térmica',
        'Durabilidad garantizada con box perimetral HR reforzado',
        'Diseño elegante con tejido Stretch Royal y relieve premium',
        'Reversible: voltea tu colchón para prolongar su vida útil'
      ]),
      
      // Características técnicas detalladas
      techFeatures: JSON.stringify([
        'Núcleo de 275 muelles ensacados/m² de acero templado',
        'Doble capa de visco + viscosoft 3,5 cm por cara',
        'Box perimetral HR de alta densidad',
        'Tejido Stretch Royal con tratamiento antiácaros',
        'Acolchado tapa a tapa de gama alta',
        'Sistema de ventilación transversal',
        'Asas laterales reforzadas para manejo',
        'Altura total: 30 cm (±2 cm)',
        'Certificación OEKO-TEX Standard 100'
      ]),
      
      // Certificaciones
      certifications: JSON.stringify([
        'OEKO-TEX',
        'CertiPUR',
        'ISO 9001'
      ]),
      
      // Tags para búsqueda y SEO
      tags: JSON.stringify([
        'muelles ensacados',
        'viscoelástica',
        'doble cara',
        'parejas',
        'independencia de lechos',
        'silencioso',
        'transpirable',
        'firmeza media-alta',
        'premium',
        'royal zen',
        'alta gama',
        'termosensible'
      ]),
      
      // Highlights (para badges y cards)
      highlights: JSON.stringify([
        '275 muelles/m²',
        'Doble cara visco',
        'Independencia total',
        'Box reforzado',
        'Tejido premium'
      ]),
      
      // Garantía y prueba
      warranty: 10,
      trialNights: 100,
      
      // Materiales (para sección técnica)
      materials: JSON.stringify([
        'Viscoelástica termosensible de alta densidad',
        'Viscosoft de adaptación progresiva',
        'Muelles ensacados de acero templado',
        'Espuma HR perimetral reforzada',
        'Tejido Stretch Royal con tratamiento higiénico'
      ]),
      
      // Capas del colchón (para visualización)
      layers: JSON.stringify([
        {
          name: 'Tejido Stretch Royal',
          description: 'Tacto suave, elegante y duradero con relieve premium',
          height: 1
        },
        {
          name: 'Viscoelástica + Viscosoft',
          description: '3,5 cm de adaptación progresiva y efecto nube',
          height: 3.5
        },
        {
          name: 'Núcleo muelles ensacados',
          description: '275 muelles/m² para independencia y soporte',
          height: 20
        },
        {
          name: 'Box perimetral HR',
          description: 'Refuerzo de estabilidad y durabilidad',
          height: 3
        },
        {
          name: 'Viscoelástica + Viscosoft',
          description: '3,5 cm reversibles para prolongar vida útil',
          height: 3.5
        },
        {
          name: 'Tejido Stretch Royal',
          description: 'Acabado inferior premium',
          height: 1
        }
      ]),
      
      // Badges y estados
      badge: 'Más Vendido',
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
      deliveryDays: 5,
      freeShipping: true,
      shippingCost: 0,
      
      // Propiedades del colchón (para filtros)
      cooling: false,
      hypoallergenic: true,
      washable: false,
      antiDustMite: true,
      reversible: true,
      silent: true,
      motionIsolation: true,
      edgeSupport: true,
      verified: true,
      bestValue: true,
      satisfaction: 97,
      
      // SEO optimizado
      metaTitle: 'Royal Zen - Colchón Muelles Ensacados + Visco | Envío Gratis',
      metaDescription: 'Colchón premium de 275 muelles ensacados con doble cara viscoelástica. Independencia de lechos, firmeza media-alta, silencioso. 100 noches de prueba, 10 años de garantía. Envío gratis 24-72h.',
      metaKeywords: 'colchón muelles ensacados, colchón viscoelástica, colchón parejas, royal zen, independencia de lechos, colchón silencioso',
      
      // Posición y categoría
      position: 1,
      categoryId: category.id,
      
      publishedAt: new Date()
    }
  })

  console.log(`✅ Producto "${product.name}" creado con ID: ${product.id}`)

  // ==========================================
  // VARIANTES (TAMAÑOS)
  // ==========================================
  const sizes = [
    // Individual
    { size: '80x180', width: 80, length: 180, price: 249, popular: false, stock: 15 },
    { size: '80x190', width: 80, length: 190, price: 259, popular: false, stock: 20 },
    { size: '80x200', width: 80, length: 200, price: 269, popular: false, stock: 15 },
    { size: '90x180', width: 90, length: 180, price: 269, popular: false, stock: 15 },
    { size: '90x190', width: 90, length: 190, price: 299, popular: true, stock: 30 },
    { size: '90x200', width: 90, length: 200, price: 309, popular: true, stock: 25 },
    
    // Matrimonio pequeño
    { size: '105x190', width: 105, length: 190, price: 339, popular: false, stock: 20 },
    { size: '105x200', width: 105, length: 200, price: 349, popular: false, stock: 18 },
    
    // Matrimonio estándar (más populares)
    { size: '135x180', width: 135, length: 180, price: 389, popular: true, stock: 25 },
    { size: '135x190', width: 135, length: 190, price: 399, popular: true, stock: 35 },
    { size: '135x200', width: 135, length: 200, price: 409, popular: true, stock: 30 },
    
    // Matrimonio grande (Queen/King)
    { size: '150x190', width: 150, length: 190, price: 449, popular: true, stock: 40 },
    { size: '150x200', width: 150, length: 200, price: 459, popular: true, stock: 45 },
    { size: '160x200', width: 160, length: 200, price: 499, popular: true, stock: 35 },
    
    // King Size
    { size: '180x200', width: 180, length: 200, price: 599, popular: false, stock: 15 },
    { size: '200x200', width: 200, length: 200, price: 699, popular: false, stock: 10 }
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
        originalPrice: Math.round(sizeData.price * 2), // 50% descuento
        stock: sizeData.stock,
        sku: `RZ-ME-DC-30-${sizeData.size.replace('x', '-')}`,
        barcode: `842123456${String(sizeData.width).padStart(3, '0')}${String(sizeData.length).padStart(3, '0')}`,
        weight: Math.round((sizeData.width * sizeData.length * 30) / 10000 * 10) / 10,
        isAvailable: true,
        isPopular: sizeData.popular
      }
    })
  }

  console.log(`✅ ${sizes.length} variantes creadas`)

  // ==========================================
  // REVIEWS REALISTAS (Social Proof)
  // ==========================================
  const reviews = [
    {
      rating: 5,
      title: 'El mejor colchón que he probado en mi vida',
      comment: 'Llevamos 3 meses con el Royal Zen y es una pasada. La firmeza es perfecta (ni duro ni blando), y lo mejor: mi pareja se mueve muchísimo por la noche y yo no noto NADA. Antes me despertaba 3-4 veces, ahora duermo del tirón. El acabado es muy elegante, parece de 1000€. Súper recomendado.',
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
      pros: JSON.stringify(['Firmeza ideal', 'Independencia total', 'Acabado premium', 'Sin ruidos']),
      cons: JSON.stringify([]),
      helpfulCount: 47
    },
    {
      rating: 5,
      title: 'Adiós al dolor de espalda',
      comment: 'Sufro de hernia discal y este colchón ha sido un antes y un después. Por las mañanas me levanto sin dolor lumbar. La combinación de muelles + visco da un soporte firme pero cómodo. Además, no da calor como otros de visco que he probado. Si tienes problemas de espalda, este es tu colchón.',
      userName: 'Roberto Sánchez',
      userLocation: 'Barcelona',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 120,
      productSize: '135x190',
      pros: JSON.stringify(['Soporte lumbar excelente', 'No da calor', 'Levantarse sin dolor']),
      cons: JSON.stringify([]),
      helpfulCount: 63
    },
    {
      rating: 5,
      title: 'Calidad premium a precio increíble',
      comment: 'No me lo esperaba. Por menos de 400€ tienes un colchón de gama alta de verdad. Los materiales se ven y se sienten de calidad, el tejido es súper suave, y los muelles funcionan de maravilla. Entrega en 3 días. Estoy flipando con la relación calidad-precio.',
      userName: 'Laura Martínez',
      userLocation: 'Valencia',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 60,
      productSize: '150x200',
      pros: JSON.stringify(['Precio imbatible', 'Calidad visible', 'Entrega rapidísima']),
      cons: JSON.stringify([]),
      helpfulCount: 52
    },
    {
      rating: 4,
      title: 'Muy bueno, necesita periodo de adaptación',
      comment: 'Los primeros días me pareció un poco firme (venía de uno muy blando), pero después de una semana me acostumbré y ahora duermo genial. Es verdad que los muelles no se mueven nada, eso es brutal. El único "pero" es que al principio olía un poco, pero se fue en 2 días con la ventana abierta.',
      userName: 'Carlos Ruiz',
      userLocation: 'Sevilla',
      comfortRating: 4,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 30,
      productSize: '135x190',
      pros: JSON.stringify(['Independencia de lechos', 'Buena firmeza', 'Silencioso']),
      cons: JSON.stringify(['Olor inicial (normal)', 'Necesita adaptación']),
      helpfulCount: 28
    },
    {
      rating: 5,
      title: 'Ideal para parejas con ritmos diferentes',
      comment: 'Mi marido se acuesta a las 23h y yo a la 1h. Antes lo despertaba al meterme en la cama, ahora no se entera de nada. Los muelles ensacados son la solución definitiva. Además es muy cómodo y fresco. Llevamos 2 meses y estamos encantados.',
      userName: 'Ana Fernández',
      userLocation: 'Bilbao',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 60,
      productSize: '150x190',
      pros: JSON.stringify(['Cero molestias', 'Fresco', 'Comodísimo']),
      cons: JSON.stringify([]),
      helpfulCount: 41
    },
    {
      rating: 5,
      title: 'Compra perfecta',
      comment: 'Dudaba entre este y uno más caro, pero por las opiniones me decidí por el Royal Zen y ha sido un acierto total. Calidad de sobra, comodidad top, y el servicio de atención al cliente fue excelente (les llamé para consultar tallas). 100% recomendado.',
      userName: 'Javier López',
      userLocation: 'Zaragoza',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 45,
      productSize: '160x200',
      pros: JSON.stringify(['Todo perfecto', 'Atención al cliente top', 'Calidad-precio']),
      cons: JSON.stringify([]),
      helpfulCount: 35
    },
    {
      rating: 5,
      title: 'Silencioso de verdad',
      comment: 'Lo que más me ha sorprendido es que NO hace ningún ruido. Tenía uno de muelles tradicionales que crujía cada vez que te movías. Este es totalmente silencioso. Y la independencia de lechos funciona de maravilla. Mi mujer está embarazada y se mueve mucho, pero yo sigo durmiendo genial.',
      userName: 'David Moreno',
      userLocation: 'Málaga',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 4,
      verified: true,
      purchaseVerified: true,
      usageDays: 75,
      productSize: '150x200',
      pros: JSON.stringify(['Silencio absoluto', 'Cero crujidos', 'Independencia brutal']),
      cons: JSON.stringify([]),
      helpfulCount: 38
    },
    {
      rating: 4,
      title: 'Muy buena compra, pequeño detalle',
      comment: 'El colchón es excelente: cómodo, firme, fresco. El único detalle es que el box perimetral es bastante alto y al principio se notaba mucho al sentarse en el borde, pero te acostumbras. Por lo demás, perfecto. Buena inversión.',
      userName: 'Elena Torres',
      userLocation: 'Murcia',
      comfortRating: 5,
      qualityRating: 4,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 50,
      productSize: '135x200',
      pros: JSON.stringify(['Comodidad', 'Frescura', 'Firmeza ideal']),
      cons: JSON.stringify(['Box perimetral muy firme (pero es bueno)']),
      helpfulCount: 22
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
        userAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(reviewData.userName)}&background=random&size=128`
      }
    })
  }

  console.log(`✅ ${reviews.length} reviews creadas`)

  // Actualizar rating promedio
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  await prisma.product.update({
    where: { id: product.id },
    data: {
      reviewCount: reviews.length,
      rating: Math.round(avgRating * 10) / 10
    }
  })

  console.log('✅ Rating promedio actualizado')
  console.log('🎉 ¡Seed completado exitosamente!')
  console.log(`
📦 Producto creado:
   - ID: ${product.id}
   - Nombre: ${product.name}
   - Slug: ${product.slug}
   - Precio: ${product.price}€
   - Rating: ${avgRating}⭐
   - Reviews: ${reviews.length}
   - Variantes: ${sizes.length}
   
🖼️  Imágenes esperadas en:
   ${productImages.map(img => `   - ${img}`).join('\n')}
  `)
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