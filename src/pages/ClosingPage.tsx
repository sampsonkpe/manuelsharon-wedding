import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import closingImage from "../assets/couple/closing.png"
import {
  cinematicInitial,
  cinematicAnimate,
  cinematicTransition,
} from "../components/motion/motion"

const RSVP_SUBMITTED_KEY =
  "themanforshay-rsvp-submitted"

export default function ClosingPage() {
  const navigate = useNavigate()

  const [showImage, setShowImage] =
    useState(false)

  const [showFinalText, setShowFinalText] =
    useState(false)

  const [showBackButton, setShowBackButton] =
    useState(false)

  /*
   * ============================================================
   * RSVP ACCESS
   * ============================================================
   *
   * The closing experience is only available after
   * a successful RSVP submission.
   */

  useEffect(() => {
    const hasSubmittedRsvp =
      sessionStorage.getItem(
        RSVP_SUBMITTED_KEY,
      ) === "true"

    if (!hasSubmittedRsvp) {
      navigate("/home", {
        replace: true,
      })

      return
    }

    /*
     * Let the opening scripture breathe before
     * transitioning into the photograph.
     */

    const imageTimer =
      window.setTimeout(() => {
        setShowImage(true)
      }, 5000)

    return () => {
      window.clearTimeout(imageTimer)
    }
  }, [navigate])

  /*
   * ============================================================
   * FINAL MESSAGE
   * ============================================================
   *
   * The image remains stationary while the final
   * message reveals into its reserved space.
   */

  useEffect(() => {
    if (!showImage) return

    const finalTextTimer =
      window.setTimeout(() => {
        setShowFinalText(true)
      }, 1800)

    return () => {
      window.clearTimeout(finalTextTimer)
    }
  }, [showImage])

  /*
   * ============================================================
   * BACK BUTTON
   * ============================================================
   *
   * The button appears after the final message has
   * had time to breathe.
   */

  useEffect(() => {
    if (!showFinalText) return

    const backButtonTimer =
      window.setTimeout(() => {
        setShowBackButton(true)
      }, 1200)

    return () => {
      window.clearTimeout(backButtonTimer)
    }
  }, [showFinalText])

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-transparent">

      <div
        className="
          flex
          min-h-[100svh]
          w-full
          items-center
          justify-center
          px-[var(--page-padding)]
          py-10
          sm:py-14
        "
      >

        <div className="w-full max-w-[760px]">

          {/* =================================================
              OPENING SCRIPTURE
              ================================================= */}

          {!showImage && (
            <motion.div
              initial={cinematicInitial}
              animate={cinematicAnimate}
              exit={{
                opacity: 0,
                scale: 0.985,
                filter: "blur(4px)",
              }}
              transition={cinematicTransition}
              className="
                fixed
                left-1/2
                top-1/2
                z-20
                w-[min(90vw,620px)]
                -translate-x-1/2
                -translate-y-1/2
                text-center
              "
            >
              <p
                className="
                  font-editorial
                  text-2xl
                  italic
                  leading-[1.25]
                  text-[var(--color-espresso)]
                  sm:text-3xl
                  md:text-4xl
                "
              >
                &quot;...And a threefold cord is not
                quickly broken.&quot;
              </p>

              <p
                className="
                  mt-5
                  font-body
                  text-sm
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-[var(--color-muted)]
                  sm:text-base
                "
              >
                Ecclesiastes 4:12 • NKJV
              </p>
            </motion.div>
          )}

          {/* =================================================
              CLOSING COMPOSITION
              ================================================= */}

          <div
            className="
              grid
              grid-rows-[auto_115px_70px]
              sm:grid-rows-[auto_125px_75px]
            "
          >

            {/* =================================================
                CLOSING IMAGE
                ================================================= */}

            <motion.div
              initial={cinematicInitial}
              animate={
                showImage
                  ? cinematicAnimate
                  : cinematicInitial
              }
              transition={cinematicTransition}
              className="
                relative
                h-[58svh]
                min-h-[420px]
                max-h-[620px]
                overflow-hidden
                rounded-[var(--radius-lg)]
              "
            >
              <img
                src={closingImage}
                alt="Manuel and Sharon"
                loading="eager"
                className="
                  absolute
                  bottom-0
                  left-0
                  block
                  h-auto
                  w-full
                "
              />
            </motion.div>

            {/* =================================================
                FINAL MESSAGE
                ================================================= */}

            <motion.p
              initial={cinematicInitial}
              animate={
                showFinalText
                  ? cinematicAnimate
                  : cinematicInitial
              }
              transition={cinematicTransition}
              className="
                mx-auto
                mt-7
                max-w-[620px]
                self-start
                px-4
                text-center
                font-editorial
                text-2xl
                italic
                leading-[1.25]
                text-[var(--color-espresso)]
                sm:mt-10
                sm:text-3xl
              "
            >
              We can&apos;t wait to have you
              witness the beginning of our
              forever.
            </motion.p>

            {/* =================================================
                BACK TO INVITATION
                ================================================= */}

            <motion.div
              initial={cinematicInitial}
              animate={
                showBackButton
                  ? cinematicAnimate
                  : cinematicInitial
              }
              transition={{
                ...cinematicTransition,
                duration: 1.3,
              }}
              className="
                flex
                items-start
                justify-center
              "
            >
              <button
                type="button"
                onClick={() =>
                  navigate("/home")
                }
                className="
                  invitation-button
                  whitespace-nowrap
                "
              >
                Back to Invitation
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  )
}