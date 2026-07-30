import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const metrics = [
  { value: '150+', label: 'Families supported' },
  { value: '40+', label: 'Rice and fish varieties' },
  { value: '0', label: 'Chemical pesticide model' },
  { value: '4', label: 'Connected livelihood streams' },
]

export default function AboutImpact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="about-impact" ref={ref}>
      <div className="container">
        <motion.div
          className="about-impact__header"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>Impact Lens</div>
          <h2 className="display-heading" style={{ color: 'white' }}>A park measured in <em>people</em> and ecology</h2>
        </motion.div>

        <div className="about-impact__grid">
          {metrics.map((metric, index) => (
            <motion.div
              className="about-impact__metric"
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .about-impact {
          padding: var(--section-pad) 0;
          background: var(--text-dark);
        }
        .about-impact__header {
          max-width: 700px;
          margin-bottom: 56px;
        }
        .about-impact__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.1);
        }
        .about-impact__metric {
          min-height: 190px;
          padding: 34px 28px;
          background: var(--text-dark);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .about-impact__metric strong {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 300;
          color: var(--accent-gold);
          line-height: 1;
        }
        .about-impact__metric span {
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.58);
          line-height: 1.7;
        }
        @media (max-width: 900px) {
          .about-impact__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .about-impact__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
