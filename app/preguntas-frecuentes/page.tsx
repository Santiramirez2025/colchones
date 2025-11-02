'use client'

import { HelpCircle, Package, Truck, Shield, Wrench, Calendar, ChevronDown, Search, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function PreguntasFrecuentesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openCategory, setOpenCategory] = useState('todos')
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const categories = [
    { id: 'todos', label: 'Todas', icon: HelpCircle },
    { id: 'producto', label: 'Producto', icon: Package },
    { id: 'envio', label: 'Envío', icon: Truck },
    { id: 'uso', label: 'Uso y cuidado', icon: Wrench },
    { id: 'garantia', label: 'Garantía', icon: Shield }
  ]

  const faqs = [
    {
      category: 'producto',
      question: '¿Qué partes tiene un colchón?',
      answer: 'Un colchón se compone de: núcleo (la parte interna que da soporte), acolchado (capas de confort sobre el núcleo), funda exterior (tejido que recubre el colchón) y, en algunos casos, refuerzos perimetrales para mayor durabilidad en los bordes.'
    },
    {
      category: 'producto',
      question: '¿Qué es un acolchado?',
      answer: 'El acolchado son las capas superiores del colchón que proporcionan confort y suavidad inicial. Puede incluir materiales como viscoelástica, fibras, gel o espumas que mejoran la adaptabilidad y sensación de acogida del colchón.'
    },
    {
      category: 'producto',
      question: '¿Cómo diferenciar la cara de verano de la cara de invierno?',
      answer: 'Los colchones con dos caras suelen indicarlo en la etiqueta. La cara de verano tiene tejidos más frescos y transpirables, mientras que la de invierno incorpora materiales más acogedores. Si tu colchón no especifica caras estacionales, es de una sola cara de uso.'
    },
    {
      category: 'producto',
      question: 'Tengo sobrepeso, ¿puedo comprar cualquier colchón?',
      answer: 'Para personas con sobrepeso recomendamos colchones de firmeza media-alta o alta, con mayor densidad en el núcleo y mejor soporte. Es importante verificar el peso máximo recomendado por el fabricante. Contáctanos para asesoramiento personalizado.'
    },
    {
      category: 'producto',
      question: '¿Cuál debe ser la medida de mi colchón?',
      answer: 'El colchón debe medir exactamente lo mismo que tu somier o base. Las medidas estándar son: individual 90x190cm, matrimonio 135x190cm o 150x190cm, y queen/king 160x200cm o 180x200cm. Mide tu base antes de comprar.'
    },
    {
      category: 'envio',
      question: '¿Cómo se envían los colchones?',
      answer: 'Los colchones se envían enrollados y comprimidos al vacío en cajas, lo que facilita el transporte y la entrega. Este método no afecta la calidad del colchón. Una vez desembalado, recupera su forma original en pocas horas.'
    },
    {
      category: 'envio',
      question: '¿Cuánto tiempo puede estar enrollado mi colchón?',
      answer: 'Recomendamos desenrollar el colchón dentro de las 2-3 semanas posteriores a recibirlo, aunque puede permanecer enrollado hasta 2 meses sin problema. Cuanto antes lo desempaques, antes podrás disfrutarlo.'
    },
    {
      category: 'envio',
      question: '¿Cuándo se considera que un colchón está enviado en mal estado?',
      answer: 'Si al recibirlo presenta roturas en la funda, manchas, deformaciones evidentes o defectos visibles. Es importante revisar el paquete en presencia del transportista y rechazarlo si está dañado. Contáctanos inmediatamente si detectas algún problema.'
    },
    {
      category: 'envio',
      question: '¿Me recogen el colchón antiguo?',
      answer: 'La recogida del colchón antiguo no está incluida en nuestro servicio estándar. Puedes gestionarla a través del servicio de recogida de voluminosos de tu ayuntamiento o contratar un servicio privado de retirada de enseres.'
    },
    {
      category: 'uso',
      question: '¿Cómo tengo que desenrollar mi colchón?',
      answer: 'Coloca la caja sobre la base o somier, abre con cuidado, retira el plástico protector y deja que el colchón se expanda naturalmente. No uses objetos punzantes cerca del colchón. La expansión completa tarda 24-48 horas, aunque puedes usarlo antes.'
    },
    {
      category: 'uso',
      question: '¿Cuánto tiempo debo esperar antes de su primer uso?',
      answer: 'Puedes usarlo tras 2-4 horas de expansión, aunque es ideal esperar 24 horas para que recupere completamente su forma y se airee. Durante las primeras noches puede tener un ligero olor a nuevo que desaparece rápidamente.'
    },
    {
      category: 'uso',
      question: '¿Se puede poner funda a los colchones?',
      answer: 'Sí, es muy recomendable usar un protector o funda transpirable. Esto protege el colchón de manchas, ácaros y sudor, prolongando su vida útil. Asegúrate de que sea transpirable para no afectar la ventilación del colchón.'
    },
    {
      category: 'uso',
      question: '¿Cómo debo cuidar mi colchón?',
      answer: 'Usa protector de colchón, ventila la habitación diariamente, aspira la superficie mensualmente, gíralo 180° cada 3 meses (si es de doble cara), no saltes sobre él y evita doblarlo o exponerlo al sol directo. Limpia manchas inmediatamente con paño húmedo.'
    },
    {
      category: 'uso',
      question: '¿Cómo debe medirse la altura de mi colchón?',
      answer: 'La altura se mide desde la base hasta el punto más alto, incluyendo el acolchado. Es importante para verificar que encaje con tu somier, canapé o ropa de cama. La mayoría de colchones tienen entre 18-30cm de altura.'
    },
    {
      category: 'uso',
      question: '¿Puedo dar la vuelta a mi colchón?',
      answer: 'Solo si es de doble cara. Los colchones modernos suelen ser de una sola cara de uso. Verifica la etiqueta: si indica "No turn" o tiene acolchado solo superior, no debes voltear. Sí puedes girarlo 180° (pies-cabeza) cada 3 meses.'
    },
    {
      category: 'uso',
      question: 'Mi colchón está un poco hundido, ¿qué hago?',
      answer: 'Si es nuevo, puede ser asentamiento normal durante los primeros meses. Si el hundimiento supera los 2cm o lleva más de 6 meses, contacta con nosotros para valorar garantía. Asegúrate de que tu base proporciona soporte adecuado.'
    },
    {
      category: 'garantia',
      question: '¿Cada cuánto tengo que cambiar mi colchón?',
      answer: 'Se recomienda cambiar el colchón cada 8-10 años, aunque depende del uso y calidad. Señales para cambiarlo: deformaciones visibles, falta de soporte, despertarte con dolores, o si notas que descansas peor que antes.'
    },
    {
      category: 'garantia',
      question: '¿Cuánto tiempo de prueba tengo?',
      answer: 'Ofrecemos garantía legal de 3 años por defectos de fabricación. No incluimos periodo de prueba de satisfacción, pero puedes ejercer tu derecho de desistimiento dentro de los 14 días naturales desde la recepción, siempre que el producto esté sin usar y en su embalaje original.'
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = openCategory === 'todos' || faq.category === openCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-2xl mb-6 border border-violet-500/30">
            <HelpCircle className="w-10 h-10 text-violet-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Preguntas frecuentes
          </h1>
          <p className="text-zinc-400 text-lg">
            Encuentra respuestas a las dudas más comunes sobre nuestros colchones
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar pregunta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setOpenCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                openCategory === cat.id
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10 hover:border-violet-500/30'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-500 text-lg">No se encontraron preguntas</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl overflow-hidden hover:border-violet-500/30 transition-all"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                >
                  <span className="font-semibold text-white text-lg">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-violet-400 flex-shrink-0 transition-transform ${
                      openQuestion === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openQuestion === index && (
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/30 rounded-2xl p-8 text-center">
          <MessageCircle className="w-12 h-12 text-violet-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-zinc-400 mb-6">
            Nuestro equipo está listo para ayudarte con cualquier duda
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-violet-500/30"
          >
            Contactar con soporte
          </a>
        </div>

        {/* Quick Tips */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <Calendar className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Envío en 3-6 días</h3>
            <p className="text-sm text-zinc-400">Entrega rápida a toda la península</p>
          </div>
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <Shield className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="font-bold text-white mb-2">3 años de garantía</h3>
            <p className="text-sm text-zinc-400">Cobertura contra defectos de fabricación</p>
          </div>
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <MessageCircle className="w-8 h-8 text-violet-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Atención personalizada</h3>
            <p className="text-sm text-zinc-400">Te ayudamos a elegir el colchón ideal</p>
          </div>
        </div>
      </div>
    </div>
  )
}