import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrendingUp, FiCloudRain, FiDroplet, FiUsers, FiCompass, FiZap, FiCpu } from 'react-icons/fi'

export default function AnalyticsView() {
  const [activeSubTab, setActiveSubTab] = useState('revenue')

  const subTabs = [
    { id: 'revenue', label: 'Revenue Yield', icon: <FiTrendingUp /> },
    { id: 'ecology', label: 'Ecology Cycles', icon: <FiCompass /> },
    { id: 'weather', label: 'Weather Telemetry', icon: <FiCloudRain /> },
    { id: 'water', label: 'Water Quality', icon: <FiDroplet /> },
    { id: 'visitors', label: 'Visitor Volume', icon: <FiUsers /> },
    { id: 'programs', label: 'Program Yields', icon: <FiCpu /> },
    { id: 'wildlife', label: 'Wildlife Indices', icon: <FiZap /> }
  ]

  // Dynamic Chart Paths based on selected subTab
  const chartPaths = {
    revenue: "M 50 140 Q 120 110 190 130 T 330 50 T 450 30",
    ecology: "M 50 80 Q 120 120 190 70 T 330 110 T 450 60",
    weather: "M 50 150 Q 120 140 190 120 T 330 90 T 450 70",
    water: "M 50 60 Q 120 70 190 60 T 330 65 T 450 55",
    visitors: "M 50 160 Q 120 110 190 120 T 330 40 T 450 60",
    programs: "M 50 120 Q 120 90 190 110 T 330 60 T 450 40",
    wildlife: "M 50 90 Q 120 80 190 95 T 330 70 T 450 80"
  }

  const chartFillPaths = {
    revenue: "M 50 140 Q 120 110 190 130 T 330 50 T 450 30 L 450 180 L 50 180 Z",
    ecology: "M 50 80 Q 120 120 190 70 T 330 110 T 450 60 L 450 180 L 50 180 Z",
    weather: "M 50 150 Q 120 140 190 120 T 330 90 T 450 70 L 450 180 L 50 180 Z",
    water: "M 50 60 Q 120 70 190 60 T 330 65 T 450 55 L 450 180 L 50 180 Z",
    visitors: "M 50 160 Q 120 110 190 120 T 330 40 T 450 60 L 450 180 L 50 180 Z",
    programs: "M 50 120 Q 120 90 190 110 T 330 60 T 450 40 L 450 180 L 50 180 Z",
    wildlife: "M 50 90 Q 120 80 190 95 T 330 70 T 450 80 L 450 180 L 50 180 Z"
  }

  // Mini metrics specific to active tab
  const getSubMetrics = () => {
    switch (activeSubTab) {
      case 'revenue':
        return [
          { title: 'Yield Growth', value: '+18.4%', label: 'Year-on-year increase' },
          { title: 'Bookings share', value: '38%', label: 'Seminars + lodges' },
          { title: 'Average Ticket', value: '₹140', label: 'Direct park entry' }
        ]
      case 'ecology':
        return [
          { title: 'Recycle Rate', value: '98.4%', label: 'Closed loops balanced' },
          { title: 'Solar Harvesting', value: '92%', label: 'Battery buffer normal' },
          { title: 'Soil Nitrogen', value: 'Optimal', label: 'Wetland agricultural grid' }
        ]
      case 'weather':
        return [
          { title: 'Ambient Temp', value: '32°C', label: 'Average peak' },
          { title: 'Relative Humidity', value: '78%', label: 'Optimal moisture' },
          { title: 'Wind Speed', value: '12 km/h', label: 'Direction: East' }
        ]
      case 'water':
        return [
          { title: 'Neutral pH', value: '7.2', label: 'Pond ecosystem buffer' },
          { title: 'Dissolved Oxygen', value: '6.5 mg/L', label: 'Mechanical aerators run' },
          { title: 'Rain Collection', value: '82%', label: 'Harvest storage grids' }
        ]
      case 'visitors':
        return [
          { title: 'pax Check-ins', value: '142', label: 'Direct entries today' },
          { title: 'Avg Lodging Time', value: '4.2 hrs', label: 'Ecosystem paths engagement' },
          { title: 'CSR Seminars', value: '4 active', label: 'Scheduled this week' }
        ]
      case 'programs':
        return [
          { title: 'Pondy Fish Growth', value: '+14%', label: 'Biomass index' },
          { title: 'Loom Engagement', value: '8 / 10', label: 'Active weaving weavers' },
          { title: 'Coffee Drying', value: '45 kg', label: 'Moisture target: 12%' }
        ]
      case 'wildlife':
        return [
          { title: 'Wetland Birds Count', value: '850', label: 'Live bird migration indexes' },
          { title: 'Migratory Nests', value: '120+', label: 'Poultry reserve records' },
          { title: 'Micro-fauna index', value: '96%', label: 'Canopy health sensor balance' }
        ]
      default:
        return []
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div className="tab-view-header">
        <h2 className="section-title-serif">Ecosystem Telemetry &amp; Analytics</h2>
        <p className="section-desc">Real-time parameters, historical telemetry curves, and AI forecast projections across sectors.</p>
      </div>

      {/* Sliding Sub-tabs Selector */}
      <div style={{ display: 'flex', overflowX: 'auto', background: 'rgba(0, 0, 0, 0.04)', padding: '4px', borderRadius: '16px', gap: '4px', width: 'max-content', maxWidth: '100%', scrollbarWidth: 'none' }}>
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                color: isActive ? 'var(--text-dark)' : 'var(--text-light)',
                position: 'relative',
                background: 'none',
                transition: 'color 0.3s'
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="analyticsSubTabPill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '12px',
                    background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(0,0,0,0.02)',
                    zIndex: 0
                  }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '6px' }}>
                {tab.icon}
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Main Plot Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '28px' }}>
        
        {/* SVG Line Graph */}
        <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="section-title-serif" style={{ fontSize: '18px', margin: 0 }}>Historical Telemetry Curve</h3>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.05em' }}>
              🔴 Real-time index curves
            </span>
          </div>

          <div className="chart-wrapper" style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(0,0,0,0.04)', borderRadius: '16px', padding: '20px' }}>
            <AnimatePresence mode="wait">
              <motion.svg
                key={activeSubTab}
                viewBox="0 0 500 200"
                width="100%"
                height="200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <defs>
                  <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--water-light)" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="var(--water-light)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal reference lines */}
                <line x1="50" y1="40" x2="450" y2="40" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="5 5" />
                <line x1="50" y1="90" x2="450" y2="90" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="5 5" />
                <line x1="50" y1="140" x2="450" y2="140" stroke="rgba(0,0,0,0.03)" strokeWidth="1" strokeDasharray="5 5" />

                {/* Fill Path */}
                <path d={chartFillPaths[activeSubTab]} fill="url(#analyticsGrad)" />
                
                {/* Line Path */}
                <motion.path
                  d={chartPaths[activeSubTab]}
                  fill="none"
                  stroke="var(--water-mid)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                {/* Points */}
                <circle cx="50" cy="90" r="4.5" fill="var(--water-dark)" />
                <circle cx="120" cy="110" r="4.5" fill="var(--water-dark)" />
                <circle cx="190" cy="70" r="4.5" fill="var(--water-dark)" />
                <circle cx="330" cy="100" r="4.5" fill="var(--water-dark)" />
                <circle cx="450" cy="50" r="4.5" fill="var(--water-dark)" />
              </motion.svg>
            </AnimatePresence>
            
            <div className="chart-labels">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Heatmap intensity grid representing the 7 sectors */}
        <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 className="section-title-serif" style={{ fontSize: '18px' }}>Ecosystem Sector Heatmap</h3>
          <p className="section-desc">Activity intensity levels detected by environmental micro-sensors.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {[
              { id: 1, level: '96%', label: 'Pond A', status: 'optimal' },
              { id: 2, level: '85%', label: 'Pond B', status: 'optimal' },
              { id: 3, level: '44%', label: 'Orchard Grid', status: 'medium' },
              { id: 4, level: '78%', label: 'Wetland', status: 'optimal' },
              { id: 5, level: '12%', label: 'Pasture 4', status: 'low' },
              { id: 6, level: '92%', label: 'Looms Area', status: 'optimal' },
              { id: 7, level: '62%', label: 'Coffee Dryer', status: 'medium' },
              { id: 8, level: '88%', label: 'Grove Canopy', status: 'optimal' }
            ].map((grid) => (
              <div
                key={grid.id}
                style={{
                  background: grid.status === 'optimal' ? 'rgba(30,132,73,0.12)' : (grid.status === 'medium' ? 'rgba(212,172,13,0.12)' : 'rgba(0,0,0,0.03)'),
                  border: '1.5px solid ' + (grid.status === 'optimal' ? 'var(--rice-green)' : (grid.status === 'medium' ? 'var(--accent-gold)' : 'rgba(0,0,0,0.06)')),
                  borderRadius: '12px',
                  padding: '12px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-dark)' }}>{grid.level}</span>
                <span style={{ fontSize: '9px', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{grid.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Mini metrics cards specific to tab */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {getSubMetrics().map((m, idx) => (
          <div key={idx} className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>{m.title}</span>
            <h3 style={{ fontSize: '24px', fontWeight: 600 }}>{m.value}</h3>
            <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>{m.label}</span>
          </div>
        ))}
      </div>

    </div>
  )
}
