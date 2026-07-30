import { motion } from 'framer-motion'
import AboutHero from '../Components/about/AboutHero'
import ConceptualizationSection from '../Components/about/ConceptualizationSection'
import AboutStory from '../Components/about/AboutStory'

export default function AboutPage() {
  return (
    <motion.main
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <AboutHero />
      <ConceptualizationSection />
      <AboutStory />
    </motion.main>
  )
}
