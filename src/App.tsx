import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

import SplashPage from "./pages/SplashPage"
import HomePage from "./pages/HomePage"
import ClosingPage from "./pages/ClosingPage"
import PageTransition from "./components/motion/PageTransition"
import ScrollToTop from "./components/navigation/ScrollToTop"
import BackgroundMonogram from "./components/layout/BackgroundMonogram"
import ProgrammePage from "./pages/wedding-day/ProgrammePage"
import MomentsPage from "./pages/wedding-day/MomentsPage"
import FoodMenuPage from "./pages/wedding-day/FoodMenuPage"
import GiftsPage from "./pages/wedding-day/GiftsPage"

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
   * When the browser is refreshed while already on /home,
   * replay the invitation opening sequence over the HomePage.
   *
   * This state is initialised only once when AnimatedRoutes
   * mounts, so normal navigation to /home does not replay it.
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
                  <HomePage />

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
              FUTURE WEDDING-DAY ROUTES
              ================================================= */}

          <Route
            path="/programme"
            element={<ProgrammePage />}
          />

          <Route
            path="/moments"
            element={<MomentsPage />}
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
            path="/seating"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

          <Route
            path="/appreciation"
            element={
              <Navigate
                to="/"
                replace
              />
            }
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