// app/api/products/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filtros
    const search = searchParams.get('search') || ''
    const firmness = searchParams.get('firmness')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const minRating = searchParams.get('minRating')
    const sortBy = searchParams.get('sortBy') || 'featured'

    // Build where clause
    const where: any = {
      isActive: true,
    }

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { subtitle: { contains: search, mode: 'insensitive' } },
      ]
    }

    // Firmness filter
    if (firmness && firmness !== 'Todas') {
      where.firmness = firmness
    }

    // Price filter
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    // Rating filter
    if (minRating) {
      where.rating = { gte: parseFloat(minRating) }
    }

    // Sorting
    let orderBy: any = {}
    switch (sortBy) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'rating':
        orderBy = { rating: 'desc' }
        break
      default:
        orderBy = [
          { isBestSeller: 'desc' },
          { isNew: 'desc' },
          { rating: 'desc' }
        ]
    }

    // Fetch products
    const products = await prisma.product.findMany({
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        subtitle: true,
        price: true,
        originalPrice: true,
        firmness: true,
        rating: true,
        reviewCount: true,
        badge: true,
        features: true,
        techFeatures: true,
        discount: true,
        isNew: true,
        isBestSeller: true,
        gradient: true,
        story: true,
        image: true,
        certifications: true,
        slug: true,
      }
    })

    // Parse JSON strings to arrays
    const parsedProducts = products.map(product => ({
      ...product,
      features: JSON.parse(product.features),
      techFeatures: JSON.parse(product.techFeatures),
      certifications: JSON.parse(product.certifications),
      reviews: product.reviewCount, // Mapear reviewCount a reviews para compatibilidad
    }))

    return NextResponse.json(parsedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}