import cutVideoMp4 from '../assets/video/cut.mp4'
import cutVideoWebm from '../assets/video/cut.webm'

export default function Highlight() {
  return (
    <section className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]" style={{ minHeight: '90vh' }}>

        {/* Video / image — left, edge-to-edge */}
        <div className="relative overflow-hidden reveal-img" style={{ minHeight: '55vw', maxHeight: '90vh' }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={cutVideoWebm} type="video/webm" />
            <source src={cutVideoMp4} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-chocolate/20" />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-crema/10 hidden md:block" />
          <div className="absolute bottom-6 left-6 md:hidden">
            <span className="text-crema/70 text-xs tracking-widest uppercase">
              torta de temporada
            </span>
          </div>
        </div>

        {/* Text — right */}
        <div className="flex flex-col justify-center px-8 py-16 md:px-14 md:py-20 bg-crema">
          <span className="text-[#4B260C] text-xs tracking-[0.35em] uppercase mb-6 block reveal">
            nuestra especialidad
          </span>

          <h3 className="text-chocolate font-black leading-[0.92] mb-8 text-[clamp(1.8rem,4vw,3.5rem)] reveal">
            torta
            <br />
            <em className="not-italic text-celeste">napoleón.</em>
          </h3>

          <p className="text-chocolate/85 text-sm leading-relaxed max-w-[260px] mb-10 reveal">
            un clásico inolvidable. finas capas de masa de hojaldre crujiente,
            intercaladas con una suave crema pastelera a la vainilla.
          </p>

          <div className="reveal">
            <a
              href="#pedido"
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById('pedido')
                if (el) window.__lenis?.scrollTo(el, { duration: 2 })
              }}
              className="inline-flex items-center gap-4 text-chocolate text-sm font-bold tracking-[0.3em] uppercase group"
            >
              <span>encargala</span>
              <span className="block h-px bg-chocolate w-8 group-hover:w-16 transition-all duration-500 ease-in-out" />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
