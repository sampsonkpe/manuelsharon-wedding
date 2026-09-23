import InvitationHero from "../components/invitation/InvitationHero"
import InvitationIntro from "../components/invitation/InvitationIntro"
import InvitationMessage from "../components/invitation/InvitationMessage"
import InvitationDetails from "../components/invitation/InvitationDetails"
import InvitationRsvp from "../components/invitation/InvitationRSVP"
import SectionDivider from "../components/ui/SectionDivider"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <InvitationIntro />

      <div className="flex flex-col">
        <SectionDivider />

        <InvitationHero />

        <SectionDivider />

        <InvitationMessage />

        <SectionDivider />

        <InvitationDetails />

        <SectionDivider />

        <InvitationRsvp />
      </div>
    </main>
  )
}