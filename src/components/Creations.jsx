import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// Shared tile — fills whatever container it's placed in
const Tile = ({ name, note, bg, gradient }) => (
  <div className={`relative w-full h-full overflow-hidden group ${bg}`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} to-transparent`} />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-chocolate/10 group-hover:to-chocolate/20 transition-colors duration-600" />
    <div className="absolute inset-[10px] border border-chocolate/[0.055]" />
    <div className="absolute inset-0 flex items-end p-4 md:p-5">
      <div>
        <h4 className="text-chocolate font-bold text-[13px] md:text-sm leading-snug mb-0.5">
          {name}
        </h4>
        <p className="text-chocolate/40 text-[9px] tracking-wide">{note}</p>
      </div>
    </div>
  </div>
)

export default function Creations() {
  const galleryRef = useRef(null)

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    const maxScroll = () => gallery.scrollWidth - gallery.clientWidth

    // --- Wheel → smooth horizontal scroll via quickTo ---
    // quickTo reuses a single tween — no re-instantiation on every event,
    // which gives a cleaner, more continuous feel.
    const quickScroll = gsap.quickTo(gallery, 'scrollLeft', {
      duration: 1.05,
      ease: 'expo.out',
    })

    // Accumulate a target so rapid wheel events don't fight each other
    let wheelTarget = gallery.scrollLeft

    const handleWheel = (e) => {
      // Prefer horizontal delta when present (trackpad two-finger swipe),
      // fall back to vertical for mouse wheels.
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      const atStart = gallery.scrollLeft <= 0
      const atEnd   = gallery.scrollLeft >= maxScroll() - 1

      // If the gallery cannot consume this scroll (already at the boundary in
      // that direction), let the event bubble up to Lenis / the page.
      const wouldScrollLeft  = delta < 0
      const wouldScrollRight = delta > 0
      if ((wouldScrollLeft && atStart) || (wouldScrollRight && atEnd)) return

      // Gallery can scroll — claim the event.
      e.preventDefault()
      e.stopPropagation()

      wheelTarget = Math.max(0, Math.min(wheelTarget + delta * 0.85, maxScroll()))
      quickScroll(wheelTarget)
    }

    // --- Drag / swipe with time-based velocity ---
    let isDragging = false
    let startX = 0
    let startScrollLeft = 0
    let lastX = 0
    let lastTime = 0
    let velocity = 0  // px / ms

    const onPointerDown = (e) => {
      if (e.button !== 0) return
      isDragging = true
      startX = e.clientX
      lastX = e.clientX
      lastTime = performance.now()
      startScrollLeft = gallery.scrollLeft
      velocity = 0
      gallery.setPointerCapture(e.pointerId)
      gallery.style.cursor = 'grabbing'
      gsap.killTweensOf(gallery)
      // Sync the wheel target so there's no jump if wheel was active
      wheelTarget = gallery.scrollLeft
    }

    const onPointerMove = (e) => {
      if (!isDragging) return
      const now = performance.now()
      const dt = now - lastTime
      if (dt > 0) {
        // Exponential smoothing over time — stable even at high framerates
        const raw = (e.clientX - lastX) / dt
        velocity = velocity * 0.75 + raw * 0.25
      }
      lastX = e.clientX
      lastTime = now
      gallery.scrollLeft = startScrollLeft - (e.clientX - startX)
      wheelTarget = gallery.scrollLeft
    }

    const onPointerUp = () => {
      if (!isDragging) return
      isDragging = false
      gallery.style.cursor = 'grab'
      // Convert px/ms velocity → throw distance.
      // Negative because scrollLeft moves opposite to drag direction.
      // Factor 320ms gives a natural-feeling coast without overshot.
      const throwDist = -velocity * 320
      if (Math.abs(throwDist) > 15) {
        const target = Math.max(0, Math.min(gallery.scrollLeft + throwDist, maxScroll()))
        wheelTarget = target
        gsap.to(gallery, {
          scrollLeft: target,
          duration: 1.6,
          ease: 'power4.out',
          overwrite: 'auto',
        })
      }
    }

    gallery.addEventListener('wheel', handleWheel, { passive: false })
    gallery.addEventListener('pointerdown', onPointerDown)
    gallery.addEventListener('pointermove', onPointerMove)
    gallery.addEventListener('pointerup', onPointerUp)
    gallery.addEventListener('pointercancel', onPointerUp)

    return () => {
      gallery.removeEventListener('wheel', handleWheel)
      gallery.removeEventListener('pointerdown', onPointerDown)
      gallery.removeEventListener('pointermove', onPointerMove)
      gallery.removeEventListener('pointerup', onPointerUp)
      gallery.removeEventListener('pointercancel', onPointerUp)
      gsap.killTweensOf(gallery)
    }
  }, [])

  return (
    <section id="creations" className="py-24 md:py-36 overflow-hidden">

      {/* Header */}
      <div className="px-6 md:px-16 mb-9 md:mb-11 flex items-end justify-between">
        <div>
          <span className="text-celeste text-[10px] tracking-[0.35em] uppercase mb-5 block reveal">
            más creaciones
          </span>
          <h2 className="text-chocolate font-black leading-[0.92] text-[clamp(2.2rem,6vw,4.5rem)] reveal">
            hechas para
            <br />
            <em className="not-italic text-celeste">ser recordadas.</em>
          </h2>
        </div>
        <span className="hidden md:block text-chocolate/25 text-[10px] tracking-[0.3em] uppercase pb-1 reveal">
          deslizá →
        </span>
      </div>

      {/* --- Horizontal bento gallery --- */}
      {/*
        Outer wrapper gets the reveal-img entrance animation.
        Inner div is the actual scrollable gallery — keeping them separate
        ensures the scale transform from GSAP doesn't clip overflow.
      */}
      <div className="reveal-img">
        <div
          ref={galleryRef}
          className="flex gap-3 md:gap-4 overflow-x-auto overflow-y-hidden no-scrollbar cursor-grab select-none"
          style={{
            height: 'clamp(400px, 60vh, 540px)',
            paddingLeft: 'clamp(1.5rem, 4vw, 4rem)',
            paddingRight: 'clamp(1.5rem, 4vw, 4rem)',
            overscrollBehaviorX: 'contain',
          }}
        >

          {/* ── Col 1: Single tall — featured ── */}
          <div className="flex-none w-[230px] md:w-[340px] h-full">
            <Tile
              name="torta de frambuesa y rosas"
              note="perfumada, delicada, especial."
              bg="bg-manteca/35"
              gradient="from-manteca/25"
            />
          </div>

          {/* ── Col 2: Two stacked, 58 / 42 split ── */}
          <div className="flex-none w-[195px] md:w-[290px] h-full flex flex-col gap-3 md:gap-4">
            <div className="flex-[1.4] min-h-0">
              <Tile
                name="cheesecake de maracuyá"
                note="tropical, cremosa."
                bg="bg-celeste/20"
                gradient="from-celeste/14"
              />
            </div>
            <div className="flex-1 min-h-0">
              <Tile
                name="brownie de chocolate belga"
                note="intenso y húmedo."
                bg="bg-chocolate/10"
                gradient="from-chocolate/6"
              />
            </div>
          </div>

          {/* ── Col 3: Single tall — slightly narrower ── */}
          <div className="flex-none w-[195px] md:w-[300px] h-full">
            <Tile
              name="torta de limón y lavanda"
              note="fresca, floral, memorable."
              bg="bg-manteca/22"
              gradient="from-manteca/14"
            />
          </div>

          {/* ── Col 4: Two stacked, equal ── */}
          <div className="flex-none w-[178px] md:w-[265px] h-full flex flex-col gap-3 md:gap-4">
            <div className="flex-1 min-h-0">
              <Tile
                name="red velvet con cream cheese"
                note="un clásico reinventado."
                bg="bg-manteca/18"
                gradient="from-manteca/10"
              />
            </div>
            <div className="flex-1 min-h-0">
              <Tile
                name="torta de pistacho y miel"
                note="sutil y sofisticada."
                bg="bg-celeste/17"
                gradient="from-celeste/10"
              />
            </div>
          </div>

          {/* ── Col 5: Single tall — closes the gallery ── */}
          <div className="flex-none w-[205px] md:w-[315px] h-full">
            <Tile
              name="chiffon cake de vainilla"
              note="liviana, aérea, perfecta."
              bg="bg-manteca/28"
              gradient="from-manteca/18"
            />
          </div>

        </div>
      </div>

      {/* Footer note */}
      <div className="px-6 md:px-16 mt-9 md:mt-11">
        <div className="h-px bg-chocolate/10 reveal-line" />
        <p className="mt-5 text-chocolate/30 text-[10px] tracking-[0.3em] uppercase reveal">
          el menú varía según la temporada · consultanos por más sabores
        </p>
      </div>

    </section>
  )
}
