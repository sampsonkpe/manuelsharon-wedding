import type { ReactNode } from "react"
import {
  motion,
  useInView,
} from "framer-motion"
import { useRef } from "react"
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
    amount: 0.22,
    margin: "-10% 0px -10% 0px",
    once,
  })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 14,
        filter: "blur(3px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              y: 14,
              filter: "blur(3px)",
            }
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