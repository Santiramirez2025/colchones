import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { homeMetadata, getAllStructuredData } from '@/lib/metadata'
import { getFeaturedProducts } from '@/lib/api/products'

export const metadata: Metadata = homeMetadata
export const revalidate = 3600 // Revalidate every hour

// Simplified dynamic imports
const BenefitsSection = dynamic(() => 
  import('@/components/home/BenefitsSection').then(mod => mod.BenefitsSection)
)
const CTASection = dynamic(() => 
  import('@/components/home/CTASection').then(mod => mod.CTASection)
)
const FooterTrustSection = dynamic(() => 
  import('@/components/home/FooterTrustSection').then(mod => mod.FooterTrustSection)
)

export default async function Home() {
  const structuredDataSchemas = getAllStructuredData()
  
  // Error handling for product fetch
  const featuredProducts = await getFeaturedProducts(6).catch((error) => {
    console.error('Failed to fetch featured products:', error)
    return []
  })

  return (
    <>
      {/* Structured Data for SEO */}
      {structuredDataSchemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="bg-zinc-950 overflow-x-hidden">
        <ScrollProgressBar />
        <TrustBar />
        <HeroSection />
        
        <Suspense fallback={<div className="h-96" />}>
          <BenefitsSection />
        </Suspense>
        
        {/* Featured Products Section */}
        {featuredProducts.length > 0 && (
          <Suspense fallback={<div className="h-96" />}>
            <FeaturedProducts initialProducts={featuredProducts} />
          </Suspense>
        )}
        
        <Suspense fallback={<div className="h-64" />}>
          <CTASection />
        </Suspense>
        
        <Suspense fallback={<div className="h-48" />}>
          <FooterTrustSection />
        </Suspense>
      </div>
    </>
  )
}