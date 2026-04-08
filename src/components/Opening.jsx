import cakeVideoWebm from '../assets/video/cake.webm'
import cakeVideoMp4 from '../assets/video/cake.mp4'
import logoCrema from '../assets/logo/logo_crema.svg'

export default function Opening() {
  return (
    <section
      data-opening
      className="relative overflow-hidden"
      style={{ height: '100dvh', minHeight: '100vh' }}
    >
      {/* Video — oversized to allow parallax without gaps */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          data-parallax-video
          autoPlay
          muted
          loop
          playsInline
          className="absolute left-0 w-full object-cover"
          style={{ top: '-20%', height: '140%' }}
        >
          <source src={cakeVideoWebm} type="video/webm" />
          <source src={cakeVideoMp4} type="video/mp4" />
        </video>
      </div>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-chocolate/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-chocolate/75 via-chocolate/15 to-transparent" />

      {/* Content — bottom aligned, left margin */}
      <div
        data-opening-content
        className="relative z-10 h-full flex flex-col justify-end px-6 pb-16 md:px-16 md:pb-20 max-w-[1400px] mx-auto"
      >
        <div className="flex flex-col gap-2 mb-7">
          <img
            src={logoCrema}
            alt="dc tortas"
            className="h-6 w-auto object-contain object-left opacity-90"
          />
          <span className="text-crema/80 text-xs font-semibold tracking-[0.4em] uppercase drop-shadow-md">
            repostería artesanal
          </span>
        </div>

        <h1 className="text-crema font-black leading-[0.9] mb-6 text-[clamp(3rem,9vw,7.5rem)]">
          cada torta,
          <br />
          <em className="not-italic text-manteca">una historia.</em>
        </h1>

        <p className="text-crema/60 text-sm md:text-base leading-relaxed max-w-[280px] md:max-w-xs mb-10">
          creaciones dulces, hechas a mano,
          <br />
          pensadas para tu celebración.
        </p>

        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <a
            href="#pedido"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('pedido')
              if (el) window.__lenis?.scrollTo(el, { duration: 2 })
            }}
            className="inline-block bg-manteca text-chocolate text-sm font-bold tracking-[0.3em] uppercase px-7 py-4 hover:bg-crema transition-colors duration-300"
          >
            hacé tu pedido
          </a>
          <span className="text-crema/70 text-xs tracking-[0.25em] uppercase hidden sm:block">
            o seguí explorando ↓
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-14 bg-crema animate-scroll-pulse" />
      </div>
    </section>
  )
}
