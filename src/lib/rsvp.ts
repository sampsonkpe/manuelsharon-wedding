import { supabase } from "./supabase"

export type RsvpResponse =
  | "ATTENDING"
  | "UNABLE TO ATTEND"

export interface VerifyGuestResult {
  success: boolean
  verified: boolean
  guestCode?: string
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
 * Verify a guest against the invitation list.
 *
 * The actual guest lookup happens inside the
 * Supabase SECURITY DEFINER function:
 *
 * public.verify_guest(text, text)
 */
export async function verifyGuest(
  name: string,
  phone: string,
): Promise<VerifyGuestResult> {
  const {
    data,
    error,
  } = await supabase.rpc(
    "verify_guest",
    {
      input_name: name,
      input_phone: phone,
    },
  )

  if (error) {
    console.error(
      "verify_guest error:",
      error,
    )

    return {
      success: false,
      verified: false,
      message:
        "We couldn't connect to the RSVP service. Please try again.",
    }
  }

  /*
   * verify_guest() returns a table.
   *
   * Therefore Supabase returns an array.
   */
  const guest = data?.[0]

  if (!guest) {
    return {
      success: true,
      verified: false,
      message:
        "We couldn't find a matching invitation.",
    }
  }

  return {
    success: true,
    verified: true,
    guestCode: guest.guest_code,
    guest: guest.guest,
    rsvp:
      guest.rsvp === "ATTENDING" ||
      guest.rsvp === "UNABLE TO ATTEND"
        ? guest.rsvp
        : null,
  }
}

/**
 * Record the guest's RSVP response.
 *
 * The actual write happens inside the
 * Supabase SECURITY DEFINER function:
 *
 * public.record_rsvp(text, text)
 */
export async function recordRsvp(
  guestCode: string,
  rsvp: RsvpResponse,
): Promise<RecordRsvpResult> {
  const {
    data,
    error,
  } = await supabase.rpc(
    "record_rsvp",
    {
      input_guest_code: guestCode,
      input_response: rsvp,
    },
  )

  if (error) {
    console.error(
      "record_rsvp error:",
      error,
    )

    return {
      success: false,
      recorded: false,
      message:
        error.message ||
        "We couldn't record your RSVP. Please try again.",
    }
  }

  const result = data?.[0]

  if (!result) {
    return {
      success: false,
      recorded: false,
      message:
        "We couldn't confirm your RSVP. Please try again.",
    }
  }

  return {
    success: true,
    recorded: true,
    guest: result.guest,
    rsvp: result.rsvp,
    message:
      "Your RSVP has been recorded.",
  }
}