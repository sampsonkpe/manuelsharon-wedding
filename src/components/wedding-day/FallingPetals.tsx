import "./FallingPetals.css"

interface FallingPetalsProps {
  className?: string
}

const petals = Array.from({ length: 18 }, (_, index) => ({
  left: `${4 + ((index * 37) % 92)}%`,
  top: `${(index * 29) % 100}%`,
  delay: `${-((index * 7) % 24)}s`,
  duration: `${18 + ((index * 3) % 12)}s`,
  size: 25 + ((index * 7) % 13),
}))

export default function FallingPetals({
  className = "",
}: FallingPetalsProps) {
  return (
    <div
      aria-hidden="true"
      className={`falling-petals ${className}`.trim()}
    >
      {petals.map((petal, index) => (
        <img
          key={index}
          src={`/petals/petal-${String(index + 1).padStart(2, "0")}.png`}
          alt=""
          draggable={false}
          className="falling-petal object-contain"
          style={{
            left: petal.left,
            top: petal.top,
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