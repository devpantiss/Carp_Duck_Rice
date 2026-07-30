import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'

export default function GoatsPage() {
  const { ref: originRef, inView: originIn } = useInView({ triggerOnce: true, threshold: 0.15 })
  const { ref: whyRef, inView: whyIn } = useInView({ triggerOnce: true, threshold: 0.15 })
  const { ref: impactRef, inView: impactIn } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <div className="program-detail goats-page">
      {/* Hero Section */}
      <section className="detail-hero">
        <video src="/12339388_1920_1080_25fps.mp4" autoPlay muted loop playsInline />
        <div className="detail-hero__overlay" />
        <div className="container detail-hero__content">
          <Link to="/what-we-do" className="back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to What We Do
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-card"
          >
            <span className="eyebrow">Eastern Ghat Goats</span>
            <h1>Raised in the Hills, Sustained by the Community.</h1>
            <p>Sustainably managed livestock reared in harmony with the Eastern Ghats.</p>
          </motion.div>
        </div>
      </section>

      {/* Origin Section */}
      <section className="detail-section detail-origin" ref={originRef}>
        <div className="container">
          <div className="detail-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={originIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="detail-content"
            >
              <span className="section-label">Origin</span>
              <h2>Nurtured in the Highland Pastures</h2>
              <p className="lead">
                Our goats graze in selected pasture areas under the care of tribal pastoralists, ensuring natural diets and animal welfare.
              </p>
              <p>
                By avoiding confined cages and teaching sustainable rotational grazing schedules, we protect the fragile hill forest undergrowth of Odisha\'s Eastern Ghats while raising strong, healthy livestock.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={originIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="detail-graphic"
            >
              <div className="glass-graphic">
                <span className="emoji">🐐</span>
                <h4>Scientific Pastoralism</h4>
                <div className="bar-track"><div className="bar-fill" style={{ width: '100%', background: '#f7b731' }} /></div>
                <p> Rotational schedules ensure that hill forests have time to regenerate between grazing seasons.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="detail-section detail-why" ref={whyRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={whyIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="section-center"
          >
            <span className="section-label">Importance</span>
            <h2>Why It Matters</h2>
          </motion.div>
          
          <div className="why-grid">
            {[
              { title: 'High Resilience', desc: 'Indigenous breeds have adapted over centuries to thrive in seasonal drought climates.', icon: '💪' },
              { title: 'Organic Nutrition', desc: 'Foraging in wild, pesticide-free vegetation yields clean, naturally nutritious dairy.', icon: '🥛' },
              { title: 'Active Safety Nets', desc: 'Acts as an emergency financial asset for forest-dwelling communities during cash gaps.', icon: '🏦' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={whyIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="why-card"
              >
                <span className="why-card__icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="detail-section detail-impact" ref={impactRef}>
        <div className="container">
          <div className="detail-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={impactIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="detail-graphic"
            >
              <img src="/goats_5.jpg" alt="Highland Livestock" className="impact-img" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={impactIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="detail-content"
            >
              <span className="section-label">Impact</span>
              <h2>Stabilizing Incomes, Restoring Hills</h2>
              <p className="lead">
                Stabilizing tribal incomes while maintaining pasture biodiversity and ecological balance.
              </p>
              <p>
                By linking remote tribal pastoralists to vet clinics and direct cooperatives, we eliminate exploitative trade loops, protect hill soils from overgrazing, and build stable rural wealth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        .program-detail {
          background: #0B0F14;
          color: white;
          overflow: hidden;
        }
        .detail-hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .detail-hero video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
        }
        .detail-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(11,15,20,0.85) 100%);
          z-index: 1;
        }
        .detail-hero__content {
          position: relative;
          z-index: 2;
          text-align: left;
          width: 100%;
          padding: 0 24px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 40px;
          transition: color 0.3s;
          padding-top: 80px;
        }
        .back-link:hover {
          color: #f7b731;
        }
        .hero-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 48px;
          border-radius: 24px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          max-width: 800px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        .hero-card .eyebrow {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #f7b731;
          font-weight: bold;
          display: block;
          margin-bottom: 16px;
        }
        .hero-card h1 {
          font-family: var(--font-display);
          font-size: clamp(3rem, 5vw, 5.2rem);
          font-weight: 300;
          line-height: 1.1;
          margin: 0 0 16px 0;
          letter-spacing: -0.01em;
        }
        .hero-card p {
          font-size: clamp(15px, 1.8vw, 18px);
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-weight: 300;
        }

        .detail-section {
          padding: 120px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .detail-content {
          text-align: left;
        }
        .section-label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #f7b731;
          font-weight: bold;
          display: block;
          margin-bottom: 16px;
        }
        .detail-content h2 {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4vw, 3.8rem);
          font-weight: 300;
          margin: 0 0 24px 0;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .detail-content p {
          font-size: 15px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 20px;
          font-weight: 300;
        }
        .detail-content p.lead {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 24px;
        }
        .glass-graphic {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 40px;
          border-radius: 20px;
          text-align: left;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .glass-graphic .emoji {
          font-size: 36px;
          margin-bottom: 20px;
          display: block;
        }
        .glass-graphic h4 {
          margin: 0 0 12px 0;
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 400;
        }
        .glass-graphic .bar-track {
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
          margin-bottom: 16px;
        }
        .glass-graphic .bar-fill {
          height: 100%;
          border-radius: 2px;
        }
        .glass-graphic p {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }

        .section-center {
          text-align: center;
          margin-bottom: 56px;
        }
        .section-center h2 {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4vw, 3.8rem);
          font-weight: 300;
          margin: 0;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .why-card {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 36px 28px;
          border-radius: 16px;
          text-align: left;
          transition: transform 0.3s, border-color 0.3s;
        }
        .why-card:hover {
          transform: translateY(-4px);
          border-color: #f7b731;
        }
        .why-card__icon {
          font-size: 28px;
          margin-bottom: 20px;
          display: block;
        }
        .why-card h3 {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 400;
          margin: 0 0 12px 0;
          letter-spacing: 0.02em;
        }
        .why-card p {
          font-size: 13.5px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-weight: 300;
        }

        .impact-img {
          width: 100%;
          height: auto;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .why-grid {
            grid-template-columns: 1fr;
          }
          .detail-section {
            padding: 80px 0;
          }
          .hero-card {
            padding: 32px;
          }
        }
      `}</style>
    </div>
  )
}
