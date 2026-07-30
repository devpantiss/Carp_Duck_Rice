import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CountUp from 'react-countup'
import {
  FiDroplet, FiZap, FiActivity, FiArrowRight, FiShield,
  FiShoppingBag, FiTruck, FiGlobe, FiGrid, FiFeather, FiSun,
  FiTrendingUp, FiCpu, FiPlusCircle, FiBarChart2, FiMap, FiHeart
} from 'react-icons/fi'

export default function ProgramsView({ activeProgramId, onNavigateToProgram }) {
  const [selectedProgram, setSelectedProgram] = useState(activeProgramId || 'pondy-fish')
  const [bubbles, setBubbles] = useState([])
  const [roastStep, setRoastStep] = useState(0)
  const [weavePosition, setWeavePosition] = useState(0)

  // Align parent state if navigating from overview map
  useEffect(() => {
    if (activeProgramId) {
      setSelectedProgram(activeProgramId)
    }
  }, [activeProgramId])

  // Generate bubbles for Pondy Fish view
  useEffect(() => {
    if (selectedProgram === 'pondy-fish') {
      const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 12 + 4,
        left: Math.random() * 95,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 4
      }))
      setBubbles(newBubbles)
    } else {
      setBubbles([])
    }
  }, [selectedProgram])

  // Roasting process timer for coffee
  useEffect(() => {
    if (selectedProgram === 'tribey-coffee') {
      const interval = setInterval(() => {
        setRoastStep((prev) => (prev + 1) % 5)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [selectedProgram])

  // Shuttle weaver position simulation
  useEffect(() => {
    if (selectedProgram === 'tassar-fashion') {
      const interval = setInterval(() => {
        setWeavePosition((prev) => (prev === 0 ? 100 : 0))
      }, 2500)
      return () => clearInterval(interval)
    }
  }, [selectedProgram])

  const programs = [
    { id: 'pondy-fish', label: '🐟 Pondy Fish' },
    { id: 'duck-habitat', label: '🦆 Duck Habitat' },
    { id: 'rice-ecology', label: '🌾 Rice Ecology' },
    { id: 'ghats-goat', label: '🐐 Eastern Ghats Goat' },
    { id: 'tribey-coffee', label: '☕ Tribey Coffee' },
    { id: 'tassar-fashion', label: '🧵 Tassar Fashion' },
    { id: 'tamarind-grove', label: '🌳 Tamarind Grove' }
  ]

  const selectProgram = (id) => {
    setSelectedProgram(id)
    if (onNavigateToProgram) {
      onNavigateToProgram(id)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Apple-style segmented navigation */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="apple-segmented-nav">
          {programs.map((prog) => {
            const isActive = selectedProgram === prog.id
            return (
              <button
                key={prog.id}
                onClick={() => selectProgram(prog.id)}
                className={`segmented-pill-btn ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="programSegmentPill"
                    className="segmented-pill-active-bg"
                    style={{ inset: 0, position: 'absolute' }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{prog.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Program Dashboard Screens */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedProgram}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
        >
          
          {/* 1. PONDY FISH DASHBOARD */}
          {selectedProgram === 'pondy-fish' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative' }}>
              {/* Bubble animations overlay */}
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
                {bubbles.map((b) => (
                  <div
                    key={b.id}
                    className="bubble-particle"
                    style={{
                      width: b.size,
                      height: b.size,
                      left: `${b.left}%`,
                      animationDelay: `${b.delay}s`,
                      animationDuration: `${b.duration}s`
                    }}
                  />
                ))}
              </div>

              {/* Hero */}
              <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(26, 82, 118, 0.85) 0%, rgba(20, 143, 119, 0.75) 100%), url("/pondy_fish_1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px' }}>
                <div style={{ zIndex: 2 }}>
                  <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>AQUACULTURE CENTER</span>
                  <h1 style={{ color: 'white', fontSize: '38px', margin: '6px 0 0 0', fontWeight: 300 }}>Pondy Fish Operations</h1>
                </div>
              </div>

              {/* Telemetry Widgets */}
              <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card grad-water" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Water Level</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--water-dark)' }}>1.42 m</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Optimal range: 1.2 - 1.6m</span>
                </div>
                <div className="os-glass-card grad-water" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Pond pH</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--accent-teal)' }}>7.25 pH</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Buffered Neutral</span>
                </div>
                <div className="os-glass-card grad-water" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Oxygen Index</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--water-mid)' }}>6.5 mg/L</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Dissolved aerator active</span>
                </div>
                <div className="os-glass-card grad-water" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Fish Biomass</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-dark)' }}>14.2 Tons</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Est. population census</span>
                </div>
              </div>

              {/* Extra Telemetry Widgets */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Feed Inventory</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>320 kg</h3>
                  <div style={{ height: '4px', background: 'rgba(0,0,0,0.05)', borderRadius: '2px', marginTop: '6px' }}>
                    <div style={{ width: '80%', height: '100%', background: 'var(--accent-teal)' }} />
                  </div>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Disease Alerts</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--rice-green)' }}>None</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Biological loops healthy</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Harvest Prediction</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-gold)' }}>Aug 15</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Estimated yield: 1.8t</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Current Revenue</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>₹18,500</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Product sales this week</span>
                </div>
              </div>

              {/* Live Pond Map & Quick Controls */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 className="section-title-serif" style={{ fontSize: '18px' }}>Pond Layout map</h3>
                  <div style={{ height: '220px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg viewBox="0 0 300 150" style={{ width: '100%', height: '100%', padding: '10px' }}>
                      {/* Ponds */}
                      <rect x="20" y="20" width="110" height="50" rx="10" fill="rgba(46,134,193,0.15)" stroke="var(--water-mid)" strokeWidth="1.5" />
                      <text x="75" y="50" textAnchor="middle" style={{ fontSize: '10px', fill: 'var(--water-dark)', fontWeight: 600 }}>Pond A (Alpha)</text>
                      
                      <rect x="170" y="20" width="110" height="50" rx="10" fill="rgba(46,134,193,0.15)" stroke="var(--water-mid)" strokeWidth="1.5" />
                      <text x="225" y="50" textAnchor="middle" style={{ fontSize: '10px', fill: 'var(--water-dark)', fontWeight: 600 }}>Pond B (Beta)</text>
                      
                      <rect x="20" y="85" width="260" height="50" rx="10" fill="rgba(20,143,119,0.12)" stroke="var(--accent-teal)" strokeWidth="1.5" />
                      <text x="150" y="115" textAnchor="middle" style={{ fontSize: '10px', fill: 'var(--accent-teal)', fontWeight: 600 }}>Pond C (Wetland Filtration Reservoir)</text>
                    </svg>
                  </div>
                </div>

                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="section-title-serif" style={{ fontSize: '18px' }}>Aquaculture Actions</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <button onClick={() => alert('Feed dispensers triggered.')} className="btn-primary" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span>Trigger Automatic Feed</span>
                    </button>
                    <button onClick={() => alert('Sensors recalibrated.')} className="btn-outline" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <span>Calibrate Water Sensors</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. DUCK HABITAT DASHBOARD */}
          {selectedProgram === 'duck-habitat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(20, 143, 119, 0.85) 0%, rgba(30, 132, 73, 0.75) 100%), url("/mega_poultry_1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px' }}>
                <div>
                  <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>POULTRY & WETLAND RESERVE</span>
                  <h1 style={{ color: 'white', fontSize: '38px', margin: '6px 0 0 0', fontWeight: 300 }}>Duck Habitat Command</h1>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card grad-teal" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Duck Count</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--accent-teal)' }}>850 pax</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Khaki Campbell breed</span>
                </div>
                <div className="os-glass-card grad-teal" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Egg Production</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>380 / day</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Yield efficiency: 92%</span>
                </div>
                <div className="os-glass-card grad-teal" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Nesting Health</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--rice-green)' }}>94%</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Active monitors normal</span>
                </div>
                <div className="os-glass-card grad-teal" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Vaccination</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>100%</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Last cycle: July 12</span>
                </div>
              </div>

              {/* Extra telemetry */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Feed Level</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>88%</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Refill in 4 days</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Water Quality</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--water-mid)' }}>Good</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Ground supply active</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Movement Index</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>Active</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Grazing pasture loop B</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Incubation</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>45 eggs</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Est hatch: 8 days</span>
                </div>
              </div>

              {/* Flock Animation & Migration map */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
                <div className="os-glass-card">
                  <h3 className="section-title-serif" style={{ fontSize: '18px' }}>Wetland Migration & Active Grazing Loops</h3>
                  <div style={{ height: '220px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                    
                    {/* Animated flock particles */}
                    <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
                      {[...Array(6)].map((_, idx) => (
                        <motion.div
                          key={idx}
                          animate={{
                            x: [10 + idx * 30, 180 + idx * 10, 10 + idx * 30],
                            y: [40 + idx * 20, 110 - idx * 10, 40 + idx * 20]
                          }}
                          transition={{
                            duration: 10 + idx * 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          style={{
                            position: 'absolute',
                            fontSize: '20px',
                            color: 'var(--accent-teal)',
                            pointerEvents: 'none',
                            opacity: 0.75
                          }}
                        >
                          🦆
                        </motion.div>
                      ))}
                    </div>

                    <div style={{ position: 'absolute', bottom: '12px', left: '16px', fontSize: '11px', color: 'var(--text-mid)', background: 'rgba(255,255,255,0.6)', padding: '4px 10px', borderRadius: '6px' }}>
                      🔴 Live telemetry tracking: Active flock grazing in Pasture Zone 3
                    </div>
                  </div>
                </div>

                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="section-title-serif" style={{ fontSize: '18px' }}>Quick Operations</h3>
                  <button onClick={() => alert('Egg collection logs updated.')} className="btn-primary" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Register Egg Yield</span>
                  </button>
                  <button onClick={() => alert('Refill feeds dispatched.')} className="btn-outline" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Dispatch Feed Refills</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. RICE ECOLOGY DASHBOARD */}
          {selectedProgram === 'rice-ecology' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(30, 132, 73, 0.85) 0%, rgba(212, 172, 13, 0.75) 100%), url("/rice.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px' }}>
                <div>
                  <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>INTEGRATED AGRO-ECOLOGY</span>
                  <h1 style={{ color: 'white', fontSize: '38px', margin: '6px 0 0 0', fontWeight: 300 }}>Rice Field Ecology Hub</h1>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card grad-forest" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Crop Stage</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--rice-green)' }}>Tilling Phase</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Optimal growth profile</span>
                </div>
                <div className="os-glass-card grad-forest" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-dark)', fontWeight: 600 }}>Soil Moisture</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--water-mid)' }}>44.2 %</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Drip irrigation ready</span>
                </div>
                <div className="os-glass-card grad-forest" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Soil Nitrogen</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>Optimal</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Bio-fertilized wetland</span>
                </div>
                <div className="os-glass-card grad-forest" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Rainfall Index</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>220 mm</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Seasonal accumulation</span>
                </div>
              </div>

              {/* Extra metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Air Humidity</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>78%</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Atmosphere optimal</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Harvest Forecast</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-gold)' }}>Nov 12</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Est yield: 18 Tons</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Active Workers</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>8 Artisans</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Field grid assignment</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Area Covered</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>12 Acres</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Integrated crop rotation</span>
                </div>
              </div>

              {/* Season Timeline & Irrigation progress */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
                <div className="os-glass-card">
                  <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '14px' }}>Season Timeline Progress</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', width: '100%' }}>
                      {/* Line */}
                      <div style={{ position: 'absolute', top: '16px', left: '10px', right: '10px', height: '3px', background: 'rgba(0,0,0,0.05)', zIndex: 0 }} />
                      <div style={{ position: 'absolute', top: '16px', left: '10px', width: '45%', height: '3px', background: 'var(--rice-green)', zIndex: 1 }} />
                      
                      {/* Timeline Nodes */}
                      {[
                        { label: 'Sowing', date: 'June 10', active: true, done: true },
                        { label: 'Tilling', date: 'July 20', active: true, done: false },
                        { label: 'Flowering', date: 'Sept 05', active: false, done: false },
                        { label: 'Harvesting', date: 'Nov 12', active: false, done: false }
                      ].map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, position: 'relative' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step.done ? 'var(--rice-green)' : (step.active ? 'var(--accent-gold)' : 'white'), border: '2px solid ' + (step.active || step.done ? 'transparent' : 'rgba(0,0,0,0.08)'), display: 'flex', alignItems: 'center', justifyContent: 'center', color: step.active || step.done ? 'white' : 'var(--text-light)', fontSize: '12px', fontWeight: 'bold' }}>
                            {idx + 1}
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: step.active || step.done ? 'var(--text-dark)' : 'var(--text-light)', marginTop: '8px' }}>{step.label}</span>
                          <span style={{ fontSize: '9px', color: 'var(--text-light)' }}>{step.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="section-title-serif" style={{ fontSize: '18px' }}>Agroforestry Actions</h3>
                  <button onClick={() => alert('Drip irrigation flow activated.')} className="btn-primary" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Trigger Drip Irrigation</span>
                  </button>
                  <button onClick={() => alert('Soil nitrogen report generated.')} className="btn-outline" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Test Soil Parameters</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 4. GOAT FARM DASHBOARD */}
          {selectedProgram === 'ghats-goat' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(120, 66, 18, 0.85) 0%, rgba(212, 172, 13, 0.75) 100%), url("/goats_1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px' }}>
                <div>
                  <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>LIVESTOCK COOPERATIVE</span>
                  <h1 style={{ color: 'white', fontSize: '38px', margin: '6px 0 0 0', fontWeight: 300 }}>Eastern Ghats Goat Farm</h1>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card grad-gold" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Male Buck Count</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--reed-brown)' }}>24 units</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Pedigree registry active</span>
                </div>
                <div className="os-glass-card grad-gold" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Female Doe Count</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>92 units</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Milking registry</span>
                </div>
                <div className="os-glass-card grad-gold" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Kids Count</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--accent-gold)' }}>45 units</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Housed in nursery A</span>
                </div>
                <div className="os-glass-card grad-gold" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Pregnant</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>12 Does</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Veterinary monitoring active</span>
                </div>
              </div>

              {/* Extra metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Health Index</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--rice-green)' }}>98.2%</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>No active disease alerts</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Feed Stock</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>180 kg</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Refill in 6 days</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Daily Milk Yield</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--water-mid)' }}>28 Liters</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Artisanal cheese supply</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Avg Doe Weight</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>34.5 kg</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Standard breed match</span>
                </div>
              </div>

              {/* Pasture Grid & Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
                <div className="os-glass-card">
                  <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '12px' }}>Interactive Pasture Grids</h3>
                  <div style={{ height: '220px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', padding: '12px' }}>
                    {[
                      { label: 'Pasture 1', desc: 'Empty', active: false },
                      { label: 'Pasture 2', desc: 'Grazing Doe Herd', active: true },
                      { label: 'Pasture 3', desc: 'Buck Yard', active: false },
                      { label: 'Pasture 4', desc: 'Sanitizing cycle', active: false }
                    ].map((grid, idx) => (
                      <div key={idx} style={{ background: grid.active ? 'rgba(212,172,13,0.12)' : 'rgba(255,255,255,0.4)', border: '1px solid ' + (grid.active ? 'var(--accent-gold)' : 'rgba(0,0,0,0.05)'), borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
                        <div>
                          <strong style={{ fontSize: '12px', color: 'var(--text-dark)' }}>{grid.label}</strong>
                          <p style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '4px' }}>{grid.desc}</p>
                        </div>
                        {grid.active && <span style={{ fontSize: '8px', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>● OCCUPIED</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="section-title-serif" style={{ fontSize: '18px' }}>Quick Farm Actions</h3>
                  <button onClick={() => alert('Doe milking cycle log saved.')} className="btn-primary" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Log Milk Yield</span>
                  </button>
                  <button onClick={() => alert('Vet check notifications sent.')} className="btn-outline" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Schedule Vet Inspection</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. TRIBEY COFFEE DASHBOARD */}
          {selectedProgram === 'tribey-coffee' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Dark Obsidian Hero */}
              <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(92, 62, 33, 0.9) 100%), url("/coffee_2.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <span className="banner-eyebrow" style={{ color: 'rgba(212,172,13,0.85)' }}>ORGANIC AGROFORESTRY VALUE LOOP</span>
                  <h1 style={{ color: 'white', fontSize: '38px', margin: '6px 0 0 0', fontWeight: 300 }}>TRIBEY COFFEE PROCESSING</h1>
                </div>
              </div>

              {/* Dark metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Coffee Beans</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#f97316' }}>120 kg</h3>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Premium Arabica grade</span>
                </div>
                <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Drying Beds</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--accent-gold)' }}>45 kg</h3>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Moisture content: 12%</span>
                </div>
                <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Roasting Temp</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#fee2e2' }}>210 °C</h3>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Medium dark roast setting</span>
                </div>
                <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Cafe Sales</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#10b981' }}>₹4,250</h3>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Today's register receipts</span>
                </div>
              </div>

              {/* Extra dark metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Grinding Output</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>18 kg</h3>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Coarse filtration grind</span>
                </div>
                <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Packaging Inventory</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>240 units</h3>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Eco pouches ready</span>
                </div>
                <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Active Orders</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>28 orders</h3>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Local + ship logistics</span>
                </div>
                <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Exports Ready</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-gold)' }}>80 kg</h3>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>CSR corporate clients</span>
                </div>
              </div>

              {/* Animated Roasting Timeline & Dark Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
                <div className="os-dark-glass-card">
                  <h3 className="section-title-serif" style={{ fontSize: '18px', color: 'white', marginBottom: '14px' }}>Value chain: Roasting Telemetry</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', width: '100%' }}>
                      {/* Connection Line */}
                      <div style={{ position: 'absolute', top: '16px', left: '10px', right: '10px', height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
                      
                      {/* Progress nodes */}
                      {[
                        { label: 'Raw Beans', active: roastStep === 0 },
                        { label: 'Drying', active: roastStep === 1 },
                        { label: 'Roasting', active: roastStep === 2 },
                        { label: 'Grinding', active: roastStep === 3 },
                        { label: 'Packaging', active: roastStep === 4 }
                      ].map((step, idx) => (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, position: 'relative' }}>
                          <div
                            className={step.active ? "roasting-node" : ""}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: step.active ? '#f97316' : 'rgba(255,255,255,0.15)',
                              border: '1.5px solid ' + (step.active ? 'var(--accent-gold)' : 'transparent'),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              transition: 'all 0.5s'
                            }}
                          >
                            {idx + 1}
                          </div>
                          <span style={{ fontSize: '10px', color: step.active ? 'white' : 'rgba(255,255,255,0.5)', fontWeight: 600, marginTop: '8px' }}>{step.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h3 className="section-title-serif" style={{ fontSize: '18px', color: 'white' }}>Quick Processing</h3>
                  <button onClick={() => alert('Roaster Batch started.')} className="btn-primary" style={{ padding: '14px 20px', background: '#f97316', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span style={{ color: 'white' }}>Start Roasting Batch</span>
                  </button>
                  <button onClick={() => alert('Inventory dispatched to shipping container.')} className="btn-outline" style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span style={{ color: 'white' }}>Dispatch Export Cargo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 6. TASSAR FASHION DASHBOARD */}
          {selectedProgram === 'tassar-fashion' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Golden luxury banner */}
              <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(212, 172, 13, 0.9) 0%, rgba(240, 230, 211, 0.8) 100%), url("/tassar_fashion_2.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px', border: '1px solid rgba(212,172,13,0.3)' }}>
                <div>
                  <span className="banner-eyebrow" style={{ color: 'var(--text-dark)' }}>HERITAGE WEAVING COOPERATIVE</span>
                  <h1 style={{ color: 'var(--text-dark)', fontSize: '38px', margin: '6px 0 0 0', fontWeight: 400, fontFamily: 'var(--font-display)' }}>Tassar Silk Fashion Center</h1>
                </div>
              </div>

              {/* Gold metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 600 }}>Active Looms</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--accent-gold)' }}>8 / 10</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Handloom weavers engaged</span>
                </div>
                <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 600 }}>Silk Production</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>18.2 m / day</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Target: 20m standard output</span>
                </div>
                <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 600 }}>Master Artisans</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-dark)' }}>12 Weavers</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Heritage silk certification</span>
                </div>
                <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 600 }}>Orders Recieved</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--accent-teal)' }}>14 active</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Avg value: ₹18,000</span>
                </div>
              </div>

              {/* Extra gold metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 600 }}>Yarn Fabric Stock</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>85 kg</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Raw cocoon reserve</span>
                </div>
                <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 600 }}>Quality Index</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--rice-green)' }}>99.2%</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Zero defect standard</span>
                </div>
                <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 600 }}>Total Export Value</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>₹22,500</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>CSR client revenue</span>
                </div>
                <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 600 }}>Inventory Valuation</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>₹2,55,000</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Certified organic cocoons</span>
                </div>
              </div>

              {/* Animated weaving progress & Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
                <div className="os-gold-glass-card">
                  <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '16px' }}>Active Weaving Progress Shuttle</h3>
                  <div style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '16px', padding: '24px 28px', border: '1px solid rgba(212,172,13,0.15)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span>Loom 3 Heritage Gold Weft</span>
                      <strong>{weavePosition === 0 ? 'Shuttle Left' : 'Shuttle Right'}</strong>
                    </div>
                    
                    {/* Sliding Shuttle Path */}
                    <div style={{ height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                      <motion.div
                        animate={{ left: `${weavePosition}%` }}
                        transition={{ duration: 2.5, ease: 'easeInOut' }}
                        className="weaving-shuttle"
                        style={{
                          position: 'absolute',
                          width: '18px',
                          height: '8px',
                          background: 'var(--accent-gold)',
                          borderRadius: '4px',
                          boxShadow: '0 0 10px rgba(212,172,13,0.8)'
                        }}
                      />
                    </div>

                    <p style={{ fontSize: '11px', color: 'var(--text-mid)', margin: 0 }}>
                      ● Animated shuttle loop: Loom 3 is weaving natural gold organic silk thread. Weft alignment verified at 99.2% accuracy.
                    </p>
                  </div>
                </div>

                <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="section-title-serif" style={{ fontSize: '18px' }}>Artisan Actions</h3>
                  <button onClick={() => alert('Weaver assigned successfully.')} className="btn-primary" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Assign Loom Task</span>
                  </button>
                  <button onClick={() => alert('Silk inspection report generated.')} className="btn-outline" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span>Trigger Batch Inspection</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 7. TAMARIND GROVE DASHBOARD */}
          {selectedProgram === 'tamarind-grove' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(30, 132, 73, 0.85) 0%, rgba(20, 143, 119, 0.75) 100%), url("/tamarind_grove_1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px' }}>
                <div>
                  <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.8)' }}>AGROFORESTRY FORESTRY CANOPY</span>
                  <h1 style={{ color: 'white', fontSize: '38px', margin: '6px 0 0 0', fontWeight: 300 }}>Tamarind Grove Processing</h1>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card grad-forest" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Tamarind Trees</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--rice-green)' }}>450 trees</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Organic census cataloged</span>
                </div>
                <div className="os-glass-card grad-forest" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Fruit Collected</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>120 kg / week</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Yield: +14% seasonal</span>
                </div>
                <div className="os-glass-card grad-forest" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Drying Area</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--accent-gold)' }}>80 kg</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Desiccation level: 90%</span>
                </div>
                <div className="os-glass-card grad-forest" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Packaging Level</span>
                  <h3 style={{ fontSize: '24px', fontWeight: 600 }}>450 packs</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Vacuum packed stock</span>
                </div>
              </div>

              {/* Extra metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Market Value</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>₹95 / kg</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Regional wholesale index</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Active Workers</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>12 Workers</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Self-help groups registered</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Canopy Health</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--rice-green)' }}>92%</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Leaf indexes monitored</span>
                </div>
                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Storage Capacity</span>
                  <h3 style={{ fontSize: '22px', fontWeight: 600 }}>75%</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Total silos space</span>
                </div>
              </div>

              {/* Orchard Map Grid & Actions */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
                <div className="os-glass-card">
                  <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '12px' }}>Orchard Canopy Harvesting Grid</h3>
                  <div style={{ height: '220px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', padding: '12px' }}>
                    {Array.from({ length: 15 }).map((_, idx) => {
                      const isHarvested = idx % 3 === 0
                      const isReady = idx % 4 === 1
                      return (
                        <div
                          key={idx}
                          style={{
                            background: isHarvested ? 'var(--rice-green)15' : (isReady ? 'var(--accent-gold)15' : 'rgba(255,255,255,0.4)'),
                            border: '1px solid ' + (isHarvested ? 'var(--rice-green)' : (isReady ? 'var(--accent-gold)' : 'rgba(0,0,0,0.05)')),
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{ fontSize: '14px' }}>🌳</span>
                          <span style={{ fontSize: '8px', fontWeight: 700, marginTop: '2px', color: 'var(--text-dark)' }}>G-{idx + 1}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 className="section-title-serif" style={{ fontSize: '18px' }}>Quick Grove Actions</h3>
                  <button onClick={() => alert('Collector crews dispatched to Grid G-4.')} className="btn-primary" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifycontent: 'center', gap: '8px' }}>
                    <span>Dispatch Collectors</span>
                  </button>
                  <button onClick={() => alert('Packaging inventories updated.')} className="btn-outline" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', justifycontent: 'center', gap: '8px' }}>
                    <span>Refill Pack Stock</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  )
}
