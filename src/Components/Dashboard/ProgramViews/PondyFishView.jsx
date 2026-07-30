import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { FiDroplet, FiZap, FiActivity, FiMapPin, FiTrendingUp } from 'react-icons/fi'
import ProgramIntelligence from '../ProgramIntelligence'

export default function PondyFishView() {
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    const generatedBubbles = Array.from({ length: 12 }).map((_, idx) => ({
      id: idx,
      size: Math.random() * 12 + 4,
      left: Math.random() * 95,
      delay: Math.random() * 4,
      duration: Math.random() * 5 + 4
    }))
    setBubbles(generatedBubbles)
  }, [])

  const galleryImages = [
    '/pondy_fish_1.jpg',
    '/pondy_fish_2.jpg',
    '/pondy_fish_3.jpg',
    '/pondy_fish_4.jpg'
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative' }}>
      
      {/* Background bubbles overlay */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
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
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(26, 82, 118, 0.9) 0%, rgba(46, 134, 193, 0.75) 100%), url("/pondy_fish_1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px', zIndex: 1 }}>
        <div>
          <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2em' }}>PONDY COOPERATIVE loop</span>
          <h1 style={{ color: 'white', fontSize: '38px', margin: '4px 0 0 0', fontWeight: 300, fontFamily: 'var(--font-display)' }}>Aquaculture &amp; Living Water Telemetry</h1>
        </div>
      </div>

      {/* Widgets & Gauges Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', zIndex: 1 }}>
        
        {/* Telemetry metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="os-glass-card grad-water" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ background: 'rgba(46,134,193,0.15)', color: 'var(--water-mid)', borderRadius: '12px', padding: '12px', display: 'flex' }}>
                <FiDroplet style={{ fontSize: '24px' }} />
              </div>
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Water Level</span>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--water-dark)', margin: '2px 0' }}>1.42 m</h3>
                <span style={{ fontSize: '9.5px', color: 'var(--text-light)' }}>Optimal index: 1.2 - 1.6m</span>
              </div>
            </div>

            <div className="os-glass-card grad-water" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ background: 'rgba(20,143,119,0.15)', color: 'var(--accent-teal)', borderRadius: '12px', padding: '12px', display: 'flex' }}>
                <FiActivity style={{ fontSize: '24px' }} />
              </div>
              <div>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Dissolved Oxygen</span>
                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-teal)', margin: '2px 0' }}>6.5 mg/L</h3>
                <span style={{ fontSize: '9.5px', color: 'var(--text-light)' }}>Biological aerator active</span>
              </div>
            </div>
          </div>

          {/* Additional statistics */}
          <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 className="section-title-serif" style={{ fontSize: '18px', margin: 0 }}>Weekly pH Telemetry</h3>
            {/* Custom line plot */}
            <div style={{ position: 'relative', height: '100px', width: '100%' }}>
              <svg viewBox="0 0 300 80" style={{ width: '100%', height: '100%' }}>
                <path d="M 10 60 Q 60 40 120 50 T 220 20 T 290 10" fill="none" stroke="var(--water-mid)" strokeWidth="2.5" />
                <circle cx="120" cy="50" r="3.5" fill="var(--water-dark)" />
                <text x="120" y="70" textAnchor="middle" style={{ fontSize: '8px', fill: 'var(--text-light)' }}>pH: 7.25 (Neutral)</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Quick actions & illustration map */}
        <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="section-title-serif" style={{ fontSize: '18px', margin: 0 }}>Mechanical Ripple controls</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="/dashboard/powerbi/pondy-fish"
              className="btn-primary"
              style={{
                padding: '12px 18px',
                width: '100%',
                display: 'flex',
                justify: 'center',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #1a5276 0%, #2e86c1 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 700,
                borderRadius: '10px'
              }}
            >
              <span>📊 OPEN POWERBI DASHBOARD</span>
            </a>
            <button onClick={() => alert('Water flow recycle synchronized.')} className="btn-outline" style={{ padding: '10px 18px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <span>Trigger Water Aerators</span>
            </button>
            <button onClick={() => alert('Harvest log compiled.')} className="btn-outline" style={{ padding: '10px 18px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <span>Schedule Biomass Harvest</span>
            </button>
          </div>
          
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '14px', fontSize: '11.5px', color: 'var(--text-mid)' }}>
            <strong>Recent Activity</strong>
            <p style={{ color: 'var(--text-light)', marginTop: '4px', fontSize: '10.5px' }}>
              ● 08:30 AM: 180 units Carp harvested from Pond Alpha.
            </p>
          </div>
        </div>

      </div>

      {/* Showcase Photo Gallery */}
      <div className="os-glass-card" style={{ zIndex: 1 }}>
        <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '14px' }}>Aquaculture Gallery Preview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {galleryImages.map((src, i) => (
            <div key={i} style={{ height: '110px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
              <img src={src} alt="Pondy fish gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="gallery-hover-zoom" />
            </div>
          ))}
        </div>
      </div>

      <ProgramIntelligence program="pondy" />

      <style>{`
        .gallery-hover-zoom:hover {
          transform: scale(1.08);
        }
      `}</style>

    </div>
  )
}
