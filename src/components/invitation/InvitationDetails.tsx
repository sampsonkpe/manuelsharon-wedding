import { motion } from "framer-motion"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
} from "../motion/motion"

const calendarFile =
  "/assets/invitation/manuel-sharon-wedding.ics"

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
          className="font-editorial text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.05] text-[var(--color-espresso)]"
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
          className="mt-5 font-body text-[0.48rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)] sm:text-[0.52rem]"
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
            download="the-wedding-of-manuel-and-sharon.ics"
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
          <p className="font-editorial text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-[var(--color-espresso)]">
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
            className="mt-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.52rem]"
          >
            Adjiringanor
          </motion.p>

          {/* MAPS */}

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