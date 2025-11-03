// prisma/seed.ts
import { PrismaClient, Firmness } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Crear o actualizar categoría
  const category = await prisma.category.upsert({
    where: { slug: 'colchones-muelles-ensacados' },
    update: {},
    create: {
      name: 'Colchones de Muelles Ensacados',
      slug: 'colchones-muelles-ensacados',
      description: 'Colchones con tecnología de muelles ensacados para máxima independencia de lechos',
      gradient: 'from-blue-500 to-indigo-600',
      icon: '🛏️',
      isActive: true,
      isFeatured: true,
      order: 1,
    },
  });

  // Crear producto Zafiro Supreme
  const product = await prisma.product.upsert({
    where: { slug: 'colchon-zafiro-supreme' },
    update: {},
    create: {
      name: 'Colchón Zafiro Supreme',
      slug: 'colchon-zafiro-supreme',
      subtitle: 'Muelles Ensacados y Doble Cara Viscoelástica',
      description: 'Descubre el lujo del descanso con el Zafiro Supreme, un colchón de doble cara con viscoelástica de última generación y núcleo de muelles ensacados. Diseñado para envolverte en una sensación de nube y ofrecerte un soporte firme, silencioso y adaptable.',
      story: `El Colchón Zafiro Supreme es una joya del descanso creada para quienes buscan comodidad, elegancia y tecnología en un solo colchón.

Su doble cara viscoelástica te permite disfrutar del efecto nube en ambas superficies, prolongando su vida útil y manteniendo siempre una sensación de acogida y ligereza. El núcleo de muelles ensacados de alta densidad (275 muelles/m²) garantiza una independencia total de lechos, perfecta para dormir en pareja sin notar movimientos. La estructura se completa con un box perimetral reforzado en espuma HR, que ofrece estabilidad, durabilidad y una firmeza envolvente sin renunciar a la suavidad.

El tejido Stretch Zafiro de tonos grises con relieve aporta un toque de distinción y elegancia, mientras que su acolchado tapa a tapa —una técnica usada en colchones de alta gama— proporciona precisión y relieve decorativo.

Cada noche, el Zafiro Supreme convierte tu descanso en una experiencia de bienestar absoluto: un equilibrio perfecto entre firmeza y adaptabilidad, belleza y tecnología.`,
      
      // Precios
      price: 449.99,
      originalPrice: 699.99,
      compareAtPrice: 699.99,
      discount: 36,
      
      // Especificaciones técnicas
      firmnessValue: 80,
      firmness: Firmness.MEDIA_ALTA,
      transpirability: 50,
      adaptability: 80,
      height: 30,
      maxWeightPerPerson: 110,
      
      // Imágenes (reemplaza con tus URLs reales)
      image: '/images/zafiro-supreme-main.jpg',
      images: JSON.stringify([
        '/images/zafiro-supreme-main.jpg',
        '/images/zafiro-supreme-side.jpg',
        '/images/zafiro-supreme-detail.jpg',
        '/images/zafiro-supreme-layers.jpg',
        '/images/zafiro-supreme-texture.jpg',
      ]),
      videoUrl: '/videos/zafiro-supreme-demo.mp4',
      gradient: 'from-blue-600 to-indigo-700',
      
      // Ratings y estadísticas
      rating: 4.9,
      reviewCount: 127,
      salesCount: 342,
      viewsCount: 1250,
      satisfaction: 98,
      
      // Features principales
      features: JSON.stringify([
        'Efecto nube en ambas caras gracias a la capa de viscoelástica + viscosoft (3,5 cm por lado)',
        'Adaptabilidad inteligente: se moldea al cuerpo y recupera su forma con suavidad',
        'Soporte ergonómico y firmeza media-alta (80%): ideal para cualquier postura de descanso',
        'Material termosensible: responde a la temperatura corporal para máximo confort',
        'Transpirabilidad equilibrada (50%): favorece un descanso fresco y saludable',
        'Silencioso e independiente: sin ruidos ni transmisión de movimiento',
        'Box perimetral reforzado: mayor durabilidad y soporte lateral al sentarse',
        'Diseño elegante con tejido Stretch Zafiro y laterales acolchados ultrasuaves',
      ]),
      
      // Características técnicas
      techFeatures: JSON.stringify([
        { label: 'Altura total', value: '±30 cm' },
        { label: 'Tipo de núcleo', value: 'Muelles ensacados con Box HR' },
        { label: 'Acolchado', value: 'Viscoelástica + Viscosoft 3,5 cm por cara' },
        { label: 'Doble cara', value: 'Sí' },
        { label: 'Firmeza', value: 'Media-Alta (80%)' },
        { label: 'Adaptabilidad', value: 'Media-Alta (80%)' },
        { label: 'Transpirabilidad', value: 'Media (50%)' },
        { label: 'Peso máx. recomendado', value: '110 kg/persona' },
        { label: 'Tejido exterior', value: 'Stretch Zafiro con relieve' },
        { label: 'Refuerzo perimetral', value: 'Espuma HR alta densidad' },
        { label: 'Independencia de lechos', value: 'Sí' },
        { label: 'Asas laterales', value: 'Sí, para fácil manipulación' },
      ]),
      
      // Certificaciones
      certifications: JSON.stringify([
        'Oeko-Tex Standard 100',
        'CertiPUR',
        'ISO 9001',
        'Fabricación Europea',
      ]),
      
      // Tags
      tags: JSON.stringify([
        'muelles-ensacados',
        'viscoelastica',
        'doble-cara',
        'firmeza-alta',
        'parejas',
        'premium',
        'silencioso',
        'transpirable',
      ]),
      
      // Highlights
      highlights: JSON.stringify([
        '🩵 Doble cara viscoelástica',
        '🔇 100% Silencioso',
        '💑 Independencia de lechos',
        '🌡️ Termosensible',
      ]),
      
      // Materiales y capas
      materials: JSON.stringify([
        'Viscoelástica Premium',
        'Viscosoft Confort',
        'Muelles Ensacados (275/m²)',
        'Espuma HR Box Perimetral',
        'Tejido Stretch Zafiro',
      ]),
      
      layers: JSON.stringify([
        { name: 'Tejido Stretch Zafiro', thickness: 0.5, description: 'Suave, elegante y transpirable' },
        { name: 'Viscoelástica + Viscosoft', thickness: 3.5, description: 'Efecto nube y adaptabilidad' },
        { name: 'Núcleo de Muelles Ensacados', thickness: 20, description: '275 muelles/m² para soporte perfecto' },
        { name: 'Viscoelástica + Viscosoft', thickness: 3.5, description: 'Efecto nube y adaptabilidad' },
        { name: 'Tejido Stretch Zafiro', thickness: 0.5, description: 'Suave, elegante y transpirable' },
        { name: 'Box Perimetral HR', thickness: 2, description: 'Refuerzo lateral y durabilidad' },
      ]),
      
      // Garantía y prueba
      warranty: 10,
      trialNights: 100,
      
      // Badges y flags
      badge: '36% DTO',
      isNew: false,
      isBestSeller: true,
      isFeatured: true,
      isActive: true,
      isEco: false,
      
      // Stock y entrega
      stock: 50,
      inStock: true,
      lowStockThreshold: 10,
      deliveryDays: 5, // 3-6 días, promedio 5
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
      bestValue: true,
      
      // SEO
      metaTitle: 'Colchón Zafiro Supreme - Muelles Ensacados y Doble Cara Viscoelástica | 36% DTO',
      metaDescription: 'Colchón premium con núcleo de muelles ensacados y doble cara viscoelástica. Firmeza media-alta, efecto nube, silencioso e independencia de lechos. Envío gratis.',
      metaKeywords: 'colchón muelles ensacados, colchón viscoelástico, doble cara, firmeza alta, colchón parejas, independencia lechos',
      
      // Relaciones
      categoryId: category.id,
      position: 1,
    },
  });

  console.log('✅ Producto creado:', product.name);

  // Crear variantes (todas las medidas disponibles)
  const sizes = [
    // 80 cm
    { size: '80x180', width: 80, length: 180, price: 349.99, originalPrice: 549.99 },
    { size: '80x190', width: 80, length: 190, price: 359.99, originalPrice: 559.99 },
    { size: '80x200', width: 80, length: 200, price: 369.99, originalPrice: 569.99 },
    // 90 cm
    { size: '90x180', width: 90, length: 180, price: 369.99, originalPrice: 569.99, isPopular: true },
    { size: '90x190', width: 90, length: 190, price: 379.99, originalPrice: 579.99, isPopular: true },
    { size: '90x200', width: 90, length: 200, price: 389.99, originalPrice: 589.99, isPopular: true },
    // 100 cm
    { size: '100x180', width: 100, length: 180, price: 389.99, originalPrice: 589.99 },
    { size: '100x190', width: 100, length: 190, price: 399.99, originalPrice: 599.99 },
    { size: '100x200', width: 100, length: 200, price: 409.99, originalPrice: 609.99 },
    // 105 cm
    { size: '105x180', width: 105, length: 180, price: 399.99, originalPrice: 609.99 },
    { size: '105x190', width: 105, length: 190, price: 409.99, originalPrice: 619.99 },
    { size: '105x200', width: 105, length: 200, price: 419.99, originalPrice: 629.99 },
    // 120 cm
    { size: '120x180', width: 120, length: 180, price: 419.99, originalPrice: 629.99 },
    { size: '120x190', width: 120, length: 190, price: 429.99, originalPrice: 639.99 },
    { size: '120x200', width: 120, length: 200, price: 439.99, originalPrice: 649.99 },
    // 135 cm
    { size: '135x180', width: 135, length: 180, price: 439.99, originalPrice: 659.99, isPopular: true },
    { size: '135x190', width: 135, length: 190, price: 449.99, originalPrice: 669.99, isPopular: true },
    { size: '135x200', width: 135, length: 200, price: 459.99, originalPrice: 679.99, isPopular: true },
    // 140 cm
    { size: '140x180', width: 140, length: 180, price: 449.99, originalPrice: 669.99 },
    { size: '140x190', width: 140, length: 190, price: 459.99, originalPrice: 679.99 },
    { size: '140x200', width: 140, length: 200, price: 469.99, originalPrice: 689.99 },
    // 150 cm
    { size: '150x180', width: 150, length: 180, price: 469.99, originalPrice: 689.99, isPopular: true },
    { size: '150x190', width: 150, length: 190, price: 479.99, originalPrice: 699.99, isPopular: true },
    { size: '150x200', width: 150, length: 200, price: 489.99, originalPrice: 709.99, isPopular: true },
    // 160 cm
    { size: '160x180', width: 160, length: 180, price: 489.99, originalPrice: 709.99 },
    { size: '160x190', width: 160, length: 190, price: 499.99, originalPrice: 719.99, isPopular: true },
    { size: '160x200', width: 160, length: 200, price: 509.99, originalPrice: 729.99, isPopular: true },
  ];

  for (const sizeData of sizes) {
    await prisma.productVariant.create({
      data: {
        productId: product.id,
        size: sizeData.size,
        width: sizeData.width,
        length: sizeData.length,
        dimensions: `${sizeData.width}x${sizeData.length} cm`,
        price: sizeData.price,
        originalPrice: sizeData.originalPrice,
        stock: 20,
        sku: `ZAF-SUP-${sizeData.size.replace('x', '-')}`,
        weight: (sizeData.width * sizeData.length * 30) / 10000, // Estimación de peso
        isAvailable: true,
        isPopular: sizeData.isPopular || false,
      },
    });
  }

  console.log(`✅ ${sizes.length} variantes creadas`);

  // Crear algunas reseñas de ejemplo
  const reviews = [
    {
      rating: 5,
      title: 'El mejor colchón que he probado',
      comment: 'Después de probar varios colchones, el Zafiro Supreme es sin duda el mejor. La doble cara viscoelástica es increíble, y no se nota ningún movimiento cuando mi pareja se mueve. Totalmente recomendado.',
      userName: 'María González',
      userLocation: 'Madrid',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      wouldRecommend: true,
      usageDays: 45,
      productSize: '150x190',
      pros: JSON.stringify(['Muy cómodo', 'Silencioso', 'Buena firmeza', 'Calidad premium']),
      cons: JSON.stringify(['Ninguno']),
      helpfulCount: 23,
    },
    {
      rating: 5,
      title: 'Excelente relación calidad-precio',
      comment: 'Llegó en perfectas condiciones y antes de lo esperado. La firmeza es perfecta, ni muy duro ni muy blando. El efecto nube es real, dormimos genial.',
      userName: 'Carlos Ruiz',
      userLocation: 'Barcelona',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 5,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      wouldRecommend: true,
      usageDays: 30,
      productSize: '135x190',
      pros: JSON.stringify(['Precio competitivo', 'Envío rápido', 'Muy confortable']),
      cons: JSON.stringify([]),
      helpfulCount: 18,
    },
    {
      rating: 4,
      title: 'Muy buen colchón',
      comment: 'Estoy muy contenta con la compra. Es cómodo, no hace ruido y la independencia de lechos funciona muy bien. Le doy 4 estrellas porque me hubiera gustado que fuera un poco más fresco.',
      userName: 'Ana Martínez',
      userLocation: 'Valencia',
      comfortRating: 5,
      qualityRating: 5,
      valueRating: 4,
      deliveryRating: 5,
      verified: true,
      purchaseVerified: true,
      wouldRecommend: true,
      usageDays: 60,
      productSize: '150x200',
      pros: JSON.stringify(['Cómodo', 'Silencioso', 'Buena calidad']),
      cons: JSON.stringify(['Podría ser más transpirable']),
      helpfulCount: 12,
    },
  ];

  for (const reviewData of reviews) {
    await prisma.review.create({
      data: {
        ...reviewData,
        productId: product.id,
      },
    });
  }

  console.log(`✅ ${reviews.length} reseñas creadas`);

  console.log('🎉 Seed completado con éxito!');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });