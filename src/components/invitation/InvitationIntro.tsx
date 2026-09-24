import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
  luxuryEase,
  revealAnimate,
  revealInitial,
} from "../motion/motion"

interface InvitationIntroProps {
  onHeroReveal: () => void
}

export default function InvitationIntro({
  onHeroReveal,
}: InvitationIntroProps) {
  const [showNames, setShowNames] = useState(false)
  const [releaseIntro, setReleaseIntro] = useState(false)

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

    const release = () => {
      setReleaseIntro(true)
      onHeroReveal()
    }

    const inactivityTimer = window.setTimeout(release, 5000)

    window.addEventListener("wheel", release, {
      once: true,
      passive: true,
    })

    window.addEventListener("touchstart", release, {
      once: true,
      passive: true,
    })

    window.addEventListener("scroll", release, {
      once: true,
      passive: true,
    })

    return () => {
      window.clearTimeout(inactivityTimer)
      window.removeEventListener("wheel", release)
      window.removeEventListener("touchstart", release)
      window.removeEventListener("scroll", release)
    }
  }, [showNames, onHeroReveal])

  return (
    <section
      className={
        releaseIntro
          ? "px-[var(--page-padding)] pt-[4vh] pb-[2vh]"
          : "min-h-[100svh] px-[var(--page-padding)]"
      }
    >
      <div
        className={
          releaseIntro
            ? "flex items-center justify-center"
            : "flex min-h-[100svh] items-center justify-center"
        }
      >
        <div className="flex w-full max-w-[1100px] flex-col items-center text-center">
          {/* WELCOME */}
          <motion.p
            initial={revealInitial}
            animate={revealAnimate}
            transition={{
              duration: 1,
              ease: luxuryEase,
            }}
            className="font-body text-[0.46rem] font-medium uppercase leading-[1.9] tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.5rem]"
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
            }}
            animate={
              showNames
                ? {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 0,
                    y: 24,
                    filter: "blur(4px)",
                  }
            }
            transition={{
              duration: 1.2,
              ease: luxuryEase,
            }}
            className="mt-6 w-full"
          >
            <h1 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[1.18] text-[var(--color-espresso)]">
              <span className="block sm:inline">Manuel &amp;</span>{" "}
              <span className="block sm:inline">Sharon</span>
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  )
}