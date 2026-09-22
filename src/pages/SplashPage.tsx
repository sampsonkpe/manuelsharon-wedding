import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import envelopeVideo from "../assets/invitation/envelope.mp4"

const pageTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
}

export default function SplashPage() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLeaving, setIsLeaving] = useState(false)

  const enterInvitation = () => {
    if (isLeaving) return

    setIsLeaving(true)

    window.setTimeout(() => {
      navigate("/home", { replace: true })
    }, 800)
  }

  useEffect(() => {
    const video = videoRef.current

    if (!video) return

    video.play().catch(() => {
      // Some browsers may block autoplay.
      // In that case, allow the user to continue by clicking the video.
    })
  }, [])

  return (
    <motion.main
      className="fixed inset-0 z-[100] h-[100svh] w-full overflow-hidden bg-[#f5ebe1]"
      initial={{ opacity: 1 }}
      animate={{ opacity: isLeaving ? 0 : 1 }}
      transition={pageTransition}
      onClick={enterInvitation}
      aria-label="Open wedding invitation"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={enterInvitation}
        aria-hidden="true"
      >
        <source src={envelopeVideo} type="video/mp4" />
      </video>
    </motion.main>
  )
}