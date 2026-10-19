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

const scrollViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -5% 0px",
}

export default function InvitationPalette() {
  return (
    <section
      className="
        px-[var(--page-padding)]
        pb-16
        sm:pb-20
        md:pb-24
      "
    >
      <div className="mx-auto max-w-[720px] text-center">
        {/* INTRODUCTION */}

        <motion.div
          initial={revealInitial}
          whileInView={revealAnimate}
          viewport={scrollViewport}
          transition={revealTransition}
        >
          <p
            className="
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-[var(--color-muted)]
              sm:text-base
            "
          >
            Our Colour Palette
          </p>

          <motion.p
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={scrollViewport}
            transition={{
              ...revealTransition,
              delay: 0.08,
            }}
            className="
              mx-auto
              mt-4
              max-w-[460px]
              font-editorial
              text-2xl
              leading-[1.15]
              tracking-[-0.01em]
              text-[var(--color-espresso)]
              sm:text-3xl
              md:text-4xl
            "
          >
            Colours chosen for the day.
          </motion.p>
        </motion.div>

        {/* COLOURS */}

        <div
          className="
            mx-auto
            mt-10
            grid
            w-full
            max-w-[420px]
            grid-cols-2
            gap-x-8
            gap-y-9
            sm:max-w-[560px]
            sm:grid-cols-4
            sm:gap-x-6
            sm:gap-y-0
          "
        >
          {palette.map((colour, index) => (
            <motion.div
              key={colour.hex}
              initial={revealInitial}
              whileInView={revealAnimate}
              viewport={scrollViewport}
              transition={{
                ...revealTransition,
                delay: index * 0.07,
              }}
              className="
                flex
                min-w-0
                flex-col
                items-center
              "
            >
              <span
                aria-label={`${colour.name}: ${colour.hex}`}
                className="
                  block
                  h-20
                  w-20
                  rounded-full
                  sm:h-16
                  sm:w-16
                "
                style={{
                  backgroundColor: colour.hex,
                }}
              />

              <span
                className="
                  mt-3
                  whitespace-nowrap
                  font-body
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.12em]
                  text-[var(--color-muted)]
                  sm:text-base
                  sm:tracking-[0.14em]
                "
              >
                {colour.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}