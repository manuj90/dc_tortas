import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import logoCrema from '../assets/logo/logo_crema.svg'

export default function FloatingUI() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [pastOpening, setPastOpening] = useState(false)

  // Refs for animated elements
  const overlayRef    = useRef(null)
  const menuLogoRef   = useRef(null)
  const navListRef    = useRef(null)  // <ul> — children are the <li> items
  const menuFooterRef = useRef(null)

  // Active timeline ref — lets us kill a running anim before starting the opposite
  const tlRef = useRef(null)

  // If user triggered a scroll-to from within the menu, store the target here
  // and execute it in the close timeline's onComplete (once Lenis restarts)
  const pendingScrollTarget = useRef(null)

  // ── Set initial GSAP states before first paint ─────────────────────────────
  useLayoutEffect(() => {
    gsap.set(overlayRef.current,  { autoAlpha: 0 })
    gsap.set(menuLogoRef.current, { opacity: 0, y: -10 })
    gsap.set(menuFooterRef.current, { opacity: 0 })
    if (navListRef.current?.children) {
      gsap.set(Array.from(navListRef.current.children), { opacity: 0, y: 30 })
    }
  }, [])

  // ── Scroll position → show/hide floating logo ──────────────────────────────
  useEffect(() => {
    const onScroll = () => setPastOpening(window.scrollY > window.innerHeight * 0.7)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Open / close animation choreography ────────────────────────────────────
  useEffect(() => {
    if (!overlayRef.current || !navListRef.current) return

    const navItems = Array.from(navListRef.current.children)

    if (menuOpen) {
      window.__lenis?.stop()

      // Kill any running close timeline
      tlRef.current?.kill()

      // Always reset content to starting positions so open feels consistent
      gsap.set(navItems,            { opacity: 0, y: 30 })
      gsap.set(menuLogoRef.current, { opacity: 0, y: -10 })
      gsap.set(menuFooterRef.current, { opacity: 0 })

      // ── Open sequence ──
      // 1. Background fades in
      // 2. Logo settles in from above
      // 3. Nav links rise into place with stagger
      // 4. Footer line fades last
      const tl = gsap.timeline()
      tlRef.current = tl

      tl.to(overlayRef.current, {
          autoAlpha: 1,
          duration: 0.45,
          ease: 'power2.out',
        })
        .to(menuLogoRef.current, {
          opacity: 0.45,
          y: 0,
          duration: 0.55,
          ease: 'power3.out',
        }, '-=0.28')
        .to(navItems, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power3.out',
        }, '-=0.42')
        .to(menuFooterRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, '-=0.3')

    } else {
      // Skip on initial mount — overlay is already hidden
      const currentAlpha = parseFloat(
        overlayRef.current.style.opacity ?? window.getComputedStyle(overlayRef.current).opacity
      )
      if (currentAlpha === 0 && gsap.getProperty(overlayRef.current, 'visibility') === 'hidden') return

      // Kill any running open timeline
      tlRef.current?.kill()

      // ── Close sequence ──
      // 1. Footer fades out first
      // 2. Nav links exit upward with stagger
      // 3. Logo lifts out
      // 4. Background fades — Lenis restarts when done
      const tl = gsap.timeline({
        onComplete: () => {
          // Reset nav items y so next open starts from below
          gsap.set(navItems,            { y: 30 })
          gsap.set(menuLogoRef.current, { y: -10 })

          window.__lenis?.start()

          // Execute any pending scroll-to request
          if (pendingScrollTarget.current) {
            const el = document.getElementById(pendingScrollTarget.current)
            if (el) window.__lenis?.scrollTo(el, { offset: -60, duration: 1.8 })
            pendingScrollTarget.current = null
          }
        },
      })
      tlRef.current = tl

      tl.to(menuFooterRef.current, {
          opacity: 0,
          duration: 0.15,
          ease: 'power2.in',
        })
        .to(navItems, {
          opacity: 0,
          y: -16,
          duration: 0.28,
          stagger: 0.045,
          ease: 'power2.in',
        }, '-=0.05')
        .to(menuLogoRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.22,
          ease: 'power2.in',
        }, '-=0.16')
        .to(overlayRef.current, {
          autoAlpha: 0,
          duration: 0.38,
          ease: 'power2.inOut',
        }, '-=0.1')
    }
  }, [menuOpen])

  // ── Cleanup ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => tlRef.current?.kill()
  }, [])

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const openMenu  = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)

  const scrollTo = (id) => {
    pendingScrollTarget.current = id
    closeMenu()
  }

  return (
    <>
      {/* ── Floating logo — appears after scrolling past opening ─────────── */}
      <div
        className="fixed top-6 left-6 md:top-8 md:left-10 z-50 transition-opacity duration-700"
        style={{
          opacity: pastOpening && !menuOpen ? 1 : 0,
          pointerEvents: pastOpening && !menuOpen ? 'auto' : 'none',
        }}
      >
        <img
          src={logoCrema}
          alt="dc tortas"
          className="h-6 brightness-0 mix-blend-screen"
        />
      </div>

      {/* ── Hamburger / close trigger ────────────────────────────────────── */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'cerrar menú' : 'abrir menú'}
        aria-expanded={menuOpen}
        className="fixed top-6 right-6 md:top-8 md:right-10 z-50 flex flex-col gap-[5px] p-2 mix-blend-difference"
      >
        <span
          className={`block h-px bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'
          }`}
        />
        <span
          className={`block h-px bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? 'opacity-0' : 'w-4'
          }`}
        />
        <span
          className={`block h-px bg-white transition-all duration-300 ease-in-out ${
            menuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'
          }`}
        />
      </button>

      {/* ── Full-screen overlay — GSAP owns visibility, not CSS classes ──── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-chocolate flex flex-col justify-between"
        aria-hidden={!menuOpen}
      >
        {/* Logo */}
        <div
          ref={menuLogoRef}
          className="px-8 md:px-16 pt-10 md:pt-14"
        >
          <img src={logoCrema} alt="dc tortas" className="h-7" />
        </div>

        {/* Nav links */}
        <nav className="px-8 md:px-16">
          <ul ref={navListRef} className="space-y-5 md:space-y-7">
            {[
              { label: 'nuestra historia',    id: 'atmosphere' },
              { label: 'nuestras creaciones', id: 'creations'  },
              { label: 'hacer un pedido',     id: 'pedido'     },
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

        {/* Footer */}
        <div
          ref={menuFooterRef}
          className="px-8 md:px-16 pb-10 md:pb-14 border-t border-crema/10 pt-6"
        >
          <p className="text-crema/70 text-xs tracking-[0.35em] uppercase">
            buenos aires · repostería artesanal
          </p>
        </div>
      </div>
    </>
  )
}
