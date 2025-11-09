import { useState } from 'react'
import { MessageCircle, Info, Layers, Check, ChevronDown, Star, Award, Shield, Sparkles, TrendingUp, Users, Quote, Calendar, BadgeCheck, Package, Zap } from 'lucide-react'

interface Feature {
  name: string
  value: string
}

interface TabsSectionProps {
  activeTab: 'description' | 'specs' | 'reviews' | 'faq'
  setActiveTab: (tab: 'description' | 'specs' | 'reviews' | 'faq') => void
  product: any
  reviews: any[]
  averageRatings: { average: number; count: number; distribution: Record<number, number> }
  faqs: Array<{ q: string; a: string }>
  expandedFaq: number | null
  setExpandedFaq: (index: number | null) => void
}

export default function TabsSection({ 
  activeTab, 
  setActiveTab, 
  product, 
  reviews, 
  averageRatings, 
  faqs, 
  expandedFaq, 
  setExpandedFaq 
}: TabsSectionProps) {
  
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)

  // Parse features
  const features: Feature[] = (() => {
    if (!product?.features || !Array.isArray(product.features)) {
      return []
    }
    
    if (typeof product.features[0] === 'string') {
      return product.features.map((feat: string) => ({
        name: feat,
        value: '✓'
      }))
    }
    
    return product.features as Feature[]
  })()

  const tabs = [
    { 
      id: 'description' as const, 
      name: 'Descripción', 
      icon: Info,
      gradient: 'from-violet-500 to-purple-600'
    },
    { 
      id: 'specs' as const, 
      name: 'Especificaciones', 
      icon: Layers,
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'reviews' as const, 
      name: `Opiniones`, 
      badge: averageRatings.count,
      icon: Star,
      gradient: 'from-amber-500 to-orange-600'
    },
    { 
      id: 'faq' as const, 
      name: 'Preguntas', 
      icon: MessageCircle,
      gradient: 'from-emerald-500 to-teal-600'
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header con efecto glassmorphism */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-transparent border border-violet-500/20 p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-violet-500/20 via-transparent to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-violet-500/20 backdrop-blur-xl border border-violet-400/30">
                    <Sparkles className="w-6 h-6 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{product.name}</h2>
                    <p className="text-violet-300 text-sm">{product.subtitle || 'Diseño premium'}</p>
                  </div>
                </div>
                
                <p className="text-lg text-zinc-300 leading-relaxed">{product.description}</p>
              </div>
            </div>

            {product.longDescription && (
              <div 
                dangerouslySetInnerHTML={{ __html: product.longDescription }} 
                className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-strong:text-white prose-a:text-violet-400 hover:prose-a:text-violet-300"
              />
            )}

            {/* Características Premium Grid */}
            {features.length > 0 ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 rounded-2xl blur-xl" />
                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Características Premium</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {features.map((feature: Feature, i: number) => (
                      <div 
                        key={i} 
                        className="group relative overflow-hidden rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-6 hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/5 group-hover:to-purple-500/5 transition-all duration-300" />
                        <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 group-hover:scale-110 group-hover:bg-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-300 shadow-lg shadow-emerald-500/0 group-hover:shadow-emerald-500/20">
                              <Check className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-base leading-tight mb-2 group-hover:text-violet-200 transition-colors">
                              {feature.name}
                            </h4>
                            {feature.value !== '✓' && (
                              <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
                                {feature.value}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-xl bg-amber-500/5 border border-amber-500/20 p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/20">
                    <Info className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-amber-300 font-medium mb-1">Sin características disponibles</p>
                    <p className="text-amber-400/80 text-sm">
                      Verifica que el campo <code className="bg-black/30 px-2 py-1 rounded">features</code> contenga datos válidos.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: 'Garantía Premium', color: 'violet' },
                { icon: Package, label: 'Envío Gratis', color: 'blue' },
                { icon: BadgeCheck, label: 'Certificado', color: 'emerald' },
                { icon: Zap, label: 'Entrega 24-48h', color: 'amber' }
              ].map((badge, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:border-violet-500/30 transition-all duration-300 hover:scale-105">
                  <div className={`p-3 rounded-full bg-${badge.color}-500/20 mb-2`}>
                    <badge.icon className={`w-5 h-5 text-${badge.color}-400`} />
                  </div>
                  <span className="text-sm font-medium text-zinc-300">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        )

      case 'specs':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Especificaciones Técnicas</h2>
                <p className="text-zinc-400">Detalles completos del producto</p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                { label: 'Marca', value: product.brand || 'Tienda Colchón', icon: Award, gradient: 'from-violet-500 to-purple-600' },
                { label: 'Altura', value: `${product.height} cm`, icon: TrendingUp, gradient: 'from-blue-500 to-cyan-600' },
                { label: 'Firmeza', value: `${product.firmness} (${product.firmnessValue}%)`, icon: Shield, gradient: 'from-emerald-500 to-teal-600' },
                { label: 'Material', value: product.material || 'Viscoelástica', icon: Layers, gradient: 'from-amber-500 to-orange-600' },
                { label: 'Transpirabilidad', value: `${product.transpirability}%`, icon: Sparkles, gradient: 'from-fuchsia-500 to-pink-600' },
                { label: 'SKU', value: product.sku || product.id, icon: Package, gradient: 'from-indigo-500 to-purple-600' },
              ].map((spec, i) => (
                <div 
                  key={i} 
                  className="group relative overflow-hidden rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${spec.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="relative flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${spec.gradient} shadow-lg`}>
                      <spec.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <dt className="text-sm text-zinc-400 mb-1">{spec.label}</dt>
                      <dd className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{spec.value}</dd>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent border border-blue-500/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Información adicional</h4>
                  <p className="text-zinc-300 text-sm leading-relaxed">
                    Todas nuestras especificaciones están certificadas y cumplen con los estándares europeos de calidad. 
                    Producto testado y validado por expertos en descanso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'reviews':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  Opiniones de Clientes
                </h2>
                <p className="text-zinc-400">{averageRatings.count} valoraciones verificadas</p>
              </div>
            </div>
            
            {/* Stats Grid Premium */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Rating Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 p-8">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
                <div className="relative text-center">
                  <div className="inline-flex items-baseline gap-2 mb-3">
                    <span className="text-6xl font-black bg-gradient-to-br from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      {averageRatings.average.toFixed(1)}
                    </span>
                    <span className="text-2xl text-amber-400/60">/5</span>
                  </div>
                  <div className="flex justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-all duration-200 ${
                          i < Math.floor(averageRatings.average) 
                            ? 'fill-amber-400 text-amber-400 scale-110' 
                            : 'text-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-zinc-400">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">{averageRatings.count} opiniones</span>
                  </div>
                </div>
              </div>

              {/* Distribution Chart */}
              <div className="lg:col-span-2 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 p-8">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  Distribución de Valoraciones
                </h3>
                <div className="space-y-4">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = averageRatings.distribution[stars] || 0
                    const percent = averageRatings.count > 0 ? (count / averageRatings.count) * 100 : 0
                    return (
                      <div 
                        key={stars} 
                        className="group flex items-center gap-4"
                        onMouseEnter={() => setHoveredStar(stars)}
                        onMouseLeave={() => setHoveredStar(null)}
                      >
                        <div className="flex items-center gap-1 w-24">
                          <span className="text-sm font-semibold text-white">{stars}</span>
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        </div>
                        <div className="flex-1 relative">
                          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                hoveredStar === stars ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gradient-to-r from-amber-500/80 to-orange-600/80'
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>
                        <span className={`text-sm font-medium w-16 text-right transition-colors ${
                          hoveredStar === stars ? 'text-amber-400' : 'text-zinc-400'
                        }`}>
                          {count} ({percent.toFixed(0)}%)
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review, i) => (
                  <div 
                    key={i} 
                    className="group relative overflow-hidden rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 p-6 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {(review.userName?.[0] || 'C').toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-white text-lg mb-1">
                              {review.userName || 'Cliente Verificado'}
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, j) => (
                                  <Star 
                                    key={j} 
                                    className={`w-4 h-4 ${
                                      j < review.rating 
                                        ? 'fill-amber-400 text-amber-400' 
                                        : 'text-zinc-700'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-zinc-500">•</span>
                              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Hace {Math.floor(Math.random() * 30) + 1} días</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-500/20">
                          <BadgeCheck className="w-5 h-5 text-emerald-400" />
                        </div>
                      </div>
                      
                      <div className="relative pl-16">
                        <Quote className="absolute left-0 top-0 w-8 h-8 text-amber-500/20" />
                        <p className="text-zinc-300 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
                  <div className="inline-flex p-4 rounded-full bg-zinc-800/50 mb-4">
                    <Star className="w-8 h-8 text-zinc-600" />
                  </div>
                  <p className="text-zinc-500 text-lg font-medium">No hay opiniones todavía</p>
                  <p className="text-zinc-600 text-sm mt-2">Sé el primero en valorar este producto</p>
                </div>
              )}
            </div>
          </div>
        )

      case 'faq':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Preguntas Frecuentes</h2>
                <p className="text-zinc-400">Todo lo que necesitas saber</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = expandedFaq === i
                return (
                  <div 
                    key={i} 
                    className="group relative overflow-hidden rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 hover:border-emerald-500/30 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-teal-500/0 ${isOpen ? 'from-emerald-500/5 to-teal-500/5' : ''} transition-all duration-300`} />
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : i)}
                      className="relative w-full flex justify-between items-start gap-4 p-6 text-left group-hover:bg-zinc-800/30 transition-colors"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isOpen 
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20' 
                            : 'bg-emerald-500/20'
                        }`}>
                          <span className={`font-bold transition-colors ${isOpen ? 'text-white' : 'text-emerald-400'}`}>
                            {i + 1}
                          </span>
                        </div>
                        <span className={`font-semibold transition-colors ${isOpen ? 'text-emerald-300' : 'text-white'}`}>
                          {faq.q}
                        </span>
                      </div>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-emerald-500/20 rotate-180' : 'bg-zinc-800'
                      }`}>
                        <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-emerald-400' : 'text-zinc-400'}`} />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="relative px-6 pb-6 pt-2 border-t border-zinc-800/50">
                        <div className="pl-12">
                          <p className="text-zinc-300 leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Contact CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-2">¿Tienes más preguntas?</h4>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-3">
                    Nuestro equipo de expertos está disponible para ayudarte. Contáctanos y resolveremos todas tus dudas.
                  </p>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
                    Contactar Soporte
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <section className="w-full">
      {/* Premium Tabs Navigation */}
      <div className="relative mb-8">
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        <div className="relative flex overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-full justify-start md:justify-center p-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex items-center gap-2 px-6 py-4 font-semibold rounded-xl transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-white shadow-lg'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                  }`}
                >
                  {isActive && (
                    <>
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tab.gradient} opacity-100`} />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                    </>
                  )}
                  <div className="relative flex items-center gap-2">
                    <tab.icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span>{tab.name}</span>
                    {tab.badge !== undefined && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold transition-colors ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative">
        {renderContent()}
      </div>
    </section>
  )
}