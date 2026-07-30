import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSun, FiMap, FiHeart, FiTrendingUp } from 'react-icons/fi'
import ProgramIntelligence from '../ProgramIntelligence'

export default function GuavasAcreRiseView() {
  const [selectedGrid, setSelectedGrid] = useState(null)
  
  const galleryImages = [
    '/guavas_1.jpg',
    '/guavas_2.jpg',
    '/guavas_3.jpg',
    '/guavas_4.jpg'
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Hero */}
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(30, 132, 73, 0.9) 0%, rgba(212, 172, 13, 0.75) 100%), url("/guavas_1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px' }}>
        <div>
          <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2em' }}>FRUIT ORCHARD &amp; AGROFORESTRY LOOP</span>
          <h1 style={{ color: 'white', fontSize: '38px', margin: '4px 0 0 0', fontWeight: 300, fontFamily: 'var(--font-display)' }}>Guavas AcreRise Operations</h1>
        </div>
      </div>

      {/* Grid of indicators */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        
        {/* Left Column: Orchard Grid and Ripening stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="os-glass-card grad-forest">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-dark)', fontWeight: 700 }}>Soil Moisture</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--rice-green)', margin: '4px 0' }}>44.2 %</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Automatic irrigation sync</span>
            </div>

            <div className="os-glass-card grad-forest">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Ripening Stage</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-gold)', margin: '4px 0' }}>Late Vegetative</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Harvest ready in 3 weeks</span>
            </div>

            <div className="os-glass-card grad-forest">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Workers Active</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-dark)', margin: '4px 0' }}>8 Collectors</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Self-help group assignment</span>
            </div>
          </div>

          {/* Interactive grid */}
          <div className="os-glass-card">
            <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '8px' }}>Orchard Quadrant Status</h3>
            <p className="section-desc" style={{ marginBottom: '14px' }}>Select an orchard grid quadrant to view canopy parameters.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {['Grid A-1 (Ripening)', 'Grid A-2 (Weeded)', 'Grid B-1 (Fertilized)', 'Grid B-2 (Irrigated)'].map((quad, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedGrid(quad)}
                  style={{
                    background: selectedGrid === quad ? 'rgba(30,132,73,0.12)' : 'rgba(255,255,255,0.4)',
                    border: '1px solid ' + (selectedGrid === quad ? 'var(--rice-green)' : 'rgba(0,0,0,0.05)'),
                    padding: '16px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>🍈</span>
                  <strong style={{ display: 'block', fontSize: '11px', marginTop: '6px', color: 'var(--text-dark)' }}>{quad.split(' ')[0]} {quad.split(' ')[1]}</strong>
                  <span style={{ fontSize: '9px', color: 'var(--text-light)', display: 'block', marginTop: '2px' }}>{quad.split(' ')[2]}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Actions and timeline info */}
        <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="section-title-serif" style={{ fontSize: '18px', margin: 0 }}>Harvest Actions</h3>
          <button onClick={() => alert('Drip line valve synchronized.')} className="btn-primary" style={{ padding: '14px 20px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Toggle Drip Irrigation</span>
          </button>
          <button onClick={() => alert('Refill order requested for bio-fertilizers.')} className="btn-outline" style={{ padding: '12px 18px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Order Bio-Fertilizers</span>
          </button>
          
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '14px', fontSize: '11.5px', color: 'var(--text-mid)' }}>
            <strong>Harvest Forecast Details</strong>
            <p style={{ color: 'var(--text-light)', marginTop: '4px', fontSize: '10.5px', lineHeight: '1.4' }}>
              Expected harvesting date: Nov 12.<br />
              Estimated orchard weight: 1.2 Tons.
            </p>
          </div>
        </div>

      </div>

      <ProgramIntelligence program="guavas" />

      {/* Gallery preview */}
      <div className="os-glass-card">
        <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '14px' }}>Orchard Gallery Preview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {galleryImages.map((src, i) => (
            <div key={i} style={{ height: '110px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
              <img src={src} alt="Guava orchard gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="gallery-hover-zoom" />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
