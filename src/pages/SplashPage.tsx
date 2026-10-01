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

const ENVELOPE_PLAYBACK_RATE = 0.68

const finalZoomTransition = {
  duration: durationCinematic + 2.8,
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
   * The envelope is intentionally slower so the opening
   * animation can actually be appreciated.
   *
   * Typography follows the slower cinematic pacing.
   */

  useEffect(() => {
    const welcomeTimer = window.setTimeout(() => {
      setShowWelcome(true)
    }, 5600)

    const namesTimer = window.setTimeout(() => {
      setShowNames(true)
    }, 7600)

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
   * Keep the complete composition visible for a little longer
   * before transitioning into the invitation.
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
    }, 5600)

    return () => {
      window.clearTimeout(leaveTimer)
    }
  }, [showNames, navigate])

  /*
   * ============================================================
   * ENVELOPE VIDEO
   * ============================================================
   *
   * Slow the actual video playback rather than only animating
   * the video container.
   */

  const handleLoadedMetadata = () => {
    const video = videoRef.current

    if (!video) return

    video.playbackRate = ENVELOPE_PLAYBACK_RATE
  }

  /*
   * Begin the final cinematic zoom shortly before
   * the video reaches its end.
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

    video.playbackRate = ENVELOPE_PLAYBACK_RATE

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
        onLoadedMetadata={handleLoadedMetadata}
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
              duration: durationCinematic,
            }}
            className="font-body text-[0.56rem] font-medium uppercase leading-[1.9] tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.62rem]"
          >
            <span className="block">
              Welcome to
            </span>

            <span className="block">
              the Wedding of
            </span>
          </motion.p>

          {/* COUPLE */}

          <h1
            className="
              relative
              top-4
              flex
              flex-col
              items-center
              font-display
              text-[clamp(4.2rem,10vw,7rem)]
              leading-[0.95]
              text-[var(--color-espresso)]
            "
          >
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
              Manuel
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
              className="my-1 text-[0.55em]"
            >
              &amp;
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
                delay: staggerSmall * 3,
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
            className="mt-6 font-body text-[0.5rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)] sm:text-[0.54rem]"
          >
            #THEMANFORSHAY
          </motion.p>
        </div>
      </div>
    </motion.main>
  )
}