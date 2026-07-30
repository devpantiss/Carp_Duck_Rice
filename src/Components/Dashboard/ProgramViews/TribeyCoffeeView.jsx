import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiShoppingBag, FiLayers, FiActivity } from 'react-icons/fi'
import ProgramIntelligence from '../ProgramIntelligence'

export default function TribeyCoffeeView() {
  const [heatNodeLevel, setHeatNodeLevel] = useState(210)

  useEffect(() => {
    const timer = setInterval(() => {
      setHeatNodeLevel((prev) => +(prev + (Math.random() - 0.5) * 2).toFixed(1))
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const galleryImages = [
    '/coffee_1.jpg',
    '/coffee_2.jpg',
    '/coffee_3.jpg',
    '/coffee_4.jpg'
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Dark Hero */}
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(92, 62, 33, 0.9) 100%), url("/coffee_2.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <span className="banner-eyebrow" style={{ color: 'var(--accent-gold)', letterSpacing: '0.2em' }}>ARABICA ESTATE VALUE LOOP</span>
          <h1 style={{ color: 'white', fontSize: '38px', margin: '4px 0 0 0', fontWeight: 300, fontFamily: 'var(--font-display)' }}>TRIBEY COFFEE PROCESSING</h1>
        </div>
      </div>

      {/* Grid of metrics in Obsidian Dark Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        
        {/* Left Column: Roaster and inventory */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="os-dark-glass-card">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>Beans Stock</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: '#f97316', margin: '4px 0' }}>120 kg</h4>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Premium Arabica grade</span>
            </div>

            <div className="os-dark-glass-card">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>Drying Beds</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-gold)', margin: '4px 0' }}>45 kg</h4>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Moisture content: 12%</span>
            </div>

            <div className="os-dark-glass-card">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>Roasting Temperature</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: '#fee2e2', margin: '4px 0' }}>{heatNodeLevel} °C</h4>
              <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>Medium dark setting</span>
            </div>
          </div>

          {/* Roasting temperature curve */}
          <div className="os-dark-glass-card">
            <h3 className="section-title-serif" style={{ fontSize: '18px', color: 'white', marginBottom: '8px' }}>Active Roaster Temperature Profile</h3>
            <p className="section-desc" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '14px' }}>Real-time temperature feedback from drum sensors.</p>
            <div style={{ position: 'relative', height: '100px', width: '100%' }}>
              <svg viewBox="0 0 300 80" style={{ width: '100%', height: '100%' }}>
                <path d="M 10 70 Q 60 50 120 30 T 220 28 T 290 10" fill="none" stroke="#f97316" strokeWidth="2.5" />
                <circle cx="220" cy="28" r="4" fill="white" className="roasting-node" />
                <text x="220" y="55" textAnchor="middle" style={{ fontSize: '9px', fill: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{heatNodeLevel}°C (Drum B)</text>
              </svg>
            </div>
          </div>

        </div>

        {/* Right column: actions and exports */}
        <div className="os-dark-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="section-title-serif" style={{ fontSize: '18px', color: 'white', margin: 0 }}>Roaster Commands</h3>
          <button onClick={() => alert('Roasting drum heaters activated.')} className="btn-primary" style={{ padding: '14px 20px', background: '#f97316', color: 'white', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span style={{ color: 'white' }}>Start Roasting Batch</span>
          </button>
          <button onClick={() => alert('Shipping documents approved.')} className="btn-outline" style={{ padding: '12px 18px', border: '1px solid rgba(255,255,255,0.2)', color: 'white', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span style={{ color: 'white' }}>Dispatch Shipping Cargo</span>
          </button>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', fontSize: '11.5px', color: 'rgba(255,255,255,0.5)' }}>
            <strong>Export &amp; Orders</strong>
            <p style={{ color: 'rgba(255,255,255,0.3)', marginTop: '4px', fontSize: '10.5px', lineHeight: '1.4' }}>
              Pending shipping: 80 kg cargo.<br />
              Cafe receipts yield: ₹4,250.
            </p>
          </div>
        </div>

      </div>

      <ProgramIntelligence program="coffee" />

      {/* Gallery preview */}
      <div className="os-dark-glass-card">
        <h3 className="section-title-serif" style={{ fontSize: '18px', color: 'white', marginBottom: '14px' }}>Plantation Gallery Preview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {galleryImages.map((src, i) => (
            <div key={i} style={{ height: '110px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src={src} alt="Coffee plantation gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="gallery-hover-zoom" />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
