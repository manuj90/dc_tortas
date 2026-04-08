import bowlIcon from '../assets/elementos/chocolate/bowl_chocolate.svg'
import harinaIcon from '../assets/elementos/chocolate/harina_chocolate.svg'
import hornoIcon from '../assets/elementos/chocolate/horno_chocolate.svg'
import huevosIcon from '../assets/elementos/chocolate/huevos_chocolate.svg'

const pillars = [
  { icon: bowlIcon, label: 'mezcla artesanal', description: 'cada preparación se hace a mano, sin atajos.' },
  { icon: harinaIcon, label: 'ingredientes elegidos', description: 'seleccionamos lo mejor para cada receta.' },
  { icon: huevosIcon, label: 'recetas propias', description: 'creaciones originales que nos definen.' },
  { icon: hornoIcon, label: 'horneado con cuidado', description: 'el tiempo y la temperatura justos, siempre.' },
]

export default function Process() {
  return (
    <section className="bg-chocolate py-28 md:py-40 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-20 md:mb-28 max-w-2xl">
          <span className="text-celeste text-xs tracking-[0.35em] uppercase mb-8 block reveal">
            el proceso
          </span>
          <h2 className="text-crema font-black leading-[0.92] text-[clamp(2.5rem,7vw,5.5rem)] reveal">
            cada detalle
            <br />
            <em className="not-italic text-manteca">importa.</em>
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 reveal-stagger">
          {pillars.map(({ icon, label, description }) => (
            <div key={label} className="flex flex-col items-center text-center gap-5">
              <img src={icon} alt={label} className="w-20 h-20" />
              <div>
                <p className="text-crema text-xs font-bold tracking-widest uppercase mb-2">{label}</p>
                <p className="text-crema/90 text-xs leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="mt-20 md:mt-28 h-px bg-crema/8 reveal-line" />

      </div>
    </section>
  )
}
