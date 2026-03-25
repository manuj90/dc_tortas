import { useState } from 'react'
import ProductCard from './pages/ProductCard'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />

      <main className="w-full relative">
        
        {/* HERO - Crema */}
        <section 
          id="hero" 
          className="min-h-screen flex flex-col items-center justify-center p-6 bg-crema text-chocolate selection:bg-celeste selection:text-chocolate relative"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] bg-manteca/40 rounded-full blur-[80px]"></div>
          </div>
          <div className="relative z-10 text-center space-y-4 pt-24 text-chocolate">
            <h1 className="text-6xl md:text-8xl font-black font-jakarta tracking-tight drop-shadow-sm">
              horneando dulzura
            </h1>
            <p className="text-xl md:text-3xl font-medium max-w-2xl mx-auto leading-relaxed opacity-80">
              todos los días.
            </p>
          </div>
        </section>

        {/* NOSOTROS - Celeste */}
        <section 
          id="nosotros" 
          className="min-h-screen flex flex-col items-center justify-center p-6 bg-celeste text-chocolate"
        >
          <div className="max-w-4xl text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">nuestra historia.</h2>
            <p className="text-xl md:text-2xl font-medium opacity-80 leading-relaxed max-w-2xl mx-auto">
              somos una pareja apasionada por la pastelería. desde nuestra cocina familiar,
              traemos los sabores más dulces para acompañar tus mejores momentos.
            </p>
          </div>
        </section>

        {/* PRODUCTOS - Chocolate */}
        <section 
          id="productos" 
          className="min-h-screen flex flex-col items-center justify-center p-6 bg-chocolate text-crema"
        >
          <div className="max-w-4xl w-full text-center space-y-12">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">nuestros clásicos.</h2>
            <div className="flex justify-center">
              <ProductCard />
            </div>
          </div>
        </section>

        {/* CONTACTO - Manteca */}
        <section 
          id="contacto" 
          className="min-h-screen flex flex-col items-center justify-center p-6 bg-manteca text-chocolate"
        >
          <div className="max-w-4xl text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tight">hacé tu pedido.</h2>
            <p className="text-xl md:text-3xl font-medium opacity-80 leading-relaxed max-w-2xl mx-auto pb-10">
              escribinos y armamos la torta perfecta para tu próximo festejo.
            </p>
            <a href="mailto:hola@dctortas.com" className="bg-chocolate text-crema px-10 py-5 rounded-full text-2xl font-bold hover:bg-opacity-90 transition-all font-jakarta">
              enviar mensaje
            </a>
          </div>
        </section>

      </main>

      {/* FOOTER - Crema */}
      <footer className="w-full bg-crema text-chocolate py-12 text-center border-t border-chocolate/10 pb-20">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="font-bold text-2xl font-jakarta">dc tortas.</p>
          <p className="opacity-70">Hecho con ♥ para los amantes de lo dulce.</p>
        </div>
      </footer>
    </>
  )
}

export default App
