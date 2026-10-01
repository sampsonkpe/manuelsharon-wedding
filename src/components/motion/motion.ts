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
 * The animation should feel like part of the
 * invitation rather than an interface layered on top.
 */

/* ============================================================
   EASING
   ============================================================ */

export const luxuryEase = [0.22, 1, 0.36, 1] as const

export const luxuryEaseIn = [0.4, 0, 1, 1] as const

export const luxuryEaseOut = [0, 0, 0.2, 1] as const

/* ============================================================
   DURATIONS
   ============================================================ */

export const durationMicro = 0.5

export const durationBase = 1.0

export const durationImage = 1.3

export const durationCinematic = 1.8

export const durationPage = 1.0

export const durationSlow = 2.0

/* ============================================================
   STAGGER
   ============================================================ */

export const staggerSmall = 0.08

export const staggerMedium = 0.14

export const staggerLarge = 0.2

/* ============================================================
   STANDARD REVEAL
   ============================================================ */

export const revealInitial = {
  opacity: 0,
  y: 7,
  filter: "blur(3px)",
}

export const revealAnimate = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
}

export const revealExit = {
  opacity: 0,
  y: -4,
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

export const pageInitial = {
  opacity: 0,
  filter: "blur(4px)",
}

export const pageAnimate = {
  opacity: 1,
  filter: "blur(0px)",
}

export const pageExit = {
  opacity: 0,
  filter: "blur(4px)",
}

export const pageTransition = {
  duration: durationPage,
  ease: luxuryEase,
}

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