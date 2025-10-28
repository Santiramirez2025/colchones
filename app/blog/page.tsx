'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Calendar, Clock, ArrowRight, Sparkles, TrendingUp, 
  BookOpen, Search, X, Tag, User, Heart,
  Bookmark, Zap, Star
} from 'lucide-react'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')
  const [likedArticles, setLikedArticles] = useState<number[]>([])
  const [savedArticles, setSavedArticles] = useState<number[]>([])

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const toggleLike = (id: number) => {
    setLikedArticles(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const toggleSave = (id: number) => {
    setSavedArticles(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticle = articles[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/20 px-5 py-2 rounded-full mb-6"
              >
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 font-semibold text-sm">
                  Guía del Descanso Premium
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Todo sobre
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  descanso perfecto
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Consejos respaldados por la ciencia sobre sueño saludable, ergonomía y bienestar
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                  <input
                    type="text"
                    placeholder="Buscar artículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/10 focus:outline-none transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="relative py-8 border-y border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                className={`group relative px-6 py-2.5 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-purple-500/30'
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 -z-10"
                  />
                )}
              </motion.button>
            ))}
          </div>
          {searchTerm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-4 text-gray-400"
            >
              Buscando: <span className="text-purple-400 font-semibold">"{searchTerm}"</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-16">
        {/* Featured Article */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Artículo Destacado</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all group">
            {/* Image */}
            <div className="relative h-[400px] md:h-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="text-9xl"
                >
                  {featuredArticle.emoji}
                </motion.span>
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Featured badge */}
              <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-white fill-current" />
                  <span className="text-sm font-bold text-white">Destacado</span>
                </div>
              </div>

              {/* Actions */}
              <div className="absolute top-6 right-6 flex gap-2">
                <button
                  onClick={() => toggleLike(featuredArticle.id)}
                  className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Heart className={`w-5 h-5 ${likedArticles.includes(featuredArticle.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                <button
                  onClick={() => toggleSave(featuredArticle.id)}
                  className="w-10 h-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Bookmark className={`w-5 h-5 ${savedArticles.includes(featuredArticle.id) ? 'fill-cyan-400 text-cyan-400' : 'text-white'}`} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold mb-4 w-fit">
                <Tag className="w-3 h-3" />
                {featuredArticle.category}
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                {featuredArticle.title}
              </h3>

              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span className="text-gray-400">{featuredArticle.date}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400">{featuredArticle.readTime}</span>
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-400">{featuredArticle.author}</span>
                </span>
              </div>

              <button className="group/btn inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 w-fit">
                Leer artículo completo
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Articles Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">
              Últimos Artículos
            </h2>
            <div className="text-gray-400">
              <span className="text-white font-bold">{filteredArticles.length}</span> artículos
            </div>
          </div>

          <AnimatePresence mode="wait">
            {filteredArticles.length > 0 ? (
              <motion.div
                key="articles"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredArticles.slice(1).map((article, index) => (
                  <motion.article
                    key={article.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    <div className="h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all">
                      {/* Image */}
                      <div className={`relative h-56 bg-gradient-to-br ${article.gradient} overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="text-7xl"
                          >
                            {article.emoji}
                          </motion.span>
                        </div>

                        {/* Trending badge */}
                        {article.trending && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full shadow-lg">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-white" />
                              <span className="text-xs font-bold text-white">Trending</span>
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleLike(article.id)}
                            className="w-8 h-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Heart className={`w-4 h-4 ${likedArticles.includes(article.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                          </button>
                          <button
                            onClick={() => toggleSave(article.id)}
                            className="w-8 h-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Bookmark className={`w-4 h-4 ${savedArticles.includes(article.id) ? 'fill-cyan-400 text-cyan-400' : 'text-white'}`} />
                          </button>
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Category */}
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-300 mb-3">
                          <Tag className="w-3 h-3" />
                          {article.category}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                          {article.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-white/5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-cyan-400" />
                            <span className="text-gray-400">{article.date}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-purple-400" />
                            <span className="text-gray-400">{article.readTime}</span>
                          </span>
                        </div>

                        {/* CTA */}
                        <button className="group/link flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                          Leer más
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              /* No results */
              <motion.div
                key="no-results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-20"
              >
                <div className="inline-block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
                  <div className="text-7xl mb-6">📚</div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    No encontramos artículos
                  </h3>
                  <p className="text-gray-400 mb-8">
                    Prueba con otra categoría o término de búsqueda
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedCategory('Todos')
                    }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:from-cyan-400 hover:to-purple-400 transition-all"
                  >
                    <X className="w-5 h-5" />
                    Limpiar filtros
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-3xl overflow-hidden">
            {/* Animated blobs */}
            <div className="absolute inset-0 opacity-30">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"
              />
            </div>

            <div className="relative p-12 text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                Suscríbete a nuestra newsletter
              </h3>
              <p className="text-lg text-white/90 mb-8">
                Recibe consejos semanales sobre descanso, salud y bienestar directamente en tu email
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
                />
                <button className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  Suscribirme
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-xs text-white/60 mt-4">
                Sin spam. Cancela cuando quieras.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

const categories = [
  'Todos',
  'Salud del Sueño',
  'Ergonomía',
  'Consejos',
  'Tecnología',
  'Bienestar',
]

const articles = [
  {
    id: 0,
    title: 'Cómo elegir la firmeza perfecta para tu colchón',
    excerpt: 'Descubre qué nivel de firmeza necesitas según tu peso, postura al dormir y preferencias personales. Una guía completa respaldada por expertos en ergonomía.',
    category: 'Consejos',
    date: '15 Oct 2025',
    readTime: '5 min',
    slug: 'como-elegir-firmeza-colchon',
    emoji: '💪',
    author: 'Dr. Ana Martínez',
    gradient: 'from-orange-500 to-red-600',
    trending: true
  },
  {
    id: 1,
    title: '7 hábitos para mejorar tu calidad de sueño',
    excerpt: 'Rutinas nocturnas respaldadas por la ciencia que transformarán tu descanso y energía diaria.',
    category: 'Salud del Sueño',
    date: '12 Oct 2025',
    readTime: '7 min',
    slug: 'habitos-mejorar-sueno',
    emoji: '😴',
    author: 'Carlos Ruiz',
    gradient: 'from-purple-500 to-pink-600',
    trending: true
  },
  {
    id: 2,
    title: 'La importancia de renovar tu colchón',
    excerpt: 'Señales de que necesitas cambiar de colchón y beneficios de hacerlo para tu salud.',
    category: 'Consejos',
    date: '8 Oct 2025',
    readTime: '4 min',
    slug: 'cuando-renovar-colchon',
    emoji: '🔄',
    author: 'Laura Gómez',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 3,
    title: 'Tecnología de espumas: Memory Foam vs Látex',
    excerpt: 'Comparativa completa de los materiales más populares en colchones premium modernos.',
    category: 'Tecnología',
    date: '5 Oct 2025',
    readTime: '6 min',
    slug: 'memory-foam-vs-latex',
    emoji: '🔬',
    author: 'Ing. Pedro López',
    gradient: 'from-green-500 to-emerald-600',
    trending: true
  },
  {
    id: 4,
    title: 'Posturas para dormir y salud de la espalda',
    excerpt: 'Cómo tu posición al dormir afecta tu columna vertebral y cómo mejorarla hoy.',
    category: 'Ergonomía',
    date: '1 Oct 2025',
    readTime: '5 min',
    slug: 'posturas-dormir-espalda',
    emoji: '🏥',
    author: 'Dra. Elena Santos',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 5,
    title: 'Temperatura ideal para dormir mejor',
    excerpt: 'Por qué la temperatura de tu habitación es clave para un sueño reparador profundo.',
    category: 'Bienestar',
    date: '28 Sep 2025',
    readTime: '4 min',
    slug: 'temperatura-ideal-dormir',
    emoji: '🌡️',
    author: 'María Fernández',
    gradient: 'from-lime-500 to-green-600'
  },
  {
    id: 6,
    title: 'Meditación nocturna para dormir mejor',
    excerpt: 'Técnicas de meditación y mindfulness que te ayudarán a conciliar el sueño más rápido.',
    category: 'Bienestar',
    date: '25 Sep 2025',
    readTime: '6 min',
    slug: 'meditacion-nocturna',
    emoji: '🧘',
    author: 'Sofia Ramírez',
    gradient: 'from-pink-500 to-rose-600'
  }
]