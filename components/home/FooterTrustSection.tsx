'use client'

import { motion } from 'framer-motion'
import { TRUST_FOOTER } from '@/lib/product-data'

export function FooterTrustSection() {
  return (
    <section 
      className="py-16 bg-zinc-950 border-t border-white/5"
      aria-label="Garantías y seguridad"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {TRUST_FOOTER.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-4">
                <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-white font-bold mb-1">{item.title}</h3>
              <p className="text-zinc-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}