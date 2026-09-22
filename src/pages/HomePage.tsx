import InvitationHero from "../components/invitation/InvitationHero"
import InvitationIntro from "../components/invitation/InvitationIntro"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <InvitationIntro />
      <InvitationHero />
    </main>
  )
}