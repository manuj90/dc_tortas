import React, { useEffect, useRef, useState } from 'react';
import cakeVideoMp4 from '../assets/video/cake.mp4';
import cakeVideoWebm from '../assets/video/cake.webm';
import logoCeleste from '../assets/logo/logo_celeste.svg';
import logoChocolate from '../assets/logo/logo_chocolate.svg';
import logoCrema from '../assets/logo/logo_crema.svg';
import logoManteca from '../assets/logo/logo_manteca.svg';

const logos = [logoCeleste, logoChocolate, logoCrema, logoManteca];
// Velocidades para los 4 ciclos (en milisegundos)
// Ciclo 1: Rápido (150ms)
// Ciclo 2: Medio (400ms)
// Ciclo 3: Lento (900ms)
// Ciclo 4: Muy lento (1800ms)
const cycleSpeeds = [400, 600, 800, 1000];

const Hero = () => {
  const videoRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0, scrollY: 0 });
  const [logoStep, setLogoStep] = useState(0);

  useEffect(() => {
    // Animación del logo en ciclos
    const currentCycle = Math.floor(logoStep / 4);
    const speed = cycleSpeeds[currentCycle];

    const logoTimer = setTimeout(() => {
      setLogoStep((prev) => (prev + 1) % 16);
    }, speed);

    return () => clearTimeout(logoTimer);
  }, [logoStep]);

  useEffect(() => {
    const attemptPlay = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };
    attemptPlay();

    const interactionEvents = ['scroll', 'mousemove', 'click', 'touchstart'];
    interactionEvents.forEach(evt => window.addEventListener(evt, attemptPlay, { once: true }));

    let scrollReq, mouseReq;
    
    const handleScroll = () => {
      if (scrollReq) cancelAnimationFrame(scrollReq);
      scrollReq = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setOffset(prev => ({ ...prev, scrollY: currentScrollY }));
        // Simplificado: Se eliminó el modificador de velocidad (playbackRate)
        // porque su manipulación generaba un comportamiento tosco durante el scroll.
      });
    };
    
    const handleMouseMove = (e) => {
      if (mouseReq) cancelAnimationFrame(mouseReq);
      mouseReq = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30; 
        const y = (e.clientY / window.innerHeight - 0.5) * 30; 
        setOffset(prev => ({ ...prev, x, y }));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-crema">
      {/* Contenedor Parallax y Video con Zoom Pasivo */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{
          transform: `translate3d(${offset.x}px, calc(${offset.y}px + ${offset.scrollY * 0.4}px), 0) scale(1.15)`
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-cover animate-slow-zoom"
        >
          <source src={cakeVideoWebm} type="video/webm" />
          <source src={cakeVideoMp4} type="video/mp4" />
        </video>
      </div>

      {/* Overlay general ajustado por el usuario */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/15 z-10 pointer-events-none"></div>

      {/* Sombra Matemática Estratégica: Oscurece EXCLUSIVAMENTE el techo para que el mix-blend-difference de la Navbar se vuelva Blanco de alto contraste y no gris piedra */}
      <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none"></div>

      {/* Contenedor Principal Ajustado al Navbar */}
      <div className="relative z-20 w-full mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between">
        {/* Lado Izquierdo: Textos y Botón */}
        <div className="flex-1 flex flex-col items-start justify-center space-y-8 text-crema mt-20 md:mt-0">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-jakarta tracking-tight drop-shadow-md leading-tight text-manteca">
              horneando <br /> dulzura
            </h1>
            <p className="text-xl md:text-3xl font-medium max-w-xl opacity-90 drop-shadow-sm">
              todos los días para acompañar tus mejores momentos.
            </p>
          </div>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-crema text-chocolate px-8 py-4 rounded-full text-xl md:text-2xl font-bold hover:bg-celeste hover:text-manteca transition-colors duration-300 font-jakarta shadow-lg"
          >
            hacé tu pedido
          </a>
        </div>

        {/* Lado Derecho: Logo Animado */}
        <div className="flex-1 flex items-center justify-center md:justify-end mt-12 md:mt-0">
          <div className="relative w-48 h-48 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {logos.map((logo, index) => (
              <img 
                key={index}
                src={logo} 
                alt={`DC Tortas Logo ${index}`} 
                className={`absolute top-0 right-0 w-full h-full drop-shadow-2xl transition-opacity duration-150 ease-in-out ${
                  index === (logoStep % 4) ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
