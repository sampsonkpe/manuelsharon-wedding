import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const RSVP_STORAGE_KEY = "themanforshay-rsvp"

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const hasSavedRsvp = Boolean(
      sessionStorage.getItem(RSVP_STORAGE_KEY),
    )

    if (pathname === "/home" && hasSavedRsvp) {
      /*
       * Allow the Home page to render before
       * restoring the user's RSVP position.
       */
      const timer = window.setTimeout(() => {
        document.getElementById("rsvp")?.scrollIntoView({
          block: "start",
          behavior: "instant",
        })
      }, 0)

      return () => {
        window.clearTimeout(timer)
      }
    }

    /*
     * Default behaviour:
     * every new route starts at the top.
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    })
  }, [pathname])

  return null
}