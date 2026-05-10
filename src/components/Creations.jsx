import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import frambuesaRosasAvif from '../assets/images/frambuesaRosas.avif'
import frambuesaRosasWebp from '../assets/images/frambuesaRosas.webp'
import frambuesaRosasJpg from '../assets/images/frambuesaRosas.jpg'
import frambuesaRosasPng from '../assets/images/frambuesaRosas.png'

import maracuyaAvif from '../assets/images/maracuya.avif'
import maracuyaWebp from '../assets/images/maracuya.webp'
import maracuyaJpg from '../assets/images/maracuya.jpg'
import maracuyaPng from '../assets/images/maracuya.png'

import brownieAvif from '../assets/images/brownie.avif'
import brownieWebp from '../assets/images/brownie.webp'
import brownieJpg from '../assets/images/brownie.jpg'
import browniePng from '../assets/images/brownie.png'

import lavandaAvif from '../assets/images/lavanda.avif'
import lavandaWebp from '../assets/images/lavanda.webp'
import lavandaJpg from '../assets/images/lavanda.jpg'
import lavandaPng from '../assets/images/lavanda.png'

import redvelvetAvif from '../assets/images/redvelvet.avif'
import redvelvetWebp from '../assets/images/redvelvet.webp'
import redvelvetJpg from '../assets/images/redvelvet.jpg'
import redvelvetPng from '../assets/images/redvelvet.png'

import pistachoAvif from '../assets/images/Pistacho.avif'
import pistachoWebp from '../assets/images/Pistacho.webp'
import pistachoJpg from '../assets/images/Pistacho.jpg'
import pistachoPng from '../assets/images/Pistacho.png'

import vanillaAvif from '../assets/images/vanilla.avif'
import vanillaWebp from '../assets/images/vanilla.webp'
import vanillaJpg from '../assets/images/vanilla.jpg'
import vanillaPng from '../assets/images/vanilla.png'

// Shared tile — fills whatever container it's placed in
const Tile = ({ name, note, bg, gradient, images }) => (
  <div className={`relative w-full h-full overflow-hidden group ${bg}`}>
    {images && (
      <picture className="absolute inset-0 w-full h-full">
        <source srcSet={images.avif} type="image/avif" />
        <source srcSet={images.webp} type="image/webp" />
        <source srcSet={images.jpg} type="image/jpeg" />
        <img src={images.png} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </picture>
    )}
    <div className={`absolute inset-0 bg-linear-to-br ${gradient} to-transparent z-10 mix-blend-multiply opacity-50`} />
    <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-chocolate/80 group-hover:to-chocolate/90 transition-colors duration-600 z-10" />
    <div className="absolute inset-[10px] border border-crema/30 z-20 pointer-events-none" />
    <div className="absolute inset-0 flex items-end p-4 md:p-5 z-20 pointer-events-none">
      <div>
        <h4 className="text-crema font-bold text-[13px] md:text-sm leading-snug mb-0.5 drop-shadow-md">
          {name}
        </h4>
        <p className="text-crema/90 text-xs tracking-wide drop-shadow-md">{note}</p>
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
          <span className="text-[#4B260C] text-xs tracking-[0.35em] uppercase mb-5 block reveal">
            más creaciones
          </span>
          <h2 className="text-chocolate font-black leading-[0.92] text-[clamp(2.2rem,6vw,4.5rem)] reveal">
            hechas para
            <br />
            <em className="not-italic text-celeste">ser recordadas.</em>
          </h2>
        </div>
        <span className="hidden md:block text-chocolate/70 text-xs tracking-[0.3em] uppercase pb-1 reveal">
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
              images={{ avif: frambuesaRosasAvif, webp: frambuesaRosasWebp, jpg: frambuesaRosasJpg, png: frambuesaRosasPng }}
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
                images={{ avif: maracuyaAvif, webp: maracuyaWebp, jpg: maracuyaJpg, png: maracuyaPng }}
              />
            </div>
            <div className="flex-1 min-h-0">
              <Tile
                name="brownie de chocolate belga"
                note="intenso y húmedo."
                bg="bg-chocolate/10"
                gradient="from-chocolate/6"
                images={{ avif: brownieAvif, webp: brownieWebp, jpg: brownieJpg, png: browniePng }}
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
              images={{ avif: lavandaAvif, webp: lavandaWebp, jpg: lavandaJpg, png: lavandaPng }}
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
                images={{ avif: redvelvetAvif, webp: redvelvetWebp, jpg: redvelvetJpg, png: redvelvetPng }}
              />
            </div>
            <div className="flex-1 min-h-0">
              <Tile
                name="torta de pistacho y miel"
                note="sutil y sofisticada."
                bg="bg-celeste/17"
                gradient="from-celeste/10"
                images={{ avif: pistachoAvif, webp: pistachoWebp, jpg: pistachoJpg, png: pistachoPng }}
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
              images={{ avif: vanillaAvif, webp: vanillaWebp, jpg: vanillaJpg, png: vanillaPng }}
            />
          </div>

        </div>
      </div>

      {/* Footer note */}
      <div className="px-6 md:px-16 mt-9 md:mt-11">
        <div className="h-px bg-chocolate/10 reveal-line" />
        <p className="mt-5 text-chocolate/70 text-xs tracking-[0.3em] uppercase reveal">
          el menú varía según la temporada · consultanos por más sabores
        </p>
      </div>

    </section>
  )
}
