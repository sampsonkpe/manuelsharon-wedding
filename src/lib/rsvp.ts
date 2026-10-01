import { supabase } from "./supabase"

export interface SubmitRsvpResult {
  success: boolean
  message: string
}

export async function submitRsvp(
  name: string,
  phone: string,
  message: string,
): Promise<SubmitRsvpResult> {
  const { data, error } = await supabase.rpc(
    "submit_rsvp",
    {
      input_name: name,
      input_phone: phone,
      input_message: message || null,
    },
  )

  if (error) {
    console.error("submit_rsvp error:", error)

    return {
      success: false,
      message:
        "We couldn't submit your RSVP. Please try again.",
    }
  }

  const result = data?.[0]

  if (!result) {
    return {
      success: false,
      message:
        "We couldn't submit your RSVP. Please try again.",
    }
  }

  return {
    success: result.success === true,
    message:
      result.message ??
      "We couldn't submit your RSVP. Please try again.",
  }
}