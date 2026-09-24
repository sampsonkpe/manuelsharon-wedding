export const luxuryEase = [0.22, 1, 0.36, 1] as const

/*
 * Core durations
 */
export const durationFast = 0.7
export const durationBase = 1
export const durationSlow = 1.5
export const durationCinematic = 1.8

/*
 * Subtle sequential timing
 */
export const staggerSmall = 0.08
export const staggerMedium = 0.12

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
 * Slightly slower and softer than text.
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
  duration: durationSlow,
  ease: luxuryEase,
}

/*
 * Cinematic reveal
 *
 * Reserved for major visual moments.
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