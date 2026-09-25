import { motion } from "framer-motion"
import backgroundImage from "../../assets/couple/background.png"

export default function BackgroundMonogram() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{
        opacity: 10,
      }}
      animate={{
        opacity: 0.1,
        filter: "blur(1px)",
      }}
      transition={{
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <img
        src={backgroundImage}
        alt=""
        className="h-auto w-[min(78vw,760px)] object-contain"
      />
    </motion.div>
  )
}