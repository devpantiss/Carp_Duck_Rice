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
const WhatWeDoPage = lazy(() => import('./Pages/WhatWeDoPage'))
const ProgramDetailPage = lazy(() => import('./Pages/ProgramDetailPage'))
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
        <Route path="/programs/:id"       element={<ProgramDetailPage />} />
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
