import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Estado requerido' },
        { status: 400 }
      )
    }

    const updateData: any = { status }

    // Actualizar fechas según el estado
    if (status === 'SHIPPED' && !updateData.shippedAt) {
      updateData.shippedAt = new Date()
    }
    if (status === 'DELIVERED' && !updateData.deliveredAt) {
      updateData.deliveredAt = new Date()
    }

    const order = await prisma.order.update({
      where: { id: params.id },
      data: updateData,
    })

    return NextResponse.json({ success: true, order })
  } catch (error: any) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: error.message || 'Error al actualizar pedido' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { user: true },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Pedido no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ order })
  } catch (error: any) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Error al obtener pedido' },
      { status: 500 }
    )
  }
}