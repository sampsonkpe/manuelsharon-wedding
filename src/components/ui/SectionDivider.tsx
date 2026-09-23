import ScrollReveal from "../motion/ScrollReveal"

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-[var(--space-content)]">
      <ScrollReveal y={0}>
        <span
          aria-hidden="true"
          className="block h-px w-8 bg-[var(--color-caramel)]"
        />
      </ScrollReveal>
    </div>
  )
}