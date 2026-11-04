import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const programs = [
  {
    id: 'pondy-fish',
    title: 'Pondy Fish',
    emoji: '🐟',
    color: '#1a365d',
    accent: '#14b8a6', // Teal
    bgImage: '/images/programs/pondy-fish-5.jpg',
    stat: '12,000+',
    statLabel: 'Fishers Supported',
    tagline: 'Reviving traditional aquaculture through sustainable pond-fish ecosystems.',
    societalNeed: 'Bypasses exploitative middleman networks to double families\' incomes while establishing female-led local aquaculture cooperatives.',
    ecologicalImpact: 'Restores native wetland biodiversity by eliminating toxic chemical runoffs and establishing organic nutrient loop cycles.',
    metrics: { carbon: 78, economics: 110, biodiversity: 80 },
    loopGive: 'Aquaculture nutrient-rich water acts as an organic irrigation boost for Guava soils.',
    loopReceive: 'Tamarind grove shade and wind buffers cool pond temperatures, protecting the fish.'
  },
  {
    id: 'guavas-acrerise',
    title: 'Guavas AcreRise',
    emoji: '🌿',
    color: '#14532d',
    accent: '#22c55e', // Green
    bgImage: '/images/programs/guavas-3.jpg',
    stat: '8,400',
    statLabel: 'Acres Cultivated',
    tagline: 'Transforming smallholder farms into multi-layered food forests.',
    societalNeed: 'Reduces crop failure risks by introducing secondary fruit and ground crop revenues, securing year-round farmer nutrition.',
    ecologicalImpact: 'Reverses soil erosion and improves carbon capture by planting dense multi-strata crops and organic drip irrigation.',
    metrics: { carbon: 95, economics: 85, biodiversity: 90 },
    loopGive: 'Guava leaves and cover-crop legumes provide high-protein natural feed for goats.',
    loopReceive: 'Organic pond water provides nitrogen-rich watering for guava tree roots.'
  },
  {
    id: 'easternghats-goat',
    title: 'Eastern Ghat Goats',
    emoji: '🐐',
    color: '#581c87',
    accent: '#d97706', // Amber Gold
    bgImage: '/images/programs/goats-5.jpg',
    stat: '3,200',
    statLabel: 'Goats Reared',
    tagline: 'Rotational pastoralism securing critical tribal safety nets.',
    societalNeed: 'Creates an emergency liquid asset for marginalized tribal families, supported by cooperative veterinary health networks.',
    ecologicalImpact: 'Teaches controlled rotational grazing to protect hillside microclimates and prevent soil compaction on forest boundaries.',
    metrics: { carbon: 62, economics: 125, biodiversity: 72 },
    loopGive: 'Goat manure serves as natural high-nitrogen soil compost for the dry tamarind woodlands.',
    loopReceive: 'Guava orchards provide nutrient-dense fodder and cover crop grazing grounds.'
  },
  {
    id: 'tamarind-grove',
    title: 'Tamarind Grove',
    emoji: '🌳',
    color: '#7c2d12',
    accent: '#ea580c', // Orange
    bgImage: '/images/programs/tamarind-grove-5.jpg',
    stat: '5,600',
    statLabel: 'Tamarind Trees',
    tagline: 'Agroforestry building dryland carbon sinks and value-added livelihoods.',
    societalNeed: 'Establishes community processing hubs, allowing women self-help groups to manufacture and package high-margin tamarind products.',
    ecologicalImpact: 'Acts as drought-tolerant windbreaks that shield vulnerable microclimates from heatwaves while anchoring nitrogen in dry soils.',
    metrics: { carbon: 89, economics: 70, biodiversity: 78 },
    loopGive: 'Tamarind root networks anchor soil and act as cooling windbreaks for nearby aquaculture ponds.',
    loopReceive: 'Goat compost enriches dry soil surrounding the slow-growing tamarind root systems.'
  },
  {
    id: 'tassar-fashion',
    title: 'Tassar Fashion',
    emoji: '🧵',
    color: '#2d142c',
    accent: '#ff7675',
    bgImage: '/images/programs/tassar-fashion-1.jpg',
    stat: '1,500+',
    statLabel: 'Artisans Supported',
    tagline: 'Weaving livelihoods, styling futures.',
    societalNeed: 'Secures fair income streams for rural weavers by reviving heritage ikat handlooms and establishing direct market channels.',
    ecologicalImpact: 'Uses 100% organic vegetable dyes and solar-powered weaving grids, avoiding toxic chemical discharges and high carbon footprints.',
    metrics: { carbon: 85, economics: 95, biodiversity: 65 },
    loopGive: 'Solar power facilities and organic wastewater processes support adjacent village green zones.',
    loopReceive: 'Raw silk cocoon materials are sourced locally from bio-diverse sericulture host trees.'
  },
  {
    id: 'mega-poultry',
    title: 'The Poultry Reserve',
    emoji: '🐣',
    color: '#0d2030',
    accent: '#00cec9',
    bgImage: '/images/programs/mega-poultry-2.jpg',
    stat: '2,200+',
    statLabel: 'Poultry Farms Setup',
    tagline: 'Empowering backyard farmers with micro-enterprises.',
    societalNeed: 'Secures secondary household cash flow and combats local malnutrition with high-productivity backyard coops.',
    ecologicalImpact: 'Converts nitrogen-rich poultry waste into organic crop fertilizers for local vegetable gardens while keeping local soils clean.',
    metrics: { carbon: 75, economics: 115, biodiversity: 82 },
    loopGive: 'Organic chicken litter is converted into compost fertilizer for Guava orchards and vegetable gardens.',
    loopReceive: 'Backyard farms utilize feed grains and local water resources from the integrated system.'
  },
  {
    id: 'tribey-coffee',
    title: 'Tribey Coffee',
    emoji: '☕',
    color: '#1a100a',
    accent: '#c09067',
    bgImage: '/images/programs/coffee-1.jpg',
    stat: '4,500+',
    statLabel: 'Farmers Engaged',
    tagline: 'Cultivating shade-grown organic coffee under tribal stewardship.',
    societalNeed: 'Enables forest-dwelling communities to process and retail premium single-origin Arabica, securing higher fair-trade margins.',
    ecologicalImpact: 'Preserves native forest canopies through shade-grown agroforestry, enhancing biodiversity and stabilizing soil carbon.',
    metrics: { carbon: 92, economics: 105, biodiversity: 88 },
    loopGive: 'Organic coffee husks and pulp are recycled into nutrient-rich compost for nearby multi-layered food forests.',
    loopReceive: 'Shade trees from the tamarind grove protect young coffee shrubs from direct afternoon sun.'
  }
]

// Light theme circular metric gauge
function MetricCircle({ percentage, label, color }) {
  const radius = 18
  const stroke = 3
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="metric-box">
      <div className="metric-svg-wrapper">
        <svg width="46" height="46" viewBox="0 0 46 46">
          <circle 
            cx="23" 
            cy="23" 
            r={radius} 
            stroke="rgba(0, 0, 0, 0.04)" 
            strokeWidth={stroke} 
            fill="transparent" 
          />
          <motion.circle 
            cx="23" 
            cy="23" 
            r={radius} 
            stroke={color} 
            strokeWidth={stroke} 
            fill="transparent" 
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>
        <span className="metric-value">{percentage}%</span>
      </div>
      <span className="metric-label">{label}</span>
    </div>
  )
}

export default function FeaturedPrograms() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewMode, setViewMode] = useState('detail') // 'detail' or 'loop'
  const current = programs[activeIndex]

  // 3D Card Hover Perspective coordinates
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    
    // Limits rotation tilt
    const rX = -(mouseY / height) * 8
    const rY = (mouseX / width) * 8
    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <section className="featured-programs">
      <div className="container">
        <div className="featured-programs__header">
          <div className="section-label">Modular Programs</div>
          <h2 className="display-heading">Agro-Ecological <em>Enterprises</em></h2>
          <div className="header-flex">
            <p className="featured-programs__intro">
              Our modular programs demonstrate the CDR polyculture loop in action across various local ecosystems, generating community wealth while repairing biodiversity.
            </p>
            
            {/* View Mode Toggle Switch */}
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewMode === 'detail' ? 'active' : ''}`}
                onClick={() => setViewMode('detail')}
              >
                {viewMode === 'detail' && (
                  <motion.div layoutId="active-toggle" className="toggle-indicator" />
                )}
                <span className="toggle-text">🧬 Enterprise View</span>
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'loop' ? 'active' : ''}`}
                onClick={() => setViewMode('loop')}
              >
                {viewMode === 'loop' && (
                  <motion.div layoutId="active-toggle" className="toggle-indicator" />
                )}
                <span className="toggle-text">🔄 Polyculture Loop</span>
              </button>
            </div>
          </div>
        </div>

        <div className="portal-center">
          {/* Orbit Navigation Header arranged on an elliptic path */}
          <div className="orbit-nav">
            <svg className="orbit-ellipse-svg" viewBox="0 0 800 100">
              <ellipse cx="400" cy="90" rx="360" ry="70" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1.5" />
              <motion.ellipse 
                cx="400" 
                cy="90" 
                rx="360" 
                ry="70" 
                fill="none" 
                stroke={current.accent} 
                strokeWidth="1.5" 
                strokeDasharray="12 18"
                animate={{ strokeDashoffset: [0, -60] }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
            </svg>
            
            <div className="orbit-buttons">
              {programs.map((p, idx) => (
                <button
                  key={p.id}
                  className={`orbit-node ${activeIndex === idx ? 'is-active' : ''}`}
                  style={{ '--accent': p.accent }}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className="orbit-node__emoji">{p.emoji}</span>
                  <span className="orbit-node__title">{p.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Core Display Dashboard (Oval Card + Satellite Cards) */}
          <div className="portal-grid">
            
            {/* Left Satellite: Societal Importance */}
            <motion.div 
              className="satellite-card satellite-card--left"
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: -30, opacity: 0 }}
              key={`soc-${activeIndex}`}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <div className="satellite-header">
                <span>👥</span>
                <h4 className="society-heading">Societal Importance</h4>
              </div>
              <p>{current.societalNeed}</p>
            </motion.div>

            {/* Central Oval Card */}
            <motion.div 
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ 
                transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.1s ease',
                '--accent': current.accent 
              }}
              className="oval-display-card"
            >
              {/* Glowing Background Spotlight */}
              <div 
                className="ambient-spotlight"
                style={{ background: `radial-gradient(circle, ${current.accent}15 0%, transparent 70%)` }}
              />

              {/* Background faint image zoom overlay */}
              <div className="oval-display-bg">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={current.bgImage}
                    src={current.bgImage} 
                    alt={current.title} 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.12, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
              </div>

              <div className="oval-display-content">
                <AnimatePresence mode="wait">
                  {viewMode === 'detail' ? (
                    <motion.div
                      key="oval-detail"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="oval-inner"
                    >
                      <span className="oval-emoji">{current.emoji}</span>
                      <h3 className="oval-title">{current.title}</h3>
                      <p className="oval-tagline">"{current.tagline}"</p>

                      {/* Circular Progress Metrics */}
                      <div className="oval-metrics">
                        <MetricCircle percentage={current.metrics.carbon} label="Carbon Sinks" color={current.accent} />
                        <MetricCircle percentage={current.metrics.economics} label="Economic Uplift" color={current.accent} />
                        <MetricCircle percentage={current.metrics.biodiversity} label="Biodiversity Gain" color={current.accent} />
                      </div>

                      <div className="oval-stat">
                        <span className="oval-stat-num">{current.stat}</span>
                        <span className="oval-stat-lbl">{current.statLabel}</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="oval-loop"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35 }}
                      className="oval-inner oval-loop-inner"
                    >
                      <div className="loop-header-simple">
                        <span className="loop-icon-simple">🔄</span>
                        <h4 className="loop-heading-text">Symbiosis Ring</h4>
                      </div>
                      <div className="light-loop-svg-wrapper">
                        {/* Interactive SVG Heptagonal Loop (Drawn inside the Oval) */}
                        <svg viewBox="0 0 320 180" className="oval-loop-svg">
                          {/* Heptagonal loop paths */}
                          {[
                            { d: "M 160 47 Q 202 47 230 63" },
                            { d: "M 230 63 Q 256 79 248 100" },
                            { d: "M 248 100 Q 237 120 199 129" },
                            { d: "M 199 129 Q 160 138 121 129" },
                            { d: "M 121 129 Q 83 120 72 100" },
                            { d: "M 72 100 Q 64 79 90 63" },
                            { d: "M 90 63 Q 118 47 160 47" }
                          ].map((path, idx) => (
                            <path
                              key={idx}
                              d={path.d}
                              fill="none"
                              stroke={activeIndex === idx ? current.accent : "rgba(0,0,0,0.06)"}
                              strokeWidth={activeIndex === idx ? "3" : "1"}
                              strokeDasharray={activeIndex === idx ? "5 3" : "none"}
                              className={activeIndex === idx ? "loop-path-active" : ""}
                            />
                          ))}

                          {/* Nodes as clickable circles */}
                          {programs.map((p, idx) => {
                            const coords = [
                              { cx: 160, cy: 47 },  // 0: top center
                              { cx: 230, cy: 63 },  // 1: top right
                              { cx: 248, cy: 100 }, // 2: bottom right
                              { cx: 199, cy: 129 }, // 3: bottom center-right
                              { cx: 121, cy: 129 }, // 4: bottom center-left
                              { cx: 72, cy: 100 },  // 5: bottom left
                              { cx: 90, cy: 63 }    // 6: top left
                            ][idx];
                            return (
                              <g key={p.id} onClick={() => setActiveIndex(idx)} style={{ cursor: 'pointer' }}>
                                <circle 
                                  cx={coords.cx} 
                                  cy={coords.cy} 
                                  r="15" 
                                  fill={activeIndex === idx ? "rgba(0,0,0,0.04)" : "#ffffff"} 
                                  stroke={p.accent} 
                                  strokeWidth="1.5" 
                                />
                                <text 
                                  x={coords.cx} 
                                  y={coords.cy + 4} 
                                  fontSize="12" 
                                  textAnchor="middle"
                                >
                                  {p.emoji}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>

                      <div className="oval-loop-narrative">
                        <p className="narrative-give">
                          <strong style={{ color: current.accent }}>Outflow: </strong>{current.loopGive}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Satellite: Ecological Need */}
            <motion.div 
              className="satellite-card satellite-card--right"
              animate={{ x: 0, opacity: 1 }}
              initial={{ x: 30, opacity: 0 }}
              key={`eco-${activeIndex}`}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              <div className="satellite-header">
                <span>🌍</span>
                <h4 className="nature-heading">Ecological Need</h4>
              </div>
              <p>{current.ecologicalImpact}</p>
            </motion.div>

          </div>

          {/* Bottom Case Study Button */}
          <div className="portal-footer">
            <Link to={`/programs/${current.id}`} className="btn-oval-case-study" style={{ '--accent': current.accent }}>
              <span>Enter Detailed Case Study</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .featured-programs {
          padding: var(--section-pad) 0;
          background: radial-gradient(circle at 50% -10%, #f5fafb 0%, #e3ecf4 100%);
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.4);
          border-bottom: 1px solid rgba(255, 255, 255, 0.4);
        }
        .featured-programs__header {
          max-width: var(--container-max);
          margin-bottom: 40px;
        }
        .header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 40px;
          margin-top: 16px;
          flex-wrap: wrap;
        }
        .featured-programs__intro {
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-mid, #2c3e50);
          font-weight: 300;
          max-width: 600px;
        }

        /* Toggle Button light styling */
        .view-toggle {
          background: rgba(0, 0, 0, 0.035);
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 99px;
          padding: 4px;
          display: flex;
          gap: 4px;
        }
        .toggle-btn {
          position: relative;
          padding: 8px 18px;
          border-radius: 99px;
          color: rgba(0, 0, 0, 0.5);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.3s ease;
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .toggle-btn.active {
          color: white;
        }
        .toggle-indicator {
          position: absolute;
          inset: 0;
          background: var(--text-dark, #1a252f);
          border-radius: 99px;
          z-index: 0;
        }
        .toggle-text {
          position: relative;
          z-index: 1;
        }

        /* Portal Center Alignment */
        .portal-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          margin-top: 20px;
        }

        /* Orbit Nav Arc */
        .orbit-nav {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 100px;
          margin-bottom: 24px;
          display: flex;
          justify-content: center;
        }
        .orbit-ellipse-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .orbit-buttons {
          position: absolute;
          bottom: 0px;
          display: flex;
          justify-content: space-around;
          width: 100%;
          max-width: 820px;
          padding: 0 20px;
          z-index: 10;
        }
        
        .orbit-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.09);
          padding: 14px 22px;
          border-radius: 99px;
          cursor: pointer;
          /* Tactile 3D bottom bevel */
          box-shadow: 0 5px 12px rgba(0, 0, 0, 0.04), inset 0 -3px 0 rgba(0, 0, 0, 0.08);
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        .orbit-node:hover {
          transform: translateY(-5px);
          border-color: var(--accent);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08), inset 0 -3px 0 rgba(0, 0, 0, 0.08), 0 0 10px var(--accent)20;
        }
        .orbit-node:active {
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04), inset 0 -1px 0 rgba(0, 0, 0, 0.08);
        }
        .orbit-node.is-active {
          background: #ffffff;
          border-color: var(--accent);
          /* Colorful bottom bezel inside the active button */
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08), inset 0 -4px 0 var(--accent), 0 0 15px var(--accent)25;
          transform: scale(1.04) translateY(-3px);
        }
        
        .orbit-node__emoji {
          font-size: 18px;
          line-height: 1;
          background: rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(0, 0, 0, 0.05);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }
        .orbit-node:hover .orbit-node__emoji {
          background: var(--accent)15;
          transform: scale(1.1);
        }
        .orbit-node.is-active .orbit-node__emoji {
          background: var(--accent)15;
          border-color: var(--accent);
        }
        
        .orbit-node__title {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-dark, #1a252f);
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        .orbit-node.is-active .orbit-node__title {
          color: var(--accent);
        }

        /* Portal Grid (Center Oval Card + flanking satellites) */
        .portal-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.4fr 0.8fr;
          gap: 24px;
          align-items: center;
          width: 100%;
          max-width: 1200px;
        }

        /* Central Oval Card */
        .oval-display-card {
          position: relative;
          width: 100%;
          aspect-ratio: 1.35 / 1; /* Oval shape */
          border-radius: 50%;
          border: 2px solid var(--accent);
          overflow: hidden;
          background: rgba(255, 255, 255, 0.5);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.04), 0 0 20px var(--accent)08;
          transition: border-color 0.5s ease, box-shadow 0.5s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }
        .oval-display-card:hover {
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.06), 0 0 30px var(--accent)12;
        }
        
        .ambient-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.6;
          transition: background 0.8s ease;
        }

        .oval-display-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .oval-display-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.12;
          filter: grayscale(20%);
        }
        
        .oval-display-content {
          position: relative;
          z-index: 2;
          width: 80%; /* Fits content in oval center */
          height: 80%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .oval-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .oval-emoji {
          font-size: 38px;
          margin-bottom: 12px;
          display: block;
        }
        .oval-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 2.6rem);
          font-weight: 300;
          color: var(--text-dark, #1a252f);
          margin: 0 0 6px 0;
          line-height: 1.1;
        }
        .oval-tagline {
          font-size: 13px;
          font-style: italic;
          color: var(--accent);
          margin: 0 0 20px 0;
          font-weight: 300;
          max-width: 90%;
        }

        /* Circular Progress Metrics Inside Oval */
        .oval-metrics {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
          width: 100%;
        }
        .metric-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .metric-svg-wrapper {
          position: relative;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .metric-value {
          position: absolute;
          font-size: 10px;
          font-weight: 700;
          font-family: monospace;
          color: var(--text-dark, #1a252f);
        }
        .metric-label {
          font-size: 9px;
          color: var(--text-light, #7f8c8d);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
          text-align: center;
          white-space: nowrap;
        }

        .oval-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.04);
          padding: 6px 16px;
          border-radius: 99px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .oval-stat-num {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 400;
          color: var(--text-dark, #1a252f);
          line-height: 1;
        }
        .oval-stat-lbl {
          font-size: 8.5px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light, #7f8c8d);
        }

        /* Flanking Satellite Cards */
        .satellite-card {
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.7);
          padding: 24px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: border-color 0.3s;
        }
        .satellite-card:hover {
          border-color: rgba(0,0,0,0.08);
        }
        .satellite-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        .satellite-header span {
          font-size: 16px;
        }
        .satellite-header h4 {
          margin: 0;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .society-heading {
          color: #e05e4d;
        }
        .nature-heading {
          color: #10b981;
        }
        .satellite-card p {
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-mid, #2c3e50);
          margin: 0;
          font-weight: 300;
        }

        /* Ecosystem Polyculture Loop inside Oval */
        .oval-loop-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .loop-header-simple {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        .loop-icon-simple {
          font-size: 16px;
        }
        .loop-heading-text {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dark, #1a252f);
          margin: 0;
        }
        .light-loop-svg-wrapper {
          width: 100%;
          max-width: 250px;
          margin: 0 auto;
        }
        .oval-loop-svg {
          width: 100%;
          height: auto;
        }
        
        /* Dashed flow lines animation */
        @keyframes dash-flow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .loop-path-active {
          animation: dash-flow 0.8s linear infinite;
          opacity: 1;
        }
        
        .oval-loop-narrative {
          margin-top: 10px;
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(0, 0, 0, 0.03);
          padding: 8px 16px;
          border-radius: 99px;
          max-width: 95%;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.01);
        }
        .narrative-give {
          font-size: 11px;
          line-height: 1.5;
          color: var(--text-mid, #2c3e50);
          margin: 0;
          font-weight: 300;
        }

        /* Portal Footer (Case study button) */
        .portal-footer {
          margin-top: 40px;
          width: 100%;
          text-align: center;
        }
        .btn-oval-case-study {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--text-dark, #1a252f);
          color: white;
          padding: 14px 30px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        .btn-oval-case-study:hover {
          background: var(--accent);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px var(--accent)30;
        }

        /* Responsive Breakpoints */
        @media (max-width: 990px) {
          .portal-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            max-width: 600px;
          }
          .satellite-card {
            min-height: auto;
            order: 2;
          }
          .oval-display-card {
            order: 1;
            aspect-ratio: 1.25 / 1;
          }
          .orbit-nav {
            max-width: 650px;
            height: auto; /* buttons wrap onto several rows here, so let the row grow instead of covering the circle */
          }
          .orbit-ellipse-svg {
            display: none; /* Hide background path on smaller screens to prevent overflow layout gaps */
          }
          .orbit-buttons {
            flex-wrap: wrap;
            gap: 8px;
            position: relative;
            justify-content: center;
          }
        }
        @media (max-width: 600px) {
          .orbit-node {
            padding: 8px 14px;
          }
          .orbit-node__emoji {
            font-size: 16px;
            width: 28px;
            height: 28px;
          }
          .orbit-node__title {
            font-size: 9px;
          }
          .oval-display-card {
            aspect-ratio: 1.15 / 1;
          }
          .oval-title {
            font-size: 1.8rem;
          }
          .oval-metrics {
            gap: 12px;
          }
          .metric-svg-wrapper {
            width: 38px;
            height: 38px;
          }
          .oval-display-content {
            width: 85%;
            height: 85%;
          }
        }
      `}</style>
    </section>
  )
}
