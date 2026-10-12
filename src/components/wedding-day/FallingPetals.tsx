
import "./FallingPetals.css"

const petals = [
  { left: "8%", delay: "0s", duration: "12s", size: 36 },
  { left: "24%", delay: "-5s", duration: "15s", size: 30 },
  { left: "42%", delay: "-8s", duration: "13s", size: 38 },
  { left: "61%", delay: "-3s", duration: "16s", size: 32 },
  { left: "79%", delay: "-10s", duration: "14s", size: 36 },
  { left: "94%", delay: "-6s", duration: "17s", size: 30 },
]

export default function FallingPetals() {
  return (
    <div
      aria-hidden="true"
      className="falling-petals pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {petals.map((petal, index) => (
        <img
          key={index}
          src={`/petals/petal-${String(index + 1).padStart(2, "0")}.png`}
          alt=""
          draggable={false}
          className="falling-petal absolute top-0 select-none object-contain"
          style={{
            left: petal.left,
            width: petal.size * 1.2,
            height: petal.size * 1.5,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        />
      ))}
    </div>
  )
}
