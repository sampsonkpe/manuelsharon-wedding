import { motion } from "framer-motion"
import coupleImage from "../../assets/couple/hero.png"
import {
  imageRevealInitial,
  imageRevealAnimate,
  imageRevealTransition,
} from "../motion/motion"

export default function InvitationHero() {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{
            ...imageRevealInitial,
            y: 10,
          }}
          animate={{
            ...imageRevealAnimate,
            y: 0,
          }}
          transition={imageRevealTransition}
        >
          <div className="relative overflow-hidden rounded-[var(--radius-lg)]">
            <div className="flex justify-center bg-[var(--color-envelope)]">
              <img
                src={coupleImage}
                alt="Manuel & Sharon"
                className="block h-auto w-full max-w-[760px] object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}