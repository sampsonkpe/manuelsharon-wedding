import BackgroundMonogram from "../components/layout/BackgroundMonogram"
import InvitationHero from "../components/invitation/InvitationHero"
import InvitationMessage from "../components/invitation/InvitationMessage"
import InvitationDetails from "../components/invitation/InvitationDetails"
import InvitationPalette from "../components/invitation/InvitationPalette"
import InvitationRsvp from "../components/invitation/InvitationRSVP"
import SectionDivider from "../components/ui/SectionDivider"

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--color-background)]">
      {/* BACKGROUND MONOGRAM */}
      <BackgroundMonogram />

      {/* INVITATION CONTENT */}
      <div className="relative z-10 flex flex-col">
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