import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiZap, FiHeart, FiTrendingUp } from 'react-icons/fi'
import ProgramIntelligence from '../ProgramIntelligence'

export default function PoultryReserveView() {
  const [nestAlert, setNestAlert] = useState(false)

  const galleryImages = [
    '/images/programs/mega-poultry-1.jpg',
    '/images/programs/mega-poultry-2.jpg',
    '/images/programs/mega-poultry-3.jpg',
    '/images/programs/mega-poultry-4.jpg'
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Hero */}
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(20, 143, 119, 0.85) 0%, rgba(30, 132, 73, 0.75) 100%), url("/images/programs/mega-poultry-1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px' }}>
        <div>
          <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2em' }}>POULTRY &amp; WETLAND RESOURCE LOOP</span>
          <h1 style={{ color: 'white', fontSize: '38px', margin: '4px 0 0 0', fontWeight: 300, fontFamily: 'var(--font-display)' }}>The Poultry Reserve Command</h1>
        </div>
      </div>

      {/* Grid structure */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        
        {/* Left column: environmental indices and nesting */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="os-glass-card grad-teal">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Duck Count</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-teal)', margin: '4px 0' }}>850 pax</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Khaki Campbell breed</span>
            </div>

            <div className="os-glass-card grad-teal">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Egg Production</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-dark)', margin: '4px 0' }}>380 / day</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Yield efficiency: 92%</span>
            </div>

            <div className="os-glass-card grad-teal">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Nesting Health</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--rice-green)', margin: '4px 0' }}>94 %</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Active monitors normal</span>
            </div>
          </div>

          {/* Incubation status */}
          <div className="os-glass-card">
            <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '8px' }}>Incubation &amp; Hatch Schedules</h3>
            <p className="section-desc" style={{ marginBottom: '14px' }}>Active climate control chambers status log.</p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'rgba(255,255,255,0.4)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.04)' }}>
              <svg className="radial-svg" viewBox="0 0 36 36" style={{ width: '60px', height: '60px' }}>
                <circle className="circle-bg" cx="18" cy="18" r="16" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="2" />
                <circle className="circle-fill" cx="18" cy="18" r="16" fill="none" stroke="var(--accent-teal)" strokeWidth="3.2" strokeDasharray="75, 100" />
              </svg>
              <div>
                <strong style={{ fontSize: '13.5px', color: 'var(--text-dark)' }}>Chamber 2 (Incubation Active)</strong>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-light)', marginTop: '2px' }}>45 eggs nested · Estimated hatch in 8 days</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right column: actions and water quality */}
        <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="section-title-serif" style={{ fontSize: '18px', margin: 0 }}>Reserve Operations</h3>
          <button onClick={() => alert('Daily egg collection logged.')} className="btn-primary" style={{ padding: '14px 20px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Record Egg Collection</span>
          </button>
          <button onClick={() => alert('Wetland sanitization cycles scheduled.')} className="btn-outline" style={{ padding: '12px 18px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Schedule Sanitization</span>
          </button>

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '14px', fontSize: '11.5px', color: 'var(--text-mid)' }}>
            <strong>Wetland Water Quality</strong>
            <p style={{ color: 'var(--text-light)', marginTop: '4px', fontSize: '10.5px', lineHeight: '1.4' }}>
              Water index: Good.<br />
              Vaccination rate: 100% compliant.
            </p>
          </div>
        </div>

      </div>

      <ProgramIntelligence program="poultry" />

      {/* Gallery preview */}
      <div className="os-glass-card">
        <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '14px' }}>Poultry Reserve Gallery</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {galleryImages.map((src, i) => (
            <div key={i} style={{ height: '110px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
              <img loading="lazy" decoding="async" src={src} alt="Poultry reserve gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="gallery-hover-zoom" />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
