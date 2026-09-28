import backgroundImage from "../../assets/couple/background.png"

export default function BackgroundMonogram() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center"
    >
      <img
        src={backgroundImage}
        alt=""
        className="w-[420px] sm:w-[600px] opacity-[0.06] blur-[0.1px] mix-blend-soft-light"
      />
    </div>
  )
}