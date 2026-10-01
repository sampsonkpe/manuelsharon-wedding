import type { ReactNode } from "react"
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion"
import { useRef, useState } from "react"
import {
  durationBase,
  luxuryEase,
} from "./motion"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  once = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const isInView = useInView(ref, {
    amount: 0.28,
    margin: "-12% 0px -12% 0px",
    once,
  })

  const { scrollY } = useScroll()

  const [direction, setDirection] =
    useState<"up" | "down">("down")

  useMotionValueEvent(
    scrollY,
    "change",
    (current) => {
      const previous = scrollY.getPrevious()

      if (previous === undefined) return

      if (current > previous) {
        setDirection("down")
      } else if (current < previous) {
        setDirection("up")
      }
    },
  )

  const hiddenState =
    direction === "down"
      ? {
          opacity: 0,
          y: -6,
          filter: "blur(3px)",
        }
      : {
          opacity: 0,
          y: 6,
          filter: "blur(3px)",
        }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hiddenState}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : hiddenState
      }
      transition={{
        duration: durationBase,
        delay: isInView ? delay : 0,
        ease: luxuryEase,
      }}
    >
      {children}
    </motion.div>
  )
}