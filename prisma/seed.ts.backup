import { prisma } from '../lib/prisma'
import seedProducts from './seeds/products'
import seedCategories from './seeds/categories'
import seedSizes from './seeds/sizes'

async function main() {
  await seedCategories()
  await seedProducts()
  await seedSizes()
}

main()
  .then(() => {
    console.log('✅ Seed completed!')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
