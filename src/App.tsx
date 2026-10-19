import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useCallback } from "react"

import SplashPage from "./pages/SplashPage"
import HomePage from "./pages/HomePage"
import ClosingPage from "./pages/ClosingPage"
import ProgrammePage from "./pages/wedding-day/ProgrammePage"
import FoodMenuPage from "./pages/wedding-day/FoodMenuPage"
import GiftsPage from "./pages/wedding-day/GiftsPage"
import AppreciationPage from "./pages/wedding-day/AppreciationPage"

import PageTransition from "./components/motion/PageTransition"
import PageNav from "./components/navigation/PageNav"
import ScrollToTop from "./components/navigation/ScrollToTop"
import BackgroundMonogram from "./components/layout/BackgroundMonogram"

import { WEDDING_PAGES_UNLOCKED } from "./config/siteConfig"

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

  const handleExitComplete = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  }, [])

  const isWeddingDayPage = [
    "/programme",
    "/menu",
    "/gifts",
    "/appreciation",
  ].includes(location.pathname)

  const showNavigation =
    WEDDING_PAGES_UNLOCKED && isWeddingDayPage

  return (
    <>
      <ScrollToTop />

      {showNavigation && <PageNav />}

      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={handleExitComplete}
      >
        <Routes
          location={location}
          key={location.pathname}
        >
          {/* QR code always opens the envelope splash */}
          <Route
            path="/"
            element={
              <PageTransition>
                <SplashPage />
              </PageTransition>
            }
          />

          {/* Homepage after the envelope is opened */}
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

          {/* Protected wedding-day pages */}
          <Route
            path="/programme"
            element={
              WEDDING_PAGES_UNLOCKED ? (
                <PageTransition>
                  <ProgrammePage />
                </PageTransition>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/menu"
            element={
              WEDDING_PAGES_UNLOCKED ? (
                <PageTransition>
                  <FoodMenuPage />
                </PageTransition>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/gifts"
            element={
              WEDDING_PAGES_UNLOCKED ? (
                <PageTransition>
                  <GiftsPage />
                </PageTransition>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/appreciation"
            element={
              WEDDING_PAGES_UNLOCKED ? (
                <PageTransition>
                  <AppreciationPage />
                </PageTransition>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/moments"
            element={<Navigate to="/home" replace />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[var(--color-background)]">
        <BackgroundMonogram />

        <div className="relative z-20">
          <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  )
}