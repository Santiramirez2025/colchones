// app/api/auth/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firebaseUid, email, name, avatar } = body

    console.log('🔥 Auth sync request:', { firebaseUid, email, name })

    if (!firebaseUid || !email) {
      console.error('❌ Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields: firebaseUid and email are required' },
        { status: 400 }
      )
    }

    // Buscar o crear usuario
    const user = await prisma.user.upsert({
      where: { firebaseUid },
      update: {
        name,
        avatar,
        lastLoginAt: new Date(),
      },
      create: {
        firebaseUid,
        email,
        name,
        avatar,
        newsletter: true,
        notifications: true,
        totalOrders: 0,
        totalSpent: 0,
        lastLoginAt: new Date(),
      },
    })

    console.log('✅ User synced:', user.id)

    return NextResponse.json({ user })
  } catch (error) {
    console.error('❌ Auth sync error:', error)
    
    // Error más descriptivo
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : ''
    
    return NextResponse.json(
      { 
        error: 'Failed to sync user',
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? errorStack : undefined
      },
      { status: 500 }
    )
  }
}