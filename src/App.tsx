import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import SplashPage from "./pages/SplashPage"
import HomePage from "./pages/HomePage"
import ClosingPage from "./pages/ClosingPage"
import ScrollToTop from "./components/navigation/ScrollToTop"

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/event" element={<EventHome />} />
        <Route path="/closing" element={<ClosingPage />} />

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