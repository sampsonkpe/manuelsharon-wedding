import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

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

interface SplashPageProps {
  onComplete?: () => void
}

const ENVELOPE_PLAYBACK_RATE = 1

/*
 * Updated for the new ~7.16s envelope video.
 */
const WELCOME_AT = 4.8
const NAMES_AT = 5.45

const HOLD_AFTER_VIDEO = 3000

const INACTIVITY_FALLBACK_DELAY = 10000

const FALLBACK_NAMES_DELAY =
  (NAMES_AT - WELCOME_AT) * 1000

const FALLBACK_HOLD = 3200

const finalZoomTransition = {
  duration: durationCinematic + 2.8,
  ease: luxuryEase,
}

const pageTransition = {
  duration: durationPage,
  ease: luxuryEase,
}

export default function SplashPage({
  onComplete,
}: SplashPageProps) {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  const fallbackTimerRef =
    useRef<number | null>(null)

  const leaveTimerRef =
    useRef<number | null>(null)

  const navigationTimerRef =
    useRef<number | null>(null)

  const fallbackNamesTimerRef =
    useRef<number | null>(null)

  const videoInitialisedRef =
    useRef(false)

  const isPrimingVideoRef =
    useRef(false)

  const hasFinishedRef =
    useRef(false)

  const videoStartedRef =
    useRef(false)

  const mountedRef =
    useRef(true)

  const [videoReady, setVideoReady] =
    useState(false)

  const [hasOpened, setHasOpened] =
    useState(false)

  const [showWelcome, setShowWelcome] =
    useState(false)

  const [showNames, setShowNames] =
    useState(false)

  const [isFinalZoom, setIsFinalZoom] =
    useState(false)

  const [isLeaving, setIsLeaving] =
    useState(false)

  const [isVideoFading, setIsVideoFading] =
    useState(false)

  useEffect(() => {
    const originalOverflow =
      document.body.style.overflow

    const originalTouchAction =
      document.body.style.touchAction

    const originalOverscrollBehavior =
      document.body.style.overscrollBehavior

    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"
    document.body.style.overscrollBehavior = "none"

    return () => {
      document.body.style.overflow =
        originalOverflow

      document.body.style.touchAction =
        originalTouchAction

      document.body.style.overscrollBehavior =
        originalOverscrollBehavior
    }
  }, [])

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false

      if (
        fallbackTimerRef.current !== null
      ) {
        window.clearTimeout(
          fallbackTimerRef.current,
        )
      }

      if (
        leaveTimerRef.current !== null
      ) {
        window.clearTimeout(
          leaveTimerRef.current,
        )
      }

      if (
        navigationTimerRef.current !== null
      ) {
        window.clearTimeout(
          navigationTimerRef.current,
        )
      }

      if (
        fallbackNamesTimerRef.current !== null
      ) {
        window.clearTimeout(
          fallbackNamesTimerRef.current,
        )
      }
    }
  }, [])

  const completeSplash =
    useCallback(() => {
      if (!mountedRef.current) return

      if (onComplete) {
        onComplete()
        return
      }

      navigate("/home", {
        replace: true,
      })
    }, [navigate, onComplete])

  const finishSplashImmediately =
    useCallback(() => {
      if (hasFinishedRef.current) return

      hasFinishedRef.current = true

      const video = videoRef.current

      if (video) {
        video.pause()
      }

      setIsVideoFading(true)
      setHasOpened(true)
      setShowWelcome(true)

      fallbackNamesTimerRef.current =
        window.setTimeout(() => {
          if (!mountedRef.current) return

          setShowNames(true)
        }, FALLBACK_NAMES_DELAY)

      leaveTimerRef.current =
        window.setTimeout(() => {
          if (!mountedRef.current) return

          setIsLeaving(true)

          navigationTimerRef.current =
            window.setTimeout(() => {
              completeSplash()
            }, durationPage * 1000)
        }, FALLBACK_HOLD)
    }, [completeSplash])

  useEffect(() => {
    fallbackTimerRef.current =
      window.setTimeout(() => {
        if (
          mountedRef.current &&
          !hasOpened &&
          !hasFinishedRef.current
        ) {
          finishSplashImmediately()
        }
      }, INACTIVITY_FALLBACK_DELAY)

    return () => {
      if (
        fallbackTimerRef.current !== null
      ) {
        window.clearTimeout(
          fallbackTimerRef.current,
        )

        fallbackTimerRef.current = null
      }
    }
  }, [
    hasOpened,
    finishSplashImmediately,
  ])

  const waitForPaint = () =>
    new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve()
        })
      })
    })

  const initialiseVideoRenderer =
    async (video: HTMLVideoElement) => {
      if (
        videoInitialisedRef.current ||
        isPrimingVideoRef.current
      ) {
        return
      }

      isPrimingVideoRef.current = true

      video.muted = true
      video.playsInline = true
      video.playbackRate =
        ENVELOPE_PLAYBACK_RATE

      try {
        await video.play()

        await waitForPaint()

        video.pause()

        video.currentTime = 0

        await waitForPaint()
      } catch {
        video.pause()
        video.currentTime = 0
      } finally {
        isPrimingVideoRef.current = false
        videoInitialisedRef.current = true

        if (mountedRef.current) {
          setVideoReady(true)
        }
      }
    }

  const handleVideoReady = () => {
    const video = videoRef.current

    if (!video) return

    if (videoInitialisedRef.current) return

    void initialiseVideoRenderer(video)
  }

  const handleOpenInvitation =
    async () => {
      if (!videoReady || hasOpened) return

      const video = videoRef.current

      if (!video) return

      setHasOpened(true)

      if (
        fallbackTimerRef.current !== null
      ) {
        window.clearTimeout(
          fallbackTimerRef.current,
        )

        fallbackTimerRef.current = null
      }

      video.pause()
      video.currentTime = 0
      video.playbackRate =
        ENVELOPE_PLAYBACK_RATE

      try {
        await video.play()
      } catch {
        setHasOpened(false)

        fallbackTimerRef.current =
          window.setTimeout(() => {
            if (
              mountedRef.current &&
              !hasFinishedRef.current
            ) {
              finishSplashImmediately()
            }
          }, INACTIVITY_FALLBACK_DELAY)
      }
    }

  const handleVideoStarted = () => {
    if (isPrimingVideoRef.current) {
      return
    }

    videoStartedRef.current = true

    if (
      fallbackTimerRef.current !== null
    ) {
      window.clearTimeout(
        fallbackTimerRef.current,
      )

      fallbackTimerRef.current = null
    }
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (
      !video ||
      !video.duration ||
      !hasOpened
    ) {
      return
    }

    const currentTime =
      video.currentTime

    if (
      currentTime >= WELCOME_AT &&
      !showWelcome
    ) {
      setShowWelcome(true)
    }

    if (
      currentTime >= NAMES_AT &&
      !showNames
    ) {
      setShowNames(true)
    }

    const remaining =
      video.duration - currentTime

    if (
      remaining <= 3.5 &&
      !isFinalZoom
    ) {
      setIsFinalZoom(true)
    }
  }

  const handleVideoEnded = () => {
    if (hasFinishedRef.current) return

    hasFinishedRef.current = true

    leaveTimerRef.current =
      window.setTimeout(() => {
        if (!mountedRef.current) return

        setIsLeaving(true)

        navigationTimerRef.current =
          window.setTimeout(() => {
            completeSplash()
          }, durationPage * 1000)
      }, HOLD_AFTER_VIDEO)
  }

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
        touch-none
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
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
        "
        autoPlay={false}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={
          handleVideoReady
        }
        onLoadedData={
          handleVideoReady
        }
        onCanPlay={
          handleVideoReady
        }
        onPlay={
          handleVideoStarted
        }
        onTimeUpdate={
          handleTimeUpdate
        }
        onEnded={
          handleVideoEnded
        }
        animate={{
          opacity: isVideoFading ? 0 : 1,
          scale: isFinalZoom
            ? 1.26
            : 1,
        }}
        transition={{
          opacity: {
            duration: 1.2,
            ease: luxuryEase,
          },
          scale: finalZoomTransition,
        }}
        aria-hidden="true"
      >
        <source
          src={envelopeVideo}
          type="video/mp4"
        />
      </motion.video>

      {/* =====================================================
          SEAL HIT AREA
          ===================================================== */}

      {!hasOpened && (
        <button
          type="button"
          aria-label="Tap the seal to open the wedding invitation"
          onClick={
            handleOpenInvitation
          }
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
            focus-visible:ring-2
            focus-visible:ring-[var(--color-caramel)]
            focus-visible:ring-offset-2
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
              opacity: [
                0.75,
                1,
                0.75,
              ],
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
            Tap the seal to open
          </motion.span>

          <span
            className="
              h-px
              w-8
              bg-[var(--color-caramel)]
            "
          />
        </div>
      </motion.div>

      {/* =====================================================
          TYPOGRAPHY OVERLAY
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
        "
      >
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          {/* -------------------------------------------------
              WELCOME
              ------------------------------------------------- */}

          <motion.p
            initial={
              cinematicInitial
            }
            animate={
              showWelcome
                ? cinematicAnimate
                : cinematicInitial
            }
            transition={{
              ...cinematicTransition,
              duration:
                durationCinematic,
            }}
            className="
              w-full
              px-5
              font-body
              text-sm
              font-medium
              uppercase
              leading-[1.9]
              tracking-[0.24em]
              text-[var(--color-muted)]
              sm:px-[var(--page-padding)]
              sm:text-lg
              sm:tracking-[0.30em]
            "
          >
            <span className="block">
              Welcome to
            </span>

            <span className="block">
              the Wedding of
            </span>
          </motion.p>

          {/* -------------------------------------------------
              NAMES
              
              Deliberately uses viewport width rather than
              sharing the welcome/hashtag width constraint.
              This prevents Mea Culpa's large flourishes from
              being clipped on narrow iOS viewports.
              ------------------------------------------------- */}

          <h1
            className="
              relative
              top-4
              flex
              w-screen
              flex-col
              items-center
              justify-center
              overflow-visible
              font-display
              text-[clamp(5rem,21vw,10rem)]
              leading-[1]
              text-[var(--color-espresso)]
              sm:top-6
              sm:text-[clamp(5rem,20vw,12rem)]
              sm:leading-[0.9]
            "
          >
            <motion.span
              initial={
                cinematicInitial
              }
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
                block
                whitespace-nowrap
              "
            >
              Manuel
            </motion.span>

            <motion.span
              initial={
                cinematicInitial
              }
              animate={
                showNames
                  ? cinematicAnimate
                  : cinematicInitial
              }
              transition={{
                ...cinematicTransition,
                delay:
                  staggerSmall * 2,
              }}
              className="
                my-2
                block
                text-[0.42em]
              "
            >
              &amp;
            </motion.span>

            <motion.span
              initial={
                cinematicInitial
              }
              animate={
                showNames
                  ? cinematicAnimate
                  : cinematicInitial
              }
              transition={{
                ...cinematicTransition,
                delay:
                  staggerSmall * 3,
              }}
              className="
                block
                whitespace-nowrap
              "
            >
              Sharon
            </motion.span>
          </h1>

          {/* -------------------------------------------------
              HASHTAG
              ------------------------------------------------- */}

          <motion.p
            initial={
              cinematicInitial
            }
            animate={
              showNames
                ? cinematicAnimate
                : cinematicInitial
            }
            transition={{
              ...cinematicTransition,
              delay:
                staggerSmall * 4,
            }}
            className="
              mt-7
              w-full
              px-5
              font-body
              text-xs
              font-medium
              uppercase
              tracking-[0.20em]
              text-[var(--color-muted)]
              sm:mt-8
              sm:px-[var(--page-padding)]
              sm:text-base
              sm:tracking-[0.24em]
            "
          >
            #THEMANFORSHAY
          </motion.p>
        </div>
      </div>
    </motion.main>
  )
}