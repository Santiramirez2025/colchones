import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fixCategory() {
  const productId = 'cmidaea7v0003f5w8ngpxo4vo'
  
  await prisma.product.update({
    where: { id: productId },
    data: {
      category: 'colchones',  // Minúscula para consistencia
      subcategory: 'espuma'    // También en minúscula
    }
  })
  
  console.log('✅ Categoría actualizada a minúsculas')
  console.log('   category: "colchones"')
  console.log('   subcategory: "espuma"')
}

fixCategory()
  .catch(e => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())