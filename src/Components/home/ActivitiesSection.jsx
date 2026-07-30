import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const activities = [
  {
    id: 'fishing',
    label: 'Carp Fishing',
    tagline: 'Cast into calm waters',
    desc: 'Experience traditional carp fishing using hand-crafted bamboo rods. Learn age-old techniques from local fishermen as the morning mist lifts off the pond.',
    duration: '2–4 hours',
    group: 'Up to 8 guests',
    season: 'All year',
    emoji: '🎣',
    highlights: ['Bamboo rod fishing', 'Learn net casting', 'Cook your catch', 'Sunrise session available'],
  },
  {
    id: 'duck',
    label: 'Duck Herding',
    tagline: 'Walk with the flock',
    desc: 'Join the farmers at dawn as they guide the duck flock between rice paddies and pond. A meditative, deeply rural experience unlike anything in the modern world.',
    duration: '1–2 hours',
    group: 'Up to 12 guests',
    season: 'All year',
    emoji: '🦆',
    highlights: ['Dawn herding ritual', 'Duck egg collection', 'Feed the ducklings', 'Photography opportunity'],
  },
  {
    id: 'rice',
    label: 'Rice Planting',
    tagline: 'Hands in the earth',
    desc: 'Participate in traditional paddy transplanting during the monsoon season. Wade through warm water, push young seedlings into rich soil, and connect with 10,000 years of cultivation.',
    duration: '3–5 hours',
    group: 'Up to 20 guests',
    season: 'Jun–Aug',
    emoji: '🌾',
    highlights: ['Paddy transplanting', 'Harvest experience', 'Traditional tools', 'Farmer family meals'],
  },
  {
    id: 'birdwatch',
    label: 'Bird Watching',
    tagline: 'Wings over still water',
    desc: 'The park attracts over 60 bird species throughout the year. Dawn and dusk sessions with trained naturalist guides reveal herons, kingfishers, lapwings, and rare migratory visitors.',
    duration: '2–3 hours',
    group: 'Up to 6 guests',
    season: 'Oct–Mar best',
    emoji: '🔭',
    highlights: ['60+ bird species', 'Naturalist guide', 'Binoculars provided', 'Species checklist'],
  },
  {
    id: 'boat',
    label: 'Coracle Ride',
    tagline: 'Float on ancient waters',
    desc: 'Board a traditional coracle — a round woven bamboo boat — and drift silently across the pond. Watch carp beneath the surface and ducks glide past in the golden hour light.',
    duration: '45 min',
    group: 'Up to 3 per boat',
    season: 'All year',
    emoji: '🛶',
    highlights: ['Traditional coracle', 'Silent drift', 'Fish viewing below', 'Sunset option'],
  },
  {
    id: 'workshop',
    label: 'Eco Workshop',
    tagline: 'Learn the living loop',
    desc: 'An immersive educational session on integrated farming. Ideal for students, researchers, and curious travellers wanting to understand how carp, ducks, and rice sustain 150+ families.',
    duration: '3 hours',
    group: 'Up to 30 guests',
    season: 'All year',
    emoji: '📚',
    highlights: ['Expert-led session', 'Field demonstration', 'Certificate issued', 'School programs available'],
  },
]

export default function ActivitiesSection() {
  const [active, setActive] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="activities" id="activities" ref={ref}>
      <div className="activities__bg" />

      <div className="container">
        <motion.div
          className="activities__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="section-label">Experiences</div>
          <h2 className="display-heading">
            Ways to <em>Live</em> the Park
          </h2>
        </motion.div>

        <div className="activities__layout">
          {/* Tab list */}
          <motion.div
            className="activities__tabs"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {activities.map((act, i) => (
              <button
                key={act.id}
                className={`activities__tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="activities__tab-emoji">{act.emoji}</span>
                <span className="activities__tab-label">{act.label}</span>
                <svg className="activities__tab-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </button>
            ))}
          </motion.div>

          {/* Content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="activities__panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="activities__panel-icon">{activities[active].emoji}</div>
              <div className="activities__panel-sub">{activities[active].tagline}</div>
              <h3 className="activities__panel-title">{activities[active].label}</h3>
              <p className="activities__panel-desc">{activities[active].desc}</p>

              <div className="activities__meta">
                {[
                  { icon: '⏱', label: 'Duration', val: activities[active].duration },
                  { icon: '👥', label: 'Group size', val: activities[active].group },
                  { icon: '🗓', label: 'Best season', val: activities[active].season },
                ].map(m => (
                  <div key={m.label} className="activities__meta-item">
                    <span className="activities__meta-icon">{m.icon}</span>
                    <div>
                      <div className="activities__meta-label">{m.label}</div>
                      <div className="activities__meta-val">{m.val}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="activities__highlights">
                {activities[active].highlights.map(h => (
                  <div key={h} className="activities__highlight">
                    <span className="activities__highlight-dot" />
                    {h}
                  </div>
                ))}
              </div>

              <a href="/contact" className="btn-primary" style={{ marginTop: '28px', display: 'inline-flex' }}>
                <span>Book This Experience</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .activities {
          padding: var(--section-pad) 0;
          position: relative;
          overflow: hidden;
        }
        .activities__bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1a4b6d 0%, #1e8449 100%);
          opacity: 0.96;
        }
        .activities__bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .activities__header {
          max-width: 540px;
          margin-bottom: 60px;
        }
        .activities__header .display-heading { color: var(--cloud-white); }
        .activities__header .display-heading em { color: var(--accent-gold); }
        .activities__header .section-label { color: rgba(255,255,255,0.5); }
        .activities__header .section-label::before { background: rgba(255,255,255,0.3); }
        .activities__layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 60px;
          align-items: start;
        }
        .activities__tabs {
  position: relative;
  z-index: 999;
}
   .activities__tab {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 20px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  color: rgba(255,255,255,0.95);
  font-family: var(--font-body);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-align: left;
  transition: all 0.35s var(--ease-cinematic);
  cursor: pointer;
}
        }
        .activities__tab:hover,
        .activities__tab.active {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.2);
          color: var(--cloud-white);
        }
        .activities__tab.active {
          border-left: 3px solid var(--accent-gold);
        }
        .activities__tab-emoji { font-size: 22px;
  color: var(--accent-gold);
  font-family: var(--font-display);
  min-width: 32px;}
        .activities__tab-label { flex: 1; }
        .activities__tab-arrow {
  opacity: 0.8;
  transform: translateX(0);
  transition: all 0.3s;
}
}
        }
        .activities__tab:hover .activities__tab-arrow,
        .activities__tab.active .activities__tab-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .activities__panel {
          padding: 48px 52px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          min-height: 500px;
        }
        .activities__panel-icon {
           font-size: 72px;
  color: var(--accent-gold);
  font-family: var(--font-display);
  margin-bottom: 20px;
  display: block;
        }
        .activities__panel-sub {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--accent-gold);
          margin-bottom: 8px;
        }
        .activities__panel-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 300;
          color: var(--cloud-white);
          margin-bottom: 20px;
        }
        .activities__panel-desc {
          font-size: 14px;
          line-height: 1.8;
          color: rgba(255,255,255,0.65);
          margin-bottom: 32px;
          max-width: 520px;
        }
        .activities__meta {
          display: flex;
          gap: 32px;
          margin-bottom: 28px;
          padding: 24px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .activities__meta-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .activities__meta-icon { font-size: 18px; margin-top: 2px; }
        .activities__meta-label {
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 4px;
        }
        .activities__meta-val {
          font-size: 13px;
          color: rgba(255,255,255,0.8);
        }
        .activities__highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 24px;
        }
        .activities__highlight {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12.5px;
          color: rgba(255,255,255,0.6);
        }
        .activities__highlight-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-gold);
          flex-shrink: 0;
        }
        @media (max-width: 1000px) {
          .activities__layout { grid-template-columns: 1fr; }
          .activities__tabs { flex-direction: row; flex-wrap: wrap; }
         .activities__tab-label {
  flex: 1;
  color: #ffffff;
  opacity: 1;
  font-weight: 500;
} }
        }
        @media (max-width: 600px) {
          .activities__panel { padding: 28px 24px; }
          .activities__meta { flex-direction: column; gap: 16px; }
          .activities__highlights { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}