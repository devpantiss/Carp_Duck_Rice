import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const areas = [
  {
    title: 'Demonstration Farming',
    body: 'Maintain working carp ponds, duck ranges, and paddy fields that show the integrated model across seasons.',
  },
  {
    title: 'Farmer Training',
    body: 'Run practical sessions on pond preparation, duck management, organic paddy cultivation, and harvest planning.',
  },
  {
    title: 'Ecosystem Restoration',
    body: 'Rehabilitate degraded ponds and field edges using native species, clean water practices, and habitat planting.',
  },
  {
    title: 'Market Linkages',
    body: 'Support community enterprises around fish, eggs, rice, value-added products, and educational visits.',
  },
]

export default function WorkAreas() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  return (
    <section className="work-areas" ref={ref}>
      <div className="container">
        <motion.div
          className="work-areas__header"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label">Core Work</div>
          <h2 className="display-heading">From field practice to <em>replicable</em> systems</h2>
        </motion.div>

        <div className="work-areas__grid">
          {areas.map((area, index) => (
            <motion.article
              className="work-areas__card"
              key={area.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <span>0{index + 1}</span>
              <h3>{area.title}</h3>
              <p>{area.body}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .work-areas {
          padding: var(--section-pad) 0;
          background: var(--cloud-white);
        }
        .work-areas__header {
          max-width: 720px;
          margin-bottom: 58px;
        }
        .work-areas__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .work-areas__card {
          min-height: 310px;
          padding: 30px 26px;
          border: 1px solid rgba(0,0,0,0.08);
          background: white;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.35s var(--ease-cinematic);
        }
        .work-areas__card:hover {
          box-shadow: 0 22px 55px rgba(0,0,0,0.1);
        }
        .work-areas__card span {
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--accent-teal);
          margin-bottom: 34px;
        }
        .work-areas__card h3 {
          font-family: var(--font-display);
          font-size: 25px;
          font-weight: 300;
          color: var(--text-dark);
          line-height: 1.15;
          margin-bottom: 16px;
        }
        .work-areas__card p {
          margin-top: auto;
          font-size: 13px;
          line-height: 1.75;
          color: var(--text-light);
        }
        @media (max-width: 1100px) {
          .work-areas__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 620px) {
          .work-areas__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
