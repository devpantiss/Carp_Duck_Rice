import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMap, FiUsers, FiCalendar, FiClock, FiActivity } from 'react-icons/fi'

export default function VisitorsView() {
  const [allocatedGuide, setAllocatedGuide] = useState('')
  const [allocatedTourId, setAllocatedTourId] = useState(null)
  
  const visitorTimeline = [
    { hour: '08:00 AM', count: 18, type: 'Eco Lodge guests' },
    { hour: '09:30 AM', count: 45, type: 'DAV School Bus' },
    { hour: '11:00 AM', count: 28, type: 'Corporate Seminar' },
    { hour: '01:00 PM', count: 12, type: 'Eco Walk Group' },
    { hour: '03:30 PM', count: 32, type: 'Researchers delegation' },
    { hour: '05:00 PM', count: 7, type: 'General entry' }
  ]

  const statistics = [
    { label: 'School Visits', count: 184, percent: 45, color: 'var(--water-mid)', icon: '🎒' },
    { label: 'Corporate Tours', count: 96, percent: 24, color: 'var(--accent-gold)', icon: '💼' },
    { label: 'Conservation Researchers', count: 64, percent: 16, color: 'var(--accent-teal)', icon: '🔬' },
    { label: 'International Eco-tourists', count: 60, percent: 15, color: '#a855f7', icon: '✈️' }
  ]

  const guides = [
    { name: 'Rajesh Mishra', status: 'Idle', language: 'Odia, English, Hindi' },
    { name: 'Priyanka Naik', status: 'Active (DAV Tour)', language: 'Odia, English' },
    { name: 'Amit Pradhan', status: 'Idle', language: 'Odia, Hindi' }
  ]

  const tours = [
    { id: 1, group: 'Dr. Mohanty Group', size: 12, type: 'CSR Tour', guide: 'Unassigned' },
    { id: 2, group: 'DAV Public School', size: 45, type: 'Student Visit', guide: 'Priyanka Naik' },
    { id: 3, group: 'Amlan Sen Delegation', size: 4, type: 'Research Seminar', guide: 'Unassigned' }
  ]

  const handleAllocate = (tourId) => {
    if (!allocatedGuide) {
      alert('Please select a guide first.')
      return
    }
    alert(`Successfully allocated Guide ${allocatedGuide} to tour group!`)
    setAllocatedGuide('')
    setAllocatedTourId(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Immersive Header */}
      <div className="tab-view-header">
        <h2 className="section-title-serif">Visitor Logistics &amp; Eco-Tourism Control</h2>
        <p className="section-desc">Manage registrations, tour schedules, and guest guide allocations across the Livelihood Park.</p>
      </div>

      {/* Stats Row */}
      <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {statistics.map((stat, idx) => (
          <div key={idx} className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>{stat.label}</span>
              <span style={{ fontSize: '16px' }}>{stat.icon}</span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 600 }}>{stat.count} pax</h3>
            <div style={{ height: '4px', background: 'rgba(0,0,0,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${stat.percent}%`, height: '100%', background: stat.color }} />
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>{stat.percent}% of total visitors</span>
          </div>
        ))}
      </div>

      {/* Map & Timeline Grids */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
        
        {/* Heatmap & Interactive maps */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}>
            <FiMap style={{ color: 'var(--accent-gold)' }} /> Demographic &amp; Visitor Heatmaps
          </h3>
          <p className="section-desc" style={{ marginBottom: '16px' }}>Regional visitor registration density map.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* National / State map mock */}
            <div style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', height: '180px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>Country Map (India Yield)</span>
              <svg viewBox="0 0 100 100" style={{ height: '120px', margin: '0 auto' }}>
                <path d="M50,10 L70,30 L80,60 L60,80 L30,80 L15,50 L25,30 Z" fill="rgba(46,134,193,0.12)" stroke="var(--water-mid)" strokeWidth="1" />
                <circle cx="50" cy="50" r="4" fill="red" />
                <circle cx="65" cy="40" r="3" fill="var(--accent-gold)" />
                <circle cx="35" cy="60" r="3.5" fill="var(--accent-teal)" />
              </svg>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', height: '180px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>State Map (Odisha Coordinates)</span>
              <svg viewBox="0 0 100 100" style={{ height: '120px', margin: '0 auto' }}>
                <path d="M20,20 Q60,10 80,40 T50,85 T15,50 Z" fill="rgba(20,143,119,0.12)" stroke="var(--accent-teal)" strokeWidth="1" />
                <circle cx="60" cy="45" r="4" fill="red" />
                <circle cx="35" cy="35" r="3" fill="var(--accent-gold)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Visitor check-in timeline */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '12px' }}>Check-in Timeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '200px', overflowY: 'auto' }}>
            {visitorTimeline.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.3)', padding: '10px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-light)', background: 'rgba(0,0,0,0.04)', padding: '4px 8px', borderRadius: '6px' }}>{item.hour}</span>
                  <div>
                    <span style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>{item.count} pax</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>{item.type}</span>
                  </div>
                </div>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-teal)' }} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Guide Allocation & Pending Bookings */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        
        {/* Pending Bookings & Assign action */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '12px' }}>Eco-Tour Bookings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tours.map((t) => (
              <div key={t.id} style={{ border: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.35)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--text-dark)' }}>{t.group}</strong>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-light)', marginTop: '2px' }}>{t.type} · {t.size} pax</span>
                </div>
                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: t.guide === 'Unassigned' ? 'red' : 'var(--rice-green)', fontWeight: 600 }}>
                    {t.guide}
                  </span>
                  {t.guide === 'Unassigned' && (
                    <button
                      onClick={() => { setAllocatedTourId(t.id); alert('Please select a guide from the Guide Status panel next.'); }}
                      style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--accent-gold)', fontWeight: 700 }}
                    >
                      Assign Guide
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guides Status Directory */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '12px' }}>Tour Guide Directory</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {guides.map((g, idx) => (
              <div key={idx} style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.3)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>{g.name}</h5>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)', display: 'block', marginTop: '2px' }}>Languages: {g.language}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: g.status === 'Idle' ? 'var(--rice-green)' : 'var(--text-light)', background: g.status === 'Idle' ? 'rgba(30,132,73,0.1)' : 'rgba(0,0,0,0.05)', padding: '3px 8px', borderRadius: '20px', textTransform: 'uppercase' }}>
                    {g.status}
                  </span>
                  {allocatedTourId && g.status === 'Idle' && (
                    <button
                      onClick={() => {
                        alert(`Assigned ${g.name} successfully!`);
                        setAllocatedTourId(null);
                      }}
                      style={{ fontSize: '11px', background: 'var(--text-dark)', color: 'white', padding: '4px 10px', borderRadius: '4px' }}
                    >
                      Select
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
