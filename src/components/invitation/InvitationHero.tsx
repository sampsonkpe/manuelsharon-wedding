import { motion } from "framer-motion"
import coupleImage from "../../assets/couple/hero.png"
import {
  luxuryEase,
  imageRevealInitial,
  imageRevealAnimate,
} from "../motion/motion"

interface InvitationHeroProps {
  showHero: boolean
}

export default function InvitationHero({
  showHero,
}: InvitationHeroProps) {
  return (
    <section className="px-[var(--page-padding)]">
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={imageRevealInitial}
          animate={
            showHero
              ? imageRevealAnimate
              : imageRevealInitial
          }
          transition={{
            duration: 1.8,
            ease: luxuryEase,
          }}
        >
          <div className="relative overflow-hidden rounded-[var(--radius-lg)]">
            <div className="flex justify-center bg-[var(--color-envelope)]">
              <img
                src={coupleImage}
                alt="Manuel and Sharon"
                className="block h-auto w-full max-w-[760px] object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}