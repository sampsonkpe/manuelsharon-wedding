import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import envelopeVideo from "../assets/invitation/envelope.mp4"

const luxuryEase = [0.22, 1, 0.36, 1] as const

const pageTransition = {
  duration: 1,
  ease: luxuryEase,
}

const finalZoomTransition = {
  duration: 4.5,
  ease: luxuryEase,
}

export default function SplashPage() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLeaving, setIsLeaving] = useState(false)
  const [isFinalZoom, setIsFinalZoom] = useState(false)
  const [showNames, setShowNames] = useState(false)

  useEffect(() => {
    const namesTimer = window.setTimeout(() => {
      setShowNames(true)
    }, 3000)

    return () => {
      window.clearTimeout(namesTimer)
    }
  }, [])

  const enterInvitation = () => {
    if (isLeaving) return

    setIsLeaving(true)

    window.setTimeout(() => {
      navigate("/home", { replace: true })
    }, 800)
  }

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
        onEnded={enterInvitation}
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
              duration: 1.2,
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
    </motion.main>
  )
}