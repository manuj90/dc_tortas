import { useState } from 'react'
import ProductCard from './pages/ProductCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 selection:bg-celeste selection:text-chocolate">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-manteca/40 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-celeste/30 rounded-full blur-[80px]"></div>
      </div>

      <div className="max-w-4xl w-full space-y-12 text-center relative z-10">
        
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black font-jakarta tracking-tight drop-shadow-sm">
            dc tortas.
          </h1>
          <p className="text-xl md:text-3xl font-medium max-w-2xl mx-auto leading-relaxed opacity-80">
            horneando dulzura todos los días.
          </p>
        </div>

        <ProductCard />
      </div>
    </div>
  )
}

export default App
