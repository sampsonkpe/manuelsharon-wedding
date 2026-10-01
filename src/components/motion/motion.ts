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

export const durationMicro = 0.65

export const durationBase = 1.35

export const durationImage = 1.8

export const durationCinematic = 2.4

export const durationPage = 1.4

export const durationSlow = 2.8

/* ============================================================
   STAGGER
   ============================================================ */

export const staggerSmall = 0.12

export const staggerMedium = 0.18

export const staggerLarge = 0.26

/* ============================================================
   STANDARD REVEAL
   ============================================================ */

export const revealInitial = {
  opacity: 0,
  y: 5,
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
  scale: 0.98,
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
  scale: 0.985,
  filter: "blur(5px)",
}

export const cinematicAnimate = {
  opacity: 1,
  scale: 1,
  filter: "blur(0px)",
}

export const cinematicExit = {
  opacity: 0,
  scale: 0.99,
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