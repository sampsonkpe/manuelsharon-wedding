import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import closingImage from "../assets/couple/closing.png"
import { luxuryEase } from "../components/motion/motion"

const ATTENDING_KEY = "themanforshay-attending"

export default function ClosingPage() {
  const navigate = useNavigate()

  const [showImage, setShowImage] = useState(false)
  const [showNames, setShowNames] = useState(false)
  const [showFinalText, setShowFinalText] = useState(false)
  const [showBackButton, setShowBackButton] = useState(false)

  useEffect(() => {
    const isAttending =
      sessionStorage.getItem(ATTENDING_KEY) === "true"

    if (!isAttending) {
      navigate("/home", { replace: true })
      return
    }

    /*
     * Let the opening message breathe
     * before introducing the photograph.
     */
    const imageTimer = window.setTimeout(() => {
      setShowImage(true)
    }, 2500)

    return () => {
      window.clearTimeout(imageTimer)
    }
  }, [navigate])

  useEffect(() => {
    if (!showImage) return

    /*
     * Allow the photograph to fully settle
     * before revealing the couple's names.
     */
    const namesTimer = window.setTimeout(() => {
      setShowNames(true)
    }, 1500)

    return () => {
      window.clearTimeout(namesTimer)
    }
  }, [showImage])

  useEffect(() => {
    if (!showNames) return

    /*
     * Allow the names to reveal completely
     * before introducing the final closing message.
     */
    const finalTextTimer = window.setTimeout(() => {
      setShowFinalText(true)
    }, 1200)

    return () => {
      window.clearTimeout(finalTextTimer)
    }
  }, [showNames])

  useEffect(() => {
    if (!showFinalText) return

    /*
     * Let the final message breathe
     * before revealing the return action.
     */
    const backButtonTimer = window.setTimeout(() => {
      setShowBackButton(true)
    }, 800)

    return () => {
      window.clearTimeout(backButtonTimer)
    }
  }, [showFinalText])

  return (
    <main className="min-h-[100svh] overflow-hidden bg-[var(--color-background)]">
      <div className="relative flex min-h-[100svh] w-full items-center justify-center px-[var(--page-padding)]">

        {/* =================================================
            CLOSING COMPOSITION
            ================================================= */}

        <div className="relative w-full max-w-[760px] pb-12">

          {/* =================================================
              INITIAL SEE YOU AT THE WEDDING
              ================================================= */}

          <AnimatePresence mode="wait">
            {!showImage && (
              <motion.p
                key="opening-message"
                initial={{
                  opacity: 0,
                  y: 14,
                  filter: "blur(3px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                  filter: "blur(3px)",
                }}
                transition={{
                  duration: 1,
                  ease: luxuryEase,
                }}
                className="fixed left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.5rem]"
              >
                See you at the wedding
              </motion.p>
            )}
          </AnimatePresence>

          {/* =================================================
              CLOSING IMAGE
              ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.98,
              filter: "blur(4px)",
            }}
            animate={
              showImage
                ? {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 0,
                    y: 50,
                    scale: 0.98,
                    filter: "blur(4px)",
                  }
            }
            transition={{
              duration: 2,
              ease: luxuryEase,
            }}
            className="relative overflow-hidden rounded-[var(--radius-lg)]"
          >
            <img
              src={closingImage}
              alt="Manuel and Sharon"
              loading="eager"
              className="block h-auto w-full"
            />

            {/* =================================================
                TOP TEXT CONTRAST OVERLAY
                ================================================= */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-b from-black/80 via-black/50 to-transparent"
            />

            {/* =================================================
                COUPLE NAMES
                ================================================= */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 22,
                filter: "blur(4px)",
              }}
              animate={
                showNames
                  ? {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }
                  : {
                      opacity: 0,
                      y: 22,
                      filter: "blur(4px)",
                    }
              }
              transition={{
                duration: 1.2,
                ease: luxuryEase,
              }}
              className="pointer-events-none absolute inset-x-0 top-[7%] px-5 text-center font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] text-[var(--color-background)]"
            >
              Manuel &amp; Sharon
            </motion.h1>
          </motion.div>

          {/* =================================================
              FINAL SEE YOU AT THE WEDDING
              ================================================= */}

          <AnimatePresence>
            {showFinalText && (
              <motion.p
                key="final-message"
                initial={{
                  opacity: 0,
                  y: 14,
                  filter: "blur(3px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  filter: "blur(2px)",
                }}
                transition={{
                  duration: 1,
                  ease: luxuryEase,
                }}
                className="absolute inset-x-0 bottom-0 text-center font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.5rem]"
              >
                See you at the wedding
              </motion.p>
            )}
          </AnimatePresence>

          {/* =================================================
              BACK TO INVITATION
              ================================================= */}

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