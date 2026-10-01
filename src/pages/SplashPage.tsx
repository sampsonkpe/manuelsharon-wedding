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

  const [pageLoaded, setPageLoaded] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isFinalZoom, setIsFinalZoom] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showNames, setShowNames] = useState(false)

  /*
   * ============================================================
   * PAGE LOAD
   * ============================================================
   *
   * Keep the envelope closed until the browser has completed
   * loading the page.
   */

  useEffect(() => {
    const handleLoad = () => {
      setPageLoaded(true)
    }

    if (document.readyState === "complete") {
      const timer = window.setTimeout(() => {
        setPageLoaded(true)
      }, 500)

      return () => {
        window.clearTimeout(timer)
      }
    }

    window.addEventListener("load", handleLoad)

    return () => {
      window.removeEventListener("load", handleLoad)
    }
  }, [])

  /*
   * ============================================================
   * OPEN INVITATION
   * ============================================================
   */

  const handleOpenInvitation = () => {
    if (!pageLoaded || hasOpened) return

    const video = videoRef.current

    if (!video) return

    setHasOpened(true)

    video.playbackRate = ENVELOPE_PLAYBACK_RATE

    video.currentTime = 0

    video.play().catch(() => {
      /*
       * The interaction itself gives the browser permission
       * to start playback, so autoplay restrictions should
       * not normally apply here.
       */
    })

    /*
     * Typography begins after the envelope has had time to
     * establish the opening sequence.
     */
    window.setTimeout(() => {
      setShowWelcome(true)
    }, 2600)

    window.setTimeout(() => {
      setShowNames(true)
    }, 4700)
  }

  /*
   * ============================================================
   * VIDEO METADATA
   * ============================================================
   */

  const handleLoadedMetadata = () => {
    const video = videoRef.current

    if (!video) return

    video.playbackRate = ENVELOPE_PLAYBACK_RATE

    /*
     * Start from the very beginning so the user always sees
     * the closed envelope before opening it.
     */
    video.currentTime = 0
    video.pause()
  }

  /*
   * ============================================================
   * FINAL CINEMATIC ZOOM
   * ============================================================
   */

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (!video || !video.duration || !hasOpened) return

    const remaining =
      video.duration - video.currentTime

    if (remaining <= 3.5) {
      setIsFinalZoom(true)
    }
  }

  /*
   * ============================================================
   * VIDEO COMPLETE
   * ============================================================
   *
   * Let the envelope finish before leaving the splash.
   */

  const handleVideoEnded = () => {
    if (!hasOpened) return

    setIsLeaving(true)

    window.setTimeout(() => {
      navigate("/home", {
        replace: true,
      })
    }, durationPage * 1000)
  }

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
        autoPlay={false}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
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
          OPEN INVITATION OVERLAY
          ================================================= */}

      <motion.div
        className="absolute inset-0 z-30 flex items-end justify-center px-6 pb-[12vh]"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity:
            pageLoaded && !hasOpened
              ? 1
              : 0,
        }}
        transition={{
          duration: 1.2,
          ease: luxuryEase,
        }}
        pointerEvents={
          pageLoaded && !hasOpened
            ? "auto"
            : "none"
        }
      >
        <button
          type="button"
          onClick={handleOpenInvitation}
          disabled={!pageLoaded || hasOpened}
          className="group flex min-h-12 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[rgba(249,243,237,0.82)] px-7 py-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--color-espresso)] backdrop-blur-sm transition-all duration-700 hover:border-[var(--color-caramel)] hover:bg-[var(--color-surface)]"
        >
          Open Invitation
        </button>
      </motion.div>

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
            className="font-body text-[0.72rem] font-medium uppercase leading-[1.9] tracking-[0.30em] text-[var(--color-muted)] sm:text-[0.78rem]"
          >
            <span className="block">
              Welcome to
            </span>

            <span className="block">
              the Wedding of
            </span>
          </motion.p>

          {/* =================================================
              COUPLE
              ================================================= */}

          <h1 className="mt-7 flex w-full max-w-[92vw] flex-col items-center font-display text-[clamp(4.6rem,17vw,8rem)] leading-[0.88] text-[var(--color-espresso)]">

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
              className="whitespace-nowrap"
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
              className="my-2 text-[0.46em]"
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
              className="whitespace-nowrap"
            >
              Sharon
            </motion.span>

          </h1>

          {/* =================================================
              HASHTAG
              ================================================= */}

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
            className="mt-8 font-body text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[var(--color-muted)] sm:text-[0.74rem]"
          >
            #THEMANFORSHAY
          </motion.p>
        </div>
      </div>
    </motion.main>
  )
}