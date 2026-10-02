import { motion } from "framer-motion"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
} from "../motion/motion"

const calendarFile =
  "/manuel-sharon-wedding.ics"

const mapsUrl =
  "https://maps.app.goo.gl/yusiFU7JZERTZsdi7?g_st=ic"

const scrollViewport = {
  once: false,
  amount: 0.35,
  margin: "-8% 0px -8% 0px",
}

export default function InvitationDetails() {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[760px] text-center">

        {/* =================================================
            DATE
            ================================================= */}

        <motion.p
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={scrollViewport}
          transition={revealTransition}
          className="
            font-editorial
            text-3xl
            leading-[1.15]
            tracking-[-0.01em]
            text-[var(--color-espresso)]
            sm:text-4xl
            md:text-5xl
          "
        >
          Saturday, October 24, 2026
        </motion.p>

        {/* =================================================
            TIME
            ================================================= */}

        <motion.p
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={scrollViewport}
          transition={{
            ...revealTransition,
            delay: 0.08,
          }}
          className="
            mt-5
            font-body
            text-sm
            font-medium
            uppercase
            tracking-[0.2em]
            text-[var(--color-muted)]
            sm:text-base
          "
        >
          At 2:00 PM • GMT
        </motion.p>

        {/* =================================================
            CALENDAR
            ================================================= */}

        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={scrollViewport}
          transition={{
            ...revealTransition,
            delay: 0.14,
          }}
          className="mt-9"
        >
          <a
            href={calendarFile}
            className="invitation-button"
          >
            Add to Calendar
          </a>
        </motion.div>

        {/* =================================================
            VENUE
            ================================================= */}

        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={scrollViewport}
          transition={{
            ...revealTransition,
            delay: 0.12,
          }}
          className="mt-16"
        >
          <p
            className="
              font-editorial
              text-3xl
              leading-[1.15]
              tracking-[-0.01em]
              text-[var(--color-espresso)]
              sm:text-4xl
              md:text-5xl
            "
          >
            Lotus Garden
          </p>

          <motion.p
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={scrollViewport}
            transition={{
              ...revealTransition,
              delay: 0.08,
            }}
            className="
              mt-3
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-[var(--color-muted)]
              sm:text-base
            "
          >
            Adjiringanor
          </motion.p>

          {/* =================================================
              MAPS
              ================================================= */}

          <motion.div
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={scrollViewport}
            transition={{
              ...revealTransition,
              delay: 0.14,
            }}
            className="mt-7"
          >
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="invitation-button"
            >
              Open in Maps
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}