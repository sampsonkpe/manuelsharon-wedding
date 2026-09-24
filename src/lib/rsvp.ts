const RSVP_API_URL =
  "https://script.google.com/macros/s/AKfycbzSce4vAj23v7s1681lCg0lBr5X7cXzZSS0r1aCFMt9P-d5ocIGu-KqIq8rTCtESTS8/exec"

const REQUEST_TIMEOUT = 8000

const VERIFY_MAX_ATTEMPTS = 2

const VERIFY_RETRY_DELAY = 300

export type RsvpResponse =
  | "ATTENDING"
  | "UNABLE TO ATTEND"

export interface VerifyGuestResult {
  success: boolean
  verified: boolean
  guest?: string
  rsvp?: RsvpResponse | null
  message?: string
}

export interface RecordRsvpResult {
  success: boolean
  recorded?: boolean
  guest?: string
  rsvp?: RsvpResponse
  message?: string
}

/**
 * Wait before retrying verification.
 */
function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

/**
 * Fetch with a timeout.
 */
async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const controller = new AbortController()

  const timeout = window.setTimeout(() => {
    controller.abort()
  }, REQUEST_TIMEOUT)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
    })
  } finally {
    window.clearTimeout(timeout)
  }
}

/**
 * Verify a guest with a very small retry window.
 *
 * Verification is a GET request, so retrying is safe.
 *
 * We deliberately keep this fast:
 *
 * Attempt 1
 *    ↓
 * 300ms
 *    ↓
 * Attempt 2
 *    ↓
 * stop
 */
async function verifyWithRetry(
  input: RequestInfo | URL,
) {
  let lastError: unknown

  for (
    let attempt = 0;
    attempt < VERIFY_MAX_ATTEMPTS;
    attempt++
  ) {
    try {
      const response =
        await fetchWithTimeout(input)

      if (response.ok) {
        return response
      }

      lastError = new Error(
        `RSVP service returned HTTP ${response.status}.`,
      )
    } catch (error) {
      lastError = error
    }

    if (
      attempt <
      VERIFY_MAX_ATTEMPTS - 1
    ) {
      await wait(VERIFY_RETRY_DELAY)
    }
  }

  throw (
    lastError ??
    new Error(
      "Unable to connect to the RSVP service.",
    )
  )
}

/**
 * Verify a guest against the invitation list.
 */
export async function verifyGuest(
  name: string,
  phone: string,
): Promise<VerifyGuestResult> {
  const params = new URLSearchParams({
    action: "verify",
    name,
    phone,
    _: Date.now().toString(),
  })

  const response = await verifyWithRetry(
    `${RSVP_API_URL}?${params.toString()}`,
  )

  const result =
    (await response.json()) as VerifyGuestResult

  /*
   * A valid response from Google Sheets is not
   * a transport failure and must not be retried.
   */
  return result
}

/**
 * Record an RSVP.
 *
 * This intentionally uses ONE request.
 *
 * A POST should not automatically be retried because
 * the server may have successfully recorded the RSVP
 * even if the browser did not receive the response.
 */
export async function recordRsvp(
  name: string,
  phone: string,
  rsvp: RsvpResponse,
): Promise<RecordRsvpResult> {
  const response =
    await fetchWithTimeout(
      RSVP_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name,
          phone,
          rsvp,
        }),
      },
    )

  return (await response.json()) as RecordRsvpResult
}