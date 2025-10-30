import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { ScrollProgressBar } from '@/components/ScrollProgressBar'
import { homeMetadata, getAllStructuredData } from '@/lib/metadata'

// Exportar metadata desde el archivo centralizado
export const metadata: Metadata = homeMetadata

// ✅ SOLUCIÓN: Para componentes críticos para SEO, usar SSR (por defecto en Server Components)
const SocialProofSection = dynamic(
  () => import('@/components/home/SocialProofSection').then(mod => ({ default: mod.SocialProofSection })),
  {
    loading: () => <div className="h-96 bg-zinc-900" aria-label="Cargando testimonios" />
    // ✅ No poner ssr: true ni ssr: false aquí, es Server Component por defecto
  }
)

const CompositionSection = dynamic(
  () => import('@/components/home/CompositionSection').then(mod => ({ default: mod.CompositionSection }))
)

const TechnologySection = dynamic(
  () => import('@/components/home/TechnologySection').then(mod => ({ default: mod.TechnologySection }))
)

const BenefitsSection = dynamic(
  () => import('@/components/home/BenefitsSection').then(mod => ({ default: mod.BenefitsSection }))
)

// ✅ SOLUCIÓN: Para componentes NO críticos que pueden cargarse después, simplemente usar dynamic sin opciones
const CTASection = dynamic(
  () => import('@/components/home/CTASection').then(mod => ({ default: mod.CTASection }))
)

const FooterTrustSection = dynamic(
  () => import('@/components/home/FooterTrustSection').then(mod => ({ default: mod.FooterTrustSection }))
)

export default function Home() {
  // Obtener todos los structured data schemas
  const structuredDataSchemas = getAllStructuredData()

  return (
    <>
      {/* ✅ MEJORA: Combinar schemas en un solo script si es posible */}
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

      {/* ✅ MEJORA: Usar <main> en lugar de <div> para mejor semántica */}
      <div className="bg-zinc-950 overflow-x-hidden">
        {/* Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Trust Bar Flotante */}
        <TrustBar />

        {/* Hero Section - Critical, carga inmediata */}
        <HeroSection />

        {/* Lazy loaded sections - Se cargan dinámicamente */}
        <SocialProofSection />
        <CompositionSection />
        <TechnologySection />
        <BenefitsSection />
        <CTASection />
        <FooterTrustSection />
      </div>
    </>
  )
}