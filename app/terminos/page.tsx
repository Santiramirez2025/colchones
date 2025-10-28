export default function TerminosPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          Términos y Condiciones
        </h1>

        <div className="prose prose-lg max-w-none space-y-8">
          <p className="text-gray-600">
            Última actualización: Octubre 2025
          </p>

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar este sitio web, aceptas estar sujeto a estos términos 
              y condiciones de uso, todas las leyes y regulaciones aplicables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Compra de Productos</h2>
            <p>
              Al realizar una compra en Descanso Premium:
            </p>
            <ul>
              <li>Confirmas que tienes al menos 18 años</li>
              <li>Proporcionas información veraz y actualizada</li>
              <li>Aceptas los precios mostrados al momento de la compra</li>
              <li>Recibirás confirmación por email</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Envíos y Entregas</h2>
            <p>
              Entregamos en toda España peninsular en 24-48 horas laborables. 
              El envío es gratuito para pedidos superiores a 500€.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Política de Devoluciones</h2>
            <p>
              Ofrecemos 100 noches de prueba. Si no estás satisfecho, puedes 
              devolver el producto sin coste adicional dentro de este periodo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Garantía</h2>
            <p>
              Todos nuestros productos tienen 10 años de garantía contra 
              defectos de fabricación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio web, incluyendo textos, imágenes, 
              logos y diseños, es propiedad de Descanso Premium y está protegido 
              por las leyes de propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Limitación de Responsabilidad</h2>
            <p>
              Descanso Premium no será responsable de daños indirectos, 
              incidentales o consecuentes derivados del uso de nuestros productos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Ley Aplicable</h2>
            <p>
              Estos términos se rigen por la legislación española. 
              Cualquier disputa se resolverá en los tribunales de Madrid.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contacto</h2>
            <p>
              Para cualquier pregunta sobre estos términos:
              <br />
              Email: legal@descansopremium.es
              <br />
              Teléfono: +34 900 123 456
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
