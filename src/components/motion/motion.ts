export const luxuryEase = [0.22, 1, 0.36, 1] as const

/*
 * Global motion timing
 *
 * The entire website follows a restrained
 * timing language so every interaction feels
 * like part of the same visual system.
 */

/*
 * Micro interaction
 *
 * Used for subtle interface feedback.
 */
export const durationMicro = 0.7

/*
 * Base motion
 *
 * The primary duration used across the website.
 * Text reveals, content transitions and page
 * transitions all use this as their foundation.
 */
export const durationBase = 0.9

/*
 * Image motion
 *
 * Slightly slower and softer than standard content.
 */
export const durationImage = 1.1

/*
 * Cinematic motion
 *
 * Reserved for major visual moments.
 */
export const durationCinematic = 1.5

/*
 * Sequential timing
 *
 * Elements should never feel mechanically staggered.
 * The spacing is deliberately subtle.
 */
export const staggerSmall = 0.15
export const staggerMedium = 0.2

/*
 * Standard content reveal
 *
 * Elements emerge from obscurity rather than
 * visibly travelling into position.
 */
export const revealInitial = {
  opacity: 0,
  scale: 0.985,
  filter: "blur(3px)",
}

export const revealAnimate = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
}

export const revealExit = {
  opacity: 0,
  scale: 0.985,
  filter: "blur(3px)",
}

export const revealTransition = {
  duration: durationBase,
  ease: luxuryEase,
}

/*
 * Image reveal
 *
 * Images use the same visual language as text,
 * with slightly more breathing room.
 */
export const imageRevealInitial = {
  opacity: 0,
  scale: 0.975,
  filter: "blur(4px)",
}

export const imageRevealAnimate = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
}

export const imageRevealExit = {
  opacity: 0,
  scale: 0.975,
  filter: "blur(4px)",
}

export const imageRevealTransition = {
  duration: durationImage,
  ease: luxuryEase,
}

/*
 * Cinematic reveal
 *
 * Reserved for major visual moments such as
 * the opening sequence.
 */
export const cinematicInitial = {
  opacity: 0,
  scale: 0.97,
  filter: "blur(5px)",
}

export const cinematicAnimate = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
}

export const cinematicExit = {
  opacity: 0,
  scale: 0.97,
  filter: "blur(5px)",
}

export const cinematicTransition = {
  duration: durationCinematic,
  ease: luxuryEase,
}

/*
 * Route/page transition
 *
 * Pages crossfade while gently moving between
 * clarity and obscurity.
 */
export const pageInitial = {
  opacity: 0,
  filter: "blur(3px)",
}

export const pageAnimate = {
  opacity: 1,
  filter: "blur(0px)",
}

export const pageExit = {
  opacity: 0,
  filter: "blur(3px)",
}

export const pageTransition = {
  duration: durationBase,
  ease: luxuryEase,
}