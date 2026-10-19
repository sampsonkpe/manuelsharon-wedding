import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

import SplashPage from "./pages/SplashPage"
import HomePage from "./pages/HomePage"
import ClosingPage from "./pages/ClosingPage"
import PageTransition from "./components/motion/PageTransition"
import ScrollToTop from "./components/navigation/ScrollToTop"
import BackgroundMonogram from "./components/layout/BackgroundMonogram"
import ProgrammePage from "./pages/wedding-day/ProgrammePage"
import FoodMenuPage from "./pages/wedding-day/FoodMenuPage"
import GiftsPage from "./pages/wedding-day/GiftsPage"
import AppreciationPage from "./pages/wedding-day/AppreciationPage"

import { luxuryEase } from "./components/motion/motion"

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

  /*
   * ============================================================
   * REFRESH INTRO
   * ============================================================
   *
   * Replay the invitation opening when /home is loaded directly
   * or refreshed.
   *
   * The HomePage mounts underneath the splash, but remains
   * visually concealed until the introduction finishes.
   *
   * Once the splash completes, the HomePage is revealed with
   * a slow, smooth opacity transition.
   */

  const [showRefreshIntro, setShowRefreshIntro] =
    useState(() => location.pathname === "/home")

  const handleRefreshIntroComplete = () => {
    setShowRefreshIntro(false)
  }

  const handleExitComplete = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  }

  return (
    <>
      <ScrollToTop />

      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={handleExitComplete}
      >
        <Routes
          location={location}
          key={location.pathname}
        >
          {/* =================================================
              SPLASH
              ================================================= */}

          <Route
            path="/"
            element={
              <PageTransition>
                <SplashPage />
              </PageTransition>
            }
          />

          {/* =================================================
              HOME
              ================================================= */}

          <Route
            path="/home"
            element={
              <PageTransition>
                <div className="relative min-h-screen">
                  {/* HOME CONTENT */}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: showRefreshIntro ? 0 : 1,
                    }}
                    transition={{
                      duration: 1.8,
                      ease: luxuryEase,
                    }}
                    aria-hidden={showRefreshIntro}
                    className="relative min-h-screen"
                  >
                    <HomePage />
                  </motion.div>

                  {/* REFRESH INTRO */}

                  {showRefreshIntro && (
                    <SplashPage
                      onComplete={
                        handleRefreshIntroComplete
                      }
                    />
                  )}
                </div>
              </PageTransition>
            }
          />

          {/* =================================================
              EVENT
              ================================================= */}

          <Route
            path="/event"
            element={
              <PageTransition>
                <EventHome />
              </PageTransition>
            }
          />

          {/* =================================================
              CLOSING
              ================================================= */}

          <Route
            path="/closing"
            element={
              <PageTransition>
                <ClosingPage />
              </PageTransition>
            }
          />

          {/* =================================================
              WEDDING-DAY ROUTES
              ================================================= */}

          <Route
            path="/programme"
            element={<ProgrammePage />}
          />

          {/* Keep MomentsPage.tsx in the project.
              Redirect previous /moments links to /home. */}

          <Route
            path="/moments"
            element={
              <Navigate
                to="/home"
                replace
              />
            }
          />

          <Route
            path="/menu"
            element={<FoodMenuPage />}
          />

          <Route
            path="/gifts"
            element={<GiftsPage />}
          />

          <Route
            path="/appreciation"
            element={<AppreciationPage />}
          />

          {/* =================================================
              FALLBACK
              ================================================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
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