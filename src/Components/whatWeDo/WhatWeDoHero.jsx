import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WhatWeDoHero() {
  const [activePillar, setActivePillar] = useState(null)
  const [season, setSeason] = useState('monsoon')

  const pillars = [
    { id: 'demo', label: '🌾 Demonstration', desc: 'Observe the symbiosis live in working carp ponds, duck ranges, and organic rice fields.' },
    { id: 'train', label: '🎓 Training', desc: 'Practical field training in pond preparation, biological duck feeding, and seasonal harvest planning.' },
    { id: 'restore', label: '🌱 Restoration', desc: 'Rehabilitating field edges and water bodies using native plantings and clean irrigation designs.' },
    { id: 'market', label: '🤝 Market Linkages', desc: 'Empowering local community enterprises by linking poultry and grain directly to high-value markets.' }
  ]

  const seasons = [
    {
      id: 'monsoon',
      label: '🌧️ Monsoon',
      period: 'July - October',
      color: '#74e6ac',
      bg: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(5,28,24,0.72) 100%)',
      tasks: [
        'Sowing traditional Kalajeera rice seeds',
        'Releasing young Indian Runner ducks in fields',
        'Stocking Mirror & Silver Carp fingerlings'
      ]
    },
    {
      id: 'winter',
      label: '❄️ Winter',
      period: 'November - February',
      color: '#f3c969',
      bg: 'linear-gradient(180deg, rgba(243,201,105,0.08) 0%, rgba(26,16,5,0.78) 100%)',
      tasks: [
        'Duck foraging and natural planthopper control',
        'Carp weed clearing and water oxygenation',
        'First community harvest & egg packaging'
      ]
    },
    {
      id: 'summer',
      label: '☀️ Summer',
      period: 'March - June',
      color: '#ff8a7a',
      bg: 'linear-gradient(180deg, rgba(255,138,122,0.08) 0%, rgba(20,10,12,0.82) 100%)',
      tasks: [
        'Large-scale rice harvesting & milling',
        'Fish nursery cleaning & pond desilting',
        'Field restoration and soil aeration'
      ]
    }
  ]

  const activeSeason = seasons.find(s => s.id === season) || seasons[0]

  const handlePillarClick = (id) => {
    setActivePillar(activePillar === id ? null : id)
    const el = document.querySelector('.work-areas')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="what-hero">
      <div className="what-hero__bg">
        <video
          src="/12339388_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="what-hero__overlay" style={{ background: activeSeason.bg }} />
      
      <div className="container what-hero__content-wrapper">
        <motion.div
          className="what-hero__content-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.62)' }}>
            <span style={{ background: 'rgba(255,255,255,0.35)', display: 'block', width: 32, height: 1 }} />
            What We Do
          </div>
          <h1 className="what-hero__title">Integrated Farming, <br /><em>Real</em> Livelihoods</h1>
          
          <div className="what-hero__sub-wrapper">
            <AnimatePresence mode="wait">
              <motion.p 
                key={activePillar ? activePillar : 'default'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="what-hero__sub"
              >
                {activePillar 
                  ? pillars.find(p => p.id === activePillar).desc 
                  : "We combine demonstration, training, restoration, and community enterprise so the CDR model can travel beyond the park."
                }
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Pillar Navigator */}
          <div className="what-hero__pillars">
            {pillars.map((p) => (
              <button
                key={p.id}
                className={`pillar-pill ${activePillar === p.id ? 'is-active' : ''}`}
                onClick={() => handlePillarClick(p.id)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Floating Season Tracker Widget */}
        <motion.div
          className="what-hero__content-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="season-card">
            <div className="season-card__header">
              <h4>Seasonal Operations</h4>
              <span className="season-period">{activeSeason.period}</span>
            </div>
            
            <div className="season-card__tabs">
              {seasons.map((s) => (
                <button
                  key={s.id}
                  className={`season-tab ${season === s.id ? 'is-active' : ''}`}
                  style={{ '--season-color': s.color }}
                  onClick={() => setSeason(s.id)}
                >
                  {s.label.split(' ')[1]}
                </button>
              ))}
            </div>

            <div className="season-card__divider" />

            <div className="season-card__body">
              <div className="operations-label">Active Field Tasks:</div>
              <ul className="operations-list">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={season}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeSeason.tasks.map((task, idx) => (
                      <li key={idx} style={{ '--accent': activeSeason.color }}>
                        <span className="bullet">✦</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div 
        className="what-hero__scroll"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1.2 }}
      >
        <div className="what-hero__scroll-line">
          <motion.div 
            className="what-hero__scroll-dot"
            animate={{ y: [0, 18, 0] }} 
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <style>{`
        .what-hero {
          position: relative;
          height: 100vh;
          min-height: 650px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .what-hero__bg,
        .what-hero__overlay {
          position: absolute;
          inset: 0;
        }
        .what-hero__bg video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
        .what-hero__overlay {
          transition: background 0.8s ease;
        }
        .what-hero__content-wrapper {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
          padding: 0 24px;
          width: 100%;
        }
        .what-hero__content-left {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .what-hero__title {
          font-family: var(--font-display);
          font-size: clamp(3.2rem, 7vw, 6.2rem);
          font-weight: 300;
          line-height: 1.05;
          margin-top: 18px;
          letter-spacing: -0.02em;
          color: white;
        }
        .what-hero__title em {
          color: var(--accent-gold, #c8a000);
          font-style: italic;
        }
        .what-hero__sub-wrapper {
          min-height: 72px;
          display: flex;
          align-items: center;
          margin-top: 22px;
        }
        .what-hero__sub {
          font-size: clamp(14px, 1.5vw, 16.5px);
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.76);
          letter-spacing: 0.03em;
          margin: 0;
        }
        .what-hero__pillars {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 32px;
        }
        .pillar-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          padding: 8px 16px;
          border-radius: 99px;
          font-size: 12.5px;
          letter-spacing: 0.02em;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }
        .pillar-pill:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.25);
          color: white;
          transform: translateY(-2px);
        }
        .pillar-pill.is-active {
          background: var(--accent-gold, #c8a000);
          border-color: var(--accent-gold, #c8a000);
          color: #0b0f14;
          font-weight: 500;
          box-shadow: 0 0 15px rgba(200, 160, 0, 0.4);
        }

        /* Season Card Styling */
        .season-card {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          padding: 28px 24px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
          width: 100%;
          max-width: 380px;
          margin-left: auto;
        }
        .season-card__header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .season-card__header h4 {
          margin: 0;
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 400;
          color: white;
          letter-spacing: 0.02em;
        }
        .season-card__header .season-period {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .season-card__tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          padding: 4px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .season-tab {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.5);
          padding: 8px 0;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.3s;
          text-align: center;
        }
        .season-tab:hover {
          color: white;
        }
        .season-tab.is-active {
          background: rgba(255, 255, 255, 0.08);
          color: var(--season-color) !important;
          text-shadow: 0 0 8px var(--season-color);
        }
        .season-card__divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.07);
          margin: 20px 0;
        }
        .season-card__body {
          text-align: left;
        }
        .operations-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 14px;
          font-weight: bold;
        }
        .operations-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .operations-list li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.85);
        }
        .operations-list li .bullet {
          color: var(--accent);
          flex-shrink: 0;
          font-size: 12px;
          margin-top: 1px;
        }

        /* Scroll Cue Styling */
        .what-hero__scroll {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
        .what-hero__scroll-line {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.25);
          position: relative;
          overflow: hidden;
        }
        .what-hero__scroll-dot {
          position: absolute;
          top: 0;
          left: -2px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-gold, #c8a000);
        }

        @media (max-width: 900px) {
          .what-hero {
            height: auto;
            padding: 130px 0 100px;
          }
          .what-hero__content-wrapper {
            grid-template-columns: 1fr;
            gap: 48px;
            text-align: center;
          }
          .what-hero__content-left {
            align-items: center;
            text-align: center;
          }
          .what-hero__pillars {
            justify-content: center;
          }
          .season-card {
            margin: 0 auto;
          }
          .what-hero__sub-wrapper {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  )
}
