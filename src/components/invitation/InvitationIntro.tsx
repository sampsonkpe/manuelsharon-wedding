import { motion } from "framer-motion"

export default function InvitationIntro() {
  return (
    <section className="flex min-h-[46svh] items-center justify-center px-[var(--page-padding)] pb-[6vh] sm:min-h-[50svh] sm:pb-[5vh]">
      <motion.div
        className="flex max-w-3xl flex-col items-center text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
      >
        <motion.p
          className="font-body text-[0.5rem] font-medium uppercase leading-[1.8] tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.56rem]"
          variants={{
            hidden: {
              opacity: 0,
              y: 14,
              filter: "blur(4px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          <span className="block">Welcome to</span>
          <span className="block">the Wedding of</span>
        </motion.p>

        <motion.h1
          className="mt-3 font-display text-[clamp(3.5rem,9vw,6.6rem)] leading-[0.86] text-[var(--color-deep-brown)]"
          variants={{
            hidden: {
              opacity: 0,
              y: 18,
              filter: "blur(5px)",
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          Manuel &amp; Sharon
        </motion.h1>

        <motion.div
          className="mt-8 h-px w-8 bg-[var(--color-caramel)]"
          variants={{
            hidden: {
              opacity: 0,
              scaleX: 0,
            },
            visible: {
              opacity: 1,
              scaleX: 1,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        />
      </motion.div>
    </section>
  )
}