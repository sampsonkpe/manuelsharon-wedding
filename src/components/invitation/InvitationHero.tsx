import { motion } from "framer-motion"
import ScrollReveal from "../motion/ScrollReveal"
import coupleImage from "../../assets/couple/hero2.png"

export default function InvitationHero() {
  return (
    <section className="px-[var(--page-padding)] pb-[12vh]">
      <div className="mx-auto max-w-[1100px]">
        <ScrollReveal y={70}>
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
            <div className="flex justify-center bg-[var(--color-envelope)]">
              <motion.img
                src={coupleImage}
                alt="Manuel and Sharon"
                className="block h-auto w-full max-w-[760px] object-contain"
                initial={{
                  opacity: 0,
                  y: 24,
                  scale: 1.02,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 1.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/65 via-black/45 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex justify-center px-5 pb-6 text-center sm:px-8 sm:pb-9">
                <motion.div
                    className="flex flex-col items-center"
                    initial={{
                    opacity: 0,
                    y: 18,
                    }}
                    whileInView={{
                    opacity: 1,
                    y: 0,
                    }}
                    viewport={{
                    once: true,
                    amount: 0.3,
                    }}
                    transition={{
                    duration: 0.9,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <p className="font-body text-[0.38rem] font-medium uppercase tracking-[0.38em] text-white/80 sm:text-[0.44rem]">
                    October 24, 2026
                    </p>

                    <h2 className="mt-1 font-display text-[clamp(2.45rem,7vw,4.6rem)] leading-[0.82] text-white">
                    Manuel &amp; Sharon
                    </h2>
                </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}