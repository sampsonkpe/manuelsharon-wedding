export const luxuryEase = [0.22, 1, 0.36, 1] as const

export const revealInitial = {
  opacity: 0,
  y: 14,
  filter: "blur(3px)",
}

export const revealAnimate = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
}

export const revealExit = {
  opacity: 0,
  y: -10,
  filter: "blur(3px)",
}

export const revealTransition = {
  duration: 1,
  ease: luxuryEase,
}

export const imageRevealInitial = {
  opacity: 0,
  y: 20,
  filter: "blur(4px)",
}

export const imageRevealAnimate = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
}

export const imageRevealTransition = {
  duration: 1.5,
  ease: luxuryEase,
}