
import { motion } from "framer-motion"

import {
  cinematicAnimate,
  cinematicInitial,
  cinematicTransition,
  luxuryEase,
  staggerSmall,
} from "../../components/motion/motion"
import FallingPetals from "../../components/wedding-day/FallingPetals"
import ScrollReveal from "../../components/motion/ScrollReveal"

const pageViewport = {
  once: true,
  amount: 0.12,
  margin: "-5% 0px -5% 0px",
}

const nameInitial = {
  opacity: 0,
  scale: 0.985,
  filter: "blur(3px)",
}

const nameAnimate = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
}

const nameTransition = {
  duration: 0.9,
  ease: luxuryEase,
}

const appreciationParagraphs = [
  "Our hearts are overflowing with joy and gratitude, we wish to express our sincere appreciation to everyone who has helped shape us, guided us, and prayed with and for us throughout our journey.",

  "We are truly grateful to each and every one of you who took the time to celebrate with us on our special day. Your love, prayers, support, and presence made our celebration even more meaningful, and we do not take any of it for granted.",

  "Our prayer is that the Lord will replenish all that you have given and reward your kindness a thousandfold.",

  "Indeed, He makes all things beautiful in His time. What began as a prayer has become a testimony of His faithfulness, and our hearts will forever be grateful for His grace.",

  "With hearts full of gratitude and love, thank you for being part of our beautiful story.",
]

export default function AppreciationPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <FallingPetals />

      <div
        className="
          relative
          z-20
          mx-auto
          w-full
          max-w-[1000px]
          px-[var(--page-padding)]
          py-20
          sm:py-28
        "
      >
        {/* HEADER */}

        <motion.header
          initial={cinematicInitial}
          animate={cinematicAnimate}
          transition={cinematicTransition}
          className="text-center"
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
            The Wedding of
          </p>

          {/* COUPLE'S NAMES */}

          <div
            className="
              relative
              mt-8
              flex
              w-full
              justify-center
              overflow-visible
              px-4
              sm:px-12
            "
          >
            <h1
              className="
                flex
                w-full
                flex-col
                items-center
                justify-center
                overflow-visible
                text-center
                text-[var(--color-espresso)]
              "
            >
              <motion.span
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall,
                }}
                className="
                  inline-block
                  overflow-visible
                  px-[0.18em]
                  font-display
                  text-[clamp(5rem,21vw,10rem)]
                  leading-none
                  whitespace-nowrap
                "
              >
                Manuel
              </motion.span>

              <motion.span
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall * 2,
                }}
                aria-hidden="true"
                className="
                  inline-block
                  overflow-visible
                  font-display
                  text-[clamp(2.1rem,8.8vw,4.2rem)]
                  leading-none
                "
              >
                &amp;
              </motion.span>

              <motion.span
                initial={nameInitial}
                animate={nameAnimate}
                transition={{
                  ...nameTransition,
                  delay: staggerSmall * 3,
                }}
                className="
                  inline-block
                  overflow-visible
                  px-[0.18em]
                  font-display
                  text-[clamp(5rem,21vw,10rem)]
                  leading-none
                  whitespace-nowrap
                "
              >
                Sharon
              </motion.span>
            </h1>
          </div>

          {/* DECORATIVE DIVIDER */}

          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: luxuryEase,
            }}
            className="
              mx-auto
              mt-8
              h-px
              w-8
              origin-center
              bg-[var(--color-caramel)]
            "
          />

          {/* PAGE TITLE */}

          <motion.p
            initial={cinematicInitial}
            animate={cinematicAnimate}
            transition={{
              ...cinematicTransition,
              delay: 1,
            }}
            className="
              mt-8
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.24em]
              text-[var(--color-espresso)]
              sm:text-base
            "
          >
            Appreciation
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.15,
              ease: luxuryEase,
            }}
            className="
              mx-auto
              mt-4
              max-w-2xl
              font-editorial
              text-lg
              italic
              leading-relaxed
              text-[var(--color-muted)]
              sm:text-xl
            "
          >
            A testimony of grace, faithfulness, and love.
          </motion.p>
        </motion.header>

        {/* COUPLE'S PHOTOGRAPH */}

        <motion.figure
          initial={cinematicInitial}
          whileInView={cinematicAnimate}
          viewport={pageViewport}
          transition={{
            ...cinematicTransition,
            delay: 0.1,
          }}
          className="
            mx-auto
            mt-10
            w-full
            max-w-3xl
            sm:mt-14
          "
        >
          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[var(--color-border)]
              p-2
              sm:p-3
            "
          >
            <motion.img
              initial={{ scale: 1.035 }}
              whileInView={{ scale: 1 }}
              viewport={pageViewport}
              transition={{
                duration: 1.6,
                ease: luxuryEase,
              }}
              src="/images/memories-01.webp"
              alt="A photograph of Manuel and Sharon"
              loading="lazy"
              className="
                aspect-[4/5]
                w-full
                rounded-xl
                object-cover
                sm:aspect-[5/4]
              "
            />
          </div>
        </motion.figure>

        {/* APPRECIATION LETTER */}

        <section
          aria-label="A message of appreciation from Manuel and Sharon"
          className="
            mx-auto
            mt-12
            w-full
            max-w-3xl
            sm:mt-16
          "
        >
          {/* OPENING TESTIMONY */}

          <motion.div
            initial={cinematicInitial}
            whileInView={cinematicAnimate}
            viewport={pageViewport}
            transition={cinematicTransition}
            className="text-center"
          >
            <p
              className="
                font-editorial
                text-4xl
                leading-tight
                text-[var(--color-cinnamon)]
                sm:text-5xl
              "
            >
              Ebenezer!!!
            </p>

            <p
              className="
                mt-3
                font-editorial
                text-2xl
                italic
                leading-relaxed
                text-[var(--color-espresso)]
                sm:text-3xl
              "
            >
              Thus far, the Lord has brought us.
            </p>

            <div
              aria-hidden="true"
              className="
                mx-auto
                mt-8
                h-px
                w-12
                bg-[var(--color-caramel)]
              "
            />
          </motion.div>

          {/* LETTER BODY */}

            <div className="mt-10 space-y-7 sm:mt-12 sm:space-y-9">
            {appreciationParagraphs.map((paragraph) => (
                <ScrollReveal
                key={paragraph}
                once={false}
                delay={0.08}
                className="
                    font-editorial
                    text-xl
                    text-center
                    leading-[1.85]
                    text-[var(--color-muted)]
                    sm:text-2xl
                "
                >
                {paragraph}
                </ScrollReveal>
            ))}
            </div>

          {/* SIGN-OFF */}

          <motion.footer
            initial={cinematicInitial}
            whileInView={cinematicAnimate}
            viewport={pageViewport}
            transition={cinematicTransition}
            className="
              mt-12
              border-t
              border-[var(--color-border)]
              pt-8
              text-center
              sm:mt-16
              sm:pt-10
            "
          >
            <p
              className="
                font-editorial
                text-3xl
                leading-snug
                text-[var(--color-espresso)]
                sm:text-4xl
              "
            >
              Mr and Mrs Duah.
            </p>

            <p
              aria-label="With love and gratitude"
              className="mt-4 text-xl"
            >
              ❤️💍
            </p>
          </motion.footer>
        </section>
      </div>
    </main>
  )
}