import { motion } from "framer-motion"
import {
  revealInitial,
  revealAnimate,
  revealTransition,
} from "../motion/motion"

const palette = [
  {
    name: "Espresso",
    hex: "#442E21",
  },
  {
    name: "Cinnamon",
    hex: "#723A23",
  },
  {
    name: "Caramel",
    hex: "#B17543",
  },
  {
    name: "Taupe",
    hex: "#99796A",
  },
]

export default function InvitationPalette() {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[720px] text-center">
        {/* INTRODUCTION */}
        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={revealTransition}
        >
          <p className="font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.5rem]">
            Our Palette
          </p>

          <p className="mx-auto mt-4 max-w-[460px] font-editorial text-[clamp(1.2rem,3vw,1.6rem)] leading-[1.4] text-[var(--color-espresso)]">
            Colours chosen for the day.
          </p>
        </motion.div>

        {/* COLOURS */}
        <div className="mt-9 flex items-start justify-center gap-2 sm:gap-8">
          {palette.map((colour, index) => (
            <motion.div
              key={colour.hex}
              initial={revealInitial}
              whileInView={revealAnimate}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                ...revealTransition,
                delay: index * 0.08,
              }}
              className="flex flex-col items-center"
            >
              <span
                aria-label={`${colour.name}: ${colour.hex}`}
                className="block h-14 w-14 rounded-full sm:h-16 sm:w-16"
                style={{
                  backgroundColor: colour.hex,
                }}
              />

              <span className="mt-3 font-body text-[0.4rem] font-medium uppercase tracking-[0.18em] text-[var(--color-muted)] sm:text-[0.42rem]">
                {colour.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}