import type { ReactNode } from "react"
import { motion } from "framer-motion"
import {
  durationBase,
  luxuryEase,
  revealInitial,
  revealAnimate,
  revealExit,
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
  return (
    <motion.div
      className={className}
      initial={revealInitial}
      whileInView={revealAnimate}
      viewport={{
        once,
        amount: 0.35,
        margin: "-8% 0px -8% 0px",
      }}
      transition={{
        duration: durationBase,
        delay,
        ease: luxuryEase,
      }}
      exit={revealExit}
    >
      {children}
    </motion.div>
  )
}