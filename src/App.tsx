import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import SplashPage from "./pages/SplashPage"

function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-envelope)]">
      <div className="text-center">
        <p className="mb-4 font-body text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Welcome to the Wedding of
        </p>

        <h1 className="font-display text-7xl text-[var(--color-deep-brown)]">
          Manuel &amp; Sharon
        </h1>
      </div>
    </main>
  )
}

function EventHome() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)]">
      <h1 className="font-editorial text-5xl">
        Wedding Day
      </h1>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/event" element={<EventHome />} />

        <Route path="/programme" element={<Navigate to="/" replace />} />
        <Route path="/moments" element={<Navigate to="/" replace />} />
        <Route path="/menu" element={<Navigate to="/" replace />} />
        <Route path="/gifts" element={<Navigate to="/" replace />} />
        <Route path="/seating" element={<Navigate to="/" replace />} />
        <Route path="/appreciation" element={<Navigate to="/" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App