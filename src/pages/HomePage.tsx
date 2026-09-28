import InvitationHero from "../components/invitation/InvitationHero"
import InvitationMessage from "../components/invitation/InvitationMessage"
import InvitationDetails from "../components/invitation/InvitationDetails"
import InvitationPalette from "../components/invitation/InvitationPalette"
import InvitationRsvp from "../components/invitation/InvitationRSVP"
import SectionDivider from "../components/ui/SectionDivider"

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-transparent">
      <div className="relative z-20 flex flex-col">
        <SectionDivider />

        <InvitationHero />

        <SectionDivider />

        <InvitationMessage />

        <SectionDivider />

        <InvitationDetails />

        <SectionDivider />

        <InvitationPalette />

        <SectionDivider />

        <InvitationRsvp />
      </div>
    </main>
  )
}