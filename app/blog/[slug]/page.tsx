'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'

export default function BlogArticlePage() {
  const params = useParams()
  const slug = params?.slug as string

  // En producción, estos datos vendrían de una API/CMS
  const article = getArticleBySlug(slug)

  if (!article) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artículo no encontrado</h1>
          <Link href="/blog">
            <button className="btn-primary">Volver al blog</button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-br from-warm-50 to-accent-lavender py-16">
        <div className="container-custom max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Volver al blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block bg-primary-600 text-white px-4 py-1 rounded-full text-sm mb-4">
              {article.category}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
              <span>Por {article.author}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Article Content */}
      <article className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          {/* Featured Image */}
          <div className="h-96 bg-gradient-to-br from-warm-100 to-accent-mint rounded-2xl mb-12 flex items-center justify-center">
            <span className="text-9xl">{article.emoji}</span>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Aquí iría el contenido completo del artículo */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Introducción</h2>
              <p>
                El descanso es fundamental para nuestra salud y bienestar general. Durante el sueño, 
                nuestro cuerpo realiza procesos esenciales de reparación y regeneración que afectan 
                directamente a nuestra calidad de vida.
              </p>

              <h2 className="text-3xl font-bold mt-12">Por qué es importante</h2>
              <p>
                Un buen colchón no solo mejora la calidad del sueño, sino que también puede ayudar 
                a prevenir y aliviar dolores de espalda, cuello y articulaciones. La elección correcta 
                puede marcar la diferencia entre despertarse renovado o con molestias.
              </p>

              <h2 className="text-3xl font-bold mt-12">Cómo elegir correctamente</h2>
              <ul>
                <li>Considera tu peso y postura al dormir</li>
                <li>Evalúa el nivel de firmeza que necesitas</li>
                <li>Ten en cuenta la temperatura ambiente</li>
                <li>Verifica los materiales y certificaciones</li>
              </ul>

              <h2 className="text-3xl font-bold mt-12">Conclusión</h2>
              <p>
                Invertir en un buen colchón es invertir en tu salud. No escatimes en algo que usarás 
                durante 8 horas cada día. Tu cuerpo te lo agradecerá.
              </p>
            </div>
          </div>

          {/* Share */}
          <div className="mt-12 pt-8 border-t">
            <button className="flex items-center gap-2 text-primary-600 hover:text-primary-700">
              <Share2 className="w-5 h-5" />
              Compartir artículo
            </button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="section-padding bg-warm-50">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">Artículos relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Aquí irían artículos relacionados */}
            <p className="text-gray-600 col-span-3">Más artículos próximamente...</p>
          </div>
        </div>
      </section>
    </div>
  )
}

function getArticleBySlug(slug: string) {
  const articles: Record<string, any> = {
    'como-elegir-firmeza-colchon': {
      title: 'Cómo elegir la firmeza perfecta para tu colchón',
      excerpt: 'Descubre qué nivel de firmeza necesitas según tu peso, postura al dormir y preferencias personales.',
      category: 'Consejos',
      author: 'Dr. Luis García',
      date: '15 Oct 2025',
      readTime: '5 min',
      emoji: '💪',
    },
  }

  return articles[slug]
}
