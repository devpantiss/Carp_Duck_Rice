import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import HomePage from './Pages/HomePage'
import Navbar from './Components/Common/Navbar'
import Footer from './Components/Common/Footer'
import ScrollToTop from './Components/Common/ScrollToTop'

const AboutPage = lazy(() => import('./Pages/AboutPage'))
const ParkPage = lazy(() => import('./Pages/ParkPage'))
const GalleryPage = lazy(() => import('./Pages/GalleryPage'))
const ContactPage = lazy(() => import('./Pages/ContactPage'))
const ProgramPage = lazy(() => import('./Pages/ProgramPage'))
const WhatWeDoPage = lazy(() => import('./Pages/WhatWeDoPage'))
const PondyFishPage = lazy(() => import('./Pages/PondyFishPage'))
const GuavaPage = lazy(() => import('./Pages/GuavaPage'))
const GoatsPage = lazy(() => import('./Pages/GoatsPage'))
const TamarindPage = lazy(() => import('./Pages/TamarindPage'))
const TassarFashionPage = lazy(() => import('./Pages/TassarFashionPage'))
const MegaPoultryPage = lazy(() => import('./Pages/MegaPoultryPage'))
const CoffeePage = lazy(() => import('./Pages/CoffeePage'))
const DashboardPage = lazy(() => import('./Pages/DashboardPage'))
const ReportsPage = lazy(() => import('./Pages/ReportsPage'))
const PowerBIDashboardPage = lazy(() => import('./Pages/PowerBIDashboardPage'))

// Scroll progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      <div className="grain-overlay" style={{ animation: 'grain-anim 0.5s steps(2) infinite' }} />
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <Routes>
        <Route path="/"                   element={<HomePage />} />
        <Route path="/about"              element={<AboutPage />} />
        <Route path="/what-we-do"         element={<WhatWeDoPage />} />
        <Route path="/park"               element={<ParkPage />} />
        <Route path="/gallery"            element={<GalleryPage />} />
        <Route path="/contact"            element={<ContactPage />} />
        <Route path="/programs/pondy-fish"       element={<PondyFishPage />} />
        <Route path="/programs/guavas-acrerise"   element={<GuavaPage />} />
        <Route path="/programs/easternghats-goat" element={<GoatsPage />} />
        <Route path="/programs/tamarind-grove"    element={<TamarindPage />} />
        <Route path="/programs/tassar-fashion"    element={<TassarFashionPage />} />
        <Route path="/programs/mega-poultry"      element={<MegaPoultryPage />} />
        <Route path="/programs/tribey-coffee"     element={<CoffeePage />} />
        <Route path="/programs/:id"       element={<ProgramPage />} />
        <Route path="/dashboard"          element={<DashboardPage />} />
        <Route path="/dashboard/reports"  element={<ReportsPage />} />
        <Route path="/dashboard/powerbi/:programId" element={<PowerBIDashboardPage />} />
        <Route path="/dashboard/powerbi"  element={<PowerBIDashboardPage />} />
      </Routes>
      </Suspense>
      <Footer />
    </Router>
  )
}

export default App
