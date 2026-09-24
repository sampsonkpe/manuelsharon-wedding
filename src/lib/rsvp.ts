const RSVP_API_URL =
  "https://script.google.com/macros/s/AKfycbykGmNzHEH63CA3Jp4WutQrU4dcIIlz5oKR8_RJhnDx8Vd1wn8i-Jw14YcGMKtLR1dF/exec"

const REQUEST_TIMEOUT = 10000
const MAX_ATTEMPTS = 5

const RETRY_DELAYS = [
  500,
  1000,
  2000,
  4000,
]

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
 * Wait before the next retry.
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
 * Perform a request with automatic retry.
 *
 * Retries only when the request fails at the
 * network/transport level or returns a non-OK response.
 */
async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  let lastError: unknown

  for (
    let attempt = 0;
    attempt < MAX_ATTEMPTS;
    attempt++
  ) {
    try {
      const response = await fetchWithTimeout(
        input,
        init,
      )

      if (response.ok) {
        return response
      }

      lastError = new Error(
        `RSVP service returned HTTP ${response.status}.`,
      )
    } catch (error) {
      lastError = error
    }

    /*
     * Don't wait after the final attempt.
     */
    if (attempt < MAX_ATTEMPTS - 1) {
      await wait(RETRY_DELAYS[attempt])
    }
  }

  throw (
    lastError ??
    new Error(
      "Unable to connect to the RSVP service.",
    )
  )
}

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

  const response = await fetchWithRetry(
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

export async function recordRsvp(
  name: string,
  phone: string,
  rsvp: RsvpResponse,
): Promise<RecordRsvpResult> {
  const response = await fetchWithRetry(
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

  return response.json()
}