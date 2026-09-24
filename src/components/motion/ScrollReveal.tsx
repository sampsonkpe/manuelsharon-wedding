import type { ReactNode } from "react"
import { motion } from "framer-motion"
import {
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
      exit={revealExit}
      viewport={{
        once,
        amount: 0.2,
      }}
      transition={{
        duration: 1,
        delay,
        ease: luxuryEase,
      }}
    >
      {children}
    </motion.div>
  )
}