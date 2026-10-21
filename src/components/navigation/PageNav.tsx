import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

import { luxuryEase } from "../motion/motion"
import { WEDDING_PAGES_UNLOCKED } from "../../config/siteConfig"

const weddingDayLinks = [
  { to: "/programme", label: "Programme" },
  { to: "/gifts", label: "Gifts" },
  { to: "/menu", label: "Menu" },
  { to: "/appreciation", label: "Appreciation" },
]

export default function PageNav() {
  const location = useLocation()
  const activeLinkRef = useRef<HTMLAnchorElement>(null)

  const navLinks = [
    { to: "/home", label: "Home" },
    ...(WEDDING_PAGES_UNLOCKED ? weddingDayLinks : []),
  ]

  useEffect(() => {
    activeLinkRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }, [location.pathname])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.1,
        ease: luxuryEase,
      }}
      aria-label="Main navigation"
      className="
        fixed
        inset-x-0
        top-0
        z-40
        border-b
        border-[var(--color-border)]
        bg-[var(--color-background)]/90
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          flex
          min-h-[64px]
          max-w-[1200px]
          items-center
          sm:min-h-[76px]
        "
      >
        <div
          className="
            flex
            w-full
            items-center
            justify-start
            gap-x-7
            overflow-x-auto
            overscroll-x-contain
            px-5
            py-4
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:justify-center
            sm:gap-x-9
            sm:px-6
            md:gap-x-12
          "
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to

            return (
              <Link
                key={link.to}
                ref={isActive ? activeLinkRef : null}
                to={link.to}
                aria-current={isActive ? "page" : undefined}
                className={`
                  relative
                  shrink-0
                  whitespace-nowrap
                  pb-2
                  font-body
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  transition-colors
                  duration-500
                  sm:text-[10px]
                  sm:tracking-[0.24em]
                  md:text-[11px]
                  ${
                    isActive
                      ? "text-[var(--color-caramel)]"
                      : "text-[var(--color-muted)] hover:text-[var(--color-espresso)]"
                  }
                `}
              >
                {link.label}

                {isActive && (
                  <motion.span
                    layoutId="wedding-nav-indicator"
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      bottom-0
                      left-0
                      right-0
                      mx-auto
                      block
                      h-px
                      w-8
                      bg-[var(--color-caramel)]
                    "
                    transition={{
                      duration: 0.55,
                      ease: luxuryEase,
                    }}
                  />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}