import logoCrema from '../assets/logo/logo_crema.svg'

export default function Closing() {
  return (
    <section id="pedido" className="bg-chocolate py-28 md:py-40 px-6 md:px-16 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.04] bg-linear-to-l from-celeste to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Logo */}
        <div className="mb-16 md:mb-20 reveal">
          <img src={logoCrema} alt="dc tortas" className="h-7 opacity-40" />
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-14 md:mb-16">
          <h2 className="text-crema font-black leading-[0.9] text-[clamp(2.8rem,9vw,7rem)] mb-7 reveal">
            ¿tenés una
            <br />
            <em className="not-italic text-manteca">celebración</em>
            <br />
            en mente?
          </h2>
          <p className="text-crema/90 text-sm md:text-base leading-relaxed max-w-xs md:max-w-sm reveal">
            contanos qué necesitás y creamos juntos la torta perfecta para ese momento especial.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-24 md:mb-32 reveal">
          <a
            href="https://wa.me/5491100000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-manteca text-chocolate text-sm font-bold tracking-[0.3em] uppercase px-9 py-5 hover:bg-crema transition-colors duration-300 text-center"
          >
            hacer un pedido
          </a>
          <a
            className="inline-block border border-crema/20 text-crema text-sm font-bold tracking-[0.3em] uppercase px-9 py-5 hover:border-crema/50 transition-colors duration-300 text-center"
          >
            escribinos
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-crema/8 pt-7">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3 text-crema/70 text-xs tracking-[0.3em] uppercase">
            <span>buenos aires, argentina</span>
            <span>@dctortas</span>
            <span>© 2025 dc tortas</span>
          </div>
        </div>

      </div>
    </section>
  )
}
