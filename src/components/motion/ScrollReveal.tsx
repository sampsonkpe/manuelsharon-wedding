import type { ReactNode } from "react"
import { motion, type Variants } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

const variants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 32,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      variants={{
        ...variants,
        hidden: {
          ...variants.hidden,
          y,
        },
        visible: {
          ...variants.visible,
          transition: {
            duration: 1,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount: 0.2,
      }}
    >
      {children}
    </motion.div>
  )
}