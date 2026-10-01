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
   * Used when SplashPage is displayed as an overlay on /home
   * after a browser refresh.
   *
   * When supplied, SplashPage finishes its animation and
   * notifies the parent instead of navigating to /home.
   */
  onComplete?: () => void
}

/* ============================================================
   ENVELOPE
   ============================================================ */

const ENVELOPE_PLAYBACK_RATE = 0.68

const finalZoomTransition = {
  duration: durationCinematic + 2.8,
  ease: luxuryEase,
}

const pageTransition = {
  duration: durationPage,
  ease: luxuryEase,
}

/* ============================================================
   TIMING
   ============================================================ */

/*
 * Timings begin only after the user taps the seal and the
 * envelope video starts from frame 0.
 *
 * The source video is approximately 6 seconds.
 * At 0.68x playback it takes approximately 8.8 seconds.
 *
 * The envelope itself begins opening at approximately source
 * video second 2.
 */

const WELCOME_DELAY = 3000
const NAMES_DELAY = 5200
const HOLD_AFTER_NAMES = 4200

/* ============================================================
   COMPONENT
   ============================================================ */

export default function SplashPage({
  onComplete,
}: SplashPageProps) {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  const welcomeTimerRef = useRef<number | null>(null)
  const namesTimerRef = useRef<number | null>(null)
  const leaveTimerRef = useRef<number | null>(null)
  const navigationTimerRef = useRef<number | null>(null)

  const videoInitialisedRef = useRef(false)

  const [videoReady, setVideoReady] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isFinalZoom, setIsFinalZoom] = useState(false)

  const [showWelcome, setShowWelcome] = useState(false)
  const [showNames, setShowNames] = useState(false)

  /* ============================================================
     CLEANUP
     ============================================================ */

  useEffect(() => {
    return () => {
      if (welcomeTimerRef.current !== null) {
        window.clearTimeout(welcomeTimerRef.current)
      }

      if (namesTimerRef.current !== null) {
        window.clearTimeout(namesTimerRef.current)
      }

      if (leaveTimerRef.current !== null) {
        window.clearTimeout(leaveTimerRef.current)
      }

      if (navigationTimerRef.current !== null) {
        window.clearTimeout(navigationTimerRef.current)
      }
    }
  }, [])

  /* ============================================================
     VIDEO READY
     ============================================================ */

  const handleVideoReady = () => {
    const video = videoRef.current

    if (!video) return

    /*
     * loadeddata and canplay can both fire.
     * Initialise the video only once.
     */
    if (videoInitialisedRef.current) return

    videoInitialisedRef.current = true

    /*
     * Always show the sealed first frame.
     */
    video.pause()
    video.currentTime = 0
    video.playbackRate = ENVELOPE_PLAYBACK_RATE

    setVideoReady(true)
  }

  /* ============================================================
     OPEN ENVELOPE
     ============================================================ */

  const handleOpenInvitation = async () => {
    if (!videoReady || hasOpened) return

    const video = videoRef.current

    if (!video) return

    /*
     * Prevent repeated taps from restarting the sequence.
     */
    setHasOpened(true)

    /*
     * Force the video back to the sealed frame.
     */
    video.pause()
    video.currentTime = 0
    video.playbackRate = ENVELOPE_PLAYBACK_RATE

    try {
      await video.play()
    } catch {
      /*
       * If playback fails, allow another attempt.
       */
      setHasOpened(false)
      return
    }

    /*
     * Welcome appears while the envelope is opening.
     */
    welcomeTimerRef.current = window.setTimeout(() => {
      setShowWelcome(true)
    }, WELCOME_DELAY)

    /*
     * Names appear afterwards.
     */
    namesTimerRef.current = window.setTimeout(() => {
      setShowNames(true)
    }, NAMES_DELAY)
  }

  /* ============================================================
     FINAL CINEMATIC ZOOM
     ============================================================ */

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (!video || !video.duration || !hasOpened) return

    const remaining =
      video.duration - video.currentTime

    if (remaining <= 3.5) {
      setIsFinalZoom(true)
    }
  }

  /* ============================================================
     VIDEO COMPLETE
     ============================================================ */

  const handleVideoEnded = () => {
    if (!hasOpened) return

    /*
     * Let the completed composition breathe.
     */
    leaveTimerRef.current = window.setTimeout(() => {
      setIsLeaving(true)

      navigationTimerRef.current = window.setTimeout(() => {
        /*
         * REFRESH MODE
         *
         * We are already on /home.
         */
        if (onComplete) {
          onComplete()
          return
        }

        /*
         * NORMAL SPLASH MODE
         */
        navigate("/home", {
          replace: true,
        })
      }, durationPage * 1000)
    }, HOLD_AFTER_NAMES)
  }

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <motion.main
      className="
        fixed
        inset-0
        z-[100]
        h-[100svh]
        w-full
        overflow-hidden
        bg-[var(--color-envelope)]
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
          h-full
          w-full
          object-cover
        "
        autoPlay={false}
        muted
        playsInline
        preload="auto"
        onLoadedData={handleVideoReady}
        onCanPlay={handleVideoReady}
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
          SEAL TAP TARGET
          =====================================================

          IMPORTANT:

          This is NOT a full-screen button.

          Only the area around the wax seal is interactive.
          Tapping elsewhere on the envelope does nothing.
          ===================================================== */}

      {!hasOpened && (
        <button
          type="button"
          aria-label="Tap the seal to open the wedding invitation"
          onClick={handleOpenInvitation}
          disabled={!videoReady}
          className="
            absolute
            left-1/2
            top-[44.5%]
            z-30
            aspect-square
            w-[clamp(5.25rem,18vw,7rem)]
            -translate-x-1/2
            -translate-y-1/2
            cursor-pointer
            rounded-full
            bg-transparent
            outline-none
          "
        />
      )}

      {/* =====================================================
          SUBTLE TAP PROMPT
          ===================================================== */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-[18vh]
          z-40
          flex
          justify-center
        "
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={{
          opacity:
            videoReady && !hasOpened
              ? 1
              : 0,
          y:
            videoReady && !hasOpened
              ? 0
              : 5,
        }}
        transition={{
          duration: 1.4,
          ease: luxuryEase,
        }}
      >
        <div
          className="
            flex
            flex-col
            items-center
            gap-3
            text-center
          "
        >
          <span
            className="
              font-body
              text-sm
              font-medium
              uppercase
              tracking-[0.22em]
              text-[var(--color-muted)]
            "
          >
            Tap seal to open
          </span>

          <span
            className="
              h-px
              w-8
              bg-[var(--color-caramel)]
              opacity-60
            "
          />
        </div>
      </motion.div>

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
              className="
                my-2
                text-[0.46em]
              "
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