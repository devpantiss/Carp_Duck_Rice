import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import {
  FiUsers, FiCalendar, FiDollarSign, FiDroplet, FiSun, FiWind,
  FiAlertTriangle, FiCheckCircle, FiCpu, FiTrendingUp, FiActivity, FiArrowRight
} from 'react-icons/fi'
import ParkIntelligence from './ParkIntelligence'
import OperationsCommandBoard from './OperationsCommandBoard'
import HumanFieldReport from './HumanFieldReport'

export default function OverviewView({ onSelectProgram, telemetryData }) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedNodeId, setSelectedNodeId] = useState('overview')
  const [hoveredNodeId, setHoveredNodeId] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hrs = currentTime.getHours()
    if (hrs < 12) return 'Good Morning'
    if (hrs < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const ecosystemNodes = [
    { id: 'overview', label: 'Ecosystem Portal', icon: '🏡', cx: 190, cy: 120, color: 'var(--text-dark)', desc: 'OS Central Command Center', inputs: 'All Telemetry Sensors', outputs: 'Direct Commands Dispatch', stats: { status: 'Optimal', loops: 'All balanced', uptime: '99.9%' } },
    { id: 'pondy-fish', label: 'Pondy Fish', icon: '🐟', cx: 70, cy: 50, color: 'var(--water-mid)', desc: 'Aquaculture & water filtration', inputs: 'Rain Runoff (from Tamarind)', outputs: 'Nutritive Water (to Orchard)', stats: { level: '1.42m', pH: '7.25', oxygen: '6.5 mg/L' } },
    { id: 'guavas-acrerise', label: 'Guavas AcreRise', icon: '🍈', cx: 190, cy: 40, color: 'var(--rice-green)', desc: 'High-yield organic orchards', inputs: 'Pond Water, Poultry Manure', outputs: 'Fruit Harvest, Canopy shade', stats: { moisture: '44.2%', stage: 'Vegetative', workers: '8' } },
    { id: 'ghats-goat', label: 'Ghats Goats', icon: '🐐', cx: 310, cy: 50, color: 'var(--reed-brown)', desc: 'Mountain pasture rotation', inputs: 'Orchard Shade, Grass feeds', outputs: 'Organic Compost (to Cafe)', stats: { count: '161 units', health: '98.2%', milk: '28 L' } },
    { id: 'tamarind-grove', label: 'Tamarind Grove', icon: '🌳', cx: 70, cy: 190, color: 'var(--accent-teal)', desc: 'Ecology canopy forestry', inputs: 'Compost Mulch (from Coffee)', outputs: 'Rain runoff (to Pond)', stats: { trees: '450', health: '92.5%', dryWeight: '80kg' } },
    { id: 'tassar-fashion', label: 'Tassar Silk Center', icon: '🧵', cx: 140, cy: 210, color: 'var(--accent-gold)', desc: 'Artisanal looms heritage silk', inputs: 'Cocoon raw fibers', outputs: 'Silk Yarn, Pupae duck feeds', stats: { looms: '8/10', weave: '18.2m', quality: '99.2%' } },
    { id: 'poultry-reserve', label: 'Poultry Reserve', icon: '🐔', cx: 240, cy: 210, color: '#f97316', desc: 'Premium wetland poultry reserve', inputs: 'Pupae feeds (from Silk)', outputs: 'Bio-manure (to Orchard)', stats: { ducks: '850', eggs: '380/day', nests: '94%' } },
    { id: 'tribey-coffee', label: 'Tribey Coffee', icon: '☕', cx: 310, cy: 190, color: '#8b5cf6', desc: 'Premium coffee plantation', inputs: 'Pasture manure (from Goats)', outputs: 'Compost mulch (to Tamarind)', stats: { beans: '120kg', temp: '210°C', orders: '28' } }
  ]

  const ecosystemFlows = [
    { from: 'tamarind-grove', to: 'pondy-fish', label: 'Filtered Runoff', color: 'var(--accent-teal)', d: 'M 70 190 L 70 50' },
    { from: 'pondy-fish', to: 'guavas-acrerise', label: 'Nutritive Water', color: 'var(--water-mid)', d: 'M 70 50 Q 130 35 190 40' },
    { from: 'poultry-reserve', to: 'guavas-acrerise', label: 'Bio-Manure', color: '#f97316', d: 'M 240 210 Q 220 120 190 40' },
    { from: 'guavas-acrerise', to: 'ghats-goat', label: 'Orchard Shade', color: 'var(--rice-green)', d: 'M 190 40 Q 250 35 310 50' },
    { from: 'ghats-goat', to: 'tribey-coffee', label: 'Pasture Manure', color: 'var(--reed-brown)', d: 'M 310 50 L 310 190' },
    { from: 'tribey-coffee', to: 'tamarind-grove', label: 'Husk Mulch', color: '#8b5cf6', d: 'M 310 190 L 70 190' },
    { from: 'tassar-fashion', to: 'poultry-reserve', label: 'Pupae Protein', color: 'var(--accent-gold)', d: 'M 140 210 Q 190 220 240 210' }
  ]

  const selectedNode = ecosystemNodes.find(n => n.id === selectedNodeId) || ecosystemNodes[0]

  const isFlowActive = (flow) => {
    if (!hoveredNodeId) return true
    return flow.from === hoveredNodeId || flow.to === hoveredNodeId
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', opacity: 0.98 }}>
      
      {/* Editorial Header Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.6fr', gap: '28px', alignItems: 'end' }}>
        <div>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--accent-teal)', fontWeight: 600 }}>LIVELIHOOD PARK OPERATING PORTAL</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '52px', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-dark)', marginTop: '8px' }}>
            {getGreeting()}, <em style={{ fontFamily: 'var(--font-accent)', fontWeight: '400', fontStyle: 'italic', color: 'var(--water-dark)' }}>Director</em>
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-mid)', marginTop: '12px', maxWidth: '600px', lineHeight: 1.6 }}>
            Biological loops are balanced. Ground telemetry captures no warning logs. Storage buffers are stable at 98.4% capacity.
          </p>
        </div>

        {/* Real-time system display */}
        <div className="os-glass-card" style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.55)', border: '1px solid rgba(255,255,255,0.8)' }}>
          <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-light)', display: 'block', marginBottom: '6px' }}>Park Coordinates Time</span>
          <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '24px', fontWeight: 600, color: 'var(--text-dark)' }}>
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </h2>
          <span style={{ fontSize: '11px', color: 'var(--text-light)', display: 'block', marginTop: '2px' }}>
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Asymmetrical Metrics & Status Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '24px' }}>
        <div className="os-glass-card card-glow-teal" style={{ display: 'flex', flexDirection: 'column', justifycontent: 'space-between', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><FiUsers /> Eco Tourists Check-ins</span>
            <h2 style={{ fontSize: '38px', fontFamily: 'var(--font-display)', color: 'var(--text-dark)', margin: '8px 0' }}>
              <CountUp end={142} duration={1.5} />
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '10px' }}>
            <span>Target: 150 Entry cap</span>
            <span style={{ color: 'var(--accent-teal)', fontWeight: 700 }}>Optimal (94%)</span>
          </div>
        </div>

        <div className="os-glass-card card-glow-gold" style={{ display: 'flex', flexDirection: 'column', justifycontent: 'space-between', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><FiCalendar /> ACTIVE RESERVATIONS</span>
            <h2 style={{ fontSize: '38px', fontFamily: 'var(--font-display)', color: 'var(--text-dark)', margin: '8px 0' }}>
              <CountUp end={48} duration={1.2} />
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '10px' }}>
            <span>Tours + Eco Lodges</span>
            <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>+8% week</span>
          </div>
        </div>

        <div className="os-glass-card card-glow-teal" style={{ display: 'flex', flexDirection: 'column', justifycontent: 'space-between', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><FiDollarSign /> Ledger Yield</span>
            <h2 style={{ fontSize: '38px', fontFamily: 'var(--font-display)', color: 'var(--text-dark)', margin: '8px 0' }}>
              ₹<CountUp end={84250} separator="," duration={1.8} />
            </h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-light)', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '10px' }}>
            <span>Wholesale + Cafe</span>
            <span style={{ color: 'var(--water-mid)', fontWeight: 700 }}>+15% daily</span>
          </div>
        </div>
      </div>

      {/* Interactive Loop Map & Control Card Split */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '28px' }}>
        
        {/* Left Column: Interactive Loop Web SVG */}
        <div className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 className="section-title-serif" style={{ fontSize: '20px', margin: 0 }}>Ecosystem Loop Control Web</h3>
            <p className="section-desc">Hover over a node to highlight biological flows. Click a node to view telemetry stats.</p>
          </div>
          <div style={{ height: '290px', background: 'rgba(255,255,255,0.32)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 10px', position: 'relative', overflow: 'hidden' }}>
            <svg viewBox="0 0 380 260" style={{ width: '100%', height: '100%' }}>
              
              {/* Flow connections */}
              {ecosystemFlows.map((flow, idx) => {
                const active = isFlowActive(flow)
                return (
                  <path
                    key={idx}
                    d={flow.d}
                    fill="none"
                    stroke={flow.color}
                    strokeWidth={active ? 2 : 0.8}
                    strokeOpacity={active ? 0.8 : 0.15}
                    strokeDasharray="5 5"
                    className="flow-line"
                    style={{ transition: 'all 0.3s' }}
                  />
                )
              })}

              {/* Loop Nodes */}
              {ecosystemNodes.map((node) => {
                const isSelected = selectedNodeId === node.id
                const isHovered = hoveredNodeId === node.id
                return (
                  <g
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Ring highlight on select/hover */}
                    {(isSelected || isHovered) && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="16"
                        fill="none"
                        stroke={node.color}
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                      />
                    )}
                    {/* Base Node circle */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r="10"
                      fill={isSelected ? node.color : 'white'}
                      stroke={node.color}
                      strokeWidth="2"
                    />
                    {/* Emoji inside node */}
                    <text
                      x={node.cx}
                      y={node.cy + 3.5}
                      textAnchor="middle"
                      style={{ fontSize: '10px', userSelect: 'none' }}
                    >
                      {node.icon}
                    </text>
                    {/* Label below node */}
                    <text
                      x={node.cx}
                      y={node.cy + 22}
                      textAnchor="middle"
                      style={{
                        fontSize: '8.5px',
                        fontWeight: isSelected ? 700 : 500,
                        fill: isSelected ? 'var(--text-dark)' : 'var(--text-light)',
                        fontFamily: 'var(--font-body)',
                        letterSpacing: '0.03em'
                      }}
                    >
                      {node.label}
                    </text>
                  </g>
                )}
              )}

            </svg>
          </div>
        </div>

        {/* Right Column: Dynamic Telemetry Node Control Card */}
        <div className="os-glass-card grad-gold" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>{selectedNode.icon}</span>
              <div>
                <h3 className="section-title-serif" style={{ fontSize: '18px', margin: 0 }}>{selectedNode.label}</h3>
                <span style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.05em' }}>Telemetry Diagnostics</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-mid)', marginTop: '8px', lineHeight: '1.4' }}>{selectedNode.desc}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(255,255,255,0.4)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '6px', fontSize: '11px' }}>
              <span style={{ textTransform: 'uppercase', color: 'var(--text-light)', fontSize: '8px', fontWeight: 700 }}>Inflows</span>
              <strong>{selectedNode.inputs}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderBottom: '1px solid rgba(0,0,0,0.04)', paddingBottom: '6px', fontSize: '11px' }}>
              <span style={{ textTransform: 'uppercase', color: 'var(--text-light)', fontSize: '8px', fontWeight: 700 }}>Outflows</span>
              <strong>{selectedNode.outputs}</strong>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '4px' }}>
              <span style={{ textTransform: 'uppercase', color: 'var(--text-light)', fontSize: '8px', fontWeight: 700 }}>Sector Diagnostics</span>
              {Object.entries(selectedNode.stats).map(([lbl, val]) => (
                <div key={lbl} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ textTransform: 'capitalize', color: 'var(--text-mid)' }}>{lbl}</span>
                  <strong>{val}</strong>
                </div>
              ))}
            </div>
          </div>

          <div>
            {selectedNode.id === 'overview' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--rice-green)', background: 'rgba(30,132,73,0.08)', padding: '10px 14px', borderRadius: '8px' }}>
                <FiCheckCircle />
                <span>Operating Center Normal</span>
              </div>
            ) : (
              <button
                onClick={() => onSelectProgram(selectedNode.id)}
                className="btn-primary"
                style={{ width: '100%', padding: '12px 16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontSize: '11px' }}
              >
                <span>Jump to Dashboard</span>
                <FiArrowRight />
              </button>
            )}
          </div>
        </div>

      </div>

      <ParkIntelligence />

      <OperationsCommandBoard />

      <HumanFieldReport />

    </div>
  )
}
