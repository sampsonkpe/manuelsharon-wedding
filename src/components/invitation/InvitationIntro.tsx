import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function InvitationIntro() {
  const [showNames, setShowNames] = useState(false)
  const [release, setRelease] = useState(false)

  useEffect(() => {
    const namesTimer = window.setTimeout(() => {
      setShowNames(true)
    }, 3000)

    return () => {
      window.clearTimeout(namesTimer)
    }
  }, [])

  useEffect(() => {
    if (!showNames) return

    const releaseIntro = () => {
      setRelease(true)
    }

    const releaseTimer = window.setTimeout(releaseIntro, 5000)

    window.addEventListener("wheel", releaseIntro, {
      once: true,
      passive: true,
    })

    window.addEventListener("touchstart", releaseIntro, {
      once: true,
      passive: true,
    })

    window.addEventListener("scroll", releaseIntro, {
      once: true,
      passive: true,
    })

    return () => {
      window.clearTimeout(releaseTimer)
      window.removeEventListener("wheel", releaseIntro)
      window.removeEventListener("touchstart", releaseIntro)
      window.removeEventListener("scroll", releaseIntro)
    }
  }, [showNames])

  return (
    <section className="relative px-[var(--page-padding)]">
      <motion.div
        className="flex min-h-[100svh] items-center justify-center"
        animate={{
          y: release ? "-28svh" : 0,
        }}
        transition={{
          duration: 1.6,
          ease: luxuryEase,
        }}
      >
        <div className="flex w-full max-w-[1100px] flex-col items-center text-center">

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

          {/* NAMES */}
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
                    marginTop: "1.5rem",
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
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}