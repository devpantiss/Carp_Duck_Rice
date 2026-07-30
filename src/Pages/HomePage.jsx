import { motion } from 'framer-motion'
import HeroSection from '../Components/home/HeroSection'
import CelebrationsSection from '../Components/home/CelebrationsSection'
import AboutSection from '../Components/home/AboutSection'
import SeasonsSection from '../Components/home/SeasonsSection'
import ProgramShowcaseSection from '../Components/home/ProgramShowcaseSection'
import PartnersSection from '../Components/home/PartnersSection'
import EnterprisesSection from '../Components/home/EnterprisesSection'
import TestimonialsSection from '../Components/home/TestimonialsSection'
import VisitSection from '../Components/home/VisitSection'
import WhereWeWork from '../Components/home/WhereWeWork'
import ProgramsProjects from '../Components/home/ProgramsProjects'


const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
}

export default function HomePage() {
  return (
    <motion.main className="page-wrapper" variants={pageVariants} initial="hidden" animate="visible" exit="exit">
      <HeroSection />
      <CelebrationsSection />
      <AboutSection />
      <ProgramsProjects />
      <SeasonsSection />
      <ProgramShowcaseSection />
      <PartnersSection />
      <EnterprisesSection />
      <TestimonialsSection />
      <WhereWeWork />
      <VisitSection />
    </motion.main>
  )
}
