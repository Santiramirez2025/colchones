import { NextRequest, NextResponse } from 'next/server'
import { searchProducts } from '@/lib/api/products'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '10')

    if (!query || query.trim().length < 2) {
      return NextResponse.json([])
    }

    console.log('🔍 API Search:', query)
    const results = await searchProducts(query, { limit })
    console.log('✅ API Results:', results.length)
    
    return NextResponse.json(results)
  } catch (error) {
    console.error('❌ API Error:', error)
    return NextResponse.json([], { status: 500 })
  }
}