import { motion } from "framer-motion"
import darkCoupleImage from "../../assets/couple/closing.png"

const luxuryEase = [0.22, 1, 0.36, 1] as const

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

export default function InvitationClosing() {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[900px] text-center">

        {/* Closing label */}
        <motion.p
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            ease: luxuryEase,
          }}
          className="font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.5rem]"
        >
          See you at the wedding
        </motion.p>

        {/* Couple portrait */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            filter: "blur(4px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 1.1,
            delay: 0.12,
            ease: luxuryEase,
          }}
          className="mx-auto mt-10 max-w-[760px] overflow-hidden rounded-[var(--radius-lg)]"
        >
          <img
            src={darkCoupleImage}
            alt="Manuel and Sharon"
            loading="lazy"
            className="block h-auto w-full"
          />
        </motion.div>

        {/* Couple signature */}
        <motion.h2
          initial={{
            opacity: 0,
            y: 18,
            filter: "blur(4px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            delay: 0.28,
            ease: luxuryEase,
          }}
          className="mt-10 font-display text-[clamp(3.5rem,8vw,6rem)] leading-[1.1] text-[var(--color-deep-brown)]"
        >
          Manuel &amp; Sharon
        </motion.h2>
      </div>
    </section>
  )
}