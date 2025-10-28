export default function PrivacidadPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Política de Privacidad
        </h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-gray-600">
            Última actualización: Octubre 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Información que Recopilamos</h2>
            <p>
              En Descanso Premium, recopilamos la siguiente información:
            </p>
            <ul>
              <li>Datos de identificación personal (nombre, email, teléfono)</li>
              <li>Dirección de envío y facturación</li>
              <li>Información de pago (procesada de forma segura por Stripe)</li>
              <li>Historial de compras y preferencias</li>
              <li>Datos de navegación y cookies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Uso de la Información</h2>
            <p>
              Utilizamos tu información para:
            </p>
            <ul>
              <li>Procesar y enviar tus pedidos</li>
              <li>Mejorar nuestros productos y servicios</li>
              <li>Enviarte comunicaciones relevantes (si has dado tu consentimiento)</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Protección de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger 
              tus datos personales contra acceso no autorizado, pérdida o alteración.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Tus Derechos</h2>
            <p>
              De acuerdo con el RGPD, tienes derecho a:
            </p>
            <ul>
              <li>Acceder a tus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento</li>
              <li>Portabilidad de datos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p>
              Utilizamos cookies para mejorar tu experiencia. Puedes gestionar tus 
              preferencias en nuestra página de cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Contacto</h2>
            <p>
              Para cualquier consulta sobre privacidad, contáctanos en:
              <br />
              Email: privacidad@descansopremium.es
              <br />
              Teléfono: +34 900 123 456
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
