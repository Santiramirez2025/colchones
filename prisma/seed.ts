import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Importa y ejecuta tus seeds
  
  console.log('🌱 Seeding database...')
  
  
  console.log('✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })