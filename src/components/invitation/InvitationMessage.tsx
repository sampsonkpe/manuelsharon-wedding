import { motion } from "framer-motion"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
} from "../motion/motion"

export default function InvitationMessage() {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[720px] text-center">
        {/* Invitation statement */}
        <motion.blockquote
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={revealTransition}
          className="font-editorial text-[clamp(1.7rem,4vw,2.55rem)] leading-[1.25] text-[var(--color-espresso)]"
        >
          We, together with our families, kindly request your presence at our
          wedding.
        </motion.blockquote>

        {/* Scripture */}
        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            ...revealTransition,
            delay: 0.18,
          }}
          className="mx-auto mt-10 max-w-[620px]"
        >
          <p className="font-editorial text-[clamp(1.35rem,3vw,1.85rem)] italic leading-[1.45] text-[var(--color-espresso)]">
            “Though one may be overpowered by another, two can withstand him.{" "}
            <strong className="font-[550] text-[var(--color-espresso)]">
              And a threefold cord is not quickly broken.
            </strong>
            ”
          </p>

          <p className="mt-5 font-body text-[0.48rem] font-medium uppercase tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.52rem]">
            Ecclesiastes 4:12 • NKJV
          </p>
        </motion.div>
      </div>
    </section>
  )
}