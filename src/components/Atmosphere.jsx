export default function Atmosphere() {
  return (
    <section
      id="atmosphere"
      className="py-28 md:py-40 px-6 md:px-16"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.55fr] gap-16 md:gap-20 items-center">

          {/* Text */}
          <div>
            <span className="text-celeste text-[10px] tracking-[0.35em] uppercase mb-8 block reveal">
              nuestra historia
            </span>

            <h2 className="text-chocolate font-black leading-[0.92] mb-10 text-[clamp(2.2rem,7vw,5.5rem)] reveal">
              lo hacemos
              <br />
              todo con
              <br />
              <em className="not-italic text-celeste">nuestras manos.</em>
            </h2>

            <div className="space-y-4 text-chocolate/60 text-sm md:text-base leading-relaxed max-w-sm reveal">
              <p>
                cada torta nace de una receta propia, de ingredientes cuidadosamente
                elegidos y de horas de trabajo artesanal.
              </p>
              <p>
                no somos una fábrica. somos una pastelería que cree en el poder
                de un dulce bien hecho.
              </p>
            </div>

            <div className="mt-12">
              <div className="h-px bg-chocolate/15 reveal-line" />
              <p className="mt-5 text-chocolate/30 text-[10px] tracking-[0.35em] uppercase reveal">
                desde 2018 · buenos aires
              </p>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="reveal-img">
            <div
              className="relative overflow-hidden bg-manteca/25"
              style={{ aspectRatio: '3/4' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-manteca/30 via-transparent to-celeste/15" />
              {/* Subtle inner frame */}
              <div className="absolute inset-3 border border-chocolate/6" />
              <div className="absolute inset-0 flex items-end p-6">
                <span className="text-chocolate/20 text-[9px] tracking-widest uppercase">
                  fotografía · próximamente
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
