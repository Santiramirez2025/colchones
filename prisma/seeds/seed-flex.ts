// prisma/seed-flex.ts
import { PrismaClient, Firmness } from '@prisma/client'

const prisma = new PrismaClient()

// ============================================================================
// DATOS DE PRODUCTOS - COLCHONES FLEX 2025
// ============================================================================

const products = [
  // ========== COLCHÓN NUBE VISCO ==========
  {
    name: 'Colchón Nube Visco',
    slug: 'colchon-nube-visco',
    subtitle: 'El colchón más premiado y vendido de Flex',
    description: 'El colchón de muelles Nube pertenece a nuestra colección Ultimate. Consigue un descanso avanzado a partir de la combinación de tecnología e innovación. Ideal para personas que buscan conseguir un gran confort, adaptabilidad y la mayor calidad. Su núcleo de muelles ensacados Pocket Premium® proporciona independencia de lechos y firmeza progresiva. La capa viscoelástica con gel se adapta perfectamente al cuerpo, cediendo solo donde se ejerce presión. Su tejido Stretch de alto gramaje permite una total transpiración gracias a su estructura de célula abierta que favorece la libre circulación de aire.',
    story: 'El colchón más solicitado por nuestros consumidores. Premiado por la OCU como el mejor colchón del año durante más de 3 temporadas consecutivas. Su popularidad es una prueba de que su nivel de calidad y grado de comodidad son excepcionales.',
    price: 385,
    originalPrice: 770,
    compareAtPrice: 770,
    discount: 50,
    firmnessValue: 60,
    firmness: Firmness.MEDIA,
    transpirability: 90,
    adaptability: 90,
    height: 30,
    weight: 35,
    maxWeightPerPerson: 110,
    image: '/images/colchones/flex-nube-visco.jpg',
    images: JSON.stringify([
      '/images/colchones/flex-nube-visco.jpg',
      '/images/colchones/flex-nube-visco-2.jpg',
      '/images/colchones/flex-nube-visco-detalle.jpg',
      '/images/colchones/flex-nube-visco-capas.jpg'
    ]),
    gradient: 'from-blue-600 via-indigo-600 to-purple-700',
    rating: 4.8,
    reviewCount: 847,
    salesCount: 3452,
    viewsCount: 12340,
    features: JSON.stringify([
      'Muelles ensacados Pocket Premium®',
      'Viscoelástica con gel',
      'Independencia de lechos',
      'Firmeza progresiva',
      'Tejido Stretch transpirable',
      'Sistema Commodo+ antihumedad'
    ]),
    techFeatures: JSON.stringify([
      'Núcleo Pocket Premium® (15 cm)',
      'Técnica Tack & Jump',
      'Viscoelástica con partículas de gel',
      'Altura de 30 cm (+/- 1)',
      'Firmeza media progresiva',
      'Comportamiento Optigrade®'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Premiado OCU mejor colchón',
      'Sistema Total Protect antibacteriano',
      'Certificado Sanitized®'
    ]),
    tags: JSON.stringify(['bestseller', 'premiado-ocu', 'muelles-ensacados', 'viscoelastica', 'media', 'gel']),
    highlights: JSON.stringify([
      'Premiado OCU',
      'Más vendido',
      'Excelente relación calidad-precio'
    ]),
    warranty: 3,
    trialNights: 100,
    materials: JSON.stringify(['Muelles Pocket Premium®', 'Viscoelástica con gel', 'Fibras hipoalergénicas', 'HR alta densidad', 'TNT']),
    layers: JSON.stringify([
      'Tejido Stretch Optigrade®',
      'Acolchado Tack & Jump',
      'Fibras hipoalergénicas',
      'Viscoelástica con gel',
      'Sistema Commodo+',
      'TNT protector',
      'Confort System+',
      'Núcleo Pocket Premium® (15 cm)',
      'Encapsulado HR alta densidad',
      'Base TNT',
      'Tejido 3D transpirable'
    ]),
    badge: 'PREMIADO OCU',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 125,
    inStock: true,
    sku: 'FLEX-NUBE-VISCO-001',
    deliveryDays: 3,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: true,
    satisfaction: 96,
    position: 1
  },

  // ========== COLCHÓN ZZ3 FIRM POCKET ==========
  {
    name: 'Colchón zZ3 Firm Pocket',
    slug: 'colchon-zz3-firm-pocket',
    subtitle: 'Firmeza y alto confort con independencia de lechos',
    description: 'El colchón zZ3 Firm Pocket Premium®Top gracias a su núcleo de muelles ensacados te ofrecerá un soporte firme y progresivo con independencia de lechos. Sus muelles Pocket Premium® Top proporcionan un soporte firme y personalizado para cada zona del cuerpo, con adaptabilidad progresiva e independencia de movimientos, ideal para quienes buscan un colchón que combine excelente soporte y adaptabilidad. Con 32 cm de altura y sus diferentes capas de confort, te aportarán un descanso avanzado. Su primera capa de fibras hipoalergénicas ayuda a evitar las reacciones alérgicas, gracias también al Total Protect.',
    story: 'La colección Flex® zZ3 es la innovación aplicada al descanso. Diseñados para quienes buscan un descanso innovador, con la posibilidad de customizar tu colchón con distintos acabados que ofrece esta colección.',
    price: 447,
    originalPrice: 994,
    compareAtPrice: 994,
    discount: 55,
    firmnessValue: 75,
    firmness: Firmness.MEDIA_ALTA,
    transpirability: 88,
    adaptability: 90,
    height: 32,
    weight: 38,
    maxWeightPerPerson: 120,
    image: '/images/colchones/flex-zz3-firm.jpg',
    images: JSON.stringify([
      '/images/colchones/flex-zz3-firm.jpg',
      '/images/colchones/flex-zz3-firm-2.jpg',
      '/images/colchones/flex-zz3-firm-detalle.jpg'
    ]),
    gradient: 'from-slate-700 via-gray-800 to-zinc-900',
    rating: 4.7,
    reviewCount: 156,
    salesCount: 645,
    viewsCount: 4560,
    features: JSON.stringify([
      'Muelles Pocket Premium® Top',
      'Soporte firme personalizado',
      'Independencia de movimientos',
      'Viscoelástica con gel',
      'Tejido Stretch premium',
      'Sistema Total Protect'
    ]),
    techFeatures: JSON.stringify([
      'Núcleo Pocket Premium® Top',
      'Comportamiento Optigrade®',
      'Altura de 32 cm (+/- 1)',
      'Firmeza 75% (Media-Alta)',
      'Acolchado Tack & Jump',
      'Encapsulado HR'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Total Protect antibacteriano',
      'Tejido Anti-Stain'
    ]),
    tags: JSON.stringify(['zz-collection', 'firme', 'muelles-ensacados', 'innovacion', 'customizable']),
    highlights: JSON.stringify([
      'Colección zZ innovadora',
      'Firmeza personalizada',
      'Alto confort'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Muelles Pocket Premium® Top', 'Viscoelástica con gel', 'Fibras hipoalergénicas', 'HR alta densidad']),
    layers: JSON.stringify([
      'Tejido Stretch Premium alto gramaje',
      'Fibras hipoalergénicas',
      'Viscoelástica con gel',
      'Acolchado Tack & Jump',
      'TNT protector',
      'Confort System',
      'Núcleo Pocket Premium® Top',
      'Encapsulado HR',
      'Doble burlete perimetral',
      'Platabanda acolchada'
    ]),
    badge: 'INNOVACIÓN',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 78,
    inStock: true,
    sku: 'FLEX-ZZ3-FIRM-001',
    deliveryDays: 5,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: false,
    satisfaction: 93,
    position: 2
  },

  // ========== COLCHÓN ETERNITY ==========
  {
    name: 'Colchón Eternity',
    slug: 'colchon-eternity',
    subtitle: 'La mayor obra de arte de la colección',
    description: 'El Colchón Eternity es una auténtica obra maestra dentro de la colección Exclusive. Su diseño está pensado para brindar un descanso de calidad y completamente único. Con un estilo que combina elementos clásicos y elegantes, tanto en su tapicería como en su interior, este colchón logra un equilibrio perfecto entre belleza y lujo para el descanso. Gracias a los muelles ensacados Pocket Premium® Pro (18 cm), ofrece una firmeza media-alta que se adapta a la perfección a la presión recibida. Incorpora materiales naturales como látex Talalay, seda, coco y crin de caballo, además de las tecnologías más exclusivas.',
    story: 'Diseñado para ofrecer el concepto más elevado de confort inspirado en el buen gusto. El glamour y la elegancia conviven en un diseño que interpreta la tendencia más actual del lujo en el descanso. Acabado capitoné elaborado a mano con los materiales más exclusivos.',
    price: 1557,
    originalPrice: 2832,
    compareAtPrice: 2832,
    discount: 45,
    firmnessValue: 75,
    firmness: Firmness.MEDIA_ALTA,
    transpirability: 92,
    adaptability: 95,
    height: 34,
    weight: 45,
    maxWeightPerPerson: 130,
    image: '/images/colchones/flex-eternity.jpg',
    images: JSON.stringify([
      '/images/colchones/flex-eternity.jpg',
      '/images/colchones/flex-eternity-2.jpg',
      '/images/colchones/flex-eternity-detalle.jpg',
      '/images/colchones/flex-eternity-capitone.jpg'
    ]),
    gradient: 'from-amber-700 via-yellow-600 to-amber-800',
    rating: 5.0,
    reviewCount: 89,
    salesCount: 234,
    viewsCount: 5670,
    features: JSON.stringify([
      'Muelles Pocket Premium® Pro (18 cm)',
      'Látex Talalay (3 cm)',
      'Seda natural',
      'Crin de caballo',
      'Fibra de coco',
      'Tapizado capitoné a mano'
    ]),
    techFeatures: JSON.stringify([
      'Doble cantidad de muelles',
      'Sistema Super Soft Sense (SSS)',
      'Tejido Damasco con viscosa',
      'Altura de 34 cm (+/- 1)',
      'Firmeza media-alta progresiva',
      '4 asas verticales reforzadas'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Colección Exclusive',
      'Total Protect antibacteriano',
      'Materiales naturales premium'
    ]),
    tags: JSON.stringify(['exclusive', 'premium', 'latex-talalay', 'seda', 'capitone', 'lujo']),
    highlights: JSON.stringify([
      'Máxima gama Flex',
      'Materiales naturales',
      'Acabado artesanal'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Muelles Pocket Premium® Pro', 'Látex Talalay', 'Seda natural', 'Crin de caballo', 'Fibra de coco', 'HR alta densidad']),
    layers: JSON.stringify([
      'Tejido Damasco premium',
      'Tapizado capitoné a mano',
      'Sistema Super Soft Sense (SSS)',
      'Seda natural',
      'Fibras hipoalergénicas',
      'TNT protector',
      'Látex Talalay (3 cm)',
      'Bloque HR (4 cm)',
      'Crin de caballo',
      'Encapsulado HR',
      'Confort System+',
      'Núcleo Pocket Premium® Pro (18 cm)',
      'Fibra de coco',
      'Platabanda exclusiva con logo'
    ]),
    badge: 'EXCLUSIVE',
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    isActive: true,
    isEco: true,
    stock: 24,
    inStock: true,
    sku: 'FLEX-ETERNITY-001',
    deliveryDays: 7,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: false,
    satisfaction: 100,
    position: 3
  },

  // ========== COLCHÓN NUBE MULTI ==========
  {
    name: 'Colchón Nube Multi',
    slug: 'colchon-nube-multi',
    subtitle: 'Uno de nuestros colchones más firmes y de mayor calidad',
    description: 'El colchón Nube Multi es una excelente opción para los que buscan un colchón firme y adaptable al mismo tiempo. Incorpora los mejores estándares de tecnología para conseguir el mejor descanso. Su núcleo de muelle continuo Multielástic® garantiza un comportamiento óptimo en la adaptación al cuerpo, modificando su firmeza y soporte en función de la presión recibida. Tecnología exclusiva de Flex® con una durabilidad superior al estándar. Ideal para personas que quieren combinar un alto nivel de firmeza con un toque personalizado de confort y acogida viscoelástica.',
    story: 'Diseñado para personas que buscan firmeza superior sin renunciar al confort. Su sistema de muelles continuos Multielástic® es exclusivo de Flex y ofrece una durabilidad excepcional.',
    price: 378,
    originalPrice: 689,
    compareAtPrice: 689,
    discount: 45,
    firmnessValue: 80,
    firmness: Firmness.EXTRA_FIRME,
    transpirability: 85,
    adaptability: 85,
    height: 27,
    weight: 33,
    maxWeightPerPerson: 120,
    image: '/images/colchones/flex-nube-multi.jpg',
    images: JSON.stringify([
      '/images/colchones/flex-nube-multi.jpg',
      '/images/colchones/flex-nube-multi-2.jpg',
      '/images/colchones/flex-nube-multi-detalle.jpg'
    ]),
    gradient: 'from-emerald-700 via-teal-700 to-cyan-800',
    rating: 4.6,
    reviewCount: 234,
    salesCount: 856,
    viewsCount: 6780,
    features: JSON.stringify([
      'Muelles continuos Multielástic®',
      'Firmeza superior',
      'Acogida viscoelástica',
      'Durabilidad excepcional',
      'Fibras hipoalergénicas',
      'Confort System+'
    ]),
    techFeatures: JSON.stringify([
      'Tecnología Multielástic® exclusiva',
      'Muelles dobles de hilo continuo',
      'Altura de 27 cm (+/- 1)',
      'Firmeza 80% (Extra Firme)',
      'Encapsulado HR',
      'Tejido Stretch premium'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Total Protect',
      'Tecnología exclusiva Flex'
    ]),
    tags: JSON.stringify(['extra-firme', 'multielastic', 'durabilidad', 'viscoelastica', 'ultimate']),
    highlights: JSON.stringify([
      'Máxima firmeza',
      'Tecnología exclusiva',
      'Alta durabilidad'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Muelles Multielástic®', 'Viscoelástica', 'Fibras hipoalergénicas', 'HR alta densidad', 'TNT']),
    layers: JSON.stringify([
      'Tejido Stretch de alto gramaje',
      'Acolchado viscoelástico',
      'Fibras hipoalergénicas compactas',
      'TNT protector',
      'Confort System+',
      'Núcleo Multielástic® continuo',
      'Encapsulado HR alta densidad',
      'Refuerzo perimetral',
      'Base TNT',
      'Tejido 3D transpirable'
    ]),
    badge: 'FIRMEZA SUPERIOR',
    isNew: true,
    isBestSeller: true,
    isFeatured: false,
    isActive: true,
    isEco: false,
    stock: 92,
    inStock: true,
    sku: 'FLEX-NUBE-MULTI-001',
    deliveryDays: 5,
    freeShipping: true,
    cooling: false,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: false,
    edgeSupport: true,
    verified: true,
    bestValue: true,
    satisfaction: 91,
    position: 4
  },

  // ========== COLCHÓN WBX 500 VISCO ==========
  {
    name: 'Colchón WBx 500 Visco',
    slug: 'colchon-wbx-500-visco',
    subtitle: 'Tecnología BioCeramics® para tu recuperación',
    description: 'El colchón de muelles Flex® WBx 500 es una elección excepcional para aquellos que desean un descanso que les ayude a recuperarse y cuidarse durante las horas de sueño. Su tapicería Wellness BioCeramics® tiene propiedades que pueden contribuir a tu bienestar. La tecnología BioCeramics® está creada por una composición de materiales biocerámicos capaces de emitir ondas infrarrojas FIR que, científicamente comprobado, aportan beneficios al cuerpo humano: mejora la circulación sanguínea, ayuda en la recuperación muscular y favorece la creación de colágeno. Especialmente indicado para deportistas.',
    story: 'La tecnología BioCeramics® ha sido certificada por el Centro de Investigación en Ingeniería Biomédica (CREB) por su eficacia en la mejora de la circulación sanguínea periférica, ayudando a problemas circulatorios como varices y pesadez de piernas.',
    price: 625,
    originalPrice: 1250,
    compareAtPrice: 1250,
    discount: 50,
    firmnessValue: 70,
    firmness: Firmness.MEDIA_ALTA,
    transpirability: 90,
    adaptability: 92,
    height: 33,
    weight: 40,
    maxWeightPerPerson: 120,
    image: '/images/colchones/flex-wbx-500.jpg',
    images: JSON.stringify([
      '/images/colchones/flex-wbx-500.jpg',
      '/images/colchones/flex-wbx-500-2.jpg',
      '/images/colchones/flex-wbx-500-bioceramics.jpg',
      '/images/colchones/flex-wbx-500-detalle.jpg'
    ]),
    gradient: 'from-red-700 via-rose-700 to-pink-800',
    rating: 4.9,
    reviewCount: 412,
    salesCount: 1234,
    viewsCount: 8900,
    features: JSON.stringify([
      'Tecnología BioCeramics®',
      'Ondas infrarrojas FIR',
      'Mejora circulación sanguínea',
      'Recuperación muscular',
      'Muelles Pocket Premium® Pro (18 cm)',
      'Viscoelástica con gel'
    ]),
    techFeatures: JSON.stringify([
      'Tejido Stretch BioCeramics®',
      'Certificado CREB',
      'Núcleo Pocket Premium® Pro (18 cm)',
      'Altura de 33 cm (+/- 1)',
      'Firmeza 70% (Media-Alta)',
      'Sistema Commodo+'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Certificado CREB',
      'Total Protect antibacteriano',
      'Certificado Sanitized®'
    ]),
    tags: JSON.stringify(['bioceramics', 'deportistas', 'recuperacion', 'fir', 'muelles-ensacados', 'premium']),
    highlights: JSON.stringify([
      'Tecnología BioCeramics',
      'Ideal deportistas',
      'Certificado científico'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Tejido BioCeramics®', 'Muelles Pocket Premium® Pro', 'Viscoelástica con gel', 'Fibras hipoalergénicas', 'HR alta densidad']),
    layers: JSON.stringify([
      'Tejido Stretch BioCeramics® con lurex',
      'Fibras hipoalergénicas atérmicas',
      'Viscoelástica con gel',
      'Acolchado Tack & Jump',
      'Sistema Commodo+',
      'TNT protector',
      'Confort System+',
      'Núcleo Pocket Premium® Pro (18 cm)',
      'Encapsulado HR alta densidad',
      'Doble burlete perimetral',
      'Platabanda bordada'
    ]),
    badge: 'BIOCERAMICS',
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 67,
    inStock: true,
    sku: 'FLEX-WBX500-001',
    deliveryDays: 5,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: false,
    satisfaction: 97,
    position: 5
  },

  // ========== COLCHÓN ZZ5 FIRM POCKET ==========
  {
    name: 'Colchón zZ5 Firm Pocket',
    slug: 'colchon-zz5-firm-pocket',
    subtitle: 'Máximo confort diseñado cuidadosamente',
    description: 'El colchón zZ5 Firm Pocket Premium®Top gracias a su núcleo híbrido de muelles ensacados Pocket Premium®Top y al bloque de viscoelástica te ofrecerá un soporte firme y progresivo con independencia de lechos. Experimenta el lujo y la máxima innovación aplicada al descanso gracias al diseño sofisticado y a los núcleos híbridos de la colección Flex® zZ5 que combinan diferentes tecnologías y elevan tu descanso al siguiente nivel. Con 32,5 cm de altura y diversas capas de confort, te brinda un descanso excepcional para disfrutar de una noche magnífica.',
    story: 'La colección zZ5 representa la gama más alta de Flex en innovación. Combina núcleos híbridos que elevan el confort a otro nivel, diseñados cuidadosamente para ofrecer el máximo confort con los materiales más selectos.',
    price: 1049,
    originalPrice: 2330,
    compareAtPrice: 2330,
    discount: 55,
    firmnessValue: 75,
    firmness: Firmness.MEDIA_ALTA,
    transpirability: 92,
    adaptability: 95,
    height: 32.5,
    weight: 42,
    maxWeightPerPerson: 130,
    image: '/images/colchones/flex-zz5-firm.jpg',
    images: JSON.stringify([
      '/images/colchones/flex-zz5-firm.jpg',
      '/images/colchones/flex-zz5-firm-2.jpg',
      '/images/colchones/flex-zz5-firm-hibrido.jpg',
      '/images/colchones/flex-zz5-firm-detalle.jpg'
    ]),
    gradient: 'from-violet-800 via-purple-800 to-fuchsia-900',
    rating: 4.9,
    reviewCount: 178,
    salesCount: 567,
    viewsCount: 6780,
    features: JSON.stringify([
      'Núcleo híbrido avanzado',
      'Muelles Pocket Premium® Top',
      'Bloque viscoelástica con gel',
      'Double Soft Sense (DSS)',
      'Tejido Damasco premium',
      'Total Protect antibacteriano'
    ]),
    techFeatures: JSON.stringify([
      'Tecnología de núcleo híbrido',
      'Sistema Double Soft Sense',
      'Altura de 32,5 cm (+/- 1)',
      'Firmeza 75% (Media-Alta)',
      'Colección zZ5 premium',
      'Encapsulado HR reforzado'
    ]),
    certifications: JSON.stringify([
      'Oeko-Tex Standard 100',
      'Colección zZ5',
      'Total Protect',
      'Materiales premium'
    ]),
    tags: JSON.stringify(['zz5', 'hibrido', 'premium', 'firme', 'innovacion', 'lujo']),
    highlights: JSON.stringify([
      'Gama alta zZ5',
      'Núcleo híbrido',
      'Máximo confort'
    ]),
    warranty: 3,
    trialNights: 14,
    materials: JSON.stringify(['Muelles Pocket Premium® Top', 'Viscoelástica con gel', 'Fibras hipoalergénicas sublimes', 'HR alta densidad', 'Tejido Damasco']),
    layers: JSON.stringify([
      'Tejido Damasco premium',
      'Sistema Double Soft Sense (DSS)',
      'Fibras hipoalergénicas',
      'Viscoelástica con gel',
      'Confort System superior',
      'TNT protector',
      'Bloque viscoelástica',
      'Núcleo Pocket Premium® Top',
      'Encapsulado HR reforzado',
      'Doble burlete perimetral',
      'Platabanda de lujo',
      '4 asas verticales'
    ]),
    badge: 'ZZ5 PREMIUM',
    isNew: false,
    isBestSeller: false,
    isFeatured: true,
    isActive: true,
    isEco: false,
    stock: 42,
    inStock: true,
    sku: 'FLEX-ZZ5-FIRM-001',
    deliveryDays: 7,
    freeShipping: true,
    cooling: true,
    hypoallergenic: true,
    washable: true,
    antiDustMite: true,
    reversible: false,
    silent: true,
    motionIsolation: true,
    edgeSupport: true,
    verified: true,
    bestValue: false,
    satisfaction: 98,
    position: 6
  }
]

// ============================================================================
// VARIANTES DE TAMAÑOS - FLEX
// ============================================================================

const variants = [
  { size: 'Individual 80x180', width: 80, length: 180, priceMultiplier: 0.50 },
  { size: 'Individual 80x190', width: 80, length: 190, priceMultiplier: 0.53 },
  { size: 'Individual 90x180', width: 90, length: 180, priceMultiplier: 0.55 },
  { size: 'Individual 90x190', width: 90, length: 190, priceMultiplier: 0.58 },
  { size: 'Individual 90x200', width: 90, length: 200, priceMultiplier: 0.61 },
  { size: 'Individual XL 105x190', width: 105, length: 190, priceMultiplier: 0.68 },
  { size: 'Individual XL 105x200', width: 105, length: 200, priceMultiplier: 0.71 },
  { size: 'Matrimonio 135x190', width: 135, length: 190, priceMultiplier: 0.83 },
  { size: 'Matrimonio 135x200', width: 135, length: 200, priceMultiplier: 0.87 },
  { size: 'Matrimonio 150x190', width: 150, length: 190, priceMultiplier: 0.93 },
  { size: 'Queen 150x200', width: 150, length: 200, priceMultiplier: 1.0, isPopular: true },
  { size: 'King 160x200', width: 160, length: 200, priceMultiplier: 1.07 },
  { size: 'Super King 180x190', width: 180, length: 190, priceMultiplier: 1.18 },
  { size: 'Super King 180x200', width: 180, length: 200, priceMultiplier: 1.23 },
  { size: 'Super King 200x200', width: 200, length: 200, priceMultiplier: 1.36 }
]

// ============================================================================
// FUNCIÓN SEED
// ============================================================================

async function main() {
  console.log('🌱 Iniciando seed de productos Flex...\n')

  // Limpiar productos existentes de Flex
  console.log('🗑️  Limpiando productos Flex...')
  const flexProducts = await prisma.product.findMany({
    where: {
      sku: {
        startsWith: 'FLEX-'
      }
    }
  })
  
  for (const product of flexProducts) {
    await prisma.productVariant.deleteMany({
      where: { productId: product.id }
    })
  }
  
  await prisma.product.deleteMany({
    where: {
      sku: {
        startsWith: 'FLEX-'
      }
    }
  })
  console.log('✅ Productos Flex eliminados\n')

  // Crear productos
  console.log('📦 Creando productos Flex...\n')
  
  for (const productData of products) {
    console.log(`   → ${productData.name}`)
    
    const product = await prisma.product.create({
      data: productData
    })

    // Crear variantes para cada producto
    for (const variantData of variants) {
      const variantPrice = Math.round(productData.price * variantData.priceMultiplier)
      const variantOriginalPrice = productData.originalPrice 
        ? Math.round(productData.originalPrice * variantData.priceMultiplier)
        : null

      await prisma.productVariant.create({
        data: {
          productId: product.id,
          size: variantData.size,
          width: variantData.width,
          length: variantData.length,
          dimensions: `${variantData.width}x${variantData.length} cm`,
          price: variantPrice,
          originalPrice: variantOriginalPrice,
          stock: Math.floor(Math.random() * 50) + 20,
          sku: `${productData.sku}-${variantData.width}X${variantData.length}`,
          barcode: `8${String(Math.random()).slice(2, 14)}`,
          weight: productData.weight ? Math.round(productData.weight * variantData.priceMultiplier) : null,
          isAvailable: true,
          isPopular: variantData.isPopular || false
        }
      })
    }
  }

  console.log(`\n✅ ${products.length} productos Flex creados con éxito`)
  console.log(`✅ ${products.length * variants.length} variantes creadas\n`)

  // Estadísticas
  const totalProducts = await prisma.product.count({
    where: {
      sku: {
        startsWith: 'FLEX-'
      }
    }
  })
  const totalVariants = await prisma.productVariant.count()
  
  console.log('📊 Estadísticas finales Flex:')
  console.log(`   • Productos Flex: ${totalProducts}`)
  console.log(`   • Variantes totales: ${totalVariants}`)
  console.log(`   • Productos premium (>1000€): ${products.filter(p => p.price > 1000).length}`)
  console.log(`   • Productos bestseller: ${products.filter(p => p.isBestSeller).length}`)
  console.log(`   • Productos colección zZ: ${products.filter(p => p.tags.includes('zz5') || p.tags.includes('zz-collection')).length}`)
  console.log(`   • Productos con BioCeramics: ${products.filter(p => p.tags.includes('bioceramics')).length}`)
  console.log('\n🎉 ¡Seed Flex completado con éxito!')
  console.log('\n📋 Productos Flex creados:')
  products.forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.name} - ${p.price}€ (${p.reviewCount} opiniones) - ${p.badge}`)
  })
}

// Ejecutar seed
main()
  .catch((e) => {
    console.error('❌ Error en seed Flex:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })