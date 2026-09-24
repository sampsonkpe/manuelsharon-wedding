import { motion } from "framer-motion"
import type { ReactNode } from "react"
import {
  pageInitial,
  pageAnimate,
  pageExit,
  pageTransition,
} from "./motion"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({
  children,
}: PageTransitionProps) {
  return (
    <motion.div
      initial={pageInitial}
      animate={pageAnimate}
      exit={pageExit}
      transition={pageTransition}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}