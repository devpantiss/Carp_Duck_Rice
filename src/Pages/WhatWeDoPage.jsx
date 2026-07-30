import { motion } from 'framer-motion'
import WhatWeDoHero from '../Components/whatWeDo/WhatWeDoHero'
import WorkAreas from '../Components/whatWeDo/WorkAreas'
import FeaturedPrograms from '../Components/whatWeDo/FeaturedPrograms'
import ProcessSection from '../Components/whatWeDo/ProcessSection'

export default function WhatWeDoPage() {
  return (
    <motion.main
      className="page-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <WhatWeDoHero />
      <WorkAreas />
      <FeaturedPrograms />
      <ProcessSection />
    </motion.main>
  )
}
