
import { useState } from "react"
import { motion } from "framer-motion"

import {
  cinematicAnimate,
  cinematicInitial,
  cinematicTransition,
  luxuryEase,
  staggerSmall,
} from "../../components/motion/motion"
import FallingPetals from "../../components/wedding-day/FallingPetals"

const MOMO_NUMBER = "0244459555"

const pageViewport = {
  once: true,
  amount: 0.12,
  margin: "-5% 0px -5% 0px",
}

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

export default function GiftsPage() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(MOMO_NUMBER)
      setCopied(true)
      setCopyError(false)
    } catch {
      setCopied(false)
      setCopyError(true)
    }
  }

  return (
    <main className="min-h-screen bg-transparent">
      <FallingPetals />

      <div
        className="
          relative
          z-20
          mx-auto
          w-full
          max-w-[1000px]
          px-[var(--page-padding)]
          py-20
          sm:py-28
        "
      >
        {/* HEADER */}

        <motion.header
          initial={cinematicInitial}
          animate={cinematicAnimate}
          transition={cinematicTransition}
          className="text-center"
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

          {/* COUPLE'S NAMES */}

          <div
            className="
              relative
              mt-8
              flex
              w-full
              justify-center
              overflow-visible
              px-4
              sm:px-12
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
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall,
                }}
                className="
                  inline-block
                  overflow-visible
                  px-[0.18em]
                  font-display
                  text-[clamp(5rem,21vw,10rem)]
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
                  delay: staggerSmall * 2,
                }}
                aria-hidden="true"
                className="
                  inline-block
                  overflow-visible
                  font-display
                  text-[clamp(2.1rem,8.8vw,4.2rem)]
                  leading-none
                "
              >
                &amp;
              </motion.span>

              <motion.span
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall * 3,
                }}
                className="
                  inline-block
                  overflow-visible
                  px-[0.18em]
                  font-display
                  text-[clamp(5rem,21vw,10rem)]
                  leading-none
                  whitespace-nowrap
                "
              >
                Sharon
              </motion.span>
            </h1>
          </div>

          {/* DECORATIVE DIVIDER */}

          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: luxuryEase,
            }}
            className="
              mx-auto
              mt-8
              h-px
              w-8
              origin-center
              bg-[var(--color-caramel)]
            "
          />

          {/* PAGE TITLE */}

          <motion.p
            initial={cinematicInitial}
            animate={cinematicAnimate}
            transition={{
              ...cinematicTransition,
              delay: 1,
            }}
            className="
              mt-8
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.24em]
              text-[var(--color-espresso)]
              sm:text-base
            "
          >
            Gifts
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.15,
              ease: luxuryEase,
            }}
            className="
              mx-auto
              mt-4
              max-w-2xl
              font-editorial
              text-lg
              italic
              leading-relaxed
              text-[var(--color-muted)]
              sm:text-xl
            "
          >
            Your presence is the greatest gift. Should you wish to
            bless us further...
          </motion.p>
        </motion.header>

        {/* MOBILE MONEY DETAILS */}

        <motion.section
          aria-labelledby="gift-payment-heading"
          initial={cinematicInitial}
          whileInView={cinematicAnimate}
          viewport={pageViewport}
          transition={{
            ...cinematicTransition,
            delay: 0.15,
          }}
          className="
            mx-auto
            mt-10
            w-full
            max-w-3xl
            sm:mt-14
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-[var(--color-border)]
              px-6
              py-10
              text-center
              sm:px-12
              sm:py-16
            "
          >
            {/* ACCOUNT NAME */}

            <div>
              <p
                className="
                  font-body
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-[var(--color-muted)]
                  sm:text-sm
                "
              >
                Account Name
              </p>

              <h2
                id="gift-payment-heading"
                className="
                  mt-4
                  font-editorial
                  text-2xl
                  leading-snug
                  text-[var(--color-espresso)]
                  sm:text-3xl
                "
              >
                Sharon Ayettey
              </h2>
            </div>

            {/* MOBILE MONEY NUMBER */}

            <div className="mt-12 sm:mt-16">
              <p
                className="
                  font-body
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-[var(--color-muted)]
                  sm:text-sm
                "
              >
                MTN Mobile Money
              </p>

              <p
                className="
                  mt-4
                  font-editorial
                  text-3xl
                  tracking-[0.12em]
                  text-[var(--color-espresso)]
                  sm:text-4xl
                "
              >
                {MOMO_NUMBER}
              </p>

              {/* COPY BUTTON */}

              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleCopyNumber}
                className="
                  invitation-button
                  mx-auto
                  mt-8
                  text-[var(--color-caramel)]
                "
              >
                {copied ? "Number Copied" : "Copy Number"}
              </motion.button>

              {/* COPY ERROR FEEDBACK */}

              <div
                aria-live="polite"
                className="mt-3 min-h-5"
              >
                {copyError && (
                  <p className="font-body text-xs text-[var(--color-muted)]">
                    Copying was unavailable. Please copy the number above.
                  </p>
                )}
              </div>
            </div>

            {/* REFERENCE */}

            <div className="mt-6 sm:mt-8">
              <p
                className="
                  font-body
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-[var(--color-muted)]
                  sm:text-sm
                "
              >
                Reference
              </p>

              <p
                className="
                  mt-4
                  font-editorial
                  text-3xl
                  tracking-[0.12em]
                  text-[var(--color-espresso)]
                  sm:text-4xl
                "
              >
                MS2026
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  )
}