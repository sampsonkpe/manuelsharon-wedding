
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"

import {
  cinematicAnimate,
  cinematicInitial,
  cinematicTransition,
  luxuryEase,
  staggerSmall,
} from "../../components/motion/motion"

const memories = [
  {
    src: "/images/memories-01.webp",
    alt: "A moment from Manuel and Sharon's wedding",
  },
  {
    src: "/images/memories-02.webp",
    alt: "Manuel and Sharon's wedding memories",
  },
  {
    src: "/images/memories-03.webp",
    alt: "A captured moment from the wedding day",
  },
  {
    src: "/images/memories-04.webp",
    alt: "A special moment from the celebration",
  },
  {
    src: "/images/memories-05.webp",
    alt: "Manuel and Sharon celebrating their wedding",
  },
  {
    src: "/images/memories-06.webp",
    alt: "A cherished memory from the wedding",
  },
  {
    src: "/images/memories-07.webp",
    alt: "Another beautiful moment from the wedding day",
  },
]

const galleryViewport = {
  once: true,
  amount: 0.08,
}

export default function MomentsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const closeLightbox = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null

      return (current - 1 + memories.length) % memories.length
    })
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null) return null

      return (current + 1) % memories.length
    })
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
        {/* PAGE HEADER */}

        <motion.header
          initial={cinematicInitial}
          animate={cinematicAnimate}
          transition={cinematicTransition}
          className="mb-12 text-center sm:mb-20"
        >
          <p
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
          </p>

          <div
            className="
              relative
              mt-7
              flex
              w-full
              justify-center
              overflow-visible
              px-2
              sm:px-8
            "
          >
            <h1
              className="
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
                initial={{
                  opacity: 0,
                  scale: 0.985,
                  filter: "blur(3px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.9,
                  ease: luxuryEase,
                  delay: staggerSmall,
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
                initial={{
                  opacity: 0,
                  scale: 0.985,
                  filter: "blur(3px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.9,
                  ease: luxuryEase,
                  delay: staggerSmall * 2,
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
                initial={{
                  opacity: 0,
                  scale: 0.985,
                  filter: "blur(3px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.9,
                  ease: luxuryEase,
                  delay: staggerSmall * 3,
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
          </div>

          <div
            className="
              mx-auto
              mt-8
              h-px
              w-8
              bg-[var(--color-caramel)]
              sm:mt-10
            "
          />

          <p
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
          </p>
        </motion.header>

        {/* MASONRY GALLERY */}

        <section
          aria-label="Wedding photo gallery"
          className="
            columns-2
            gap-3
            sm:gap-5
            lg:columns-3
            lg:gap-6
          "
        >
          {memories.map((memory, index) => (
            <motion.figure
              key={memory.src}
              initial={cinematicInitial}
              whileInView={cinematicAnimate}
              viewport={galleryViewport}
              transition={{
                ...cinematicTransition,
                delay: (index % 3) * 0.06,
              }}
              className="
                mb-3
                break-inside-avoid
                sm:mb-5
                lg:mb-6
              "
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open wedding photo ${index + 1} of ${memories.length}`}
                className="
                  group
                  relative
                  block
                  w-full
                  cursor-zoom-in
                  overflow-hidden
                  rounded-sm
                  bg-[var(--color-espresso)]
                  text-left
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[var(--color-caramel)]
                "
              >
                <img
                  src={memory.src}
                  alt={memory.alt}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="
                    block
                    h-auto
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    ease-out
                    group-hover:scale-[1.025]
                    motion-reduce:transition-none
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-black/0
                    transition-colors
                    duration-500
                    group-hover:bg-black/[0.08]
                  "
                />
              </button>
            </motion.figure>
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
              bg-[rgba(25,17,13,0.96)]
              p-4
              sm:p-8
            "
            role="dialog"
            aria-modal="true"
            aria-label="Wedding photo viewer"
          >
            {/* TOP CONTROLS */}

            <div
              className="
                absolute
                inset-x-0
                top-0
                z-10
                flex
                items-center
                justify-between
                px-5
                py-5
                sm:px-8
                sm:py-7
              "
            >
              <p
                className="
                  font-body
                  text-xs
                  font-medium
                  tracking-[0.16em]
                  text-white/65
                  sm:text-sm
                "
                aria-live="polite"
              >
                {String(activeIndex + 1).padStart(2, "0")}
                {" "}
                <span className="text-white/35">/</span>
                {" "}
                {String(memories.length).padStart(2, "0")}
              </p>

              <div className="flex items-center gap-3 sm:gap-5">
                <a
                  href={memories[activeIndex].src}
                  download={`manuel-sharon-memory-${String(
                    activeIndex + 1,
                  ).padStart(2, "0")}.webp`}
                  onClick={(event) => event.stopPropagation()}
                  aria-label="Download this photo"
                  title="Download photo"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    text-white/80
                    transition-colors
                    hover:bg-white/10
                    hover:text-white
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-white
                  "
                >
                  <ArrowDownToLine
                    size={20}
                    strokeWidth={1.5}
                  />
                </a>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    closeLightbox()
                  }}
                  aria-label="Close photo viewer"
                  title="Close"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    text-white/80
                    transition-colors
                    hover:bg-white/10
                    hover:text-white
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-white
                  "
                >
                  <X size={23} strokeWidth={1.5} />
                </button>
              </div>
            </div>

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
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                text-white/75
                transition-colors
                hover:bg-white/10
                hover:text-white
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
                sm:left-5
                sm:h-12
                sm:w-12
              "
            >
              <ChevronLeft size={27} strokeWidth={1.4} />
            </button>

            {/* ACTIVE PHOTO */}

            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={memories[activeIndex].src}
                src={memories[activeIndex].src}
                alt={memories[activeIndex].alt}
                initial={{
                  opacity: 0,
                  scale: 0.985,
                  filter: "blur(3px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.99,
                  filter: "blur(2px)",
                }}
                transition={{
                  duration: 0.35,
                  ease: luxuryEase,
                }}
                onClick={(event) => event.stopPropagation()}
                className="
                  max-h-[calc(100dvh-8rem)]
                  max-w-[calc(100vw-5rem)]
                  select-none
                  object-contain
                  sm:max-h-[calc(100dvh-10rem)]
                  sm:max-w-[calc(100vw-12rem)]
                "
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
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                text-white/75
                transition-colors
                hover:bg-white/10
                hover:text-white
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-white
                sm:right-5
                sm:h-12
                sm:w-12
              "
            >
              <ChevronRight size={27} strokeWidth={1.4} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
