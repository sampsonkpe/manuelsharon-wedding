import { motion } from "framer-motion"
import coupleImage from "../../assets/couple/hero.png"

const luxuryEase = [0.22, 1, 0.36, 1] as const

interface InvitationHeroProps {
  showHero: boolean
}

export default function InvitationHero({
  showHero,
}: InvitationHeroProps) {
  return (
    <motion.section
      layout
      className="px-[var(--page-padding)]"
      transition={{
        layout: {
          duration: 1.2,
          ease: luxuryEase,
        },
      }}
    >
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{
            opacity: 0,
            y: 14,
            filter: "blur(3px)",
          }}
          animate={
            showHero
              ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
              : {
                  opacity: 0,
                  y: 14,
                  filter: "blur(3px)",
                }
          }
          transition={{
            duration: 1,
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

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 via-black/12 to-transparent sm:h-32" />

            <div className="absolute inset-x-0 bottom-0 flex justify-center px-5 pb-5 text-center sm:pb-7">
              <p className="font-body text-[0.4rem] font-medium uppercase tracking-[0.38em] text-white/80 sm:text-[0.44rem]">
                #TheManforShay
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}