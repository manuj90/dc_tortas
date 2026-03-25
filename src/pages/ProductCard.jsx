export default function ProductCard() {
  return (
    <article className="max-w-sm bg-crema rounded-lg overflow-hidden shadow-lg shadow-chocolate/5 border border-chocolate transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-chocolate/20">
      
      {/* Contenedor de la fotografía */}
      <div className="w-full h-48 bg-manteca overflow-hidden relative">
        <div className="w-full h-full flex items-center justify-center text-chocolate/40 text-sm">
          [fotografía detalle cálida]
        </div>
      </div>

      <div className="p-6">
        {/* Elementos gráficos funcionales (Stickers limpios) */}
        <div className="flex gap-2 mb-4">
          <span className="bg-manteca text-chocolate font-medium text-xs px-2.5 py-1 rounded-full">
            vegano
          </span>
          <span className="bg-celeste text-crema font-medium text-xs px-2.5 py-1 rounded-full">
            freezer
          </span>
        </div>

        {/* Jerarquía tipográfica estricta */}
        <h3 className="text-celeste font-bold text-xl mb-1.5">
          dc pauline
        </h3>
        <p className="text-chocolate font-regular text-sm leading-relaxed opacity-90">
          franchipan de pistachos + frambuesas + crema
        </p>
      </div>
    </article>
  );
}