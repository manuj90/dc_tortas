import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import FloatingUI from './components/FloatingUI'
import Opening from './components/Opening'
import Atmosphere from './components/Atmosphere'
import Highlight from './components/Highlight'
import Process from './components/Process'
import Creations from './components/Creations'
import Closing from './components/Closing'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    })

    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      // Fade + lift reveals
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Staggered children reveals
      gsap.utils.toArray('.reveal-stagger').forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 35,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Image / media reveals
      gsap.utils.toArray('.reveal-img').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.97,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Decorative line grow
      gsap.utils.toArray('.reveal-line').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.4,
          ease: 'power3.inOut',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      })

      // Opening video parallax
      const video = document.querySelector('[data-parallax-video]')
      const opening = document.querySelector('[data-opening]')
      if (video && opening) {
        gsap.to(video, {
          y: '22vh',
          ease: 'none',
          scrollTrigger: {
            trigger: opening,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Opening content entrance (on load, no scrollTrigger)
      const openingContent = document.querySelector('[data-opening-content]')
      if (openingContent) {
        gsap.from(openingContent.children, {
          opacity: 0,
          y: 40,
          duration: 1.3,
          stagger: 0.18,
          delay: 0.5,
          ease: 'power3.out',
        })
      }
    })

    document.fonts.ready.then(() => ScrollTrigger.refresh())

    return () => {
      lenis.destroy()
      ctx.revert()
      delete window.__lenis
    }
  }, [])

  return (
    <div className="bg-crema font-jakarta overflow-x-hidden">
      <FloatingUI />
      <Opening />
      <Atmosphere />
      <Highlight />
      <Process />
      <Creations />
      <Closing />
    </div>
  )
}
