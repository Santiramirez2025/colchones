'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Sparkles, Phone, User, Star, Shield, Clock, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 50], [0.95, 1])
  const headerShadow = useTransform(scrollY, [0, 50], [0, 1])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/simulador', label: 'Test AI', highlight: true },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/comparador', label: 'Comparar' },
    { href: '/blog', label: 'Guía del Sueño' },
  ]

  return (
    <>
      {/* Top Bar - Trust Elements */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-50 via-white to-sky-50 border-b border-gray-100"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-xs">
            <div className="hidden md:flex items-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-gray-700 font-medium"
              >
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span><strong className="text-gray-900">4.9/5</strong> • +3,000 clientes</span>
              </motion.div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hecho en España</span>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Envío 24-48h gratis</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-auto">
              <Link 
                href="/garantia" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium hidden sm:block"
              >
                Garantía de confort
              </Link>
              <a 
                href="tel:+34900123456" 
                className="flex items-center gap-1.5 text-gray-700 hover:text-indigo-600 transition-colors font-semibold"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">900 123 456</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header 
        style={{ 
          opacity: headerOpacity as any,
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.04), 0 8px 16px rgba(99,102,241,0.06)' : 'none'
        }}
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b transition-all duration-300 ${
          scrolled ? 'border-gray-200' : 'border-transparent'
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="group relative flex-shrink-0">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2.5"
              >
                <div className="relative">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-4.5 h-4.5 text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-lg bg-indigo-400/20 blur-md -z-10"
                  />
                </div>
                <div>
                  <div className="text-lg font-bold leading-none tracking-tight">
                    <span className="text-gray-900">Descanso</span>
                    <span className="text-indigo-600">Premium</span>
                  </div>
                  <div className="text-[9px] text-gray-500 font-medium tracking-wide uppercase mt-0.5">
                    Sleep Technology
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="relative group px-4 py-2"
                >
                  <span className={`font-medium transition-colors ${
                    link.highlight 
                      ? 'text-indigo-600' 
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {link.label}
                  </span>
                  {link.highlight && (
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-indigo-500 rounded-full"
                    />
                  )}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {/* Desktop CTAs */}
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="tel:+34900123456"
                className="hidden xl:flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg font-semibold text-sm transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Asesor personal</span>
              </motion.a>

              {/* User Account */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all"
                aria-label="Cuenta de usuario"
              >
                <User className="w-4.5 h-4.5 text-gray-700" />
              </motion.button>

              {/* Cart */}
              <Link href="/carrito">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all"
                >
                  <ShoppingCart className="w-4.5 h-4.5 text-gray-700" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm border-2 border-white"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>

              {/* Primary CTA */}
              <Link href="/simulador">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-semibold text-sm shadow-sm shadow-indigo-500/25 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Test Gratis</span>
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-gray-50 border border-gray-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="w-5 h-5 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm lg:hidden z-40"
                style={{ top: '108px' }}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-x-0 top-[108px] mx-4 bg-white/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden lg:hidden z-50 max-h-[calc(100vh-140px)] overflow-y-auto"
              >
                <div className="p-6">
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <Link
                      href="/simulador"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/25"
                    >
                      <Sparkles className="w-6 h-6 mb-2" />
                      <span className="text-sm">Test Gratis</span>
                    </Link>
                    <a
                      href="tel:+34900123456"
                      className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg"
                    >
                      <Phone className="w-6 h-6 mb-2" />
                      <span className="text-sm">Llamar ahora</span>
                    </a>
                  </div>

                  {/* Trust Elements Mobile */}
                  <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <div>
                        <div className="text-xs font-bold text-gray-900">4.9/5</div>
                        <div className="text-[10px] text-gray-600">+3K clientes</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="text-xs font-bold text-gray-900">España</div>
                        <div className="text-[10px] text-gray-600">Fabricado</div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center justify-between p-4 rounded-xl font-semibold transition-all ${
                            link.highlight
                              ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>{link.label}</span>
                          {link.highlight && (
                            <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                              Popular
                            </span>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Additional Links */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <Link
                      href="/cuenta"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all font-medium"
                    >
                      <User className="w-5 h-5" />
                      <span>Mi cuenta</span>
                    </Link>
                    <Link
                      href="/garantia"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 p-4 text-gray-700 hover:bg-gray-50 rounded-xl transition-all font-medium"
                    >
                      <Shield className="w-5 h-5" />
                      <span>Garantía de confort</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}