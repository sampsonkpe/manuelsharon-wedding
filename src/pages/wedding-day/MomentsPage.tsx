
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

import ScrollReveal from "../../components/motion/ScrollReveal"
import { luxuryEase } from "../../components/motion/motion"

const easeSilk: [number, number, number, number] = [0.22, 1, 0.36, 1]

const memories = [
  {
    src: "/images/memories-01.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
    height: 320,
  },
  {
    src: "/images/memories-02.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
    height: 240,
  },
  {
    src: "/images/memories-03.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
    height: 290,
  },
  {
    src: "/images/memories-04.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
    height: 350,
  },
  {
    src: "/images/memories-05.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
    height: 250,
  },
  {
    src: "/images/memories-06.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
    height: 310,
  },
  {
    src: "/images/memories-07.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
    height: 270,
  },
]

const controlClass = `
  group
  flex
  h-10
  w-10
  shrink-0
  items-center
  justify-center
  rounded-full
  border
  border-[var(--color-espresso)]
  bg-[var(--color-background)]/40
  text-[var(--color-espresso)]
  backdrop-blur-sm
  transition-all
  duration-300
  hover:border-[var(--color-caramel)]
  hover:bg-[var(--color-caramel)]
  hover:text-white
  focus-visible:outline
  focus-visible:outline-2
  focus-visible:outline-offset-3
  focus-visible:outline-[var(--color-caramel)]
  motion-reduce:transition-none
`

const headingTransition = {
  duration: 1.1,
  ease: luxuryEase,
}

export default function MomentsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const closeLightbox = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + memories.length) % memories.length,
    )
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null
        ? null
        : (current + 1) % memories.length,
    )
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox()
      if (event.key === "ArrowLeft") showPrevious()
      if (event.key === "ArrowRight") showNext()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeIndex, closeLightbox, showNext, showPrevious])

  const headingInitial = prefersReducedMotion
    ? false
    : { opacity: 0, y: 10, filter: "blur(3px)" }

  const headingAnimate = {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  }

  return (
    <main className="min-h-screen bg-transparent">
      <div
        className="
          relative
          z-20
          mx-auto
          w-full
          max-w-[1400px]
          px-[var(--page-padding)]
          pb-24
          pt-20
          sm:pb-32
          sm:pt-28
        "
      >
        {/* PAGE HEADING */}

        <header className="mb-12 text-center sm:mb-20">
          <motion.p
            initial={headingInitial}
            animate={headingAnimate}
            transition={{
              ...headingTransition,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
            className="
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-[var(--color-muted)]
              sm:text-base
            "
          >
            The Wedding of
          </motion.p>

          <motion.h1
            initial={headingInitial}
            animate={headingAnimate}
            transition={{
              ...headingTransition,
              delay: prefersReducedMotion ? 0 : 0.3,
            }}
            className="
              mt-7
              flex
              w-full
              flex-col
              items-center
              justify-center
              overflow-visible
              text-center
              text-[var(--color-espresso)]
            "
          >
            <span
              className="
                inline-block
                px-[0.12em]
                font-display
                text-[clamp(4.5rem,16vw,9rem)]
                leading-none
                whitespace-nowrap
              "
            >
              Manuel
            </span>

            <span
              className="
                font-display
                text-[clamp(2rem,7vw,3.8rem)]
                leading-none
              "
              aria-hidden="true"
            >
              &amp;
            </span>

            <span
              className="
                inline-block
                px-[0.12em]
                font-display
                text-[clamp(4.5rem,16vw,9rem)]
                leading-none
                whitespace-nowrap
              "
            >
              Sharon
            </span>
          </motion.h1>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              ...headingTransition,
              delay: prefersReducedMotion ? 0 : 0.75,
            }}
            className="
              mx-auto
              mt-8
              h-px
              w-8
              origin-center
              bg-[var(--color-caramel)]
              sm:mt-10
            "
          />

          <motion.p
            initial={headingInitial}
            animate={headingAnimate}
            transition={{
              ...headingTransition,
              delay: prefersReducedMotion ? 0 : 0.95,
            }}
            className="
              mt-7
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.24em]
              text-[var(--color-espresso)]
              sm:mt-8
              sm:text-base
            "
          >
            Memories
          </motion.p>
        </header>

        {/* MASONRY GALLERY — PRIVEN'S ORIGINAL STRUCTURE */}

        <ScrollReveal once>
          <section
            aria-label="Pre-wedding photoshoot gallery"
            className="
              columns-2
              md:columns-3
              gap-3
              space-y-3
              [contain:layout_paint]
            "
          >
            {memories.map((memory, index) => (
              <motion.button
                key={memory.src}
                type="button"
                aria-label={`View pre-wedding photo ${index + 1} of ${memories.length}`}
                className="
                  block
                  break-inside-avoid
                  overflow-hidden
                  rounded-2xl
                  w-full
                  shadow-sm
                  hover:shadow-lg
                  transition-shadow
                  duration-300
                "
                style={{ height: memory.height }}
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                transition={{
                  duration: 0.2,
                  ease: easeSilk,
                }}
                onClick={() => setActiveIndex(index)}
              >
                <img
                  src={memory.src}
                  alt={memory.alt}
                  className="block w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </motion.button>
            ))}
          </section>
        </ScrollReveal>
      </div>

      {/* LIGHTBOX */}

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key="memories-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: easeSilk,
            }}
            onClick={closeLightbox}
            className="
              fixed
              inset-0
              z-[100]
              flex
              items-center
              justify-center
              bg-[var(--color-background)]/95
              p-4
              pt-[calc(env(safe-area-inset-top)+4.5rem)]
              pb-[calc(env(safe-area-inset-bottom)+1rem)]
              backdrop-blur-sm
              sm:p-6
            "
            role="dialog"
            aria-modal="true"
            aria-label="Pre-wedding photo viewer"
          >
            {/* DOWNLOAD — LEFT SIDE */}

            <a
              href={memories[activeIndex].src}
              download={`manuel-sharon-memory-${String(
                activeIndex + 1,
              ).padStart(2, "0")}.webp`}
              onClick={(event) => event.stopPropagation()}
              aria-label="Download photo"
              title="Download photo"
              className={`${controlClass} absolute left-5 top-[calc(env(safe-area-inset-top)+1rem)] z-20 sm:left-8 sm:top-8`}
            >
              <ArrowDownToLine size={18} strokeWidth={1.6} />
            </a>

            {/* CLOSE — RIGHT SIDE */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                closeLightbox()
              }}
              aria-label="Close photo viewer"
              title="Close"
              className={`${controlClass} absolute right-5 top-[calc(env(safe-area-inset-top)+1rem)] z-20 sm:right-8 sm:top-8`}
            >
              <X size={18} strokeWidth={1.6} />
            </button>

            {/* PREVIOUS PHOTO */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                showPrevious()
              }}
              aria-label="Previous photo"
              title="Previous photo"
              className="
                absolute
                left-1
                top-1/2
                z-10
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[var(--color-caramel)]/50
                bg-[var(--color-background)]/40
                text-[var(--color-espresso)]
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-[var(--color-caramel)]
                hover:bg-[var(--color-caramel)]
                hover:text-white
                sm:left-5
                sm:h-11
                sm:w-11
                motion-reduce:transition-none
              "
            >
              <ChevronLeft size={21} strokeWidth={1.5} />
            </button>

            {/* ACTIVE PHOTO */}

            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={memories[activeIndex].src}
                src={memories[activeIndex].src}
                alt={memories[activeIndex].alt}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { scale: 0.96, opacity: 0 }
                }
                animate={{ scale: 1, opacity: 1 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { scale: 0.96, opacity: 0 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  ease: easeSilk,
                }}
                onClick={(event) => event.stopPropagation()}
                className="
                  max-h-full
                  max-w-full
                  select-none
                  rounded-2xl
                  object-contain
                  shadow-sm
                  sm:max-w-[calc(100vw-12rem)]
                "
                style={{ willChange: "transform, opacity" }}
                draggable={false}
              />
            </AnimatePresence>

            {/* NEXT PHOTO */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                showNext()
              }}
              aria-label="Next photo"
              title="Next photo"
              className="
                absolute
                right-1
                top-1/2
                z-10
                flex
                h-10
                w-10
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-[var(--color-caramel)]/50
                bg-[var(--color-background)]/40
                text-[var(--color-espresso)]
                backdrop-blur-sm
                transition-all
                duration-300
                hover:border-[var(--color-caramel)]
                hover:bg-[var(--color-caramel)]
                hover:text-white
                sm:right-5
                sm:h-11
                sm:w-11
                motion-reduce:transition-none
              "
            >
              <ChevronRight size={21} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
