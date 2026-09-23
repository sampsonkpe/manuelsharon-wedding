import { useCallback, useState } from "react"
import InvitationHero from "../components/invitation/InvitationHero"
import InvitationIntro from "../components/invitation/InvitationIntro"
import InvitationMessage from "../components/invitation/InvitationMessage"
import InvitationDetails from "../components/invitation/InvitationDetails"
import InvitationRsvp from "../components/invitation/InvitationRSVP"
import SectionDivider from "../components/ui/SectionDivider"

export default function HomePage() {
  const [showHero, setShowHero] = useState(false)

  const handleHeroReveal = useCallback(() => {
    setShowHero(true)
  }, [])

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <InvitationIntro onHeroReveal={handleHeroReveal} />

      <div className="flex flex-col">
        <SectionDivider />

        <InvitationHero showHero={showHero} />

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