import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const values = [
  { title: 'Community Led', body: 'Farmers, fishers, women collectives, and youth groups shape the work from planning to harvest.' },
  { title: 'Ecology First', body: 'Ponds, paddies, grazing paths, and habitats are managed as one living system.' },
  { title: 'Learning by Doing', body: 'Visitors and partner communities study the model through field demonstrations and seasonal practice.' },
]

export default function AboutStory() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="about-story" ref={ref}>
      <div className="container about-story__layout">
        <motion.div
          className="about-story__copy"
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label">Our Story</div>
          <h2 className="display-heading">Rooted in <em>Odisha</em>, built for resilience</h2>
          <p>
            The Carp, Duck & Rice Livelihood Park is a field-based initiative that demonstrates
            how integrated farming can restore water bodies, reduce chemical dependency, and create
            dependable income streams for rural households.
          </p>
          <p>
            The park brings traditional knowledge and careful ecological design into one working
            landscape, where each species supports the next and every harvest strengthens the wider
            community.
          </p>
        </motion.div>

        <div className="about-story__values">
          {values.map((value, index) => (
            <motion.article
              className="about-story__value"
              key={value.title}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.12 }}
            >
              <span className="about-story__number">0{index + 1}</span>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .about-story {
          padding: var(--section-pad) 0;
          background: var(--cloud-white);
        }
        .about-story__layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 420px;
          gap: clamp(40px, 7vw, 90px);
          align-items: start;
        }
        .about-story__copy {
          max-width: 680px;
        }
        .about-story__copy p {
          font-size: 15px;
          line-height: 1.9;
          color: var(--text-light);
          margin-top: 22px;
        }
        .about-story__values {
          display: grid;
          gap: 10px;
        }
        .about-story__value {
          padding: 28px;
          border: 1px solid rgba(0,0,0,0.08);
          background: white;
        }
        .about-story__number {
          display: block;
          margin-bottom: 18px;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: var(--accent-teal);
        }
        .about-story__value h3 {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 300;
          color: var(--text-dark);
          margin-bottom: 10px;
        }
        .about-story__value p {
          font-size: 13px;
          line-height: 1.75;
          color: var(--text-light);
        }
        @media (max-width: 900px) {
          .about-story__layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
