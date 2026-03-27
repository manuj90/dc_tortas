import React from 'react';
import logoChocolate from '../assets/logo/logo_chocolate.svg';

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 mix-blend-difference w-[92%] md:w-auto md:min-w-[700px] pointer-events-none">
      {/* El bg-white ahora se mezcla con la página entera porque el padre tiene el blend-mode */}
      <div className="flex items-center justify-between px-6 py-3 md:px-8 md:py-4 bg-white rounded-full pointer-events-auto transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Logo a la izquierda - Black para que sea un 'recorte' (Knockout) */}
        <a href="/" className="shrink-0 hover:opacity-80 transition-opacity">
          <img 
            src={logoChocolate} 
            alt="DC Tortas Logo" 
            className="h-7 md:h-10 w-auto brightness-0" 
          />
        </a>
        
        {/* Links a la derecha - Black para efecto recorte */}
        <div className="flex items-center space-x-1 md:space-x-2 font-jakarta ml-auto">
          <a 
            href="#nosotros" 
            className="text-[10px] md:text-xs font-black tracking-widest uppercase text-black px-4 py-2.5 rounded-full hover:bg-black/10 transition-all duration-300"
          >
            nosotros
          </a>
          <a 
            href="#productos" 
            className="text-[10px] md:text-xs font-black tracking-widest uppercase text-black px-4 py-2.5 rounded-full hover:bg-black/10 transition-all duration-300"
          >
            productos
          </a>
          <a 
            href="#contacto" 
            className="text-[10px] md:text-xs font-black tracking-widest uppercase px-4 py-2.5 rounded-full border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 ml-2 md:ml-4"
          >
            contacto
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
