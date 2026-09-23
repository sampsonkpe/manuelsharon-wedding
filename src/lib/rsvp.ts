const RSVP_API_URL =
  "https://script.google.com/macros/s/AKfycbx_V6zE20qbYcbAJpyCfF3LzlaY2z90LTdCUJm-QiC6FmpHl-aSx3RNHPKOZWUy5DrH/exec"

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

export async function verifyGuest(
  name: string,
  phone: string,
): Promise<VerifyGuestResult> {
  const params = new URLSearchParams({
    action: "verify",
    name,
    phone,
  })

  const response = await fetch(`${RSVP_API_URL}?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Unable to connect to the RSVP service.")
  }

  return response.json()
}

export async function recordRsvp(
  name: string,
  phone: string,
  rsvp: RsvpResponse,
): Promise<RecordRsvpResult> {
  const response = await fetch(RSVP_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      name,
      phone,
      rsvp,
    }),
  })

  if (!response.ok) {
    throw new Error("Unable to submit your RSVP.")
  }

  return response.json()
}