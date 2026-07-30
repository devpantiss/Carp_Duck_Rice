import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import ParkPage from './Pages/ParkPage'
import GalleryPage from './Pages/GalleryPage'
import ContactPage from './Pages/ContactPage'
import ProgramPage from './Pages/ProgramPage'
import WhatWeDoPage from './Pages/WhatWeDoPage'
import PondyFishPage from './Pages/PondyFishPage'
import GuavaPage from './Pages/GuavaPage'
import GoatsPage from './Pages/GoatsPage'
import TamarindPage from './Pages/TamarindPage'
import TassarFashionPage from './Pages/TassarFashionPage'
import MegaPoultryPage from './Pages/MegaPoultryPage'
import CoffeePage from './Pages/CoffeePage'
import DashboardPage from './Pages/DashboardPage'
import ReportsPage from './Pages/ReportsPage'
import PowerBIDashboardPage from './Pages/PowerBIDashboardPage'
import Navbar from './Components/Common/Navbar'
import Footer from './Components/Common/Footer'
import ScrollToTop from './Components/Common/ScrollToTop'

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
      <Footer />
    </Router>
  )
}

export default App
