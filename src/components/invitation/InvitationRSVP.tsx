import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import ScrollReveal from "../motion/ScrollReveal"
import {
  recordRsvp,
  verifyGuest,
  type RsvpResponse,
} from "../../lib/rsvp"

type Step =
  | "intro"
  | "name"
  | "phone"
  | "attendance"
  | "success"

const transition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
}

const contentVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(5px)",
  },

  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition,
  },

  exit: {
    opacity: 0,
    y: -14,
    filter: "blur(4px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function InvitationRsvp() {
  const [step, setStep] = useState<Step>("intro")

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const [guestName, setGuestName] = useState("")
  const [existingRsvp, setExistingRsvp] =
    useState<RsvpResponse | null>(null)

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const startRsvp = () => {
    setError("")
    setStep("name")
  }

  const continueFromName = () => {
    const trimmedName = name.trim()

    if (!trimmedName) {
      setError("Please enter your name.")
      return
    }

    setError("")
    setStep("phone")
  }

  const verifyInvitation = async () => {
    const trimmedName = name.trim()
    const trimmedPhone = phone.trim()

    if (!trimmedName) {
      setError("Please enter your name.")
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

      setGuestName(result.guest ?? trimmedName)
      setExistingRsvp(result.rsvp ?? null)
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

      setGuestName(result.guest ?? guestName)
      setExistingRsvp(response)
      setStep("success")
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
      className="px-[var(--page-padding)] py-[16vh] sm:py-[20vh]"
    >
      <div className="mx-auto max-w-[680px] text-center">
        <ScrollReveal y={28}>
          <p className="font-body text-[0.48rem] font-medium uppercase tracking-[0.38em] text-[var(--color-muted)] sm:text-[0.52rem]">
            RSVP
          </p>
        </ScrollReveal>

        <div className="relative mt-10 min-h-[360px]">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {step === "intro" && (
              <motion.div
                key="intro"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center"
              >
                <p className="max-w-xl font-editorial text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.2] text-[var(--color-deep-brown)]">
                  We&apos;d love to know if you&apos;ll be
                  joining us.
                </p>

                <button
                  type="button"
                  onClick={startRsvp}
                  className="mt-10 border border-[var(--color-border-strong)] px-7 py-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.28em] text-[var(--color-deep-brown)] transition-colors duration-300 hover:border-[var(--color-caramel)] hover:text-[var(--color-burnt-brown)]"
                >
                  RSVP
                </button>
              </motion.div>
            )}

            {/* NAME */}
            {step === "name" && (
              <motion.div
                key="name"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <p className="font-editorial text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.15] text-[var(--color-deep-brown)]">
                  What&apos;s your name?
                </p>

                <div className="mx-auto mt-10 max-w-[440px]">
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        continueFromName()
                      }
                    }}
                    placeholder="Your full name"
                    autoComplete="name"
                    className="w-full border-b border-[var(--color-border-strong)] bg-transparent px-1 py-3 text-center font-editorial text-[1.4rem] text-[var(--color-deep-brown)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-caramel)]"
                  />

                  {error && (
                    <p
                      role="alert"
                      className="mt-5 font-body text-[0.5rem] uppercase tracking-[0.16em] text-[var(--color-burnt-brown)]"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={continueFromName}
                    className="mt-9 border border-[var(--color-border-strong)] px-7 py-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.28em] text-[var(--color-deep-brown)] transition-colors duration-300 hover:border-[var(--color-caramel)] hover:text-[var(--color-burnt-brown)]"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {/* PHONE + NAME */}
            {step === "phone" && (
              <motion.div
                key="phone"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <p className="font-editorial text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.15] text-[var(--color-deep-brown)]">
                  And your phone number?
                </p>

                <div className="mx-auto mt-10 max-w-[440px] space-y-7">
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="rsvp-name"
                      className="block text-left font-body text-[0.44rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]"
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
                      autoComplete="name"
                      className="mt-2 w-full border-b border-[var(--color-border-strong)] bg-transparent px-1 py-3 font-editorial text-[1.35rem] text-[var(--color-deep-brown)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-caramel)]"
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label
                      htmlFor="rsvp-phone"
                      className="block text-left font-body text-[0.44rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]"
                    >
                      Phone number
                    </label>

                    <input
                      id="rsvp-phone"
                      autoFocus
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
                      className="mt-2 w-full border-b border-[var(--color-border-strong)] bg-transparent px-1 py-3 font-editorial text-[1.35rem] tracking-[0.04em] text-[var(--color-deep-brown)] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-caramel)]"
                    />
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="font-body text-[0.5rem] uppercase tracking-[0.16em] leading-[1.7] text-[var(--color-burnt-brown)]"
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={verifyInvitation}
                    disabled={isLoading}
                    className="border border-[var(--color-border-strong)] px-7 py-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.28em] text-[var(--color-deep-brown)] transition-colors duration-300 hover:border-[var(--color-caramel)] hover:text-[var(--color-burnt-brown)] disabled:cursor-wait disabled:opacity-50"
                  >
                    {isLoading
                      ? "Checking..."
                      : "Continue"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ATTENDANCE */}
            {step === "attendance" && (
              <motion.div
                key="attendance"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <p className="font-editorial text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.15] text-[var(--color-deep-brown)]">
                  {existingRsvp
                    ? `Welcome back, ${guestName}.`
                    : `Thank you, ${guestName}.`}
                </p>

                {/* VERIFIED DETAILS */}
                <div className="mx-auto mt-9 max-w-[440px] space-y-5 text-left">
                  <div>
                    <p className="font-body text-[0.42rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
                      Full name
                    </p>

                    <p className="mt-1 border-b border-[var(--color-border)] pb-2 font-editorial text-[1.15rem] text-[var(--color-deep-brown)]">
                      {name}
                    </p>
                  </div>

                  <div>
                    <p className="font-body text-[0.42rem] font-medium uppercase tracking-[0.28em] text-[var(--color-muted)]">
                      Phone number
                    </p>

                    <p className="mt-1 border-b border-[var(--color-border)] pb-2 font-editorial text-[1.15rem] tracking-[0.03em] text-[var(--color-deep-brown)]">
                      {phone}
                    </p>
                  </div>
                </div>

                {existingRsvp && (
                  <p className="mx-auto mt-7 max-w-md font-body text-[0.5rem] uppercase tracking-[0.18em] leading-[1.8] text-[var(--color-muted)]">
                    Your current RSVP is{" "}
                    {existingRsvp === "ATTENDING"
                      ? "attending"
                      : "unable to attend"}.
                  </p>
                )}

                <p className="mt-9 font-editorial text-[clamp(1.4rem,3vw,2rem)] italic text-[var(--color-burnt-brown)]">
                  Will you be joining us?
                </p>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={() =>
                      submitRsvp("ATTENDING")
                    }
                    disabled={isLoading}
                    className="w-full border border-[var(--color-border-strong)] px-7 py-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.25em] text-[var(--color-deep-brown)] transition-colors duration-300 hover:border-[var(--color-caramel)] hover:text-[var(--color-burnt-brown)] disabled:cursor-wait disabled:opacity-50 sm:w-auto"
                  >
                    Yes, I&apos;ll be there
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      submitRsvp("UNABLE TO ATTEND")
                    }
                    disabled={isLoading}
                    className="w-full border border-[var(--color-border-strong)] px-7 py-3 font-body text-[0.48rem] font-medium uppercase tracking-[0.25em] text-[var(--color-deep-brown)] transition-colors duration-300 hover:border-[var(--color-caramel)] hover:text-[var(--color-burnt-brown)] disabled:cursor-wait disabled:opacity-50 sm:w-auto"
                  >
                    I&apos;m unable to attend
                  </button>
                </div>

                {error && (
                  <p
                    role="alert"
                    className="mt-5 font-body text-[0.5rem] uppercase tracking-[0.16em] text-[var(--color-burnt-brown)]"
                  >
                    {error}
                  </p>
                )}
              </motion.div>
            )}

            {/* SUCCESS */}
            {step === "success" && (
              <motion.div
                key="success"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <p className="font-editorial text-[clamp(1.8rem,4vw,2.7rem)] leading-[1.15] text-[var(--color-deep-brown)]">
                  Thank you, {guestName}.
                </p>

                <p className="mx-auto mt-6 max-w-md font-editorial text-[clamp(1.25rem,3vw,1.8rem)] italic leading-[1.45] text-[var(--color-burnt-brown)]">
                  {existingRsvp === "ATTENDING"
                    ? "We look forward to celebrating with you."
                    : "We’re sorry we won’t be celebrating together this time."}
                </p>

                <div className="mx-auto mt-9 h-px w-8 bg-[var(--color-caramel)]" />

                <p className="mt-7 font-body text-[0.48rem] font-medium uppercase tracking-[0.32em] text-[var(--color-muted)]">
                  #TheManforShay
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}