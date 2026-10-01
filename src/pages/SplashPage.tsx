import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import envelopeVideo from "../assets/invitation/envelope.mp4"
import {
  luxuryEase,
  cinematicInitial,
  cinematicAnimate,
  cinematicTransition,
  durationCinematic,
  durationPage,
  staggerSmall,
} from "../components/motion/motion"

const finalZoomTransition = {
  duration: durationCinematic + 2.7,
  ease: luxuryEase,
}

const pageTransition = {
  duration: durationPage,
  ease: luxuryEase,
}

export default function SplashPage() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLeaving, setIsLeaving] = useState(false)
  const [isFinalZoom, setIsFinalZoom] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showNames, setShowNames] = useState(false)

  /*
   * ============================================================
   * INTRO SEQUENCE
   * ============================================================
   *
   * The typography appears in relation to the envelope
   * animation rather than immediately.
   */

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

  /*
   * ============================================================
   * LEAVING SPLASH
   * ============================================================
   *
   * The complete composition remains visible briefly before
   * the invitation itself is revealed.
   */

  useEffect(() => {
    if (!showNames) return

    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true)

      const navigationTimer = window.setTimeout(() => {
        navigate("/home", {
          replace: true,
        })
      }, durationPage * 1000)

      return () => {
        window.clearTimeout(navigationTimer)
      }
    }, 4800)

    return () => {
      window.clearTimeout(leaveTimer)
    }
  }, [showNames, navigate])

  /*
   * ============================================================
   * ENVELOPE VIDEO
   * ============================================================
   *
   * Begin the final cinematic zoom shortly before the video
   * reaches its end.
   */

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (!video || !video.duration) return

    const remaining =
      video.duration - video.currentTime

    if (remaining <= 3.5) {
      setIsFinalZoom(true)
    }
  }

  /*
   * ============================================================
   * AUTOPLAY
   * ============================================================
   */

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    video.play().catch(() => {
      /*
       * Autoplay may be blocked by the browser.
       * The muted + playsInline configuration normally
       * allows playback on modern browsers.
       */
    })
  }, [])

  return (
    <motion.main
      className="fixed inset-0 z-[100] h-[100svh] w-full overflow-hidden bg-[var(--color-envelope)]"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: isLeaving ? 0 : 1,
      }}
      transition={pageTransition}
      aria-label="Wedding invitation"
    >
      {/* =================================================
          ENVELOPE VIDEO
          ================================================= */}

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
        <source
          src={envelopeVideo}
          type="video/mp4"
        />
      </motion.video>

      {/* =================================================
          INTRO TYPOGRAPHY
          ================================================= */}

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[var(--page-padding)]">
        <div className="flex w-full max-w-[1100px] flex-col items-center text-center">

          {/* WELCOME */}

          <motion.p
            initial={cinematicInitial}
            animate={
              showWelcome
                ? cinematicAnimate
                : cinematicInitial
            }
            transition={{
              ...cinematicTransition,
              duration:
                durationCinematic - 0.5,
            }}
            className="font-body text-[0.46rem] font-medium uppercase leading-[1.9] tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.5rem]"
          >
            <span className="block">
              Welcome to
            </span>

            <span className="block">
              the Wedding of
            </span>
          </motion.p>

          {/* COUPLE */}

          <h1 className="mt-6 flex flex-wrap justify-center gap-x-[0.3em] font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[1.18] text-[var(--color-espresso)]">

            <motion.span
              initial={cinematicInitial}
              animate={
                showNames
                  ? cinematicAnimate
                  : cinematicInitial
              }
              transition={{
                ...cinematicTransition,
                delay: staggerSmall,
              }}
            >
              Manuel &amp;
            </motion.span>

            <motion.span
              initial={cinematicInitial}
              animate={
                showNames
                  ? cinematicAnimate
                  : cinematicInitial
              }
              transition={{
                ...cinematicTransition,
                delay: staggerSmall * 2,
              }}
            >
              Sharon
            </motion.span>
          </h1>

          {/* HASHTAG */}

          <motion.p
            initial={cinematicInitial}
            animate={
              showNames
                ? cinematicAnimate
                : cinematicInitial
            }
            transition={{
              ...cinematicTransition,
              delay: staggerSmall * 4,
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