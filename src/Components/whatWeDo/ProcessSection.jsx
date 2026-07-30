import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const steps = [
  'Map ponds, fields, water flows, households, and local market demand.',
  'Design the carp-duck-rice cycle around the site conditions and farmer capacity.',
  'Train community groups through seasonal demonstrations and field mentoring.',
  'Track ecological health, yields, income, and learning outcomes over time.',
]

export default function ProcessSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="work-process" ref={ref}>
      <div className="container work-process__layout">
        <motion.div
          initial={{ opacity: 0, x: -34 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Method</div>
          <h2 className="display-heading" style={{ color: 'white' }}>How the work <em>moves</em></h2>
          <p className="work-process__intro">
            Each intervention starts with the land and the people already there. The goal is a working model that can be maintained locally, not a one-time installation.
          </p>
        </motion.div>

        <div className="work-process__steps">
          {steps.map((step, index) => (
            <motion.div
              className="work-process__step"
              key={step}
              initial={{ opacity: 0, x: 34 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <span>0{index + 1}</span>
              <p>{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .work-process {
          padding: var(--section-pad) 0;
          background: var(--text-dark);
        }
        .work-process__layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(42px, 7vw, 90px);
          align-items: start;
        }
        .work-process__intro {
          margin-top: 22px;
          max-width: 480px;
          color: rgba(255,255,255,0.62);
          font-size: 15px;
          line-height: 1.9;
        }
        .work-process__steps {
          display: grid;
          gap: 1px;
          background: rgba(255,255,255,0.1);
        }
        .work-process__step {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 24px;
          padding: 28px 30px;
          background: var(--text-dark);
          align-items: start;
        }
        .work-process__step span {
          font-size: 10px;
          letter-spacing: 0.28em;
          color: var(--accent-gold);
        }
        .work-process__step p {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255,255,255,0.72);
        }
        @media (max-width: 900px) {
          .work-process__layout { grid-template-columns: 1fr; }
        }
        @media (max-width: 560px) {
          .work-process__step {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  )
}
