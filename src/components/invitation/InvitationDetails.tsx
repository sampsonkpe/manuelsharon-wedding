import { motion } from "framer-motion"

const luxuryEase = [0.22, 1, 0.36, 1] as const

const calendarFile = "/assets/invitation/manuel-sharon-wedding.ics"

const mapsUrl =
  "https://maps.app.goo.gl/yusiFU7JZERTZsdi7?g_st=ic"

const revealInitial = {
  opacity: 0,
  y: 14,
  filter: "blur(3px)",
}

const revealAnimate = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
}

const revealTransition = (delay = 0) => ({
  duration: 1,
  delay,
  ease: luxuryEase,
})

export default function InvitationDetails() {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[760px] text-center">

        {/* DATE */}
        <motion.p
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={revealTransition()}
          className="font-editorial text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.05] text-[var(--color-deep-brown)]"
        >
          Saturday, October 24, 2026
        </motion.p>

        {/* TIME */}
        <motion.p
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={revealTransition(0.12)}
          className="mt-5 font-body text-[0.48rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)] sm:text-[0.52rem]"
        >
          At 2:00 PM • GMT
        </motion.p>

        {/* CALENDAR */}
        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={revealTransition(0.2)}
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

        {/* VENUE */}
        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={revealTransition(0.3)}
          className="mt-16"
        >
          <p className="font-editorial text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-[var(--color-deep-brown)]">
            Lotus Garden
          </p>

          <p className="mt-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.52rem]">
            Adjiringanor
          </p>

          <div className="mt-7">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="invitation-button"
            >
              Open in Maps
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}