import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

import ScrollReveal from "../../components/motion/ScrollReveal"
import {
  luxuryEase,
} from "../../components/motion/motion"

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

const nameInitial = {
  opacity: 0,
  scale: 0.985,
  filter: "blur(3px)",
}

const nameAnimate = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
}

const nameTransition = {
  duration: 0.9,
  ease: luxuryEase,
}

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
  bg-transparent
  text-[var(--color-espresso)]
  transition-colors
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
        {/* =================================================
            HEADING: THE WEDDING OF MANUEL & SHARON
            ================================================= */}

        <header className="mb-12 text-center sm:mb-20">
          {/* INTRODUCTION */}

          <motion.p
            initial={nameInitial}
            animate={nameAnimate}
            transition={{
              ...nameTransition,
              duration: prefersReducedMotion ? 0 : 1,
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

          {/* COUPLE'S NAMES */}

          <h1
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
            <motion.span
              initial={nameInitial}
              animate={nameAnimate}
              transition={{
                ...nameTransition,
                duration: prefersReducedMotion ? 0 : 1,
                delay: prefersReducedMotion ? 0 : 0.2,
              }}
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
            </motion.span>

            <motion.span
              initial={nameInitial}
              animate={nameAnimate}
              transition={{
                ...nameTransition,
                duration: prefersReducedMotion ? 0 : 1,
                delay: prefersReducedMotion ? 0 : 0.65,
              }}
              className="
                font-display
                text-[clamp(2rem,7vw,3.8rem)]
                leading-none
              "
              aria-hidden="true"
            >
              &amp;
            </motion.span>

            <motion.span
              initial={nameInitial}
              animate={nameAnimate}
              transition={{
                ...nameTransition,
                duration: prefersReducedMotion ? 0 : 1,
                delay: prefersReducedMotion ? 0 : 1.05,
              }}
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
            </motion.span>
          </h1>

          {/* DIVIDER */}

          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.9,
              ease: luxuryEase,
              delay: prefersReducedMotion ? 0 : 1.45,
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

          {/* MEMORIES TITLE — APPEARS AFTER THE NAMES */}

          <motion.p
            initial={nameInitial}
            animate={nameAnimate}
            transition={{
              ...nameTransition,
              duration: prefersReducedMotion ? 0 : 1,
              delay: prefersReducedMotion ? 0 : 1.7,
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

        {/* =================================================
            PINTEREST-STYLE MASONRY GALLERY
            ================================================= */}

        <section
          aria-label="Pre-wedding photoshoot gallery"
          className="
            columns-2
            gap-3
            sm:gap-5
            lg:columns-3
            lg:gap-6
            [contain:layout_paint]
          "
        >
          {memories.map((memory, index) => (
            <ScrollReveal
              key={memory.src}
              once
              delay={index * 0.12}
              className="
                mb-3
                break-inside-avoid
                sm:mb-5
                lg:mb-6
              "
            >
              <button
                type="button"
                aria-label={`View pre-wedding photo ${index + 1} of ${memories.length}`}
                onClick={() => setActiveIndex(index)}
                className="
                  group
                  relative
                  block
                  w-full
                  cursor-zoom-in
                  overflow-hidden
                  rounded-2xl
                  bg-[var(--color-espresso)]
                  shadow-sm
                  transition-shadow
                  duration-500
                  hover:shadow-lg
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[var(--color-caramel)]
                  motion-reduce:transition-none
                "
              >
                <img
                  src={memory.src}
                  alt={memory.alt}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="
                    block
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.025]
                    motion-reduce:transition-none
                  "
                  style={{ height: `${memory.height}px` }}
                  sizes="(max-width: 1023px) 50vw, 33vw"
                />

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-black/0
                    transition-colors
                    duration-700
                    group-hover:bg-black/[0.06]
                  "
                />
              </button>
            </ScrollReveal>
          ))}
        </section>
      </div>

      {/* =================================================
          LIGHTBOX
          ================================================= */}

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key="memories-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.4,
              ease: luxuryEase,
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
              p-6
              backdrop-blur-sm
            "
            role="dialog"
            aria-modal="true"
            aria-label="Pre-wedding photo viewer"
          >
            {/* DOWNLOAD — LEFT EDGE */}

            <a
              href={memories[activeIndex].src}
              download={`manuel-sharon-memory-${String(
                activeIndex + 1,
              ).padStart(2, "0")}.webp`}
              onClick={(event) => event.stopPropagation()}
              aria-label="Download photo"
              title="Download photo"
              className={`
                group
                ${controlClass}
                absolute
                left-6
                top-6
                z-20
                sm:left-8
                sm:top-8
              `}
            >
              <ArrowDownToLine
                size={18}
                strokeWidth={1.6}
                className="text-current"
              />
            </a>

            {/* CLOSE — RIGHT EDGE */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                closeLightbox()
              }}
              aria-label="Close photo viewer"
              title="Close"
              className={`
                group
                ${controlClass}
                absolute
                right-6
                top-6
                z-20
                sm:right-8
                sm:top-8
              `}
            >
              <X
                size={18}
                strokeWidth={1.6}
                className="text-current"
              />
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
                transition-colors
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

            {/* ACTIVE PHOTO — FULL IMAGE */}

            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={memories[activeIndex].src}
                src={memories[activeIndex].src}
                alt={memories[activeIndex].alt}
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        scale: 0.985,
                        opacity: 0,
                        filter: "blur(3px)",
                      }
                }
                animate={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : {
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                      }
                }
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                        scale: 0.985,
                        opacity: 0,
                        filter: "blur(3px)",
                      }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  ease: luxuryEase,
                }}
                onClick={(event) => event.stopPropagation()}
                className="
                  max-h-[85vh]
                  max-w-full
                  select-none
                  rounded-2xl
                  object-contain
                  shadow-sm
                  sm:max-w-[calc(100vw-12rem)]
                "
                style={{ willChange: "transform, opacity, filter" }}
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
                transition-colors
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