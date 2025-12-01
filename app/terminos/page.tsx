import { FileText, ShoppingBag, Truck, RotateCcw, Shield, Copyright, Scale, Mail, Phone, MessageCircle } from 'lucide-react'

export default function TerminosPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Aceptación de los Términos',
      content: 'Al acceder y utilizar este sitio web (azulcolchones.com), aceptás estar sujeto a estos términos y condiciones de uso, nuestra política de privacidad y todas las leyes aplicables de la República Argentina. Si no estás de acuerdo con estos términos, por favor no utilices nuestro sitio.'
    },
    {
      icon: ShoppingBag,
      title: 'Compra de Productos',
      items: [
        'Debés ser mayor de 18 años para realizar compras',
        'Toda la información proporcionada debe ser veraz y actualizada',
        'Los precios publicados son en pesos argentinos (ARS) e incluyen IVA',
        'Los precios están sujetos a cambios sin previo aviso',
        'Recibirás confirmación de tu pedido por email y/o WhatsApp',
        'La compra se considera finalizada al recibir el pago confirmado'
      ]
    },
    {
      icon: Truck,
      title: 'Envíos y Entregas',
      content: 'Realizamos envíos GRATIS a Villa María, Bell Ville, San Francisco y localidades cercanas. Para el resto de Córdoba y otras provincias, consultá costos de envío por WhatsApp. El tiempo de entrega es de 3-7 días hábiles según la zona. Los productos se envían enrollados y empaquetados al vacío para facilitar el transporte.'
    },
    {
      icon: RotateCcw,
      title: 'Derecho de Arrepentimiento',
      content: 'Según la Ley de Defensa del Consumidor N° 24.240 (Art. 34), tenés derecho a arrepentirte de tu compra dentro de los 10 días corridos desde que recibís el producto. El colchón debe estar sin usar, en su embalaje original y sin daños. Los gastos de devolución corren por cuenta del comprador. Te reintegraremos el importe total dentro de los 5 días hábiles posteriores a recibir el producto en nuestras instalaciones.'
    },
    {
      icon: Shield,
      title: 'Garantía Legal',
      content: 'Todos nuestros colchones cuentan con 3 años de garantía contra defectos de fabricación, según la normativa argentina vigente. La garantía cubre defectos en materiales, costuras y deformaciones superiores a 2cm. NO cubre desgaste normal, manchas, daños por mal uso, o uso con bases inadecuadas. Para hacer válida la garantía, conservá tu factura o comprobante de compra.'
    },
    {
      icon: Scale,
      title: 'Formas de Pago',
      items: [
        'Efectivo (solo en compras presenciales)',
        'Transferencia bancaria (CBU/CVU)',
        'Mercado Pago (hasta 12 cuotas sin interés)',
        'Tarjetas de crédito (hasta 12 cuotas sin interés)',
        'Tarjetas de débito',
        'Los pagos se procesan de forma segura',
        'Emitimos factura A o B según corresponda'
      ]
    },
    {
      icon: Copyright,
      title: 'Propiedad Intelectual',
      content: 'Todo el contenido de este sitio web, incluyendo textos, imágenes, logos, videos, diseños gráficos y código fuente, es propiedad exclusiva de Azul Colchones y está protegido por las leyes de propiedad intelectual de Argentina. Queda prohibida su reproducción, distribución o uso comercial sin autorización expresa por escrito.'
    },
    {
      icon: Scale,
      title: 'Protección de Datos Personales',
      content: 'Tus datos personales serán tratados conforme a la Ley 25.326 de Protección de Datos Personales. Utilizamos tu información únicamente para procesar pedidos, envíos y comunicaciones relacionadas con tu compra. No compartimos ni vendemos tus datos a terceros. Podés solicitar el acceso, modificación o eliminación de tus datos en cualquier momento.'
    },
    {
      icon: Scale,
      title: 'Limitación de Responsabilidad',
      content: 'Azul Colchones no se responsabiliza por: demoras en entregas causadas por terceros (empresas de transporte), daños ocasionados durante el transporte (verificá el paquete al recibirlo), información incorrecta proporcionada por el cliente, o uso inadecuado del producto. Nuestra responsabilidad máxima se limita al valor del producto adquirido.'
    },
    {
      icon: FileText,
      title: 'Facturación',
      content: 'Emitimos factura A o B según tu condición frente a AFIP. Para factura A, necesitamos tu CUIT y razón social. Las facturas se envían por email en formato PDF. Si necesitás factura en papel, solicitala al momento de la compra. Cumplimos con todas las normativas fiscales vigentes en Argentina.'
    },
    {
      icon: Scale,
      title: 'Jurisdicción y Ley Aplicable',
      content: 'Estos términos y condiciones se rigen por las leyes de la República Argentina. Para cualquier controversia o reclamo, las partes se someten a la jurisdicción de los Tribunales Ordinarios de la ciudad de Villa María, Provincia de Córdoba, con renuncia expresa a cualquier otro fuero o jurisdicción que pudiere corresponder.'
    },
    {
      icon: Shield,
      title: 'Defensa del Consumidor',
      content: 'Como consumidor argentino, tenés derechos que te protegen. Podés contactar a la Dirección Provincial de Comercio Interior y Defensa del Consumidor de Córdoba ante cualquier inconveniente. También podés acceder al sitio web oficial de Defensa del Consumidor (argentina.gob.ar/defensadelconsumidor) para conocer todos tus derechos.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-6 border border-cyan-500/30">
            <FileText className="w-10 h-10 text-cyan-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Términos y Condiciones
          </h1>
          <p className="text-zinc-400 text-lg mb-2">Azul Colchones - Villa María, Córdoba</p>
          <p className="text-zinc-500 text-sm">Última actualización: Noviembre 2024</p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/30 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Protección al Consumidor Argentino</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Todos nuestros términos y condiciones están elaborados en conformidad con la 
                <strong className="text-blue-400"> Ley 24.240 de Defensa del Consumidor</strong>, 
                <strong className="text-blue-400"> Ley 25.326 de Protección de Datos Personales</strong> y demás 
                normativas vigentes en la República Argentina. Tus derechos como consumidor están plenamente garantizados.
              </p>
            </div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              
              {section.items ? (
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="text-cyan-400 mt-1 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">¿Preguntas sobre los términos?</h2>
            <p className="text-zinc-300">Estamos en Villa María para ayudarte</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/5493531234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/30"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: 353 123-4567
            </a>
            <a 
              href="mailto:info@azulcolchones.com"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/10"
            >
              <Mail className="w-5 h-5" />
              info@azulcolchones.com
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <a 
            href="https://www.argentina.gob.ar/defensadelconsumidor"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-900 border border-white/10 rounded-xl p-4 hover:border-blue-500/30 transition-all text-center group"
          >
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
              Defensa del Consumidor
            </p>
            <p className="text-xs text-zinc-500 mt-1">Conocé tus derechos</p>
          </a>
          <a 
            href="/politica-privacidad"
            className="bg-zinc-900 border border-white/10 rounded-xl p-4 hover:border-blue-500/30 transition-all text-center group"
          >
            <Scale className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
              Política de Privacidad
            </p>
            <p className="text-xs text-zinc-500 mt-1">Protección de datos</p>
          </a>
          <a 
            href="/preguntas-frecuentes"
            className="bg-zinc-900 border border-white/10 rounded-xl p-4 hover:border-blue-500/30 transition-all text-center group"
          >
            <FileText className="w-8 h-8 text-violet-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-white group-hover:text-violet-400 transition-colors">
              Preguntas Frecuentes
            </p>
            <p className="text-xs text-zinc-500 mt-1">Resolvé tus dudas</p>
          </a>
        </div>

        {/* Footer Note */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 text-center">
          <p className="text-sm text-zinc-400 leading-relaxed">
            <strong className="text-white">Importante:</strong> Al realizar una compra en Azul Colchones, 
            aceptás automáticamente estos términos y condiciones. Te recomendamos leer detenidamente este 
            documento antes de efectuar tu compra. Si tenés alguna duda, no dudes en consultarnos por WhatsApp 
            o visitarnos en nuestro local de Villa María, Córdoba.
          </p>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs text-zinc-500">
              CUIT: XX-XXXXXXXX-X | Razón Social: [Tu Razón Social] | 
              Domicilio Legal: [Tu Dirección], Villa María, Córdoba, Argentina
            </p>
          </div>
        </div>

        {/* Sticky Bottom Bar - Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-cyan-500 p-4 lg:hidden z-50 shadow-2xl">
          <div className="container mx-auto flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-white font-bold text-sm">¿Dudas legales?</p>
              <p className="text-blue-100 text-xs">Consultanos sin cargo</p>
            </div>
            <a
              href="https://wa.me/5493531234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chatear
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}