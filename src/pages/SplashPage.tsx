import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

import envelopeVideo from "../assets/invitation/envelope.mp4"
import envelopePoster from "../assets/invitation/envelope-poster.jpg"

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
   * the splash calls this instead of navigating to /home.
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
   INTRO TIMING
   ============================================================

   These timings begin only after the user taps the wax seal.

   The source video is approximately 6 seconds long.

   At 0.68x playback:

   6 seconds ÷ 0.68 ≈ 8.8 seconds

   The envelope begins opening at approximately source-video
   second 2, so the visitor gets a deliberate sealed-envelope
   moment before the flap begins to open.

   5.6 seconds:
   → Welcome appears when the envelope is almost open.

   7.6 seconds:
   → Names begin appearing after the envelope has opened.

   5.6 seconds after the video ends:
   → Hold the completed composition before leaving.
   ============================================================ */

const WELCOME_DELAY = 5600
const NAMES_DELAY = 7600
const HOLD_AFTER_VIDEO = 5600

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

  /*
   * Prevent loadeddata/canplay from repeatedly resetting
   * the video.
   */
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
     VIDEO INITIALISATION
     ============================================================

     The video is deliberately NOT autoplayed.

     We wait until the first frame is available, pause it,
     and explicitly force it back to frame 0.

     Therefore the first thing the visitor sees is always the
     completely sealed envelope.
     ============================================================ */

  const handleVideoReady = () => {
    const video = videoRef.current

    if (!video) return

    if (videoInitialisedRef.current) return

    videoInitialisedRef.current = true

    video.pause()
    video.currentTime = 0
    video.playbackRate = ENVELOPE_PLAYBACK_RATE

    setVideoReady(true)
  }

  /* ============================================================
     OPEN ENVELOPE
     ============================================================

     Only the wax-seal area is clickable.

     Nothing begins until the user taps the seal.
     ============================================================ */

  const handleOpenInvitation = async () => {
    if (!videoReady || hasOpened) return

    const video = videoRef.current

    if (!video) return

    /*
     * Prevent multiple taps from restarting the sequence.
     */
    setHasOpened(true)

    /*
     * Always begin from the completely sealed frame.
     */
    video.pause()
    video.currentTime = 0
    video.playbackRate = ENVELOPE_PLAYBACK_RATE

    try {
      await video.play()
    } catch {
      /*
       * If playback fails, allow the user to try again.
       */
      setHasOpened(false)
      return
    }

    /*
     * ----------------------------------------------------------
     * WELCOME
     * ----------------------------------------------------------
     *
     * This intentionally uses the ORIGINAL timing.
     *
     * The envelope has had time to open before the text appears.
     */

    welcomeTimerRef.current = window.setTimeout(() => {
      setShowWelcome(true)
    }, WELCOME_DELAY)

    /*
     * ----------------------------------------------------------
     * NAMES
     * ----------------------------------------------------------
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

    /*
     * Begin the final cinematic zoom during the final
     * portion of the video.
     */
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
     * Hold the completed composition before transitioning.
     */
    leaveTimerRef.current = window.setTimeout(() => {
      setIsLeaving(true)

      navigationTimerRef.current = window.setTimeout(() => {
        /*
         * REFRESH MODE
         *
         * SplashPage is sitting over /home.
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
      }, durationPage * 1000)
    }, HOLD_AFTER_VIDEO)
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
        poster={envelopePoster}
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

          Only the wax-seal area is interactive.

          The target is centred over the seal in the poster/video.

          Tapping anywhere else on the envelope does nothing.
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
            top-[50%]
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
          TAP PROMPT
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
          <motion.span
            animate={{
              opacity: [0.45, 0.9, 0.45],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
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
          </motion.span>

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
              flex-col
              items-center
              font-display
              text-7xl
              leading-[0.88]
              text-[var(--color-espresso)]
              sm:text-8xl
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
              className="whitespace-nowrap"
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
                text-5xl
                sm:text-6xl
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