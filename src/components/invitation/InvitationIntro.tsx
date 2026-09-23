import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function InvitationIntro() {
  const [showNames, setShowNames] = useState(false)

  useEffect(() => {
    const revealNames = () => {
      setShowNames(true)
    }

    const timer = window.setTimeout(revealNames, 3000)

    window.addEventListener("wheel", revealNames, {
      once: true,
      passive: true,
    })

    window.addEventListener("touchstart", revealNames, {
      once: true,
      passive: true,
    })

    window.addEventListener("scroll", revealNames, {
      once: true,
      passive: true,
    })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("wheel", revealNames)
      window.removeEventListener("touchstart", revealNames)
      window.removeEventListener("scroll", revealNames)
    }
  }, [])

  return (
    <section className="flex min-h-[58svh] items-center justify-center px-[var(--page-padding)]">
      <motion.div
        className="flex w-full max-w-[1100px] flex-col items-center text-center"
        layout
        transition={{
          duration: 1,
          ease: luxuryEase,
        }}
      >
        {/* WELCOME */}
        <motion.p
          className="font-body text-[0.46rem] font-medium uppercase leading-[1.9] tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.5rem]"
          initial={{
            opacity: 0,
            y: 14,
            filter: "blur(3px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            ease: luxuryEase,
          }}
        >
          <span className="block">Welcome to</span>
          <span className="block">the Wedding of</span>
        </motion.p>

        {/* COUPLE */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
            filter: "blur(4px)",
            height: 0,
            marginTop: 0,
          }}
          animate={
            showNames
              ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  height: "auto",
                  marginTop: "2rem",
                }
              : {
                  opacity: 0,
                  y: 24,
                  filter: "blur(4px)",
                  height: 0,
                  marginTop: 0,
                }
          }
          transition={{
            duration: 1,
            ease: luxuryEase,
          }}
          className="w-full overflow-hidden"
        >
          <h1 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[1.18] text-[var(--color-deep-brown)]">
            <span className="block sm:inline">
              Manuel &amp;
            </span>{" "}
            <span className="block sm:inline">
              Sharon
            </span>
          </h1>

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={
              showNames
                ? {
                    opacity: 1,
                    scaleX: 1,
                  }
                : {
                    opacity: 0,
                    scaleX: 0,
                  }
            }
            transition={{
              duration: 0.8,
              delay: showNames ? 0.35 : 0,
              ease: luxuryEase,
            }}
            className="mx-auto mt-7 h-px w-8 origin-center bg-[var(--color-caramel)]"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}