import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Nosotros from './components/Nosotros'
import Productos from './components/Productos'
import Contacto from './components/Contacto'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const horizontalWrapRef = useRef(null)
  const horizontalContainerRef = useRef(null)

  useEffect(() => {
    // Lenis Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    
    gsap.ticker.lagSmoothing(0)

    // GSAP y ScrollTrigger con Context de GSAP (la forma oficial para React para evitar duplicados y desfasajes de DOM)
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(horizontalContainerRef.current.children);
      
      gsap.to(horizontalContainerRef.current, {
        // Enlaza la cantidad de secciones por el 100% dividido el ancho total. Matemáticamente perfecto pase lo que pase.
        xPercent: -100 * (sections.length - 1) / sections.length,
        ease: 'none',
        scrollTrigger: {
          trigger: horizontalWrapRef.current,
          pin: true,
          scrub: true,
          // La distancia de scroll = Cantidad de pantallas ocultas * el ancho visible
          end: () => '+=' + (window.innerWidth * (sections.length - 1)),
          invalidateOnRefresh: true,
        }
      });
    });

    return () => {
      lenis.destroy();
      ctx.revert(); // Mata rigurosamente todas las animaciones y triggers de GSAP
    };
  }, [])

  return (
    <>
      <Navbar />
      
      <main className="w-full relative overflow-x-hidden">
        {/* Contenedor que será bloqueado (pin) en pantalla mientras se scrollea horizontalmente */}
        <div ref={horizontalWrapRef} className="w-full h-screen overflow-hidden">
          
          {/* Fila súper ancha que contiene Hero, Nosotros y Productos */}
          <div 
            ref={horizontalContainerRef} 
            className="flex flex-nowrap w-[300vw] h-screen will-change-transform"
          >
            <div className="w-screen h-screen flex-shrink-0">
              <Hero />
            </div>
            
            <div className="w-screen h-screen flex-shrink-0">
              <Nosotros />
            </div>
            
            <div className="w-screen h-screen flex-shrink-0">
              <Productos />
            </div>
          </div>
          
        </div>

        {/* Contacto sigue fluyendo verticalmente normal después del contenedor horizontal */}
        <Contacto />
      </main>
      
      {/* FOOTER - Crema */}
      <footer className="w-full bg-crema text-chocolate py-12 text-center border-t border-chocolate/10 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-bold text-2xl font-jakarta">dc tortas.</p>
          <p className="opacity-70">Hecho con ♥ para los amantes de lo dulce.</p>
        </div>
      </footer>
    </>
  )
}

export default App
