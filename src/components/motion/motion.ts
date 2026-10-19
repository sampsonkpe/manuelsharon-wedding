/*
 * ============================================================
 * THE MAN FOR SHAY — GLOBAL MOTION SYSTEM
 * ============================================================
 *
 * Motion language:
 * - restrained
 * - editorial
 * - soft
 * - cinematic
 * - fluid
 *
 * The invitation should feel like a physical piece of
 * stationery unfolding rather than an interface animating.
 *
 * Motion should never feel rushed. Transitions have room
 * to settle, with carefully differentiated entrance and
 * exit timing.
 */

/* ============================================================
   EASING
   ============================================================ */

/** Smooth, luxurious deceleration for entrances and reveals. */
export const luxuryEase = [0.22, 1, 0.36, 1] as const

/** Gradual acceleration for elements leaving the screen. */
export const luxuryEaseIn = [0.4, 0, 1, 1] as const

/** Gentle deceleration for subtle UI interactions. */
export const luxuryEaseOut = [0, 0, 0.2, 1] as const

/** Balanced easing for cinematic page exits. */
export const cinematicExitEase = [0.65, 0, 0.35, 1] as const

/* ============================================================
   DURATIONS
   ============================================================ */

export const durationMicro = 0.65

export const durationBase = 1.35

export const durationImage = 1.7

export const durationCinematic = 2.4

/** Default page animation duration. */
export const durationPage = 1.6

export const durationSlow = 2.8

/* ============================================================
   PAGE TRANSITION TIMING
   ============================================================ */

/**
 * Incoming pages take their time becoming visible.
 * The movement is deliberately restrained.
 */
export const pageEnterTransition = {
  duration: 1.55,
  ease: luxuryEase,
}

/**
 * Outgoing pages settle away a little sooner so the
 * overall navigation feels fluid rather than sluggish.
 */
export const pageExitTransition = {
  duration: 0.9,
  ease: cinematicExitEase,
}

/* ============================================================
   STAGGER
   ============================================================ */

export const staggerSmall = 0.14

export const staggerMedium = 0.22

export const staggerLarge = 0.32

/* ============================================================
   STANDARD REVEAL
   ============================================================ */

export const revealInitial = {
  opacity: 0,
  y: 10,
  filter: "blur(3px)",
}

export const revealAnimate = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
}

export const revealExit = {
  opacity: 0,
  y: -6,
  filter: "blur(2px)",
}

export const revealTransition = {
  duration: durationBase,
  ease: luxuryEase,
}

/* ============================================================
   SOFT REVEAL
   ============================================================ */

export const softRevealInitial = {
  opacity: 0,
  filter: "blur(3px)",
}

export const softRevealAnimate = {
  opacity: 1,
  filter: "blur(0px)",
}

export const softRevealExit = {
  opacity: 0,
  filter: "blur(2px)",
}

export const softRevealTransition = {
  duration: durationBase,
  ease: luxuryEase,
}

/* ============================================================
   IMAGE REVEAL
   ============================================================ */

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
  scale: 0.985,
  filter: "blur(3px)",
}

export const imageRevealTransition = {
  duration: durationImage,
  ease: luxuryEase,
}

/* ============================================================
   CINEMATIC REVEAL
   ============================================================ */

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
  scale: 0.985,
  filter: "blur(4px)",
}

export const cinematicTransition = {
  duration: durationCinematic,
  ease: luxuryEase,
}

/* ============================================================
   PAGE TRANSITION
   ============================================================ */

/**
 * Incoming page:
 * A subtle upward arrival, with a restrained sense of depth.
 *
 * Avoid large movements. The effect should be felt rather
 * than noticed.
 */
export const pageInitial = {
  opacity: 0,
  y: 14,
  scale: 0.995,
  filter: "blur(2px)",
}

/** Resting page state. */
export const pageAnimate = {
  opacity: 1,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
}

/**
 * Outgoing page:
 * A quiet upward drift and soft fade.
 */
export const pageExit = {
  opacity: 0,
  y: -8,
  scale: 0.998,
  filter: "blur(1.5px)",
}

/**
 * Kept as a shared export for compatibility with existing code.
 * PageTransition.tsx uses the separate entrance and exit
 * timing values above for more precise control.
 */
export const pageTransition = pageEnterTransition

/* ============================================================
   BUTTON INTERACTION
   ============================================================ */

export const buttonTransition = {
  duration: durationMicro,
  ease: luxuryEase,
}

/* ============================================================
   STAGGERED CONTAINER
   ============================================================ */

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerSmall,
    },
  },
}

export const staggerContainerMedium = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: staggerMedium,
    },
  },
}