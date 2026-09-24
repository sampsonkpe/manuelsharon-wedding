import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import closingImage from "../assets/couple/closing.png"

const luxuryEase = [0.22, 1, 0.36, 1] as const

const ATTENDING_KEY = "themanforshay-attending"

export default function ClosingPage() {
  const navigate = useNavigate()
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    const isAttending =
      sessionStorage.getItem(ATTENDING_KEY) === "true"

    if (!isAttending) {
      navigate("/home", { replace: true })
      return
    }

    const timer = window.setTimeout(() => {
      setShowImage(true)
    }, 1400)

    return () => {
      window.clearTimeout(timer)
    }
  }, [navigate])

  return (
    <main className="min-h-[100svh] overflow-hidden bg-[var(--color-background)]">
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col items-center px-[var(--page-padding)]">

        {/* SEE YOU AT THE WEDDING */}
        <motion.p
          initial={{
            opacity: 0,
            y: 14,
            filter: "blur(3px)",
          }}
          animate={
            showImage
              ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
              : {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
          }
          transition={{
            opacity: {
              duration: 1,
              ease: luxuryEase,
            },
            filter: {
              duration: 1,
              ease: luxuryEase,
            },
            y: {
              duration: 1.2,
              ease: luxuryEase,
            },
          }}
          className={
            showImage
              ? "relative z-10 mt-[8vh] text-center font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.5rem]"
              : "absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.5rem]"
          }
        >
          See you at the wedding
        </motion.p>

        {/* CLOSING IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            y: 36,
            scale: 0.985,
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
                  y: 36,
                  scale: 0.985,
                  filter: "blur(4px)",
                }
          }
          transition={{
            duration: 1.2,
            ease: luxuryEase,
          }}
          className="relative mt-10 w-full max-w-[760px] overflow-hidden rounded-[var(--radius-lg)]"
        >
          <img
            src={closingImage}
            alt="Manuel and Sharon"
            loading="eager"
            className="block h-auto w-full"
          />

          {/* COUPLE NAMES */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 18,
              filter: "blur(4px)",
            }}
            animate={
              showImage
                ? {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
                : {
                    opacity: 0,
                    y: 18,
                    filter: "blur(4px)",
                  }
            }
            transition={{
              duration: 1,
              delay: 0.45,
              ease: luxuryEase,
            }}
            className="pointer-events-none absolute inset-x-0 top-[7%] px-5 text-center font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] text-[var(--color-background)]"
          >
            Manuel &amp; Sharon
          </motion.h1>
        </motion.div>
      </div>
    </main>
  )
}