import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiLayers, FiActivity } from 'react-icons/fi'
import ProgramIntelligence from '../ProgramIntelligence'

export default function TassarFashionView() {
  const [shuttlePosition, setShuttlePosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setShuttlePosition((prev) => (prev === 0 ? 100 : 0))
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const galleryImages = [
    '/images/programs/tassar-fashion-1.jpg',
    '/images/programs/tassar-fashion-2.jpg',
    '/images/programs/tassar-fashion-3.jpg',
    '/images/programs/tassar-fashion-4.jpg'
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Hero */}
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(212, 172, 13, 0.9) 0%, rgba(240, 230, 211, 0.8) 100%), url("/images/programs/tassar-fashion-1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px', border: '1px solid rgba(212,172,13,0.25)' }}>
        <div>
          <span className="banner-eyebrow" style={{ color: 'var(--text-dark)', letterSpacing: '0.2em' }}>HERITAGE WEAVING VALUE CHAIN</span>
          <h1 style={{ color: 'var(--text-dark)', fontSize: '38px', margin: '4px 0 0 0', fontWeight: 300, fontFamily: 'var(--font-display)' }}>Tassar Silk Fashion Center</h1>
        </div>
      </div>

      {/* Grid of metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        
        {/* Left column: Loom indices and shuttle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="os-gold-glass-card">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 700 }}>Active Looms</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-gold)', margin: '4px 0' }}>8 / 10 Looms</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Handloom weavers engaged</span>
            </div>

            <div className="os-gold-glass-card">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 700 }}>Daily Weaving</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-dark)', margin: '4px 0' }}>18.2 Meters</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Fine gold borders style</span>
            </div>

            <div className="os-gold-glass-card">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-mid)', fontWeight: 700 }}>Artisans Census</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-teal)', margin: '4px 0' }}>12 Weavers</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Certified heritage weavers</span>
            </div>
          </div>

          {/* Animated Shuttle Board */}
          <div className="os-gold-glass-card" style={{ background: 'rgba(255, 255, 255, 0.55)' }}>
            <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '8px' }}>Active Weft Warp Tension</h3>
            <p className="section-desc" style={{ marginBottom: '16px' }}>Monitoring automated shuttle runs on Loom Grid 3.</p>
            
            <div style={{ height: '80px', background: 'rgba(0,0,0,0.03)', borderRadius: '12px', position: 'relative', overflow: 'hidden', padding: '10px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-mid)' }}>Gold Silk Borders Weave</span>
                <strong style={{ color: 'var(--accent-gold)' }}>{shuttlePosition === 0 ? 'Shuttle Left' : 'Shuttle Right'}</strong>
              </div>
              <div style={{ height: '6px', width: '100%', background: 'rgba(0,0,0,0.06)', borderRadius: '3px', position: 'relative' }}>
                <motion.div
                  animate={{ left: `${shuttlePosition}%` }}
                  transition={{ duration: 2.8, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute',
                    top: '-3px',
                    width: '14px',
                    height: '12px',
                    background: 'var(--accent-gold)',
                    borderRadius: '4px',
                    boxShadow: '0 0 10px rgba(212,172,13,0.8)'
                  }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right column: actions and inventory checks */}
        <div className="os-gold-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="section-title-serif" style={{ fontSize: '18px', margin: 0 }}>Artisan Operations</h3>
          <button onClick={() => alert('New weaving task allocated.')} className="btn-primary" style={{ padding: '14px 20px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Assign Loom Task</span>
          </button>
          <button onClick={() => alert('Batch quality indices certified.')} className="btn-outline" style={{ padding: '12px 18px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Verify Batch Quality</span>
          </button>
          
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '14px', fontSize: '11.5px', color: 'var(--text-mid)' }}>
            <strong>Textile Inventory</strong>
            <p style={{ color: 'var(--text-light)', marginTop: '4px', fontSize: '10.5px', lineHeight: '1.4' }}>
              Raw yarn cocoons: 85 kg stock.<br />
              Quality index verified at 99.2%.
            </p>
          </div>
        </div>

      </div>

      <ProgramIntelligence program="tassar" />

      {/* Gallery preview */}
      <div className="os-gold-glass-card">
        <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '14px' }}>Textile Gallery Preview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {galleryImages.map((src, i) => (
            <div key={i} style={{ height: '110px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212,172,13,0.15)' }}>
              <img loading="lazy" decoding="async" src={src} alt="Silk fashion gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="gallery-hover-zoom" />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
