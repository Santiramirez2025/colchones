// app/api/products/upsell/topper/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Buscar un topper (puedes ajustar el filtro según tus necesidades)
    // Por ejemplo, buscamos por tags o por nombre
    const topper = await prisma.product.findFirst({
      where: {
        isActive: true,
        OR: [
          { name: { contains: 'topper', mode: 'insensitive' } },
          { tags: { contains: 'topper' } },
          { slug: { contains: 'topper' } }
        ]
      },
      include: {
        variants: {
          where: {
            isAvailable: true,
            stock: { gt: 0 }
          },
          orderBy: [
            { isPopular: 'desc' },
            { price: 'asc' }
          ]
        }
      }
    })

    if (!topper) {
      return NextResponse.json(
        { success: false, error: 'No topper found' },
        { status: 404 }
      )
    }

    // Si no tiene variantes disponibles, no lo mostramos
    if (topper.variants.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No variants available' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      product: topper
    })
  } catch (error) {
    console.error('Error fetching topper:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}