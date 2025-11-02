// prisma/seeds/seed-bioharmony.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

async function seedBioHarmony() {
  console.log('🌱 Seeding BioHarmony product...')

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

  // Crear el producto BioHarmony
  const product = await prisma.product.create({
    data: {
      // Identificación
      name: 'Colchón BioHarmony',
      slug: 'colchon-bioharmony-muelles-ensacados-visco-aloe-vera',
      subtitle: 'Muelles Ensacados & Visco Aloe Vera',
      
      // Descripción
      description: 'El BioHarmony está diseñado para quienes buscan un descanso profundo, silencioso y envolvente. Su núcleo de muelles ensacados independientes y su doble capa de Viscoelástica con Aloe Vera crean una sensación de ingravidez que relaja cuerpo y mente.',
      
      story: `Alcanza la verdadera serenidad con el Colchón BioHarmony, una joya del descanso que combina la adaptabilidad viscoelástica con la independencia de lechos de los muelles ensacados.

Su exclusiva plancha de Visco Aloe Vera de 5 cm envuelve tu cuerpo en un confort delicado y natural, ayudando a aliviar la presión en hombros, espalda y caderas, mientras la frescura del Aloe Vera cuida tu piel y favorece un descanso más saludable.

Gracias a su acolchado superior en Visco + Viscosoft, la tumbada es suave, ergonómica y envolvente, logrando un efecto nube que invita al descanso más placentero.

El núcleo de muelles ensacados con refuerzo perimetral garantiza estabilidad, durabilidad y una independencia de lechos perfecta: ni los movimientos ni el ruido interrumpen tu paz nocturna.

El BioHarmony es el equilibrio perfecto entre soporte firme, suavidad y transpirabilidad. Cada capa ha sido diseñada para ofrecerte un descanso que calma el cuerpo y el alma.

✨ **BioHarmony: equilibrio natural para tu descanso.** 🌿`,
      
      // Precios (base para 90x190)
      price: 339.99,
      originalPrice: 679.99,
      compareAtPrice: 799.99,
      discount: 50,
      
      // Características técnicas
      firmness: Firmness.MEDIA_ALTA,
      firmnessValue: 80,
      transpirability: 50,
      adaptability: 100,
      height: 30,
      weight: 27.0,
      maxWeightPerPerson: 110,
      
      // Imágenes (actualiza con tus URLs reales)
      image: '/images/products/bioharmony/main.jpg',
      images: JSON.stringify([
        '/images/products/bioharmony/main.jpg',
        '/images/products/bioharmony/aloe-vera-detail.jpg',
        '/images/products/bioharmony/layers.jpg',
        '/images/products/bioharmony/springs-detail.jpg',
        '/images/products/bioharmony/diamond-side.jpg',
      ]),
      videoUrl: 'https://www.youtube.com/watch?v=example',
      gradient: 'from-green-400 via-emerald-500 to-teal-500',
      
      // Ratings y stats
      rating: 4.9,
      reviewCount: 0, // Se actualizará después
      salesCount: 267,
      viewsCount: 2589,
      
      // Features principales
      features: JSON.stringify([
        '🌿 Visco Aloe Vera 5 cm: confort supremo, frescor y suavidad natural',
        '💤 Doble capa viscoelástica: adaptabilidad progresiva y alivio de presión',
        '🤍 Muelles ensacados independientes: independencia de lechos y máxima estabilidad',
        '💪 Firmeza media–alta (80%): soporte firme con acogida envolvente',
        '🌬️ Transpirabilidad media (50%): aireación constante para un descanso higiénico',
        '✨ Tejido Stretch Premium: suave, elástico y de alta gama',
        '🔇 Silencio absoluto: sin ruidos ni rebotes',
        '🚚 Envío gratuito a toda España peninsular (3–6 días hábiles)'
      ]),
      
      // Características técnicas detalladas
      techFeatures: JSON.stringify([
        'Núcleo de muelles ensacados (275 muelles/m²)',
        'Plancha exclusiva de Visco Aloe Vera 5 cm',
        'Acolchado superior Visco + Viscosoft 3,5 cm',
        'Refuerzo perimetral Box HR alta densidad',
        'Tejido Stretch Premium con acolchado tapa a tapa',
        'Lateral Diamond extrafuerte con asas',
        'Barrera higiénica: Fieltro + tejido 3D transpirable',
        'Sistema de independencia de lechos avanzado',
        'Altura total: ±30 cm',
        'Peso máximo recomendado: 110 kg/persona'
      ]),
      
      // Certificaciones
      certifications: JSON.stringify([
        'OEKO-TEX Standard 100',
        'CertiPUR-ES',
        'ISO 9001:2015',
        'Aloe Vera certificado',
        'Tejido hipoalergénico',
        'Fabricado en España'
      ]),
      
      // Tags para búsqueda
      tags: JSON.stringify([
        'colchón bioharmony',
        'colchón con aloe vera',
        'colchón viscoelástico muelles ensacados',
        'colchón firme y adaptable',
        'colchón viscoelástico premium',
        'colchón independencia de lechos',
        'colchón alta gama España',
        'bioharmony',
        'aloe vera',
        'muelles ensacados',
        'natural',
        'eco friendly',
        'premium'
      ]),
      
      // Highlights
      highlights: JSON.stringify([
        'Visco Aloe Vera 5 cm exclusiva',
        'Doble capa viscoelástica',
        '275 muelles ensacados/m²',
        'Tejido Stretch Premium',
        'Lateral Diamond con asas'
      ]),
      
      // Garantía y prueba
      warranty: 10,
      trialNights: 100,
      
      // Materiales
      materials: JSON.stringify([
        'Viscoelástica con Aloe Vera natural',
        'Viscoelástica termosensible',
        'Viscosoft de alta densidad',
        'Muelles ensacados de acero templado',
        'Espuma HR perimetral reforzada',
        'Tejido Stretch Premium',
        'Tejido 3D transpirable',
        'Fieltro higiénico',
        'Tejido Diamond lateral'
      ]),
      
      // Capas del colchón
      layers: JSON.stringify([
        {
          name: 'Tejido Stretch Premium',
          description: 'Tacto suave y elástico de alta gama'
        },
        {
          name: 'Acolchado Visco + Viscosoft 3,5 cm',
          description: 'Primera capa de adaptabilidad envolvente'
        },
        {
          name: 'Plancha Visco Aloe Vera 5 cm',
          description: 'Confort supremo con propiedades naturales del Aloe'
        },
        {
          name: 'Barrera Fieltro + Tejido 3D',
          description: 'Protección higiénica y transpirabilidad'
        },
        {
          name: 'Núcleo Muelles Ensacados',
          description: '275 muelles/m² - Independencia y soporte'
        },
        {
          name: 'Box Perimetral HR',
          description: 'Refuerzo de durabilidad y estabilidad'
        },
        {
          name: 'Base Tejido Premium',
          description: 'Acabado inferior de calidad'
        }
      ]),
      
      // Badges y estados
      badge: 'BIO',
      isNew: false,
      isBestSeller: false,
      isFeatured: true,
      isActive: true,
      isEco: true,
      
      // Stock
      stock: 120,
      inStock: true,
      lowStockThreshold: 20,
      sku: 'BH-ME-AV-30',
      barcode: '8421234567893',
      
      // Envío
      deliveryDays: 5,
      freeShipping: true,
      shippingCost: 0,
      
      // Propiedades del colchón
      cooling: true, // Aloe Vera refrescante
      hypoallergenic: true,
      washable: false,
      antiDustMite: true,
      reversible: false, // Una sola cara
      silent: true,
      motionIsolation: true,
      edgeSupport: true,
      verified: true,
      bestValue: false,
      satisfaction: 97,
      
      // SEO
      metaTitle: 'Colchón BioHarmony - Muelles Ensacados & Visco Aloe Vera | 30cm Premium',
      metaDescription: 'Colchón BioHarmony con Visco Aloe Vera 5cm, muelles ensacados y doble capa viscoelástica. Confort natural, independencia de lechos. Envío gratis 3-6 días.',
      metaKeywords: 'colchón bioharmony, colchón con aloe vera, colchón viscoelástico muelles ensacados, colchón firme y adaptable, colchón viscoelástico premium, colchón independencia de lechos, colchón alta gama España',
      
      // Posición y categoría
      position: 3,
      categoryId: category.id,
      
      publishedAt: new Date()
    }
  })

  console.log(`✅ Producto "${product.name}" creado con ID: ${product.id}`)

  // Crear variantes (tamaños) - Incluye King size
  const sizes = [
    // Individual
    { size: '80x180', width: 80, length: 180, price: 289.99, popular: false },
    { size: '80x190', width: 80, length: 190, price: 299.99, popular: false },
    { size: '80x200', width: 80, length: 200, price: 309.99, popular: false },
    { size: '90x180', width: 90, length: 180, price: 309.99, popular: false },
    { size: '90x190', width: 90, length: 190, price: 339.99, popular: true },
    { size: '90x200', width: 90, length: 200, price: 349.99, popular: true },
    
    // Matrimonio pequeño
    { size: '105x180', width: 105, length: 180, price: 369.99, popular: false },
    { size: '105x190', width: 105, length: 190, price: 379.99, popular: false },
    { size: '105x200', width: 105, length: 200, price: 389.99, popular: false },
    
    // Matrimonio estándar
    { size: '135x180', width: 135, length: 180, price: 429.99, popular: true },
    { size: '135x190', width: 135, length: 190, price: 439.99, popular: true },
    { size: '135x200', width: 135, length: 200, price: 449.99, popular: true },
    
    // Matrimonio grande
    { size: '150x180', width: 150, length: 180, price: 479.99, popular: true },
    { size: '150x190', width: 150, length: 190, price: 489.99, popular: true },
    { size: '150x200', width: 150, length: 200, price: 499.99, popular: true },
    { size: '160x180', width: 160, length: 180, price: 509.99, popular: true },
    { size: '160x190', width: 160, length: 190, price: 519.99, popular: true },
    { size: '160x200', width: 160, length: 200, price: 539.99, popular: true },
    
    // King size
    { size: '180x180', width: 180, length: 180, price: 579.99, popular: false },
    { size: '180x190', width: 180, length: 190, price: 599.99, popular: true },
    { size: '180x200', width: 180, length: 200, price: 619.99, popular: true },
    { size: '200x180', width: 200, length: 180, price: 629.99, popular: false },
    { size: '200x190', width: 200, length: 190, price: 649.99, popular: true },
    { size: '200x200', width: 200, length: 200, price: 679.99, popular: true },
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
        stock: 18,
        sku: `BH-ME-AV-30-${sizeData.size.replace('x', '-')}`,
        barcode: `8421234570${String(sizeData.width).padStart(3, '0')}${String(sizeData.length).padStart(3, '0')}`,
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
      title: 'El Aloe Vera hace la diferencia',
      comment: 'Nunca pensé que el Aloe Vera en un colchón pudiera notarse tanto, pero es real. La sensación es muy fresca y el confort es increíble. Duermo profundamente y me levanto sin dolores. La mejor compra que he hecho.',
      userName: 'Elena Prieto',
      userLocation: 'Madrid',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 85,
      productSize: '150x190',
      pros: JSON.stringify(['Aloe Vera perceptible', 'Muy cómodo', 'Calidad excepcional', 'Sin dolores']),
      cons: JSON.stringify([]),
      helpfulCount: 37
    },
    {
      rating: 5,
      title: 'Descanso natural y reparador',
      comment: 'Buscaba un colchón premium pero con materiales naturales y el BioHarmony es perfecto. El Aloe Vera aporta una suavidad especial. Los muelles ensacados funcionan genial, mi pareja se mueve mucho y no noto nada.',
      userName: 'Marcos Delgado',
      userLocation: 'Barcelona',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 4,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 70,
      productSize: '160x200',
      pros: JSON.stringify(['Materiales naturales', 'Independencia total', 'Muy confortable']),
      cons: JSON.stringify([]),
      helpfulCount: 32
    },
    {
      rating: 5,
      title: 'Calidad superior en cada detalle',
      comment: 'Es un colchón de verdadera alta gama. Se nota en el grosor de las capas, en la calidad del tejido, en los acabados. La capa de 5 cm de Aloe Vera es espectacular. Vale cada euro.',
      userName: 'Cristina Vázquez',
      userLocation: 'Valencia',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 60,
      productSize: '150x200',
      pros: JSON.stringify(['Calidad premium', 'Acabados perfectos', 'Capa Aloe generosa']),
      cons: JSON.stringify([]),
      helpfulCount: 28
    },
    {
      rating: 4,
      title: 'Excelente pero tiene un precio',
      comment: 'El colchón es fabuloso, muy cómodo y de altísima calidad. El único pero es el precio, que es elevado, aunque reconozco que la calidad lo justifica. Si buscas lo mejor y puedes permitírtelo, adelante.',
      userName: 'Antonio Serrano',
      userLocation: 'Sevilla',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 3,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 45,
      productSize: '135x190',
      pros: JSON.stringify(['Altísima calidad', 'Muy cómodo', 'Materiales premium']),
      cons: JSON.stringify(['Precio elevado']),
      helpfulCount: 24
    },
    {
      rating: 5,
      title: 'Adiós a las alergias',
      comment: 'Tengo piel sensible y alergias. Desde que uso el BioHarmony he notado mejoría. El Aloe Vera es hipoalergénico y la transpirabilidad es muy buena. Duermo mejor y sin picores. Totalmente recomendado.',
      userName: 'Sara Molina',
      userLocation: 'Bilbao',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 90,
      productSize: '135x190',
      pros: JSON.stringify(['Hipoalergénico', 'Aloe Vera suave', 'Sin alergias', 'Transpirable']),
      cons: JSON.stringify([]),
      helpfulCount: 35
    },
    {
      rating: 5,
      title: 'Lujo y confort natural',
      comment: 'Es como dormir en una nube con aroma a spa. El colchón es elegante, cómodo y los materiales naturales se notan. La firmeza es perfecta para mí. Muy satisfecha con la compra.',
      userName: 'Beatriz Romero',
      userLocation: 'Málaga',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 4,
      verified: true,
      purchaseVerified: true,
      usageDays: 55,
      productSize: '150x190',
      pros: JSON.stringify(['Elegante', 'Materiales naturales', 'Firmeza ideal', 'Muy cómodo']),
      cons: JSON.stringify([]),
      helpfulCount: 26
    },
    {
      rating: 5,
      title: 'Inversión en salud y descanso',
      comment: 'Sufro de dolor de espalda crónico y este colchón ha sido una bendición. La combinación de firmeza y adaptabilidad es perfecta. Me levanto con menos dolor. Lo recomiendo al 100%.',
      userName: 'David Navarro',
      userLocation: 'Zaragoza',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 75,
      productSize: '160x200',
      pros: JSON.stringify(['Alivia dolor de espalda', 'Firmeza perfecta', 'Adaptable', 'Alta calidad']),
      cons: JSON.stringify([]),
      helpfulCount: 31
    },
    {
      rating: 4,
      title: 'Muy bueno pero necesita tiempo',
      comment: 'Colchón de excelente calidad. Al principio me costó adaptarme porque venía de uno muy blando, pero tras dos semanas ya estoy encantado. El Aloe Vera es muy agradable. Recomendable.',
      userName: 'Javier Ruiz',
      userLocation: 'Granada',
      comfortRating: 4,
      qualityRating: 5,
      valueRating: 4,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 40,
      productSize: '135x200',
      pros: JSON.stringify(['Alta calidad', 'Aloe Vera agradable', 'Bien construido']),
      cons: JSON.stringify(['Periodo de adaptación necesario']),
      helpfulCount: 19
    },
    {
      rating: 5,
      title: 'El mejor colchón que he tenido',
      comment: 'He probado muchos colchones y este es, sin duda, el mejor. La sensación del Aloe Vera es única, los muelles ensacados son silenciosos y la calidad es impresionante. Vale cada euro invertido.',
      userName: 'Laura Jiménez',
      userLocation: 'Murcia',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      usageDays: 95,
      productSize: '150x200',
      pros: JSON.stringify(['Mejor que he probado', 'Aloe Vera único', 'Silencioso', 'Calidad top']),
      cons: JSON.stringify([]),
      helpfulCount: 40
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
  console.log('🎉 Seed BioHarmony completado exitosamente!')
}

// Ejecutar seed
seedBioHarmony()
  .catch((e) => {
    console.error('❌ Error en seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })