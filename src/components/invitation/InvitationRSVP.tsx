import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { submitRsvp } from "../../lib/rsvp"
import {
  durationBase,
  durationMicro,
  luxuryEase,
} from "../motion/motion"
import ScrollReveal from "../motion/ScrollReveal"

const RSVP_DRAFT_KEY =
  "themanforshay-rsvp-draft"

const RSVP_SUBMITTED_KEY =
  "themanforshay-rsvp-submitted"

type RsvpDraft = {
  name: string
  phone: string
  message: string
}

type Step =
  | "form"
  | "success"

function getRsvpDraft(): RsvpDraft {
  try {
    const storedDraft =
      sessionStorage.getItem(
        RSVP_DRAFT_KEY,
      )

    if (!storedDraft) {
      return {
        name: "",
        phone: "",
        message: "",
      }
    }

    const draft = JSON.parse(
      storedDraft,
    ) as Partial<RsvpDraft>

    return {
      name:
        typeof draft.name === "string"
          ? draft.name
          : "",
      phone:
        typeof draft.phone === "string"
          ? draft.phone
          : "",
      message:
        typeof draft.message === "string"
          ? draft.message
          : "",
    }
  } catch {
    sessionStorage.removeItem(
      RSVP_DRAFT_KEY,
    )

    return {
      name: "",
      phone: "",
      message: "",
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

  const initialDraft = getRsvpDraft()

  const [step, setStep] =
    useState<Step>("form")

  const [name, setName] = useState(
    initialDraft.name,
  )

  const [phone, setPhone] = useState(
    initialDraft.phone,
  )

  const [message, setMessage] =
    useState(initialDraft.message)

  const [error, setError] =
    useState<ReactNode>("")

  const [isLoading, setIsLoading] =
    useState(false)

  /*
   * Save unfinished RSVP data locally.
   *
   * This allows the guest to refresh the page
   * without losing what they have entered.
   *
   * IMPORTANT:
   * This effect does NOT mark the RSVP as submitted.
   * Submission is only recorded after Supabase
   * confirms a successful RSVP.
   */
  useEffect(() => {
    if (
      !name.trim() &&
      !phone.trim() &&
      !message.trim()
    ) {
      sessionStorage.removeItem(
        RSVP_DRAFT_KEY,
      )

      return
    }

    const draft: RsvpDraft = {
      name,
      phone,
      message,
    }

    sessionStorage.setItem(
      RSVP_DRAFT_KEY,
      JSON.stringify(draft),
    )
  }, [name, phone, message])

  /*
   * Submit the RSVP through the secure
   * Supabase RPC function.
   */
  const handleSubmit = async () => {
    if (isLoading) return

    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName) {
      setError(
        "Please enter your full name.",
      )
      return
    }

    if (!trimmedPhone) {
      setError(
        "Please enter your phone number.",
      )
      return
    }

    if (trimmedName.length > 100) {
      setError(
        "Your name is too long.",
      )
      return
    }

    if (trimmedMessage.length > 500) {
      setError(
        "Your message is too long.",
      )
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const result = await submitRsvp(
        trimmedName,
        trimmedPhone,
        trimmedMessage,
      )

      if (!result.success) {
        setError(result.message)
        return
      }

      /*
       * The RSVP has now been successfully
       * recorded in Supabase.
       *
       * Mark the session as submitted BEFORE
       * navigating to /closing.
       */
      sessionStorage.setItem(
        RSVP_SUBMITTED_KEY,
        "true",
      )

      /*
       * The unfinished draft is no longer needed.
       */
      sessionStorage.removeItem(
        RSVP_DRAFT_KEY,
      )

      /*
       * Show the confirmation message first.
       */
      setStep("success")

      /*
       * Keep the confirmation visible long
       * enough for the guest to comfortably read it.
       */
      window.setTimeout(() => {
        navigate("/closing", {
          replace: true,
        })
      }, 5000)
    } catch {
      setError(
        "We couldn't submit your RSVP. Please try again.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      id="rsvp"
      className="px-[var(--page-padding)] pb-[var(--space-section)]"
    >
      <div className="mx-auto max-w-[760px] rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-[680px] text-center">

          {/* SECTION LABEL */}

          <ScrollReveal>
            <p className="font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.5rem]">
              RSVP
            </p>
          </ScrollReveal>

          <div className="mt-7">
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

                  <div className="mx-auto mt-8 max-w-[500px] space-y-6">

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
                        onChange={(event) => {
                          setName(
                            event.target.value,
                          )
                          setError("")
                        }}
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter"
                          ) {
                            event.preventDefault()

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
                        onChange={(event) => {
                          setPhone(
                            event.target.value,
                          )
                          setError("")
                        }}
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter"
                          ) {
                            event.preventDefault()

                            document
                              .getElementById(
                                "rsvp-message",
                              )
                              ?.focus()
                          }
                        }}
                        placeholder="024 000 0000"
                        autoComplete="tel"
                        inputMode="tel"
                        className="mt-2 w-full border-b border-[var(--color-border-strong)] bg-transparent px-1 py-2.5 font-editorial text-[1.25rem] tracking-[0.04em] text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-caramel)]"
                      />
                    </div>

                    {/* MESSAGE */}

                    <div>
                      <label
                        htmlFor="rsvp-message"
                        className="block text-left font-body text-[0.42rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]"
                      >
                        A message for the couple{" "}
                        <span className="tracking-normal">
                          [Optional]
                        </span>
                      </label>

                      <textarea
                        id="rsvp-message"
                        value={message}
                        onChange={(event) => {
                          setMessage(
                            event.target.value,
                          )
                          setError("")
                        }}
                        placeholder="Leave Manuel & Sharon a message..."
                        maxLength={500}
                        rows={1}
                        className="mt-2 w-full resize-none border-b border-[var(--color-border-strong)] bg-transparent px-1 py-2 font-editorial text-[1.15rem] leading-[1.5] text-[var(--color-espresso)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-caramel)]"
                      />

                      <div className="mt-1 text-right">
                        <span className="font-body text-[0.42rem] tracking-[0.08em] text-[var(--color-muted)]">
                          {message.length}/500
                        </span>
                      </div>
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
                          <span className="text-[var(--color-espresso)]">
                            {error}
                          </span>
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* SUBMIT */}

                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      whileTap={
                        !isLoading
                          ? {
                              scale: 0.98,
                            }
                          : undefined
                      }
                      className="invitation-button disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLoading
                        ? "Sending..."
                        : "Send RSVP"}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* =================================================
                  SUCCESS
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
                    Thank you, {name}.
                  </p>

                  <p className="mx-auto mt-5 max-w-md font-editorial text-[clamp(1.2rem,3vw,1.7rem)] italic leading-[1.45] text-[var(--color-cinnamon)]">
                    <strong className="text-[var(--color-espresso)]">
                      Your RSVP has been received.
                    </strong>{" "}
                    We look forward to celebrating
                    with you.
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