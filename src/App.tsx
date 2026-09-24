import { AnimatePresence } from "framer-motion"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"

import SplashPage from "./pages/SplashPage"
import HomePage from "./pages/HomePage"
import ClosingPage from "./pages/ClosingPage"
import PageTransition from "./components/motion/PageTransition"

function EventHome() {
  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <h1 className="font-editorial text-[var(--color-espresso)]">
        Wedding Day
      </h1>
    </main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="sync">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route
          path="/"
          element={
            <PageTransition>
              <SplashPage />
            </PageTransition>
          }
        />

        <Route
          path="/home"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />

        <Route
          path="/event"
          element={
            <PageTransition>
              <EventHome />
            </PageTransition>
          }
        />

        <Route
          path="/closing"
          element={
            <PageTransition>
              <ClosingPage />
            </PageTransition>
          }
        />

        <Route
          path="/programme"
          element={
            <Navigate to="/" replace />
          }
        />

        <Route
          path="/moments"
          element={
            <Navigate to="/" replace />
          }
        />

        <Route
          path="/menu"
          element={
            <Navigate to="/" replace />
          }
        />

        <Route
          path="/gifts"
          element={
            <Navigate to="/" replace />
          }
        />

        <Route
          path="/seating"
          element={
            <Navigate to="/" replace />
          }
        />

        <Route
          path="/appreciation"
          element={
            <Navigate to="/" replace />
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}