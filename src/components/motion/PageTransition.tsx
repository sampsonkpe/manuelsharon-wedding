import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"

import {
  pageInitial,
  pageAnimate,
  pageExit,
  pageEnterTransition,
  pageExitTransition,
} from "./motion"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({
  children,
}: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion()

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : pageInitial

  const animate = shouldReduceMotion
    ? { opacity: 1 }
    : pageAnimate

  const exit = shouldReduceMotion
    ? { opacity: 0 }
    : pageExit

  return (
    <motion.div
      initial={initial}
      animate={animate}
      exit={exit}
      transition={
        shouldReduceMotion
          ? {
              duration: 0.2,
              ease: "easeOut",
            }
          : pageEnterTransition
      }
      variants={{
        exit: {
          ...exit,
          transition: shouldReduceMotion
            ? {
                duration: 0.2,
                ease: "easeOut",
              }
            : pageExitTransition,
        },
      }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}