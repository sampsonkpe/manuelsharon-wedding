
import { motion, useReducedMotion } from "framer-motion"

const petalAssets = Array.from({ length: 18 }, (_, index) =>
  `/petals/petal-${String(index + 1).padStart(2, "0")}.png`,
)

const fallingPetals = [
  { left: "4%", start: -8, duration: 15, drift: 34, size: 30, rotate: 250 },
  { left: "12%", start: 24, duration: 18, drift: -28, size: 24, rotate: 310 },
  { left: "20%", start: 56, duration: 14, drift: 22, size: 32, rotate: 220 },
  { left: "29%", start: 8, duration: 20, drift: -34, size: 25, rotate: 280 },
  { left: "38%", start: 76, duration: 16, drift: 30, size: 28, rotate: 340 },
  { left: "47%", start: -12, duration: 19, drift: -24, size: 22, rotate: 260 },
  { left: "56%", start: 39, duration: 15, drift: 32, size: 31, rotate: 300 },
  { left: "65%", start: 65, duration: 21, drift: -30, size: 25, rotate: 230 },
  { left: "74%", start: 15, duration: 17, drift: 26, size: 29, rotate: 320 },
  { left: "83%", start: 83, duration: 16, drift: -22, size: 23, rotate: 270 },
  { left: "92%", start: -5, duration: 20, drift: 28, size: 30, rotate: 350 },
  { left: "98%", start: 47, duration: 18, drift: -26, size: 24, rotate: 240 },
]

export default function FallingPetals() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {fallingPetals.map((petal, index) => {
        const src = petalAssets[(index * 5 + 2) % petalAssets.length]

        return (
          <motion.img
            key={src}
            src={src}
            alt=""
            draggable={false}
            className="absolute top-0 select-none object-contain"
            style={{
              left: petal.left,
              width: petal.size * 1.2,
              height: petal.size * 1.25 * 1.2,
              filter: "saturate(0.88)",
            }}
            initial={{
              y: `${petal.start}vh`,
              x: 0,
              rotate: 0,
              opacity: 0.4,
            }}
            animate={
              shouldReduceMotion
                ? {
                    y: `${petal.start}vh`,
                    rotate: petal.rotate * 0.15,
                    opacity: 0.28,
                  }
                : {
                    y: [
                      `${petal.start}vh`,
                      `${petal.start + 35}vh`,
                      `${petal.start + 70}vh`,
                      "110vh",
                    ],
                    x: [
                      0,
                      petal.drift,
                      -petal.drift * 0.45,
                      petal.drift * 0.25,
                    ],
                    rotate: [
                      0,
                      petal.rotate * 0.4,
                      petal.rotate,
                      petal.rotate * 1.5,
                    ],
                    opacity: [0.4, 0.55, 0.4, 0.12],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    duration: petal.duration,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.28, 0.72, 1],
                  }
            }
            onError={() => {
              console.error(`Failed to load petal: ${src}`)
            }}
          />
        )
      })}
    </div>
  )
}