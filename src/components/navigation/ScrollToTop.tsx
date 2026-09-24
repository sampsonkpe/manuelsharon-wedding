import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const RSVP_DRAFT_KEY = "themanforshay-rsvp-draft"

function hasRsvpDraft() {
  try {
    const storedDraft =
      sessionStorage.getItem(RSVP_DRAFT_KEY)

    if (!storedDraft) {
      return false
    }

    const draft = JSON.parse(storedDraft) as {
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
    sessionStorage.removeItem(RSVP_DRAFT_KEY)
    return false
  }
}

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }

    /*
     * When the page is refreshed, check whether the
     * RSVP form contains meaningful unfinished input.
     *
     * If it does, return the user to the RSVP section.
     * Otherwise, start the page from the top.
     */
    const rsvpDraftExists = hasRsvpDraft()

    if (
      pathname === "/home" &&
      rsvpDraftExists
    ) {
      /*
       * Wait for the page to render before attempting
       * to find the RSVP section.
       */
      window.requestAnimationFrame(() => {
        document
          .getElementById("rsvp")
          ?.scrollIntoView({
            behavior: "auto",
            block: "start",
          })
      })

      return
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  }, [pathname])

  return null
}