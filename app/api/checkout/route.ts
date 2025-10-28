// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Checkout temporalmente desactivado',
      message: 'Próximamente disponible' 
    },
    { status: 503 }
  )
}