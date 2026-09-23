import ScrollReveal from "../motion/ScrollReveal"

export default function InvitationMessage() {
  return (
    <section className="px-[var(--page-padding)] py-[14vh] sm:py-[18vh]">
      <div className="mx-auto max-w-[720px] text-center">
        {/* Invitation statement */}
        <ScrollReveal y={32}>
          <blockquote className="font-editorial text-[clamp(1.7rem,4vw,2.55rem)] leading-[1.25] text-[var(--color-deep-brown)]">
            Together with our families, we kindly request your presence at our wedding.
          </blockquote>
        </ScrollReveal>

        {/* Scripture */}
        <ScrollReveal y={28} delay={0.15}>
          <div className="mx-auto mt-12 max-w-[620px]">
            <p className="mt-5 font-editorial text-[clamp(1.35rem,3vw,1.85rem)] italic leading-[1.45] text-[var(--color-deep-brown)]">
              “Though one may be overpowered by another, two can withstand
              him. And a threefold cord is not quickly broken.”
            </p>
            
            <p className="font-body text-[0.48rem] font-medium uppercase tracking-[0.34em] text-[var(--color-muted)] sm:text-[0.52rem]">
              Ecclesiastes 4:12 • NKJV
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}