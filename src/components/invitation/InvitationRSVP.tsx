import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  recordRsvp,
  verifyGuest,
  type RsvpResponse,
} from "../../lib/rsvp"
import ScrollReveal from "../motion/ScrollReveal"

type Step =
  | "form"
  | "attendance"
  | "success"

const luxuryEase = [0.22, 1, 0.36, 1] as const

const STORAGE_KEY = "themanforshay-rsvp"
const ATTENDING_KEY = "themanforshay-attending"

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
      duration: 0.55,
      ease: luxuryEase,
    },
  },

  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(2px)",
    transition: {
      duration: 0.25,
      ease: luxuryEase,
    },
  },
}

interface StoredFormData {
  name: string
  phone: string
}

export default function InvitationRsvp() {
  const navigate = useNavigate()

  const [savedForm] = useState<StoredFormData | null>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)

      if (!stored) return null

      return JSON.parse(stored) as StoredFormData
    } catch {
      sessionStorage.removeItem(STORAGE_KEY)
      return null
    }
  })

  const [step, setStep] = useState<Step>("form")

  const [name, setName] = useState(
    savedForm?.name ?? "",
  )

  const [phone, setPhone] = useState(
    savedForm?.phone ?? "",
  )

  const [guestName, setGuestName] = useState("")
  const [existingRsvp, setExistingRsvp] =
    useState<RsvpResponse | null>(null)

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submittingResponse, setSubmittingResponse] =
    useState<RsvpResponse | null>(null)

  /*
   * Preserve only the form details across refreshes.
   */
  useEffect(() => {
    if (!name && !phone) {
      return
    }

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        name,
        phone,
      }),
    )
  }, [name, phone])

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
          "We couldn't find a matching invitation. Please check your name and phone number.",
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
          sessionStorage.removeItem(ATTENDING_KEY)
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

      sessionStorage.removeItem(STORAGE_KEY)

      if (response === "ATTENDING") {
        sessionStorage.setItem(
          ATTENDING_KEY,
          "true",
        )
      } else {
        sessionStorage.removeItem(ATTENDING_KEY)
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
    }, 2200)

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
          <ScrollReveal y={14}>
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
                  <p className="font-editorial text-[clamp(1.55rem,3.5vw,2.2rem)] leading-[1.25] text-[var(--color-deep-brown)]">
                    We&apos;d love to have you with us.
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
                        autoFocus
                        type="text"
                        value={name}
                        onChange={(event) =>
                          setName(event.target.value)
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            document
                              .getElementById("rsvp-phone")
                              ?.focus()
                          }
                        }}
                        placeholder="Your full name"
                        autoComplete="name"
                        className="mt-2 w-full border-b border-[var(--color-border-strong)] bg-transparent px-1 py-2.5 font-editorial text-[1.25rem] text-[var(--color-deep-brown)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-caramel)]"
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
                        className="mt-2 w-full border-b border-[var(--color-border-strong)] bg-transparent px-1 py-2.5 font-editorial text-[1.25rem] tracking-[0.04em] text-[var(--color-deep-brown)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-caramel)]"
                      />
                    </div>

                    {/* ERROR */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{
                            opacity: 0,
                            y: 6,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -4,
                          }}
                          transition={{
                            duration: 0.25,
                            ease: luxuryEase,
                          }}
                          role="alert"
                          className="font-body text-[0.46rem] uppercase leading-[1.7] tracking-[0.14em] text-[var(--color-burnt-brown)]"
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
                  <p className="font-editorial text-[clamp(1.7rem,4vw,2.45rem)] leading-[1.2] text-[var(--color-deep-brown)]">
                    Hi there, {guestName}.
                  </p>

                  <p className="mt-7 font-editorial text-[clamp(1.35rem,3vw,1.9rem)] italic text-[var(--color-burnt-brown)]">
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
                      {submittingResponse === "ATTENDING"
                        ? "Confirming..."
                        : "Yes, I'll be there"}
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() =>
                        submitRsvp("UNABLE TO ATTEND")
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
                      className="mt-5 font-body text-[0.46rem] uppercase tracking-[0.14em] text-[var(--color-burnt-brown)]"
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
                  <p className="font-editorial text-[clamp(1.7rem,4vw,2.45rem)] leading-[1.2] text-[var(--color-deep-brown)]">
                    Thank you, {guestName}.
                  </p>

                  <p className="mx-auto mt-5 max-w-md font-editorial text-[clamp(1.2rem,3vw,1.7rem)] italic leading-[1.45] text-[var(--color-burnt-brown)]">
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