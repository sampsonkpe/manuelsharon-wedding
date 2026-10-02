import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import coupleImage from "../../assets/couple/hero.png"

import {
  imageRevealInitial,
  imageRevealAnimate,
  imageRevealTransition,
  luxuryEase,
} from "../motion/motion"

export default function InvitationHero() {
  const [hasScrolled, setHasScrolled] =
    useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true)
      }
    }

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    )

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      )
    }
  }, [])

  return (
    <section
      className="
        relative
        px-[var(--page-padding)]
        pt-20
        sm:pt-24
      "
    >
      <div className="relative mx-auto max-w-[1100px]">

        {/* =================================================
            SCROLL TO EXPLORE
            Positioned independently from the image so
            shorter phone screens do not push it down.
            ================================================= */}

        <motion.div
          className="
            absolute
            inset-x-0
            top-0
            z-20
            flex
            -translate-y-full
            flex-col
            items-center
            justify-center
            text-center
            pb-6
            sm:pb-8
          "
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: hasScrolled ? 0 : 1,
            y: hasScrolled ? -8 : 0,
          }}
          transition={{
            duration: 0.7,
            ease: luxuryEase,
          }}
          style={{
            pointerEvents: hasScrolled
              ? "none"
              : "auto",
          }}
        >
          <span
            className="
              font-body
              text-[0.65rem]
              font-medium
              uppercase
              tracking-[0.30em]
              text-[var(--color-muted)]
              sm:text-xs
              sm:tracking-[0.34em]
            "
          >
            Scroll to explore
          </span>

          <motion.span
            className="
              mt-3
              block
              h-8
              w-px
              origin-top
              bg-[var(--color-caramel)]
              sm:h-10
            "
            animate={{
              scaleY: [0.65, 1, 0.65],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* =================================================
            HERO IMAGE
            ================================================= */}

        <motion.div
          initial={{
            ...imageRevealInitial,
            y: 10,
          }}
          animate={{
            ...imageRevealAnimate,
            y: 0,
          }}
          transition={imageRevealTransition}
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[var(--radius-lg)]
            "
          >
            <div
              className="
                flex
                justify-center
                bg-[var(--color-envelope)]
              "
            >
              <img
                src={coupleImage}
                alt="Manuel & Sharon"
                className="
                  block
                  h-auto
                  w-full
                  max-w-[760px]
                  object-contain
                "
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}