const RSVP_API_URL =
  "https://script.google.com/macros/s/AKfycbx_V6zE20qbYcbAJpyCfF3LzlaY2z90LTdCUJm-QiC6FmpHl-aSx3RNHPKOZWUy5DrH/exec"

const REQUEST_TIMEOUT = 10000

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

  let response: Response

  try {
    response = await fetchWithTimeout(
      `${RSVP_API_URL}?${params.toString()}`,
    )
  } catch {
    /*
     * Google Apps Script can occasionally have a transient
     * connection/redirect delay. Retry the verification once.
     */
    response = await fetchWithTimeout(
      `${RSVP_API_URL}?${params.toString()}`,
    )
  }

  if (!response.ok) {
    throw new Error(
      "Unable to connect to the RSVP service.",
    )
  }

  const result =
    (await response.json()) as VerifyGuestResult

  if (!result.success && result.message) {
    throw new Error(result.message)
  }

  return result
}

export async function recordRsvp(
  name: string,
  phone: string,
  rsvp: RsvpResponse,
): Promise<RecordRsvpResult> {
  let response: Response

  try {
    response = await fetchWithTimeout(
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
  } catch {
    /*
     * The operation is idempotent for the same guest:
     * it updates their existing RSVP row rather than
     * creating a duplicate row.
     *
     * Therefore a single retry is safe here.
     */
    response = await fetchWithTimeout(
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
  }

  if (!response.ok) {
    throw new Error(
      "Unable to submit your RSVP.",
    )
  }

  return response.json()
}