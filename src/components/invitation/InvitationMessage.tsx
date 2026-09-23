import { motion } from "framer-motion"

const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function InvitationMessage() {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[720px] text-center">

        {/* Invitation statement */}
        <motion.blockquote
          initial={{
            opacity: 0,
            y: 14,
            filter: "blur(3px)",
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
            ease: luxuryEase,
          }}
          className="font-editorial text-[clamp(1.7rem,4vw,2.55rem)] leading-[1.25] text-[var(--color-deep-brown)]"
        >
          Together with our families, we kindly request your presence at our
          wedding.
        </motion.blockquote>

        {/* Scripture */}
        <motion.div
          initial={{
            opacity: 0,
            y: 14,
            filter: "blur(3px)",
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
            delay: 0.18,
            ease: luxuryEase,
          }}
          className="mx-auto mt-10 max-w-[620px]"
        >
          <p className="font-editorial text-[clamp(1.35rem,3vw,1.85rem)] italic leading-[1.45] text-[var(--color-deep-brown)]">
            “Though one may be overpowered by another, two can withstand
            him. And a threefold cord is not quickly broken.”
          </p>

          <p className="mt-5 font-body text-[0.48rem] font-medium uppercase tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.52rem]">
            Ecclesiastes 4:12 • NKJV
          </p>
        </motion.div>

      </div>
    </section>
  )
}