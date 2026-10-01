import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import SplashPage from "./pages/SplashPage"
import HomePage from "./pages/HomePage"
import ClosingPage from "./pages/ClosingPage"
import PageTransition from "./components/motion/PageTransition"
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
              <Navigate
                to="/"
                replace
              />
            }
          />

          <Route
            path="/moments"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

          <Route
            path="/menu"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

          <Route
            path="/gifts"
            element={
              <Navigate
                to="/"
                replace
              />
            }
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