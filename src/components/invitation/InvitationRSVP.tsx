import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, } from "react"
import type { ReactNode} from "react"
import { useNavigate } from "react-router-dom"
import {
  recordRsvp,
  verifyGuest,
  type RsvpResponse,
} from "../../lib/rsvp"
import {
  durationBase,
  durationMicro,
  luxuryEase,
} from "../motion/motion"
import ScrollReveal from "../motion/ScrollReveal"

type Step =
  | "form"
  | "attendance"
  | "success"

const ATTENDING_KEY = "themanforshay-attending"
const RSVP_DRAFT_KEY = "themanforshay-rsvp-draft"

type RsvpDraft = {
  name: string
  phone: string
}

/*
 * Read the existing RSVP draft from sessionStorage.
 *
 * This runs before the initial render, so the form can
 * be populated immediately without setting React state
 * synchronously inside an effect.
 */
function getRsvpDraft(): RsvpDraft {
  try {
    const storedDraft =
      sessionStorage.getItem(RSVP_DRAFT_KEY)

    if (!storedDraft) {
      return {
        name: "",
        phone: "",
      }
    }

    const draft = JSON.parse(
      storedDraft,
    ) as Partial<RsvpDraft>

    const name =
      typeof draft.name === "string"
        ? draft.name
        : ""

    const phone =
      typeof draft.phone === "string"
        ? draft.phone
        : ""

    /*
     * If both fields are empty, there is no meaningful
     * draft to restore.
     */
    if (!name.trim() && !phone.trim()) {
      sessionStorage.removeItem(
        RSVP_DRAFT_KEY,
      )

      return {
        name: "",
        phone: "",
      }
    }

    return {
      name,
      phone,
    }
  } catch {
    /*
     * Invalid stored data should never prevent
     * the RSVP form from loading.
     */
    sessionStorage.removeItem(
      RSVP_DRAFT_KEY,
    )

    return {
      name: "",
      phone: "",
    }
  }
}

const contentVariants = {
  initial: {
    opacity: 0,
    y: 14,
    filter: "blur(3px)",
  },

  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: durationBase,
      ease: luxuryEase,
    },
  },

  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(2px)",
    transition: {
      duration: durationBase,
      ease: luxuryEase,
    },
  },
}

export default function InvitationRsvp() {
  const navigate = useNavigate()

  /*
   * Restore any meaningful draft during initial state
   * creation rather than inside an effect.
   */
  const initialDraft = getRsvpDraft()

  const [step, setStep] = useState<Step>("form")

  const [name, setName] = useState(
    initialDraft.name,
  )

  const [phone, setPhone] = useState(
    initialDraft.phone,
  )

  const [guestName, setGuestName] = useState("")
  const [existingRsvp, setExistingRsvp] =
    useState<RsvpResponse | null>(null)

  const [error, setError] = useState<ReactNode>("")
  const [isLoading, setIsLoading] = useState(false)
  const [submittingResponse, setSubmittingResponse] =
    useState<RsvpResponse | null>(null)

  /*
   * Persist the RSVP draft whenever the user changes
   * either field.
   *
   * The draft only exists while at least one field
   * contains meaningful input.
   *
   * Therefore:
   *
   * "Sampson" + "" → draft exists
   * "" + "024..." → draft exists
   * "Sampson" + "024..." → draft exists
   * "" + "" → draft removed
   *
   * This means clearing everything before refreshing
   * will return the user to the top of the page.
   */
  useEffect(() => {
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    if (!trimmedName && !trimmedPhone) {
      sessionStorage.removeItem(
        RSVP_DRAFT_KEY,
      )
      return
    }

    const draft: RsvpDraft = {
      name,
      phone,
    }

    sessionStorage.setItem(
      RSVP_DRAFT_KEY,
      JSON.stringify(draft),
    )
  }, [name, phone])

  /*
   * Verify the guest against the invitation list.
   */
  const verifyInvitation = async () => {
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    if (!trimmedName) {
      setError("Please enter your full name.")
      return
    }

    if (!trimmedPhone) {
      setError("Please enter your phone number.")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const result = await verifyGuest(
        trimmedName,
        trimmedPhone,
      )

      if (!result.verified) {
        setError(
          <>
            <strong className="font-[500]">
              We couldn&apos;t find a matching invitation.
            </strong>{" "}
            Please check your name and phone number.
          </>,
        )
        return
      }

      const returnedGuest =
        result.guest ?? trimmedName

      const returnedRsvp =
        result.rsvp ?? null

      setGuestName(returnedGuest)
      setExistingRsvp(returnedRsvp)

      /*
       * The guest has successfully passed the
       * verification stage, so the temporary form
       * draft is no longer needed.
       */
      sessionStorage.removeItem(
        RSVP_DRAFT_KEY,
      )

      /*
       * Existing RSVP:
       * skip the attendance question completely.
       */
      if (returnedRsvp) {
        if (returnedRsvp === "ATTENDING") {
          sessionStorage.setItem(
            ATTENDING_KEY,
            "true",
          )
        } else {
          sessionStorage.removeItem(
            ATTENDING_KEY,
          )
        }

        setStep("success")
        return
      }

      /*
       * New verified guest:
       * ask attendance.
       */
      setStep("attendance")
    } catch {
      setError(
        "We couldn't connect to the RSVP service. Please try again.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  /*
   * Record the guest's RSVP response.
   */
  const submitRsvp = async (
    response: RsvpResponse,
  ) => {
    setError("")
    setSubmittingResponse(response)
    setIsLoading(true)

    try {
      const result = await recordRsvp(
        name.trim(),
        phone.trim(),
        response,
      )

      if (!result.success || !result.recorded) {
        setError(
          result.message ??
            "We couldn't record your RSVP. Please try again.",
        )
        return
      }

      setGuestName(
        result.guest ?? guestName,
      )

      setExistingRsvp(response)

      /*
       * The RSVP has now been submitted, so the
       * temporary form draft must be removed.
       */
      sessionStorage.removeItem(
        RSVP_DRAFT_KEY,
      )

      if (response === "ATTENDING") {
        sessionStorage.setItem(
          ATTENDING_KEY,
          "true",
        )
      } else {
        sessionStorage.removeItem(
          ATTENDING_KEY,
        )
      }

      setStep("success")
    } catch {
      setError(
        "We couldn't submit your RSVP. Please try again.",
      )
    } finally {
      setIsLoading(false)
      setSubmittingResponse(null)
    }
  }

  /*
   * After a successful attending RSVP,
   * allow the confirmation to breathe before
   * navigating to the closing page.
   *
   * The actual page transition is handled
   * globally by App.tsx / PageTransition.
   */
  useEffect(() => {
    if (
      step !== "success" ||
      existingRsvp !== "ATTENDING"
    ) {
      return
    }

    const timer = window.setTimeout(() => {
      navigate("/closing", {
        replace: true,
      })
    }, 2000)

    return () => {
      window.clearTimeout(timer)
    }
  }, [
    step,
    existingRsvp,
    navigate,
  ])

  return (
    <section
      id="rsvp"
      className="px-[var(--page-padding)] pb-[var(--space-section)]"
    >
      <div className="mx-auto max-w-[820px] rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-10 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-[680px] text-center">
          {/* SECTION LABEL */}
          <ScrollReveal>
            <p className="font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.5rem]">
              RSVP
            </p>
          </ScrollReveal>

          <div className="mt-8">
            <AnimatePresence mode="wait">

              {/* =================================================
                  FORM
                  ================================================= */}

              {step === "form" && (
                <motion.div
                  key="form"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <p className="font-editorial text-[clamp(1.55rem,3.5vw,2.2rem)] leading-[1.25] text-[var(--color-espresso)]">
                    We have a seat specially saved for you.
                  </p>

                  <div className="mx-auto mt-9 max-w-[440px] space-y-7">
                    {/* NAME */}
                    <div>
                      <label
                        htmlFor="rsvp-name"
                        className="block text-left font-body text-[0.42rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]"
                      >
                        Full name
                      </label>

                      <input
                        id="rsvp-name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            document
                              .getElementById(
                                "rsvp-phone",
                              )
                              ?.focus()
                          }
                        }}
                        placeholder="Your full name"
                        autoComplete="name"
                        className="mt-2 w-full border-b border-[var(--color-border-strong)] bg-transparent px-1 py-2.5 font-editorial text-[1.25rem] text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-caramel)]"
                      />
                    </div>

                    {/* PHONE */}
                    <div>
                      <label
                        htmlFor="rsvp-phone"
                        className="block text-left font-body text-[0.42rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]"
                      >
                        Phone number
                      </label>

                      <input
                        id="rsvp-phone"
                        type="tel"
                        value={phone}
                        onChange={(event) =>
                          setPhone(event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            verifyInvitation()
                          }
                        }}
                        placeholder="024 000 0000"
                        autoComplete="tel"
                        inputMode="tel"
                        className="mt-2 w-full border-b border-[var(--color-border-strong)] bg-transparent px-1 py-2.5 font-editorial text-[1.25rem] tracking-[0.04em] text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-caramel)]"
                      />
                    </div>

                    {/* ERROR */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{
                            opacity: 0,
                            y: 6,
                            filter: "blur(2px)",
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            opacity: 0,
                            y: -4,
                            filter: "blur(2px)",
                          }}
                          transition={{
                            duration: durationMicro,
                            ease: luxuryEase,
                          }}
                          role="alert"
                          className="font-body text-[0.46rem] uppercase leading-[1.7] tracking-[0.14em] text-[var(--color-cinnamon)]"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* CONTINUE */}
                    <motion.button
                      type="button"
                      onClick={verifyInvitation}
                      disabled={isLoading}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="invitation-button"
                    >
                      {isLoading
                        ? "Checking..."
                        : "Continue"}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* =================================================
                  VERIFIED — NEW GUEST
                  ================================================= */}

              {step === "attendance" && (
                <motion.div
                  key="attendance"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <p className="font-editorial text-[clamp(1.7rem,4vw,2.45rem)] leading-[1.2] text-[var(--color-espresso)]">
                    Hi there, {guestName}.
                  </p>

                  <p className="mt-7 font-editorial text-[clamp(1.35rem,3vw,1.9rem)] italic text-[var(--color-cinnamon)]">
                    Will you be joining us?
                  </p>

                  <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <motion.button
                      type="button"
                      onClick={() =>
                        submitRsvp("ATTENDING")
                      }
                      disabled={isLoading}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="invitation-button w-full sm:w-auto"
                    >
                      {submittingResponse ===
                      "ATTENDING"
                        ? "Confirming..."
                        : "Yes, I'll be there"}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() =>
                        submitRsvp(
                          "UNABLE TO ATTEND",
                        )
                      }
                      disabled={isLoading}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="invitation-button w-full sm:w-auto"
                    >
                      {submittingResponse ===
                      "UNABLE TO ATTEND"
                        ? "Confirming..."
                        : "I'm unable to attend"}
                    </motion.button>
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="mt-5 font-body text-[0.46rem] uppercase tracking-[0.14em] text-[var(--color-cinnamon)]"
                    >
                      {error}
                    </p>
                  )}
                </motion.div>
              )}

              {/* =================================================
                  CONFIRMATION
                  ================================================= */}

              {step === "success" && (
                <motion.div
                  key="success"
                  variants={contentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <p className="font-editorial text-[clamp(1.7rem,4vw,2.45rem)] leading-[1.2] text-[var(--color-espresso)]">
                    Thank you, {guestName}.
                  </p>

                  <p className="mx-auto mt-5 max-w-md font-editorial text-[clamp(1.2rem,3vw,1.7rem)] italic leading-[1.45] text-[var(--color-cinnamon)]">
                    {existingRsvp === "ATTENDING" ? (
                      <>
                        Your RSVP has been confirmed as{" "}
                        <strong className="font-[550]">
                          you are attending.
                        </strong>
                      </>
                    ) : (
                      <>
                        Your RSVP is recorded as{" "}
                        <strong className="font-[550]">
                          you are unable to attend.
                        </strong>
                      </>
                    )}
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}