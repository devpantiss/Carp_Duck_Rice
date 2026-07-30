import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const visitInfo = [
  {
    icon: '01',
    title: 'Carp Pond Walk',
    lines: ['Watch integrated fish culture in action', 'See pond edges, feed cycles, and water care', 'Best light: early morning'],
  },
  {
    icon: '02',
    title: 'Duck & Rice Trail',
    lines: ['Follow ducks through the paddy ecosystem', 'Learn how natural pest control works', 'Seasonal field demos available'],
  },
  {
    icon: '03',
    title: 'Farmer Learning Zone',
    lines: ['Meet trainers and local producers', 'Explore livelihood models and micro-enterprises', 'Ideal for students and groups'],
  },
  {
    icon: '04',
    title: 'Plan With Us',
    lines: ['Bhubaneswar, Odisha', 'Group visits and field immersions welcome', 'visit@cdrpark.in'],
  },
]

export default function VisitSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="visit" ref={ref} id="visit">
      <div className="visit__content">
        <motion.div
          className="visit__visual"
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.0 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          >
            <source
              src="/19848528-uhd_3840_2160_24fps.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>

        <div className="visit__info">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="section-label">Come & Experience</div>
            <h2 className="display-heading">
              Step Into a<br /><em>Living Livelihood System</em>
            </h2>
            <div className="divider" />
            <p className="visit__lead">
              Walk through the ponds, paddy fields, duck corridors, and farmer-led learning spaces that make Carp, Duck & Rice a working model for ecology, food, and rural enterprise.
            </p>
          </motion.div>

          <div className="visit__grid">
            {visitInfo.map((item, i) => (
              <motion.div
                key={item.title}
                className="visit__card"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
              >
                <div className="visit__card-icon">{item.icon}</div>
                <h4 className="visit__card-title">{item.title}</h4>
                {item.lines.map(line => (
                  <p key={line} className="visit__card-line">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="visit__ctas"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
          >
            <a href="/contact" className="btn-primary">
              <span>Plan a Field Visit</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="/park" className="btn-outline">Explore the Park</a>
          </motion.div>
        </div>
      </div>

      <style>{`
        .visit {
          background:
            radial-gradient(circle at 18% 20%, rgba(133, 193, 233, 0.22), transparent 30%),
            linear-gradient(135deg, var(--rice-pale) 0%, var(--earth-warm) 48%, rgba(20, 143, 119, 0.14) 100%);
          overflow: hidden;
        }
        .visit__content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 80vh;
          align-items: stretch;
        }
        .visit__visual {
          overflow: hidden;
          max-height: 800px;
          position: relative;
          background: var(--water-dark);
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
        }
        .visit__visual::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.075);
          pointer-events: none;
        }
        .visit__visual svg {
          height: 100%;
          object-fit: cover;
        }
        .visit__info {
          padding: clamp(60px, 8vw, 120px) clamp(40px, 6vw, 100px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 48px;
          position: relative;
        }
        .visit__info::before {
          content: 'CARP / DUCK / RICE';
          position: absolute;
          top: clamp(24px, 4vw, 54px);
          right: clamp(24px, 5vw, 80px);
          font-size: 10px;
          letter-spacing: 0.28em;
          color: rgba(20, 143, 119, 0.35);
          font-weight: 800;
        }
        .visit__lead {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-light);
          max-width: 520px;
          margin-top: 20px;
        }
        .visit__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .visit__card {
          padding: 24px;
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(20, 143, 119, 0.12);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .visit__card:hover {
          box-shadow: 0 12px 36px rgba(0,0,0,0.1);
          transform: translateY(-3px);
          border-color: rgba(212, 172, 13, 0.45);
        }
        .visit__card-icon {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--water-light), var(--duck-teal));
          color: white;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }
        .visit__card-title {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 500;
          color: var(--water-dark);
          margin-bottom: 10px;
        }
        .visit__card-line {
          font-size: 12px;
          line-height: 1.7;
          color: var(--text-light);
        }
        .visit__ctas {
          display: flex;
          gap: 20px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .visit__content { grid-template-columns: 1fr; }
          .visit__visual { max-height: 400px; }
        }
        @media (max-width: 600px) {
          .visit__grid { grid-template-columns: 1fr; }
          .visit__ctas { flex-direction: column; align-items: flex-start; }
          .visit__info::before { display: none; }
        }
      `}</style>
    </section>
  )
}
