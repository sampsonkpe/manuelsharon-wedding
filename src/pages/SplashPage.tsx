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

/* ============================================================
   TYPES
   ============================================================ */

interface SplashPageProps {
  /*
   * When SplashPage is rendered over /home after a refresh,
   * this callback tells the parent that the splash is finished.
   *
   * When SplashPage is the "/" route, we navigate to /home.
   */
  onComplete?: () => void
}

/* ============================================================
   VIDEO
   ============================================================ */

/*
 * The new video is intentionally extended:
 *
 * ~0–4s
 * Closed envelope.
 *
 * ~4–8s
 * Envelope opens.
 *
 * ~8s+
 * Flaps are gone and the inside of the envelope is visible.
 *
 * ~10.17s
 * Video ends.
 *
 * We therefore allow the video to play naturally at 1x.
 */
const ENVELOPE_PLAYBACK_RATE = 1

/*
 * This is intentionally based on the actual visual stage
 * of the supplied video rather than arbitrary UI timing.
 *
 * At approximately 8 seconds the flaps have moved away
 * sufficiently for the typography to appear.
 */
const WELCOME_AT = 8.0
const NAMES_AT = 8.65

/*
 * How long the completed composition remains visible
 * after the video has finished.
 */
const HOLD_AFTER_VIDEO = 3000

/*
 * If the video cannot initialise/play within this period,
 * automatically continue to Home.
 *
 * There is deliberately NO poster fallback.
 */
const VIDEO_FALLBACK_DELAY = 5000

/* ============================================================
   MOTION
   ============================================================ */

const finalZoomTransition = {
  duration: durationCinematic + 2.8,
  ease: luxuryEase,
}

const pageTransition = {
  duration: durationPage,
  ease: luxuryEase,
}

/* ============================================================
   COMPONENT
   ============================================================ */

export default function SplashPage({
  onComplete,
}: SplashPageProps) {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  /*
   * Timers
   */
  const fallbackTimerRef = useRef<number | null>(null)
  const leaveTimerRef = useRef<number | null>(null)
  const navigationTimerRef = useRef<number | null>(null)

  /*
   * Prevents the video initialisation logic from running
   * repeatedly when multiple media events fire.
   */
  const videoInitialisedRef = useRef(false)

  /*
   * Prevents the navigation sequence from being triggered
   * more than once.
   */
  const hasFinishedRef = useRef(false)

  /*
   * Whether the video has successfully started playing.
   */
  const videoStartedRef = useRef(false)

  /*
   * Whether the component is still mounted.
   */
  const mountedRef = useRef(true)

  /* ==========================================================
     STATE
     ========================================================== */

  const [videoReady, setVideoReady] = useState(false)

  const [showWelcome, setShowWelcome] = useState(false)
  const [showNames, setShowNames] = useState(false)

  const [isFinalZoom, setIsFinalZoom] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  /* ==========================================================
     LOCK THE PAGE
     ==========================================================

     The splash is an actual full-screen experience.

     While it is mounted:

     - the page cannot scroll
     - touch scrolling is disabled
     - the content underneath cannot be reached
     - /home remains underneath but completely inaccessible
     ========================================================== */

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    const originalTouchAction = document.body.style.touchAction

    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.touchAction = originalTouchAction
    }
  }, [])

  /* ==========================================================
     COMPONENT LIFECYCLE
     ========================================================== */

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false

      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current)
      }

      if (leaveTimerRef.current !== null) {
        window.clearTimeout(leaveTimerRef.current)
      }

      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current)
      }
    }
  }, [])

  /* ==========================================================
     FALLBACK TIMER
     ==========================================================

     There is intentionally no poster.

     If the video has not successfully started within five
     seconds, we leave the splash and go to Home.

     This prevents a broken/slow video from trapping the
     visitor on a blank splash screen.
     ========================================================== */

  useEffect(() => {
    fallbackTimerRef.current = window.setTimeout(() => {
      if (
        mountedRef.current &&
        !videoStartedRef.current &&
        !hasFinishedRef.current
      ) {
        finishSplashImmediately()
      }
    }, VIDEO_FALLBACK_DELAY)

    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current)
      }
    }
  }, [])

  /* ==========================================================
     VIDEO READY
     ========================================================== */

  const handleVideoReady = () => {
    const video = videoRef.current

    if (!video) return

    if (videoInitialisedRef.current) return

    videoInitialisedRef.current = true

    /*
     * Make absolutely certain the video starts from the
     * beginning of the closed-envelope sequence.
     */
    video.pause()
    video.currentTime = 0
    video.playbackRate = ENVELOPE_PLAYBACK_RATE

    setVideoReady(true)
  }

  /* ==========================================================
     VIDEO STARTED
     ========================================================== */

  const handleVideoStarted = () => {
    videoStartedRef.current = true

    /*
     * The video successfully started, so the fallback timer
     * is no longer necessary.
     */
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }
  }

  /* ==========================================================
     PLAY VIDEO
     ==========================================================

     Normally the muted video will autoplay.

     We also explicitly call play() after the media is ready
     as an additional reliability measure.
     ========================================================== */

  useEffect(() => {
    if (!videoReady) return

    const video = videoRef.current

    if (!video) return

    video.muted = true
    video.playsInline = true
    video.playbackRate = ENVELOPE_PLAYBACK_RATE

    const startPlayback = async () => {
      try {
        await video.play()
      } catch {
        /*
         * We deliberately do nothing here.
         *
         * The five-second fallback remains active and will
         * redirect to Home if playback never starts.
         */
      }
    }

    startPlayback()
  }, [videoReady])

  /* ==========================================================
     VIDEO PROGRESS
     ========================================================== */

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (!video || !video.duration) return

    const currentTime = video.currentTime

    /*
     * --------------------------------------------------------
     * WELCOME
     * --------------------------------------------------------
     *
     * The envelope has almost completely opened.
     * The flaps are no longer dominating the composition.
     */
    if (
      currentTime >= WELCOME_AT &&
      !showWelcome
    ) {
      setShowWelcome(true)
    }

    /*
     * --------------------------------------------------------
     * NAMES
     * --------------------------------------------------------
     */
    if (
      currentTime >= NAMES_AT &&
      !showNames
    ) {
      setShowNames(true)
    }

    /*
     * --------------------------------------------------------
     * FINAL CINEMATIC ZOOM
     * --------------------------------------------------------
     *
     * Begin during the final portion of the video.
     */
    const remaining =
      video.duration - currentTime

    if (
      remaining <= 3.5 &&
      !isFinalZoom
    ) {
      setIsFinalZoom(true)
    }
  }

  /* ==========================================================
     VIDEO COMPLETE
     * ========================================================= */

  const handleVideoEnded = () => {
    if (hasFinishedRef.current) return

    hasFinishedRef.current = true

    /*
     * Give the final composition approximately three seconds
     * to breathe before leaving the splash.
     */
    leaveTimerRef.current = window.setTimeout(() => {
      if (!mountedRef.current) return

      setIsLeaving(true)

      /*
       * Allow the splash fade to complete before navigating.
       */
      navigationTimerRef.current = window.setTimeout(() => {
        completeSplash()
      }, durationPage * 1000)
    }, HOLD_AFTER_VIDEO)
  }

  /* ==========================================================
     COMPLETE SPLASH
     ========================================================== */

  function completeSplash() {
    if (!mountedRef.current) return

    /*
     * REFRESH / OVERLAY MODE
     *
     * The parent already owns /home.
     */
    if (onComplete) {
      onComplete()
      return
    }

    /*
     * NORMAL MODE
     *
     * SplashPage is the "/" route.
     */
    navigate("/home", {
      replace: true,
    })
  }

  /* ==========================================================
     IMMEDIATE FALLBACK
     ========================================================== */

  function finishSplashImmediately() {
    if (hasFinishedRef.current) return

    hasFinishedRef.current = true

    /*
     * Stop the video if it exists.
     */
    const video = videoRef.current

    if (video) {
      video.pause()
    }

    /*
     * We don't perform the cinematic sequence when the video
     * has failed. The visitor simply proceeds to Home.
     */
    setIsLeaving(true)

    navigationTimerRef.current = window.setTimeout(() => {
      completeSplash()
    }, durationPage * 1000)
  }

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <motion.main
      className="
        fixed
        inset-0
        z-[100]
        h-[100dvh]
        min-h-[100svh]
        w-full
        overflow-hidden
        overscroll-none
        bg-[var(--color-envelope)]
        touch-none
      "
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: isLeaving ? 0 : 1,
      }}
      transition={pageTransition}
      aria-label="Wedding invitation"
    >

      {/* =====================================================
          ENVELOPE VIDEO
          ===================================================== */}

      <motion.video
        ref={videoRef}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleVideoReady}
        onLoadedData={handleVideoReady}
        onCanPlay={handleVideoReady}
        onPlay={handleVideoStarted}
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

      {/* =====================================================
          INTRO TYPOGRAPHY
          ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          flex
          items-center
          justify-center
          px-[var(--page-padding)]
        "
      >
        <div
          className="
            flex
            w-full
            max-w-[1100px]
            flex-col
            items-center
            text-center
          "
        >

          {/* =================================================
              WELCOME
              ================================================= */}

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
            className="
              font-body
              text-base
              font-medium
              uppercase
              leading-[1.9]
              tracking-[0.30em]
              text-[var(--color-muted)]
              sm:text-lg
            "
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

          <h1
            className="
              relative
              top-6
              flex
              w-full
              max-w-[92vw]
              flex-col
              items-center
              font-display
              text-[clamp(4.6rem,17vw,8rem)]
              leading-[0.88]
              text-[var(--color-espresso)]
            "
          >

            {/* MANUEL */}

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
              className="
                whitespace-nowrap
              "
            >
              Manuel
            </motion.span>

            {/* & */}

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
              className="
                my-2
                text-[0.46em]
              "
            >
              &amp;
            </motion.span>

            {/* SHARON */}

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
              className="
                whitespace-nowrap
              "
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
            className="
              mt-8
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.24em]
              text-[var(--color-muted)]
              sm:text-base
            "
          >
            #THEMANFORSHAY
          </motion.p>

        </div>
      </div>

    </motion.main>
  )
}