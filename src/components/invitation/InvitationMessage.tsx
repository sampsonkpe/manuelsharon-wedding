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
          className="font-editorial text-[clamp(1.7rem,4vw,2.55rem)] leading-[1.25] text-[var(--color-espresso)]"
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
          <p className="font-editorial text-[clamp(1.35rem,3vw,1.85rem)] italic leading-[1.45] text-[var(--color-espresso)]">
            “Though one may be overpowered by another, two can
            withstand him.{" "}
            <strong className="font-[550] text-[var(--color-espresso)]">
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
            className="mt-5 font-body text-[0.48rem] font-medium uppercase tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.52rem]"
          >
            Ecclesiastes 4:12 • NKJV
          </motion.p>
        </motion.div>

      </div>
    </section>
  )
}