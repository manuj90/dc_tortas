import React from 'react';
import logoManteca from '../assets/logo/logo_manteca.svg';

const Nosotros = () => {
  return (
    <section id="nosotros" className="relative w-full h-screen flex items-center justify-center bg-celeste text-chocolate overflow-hidden px-8 md:px-16 lg:px-24">
      
      {/* Marca de agua gigante flotando en el fondo del carril */}
      <img 
        src={logoManteca} 
        alt="DC Decoración" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1400px] opacity-20 pointer-events-none select-none blur-[2px]"
      />

      {/* Contenedor Maestro */}
      <div className="relative z-10 w-full max-w-[1400px] h-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 pt-20 md:pt-0">
        
        {/* COLUMNA IZQUIERDA: Textos y Títulos */}
        <div className="flex-1 space-y-6 md:space-y-8">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black font-jakarta tracking-tighter leading-[0.9]">
            del horno <br />
            <span className="text-manteca drop-shadow-sm">a tu mesa.</span>
          </h2>
          
          <div className="space-y-4 text-base md:text-xl font-medium opacity-90 max-w-lg leading-relaxed">
            <p>
              Empezamos con una receta familiar y el sueño de hacer los fines de semana un poquito más dulces. Hoy, cada torta que sale de nuestra cocina lleva esa misma esencia artesanal intacta.
            </p>
            <p>
              No usamos premezclas ni conservantes. Elegimos la mejor manteca, el chocolate más puro y le dedicamos el tiempo exacto de horneado a cada pedido único. Porque sabemos muy bien que alrededor de nuestras tortas, se celebran tus momentos irrepetibles.
            </p>
          </div>
          
          {/* Detalle decorativo fino */}
          <div className="pt-2 md:pt-6">
            <div className="w-16 md:w-32 h-[3px] bg-chocolate rounded-full"></div>
          </div>
        </div>

        {/* COLUMNA DERECHA: Gráfica / Foto asimétrica estilo Revista */}
        <div className="flex-1 w-full max-w-[500px] h-[40vh] md:h-[65vh] relative group cursor-pointer mt-8 md:mt-0">
          
          {/* Capa de Sombra Decorativa Desfasada (Efecto revista física) */}
          <div className="absolute inset-2 md:inset-4 bg-manteca/60 rounded-[3rem] md:rounded-[5rem] rounded-tl-xl md:rounded-tl-2xl transform rotate-3 transition-transform duration-700 ease-out group-hover:rotate-6 group-hover:scale-[1.02]"></div>
          
          {/* Contenedor Real de Imagen */}
          <div className="absolute inset-0 bg-crema rounded-[3rem] md:rounded-[5rem] rounded-tl-xl md:rounded-tl-2xl overflow-hidden shadow-2xl flex items-center justify-center border-4 md:border-8 border-white border-opacity-30 transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:-translate-x-2">
            
            {/* ⚠️ Placeholder: Acá podés poner una etiqueta <img> o imagen de CSS tuya */}
            <div className="absolute inset-0 bg-chocolate/5 flex flex-col items-center justify-center">
               <span className="font-jakarta font-black text-chocolate/30 text-xl md:text-3xl uppercase tracking-widest text-center px-6">
                 [ FOTO ]
               </span>
               <span className="font-jakarta font-medium text-chocolate/40 text-sm md:text-base text-center px-6 mt-2">
                 Torta / Proceso Artesanal
               </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Nosotros;
