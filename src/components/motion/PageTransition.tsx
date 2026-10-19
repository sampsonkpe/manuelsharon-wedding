import {
  motion,
  useReducedMotion,
} from "framer-motion"
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

  const variants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            duration: 0.25,
            ease: "easeOut" as const,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            duration: 0.2,
            ease: "easeIn" as const,
          },
        },
      }
    : {
        initial: pageInitial,
        animate: {
          ...pageAnimate,
          transition: pageEnterTransition,
        },
        exit: {
          ...pageExit,
          transition: pageExitTransition,
        },
      }

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}