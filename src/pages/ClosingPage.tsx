import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import closingImage from "../assets/couple/closing.png"
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
  const [showFinalText, setShowFinalText] = useState(false)
  const [showBackButton, setShowBackButton] = useState(false)

  /*
   * Verify that the guest is allowed to access
   * the closing experience.
   *
   * The scripture remains on screen for 5 seconds
   * before the closing composition begins.
   */
  useEffect(() => {
    const isAttending =
      sessionStorage.getItem(ATTENDING_KEY) === "true"

    if (!isAttending) {
      navigate("/home", { replace: true })
      return
    }

    const imageTimer = window.setTimeout(() => {
      setShowImage(true)
    }, 5000)

    return () => {
      window.clearTimeout(imageTimer)
    }
  }, [navigate])

  /*
   * Once the photograph has appeared,
   * allow it to breathe before revealing
   * the closing message.
   */
  useEffect(() => {
    if (!showImage) return

    const finalTextTimer = window.setTimeout(() => {
      setShowFinalText(true)
    }, 1500)

    return () => {
      window.clearTimeout(finalTextTimer)
    }
  }, [showImage])

  /*
   * Once the closing message has appeared,
   * give it room to breathe before introducing
   * the return button.
   */
  useEffect(() => {
    if (!showFinalText) return

    const backButtonTimer = window.setTimeout(() => {
      setShowBackButton(true)
    }, 1200)

    return () => {
      window.clearTimeout(backButtonTimer)
    }
  }, [showFinalText])

  return (
    <main className="relative min-h-[100svh] overflow-hidden bg-transparent">
      <div className="flex min-h-[100svh] w-full items-center justify-center px-[var(--page-padding)] py-16 sm:py-20">
        <div className="w-full max-w-[760px]">

          {/* =================================================
              SCRIPTURE TRANSITION
              ================================================= */}

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
                    &quot;...And a threefold cord is not
                    quickly broken.&quot;
                  </strong>
                </p>

                <p className="mt-5 font-body text-[0.46rem] font-medium uppercase tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.5rem]">
                  Ecclesiastes 4:12 • NKJV
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =================================================
              CLOSING IMAGE
              ================================================= */}

          <motion.div
            initial={imageRevealInitial}
            animate={
              showImage
                ? imageRevealAnimate
                : imageRevealInitial
            }
            transition={imageRevealTransition}
            className="relative overflow-hidden rounded-[var(--radius-lg)]"
          >
            <img
              src={closingImage}
              alt="Manuel and Sharon"
              loading="eager"
              className="block h-auto w-full"
            />
          </motion.div>

          {/* =================================================
              FINAL MESSAGE
              ================================================= */}

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
                className="mx-auto mt-9 max-w-[620px] px-4 text-center font-editorial text-[clamp(1.35rem,3vw,1.9rem)] italic leading-[1.4] text-[var(--color-espresso)] sm:mt-14"
              >
                We can&apos;t wait to have you
                witness the beginning of our
                forever.
              </motion.p>
            )}
          </AnimatePresence>

          {/* =================================================
              BACK TO INVITATION
              ================================================= */}

          <AnimatePresence>
            {showBackButton && (
              <motion.div
                key="back-to-invitation"
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
                className="mt-10 flex justify-center sm:mt-14"
              >
                <button
                  type="button"
                  onClick={() => navigate("/home")}
                  className="invitation-button whitespace-nowrap"
                >
                  Back to Invitation
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </main>
  )
}