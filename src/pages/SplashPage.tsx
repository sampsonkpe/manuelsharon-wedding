import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import envelopeVideo from "../assets/invitation/envelope.mp4"
import {
  luxuryEase,
  revealInitial,
  revealAnimate,
  revealTransition,
} from "../components/motion/motion"

const pageTransition = {
  duration: 1,
  ease: luxuryEase,
}

const finalZoomTransition = {
  duration: 4.5,
  ease: luxuryEase,
}

const nameStagger = 0.18

export default function SplashPage() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLeaving, setIsLeaving] = useState(false)
  const [isFinalZoom, setIsFinalZoom] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showNames, setShowNames] = useState(false)

  useEffect(() => {
    const welcomeTimer = window.setTimeout(() => {
      setShowWelcome(true)
    }, 4000)

    const namesTimer = window.setTimeout(() => {
      setShowNames(true)
    }, 5800)

    return () => {
      window.clearTimeout(welcomeTimer)
      window.clearTimeout(namesTimer)
    }
  }, [])

  useEffect(() => {
    if (!showNames) return

    // Wait for the names to fully reveal,
    // then hold the complete composition for 3 seconds.
    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true)

      window.setTimeout(() => {
        navigate("/home", { replace: true })
      }, 800)
    }, 4800)

    return () => {
      window.clearTimeout(leaveTimer)
    }
  }, [showNames, navigate])

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (!video || !video.duration) return

    const remaining = video.duration - video.currentTime

    if (remaining <= 3.5) {
      setIsFinalZoom(true)
    }
  }

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    video.play().catch(() => {
      // Some browsers may block autoplay.
    })
  }, [])

  return (
    <motion.main
      className="fixed inset-0 z-[100] h-[100svh] w-full overflow-hidden bg-[var(--color-envelope)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLeaving ? 0 : 1 }}
      transition={pageTransition}
      aria-label="Wedding invitation"
    >
      {/* ENVELOPE */}
      <motion.video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        animate={{
          scale: isFinalZoom ? 1.26 : 1,
        }}
        transition={finalZoomTransition}
        aria-hidden="true"
      >
        <source src={envelopeVideo} type="video/mp4" />
      </motion.video>

      {/* INTRO TYPOGRAPHY */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[var(--page-padding)]">
        <div className="flex w-full max-w-[1100px] flex-col items-center text-center">
          {/* WELCOME */}
          <motion.p
            initial={revealInitial}
            animate={showWelcome ? revealAnimate : revealInitial}
            transition={revealTransition}
            className="font-body text-[0.46rem] font-medium uppercase leading-[1.9] tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.5rem]"
          >
            <span className="block">Welcome to</span>
            <span className="block">the Wedding of</span>
          </motion.p>

          {/* COUPLE */}
          <h1 className="mt-6 flex flex-wrap justify-center gap-x-[0.3em] font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[1.18] text-[var(--color-espresso)]">
            <motion.span
              initial={revealInitial}
              animate={showNames ? revealAnimate : revealInitial}
              transition={revealTransition}
            >
              Manuel &amp;
            </motion.span>

            <motion.span
              initial={revealInitial}
              animate={showNames ? revealAnimate : revealInitial}
              transition={{
                ...revealTransition,
                delay: nameStagger,
              }}
            >
              Sharon
            </motion.span>
          </h1>

          {/* HASHTAG */}
          <motion.p
            initial={revealInitial}
            animate={showNames ? revealAnimate : revealInitial}
            transition={{
              ...revealTransition,
              delay: 0.35,
            }}
            className="mt-5 font-body text-[0.42rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)] sm:text-[0.46rem]"
          >
            #THEMANFORSHAY
          </motion.p>
        </div>
      </div>
    </motion.main>
  )
}