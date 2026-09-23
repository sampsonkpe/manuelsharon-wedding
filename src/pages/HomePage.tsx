import InvitationHero from "../components/invitation/InvitationHero"
import InvitationIntro from "../components/invitation/InvitationIntro"
import InvitationMessage from "../components/invitation/InvitationMessage"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <InvitationIntro />
      <InvitationHero />
      <InvitationMessage/>
    </main>
  )
}