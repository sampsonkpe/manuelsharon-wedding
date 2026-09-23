import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import envelopeVideo from "../assets/invitation/envelope.mp4"

const pageTransition = {
  duration: 1,
  ease: [0.22, 1, 0.36, 1] as const,
}

const finalZoomTransition = {
  duration: 4.5,
  ease: [0.22, 1, 0.36, 1] as const,
}

export default function SplashPage() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isLeaving, setIsLeaving] = useState(false)
  const [isFinalZoom, setIsFinalZoom] = useState(false)

  const enterInvitation = () => {
    if (isLeaving) return

    setIsLeaving(true)

    window.setTimeout(() => {
      navigate("/home", { replace: true })
    }, 800)
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current

    if (!video || !video.duration) return

    const remaining = video.duration - video.currentTime

    if (remaining <= 3.5) {
      setIsFinalZoom(true)
    }
  }

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    video.play().catch(() => {
      // Some browsers may block autoplay.
      // Clicking the screen will still enter the invitation.
    })
  }, [])

  return (
    <motion.main
      className="fixed inset-0 z-[100] h-[100svh] w-full overflow-hidden bg-[var(--color-envelope)]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLeaving ? 0 : 1 }}
      transition={pageTransition}
      onClick={enterInvitation}
      aria-label="Open wedding invitation"
    >
      <motion.video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={enterInvitation}
        animate={{
          scale: isFinalZoom ? 1.26 : 1,
        }}
        transition={finalZoomTransition}
        aria-hidden="true"
      >
        <source src={envelopeVideo} type="video/mp4" />
      </motion.video>
    </motion.main>
  )
}