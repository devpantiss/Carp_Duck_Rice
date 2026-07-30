import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiMaximize2, FiMinimize2, FiRefreshCw, FiExternalLink, FiBarChart2, FiCheckCircle } from 'react-icons/fi'

export const POWERBI_CONFIG = {
  'pondy-fish': {
    id: 'pondy-fish',
    title: 'Pondy Fish Live PowerBI Analytics',
    subtitle: 'Real-time telemetry, aquaculture yield, water quality index & coastal community impact',
    tag: 'Sustainable Fisheries',
    emoji: '🐟',
    stat: '12,000+',
    statLabel: 'Fishers Supported',
    accent: '#4ecdc4',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiZmJmZDU5NjItYjk5ZS00MjYwLWIwMTktOGM1MTQ4NmE4OTczIiwidCI6IjQ4NGVhM2IxLTU0YjYtNDhkYi04YzZhLWZkN2IyNWRhYzI1ZiJ9&pageName=ReportSection'
  },
  'easternghats-goat': {
    id: 'easternghats-goat',
    title: 'Eastern Ghats Goats Live PowerBI Analytics',
    subtitle: 'Livestock census, rotational pasture tracking, doe fertility & tribal safety net statistics',
    tag: 'Livestock Farming',
    emoji: '🐐',
    stat: '3,200',
    statLabel: 'Goats Raised',
    accent: '#f7b731',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiOThjMTNjMjgtYzA0MC00Y2FkLTllZGMtNzRjMzFkYmY3YTU1IiwidCI6IjQ4NGVhM2IxLTU0YjYtNDhkYi04YzZhLWZkN2IyNWRhYzI1ZiJ9&pageName=ReportSection'
  },
  // Alias for Dashboard compatibility
  'ghats-goat': {
    id: 'easternghats-goat',
    title: 'Eastern Ghats Goats Live PowerBI Analytics',
    subtitle: 'Livestock census, rotational pasture tracking, doe fertility & tribal safety net statistics',
    tag: 'Livestock Farming',
    emoji: '🐐',
    stat: '3,200',
    statLabel: 'Goats Raised',
    accent: '#f7b731',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiOThjMTNjMjgtYzA0MC00Y2FkLTllZGMtNzRjMzFkYmY3YTU1IiwidCI6IjQ4NGVhM2IxLTU0YjYtNDhkYi04YzZhLWZkN2IyNWRhYzI1ZiJ9&pageName=ReportSection'
  }
}

export default function PowerBIDashboardPage() {
  const { programId } = useParams()
  const navigate = useNavigate()
  
  // Resolve active program or default to pondy-fish
  const activeKey = (programId && POWERBI_CONFIG[programId]) ? programId : 'pondy-fish'
  const currentConfig = POWERBI_CONFIG[activeKey] || POWERBI_CONFIG['pondy-fish']

  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  useEffect(() => {
    setIsLoading(true)
  }, [activeKey])

  const handleRefresh = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <motion.main
      className="powerbi-page-wrapper"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="powerbi-container">
        
        {/* Navigation & Header */}
        <header className="powerbi-header">
          <div className="powerbi-header__top">
            <button onClick={() => navigate(-1)} className="powerbi-back-btn">
              <FiArrowLeft /> <span>Back</span>
            </button>

            {/* Program Switcher Pills */}
            <div className="powerbi-switcher">
              <Link
                to="/dashboard/powerbi/pondy-fish"
                className={`powerbi-tab ${currentConfig.id === 'pondy-fish' ? 'powerbi-tab--active' : ''}`}
                style={{ '--accent': '#4ecdc4' }}
              >
                <span>🐟</span> Pondy Fish Dashboard
              </Link>
              <Link
                to="/dashboard/powerbi/easternghats-goat"
                className={`powerbi-tab ${currentConfig.id === 'easternghats-goat' ? 'powerbi-tab--active' : ''}`}
                style={{ '--accent': '#f7b731' }}
              >
                <span>🐐</span> Eastern Ghat Goats Dashboard
              </Link>
            </div>

            {/* Live Indicator & Quick Actions */}
            <div className="powerbi-actions">
              <span className="powerbi-live-badge">
                <span className="powerbi-live-dot" /> POWERBI LIVE
              </span>
              <button onClick={handleRefresh} className="powerbi-action-btn" title="Refresh Dashboard">
                <FiRefreshCw className={isLoading ? 'spin' : ''} />
              </button>
              <button onClick={toggleFullscreen} className="powerbi-action-btn" title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}>
                {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
              </button>
              <a
                href={currentConfig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="powerbi-action-btn"
                title="Open in PowerBI Site"
              >
                <FiExternalLink />
              </a>
            </div>
          </div>

          <div className="powerbi-header__title-block">
            <div className="powerbi-header__eyebrow">
              <span className="powerbi-header__tag" style={{ color: currentConfig.accent }}>
                {currentConfig.emoji} {currentConfig.tag}
              </span>
              <span className="powerbi-header__divider">•</span>
              <span>ENTERPRISE TELEMETRY</span>
            </div>
            <h1 className="powerbi-header__title">{currentConfig.title}</h1>
            <p className="powerbi-header__subtitle">{currentConfig.subtitle}</p>
          </div>
        </header>

        {/* Dashboard Viewer Area */}
        <div className={`powerbi-viewer-card ${isFullscreen ? 'powerbi-viewer-card--fullscreen' : ''}`}>
          
          {/* Top Bar for frame */}
          <div className="powerbi-frame-bar">
            <div className="powerbi-frame-dots">
              <span style={{ background: '#ff5f56' }} />
              <span style={{ background: '#ffbd2e' }} />
              <span style={{ background: '#27c93f' }} />
            </div>
            <div className="powerbi-frame-title">
              <FiBarChart2 style={{ color: currentConfig.accent }} />
              <span>Microsoft PowerBI Report — {currentConfig.title}</span>
            </div>
            <div className="powerbi-frame-status">
              <FiCheckCircle style={{ color: '#27c93f' }} /> Secure SSL
            </div>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="powerbi-loader-overlay">
              <div className="powerbi-loader-spinner" style={{ borderTopColor: currentConfig.accent }} />
              <p>Loading PowerBI Analytics Dashboard...</p>
            </div>
          )}

          {/* Embedded PowerBI Iframe */}
          <div className="powerbi-iframe-wrapper">
            <iframe
              key={iframeKey}
              title={currentConfig.title}
              src={currentConfig.url}
              className="powerbi-iframe"
              onLoad={() => setIsLoading(false)}
              allowFullScreen={true}
            />
          </div>
        </div>

      </div>

      <style>{`
        .powerbi-page-wrapper {
          min-height: 100vh;
          background: #0a0c10;
          color: #ffffff;
          padding-top: 100px;
          padding-bottom: 80px;
          position: relative;
        }

        .powerbi-container {
          max-width: 1520px;
          margin: 0 auto;
          padding: 0 clamp(16px, 3vw, 40px);
        }

        .powerbi-header {
          margin-bottom: 28px;
        }

        .powerbi-header__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .powerbi-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #ffffff;
          padding: 8px 18px;
          border-radius: 99px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .powerbi-back-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateX(-3px);
        }

        .powerbi-switcher {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.04);
          padding: 4px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .powerbi-tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .powerbi-tab:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
        }
        .powerbi-tab--active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid var(--accent);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .powerbi-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .powerbi-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(39, 201, 63, 0.12);
          border: 1px solid rgba(39, 201, 63, 0.3);
          color: #27c93f;
          padding: 6px 14px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .powerbi-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #27c93f;
          box-shadow: 0 0 10px #27c93f;
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        .powerbi-action-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .powerbi-action-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .powerbi-header__title-block {
          margin-top: 10px;
        }

        .powerbi-header__eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .powerbi-header__divider {
          color: rgba(255, 255, 255, 0.2);
        }

        .powerbi-header__title {
          font-family: var(--font-display, 'Bebas Neue', sans-serif);
          font-size: clamp(28px, 4vw, 44px);
          font-weight: 400;
          letter-spacing: 0.02em;
          margin: 0 0 8px 0;
          color: #ffffff;
        }

        .powerbi-header__subtitle {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          max-width: 800px;
          font-weight: 300;
        }

        /* Viewer Card */
        .powerbi-viewer-card {
          position: relative;
          background: #11141b;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease;
        }

        .powerbi-viewer-card--fullscreen {
          position: fixed;
          inset: 0;
          z-index: 9999;
          border-radius: 0;
          border: none;
        }

        .powerbi-frame-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        .powerbi-frame-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .powerbi-frame-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }

        .powerbi-frame-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .powerbi-frame-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }

        .powerbi-loader-overlay {
          position: absolute;
          inset: 44px 0 0 0;
          background: rgba(10, 12, 16, 0.9);
          backdrop-filter: blur(8px);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
        }

        .powerbi-loader-spinner {
          width: 42px;
          height: 42px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .powerbi-iframe-wrapper {
          position: relative;
          width: 100%;
          height: clamp(650px, 78vh, 900px);
          background: #ffffff;
        }

        .powerbi-viewer-card--fullscreen .powerbi-iframe-wrapper {
          height: calc(100vh - 44px);
        }

        .powerbi-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        @media (max-width: 768px) {
          .powerbi-header__top {
            flex-direction: column;
            align-items: flex-start;
          }
          .powerbi-switcher {
            width: 100%;
            overflow-x: auto;
          }
          .powerbi-iframe-wrapper {
            height: 550px;
          }
        }
      `}</style>
    </motion.main>
  )
}
