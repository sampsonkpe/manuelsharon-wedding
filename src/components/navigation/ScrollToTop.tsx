import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const RSVP_DRAFT_KEY =
  "themanforshay-rsvp-draft"

function hasRsvpDraft() {
  try {
    const storedDraft =
      sessionStorage.getItem(
        RSVP_DRAFT_KEY,
      )

    if (!storedDraft) {
      return false
    }

    const draft = JSON.parse(
      storedDraft,
    ) as {
      name?: unknown
      phone?: unknown
    }

    const name =
      typeof draft.name === "string"
        ? draft.name.trim()
        : ""

    const phone =
      typeof draft.phone === "string"
        ? draft.phone.trim()
        : ""

    return Boolean(name || phone)
  } catch {
    sessionStorage.removeItem(
      RSVP_DRAFT_KEY,
    )

    return false
  }
}

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, [])

  useEffect(() => {
    /*
     * The RSVP draft behaviour is only relevant
     * when the user actually reloads /home.
     *
     * Route transitions themselves are handled by
     * App.tsx so that scrolling does not interfere
     * with the page animation.
     */
    if (
      pathname === "/home" &&
      hasRsvpDraft()
    ) {
      return
    }
  }, [pathname])

  return null
}