import type { ReactNode } from "react"
import { motion } from "framer-motion"
import {
  luxuryEase,
  revealInitial,
  revealAnimate,
} from "./motion"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 14,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        ...revealInitial,
        y,
      }}
      whileInView={revealAnimate}
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