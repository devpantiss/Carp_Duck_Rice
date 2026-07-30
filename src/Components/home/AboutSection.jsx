import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

const stats = [
  { value: 5000, suffix: '+', label: 'Farmers Trained', sub: 'agricultural skill building', color: '#10b981' },
  { value: 1200, suffix: '+', label: 'Youth Engaged', sub: 'rural leadership & tech', color: '#3b82f6' },
  { value: 150, suffix: '+', label: 'Agri-Enterprises', sub: 'micro-business setup', color: '#148f77' },
  { value: 6, suffix: '', label: 'Programs Launched', sub: 'farming initiatives', color: '#f59e0b' },
]

function StatItem({ value, suffix, label, sub, delay, color }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })
  return (
    <motion.div
      ref={ref}
      className="about__stat-card"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      <div className="about__stat-icon-glow" style={{ background: color }} />
      <div className="about__stat-number" style={{ color }}>
        {inView ? <CountUp end={value} duration={2.5} delay={delay} /> : '0'}
        <span>{suffix}</span>
      </div>
      <div className="about__stat-label">{label}</div>
      <div className="about__stat-sub">{sub}</div>
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section className="about-stats-section">
      <div className="container">
        <div className="about__stats">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} {...stat} delay={i * 0.08} />
          ))}
        </div>
      </div>

      <style>{`
        .about-stats-section {
          padding: 90px 0;
          background: linear-gradient(180deg, #f4f8fb 0%, #ffffff 100%);
          position: relative;
        }
        .about__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .about__stat-card {
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          padding: 40px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8);
          position: relative;
          overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .about__stat-card:hover {
          border-color: rgba(255, 255, 255, 1);
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.07);
        }
        .about__stat-icon-glow {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.15;
          pointer-events: none;
        }
        .about__stat-number {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 3.5vw, 3.8rem);
          font-weight: 400;
          line-height: 1;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }
        .about__stat-number span {
          color: inherit;
        }
        .about__stat-label {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dark);
          margin-bottom: 8px;
        }
        .about__stat-sub {
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--text-light);
          line-height: 1.4;
          font-weight: 400;
        }
        @media (max-width: 1024px) {
          .about__stats { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .about__stat-card { padding: 32px 20px; }
        }
        @media (max-width: 560px) {
          .about__stats { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}