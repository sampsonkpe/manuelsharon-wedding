import ScrollReveal from "../motion/ScrollReveal"

const calendarFile = "/assets/invitation/manuel-sharon-wedding.ics"

const mapsUrl =
  "https://maps.app.goo.gl/yusiFU7JZERTZsdi7?g_st=ic"

export default function InvitationDetails() {
  return (
    <section className="px-[var(--page-padding)] py-[14vh] sm:py-[18vh]">
      <div className="mx-auto max-w-[760px] text-center">
        {/* Date */}
        <ScrollReveal y={28}>
          <p className="font-editorial text-[clamp(2.1rem,5vw,3.5rem)] leading-[1.05] text-[var(--color-deep-brown)]">
            Saturday, October 24, 2026
          </p>
        </ScrollReveal>

        {/* Time */}
        <ScrollReveal y={24} delay={0.1}>
          <p className="mt-5 font-body text-[0.48rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)] sm:text-[0.52rem]">
            At 2:00 PM • GMT
          </p>
        </ScrollReveal>

        {/* Calendar */}
        <ScrollReveal y={24} delay={0.18}>
          <div className="mt-9">
            <a
              href={calendarFile}
              download="the-wedding-of-manuel-and-sharon.ics"
              className="inline-flex items-center justify-center border border-[var(--color-border-strong)] px-6 py-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.28em] text-[var(--color-deep-brown)] transition-colors duration-300 hover:border-[var(--color-caramel)] hover:text-[var(--color-burnt-brown)]"
            >
              Add to Calendar
            </a>
          </div>
        </ScrollReveal>

        {/* Venue */}
        <ScrollReveal y={28} delay={0.28}>
          <div className="mt-20">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-block"
            >
              <p className="font-editorial text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-[var(--color-deep-brown)] transition-colors duration-300 group-hover:text-[var(--color-burnt-brown)]">
                Lotus Garden
              </p>

              <p className="mt-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-caramel)] sm:text-[0.52rem]">
                Adjiringanor
              </p>
            </a>

            <div className="mt-7">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-[var(--color-border-strong)] px-6 py-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.28em] text-[var(--color-deep-brown)] transition-colors duration-300 hover:border-[var(--color-caramel)] hover:text-[var(--color-burnt-brown)]"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}