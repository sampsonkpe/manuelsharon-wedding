import { motion } from "framer-motion"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
  softRevealInitial,
  softRevealAnimate,
  softRevealTransition,
} from "../motion/motion"

const scrollViewport = {
  once: false,
  amount: 0.35,
  margin: "-8% 0px -8% 0px",
}

export default function InvitationMessage() {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[720px] text-center">

        {/* =================================================
            INVITATION STATEMENT
            ================================================= */}

        <motion.blockquote
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
          We, together with our families, kindly request your
          presence at our wedding.
        </motion.blockquote>

        {/* =================================================
            SCRIPTURE
            ================================================= */}

        <motion.div
          initial={softRevealInitial}
          whileInView={softRevealAnimate}
          viewport={scrollViewport}
          transition={{
            ...softRevealTransition,
            delay: 0.1,
          }}
          className="mx-auto mt-10 max-w-[620px]"
        >
          <p
            className="
              font-editorial
              text-2xl
              leading-[1.25]
              tracking-[-0.01em]
              text-[var(--color-espresso)]
              italic
              sm:text-3xl
              md:text-4xl
            "
          >
            “Though one may be overpowered by another, two can
            withstand him.{" "}
            <strong className="font-[550]">
              And a threefold cord is not quickly broken.
            </strong>
            ”
          </p>

          <motion.p
            initial={softRevealInitial}
            whileInView={softRevealAnimate}
            viewport={scrollViewport}
            transition={{
              ...softRevealTransition,
              delay: 0.16,
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
            Ecclesiastes 4:12 • NKJV
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}