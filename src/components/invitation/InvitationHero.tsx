import ScrollReveal from "../motion/ScrollReveal"
import coupleImage from "../../assets/couple/hero2.png"

export default function InvitationHero() {
  return (
    <section className="px-[var(--page-padding)] pb-[var(--space-section)]">
      <div className="mx-auto max-w-[1100px]">
        <ScrollReveal y={32}>
          <div className="relative overflow-hidden rounded-[var(--radius-lg)]">
            <div className="flex justify-center bg-[var(--color-envelope)]">
              <img
                src={coupleImage}
                alt="Manuel and Sharon"
                className="block h-auto w-full max-w-[760px] object-contain"
              />
            </div>

            {/* Image grounding */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 via-black/12 to-transparent sm:h-32" />

            {/* Hashtag */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center px-5 pb-5 text-center sm:pb-7">
              <p className="font-body text-[0.4rem] font-medium uppercase tracking-[0.38em] text-white/80 sm:text-[0.44rem]">
                #TheManforShay
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}