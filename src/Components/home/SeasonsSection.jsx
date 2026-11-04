import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import LazyVideo from '../Common/LazyVideo'

const seasons = [
  {
    id: 'summer',
    name: 'Summer',
    months: 'March – May',
    sky: 'linear-gradient(135deg, #b86000 0%, #d35400 40%, #ff8f00 100%)',
    icon: '☀️',
    temperature: '28–42°C',
    livelihoodFocus: 'Harvest & Preparation',
    highlights: [
      { title: 'Sunrise Carp Fishing', activity: 'Peak pond visibility and early morning netting in community ponds.', emoji: '🐟' },
      { title: 'Mango Harvest Festival', activity: 'Gathering sweet local mangoes on the orchard edges.', emoji: '🥭' },
      { title: 'Clear Water Coracle Rides', activity: 'Eco-tourism and pond inspection under golden skies.', emoji: '🚣' },
      { title: 'Bird Nesting Season', activity: 'Observing breeding cycles around wetlands.', emoji: '🦉' }
    ]
  },
  {
    id: 'monsoon',
    name: 'Monsoon',
    months: 'June – September',
    sky: 'linear-gradient(135deg, #1e3c40 0%, #2a5a27 50%, #206a5d 100%)',
    icon: '🌧️',
    temperature: '22–32°C',
    livelihoodFocus: 'Growth & Regeneration',
    highlights: [
      { title: 'Rainwater Replenishment', activity: 'Stocking fish fingerlings in newly filled freshwater bodies.', emoji: '🌧️' },
      { title: 'Guava Sapling Planting', activity: 'Expanding orchards with high-yield varieties during rains.', emoji: '🌱' },
      { title: 'Nutrient Fodder Cultivation', activity: 'Growing organic grass on rejuvenated grazing lands.', emoji: '🌾' },
      { title: 'Silkworm Nurturing Cycle', activity: 'Feeding young silkworms fresh mulberry leaves indoors.', emoji: '🐛' }
    ]
  },
  {
    id: 'autumn',
    name: 'Autumn',
    months: 'October – November',
    sky: 'linear-gradient(135deg, #992c00 0%, #bf360c 50%, #d35400 100%)',
    icon: '🍂',
    temperature: '18–28°C',
    livelihoodFocus: 'Harvest & Enterprise',
    highlights: [
      { title: 'Golden Carp Harvest', activity: 'Catching mature fish as water levels stabilize.', emoji: '🐟' },
      { title: 'Peak Guava Gathering', activity: 'Harvesting ripe fruits from the AcreRise orchards.', emoji: '🍈' },
      { title: 'Goat Herd Grazing', activity: 'Outdoor grazing on high-altitude pastures.', emoji: '🐐' },
      { title: 'Tassar Silk Weaving', activity: 'Turning harvested cocoons into premium silk handlooms.', emoji: '🧶' }
    ]
  },
  {
    id: 'winter',
    name: 'Winter',
    months: 'December – February',
    sky: 'linear-gradient(135deg, #0d324d 0%, #134e6f 50%, #1d7a8c 100%)',
    icon: '❄️',
    temperature: '12–25°C',
    livelihoodFocus: 'Commerce & Prosperity',
    highlights: [
      { title: 'Community Fish Melas', activity: 'Organizing local seafood markets and sales festivals.', emoji: '🎪' },
      { title: 'Orchard Planning & Pruning', activity: 'Shading and pruning trees to prepare for the spring bloom.', emoji: '✂️' },
      { title: 'Livestock Marketing', activity: 'Selling healthy goats and poultry at winter fairs.', emoji: '🐐' },
      { title: 'Tassar Fashion Showcase', activity: 'Exhibiting artisan silk clothing at craft exhibitions.', emoji: '👗' }
    ]
  }
]

const programsData = [
  {
    id: 'pondy-fish',
    title: 'Pondy Fish',
    tag: 'Sustainable Fisheries',
    accent: '#4ecdc4',
    stat: '12,000+',
    statLabel: 'Fishers Supported',
    emoji: '🐟',
    video: '/videos/pondy-fish.mp4',
    desc: 'Reviving traditional aquaculture and restoring native coastal wetlands through community cooperatives.',
  },
  {
    id: 'guavas-acrerise',
    title: 'Guavas AcreRise',
    tag: 'Sustainable Agriculture',
    accent: '#a8e063',
    stat: '8,400',
    statLabel: 'Acres Cultivated',
    emoji: '🌿',
    video: '/videos/guavas.mp4',
    desc: 'Transforming smallholder farms into high-yield multi-layered food forests and sustainable fruit orchards.',
  },
  {
    id: 'easternghats-goat',
    title: 'Eastern Ghats Goats',
    tag: 'Livestock Farming',
    accent: '#f7b731',
    stat: '3,200',
    statLabel: 'Goats Raised',
    emoji: '🐐',
    video: '/videos/goats.mp4',
    desc: 'Securing critical tribal safety nets and income stability through scientific rotational livestock grazing.',
  },
  {
    id: 'tamarind-grove',
    title: 'Tamarind Grove',
    tag: 'Agroforestry',
    accent: '#e17055',
    stat: '5,600',
    statLabel: 'Trees Cultivated',
    emoji: '🌳',
    video: '/videos/tamarind-grove.mp4',
    desc: 'Building drought-resistant microclimates and establishing high-margin tribal processing hubs.',
  },
  {
    id: 'tassar-fashion',
    title: 'Tassar Fashion',
    tag: 'Rural Textiles & Fashion',
    accent: '#ff7675',
    stat: '1,500+',
    statLabel: 'Artisans Supported',
    emoji: '🧵',
    video: '/videos/tassar-fashion.mp4',
    desc: 'Empowering handloom weavers by scaling organic heritage silk crafts to premium international fashion markets.',
  },
  {
    id: 'mega-poultry',
    title: 'The Poultry Reserve',
    tag: 'Poultry Farming',
    accent: '#00cec9',
    stat: '2,200+',
    statLabel: 'Poultry Farms Setup',
    emoji: '🐣',
    video: '/videos/mega-poultry.mp4',
    desc: 'Securing secondary household cash flow and combating local malnutrition with high-productivity backyard coops.',
  },
  {
    id: 'tribey-coffee',
    title: 'Tribey Coffee',
    tag: 'Organic Shade Agriculture',
    accent: '#c09067',
    stat: '4,500+',
    statLabel: 'Farmers Engaged',
    emoji: '☕',
    video: '/videos/coffee.mp4',
    desc: 'Cultivating premium Arabica coffee under native forest canopies, ensuring sustainable tribal income and microclimate protection.',
  }
]

function ProgramShowcaseCard({ program }) {
  return (
    <div
      className="showcase-card"
      style={{ '--accent': program.accent }}
    >
      <div className="showcase-card__video-wrapper">
        <LazyVideo
          src={program.video}
          className="showcase-card__video"
        />
        <div className="showcase-card__video-overlay" />
      </div>
      <div className="showcase-card__content">
        <div className="showcase-card__header">
          <span className="showcase-card__emoji">{program.emoji}</span>
          <span className="showcase-card__tag">{program.tag}</span>
        </div>
        <h4 className="showcase-card__title">{program.title}</h4>
        <p className="showcase-card__desc">{program.desc}</p>
        <div className="showcase-card__footer">
          <div className="showcase-card__stat">
            <span className="showcase-card__stat-val">{program.stat}</span>
            <span className="showcase-card__stat-label">{program.statLabel}</span>
          </div>
          <Link to={`/programs/${program.id}`} className="showcase-card__link">
            Explore <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function SeasonsSection() {
  const [active, setActive] = useState(0) // Summer default
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const current = seasons[active]

  return (
    <section className="seasons" ref={ref}>
      {/* Animated sky background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="seasons__sky"
          style={{ background: current.sky }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0 }}
        />
      </AnimatePresence>

      <div className="container">
        {/* Header */}
        <motion.div
          className="seasons__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <span style={{ background: 'rgba(255,255,255,0.4)', display: 'block', width: 32, height: 1 }} />
            SEASONAL GUIDE
          </div>
          <h2 className="display-heading" style={{ color: 'white' }}>
            Every Season <em style={{ fontStyle: 'italic', color: '#ffb300' }}>Brings New Opportunities</em>
          </h2>
        </motion.div>

        {/* Seasonal Interactive Guide Row */}
        <div className="seasons__grid-layout">
          {/* Left Column: 4 Season Selection Cards */}
          <div className="seasons__selector-column">
            {seasons.map((s, i) => (
              <motion.button
                key={s.id}
                className={`seasons__vertical-card ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.2 }}
                whileHover={{ scale: 1.02, x: 4 }}
              >
                <div className="vertical-card__accent" style={{ background: s.sky }} />
                <span className="vertical-card__icon">{s.icon}</span>
                <div className="vertical-card__text">
                  <span className="vertical-card__name">{s.name}</span>
                  <span className="vertical-card__months">{s.months}</span>
                </div>
                <div className="vertical-card__indicator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right Column: Selected Season Details (Metrics & Highlights) */}
          <div className="seasons__details-column">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="seasons__details-panel"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Header info */}
                <h3 className="details-panel__title">
                  {current.name} Livelihoods
                </h3>

                {/* Metrics bar */}
                <div className="details-panel__metrics">
                  <div className="metric-box">
                    <span className="metric-box__icon">🌡️</span>
                    <div className="metric-box__info">
                      <span className="metric-box__label">Temperature Range</span>
                      <span className="metric-box__val">{current.temperature}</span>
                    </div>
                  </div>
                  <div className="metric-box">
                    <span className="metric-box__icon">💼</span>
                    <div className="metric-box__info">
                      <span className="metric-box__label">Livelihood Focus</span>
                      <span className="metric-box__val">{current.livelihoodFocus}</span>
                    </div>
                  </div>
                </div>

                {/* Highlights grid */}
                <h4 className="details-panel__highlights-title">Seasonal Highlights</h4>
                <div className="seasons__highlights-grid">
                  {current.highlights.map((h, idx) => (
                    <motion.div
                      key={h.title}
                      className="highlight-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -3, scale: 1.02 }}
                    >
                      <div className="highlight-card__header">
                        <span className="highlight-card__emoji">{h.emoji}</span>
                        <h5 className="highlight-card__title">{h.title}</h5>
                      </div>
                      <p className="highlight-card__desc">{h.activity}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      <style>{`
        .seasons {
          position: relative;
          padding: var(--section-pad) 0;
          overflow: hidden;
          min-height: 100vh;
        }
        .seasons__sky {
          position: absolute;
          inset: 0;
          z-index: 0;
          transition: background 1.0s ease;
        }
        .seasons__sky::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.18);
        }
        .seasons > .container { position: relative; z-index: 1; }
        .seasons__header { margin-bottom: 50px; }

        /* Two Column Layout */
        .seasons__grid-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
          align-items: start;
        }

        /* Left Column: Vertical Selectors */
        .seasons__selector-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .seasons__vertical-card {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.65);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 12px;
          text-align: left;
        }
        .seasons__vertical-card:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.18);
          color: white;
        }
        .seasons__vertical-card.active {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.35);
          color: white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .vertical-card__accent {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .seasons__vertical-card.active .vertical-card__accent {
          opacity: 1;
        }
        .vertical-card__icon {
          font-size: 28px;
          line-height: 1;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .seasons__vertical-card:hover .vertical-card__icon {
          transform: scale(1.1);
        }
        .vertical-card__text {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .vertical-card__name {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 400;
          color: white;
        }
        .vertical-card__months {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.5;
          margin-top: 2px;
        }
        .vertical-card__indicator {
          color: rgba(255,255,255,0.25);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        .seasons__vertical-card.active .vertical-card__indicator {
          color: #ffb300;
          transform: translateX(4px);
        }

        /* Right Column: Details Panel */
        .seasons__details-column {
          width: 100%;
        }
        .seasons__details-panel {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 40px;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        .details-panel__title {
          font-family: var(--font-display);
          font-size: clamp(24px, 3.5vw, 32px);
          color: white;
          margin-bottom: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
          font-weight: 300;
        }
        .details-panel__metrics {
          display: flex;
          gap: 24px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .metric-box {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 16px 20px;
          flex: 1;
          min-width: 200px;
        }
        .metric-box__icon {
          font-size: 24px;
        }
        .metric-box__info {
          display: flex;
          flex-direction: column;
        }
        .metric-box__label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: 4px;
          font-weight: 600;
        }
        .metric-box__val {
          font-size: 15px;
          color: white;
          font-weight: 500;
        }
        .details-panel__highlights-title {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #ffb300;
          margin-bottom: 20px;
          font-weight: 700;
        }
        .seasons__highlights-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .highlight-card {
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .highlight-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .highlight-card__header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .highlight-card__emoji {
          font-size: 20px;
        }
        .highlight-card__title {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 600;
          color: white;
        }
        .highlight-card__desc {
          font-size: 12.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 300;
          margin: 0;
        }

        /* Horizontal Divider */
        .seasons__divider-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin: 80px 0 70px 0;
        }
        .seasons__divider-section .divider-line {
          height: 1px;
          flex-grow: 1;
        }
        .seasons__divider-section .divider-line.left {
          background: linear-gradient(to right, rgba(255,255,255,0), rgba(212, 172, 13, 0.35));
        }
        .seasons__divider-section .divider-line.right {
          background: linear-gradient(to left, rgba(255,255,255,0), rgba(212, 172, 13, 0.35));
        }
        .seasons__divider-section .divider-icon {
          color: #ffb300;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 0 8px rgba(212,172,13,0.35));
        }

        /* Program Showcase Section */
        .seasons__showcase-section {
          position: relative;
          z-index: 1;
          margin-top: 12px;
        }
        .showcase-section__header {
          text-align: center;
          margin-bottom: 42px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .showcase-section__eyebrow {
          font-size: 10px;
          letter-spacing: 0.35em;
          color: #ffb300;
          font-weight: 700;
          display: block;
          margin-bottom: 12px;
        }
        .showcase-section__title {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 44px);
          color: white;
          margin-bottom: 16px;
          font-weight: 300;
          letter-spacing: -0.01em;
        }
        .showcase-section__subtitle {
          font-size: 14.5px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
          font-weight: 300;
        }

        /* Showcase Grid */
        .seasons__showcase-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 20px;
          align-items: stretch;
        }

        /* Program Card */
        .showcase-card {
          position: relative;
          min-height: 340px;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.14);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: pointer;
          box-shadow: none;
          isolation: isolate;
        }
        .showcase-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
        }
        .showcase-card__video-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .showcase-card__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
          transform: scale(1.01);
          transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.7s ease;
          pointer-events: none;
        }
        .showcase-card:hover .showcase-card__video {
          transform: scale(1.06);
          filter: saturate(1.08) contrast(1.05);
        }
        .showcase-card__video-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.14) 46%, rgba(0, 0, 0, 0.08) 100%),
            linear-gradient(to right, rgba(0, 0, 0, 0.14), transparent 58%);
          z-index: 1;
        }
        .showcase-card__content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100%;
          justify-content: flex-end;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.65);
        }
        .showcase-card__header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .showcase-card__emoji {
          font-size: 20px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
        }
        .showcase-card__tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .showcase-card__title {
          font-family: var(--font-display);
          font-size: 22px;
          color: white;
          margin-bottom: 10px;
          font-weight: 400;
          text-wrap: balance;
        }
        .showcase-card__desc {
          font-size: 13px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.86);
          font-weight: 300;
          margin: 0 0 20px 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          transition: color 0.3s;
        }
        .showcase-card:hover .showcase-card__desc {
          color: rgba(255, 255, 255, 0.96);
        }
        .showcase-card__footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
          padding-top: 15px;
          margin-top: auto;
        }
        .showcase-card__stat {
          display: flex;
          flex-direction: column;
        }
        .showcase-card__stat-val {
          font-size: 16px;
          font-weight: 700;
          color: var(--accent);
          line-height: 1.2;
        }
        .showcase-card__stat-label {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }
        .showcase-card__link {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.3s;
          pointer-events: auto;
        }
        .showcase-card:hover .showcase-card__link {
          color: var(--accent);
        }
        .showcase-card__link span {
          transition: transform 0.3s;
        }
        .showcase-card:hover .showcase-card__link span {
          transform: translateX(4px);
        }

        /* Responsiveness */
        @media (max-width: 1100px) {
          .seasons__showcase-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
        }
        @media (max-width: 960px) {
          .seasons__grid-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .seasons__selector-column {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
          }
          .seasons__vertical-card {
            flex: 1 1 200px;
            min-width: 160px;
          }
          .seasons {
            min-height: auto;
          }
        }
        @media (max-width: 680px) {
          .seasons__showcase-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .showcase-card {
            min-height: 320px;
            padding: 24px;
          }
          .seasons__details-panel {
            padding: 24px;
          }
          .seasons__highlights-grid {
            grid-template-columns: 1fr;
          }
          .details-panel__metrics {
            flex-direction: column;
            gap: 16px;
          }
          .seasons__selector-column {
            flex-direction: column;
            width: 100%;
          }
          .seasons__vertical-card {
            width: 100%;
          }
          .seasons__divider-section {
            margin: 50px 0 40px 0;
          }
        }
      `}</style>
    </section>
  )
}
