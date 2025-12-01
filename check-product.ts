import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkProduct() {
  const productId = 'cmidaea7v0003f5w8ngpxo4vo'
  
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      reviews: true
    }
  })
  
  if (!product) {
    console.log('❌ Producto NO encontrado')
    return
  }
  
  console.log('='.repeat(60))
  console.log('📦 PRODUCTO ENCONTRADO')
  console.log('='.repeat(60))
  console.log('ID:', product.id)
  console.log('Nombre:', product.name)
  console.log('Slug:', product.slug)
  console.log('URL:', `/producto/${product.slug}`)
  console.log('')
  console.log('💰 PRECIOS:')
  console.log('  price:', product.price, '(centavos)')
  console.log('  price ARS:', (product.price / 100).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }))
  console.log('  originalPrice:', product.originalPrice, '(centavos)')
  console.log('')
  console.log('✅ STATUS:')
  console.log('  isActive:', product.isActive)
  console.log('  inStock:', product.inStock)
  console.log('  stock:', product.stock)
  console.log('')
  console.log('📸 IMÁGENES:', product.images.length)
  product.images.forEach((img, i) => console.log(`  ${i + 1}. ${img}`))
  console.log('')
  console.log('⭐ REVIEWS:', product.reviews.length)
  console.log('  Rating promedio:', product.rating)
  console.log('')
  console.log('🏷️ CATEGORÍA:')
  console.log('  category:', product.category)
  console.log('  subcategory:', product.subcategory)
  console.log('')
  
  // Verificar si hay problemas evidentes
  console.log('🔍 PROBLEMAS POTENCIALES:')
  const problems = []
  
  if (!product.isActive) problems.push('⚠️  Producto NO ACTIVO (isActive: false)')
  if (!product.inStock) problems.push('⚠️  Producto SIN STOCK (inStock: false)')
  if (product.stock <= 0) problems.push('⚠️  Stock es 0 o negativo')
  if (product.price > 100000000) problems.push('⚠️  Precio parece muy alto (¿error en centavos?)')
  if (product.images.length === 0) problems.push('⚠️  No tiene imágenes')
  if (!product.slug) problems.push('⚠️  No tiene slug')
  
  if (problems.length === 0) {
    console.log('✅ No se detectaron problemas evidentes')
  } else {
    problems.forEach(p => console.log(p))
  }
  
  console.log('='.repeat(60))
}

checkProduct()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })