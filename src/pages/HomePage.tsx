import InvitationHero from "../components/invitation/InvitationHero"
import InvitationMessage from "../components/invitation/InvitationMessage"
import InvitationDetails from "../components/invitation/InvitationDetails"
import InvitationPalette from "../components/invitation/InvitationPalette"
import InvitationRsvp from "../components/invitation/InvitationRSVP"
import SectionDivider from "../components/ui/SectionDivider"
import FallingPetals from "../components/wedding-day/FallingPetals"

interface HomePageProps {
  onHeroReady?: () => void
}

export default function HomePage({
  onHeroReady,
}: HomePageProps) {
  return (
    <main className="relative min-h-screen bg-transparent">
      <FallingPetals className="absolute inset-0" />

      <div className="relative z-20 flex flex-col">
        <SectionDivider />

        <InvitationHero onHeroReady={onHeroReady} />

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