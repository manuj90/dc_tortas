import React from 'react';
import logoChocolate from '../assets/logo/logo_chocolate.svg';

const Navbar = () => {
  return (
    <>
      {/* Capa 1: Fondo Blur Completamente Aislado */}
      <div 
        className="fixed top-0 left-0 w-full h-[120px] z-40 bg-crema/10 backdrop-blur-md pointer-events-none"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)', 
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)' 
        }}
      ></div>
      
      {/* Capa 2: Contenido */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference pointer-events-none text-white">
        {/* Usamos flex-row y justify-between para separar el logo y los links */}
        <div className="flex items-center justify-between px-6 md:px-12 pt-5 pb-2 w-full mx-auto">
          
          {/* Logo a la izquierda */}
          <a href="/" className="pointer-events-auto hover:opacity-80 transition-opacity">
            <img 
              src={logoChocolate} 
              alt="DC Tortas Logo" 
              className="h-8 md:h-10 w-auto brightness-0 invert drop-shadow-sm" 
            />
          </a>
          
          {/* Links a la derecha */}
          <div className="flex space-x-6 md:space-x-10 pointer-events-auto font-jakarta">
            <a href="#nosotros" className="text-[10px] md:text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
              nosotros
            </a>
            <a href="#productos" className="text-[10px] md:text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
              productos
            </a>
            <a href="#contacto" className="text-[10px] md:text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
              contacto
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
