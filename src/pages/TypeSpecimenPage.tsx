function TypeSpecimenPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)] px-[var(--page-padding)] py-16 text-[var(--color-foreground)]">
      <div className="mx-auto max-w-[var(--content-width-narrow)]">

        {/* Header */}
        <header className="mb-20 text-center">
          <p className="mb-4 font-body text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Typography Study
          </p>

          <h1 className="font-editorial text-4xl font-normal sm:text-5xl">
            Manuel &amp; Sharon
          </h1>

          <p className="mt-4 font-body text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            24 October 2026
          </p>
        </header>

        {/* Mea Culpa */}
        <section className="border-t border-[var(--color-border)] py-16">
          <p className="mb-10 font-body text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Option A · Mea Culpa
          </p>

          <div className="text-center">
            <p className="font-display-mea text-[clamp(5rem,16vw,10rem)] leading-[0.7] text-[var(--color-espresso)]">
              Manuel
            </p>

            <p className="my-6 font-editorial text-4xl italic text-[var(--color-caramel)]">
              &amp;
            </p>

            <p className="font-display-mea text-[clamp(5rem,16vw,10rem)] leading-[0.7] text-[var(--color-espresso)]">
              Sharon
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-xl text-center">
            <p className="font-editorial text-2xl italic leading-relaxed sm:text-3xl">
              Together with our families, we kindly request your presence at
              our wedding.
            </p>

            <div className="mt-10 font-body text-xs font-medium uppercase tracking-[0.18em]">
              24 October 2026
              <span className="mx-3 text-[var(--color-caramel)]">·</span>
              2:00 PM
            </div>

            <p className="mt-3 font-body text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Lotus Garden · Adjiringanor
            </p>
          </div>
        </section>

        {/* Rouge Script */}
        <section className="border-t border-[var(--color-border)] py-16">
          <p className="mb-10 font-body text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--color-muted)]">
            Option B · Rouge Script
          </p>

          <div className="text-center">
            <p className="font-display-rouge text-[clamp(5rem,16vw,10rem)] leading-[0.7] text-[var(--color-espresso)]">
              Manuel
            </p>

            <p className="my-6 font-editorial text-4xl italic text-[var(--color-caramel)]">
              &amp;
            </p>

            <p className="font-display-rouge text-[clamp(5rem,16vw,10rem)] leading-[0.7] text-[var(--color-espresso)]">
              Sharon
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-xl text-center">
            <p className="font-editorial text-2xl italic leading-relaxed sm:text-3xl">
              Together with our families, we kindly request your presence at
              our wedding.
            </p>

            <div className="mt-10 font-body text-xs font-medium uppercase tracking-[0.18em]">
              24 October 2026
              <span className="mx-3 text-[var(--color-caramel)]">·</span>
              2:00 PM
            </div>

            <p className="mt-3 font-body text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Lotus Garden · Adjiringanor
            </p>
          </div>
        </section>

      </div>
    </main>
  )
}

export default TypeSpecimenPage