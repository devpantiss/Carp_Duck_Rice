import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────
   PAGE HERO — cinematic park banner with
   parallax photo background
   ───────────────────────────────────────────── */
function ParkHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section className="park-hero" ref={ref}>
      <motion.div className="park-hero__bg" style={{ y: bgY }}>
        <motion.img
          src="/park_hero.png"
          alt="Carp Duck Rice Park landscape"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.0, ease: 'easeOut' }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </motion.div>

      <div className="park-hero__overlay"/>

      <motion.div className="park-hero__text container" style={{ y: textY, opacity }}>
        <motion.div className="park-hero__eyebrow"
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}>
          <span className="park-hero__eyebrow-line"/>
          <span>Bhubaneswar, Odisha · India</span>
          <span className="park-hero__eyebrow-line"/>
        </motion.div>
        <motion.h1 className="park-hero__title"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.0, ease: [0.25,0.46,0.45,0.94] }}>
          The <em>Park</em>
        </motion.h1>
        <motion.p className="park-hero__sub"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}>
          An integrated 40-acre living system where carp, duck, rice, livestock, agroforestry, and heritage weaving sustain 150+ families
        </motion.p>
      </motion.div>

      <motion.div className="park-hero__scroll"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        <div className="park-hero__scroll-line">
          <motion.div className="park-hero__scroll-dot"
            animate={{ y: [0, 18, 0] }} transition={{ duration: 1.8, repeat: Infinity }}/>
        </div>
      </motion.div>

      <style>{`
        .park-hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--text-dark);
        }
        .park-hero__bg {
          position: absolute;
          inset: 0;
          will-change: transform;
          z-index: 0;
        }
        .park-hero__overlay {
          position: absolute; inset: 0;
          background: 
            radial-gradient(circle at center, rgba(26, 37, 47, 0.25) 0%, rgba(26, 37, 47, 0.7) 100%),
            linear-gradient(180deg, rgba(26, 82, 118, 0.15) 0%, rgba(0,0,0,0.4) 50%, rgba(26, 37, 47, 0.9) 100%);
          z-index: 1;
        }
        .park-hero__text {
          position: relative; z-index: 2;
          text-align: center; color: white;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
        }
        .park-hero__eyebrow {
          display: flex; align-items: center; gap: 16px;
          justify-content: center;
          font-size: 10px; letter-spacing: 0.35em;
          text-transform: uppercase; color: rgba(255,255,255,0.7);
          margin-bottom: 24px;
        }
        .park-hero__eyebrow-line {
          display: block; width: 36px; height: 1px;
          background: rgba(255,255,255,0.4);
        }
        .park-hero__title {
          font-family: var(--font-display);
          font-size: clamp(4rem, 10vw, 9rem);
          font-weight: 300; line-height: 1;
          letter-spacing: -0.03em; margin-bottom: 20px;
        }
        .park-hero__title em { color: var(--accent-gold); font-style: italic; }
        .park-hero__sub {
          font-size: clamp(12px, 1.6vw, 16px); font-weight: 300;
          letter-spacing: 0.1em; color: rgba(255,255,255,0.75);
          max-width: 550px; margin: 0 auto; line-height: 1.6;
        }
        .park-hero__scroll {
          position: absolute; bottom: 40px; left: 50%;
          transform: translateX(-50%); z-index: 2;
        }
        .park-hero__scroll-line {
          width: 1px; height: 44px;
          background: rgba(255,255,255,0.25);
          position: relative; overflow: hidden;
        }
        .park-hero__scroll-dot {
          position: absolute; top: 0; left: -2px;
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--accent-gold);
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PARK OVERVIEW — key facts grid
   ───────────────────────────────────────────── */
const overviewCards = [
  { icon: '🗺️', label: 'Land Scale', value: '40 Acres', detail: 'Integrated ecological zones' },
  { icon: '🧬', label: 'Enterprises', value: '7 Programs', detail: 'Polyculture loop in action' },
  { icon: '👨‍👩‍👧', label: 'Livelihoods', value: '150+ Families', detail: 'Direct employment & wealth' },
  { icon: '🌾', label: 'Biodiversity', value: '40+ Species', detail: 'Heirloom crops, fish & animals' },
  { icon: '♻️', label: 'Waste Cycle', value: 'Zero Waste', detail: 'Closed-loop organic system' },
  { icon: '📅', label: 'Established', value: '2024', detail: 'Bhubaneswar, Odisha' },
]

function OverviewSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section className="park-overview" ref={ref}>
      <div className="container">
        <motion.div className="park-overview__header"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <div className="section-label">At a Glance</div>
          <h2 className="display-heading">The Park <em>in Numbers</em></h2>
          <p className="park-overview__desc">
            Spread across 40 acres of living land in Odisha, every program is integrated physically and ecologically. Waste from one system acts as a fuel for the next, scaling yields and restoring soil health.
          </p>
        </motion.div>
        <div className="park-overview__grid">
          {overviewCards.map((card, i) => (
            <motion.div key={card.label} className="park-overview__card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -6 }}>
              <div className="park-overview__card-icon">{card.icon}</div>
              <div className="park-overview__card-value">{card.value}</div>
              <div className="park-overview__card-label">{card.label}</div>
              <div className="park-overview__card-detail">{card.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .park-overview {
          padding: var(--section-pad) 0;
          background: var(--cloud-white);
        }
        .park-overview__header { max-width: 640px; margin-bottom: 64px; }
        .park-overview__desc {
          font-size: 15px; line-height: 1.8;
          color: var(--text-light); margin-top: 20px; max-width: 520px;
        }
        .park-overview__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .park-overview__card {
          padding: 40px 32px;
          border: 1px solid rgba(0,0,0,0.07);
          background: var(--cloud-white);
          transition: box-shadow 0.4s var(--ease-cinematic);
          position: relative; overflow: hidden;
        }
        .park-overview__card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--accent-gold), var(--duck-teal));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s var(--ease-cinematic);
        }
        .park-overview__card:hover::before { transform: scaleX(1); }
        .park-overview__card:hover { box-shadow: 0 20px 50px rgba(0,0,0,0.09); }
        .park-overview__card-icon { font-size: 32px; margin-bottom: 20px; }
        .park-overview__card-value {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 300; color: var(--water-dark);
          line-height: 1; margin-bottom: 8px;
        }
        .park-overview__card-label {
          font-size: 10px; font-weight: 600;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--text-dark); margin-bottom: 6px;
        }
        .park-overview__card-detail {
          font-size: 12.5px; color: var(--text-light);
        }
        @media (max-width: 900px) { .park-overview__grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 560px) { .park-overview__grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────
   THE 7 PROGRAMS — core integrated initiatives
   ───────────────────────────────────────────── */
const parkPrograms = [
  {
    id: 'pondy-fish',
    title: 'Pondy Fish',
    subtitle: 'Sustainable Aquaculture',
    metric: '12,000+ Fishers Supported',
    emoji: '🐟',
    desc: 'Revitalizing inland water bodies using traditional multi-layer polyculture, establishing women-led local cooperatives, and securing fair trade market linkages.',
    color: '#0288d1',
    bg: '#e3f2fd'
  },
  {
    id: 'guavas-acrerise',
    title: 'Guavas AcreRise',
    subtitle: 'Multilayer Food Forests',
    metric: '8,400 Acres Cultivated',
    emoji: '🌿',
    desc: 'Transitioning monoculture land into resilient, multi-layered food forests. Guava trees are grown alongside essential spice crops like turmeric and ginger.',
    color: '#388e3c',
    bg: '#e8f8f5'
  },
  {
    id: 'easternghats-goat',
    title: 'Eastern Ghat Goats',
    subtitle: 'Silvopastoral Livestock',
    metric: '3,200 Goats Reared',
    emoji: '🐐',
    desc: 'Supporting tribal communities with veterinary networks and controlled rotational grazing schedules that protect forest boundaries from soil compaction.',
    color: '#d97706',
    bg: '#fff8e1'
  },
  {
    id: 'tamarind-grove',
    title: 'Tamarind Grove',
    subtitle: 'Dryland Agroforestry',
    metric: '5,600 Trees Managed',
    emoji: '🌳',
    desc: 'Utilizing drought-tolerant windbreaks that shield vulnerable crops, alongside solar-powered community processing units for high-margin packaging.',
    color: '#e17055',
    bg: '#fbe9e7'
  },
  {
    id: 'tassar-fashion',
    title: 'Tassar Fashion',
    subtitle: 'Heritage Silk Handlooms',
    metric: '1,500+ Weavers & Spinners',
    emoji: '🧵',
    desc: 'Scaling heritage silk cocoon harvesting and traditional ikat handloom weaving into premium apparel collections, empowering women self-help groups.',
    color: '#ff7675',
    bg: '#fce4ec'
  },
  {
    id: 'mega-poultry',
    title: 'The Poultry Reserve',
    subtitle: 'Backyard Micro-Enterprises',
    metric: '2,200+ Backyard Farms',
    emoji: '🐣',
    desc: 'Providing predator-proof housing and veterinary support, allowing landless families to earn stable daily income from organic egg sales.',
    color: '#00cec9',
    bg: '#e0f7fa'
  },
  {
    id: 'tribey-coffee',
    title: 'Tribey Coffee',
    subtitle: 'Organic Shade Agriculture',
    metric: '4,500+ Farmers Engaged',
    emoji: '☕',
    desc: 'Cultivating high-altitude Arabica coffee under diverse forest canopies, providing sustainable livelihoods to tribal communities while preserving local biodiversity.',
    color: '#c09067',
    bg: '#efebe9'
  }
]

function ProgramsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section className="park-programs" ref={ref} id="programs">
      <div className="container">
        <motion.div className="park-programs__header"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <div className="section-label">Ecosystem Pillars</div>
          <h2 className="display-heading">Our 7 <em>Integrated Programs</em></h2>
          <p className="park-programs__desc">
            The park is organized into 7 core agro-ecological enterprises. Each represents a physical zone and a community program designed to scale local wealth and preserve nature.
          </p>
        </motion.div>
        <div className="park-programs__grid">
          {parkPrograms.map((prog, i) => (
            <motion.div key={prog.id} className="park-programs__card"
              style={{ '--p-color': prog.color, '--p-bg': prog.bg }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ y: -8 }}>
              <div className="park-programs__card-header">
                <span className="park-programs__card-emoji">{prog.emoji}</span>
                <span className="park-programs__card-metric">{prog.metric}</span>
              </div>
              <div className="park-programs__card-body">
                <div className="park-programs__card-sub">{prog.subtitle}</div>
                <h3 className="park-programs__card-title">{prog.title}</h3>
                <p className="park-programs__card-desc">{prog.desc}</p>
              </div>
              <Link to={`/programs/${prog.id}`} className="park-programs__card-link">
                <span>Explore Program</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .park-programs {
          padding: var(--section-pad) 0;
          background: radial-gradient(circle at 50% -10%, #f5fafb 0%, #e3ecf4 100%);
          border-top: 1px solid rgba(0,0,0,0.05);
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .park-programs__header { max-width: 640px; margin-bottom: 64px; }
        .park-programs__desc {
          font-size: 15px; line-height: 1.8;
          color: var(--text-light); margin-top: 20px; max-width: 520px;
        }
        .park-programs__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .park-programs__card {
          padding: 36px 30px;
          background: white;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 380px;
          transition: all 0.4s var(--ease-cinematic);
          position: relative;
        }
        .park-programs__card:hover {
          box-shadow: 0 20px 45px rgba(0,0,0,0.08), 0 0 15px var(--p-color)15;
          border-color: var(--p-color);
        }
        .park-programs__card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .park-programs__card-emoji {
          font-size: 32px;
          background: var(--p-bg);
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .park-programs__card-metric {
          font-size: 10px;
          font-weight: 700;
          color: var(--p-color);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: var(--p-bg);
          padding: 4px 12px;
          border-radius: 99px;
        }
        .park-programs__card-sub {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-light);
          margin-bottom: 8px;
        }
        .park-programs__card-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 400;
          color: var(--text-dark);
          margin-bottom: 12px;
        }
        .park-programs__card-desc {
          font-size: 13px;
          line-height: 1.7;
          color: var(--text-mid);
          margin-bottom: 28px;
          font-weight: 300;
        }
        .park-programs__card-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-dark);
          margin-top: auto;
          transition: gap 0.3s, color 0.3s;
        }
        .park-programs__card-link:hover {
          color: var(--p-color);
          gap: 12px;
        }
        @media (max-width: 1024px) {
          .park-programs__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 680px) {
          .park-programs__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PARK MAP — illustrated site plan
   ───────────────────────────────────────────── */
function ParkMapSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const zones = [
    { id: 'A', x: 180, y: 200, color: '#0288d1', label: 'Main Carp Pond', desc: 'Heart of the Pondy Fish program — 6 acres' },
    { id: 'B', x: 480, y: 160, color: '#388e3c', label: 'North Rice Fields', desc: 'Guavas AcreRise terraced orchards & paddy' },
    { id: 'C', x: 680, y: 280, color: '#388e3c', label: 'East Rice Fields', desc: 'Paddy terraces growing Kalajeera heirloom rice' },
    { id: 'D', x: 320, y: 380, color: '#148f77', label: 'Duck Grazing Zone', desc: 'Corridors for natural weed control' },
    { id: 'E', x: 560, y: 420, color: '#1565c0', label: 'Secondary Pond', desc: 'Nursery and fingerling hatcheries' },
    { id: 'F', x: 160, y: 420, color: '#8d6e63', label: 'Village Huts', desc: 'The Poultry Reserve backyard micro-farms' },
    { id: 'G', x: 700, y: 160, color: '#f57f17', label: 'Visitor Centre', desc: 'Tassar Fashion weaving exhibition & café' },
    { id: 'H', x: 440, y: 300, color: '#795548', label: 'Coracle Launch', desc: 'Guided boat rides & eco-tourism' },
  ]
  const [active, setActive] = useState(null)

  return (
    <section className="park-map" ref={ref}>
      <div className="container">
        <motion.div className="park-map__header"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <div className="section-label">Site Plan</div>
          <h2 className="display-heading">Navigate <em>the Park</em></h2>
          <p style={{ fontSize: 14, color: 'var(--text-light)', maxWidth: 480, marginTop: 16, lineHeight: 1.8 }}>
            Tap any zone marker on the map to learn about that section of the park and its corresponding program.
          </p>
        </motion.div>

        <div className="park-map__layout">
          <motion.div className="park-map__canvas"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.2 }}>
            <svg viewBox="0 0 880 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="park-map__svg">
              <defs>
                <linearGradient id="mapGrass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c8e6c9"/>
                  <stop offset="100%" stopColor="#a5d6a7"/>
                </linearGradient>
                <linearGradient id="mapWater" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b3e5fc"/>
                  <stop offset="100%" stopColor="#81d4fa"/>
                </linearGradient>
                <pattern id="ricePattern" patternUnits="userSpaceOnUse" width="14" height="14">
                  <rect width="14" height="14" fill="#a5d6a7"/>
                  <line x1="7" y1="0" x2="7" y2="14" stroke="#66bb6a" strokeWidth="0.8"/>
                  <line x1="0" y1="7" x2="14" y2="7" stroke="#66bb6a" strokeWidth="0.8"/>
                </pattern>
                <pattern id="waterPattern" patternUnits="userSpaceOnUse" width="20" height="10">
                  <rect width="20" height="10" fill="#b3e5fc"/>
                  <path d="M0 5 Q5 2 10 5 Q15 8 20 5" stroke="#4fc3f7" strokeWidth="0.8" fill="none"/>
                </pattern>
              </defs>

              {/* Base ground */}
              <rect width="880" height="520" fill="url(#mapGrass)" rx="4"/>

              {/* Grid / paths */}
              <line x1="0" y1="260" x2="880" y2="260" stroke="#8bc34a" strokeWidth="12" opacity="0.4"/>
              <line x1="440" y1="0" x2="440" y2="520" stroke="#8bc34a" strokeWidth="12" opacity="0.4"/>
              <line x1="0" y1="130" x2="880" y2="130" stroke="#8bc34a" strokeWidth="6" opacity="0.25"/>
              <line x1="0" y1="390" x2="880" y2="390" stroke="#8bc34a" strokeWidth="6" opacity="0.25"/>
              <line x1="220" y1="0" x2="220" y2="520" stroke="#8bc34a" strokeWidth="6" opacity="0.25"/>
              <line x1="660" y1="0" x2="660" y2="520" stroke="#8bc34a" strokeWidth="6" opacity="0.25"/>

              {/* Main carp pond */}
              <ellipse cx="180" cy="200" rx="140" ry="100" fill="url(#waterPattern)"/>
              <ellipse cx="180" cy="200" rx="140" ry="100" fill="none" stroke="#0288d1" strokeWidth="2"/>
              {/* Water shimmer */}
              {[175,190,205].map((y,i)=>(
                <line key={i} x1={70+i*10} y1={y} x2={270-i*8} y2={y}
                  stroke="white" strokeWidth="0.8" opacity="0.35" strokeDasharray="6 12"/>
              ))}

              {/* Secondary pond */}
              <ellipse cx="560" cy="420" rx="100" ry="70" fill="url(#waterPattern)"/>
              <ellipse cx="560" cy="420" rx="100" ry="70" fill="none" stroke="#1565c0" strokeWidth="2"/>

              {/* Rice fields */}
              <rect x="340" y="60" width="260" height="140" fill="url(#ricePattern)" rx="2"/>
              <rect x="340" y="60" width="260" height="140" fill="none" stroke="#388e3c" strokeWidth="1.5" rx="2"/>
              <rect x="620" y="180" width="200" height="200" fill="url(#ricePattern)" rx="2"/>
              <rect x="620" y="180" width="200" height="200" fill="none" stroke="#388e3c" strokeWidth="1.5" rx="2"/>

              {/* Duck zone */}
              <rect x="260" y="330" width="180" height="130" fill="#c8e6c9" rx="2"/>
              <rect x="260" y="330" width="180" height="130" fill="none" stroke="#148f77" strokeWidth="1.5" strokeDasharray="8 5" rx="2"/>

              {/* Trees */}
              {[[830,40],[830,100],[830,420],[830,470],[40,460],[40,480],[40,500]].map(([x,y],i)=>(
                <g key={i}>
                  <circle cx={x} cy={y} r={14} fill="#2e7d32" opacity="0.9"/>
                  <line x1={x} y1={y+14} x2={x} y2={y+22} stroke="#5d4037" strokeWidth="2.5"/>
                </g>
              ))}

              {/* Visitor centre building */}
              <rect x="660" y="120" width="80" height="60" fill="#fff8e1" stroke="#f57f17" strokeWidth="1.5" rx="2"/>
              <text x="700" y="147" textAnchor="middle" fontSize="9" fill="#e65100" fontFamily="sans-serif">VISITOR</text>
              <text x="700" y="160" textAnchor="middle" fontSize="9" fill="#e65100" fontFamily="sans-serif">CENTRE</text>

              {/* Village huts */}
              {[[100,420],[140,430],[100,460],[140,468]].map(([x,y],i)=>(
                <g key={i}>
                  <rect x={x-12} y={y} width={24} height={18} fill="#8d6e63"/>
                  <polygon points={`${x-16},${y} ${x},${y-14} ${x+16},${y}`} fill="#5d4037"/>
                </g>
              ))}

              {/* Coracle launch */}
              <ellipse cx="440" cy="300" rx="22" ry="14" fill="#a1887f" opacity="0.9"/>
              <text x="440" y="328" textAnchor="middle" fontSize="8" fill="#4e342e" fontFamily="sans-serif">LAUNCH</text>

              {/* Compass rose */}
              <g transform="translate(820,60)">
                <circle cx="0" cy="0" r="24" fill="white" opacity="0.8"/>
                <text x="0" y="-10" textAnchor="middle" fontSize="9" fill="#1a252f" fontFamily="sans-serif" fontWeight="700">N</text>
                <path d="M0 -6 L4 6 L0 4 L-4 6 Z" fill="#1a252f"/>
              </g>

              {/* Zone markers */}
              {zones.map((zone) => (
                <g key={zone.id}
                  className="park-map__marker"
                  onClick={() => setActive(active === zone.id ? null : zone.id)}
                  style={{ cursor: 'pointer' }}>
                  <circle cx={zone.x} cy={zone.y} r={18} fill={zone.color} opacity={active === zone.id ? 1 : 0.85}
                    style={{ filter: active === zone.id ? `drop-shadow(0 0 8px ${zone.color})` : 'none',
                      transition: 'all 0.3s' }}/>
                  <circle cx={zone.x} cy={zone.y} r={18} fill="none" stroke="white" strokeWidth="2"/>
                  <text x={zone.x} y={zone.y + 5} textAnchor="middle" fontSize="11"
                    fill="white" fontFamily="sans-serif" fontWeight="700">{zone.id}</text>
                  {active === zone.id && (
                    <circle cx={zone.x} cy={zone.y} r={28} fill="none"
                       stroke={zone.color} strokeWidth="2" opacity="0.5"
                       style={{ animation: 'ripple 1.5s ease-out infinite' }}/>
                  )}
                </g>
              ))}

              {/* North label */}
              <text x="440" y="510" textAnchor="middle" fontSize="10" fill="#4a4a4a"
                fontFamily="sans-serif" letterSpacing="4" opacity="0.5">CDR LIVELIHOOD PARK — SITE PLAN</text>
            </svg>
          </motion.div>

          {/* Legend */}
          <motion.div className="park-map__legend"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}>
            <h3 className="park-map__legend-title">Zone Guide</h3>
            {zones.map((zone) => (
              <div key={zone.id}
                className={`park-map__legend-item ${active === zone.id ? 'active' : ''}`}
                onClick={() => setActive(active === zone.id ? null : zone.id)}>
                <div className="park-map__legend-dot" style={{ background: zone.color }}>{zone.id}</div>
                <div>
                  <div className="park-map__legend-label">{zone.label}</div>
                  <div className="park-map__legend-desc">{zone.desc}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <style>{`
        .park-map { padding: var(--section-pad) 0; background: var(--earth-warm); }
        .park-map__header { margin-bottom: 52px; }
        .park-map__layout { display: grid; grid-template-columns: 1fr 300px; gap: 40px; align-items: start; }
        .park-map__canvas { background: white; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 30px 70px rgba(0,0,0,0.1); }
        .park-map__svg { width: 100%; display: block; }
        .park-map__marker { transition: all 0.3s; }
        .park-map__legend-title {
          font-family: var(--font-body); font-size: 9px; font-weight: 700;
          letter-spacing: 0.3em; text-transform: uppercase; color: var(--text-light);
          margin-bottom: 20px;
        }
        .park-map__legend-item {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 14px 16px; margin-bottom: 4px;
          border: 1px solid rgba(0,0,0,0.06); background: white;
          cursor: pointer; transition: all 0.3s;
        }
        .park-map__legend-item:hover,
        .park-map__legend-item.active {
          background: var(--sky-horizon); border-color: var(--water-mid);
        }
        .park-map__legend-dot {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: white; flex-shrink: 0;
        }
        .park-map__legend-label { font-size: 12.5px; font-weight: 500; color: var(--text-dark); margin-bottom: 3px; }
        .park-map__legend-desc { font-size: 11px; color: var(--text-light); }
        @media (max-width: 960px) { .park-map__layout { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────
   BIODIVERSITY — expanded species lists
   ───────────────────────────────────────────── */
const speciesGroups = [
  {
    category: 'Water & Land Fauna',
    icon: '🐟',
    color: '#0288d1',
    bg: '#e3f2fd',
    species: [
      { name: 'Mirror Carp', latin: 'Cyprinus carpio', note: 'Polyculture top feeder' },
      { name: 'Khaki Campbell Duck', latin: 'Anas platyrhynchos', note: 'Organic pest control patrol' },
      { name: 'Eastern Ghat Black Goat', latin: 'Capra hircus', note: 'Hillside grazing livestock' },
      { name: 'Country Chicken', latin: 'Gallus gallus domesticus', note: 'Backyard micro-enterprise' },
      { name: 'Rohu & Catla', latin: 'Labeo rohita / Catla catla', note: 'Pond surface and column feeders' },
    ],
  },
  {
    category: 'Flora & Forest Crops',
    icon: '🌾',
    color: '#d4ac0d',
    bg: '#fefde7',
    species: [
      { name: 'Kalajeera Rice', latin: 'Oryza sativa', note: 'Aromatic black heirloom rice' },
      { name: 'Allahabad Safeda Guava', latin: 'Psidium guajava', note: 'High-yield organic crop' },
      { name: 'Tamarind Tree', latin: 'Tamarindus indica', note: 'Drought-tolerant windbreak' },
      { name: 'Saraswati Paddy', latin: 'Oryza sativa', note: 'Traditional flood-tolerant rice' },
      { name: 'Ginger & Turmeric', latin: 'Zingiber / Curcuma longa', note: 'Under-canopy companion crops' },
    ],
  },
  {
    category: 'Crafts & Silk Ecosystem',
    icon: '🧵',
    color: '#ff7675',
    bg: '#fce4ec',
    species: [
      { name: 'Tassar Silk Moth', latin: 'Antheraea mylitta', note: 'Wild cocoons harvested in trees' },
      { name: 'Ikat Loom Silk', latin: 'Textile craft', note: 'Empowering local handloom weavers' },
      { name: 'Organic Madder & Indigo', latin: 'Rubia tinctorum / Indigofera', note: 'Natural plant dyes for weaving' },
      { name: 'Bamboo Frameworks', latin: 'Bambusoideae', note: 'Predator-proof coop structure' },
      { name: 'Wicker Baskets', latin: 'Salix', note: 'Local weave harvest storage' },
    ],
  },
]

function BiodiversitySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section className="biodiversity" ref={ref}>
      <div className="container">
        <motion.div className="biodiversity__header"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <div className="section-label">Flora &amp; Fauna</div>
          <h2 className="display-heading">Park <em>Biodiversity</em></h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-light)', maxWidth: 540, marginTop: 16 }}>
            The park is home to dozens of species that have been carefully selected to create the most productive and ecologically balanced integrated system.
          </p>
        </motion.div>
        <div className="biodiversity__groups">
          {speciesGroups.map((group, gi) => (
            <motion.div key={group.category} className="biodiversity__group"
              style={{ '--g-color': group.color, '--g-bg': group.bg }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: gi * 0.15 }}>
              <div className="biodiversity__group-header">
                <span className="biodiversity__group-icon">{group.icon}</span>
                <h3 className="biodiversity__group-title">{group.category}</h3>
                <span className="biodiversity__group-count">{group.species.length} varieties</span>
              </div>
              <div className="biodiversity__species-list">
                {group.species.map((sp, si) => (
                  <motion.div key={sp.name} className="biodiversity__species"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: gi * 0.15 + si * 0.07 }}>
                    <div>
                      <div className="biodiversity__species-name">{sp.name}</div>
                      <div className="biodiversity__species-latin">{sp.latin}</div>
                    </div>
                    <div className="biodiversity__species-note">{sp.note}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        .biodiversity { padding: var(--section-pad) 0; background: var(--cloud-white); }
        .biodiversity__header { max-width: 640px; margin-bottom: 64px; }
        .biodiversity__groups { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .biodiversity__group {
          border: 1px solid rgba(0,0,0,0.07);
          overflow: hidden;
        }
        .biodiversity__group-header {
          display: flex; align-items: center; gap: 12px;
          padding: 24px 28px; background: var(--g-bg);
          border-bottom: 2px solid var(--g-color);
        }
        .biodiversity__group-icon { font-size: 24px; }
        .biodiversity__group-title {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 400; color: var(--text-dark); flex: 1;
        }
        .biodiversity__group-count {
          font-size: 10px; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--g-color); font-weight: 600;
        }
        .biodiversity__species-list { padding: 8px 0; }
        .biodiversity__species {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 12px; padding: 14px 28px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          transition: background 0.2s;
        }
        .biodiversity__species:last-child { border-bottom: none; }
        .biodiversity__species:hover { background: var(--g-bg); }
        .biodiversity__species-name { font-size: 13px; font-weight: 500; color: var(--text-dark); margin-bottom: 3px; }
        .biodiversity__species-latin { font-size: 11px; font-style: italic; color: var(--text-light); }
        .biodiversity__species-note {
          font-size: 10.5px; color: var(--g-color); text-align: right;
          max-width: 120px; line-height: 1.5;
        }
        @media (max-width: 1100px) { .biodiversity__groups { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────
   CONSERVATION — mission & values
   ───────────────────────────────────────────── */
function ConservationSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })
  const pillars = [
    { icon: '♻️', title: 'Zero Waste Loop', body: 'Duck manure feeds rice, rice straw feeds fish, fish waste enriches the pond — nothing leaves the system as waste.' },
    { icon: '🚫', title: 'No Pesticides', body: 'Ducks patrol the paddies consuming insects and weeds naturally. Fish oxygenate water to eliminate algae. Chemical inputs are zero.' },
    { icon: '💧', title: 'Water Stewardship', body: 'Rainwater harvesting, zero chemical runoff, and seasonal water management maintain clean, living water year-round.' },
    { icon: '🌱', title: 'Seed Heritage', body: 'We preserve and propagate 40+ traditional Odisha rice varieties that would otherwise be lost to industrial monoculture.' },
    { icon: '👨‍👩‍👧', title: 'Community First', body: 'Every decision is made with the 150+ families whose livelihoods depend on the park. Profit follows purpose here.' },
    { icon: '📚', title: 'Living Education', body: 'Schools, researchers, and farmers visit from across India to study and replicate this model in their own regions.' },
  ]
  return (
    <section className="conservation" ref={ref}>
      <div className="conservation__inner">
        <div className="container">
          <div className="conservation__layout">
            <motion.div className="conservation__left"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.0 }}>
              <div className="section-label" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <span style={{ background: 'rgba(255,255,255,0.3)', display: 'block', width: 32, height: 1 }}/>
                Our Mission
              </div>
              <h2 className="display-heading" style={{ color: 'white' }}>
                Conservation<br />Through <em style={{ color: 'var(--accent-gold)' }}>Livelihood</em>
              </h2>
              <div className="divider"/>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)', marginBottom: 32 }}>
                We believe the most powerful force for ecological conservation is not restriction — it is giving communities a reason to protect their environment because it sustains their lives.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.55)' }}>
                The CDR Park is a proof of concept: that carp, duck, and rice together can support more families per acre, with greater ecological health, than any industrial alternative.
              </p>
              <Link to="/contact" className="btn-primary" style={{ marginTop: 40 }}>
                <span>Support the Mission</span>
              </Link>
            </motion.div>
            <div className="conservation__pillars">
              {pillars.map((p, i) => (
                <motion.div key={p.title} className="conservation__pillar"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}>
                  <div className="conservation__pillar-icon">{p.icon}</div>
                  <div>
                    <div className="conservation__pillar-title">{p.title}</div>
                    <div className="conservation__pillar-body">{p.body}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .conservation { background: var(--text-dark); }
        .conservation__inner { padding: var(--section-pad) 0; }
        .conservation__layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
        .conservation__left {}
        .conservation__pillars { display: flex; flex-direction: column; gap: 4px; }
        .conservation__pillar {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 20px 22px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          transition: background 0.3s;
        }
        .conservation__pillar:hover { background: rgba(255,255,255,0.08); }
        .conservation__pillar-icon { font-size: 22px; flex-shrink: 0; width: 36px; }
        .conservation__pillar-title { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85); margin-bottom: 5px; }
        .conservation__pillar-body { font-size: 12px; line-height: 1.7; color: rgba(255,255,255,0.45); }
        @media (max-width: 900px) { .conservation__layout { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PAGE ASSEMBLY
   ───────────────────────────────────────────── */
export default function ParkPage() {
  return (
    <motion.main className="page-wrapper"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}>
      <ParkHero />
      <OverviewSection />
      <ProgramsSection />
      <ParkMapSection />
      <BiodiversitySection />
      <ConservationSection />
    </motion.main>
  )
}