import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiClock, FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

// Custom Sub-dashboards
import OverviewView from '../Components/Dashboard/OverviewView'
import PondyFishView from '../Components/Dashboard/ProgramViews/PondyFishView'
import GuavasAcreRiseView from '../Components/Dashboard/ProgramViews/GuavasAcreRiseView'
import GoatsView from '../Components/Dashboard/ProgramViews/GoatsView'
import TamarindGroveView from '../Components/Dashboard/ProgramViews/TamarindGroveView'
import TassarFashionView from '../Components/Dashboard/ProgramViews/TassarFashionView'
import PoultryReserveView from '../Components/Dashboard/ProgramViews/PoultryReserveView'
import TribeyCoffeeView from '../Components/Dashboard/ProgramViews/TribeyCoffeeView'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())

  // Dynamic Telemetry variables
  const [telemetry, setTelemetry] = useState({
    temperature: 32.0,
    humidity: 78,
    waterLevel: 1.42
  })

  // Simulated live updates every 5 seconds to keep dashboard indices moving
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const telemetryTimer = setInterval(() => {
      setTelemetry((prev) => ({
        temperature: +(prev.temperature + (Math.random() - 0.5) * 0.4).toFixed(1),
        humidity: Math.min(100, Math.max(0, Math.round(prev.humidity + (Math.random() - 0.5) * 2))),
        waterLevel: +(prev.waterLevel + (Math.random() - 0.5) * 0.03).toFixed(2)
      }))
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(telemetryTimer)
    }
  }, [])

  // Floating luxury sidebar menu items
  const tabs = [
    { id: 'overview', label: 'Ecosystem Portal', icon: '🏡' },
    { id: 'pondy-fish', label: '🐟 Pondy Fish', icon: '🐟' },
    { id: 'guavas-acrerise', label: '🍈 Guavas AcreRise', icon: '🍈' },
    { id: 'ghats-goat', label: '🐐 Eastern Ghats Goats', icon: '🐐' },
    { id: 'tamarind-grove', label: '🌳 Tamarind Grove', icon: '🌳' },
    { id: 'tassar-fashion', label: '🧵 Tassar Fashion', icon: '🧵' },
    { id: 'poultry-reserve', label: '🐔 Poultry Reserve', icon: '🐔' },
    { id: 'tribey-coffee', label: '☕ TRIBEY COFFEE', icon: '☕' },
    { id: 'reports', label: '📑 Reports', icon: '📑' }
  ]

  const filteredTabs = tabs.filter(tab =>
    tab.label.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const programPulse = [
    { id: 'overview', label: 'Ecosystem Portal', icon: '⌂', value: 'Park overview', image: '/images/backgrounds/park-hero.jpg' },
    { id: 'pondy-fish', label: 'Pondy Fish', icon: '🐟', value: '6.5 O₂', image: '/images/programs/pondy-fish-1.jpg' },
    { id: 'guavas-acrerise', label: 'Guavas AcreRise', icon: '🍈', value: '91 health', image: '/images/programs/guavas-1.jpg' },
    { id: 'ghats-goat', label: 'Eastern Ghats Goats', icon: '🐐', value: '98.2 index', image: '/images/programs/goats-1.jpg' },
    { id: 'tamarind-grove', label: 'Tamarind Grove', icon: '🌳', value: '18.6 t CO₂', image: '/images/programs/tamarind-grove-1.jpg' },
    { id: 'tassar-fashion', label: 'Tassar Fashion', icon: '🧵', value: '8 looms', image: '/images/programs/tassar-fashion-1.jpg' },
    { id: 'poultry-reserve', label: 'Poultry Reserve', icon: '🐓', value: '380 eggs', image: '/images/programs/mega-poultry-1.jpg' },
    { id: 'tribey-coffee', label: 'Tribey Coffee', icon: '☕', value: '87 quality', image: '/images/programs/coffee-1.jpg' },
    { id: 'reports', label: 'Reports', icon: '📑', value: 'Annual report', image: '/images/backgrounds/park-hero.jpg' }
  ]
  const activeProgram = programPulse.find(program => program.id === activeTab)

  return (
    <div
      className={`dashboard-container dashboard--${activeTab}`}
      style={{
        background: activeTab === 'tribey-coffee' ? '#121212' : '#FAF7F2',
        backgroundImage: activeProgram ? `linear-gradient(90deg, ${activeTab === 'tribey-coffee' ? 'rgba(18,18,18,.70)' : 'rgba(250,247,242,.58)'}, ${activeTab === 'tribey-coffee' ? 'rgba(18,18,18,.55)' : 'rgba(250,247,242,.34)'}), url("${activeProgram.image}")` : undefined,
        backgroundSize: activeProgram ? 'cover' : undefined,
        backgroundPosition: activeProgram ? 'center' : undefined,
        backgroundAttachment: activeProgram ? 'fixed' : undefined,
        transition: 'background 0.5s ease',
        // Keeps the footer's decorative wave clear of the dashboard content.
        paddingBottom: '112px'
      }}
    >
      
      {/* Watercolor background layer */}
      <div className="dashboard-bg-overlay" style={{ opacity: activeTab === 'tribey-coffee' ? 0.02 : 0.2 }} />

      {/* Thin film grain overlay */}
      <div className="grain-overlay" />

      <div className="container dashboard-layout" style={{ paddingTop: '120px' }}>
        
        {/* Floating luxury sidebar */}
        <aside className="floating-os-sidebar">
          <div className="sidebar-logo">
            <img
              src="/images/brand/logo-horizontal.png"
              alt="Carp, Rice & Duck Livelihood Park"
              style={{
                height: '42px',
                width: 'auto',
                objectFit: 'contain',
                background: 'transparent'
              }}
            />
            <span className="sidebar-logo__sub" style={{ color: activeTab === 'tribey-coffee' ? 'rgba(255,255,255,0.4)' : 'var(--text-light)', marginTop: '4px', display: 'block' }}>Park Operating System</span>
          </div>

          {/* Quick Search bar */}
          <div className="sidebar-search" style={{ borderBottom: activeTab === 'tribey-coffee' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)' }}>
            <FiSearch style={{ color: activeTab === 'tribey-coffee' ? 'rgba(255,255,255,0.4)' : 'var(--text-light)' }} />
            <input
              type="text"
              placeholder="Search dashboards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: '11.5px',
                color: activeTab === 'tribey-coffee' ? 'white' : 'var(--text-dark)',
                width: '100%'
              }}
            />
          </div>

          {/* Navigation link listings */}
          <nav className="sidebar-nav">
            {filteredTabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => tab.id === 'reports' ? navigate('/dashboard/reports') : setActiveTab(tab.id)}
                  className={`nav-item ${isActive ? 'nav-item--active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    position: 'relative',
                    color: isActive ? (activeTab === 'tribey-coffee' ? 'white' : 'var(--text-dark)') : (activeTab === 'tribey-coffee' ? 'rgba(255,255,255,0.5)' : 'var(--text-mid)'),
                    transition: 'all 0.3s'
                  }}
                >
                  <span style={{ fontSize: '15px', zIndex: 1 }}>{tab.icon}</span>
                  <span className="nav-item__label" style={{ zIndex: 1, fontSize: '12.5px', fontWeight: isActive ? 600 : 500 }}>{tab.label.split(' ').slice(1).join(' ') || tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      className="nav-item__active-pill"
                      style={{
                        inset: 0,
                        position: 'absolute',
                        borderRadius: '12px',
                        background: activeTab === 'tribey-coffee' ? 'rgba(255,255,255,0.08)' : 'rgba(255, 255, 255, 0.75)',
                        border: activeTab === 'tribey-coffee' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.95)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                        zIndex: 0
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Operating Workspace */}
        <main className="db-main" style={{ minHeight: '620px' }}>
          <section className="program-pulse-strip" aria-label="Program operating pulse">
            <div className="program-pulse-strip__items">
              {programPulse.map((program, index) => {
                const isActive = activeTab === program.id
                return <button key={program.id} onClick={() => program.id === 'reports' ? navigate('/dashboard/reports') : setActiveTab(program.id)} className={`program-pulse-card ${isActive ? 'program-pulse-card--active' : ''}`} style={{ '--pulse-image': `url("${program.image}")` }}>
                  <span className="program-pulse-card__number">0{index + 1}</span><span className="program-pulse-card__icon">{program.icon}</span>
                  <span className="program-pulse-card__label">{program.label}</span><strong>{program.value}</strong>
                </button>
              })}
            </div>
          </section>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {activeTab === 'overview' && (
                <OverviewView onSelectProgram={setActiveTab} telemetryData={telemetry} />
              )}
              {activeTab === 'pondy-fish' && <PondyFishView />}
              {activeTab === 'guavas-acrerise' && <GuavasAcreRiseView />}
              {activeTab === 'ghats-goat' && <GoatsView />}
              {activeTab === 'tamarind-grove' && <TamarindGroveView />}
              {activeTab === 'tassar-fashion' && <TassarFashionView />}
              {activeTab === 'poultry-reserve' && <PoultryReserveView />}
              {activeTab === 'tribey-coffee' && <TribeyCoffeeView />}
            </motion.div>
          </AnimatePresence>

        </main>
      </div>

      <style>{`
        .floating-os-sidebar {
          display: none !important;
          background: ${activeTab === 'tribey-coffee' ? 'rgba(30, 30, 30, 0.55)' : 'rgba(255, 255, 255, 0.45)'};
          backdrop-filter: blur(24px) saturate(120%);
          -webkit-backdrop-filter: blur(24px) saturate(120%);
          border: 1px solid ${activeTab === 'tribey-coffee' ? 'rgba(255,255,255,0.06)' : 'rgba(255, 255, 255, 0.6)'};
          border-radius: 28px;
          padding: 28px 20px;
          position: sticky;
          top: 110px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.02);
          display: flex;
          flex-direction: column;
          gap: 28px;
          transition: all 0.4s ease;
        }

        .sidebar-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 4px 10px 4px;
        }

        .nav-item:hover {
          background: ${activeTab === 'tribey-coffee' ? 'rgba(255,255,255,0.04)' : 'rgba(255, 255, 255, 0.25)'};
          transform: translateX(4px);
        }
      `}</style>

    </div>
  )
}
