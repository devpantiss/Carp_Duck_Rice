import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiCloudRain, FiActivity } from 'react-icons/fi'
import ProgramIntelligence from '../ProgramIntelligence'

export default function TamarindGroveView() {
  const [activeGrove, setActiveGrove] = useState('Sector Alpha')

  const galleryImages = [
    '/tamarind_grove_1.jpg',
    '/tamarind_grove_2.jpg',
    '/tamarind_grove_3.jpg',
    '/tamarind_grove_4.jpg'
  ]

  const sectors = [
    { name: 'Sector Alpha', trees: 150, condition: 'Optimal (94%)' },
    { name: 'Sector Beta', trees: 180, condition: 'Optimal (90%)' },
    { name: 'Sector Gamma', trees: 120, condition: 'Fallow Maintenance' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Hero */}
      <div className="welcome-banner" style={{ background: 'linear-gradient(135deg, rgba(30, 132, 73, 0.9) 0%, rgba(20, 143, 119, 0.75) 100%), url("/tamarind_grove_1.jpg") no-repeat center center / cover', height: '220px', display: 'flex', alignItems: 'flex-end', padding: '36px' }}>
        <div>
          <span className="banner-eyebrow" style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.2em' }}>FOREST ECOLOGY &amp; VALUE CHAIN</span>
          <h1 style={{ color: 'white', fontSize: '38px', margin: '4px 0 0 0', fontWeight: 300, fontFamily: 'var(--font-display)' }}>Tamarind Grove Conservation</h1>
        </div>
      </div>

      {/* Grid of details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        
        {/* Left column: environmental indices and tree counts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="os-glass-card grad-forest">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Canopy Census</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--rice-green)', margin: '4px 0' }}>450 Trees</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Organic catalog indexed</span>
            </div>

            <div className="os-glass-card grad-forest">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Canopy Health</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--accent-teal)', margin: '4px 0' }}>92.5 %</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>Leaf indices balanced</span>
            </div>

            <div className="os-glass-card grad-forest">
              <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700 }}>Fruit Collector</span>
              <h4 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-dark)', margin: '4px 0' }}>12 Workers</h4>
              <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>SHG crew assignees</span>
            </div>
          </div>

          {/* Interactive Grove Layouts */}
          <div className="os-glass-card">
            <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '8px' }}>Grove Canopy Sectors</h3>
            <p className="section-desc" style={{ marginBottom: '14px' }}>Select a canopy sector grid to view environmental factors.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sectors.map((sec, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveGrove(sec.name)}
                  style={{
                    background: activeGrove === sec.name ? 'rgba(30,132,73,0.12)' : 'rgba(255,255,255,0.4)',
                    border: '1px solid ' + (activeGrove === sec.name ? 'var(--rice-green)' : 'rgba(0,0,0,0.05)'),
                    padding: '14px 18px',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '12.5px', color: 'var(--text-dark)' }}>{sec.name}</strong>
                    <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-light)', marginTop: '2px' }}>{sec.trees} Active Trees</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--rice-green)', fontWeight: 700 }}>{sec.condition}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: actions and inventory status */}
        <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="section-title-serif" style={{ fontSize: '18px', margin: 0 }}>Grove Operations</h3>
          <button onClick={() => alert('Harvest crew dispatched to Active grids.')} className="btn-primary" style={{ padding: '14px 20px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Dispatch Harvesting Crew</span>
          </button>
          <button onClick={() => alert('Drying racks synchronized.')} className="btn-outline" style={{ padding: '12px 18px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <span>Calibrate Drying Beds</span>
          </button>
          
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '14px', fontSize: '11.5px', color: 'var(--text-mid)' }}>
            <strong>Dry Pulp Inventory</strong>
            <p style={{ color: 'var(--text-light)', marginTop: '4px', fontSize: '10.5px', lineHeight: '1.4' }}>
              Current stock: 80 kg dry pulp.<br />
              Packaging level: 450 vacuum packs.
            </p>
          </div>
        </div>

      </div>

      <ProgramIntelligence program="tamarind" />

      {/* Grove Gallery preview */}
      <div className="os-glass-card">
        <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '14px' }}> Grove Canopy Gallery</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {galleryImages.map((src, i) => (
            <div key={i} style={{ height: '110px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)' }}>
              <img src={src} alt="Tamarind grove gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="gallery-hover-zoom" />
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
