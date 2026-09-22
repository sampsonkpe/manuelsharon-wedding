import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import TypeSpecimenPage from "./pages/TypeSpecimenPage"

function Splash() {
  return (
    <main className="min-h-screen">
      <h1>Splash</h1>
    </main>
  )
}

function Home() {
  return (
    <main className="min-h-screen">
      <h1>Manuel & Sharon</h1>
    </main>
  )
}

function EventHome() {
  return (
    <main className="min-h-screen">
      <h1>Wedding Day</h1>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />

        <Route path="/event" element={<EventHome />} />

        <Route
          path="/programme"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/moments"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/menu"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/gifts"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/seating"
          element={<Navigate to="/" replace />}
        />

        <Route
          path="/appreciation"
          element={<Navigate to="/" replace />}
        />

        <Route path="/type-test" element={<TypeSpecimenPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App