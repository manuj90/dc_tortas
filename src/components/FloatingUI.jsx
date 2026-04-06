import { useState, useEffect } from 'react'
import logoCrema from '../assets/logo/logo_crema.svg'

export default function FloatingUI() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastOpening, setPastOpening] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setPastOpening(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      window.__lenis?.stop()
    } else {
      window.__lenis?.start()
    }
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.getElementById(id)
      if (el) window.__lenis?.scrollTo(el, { offset: -60, duration: 1.8 })
    }, 400)
  }

  return (
    <>
      {/* Floating logo — appears after scrolling past opening */}
      <div
        className="fixed top-6 left-6 md:top-8 md:left-10 z-50 transition-all duration-700"
        style={{ opacity: pastOpening && !menuOpen ? 1 : 0, pointerEvents: pastOpening && !menuOpen ? 'auto' : 'none' }}
      >
        <img
          src={logoCrema}
          alt="dc tortas"
          className="h-6 brightness-0 mix-blend-screen"
        />
      </div>

      {/* Menu trigger — always visible */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'cerrar menú' : 'abrir menú'}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-50 flex flex-col gap-[5px] p-2 group mix-blend-difference"
      >
        <span
          className={`block h-px bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'
          }`}
        />
        <span
          className={`block h-px bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? 'opacity-0 w-6' : 'w-4'
          }`}
        />
        <span
          className={`block h-px bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'
          }`}
        />
      </button>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-chocolate flex flex-col justify-between transition-all duration-500 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top: logo */}
        <div className="px-8 md:px-16 pt-8 md:pt-12">
          <img src={logoCrema} alt="dc tortas" className="h-7 opacity-50" />
        </div>

        {/* Center: nav items */}
        <nav className="px-8 md:px-16 py-12">
          <ul className="space-y-6 md:space-y-8">
            {[
              { label: 'nuestra historia', id: 'atmosphere' },
              { label: 'nuestras creaciones', id: 'creations' },
              { label: 'hacer un pedido', id: 'pedido' },
            ].map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="text-left text-crema font-black leading-none hover:text-manteca transition-colors duration-300 text-[clamp(2rem,8vw,5rem)]"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom: tagline */}
        <div className="px-8 md:px-16 pb-8 md:pb-12 border-t border-crema/10 pt-6">
          <p className="text-crema/25 text-xs tracking-[0.3em] uppercase">
            buenos aires · repostería artesanal
          </p>
        </div>
      </div>
    </>
  )
}
