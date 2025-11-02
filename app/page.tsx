import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { homeMetadata, getAllStructuredData } from '@/lib/metadata'

export const metadata: Metadata = homeMetadata

const BenefitsSection = dynamic(
  () => import('@/components/home/BenefitsSection').then(mod => ({ default: mod.BenefitsSection }))
)

const CTASection = dynamic(
  () => import('@/components/home/CTASection').then(mod => ({ default: mod.CTASection }))
)

const FooterTrustSection = dynamic(
  () => import('@/components/home/FooterTrustSection').then(mod => ({ default: mod.FooterTrustSection }))
)

export default function Home() {
  const structuredDataSchemas = getAllStructuredData()

  return (
    <>
      {structuredDataSchemas.length === 1 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredDataSchemas[0]) }}
        />
      ) : (
        structuredDataSchemas.map((schema, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))
      )}

      <div className="bg-zinc-950 overflow-x-hidden">
        <ScrollProgressBar />
        <TrustBar />
        <HeroSection />
        <BenefitsSection />
        <CTASection />
        <FooterTrustSection />
      </div>
    </>
  )
}