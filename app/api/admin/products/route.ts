import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { checkAdminAccess } from '@/lib/auth/admin'

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación del usuario
    const authHeader = request.headers.get('authorization')
    // En producción, aquí verificarías el token de Firebase
    // Por ahora, asumimos que el middleware del layout ya verificó el acceso
    
    const body = await request.json()

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        subtitle: body.subtitle || '',
        description: body.description || '',
        price: parseFloat(body.price),
        originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
        stock: parseInt(body.stock),
        image: body.image,
        categoryId: body.categoryId || null,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        isBestSeller: body.isBestSeller ?? false,
        firmness: body.firmness || 'MEDIA',
        height: parseInt(body.height) || 25,
        warranty: parseInt(body.warranty) || 10,
        trialNights: parseInt(body.trialNights) || 100,
      },
    })

    return NextResponse.json({ success: true, product })
  } catch (error: any) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: error.message || 'Error al crear producto' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        variants: true,
      },
    })

    return NextResponse.json({ products })
  } catch (error: any) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}