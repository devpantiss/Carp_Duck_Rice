import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiActivity, FiShield, FiHeart, FiTrendingUp } from 'react-icons/fi'
import ProgramIntelligence from '../ProgramIntelligence'

export default function GoatsView() {
  const [activePaddock, setActivePaddock] = useState('Paddock 2')
  
  const galleryImages = [
    '/images/programs/goats-1.jpg',
    '/images/programs/goats-2.jpg',
    '/images/programs/goats-3.jpg',
    '/images/programs/goats-4.jpg'
  ]

  const paddocks = [
    { name: 'Paddock 1', status: 'Fallow / Seeding', active: false },
    { name: 'Paddock 2', status: 'Grazing Doe Herd', active: true },
    { name: 'Paddock 3', status: 'Kids Play Paddock', active: true },
    { name: 'Paddock 4', status: 'Sanitization Cycle', active: false }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Hero */}
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(120, 66, 18, 0.9) 0%, rgba(212, 172, 13, 0.75) 100%), url("/images/programs/goats-1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px' }}>
        <div>
          <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2em' }}>MOUNTAIN PASTURE &amp; HERITAGE COOPERATIVE</span>
          <h1 style={{ color: 'white', fontSize: '38px', margin: '4px 0 0 0', fontWeight: 300, fontFamily: 'var(--font-display)' }}>Eastern Ghats Goats Hub</h1>
        </div>
      </div>

      {/* Grid structure */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        
        {/* Left Column: paddock map and metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="os-glass-card grad-gold">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Census Count</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--reed-brown)', margin: '4px 0' }}>161 units</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>24 Bucks · 92 Does · 45 Kids</span>
            </div>

            <div className="os-glass-card grad-gold">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Doe Pregnancies</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-gold)', margin: '4px 0' }}>12 Does</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Special vet checks active</span>
            </div>

            <div className="os-glass-card grad-gold">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Daily Milking</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-dark)', margin: '4px 0' }}>28 Liters</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Cheese loops supply</span>
            </div>
          </div>

          {/* Pasture mapping */}
          <div className="os-glass-card">
            <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '8px' }}>Active Grazing Paddock Layouts</h3>
            <p className="section-desc" style={{ marginBottom: '14px' }}>Select an active pasture boundary to view herd indices.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {paddocks.map((pad, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePaddock(pad.name)}
                  style={{
                    background: activePaddock === pad.name ? 'rgba(212,172,13,0.12)' : 'rgba(255,255,255,0.4)',
                    border: '1px solid ' + (activePaddock === pad.name ? 'var(--accent-gold)' : 'rgba(0,0,0,0.05)'),
                    padding: '16px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '12px', color: 'var(--text-dark)' }}>{pad.name}</strong>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)', display: 'block', marginTop: '4px' }}>{pad.status}</span>
                  {pad.active && <span style={{ fontSize: '8px', color: 'var(--accent-gold)', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginTop: '8px' }}>● HERD LOCATED</span>}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: actions and health check */}
        <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="section-title-serif" style={{ fontSize: '18px', margin: 0 }}>Pasture Actions</h3>
          <a
            href="/dashboard/powerbi/easternghats-goat"
            className="btn-primary"
            style={{
              padding: '14px 20px',
              width: '100%',
              display: 'flex',
              justify: 'center',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #784212 0%, #d4ac0d 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: '10px'
            }}
          >
            <span>📊 OPEN POWERBI DASHBOARD</span>
          </a>
          <button onClick={() => alert('Doe milking collection recorded.')} className="btn-outline" style={{ padding: '12px 18px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Record Milking Yield</span>
          </button>
          <button onClick={() => alert('Vet checklist dispatched.')} className="btn-outline" style={{ padding: '12px 18px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Request Vet Dispatch</span>
          </button>

          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '14px', fontSize: '11.5px', color: 'var(--text-mid)' }}>
            <strong>Herd Health index</strong>
            <p style={{ color: 'var(--text-light)', marginTop: '4px', fontSize: '10.5px', lineHeight: '1.4' }}>
              Overall index: 98.2%.<br />
              Vaccination schedule is 100% compliant.
            </p>
          </div>
        </div>

      </div>

      <ProgramIntelligence program="goats" />

      {/* Gallery preview */}
      <div className="os-glass-card">
        <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '14px' }}>Pasture Gallery Preview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {galleryImages.map((src, i) => (
            <div key={i} style={{ height: '110px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
              <img loading="lazy" decoding="async" src={src} alt="Goat pasture gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="gallery-hover-zoom" />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
