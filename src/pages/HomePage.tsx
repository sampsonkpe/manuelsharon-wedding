import InvitationHero from "../components/invitation/InvitationHero"
import InvitationIntro from "../components/invitation/InvitationIntro"
import InvitationMessage from "../components/invitation/InvitationMessage"
import InvitationDetails from "../components/invitation/InvitationDetails"
import InvitationRsvp from "../components/invitation/InvitationRSVP"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <InvitationIntro />
      <InvitationHero />
      <InvitationMessage />
      <InvitationDetails />
      <InvitationRsvp />
    </main>
  )
}