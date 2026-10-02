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
  once: false,
  amount: 0.35,
  margin: "-8% 0px -8% 0px",
}

export default function InvitationPalette() {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[720px] text-center">

        {/* =================================================
            INTRODUCTION
            ================================================= */}

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
              text-xl
              leading-[1.4]
              text-[var(--color-espresso)]
              sm:text-2xl
            "
          >
            Colours chosen for the day.
          </motion.p>
        </motion.div>

        {/* =================================================
            COLOURS
            ================================================= */}

        <div
          className="
            mx-auto
            mt-9
            flex
            w-full
            max-w-[500px]
            items-start
            justify-between
            px-4
            sm:max-w-[560px]
            sm:px-6
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
                  h-14
                  w-14
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
                  font-body
                  text-[0.65rem]
                  font-medium
                  uppercase
                  tracking-[0.10em]
                  text-[var(--color-muted)]
                  sm:text-sm
                  sm:tracking-[0.12em]
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