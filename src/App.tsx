import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import {
  AnimatePresence,
  motion,
} from "framer-motion"
import {
  useCallback,
  useState,
} from "react"

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

  const [showRefreshIntro, setShowRefreshIntro] =
    useState(() => location.pathname === "/home")

  const [homeHeroReady, setHomeHeroReady] =
    useState(false)

  const handleRefreshIntroComplete = useCallback(() => {
    setShowRefreshIntro(false)
  }, [])

  const handleHomeHeroReady = useCallback(() => {
    setHomeHeroReady(true)
  }, [])

  const handleExitComplete = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    })
  }, [])

  const isHome = location.pathname === "/home"

  const showNavigation =
    [
      "/home",
      "/programme",
      "/menu",
      "/gifts",
      "/appreciation",
    ].includes(location.pathname) &&
    (!isHome || (!showRefreshIntro && homeHeroReady))

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
                <div className="relative min-h-screen">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: showRefreshIntro ? 0 : 1,
                    }}
                    transition={{
                      duration: 1.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    aria-hidden={showRefreshIntro}
                    className="relative min-h-screen"
                  >
                    <HomePage
                      onHeroReady={handleHomeHeroReady}
                    />
                  </motion.div>

                  {showRefreshIntro && (
                    <SplashPage
                      onComplete={handleRefreshIntroComplete}
                    />
                  )}
                </div>
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
              <PageTransition>
                <ProgrammePage />
              </PageTransition>
            }
          />

          <Route
            path="/moments"
            element={<Navigate to="/home" replace />}
          />

          <Route
            path="/menu"
            element={
              <PageTransition>
                <FoodMenuPage />
              </PageTransition>
            }
          />

          <Route
            path="/gifts"
            element={
              <PageTransition>
                <GiftsPage />
              </PageTransition>
            }
          />

          <Route
            path="/appreciation"
            element={
              <PageTransition>
                <AppreciationPage />
              </PageTransition>
            }
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