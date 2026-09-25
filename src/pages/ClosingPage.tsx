import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import closingImage from "../assets/couple/closing.png"
import backgroundImage from "../assets/couple/background.png"
import {
  luxuryEase,
  revealInitial,
  revealAnimate,
  revealTransition,
  imageRevealInitial,
  imageRevealAnimate,
  imageRevealTransition,
} from "../components/motion/motion"

const ATTENDING_KEY = "themanforshay-attending"

export default function ClosingPage() {
  const navigate = useNavigate()

  const [showImage, setShowImage] = useState(false)
  const [showFinalText, setShowFinalText] =
    useState(false)
  const [showBackButton, setShowBackButton] =
    useState(false)

  useEffect(() => {
    const isAttending =
      sessionStorage.getItem(ATTENDING_KEY) === "true"

    if (!isAttending) {
      navigate("/home", { replace: true })
      return
    }

    /*
     * Hold the scripture transition on screen
     * before revealing the closing composition.
     */
    const imageTimer = window.setTimeout(() => {
      setShowImage(true)
    }, 5000)

    return () => {
      window.clearTimeout(imageTimer)
    }
  }, [navigate])

  useEffect(() => {
    if (!showImage) return

    /*
     * Allow the photograph to settle before
     * revealing the final closing message.
     */
    const finalTextTimer = window.setTimeout(() => {
      setShowFinalText(true)
    }, 1500)

    return () => {
      window.clearTimeout(finalTextTimer)
    }
  }, [showImage])

  useEffect(() => {
    if (!showFinalText) return

    /*
     * Let the final message breathe before
     * revealing the return action.
     */
    const backButtonTimer = window.setTimeout(() => {
      setShowBackButton(true)
    }, 1000)

    return () => {
      window.clearTimeout(backButtonTimer)
    }
  }, [showFinalText])

  return (
    <main className="min-h-[100svh] overflow-hidden bg-[var(--color-background)]">
      <div className="relative flex min-h-[100svh] w-full items-center justify-center px-[var(--page-padding)]">
        {/* CLOSING COMPOSITION */}
        <div className="relative w-full max-w-[760px] pb-12">

          {/* SCRIPTURE TRANSITION */}
          <AnimatePresence mode="wait">
            {!showImage && (
              <motion.div
                key="opening-message"
                initial={revealInitial}
                animate={revealAnimate}
                exit={{
                  opacity: 0,
                  filter: "blur(3px)",
                }}
                transition={revealTransition}
                className="fixed left-1/2 top-1/2 z-20 w-[min(90vw,620px)] -translate-x-1/2 -translate-y-1/2 text-center"
              >
                <p className="font-editorial text-[clamp(1.7rem,4vw,2.7rem)] italic leading-[1.25] text-[var(--color-espresso)]">
                  <strong className="font-[550]">
                    "...And a threefold cord is not
                    quickly broken."
                  </strong>
                </p>

                <p className="mt-5 font-body text-[0.46rem] font-medium uppercase tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.5rem]">
                  Ecclesiastes 4:12 • NKJV
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BACKGROUND MONOGRAM */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: showImage ? 0.2 : 0,
              scale: showImage ? 1 : 0.96,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.5,
              ease: luxuryEase,
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-[85%] -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <img
              src={backgroundImage}
              alt=""
              className="block h-auto w-full object-contain"
            />
          </motion.div>

          {/* CLOSING IMAGE */}
          <motion.div
            initial={imageRevealInitial}
            animate={
              showImage
                ? imageRevealAnimate
                : imageRevealInitial
            }
            transition={imageRevealTransition}
            className="relative z-10 overflow-hidden rounded-[var(--radius-lg)]"
          >
            <img
              src={closingImage}
              alt="Manuel and Sharon"
              loading="eager"
              className="block h-auto w-full"
            />
          </motion.div>

          {/* FINAL MESSAGE */}
          <AnimatePresence>
            {showFinalText && (
              <motion.p
                key="final-message"
                initial={revealInitial}
                animate={revealAnimate}
                exit={{
                  opacity: 0,
                  filter: "blur(2px)",
                }}
                transition={revealTransition}
                className="absolute inset-x-0 bottom-0 text-center font-editorial text-[clamp(1.35rem,3vw,1.9rem)] italic leading-[1.35] text-[var(--color-espresso)]"
              >
                We can&apos;t wait to have you
                witness the beginning of our
                forever.
              </motion.p>
            )}
          </AnimatePresence>

          {/* BACK TO INVITATION */}
          <AnimatePresence>
            {showBackButton && (
              <motion.button
                key="back-to-invitation"
                type="button"
                initial={{
                  opacity: 0,
                  y: 10,
                  filter: "blur(3px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -6,
                  filter: "blur(2px)",
                }}
                transition={{
                  duration: 0.9,
                  ease: luxuryEase,
                }}
                onClick={() => navigate("/home")}
                className="invitation-button absolute left-1/2 top-full mt-5 -translate-x-1/2 whitespace-nowrap"
              >
                Back to Invitation
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}