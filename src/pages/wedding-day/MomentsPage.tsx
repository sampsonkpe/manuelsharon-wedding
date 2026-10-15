
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

import {
  cinematicInitial,
  cinematicAnimate,
  cinematicTransition,
  luxuryEase,
  staggerSmall,
} from "../../components/motion/motion"

const easeSilk: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
]

const memories = [
  {
    src: "/images/memories-01.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
  },
  {
    src: "/images/memories-02.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
  },
  {
    src: "/images/memories-03.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
  },
  {
    src: "/images/memories-04.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
  },
  {
    src: "/images/memories-05.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
  },
  {
    src: "/images/memories-06.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
  },
  {
    src: "/images/memories-07.webp",
    alt: "Manuel and Sharon during their pre-wedding photoshoot.",
  },
]

const controlClass = `
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
  transition-colors
  duration-300
  hover:border-[var(--color-caramel)]
  hover:bg-[var(--color-caramel)]
  hover:text-white
  focus-visible:outline
  focus-visible:outline-2
  focus-visible:outline-offset-4
  focus-visible:outline-[var(--color-caramel)]
  motion-reduce:transition-none
`

export default function MomentsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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
        {/* WEDDING HEADING */}

        <motion.header
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          className="mb-12 text-center sm:mb-20"
        >
          <motion.p
            variants={{
              hidden: {
                opacity: 0,
                y: 10,
                filter: "blur(4px)",
              },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              },
            }}
            transition={{
              duration: 1.1,
              ease: luxuryEase,
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

          <h1
            className="
              mt-7
              flex
              flex-col
              items-center
              text-center
              text-[var(--color-espresso)]
            "
          >
            <motion.span
              variants={{
                hidden: {
                  opacity: 0,
                  y: 14,
                  filter: "blur(5px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                },
              }}
              transition={{
                duration: 1.3,
                ease: luxuryEase,
              }}
              className="
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
              aria-hidden="true"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 8,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 1,
                ease: luxuryEase,
              }}
              className="
                font-display
                text-[clamp(2rem,7vw,3.8rem)]
                leading-none
              "
            >
              &amp;
            </motion.span>

            <motion.span
              variants={{
                hidden: {
                  opacity: 0,
                  y: 14,
                  filter: "blur(5px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                },
              }}
              transition={{
                duration: 1.3,
                ease: luxuryEase,
              }}
              className="
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

          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 1,
              delay: 1,
              ease: luxuryEase,
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

          {/* MEMORIES TITLE */}

          <motion.p
            initial={{
              opacity: 0,
              y: 12,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.2,
              delay: 1.2,
              ease: luxuryEase,
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
        </motion.header>

        {/* PINTEREST-STYLE MASONRY GALLERY */}

        <section
          aria-label="Pre-wedding photoshoot gallery"
          className="
            columns-2
            gap-3
            sm:gap-5
            lg:columns-3
            lg:gap-6
          "
        >
          {memories.map((memory, index) => (
            <motion.button
              key={memory.src}
              type="button"
              aria-label={`View photo ${index + 1} of ${memories.length}`}
              onClick={() => setActiveIndex(index)}
              initial={{
                opacity: 0,
                y: 22,
                filter: "blur(5px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{
                once: true,
                amount: 0.08,
              }}
              transition={{
                duration: 1.1,
                delay: (index % 3) * 0.12,
                ease: luxuryEase,
              }}
              whileHover={{
                scale: 1.015,
              }}
              className="
                mb-3
                block
                w-full
                break-inside-avoid
                overflow-hidden
                rounded-2xl
                shadow-sm
                transition-shadow
                duration-500
                hover:shadow-lg
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-[var(--color-caramel)]
                sm:mb-5
                lg:mb-6
                motion-reduce:transform-none
              "
            >
              <img
                src={memory.src}
                alt={memory.alt}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                className="block h-auto w-full"
                sizes="(max-width: 1023px) 50vw, 33vw"
              />
            </motion.button>
          ))}
        </section>
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
              duration: 0.35,
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
              pt-[calc(env(safe-area-inset-top)+5rem)]
              pb-[calc(env(safe-area-inset-bottom)+2rem)]
              backdrop-blur-sm
              sm:p-8
            "
            role="dialog"
            aria-modal="true"
            aria-label="Pre-wedding photo viewer"
          >
            {/* DOWNLOAD: LEFT SIDE */}

            <a
              href={memories[activeIndex].src}
              download={`manuel-sharon-memory-${String(
                activeIndex + 1,
              ).padStart(2, "0")}.webp`}
              onClick={(event) => event.stopPropagation()}
              aria-label="Download photo"
              title="Download photo"
              className={`
                ${controlClass}
                absolute
                left-5
                top-[calc(env(safe-area-inset-top)+1rem)]
                z-20
                sm:left-8
                sm:top-8
              `}
            >
              <ArrowDownToLine size={18} strokeWidth={1.6} />
            </a>

            {/* CLOSE: RIGHT SIDE */}

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                closeLightbox()
              }}
              aria-label="Close photo viewer"
              title="Close"
              className={`
                ${controlClass}
                absolute
                right-5
                top-[calc(env(safe-area-inset-top)+1rem)]
                z-20
                sm:right-8
                sm:top-8
              `}
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
                transition-colors
                duration-300
                hover:border-[var(--color-caramel)]
                hover:bg-[var(--color-caramel)]
                hover:text-white
                sm:left-5
                sm:h-11
                sm:w-11
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
                initial={{
                  scale: 0.97,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.97,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: easeSilk,
                }}
                onClick={(event) => event.stopPropagation()}
                className="
                  block
                  max-h-[calc(85svh-3rem)]
                  max-w-full
                  select-none
                  rounded-2xl
                  object-contain
                  shadow-sm
                  sm:max-h-[85vh]
                  sm:max-w-[calc(100vw-12rem)]
                "
                style={{
                  willChange: "transform, opacity",
                }}
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
