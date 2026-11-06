import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion as Motion } from 'framer-motion'
import { FiArrowLeft, FiMaximize2, FiX, FiRefreshCw, FiExternalLink, FiSmartphone, FiBarChart2 } from 'react-icons/fi'

// Power BI "Publish to web" reports. Their contents are owned and styled in Power BI;
// this page controls only the framing around them.
// Highlights are copied from each report's home page — update them when the report changes.
const POWERBI_CONFIG = {
  'pondy-fish': {
    id: 'pondy-fish',
    name: 'Pondy Fish',
    reportName: 'Fishery Monitoring Dashboard',
    tag: 'Sustainable Fisheries',
    summary: 'Pond coverage, production, profitability, risk tracking and training across the fishery livelihood programme.',
    accent: '#1f7a9c',
    highlights: [
      { value: '60', label: 'Fishery farmers' },
      { value: '75', label: 'Ponds covered' },
      { value: '2M', label: 'Fish produced' },
      { value: '57K', label: 'Cumulative profit' },
    ],
    snapshot: 'Nov 2026',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiZmJmZDU5NjItYjk5ZS00MjYwLWIwMTktOGM1MTQ4NmE4OTczIiwidCI6IjQ4NGVhM2IxLTU0YjYtNDhkYi04YzZhLWZkN2IyNWRhYzI1ZiJ9&pageName=ReportSection',
  },
  'easternghats-goat': {
    id: 'easternghats-goat',
    name: 'Eastern Ghats Goats',
    reportName: 'Goatery Monitoring Dashboard',
    tag: 'Livestock Farming',
    summary: 'Household coverage, producer groups, infrastructure readiness, goat health cards, training and gap tracking.',
    accent: '#bf7e37',
    highlights: [
      { value: '1,000', label: 'Households covered' },
      { value: '14 / 20', label: 'Producer groups formed' },
      { value: '650', label: 'Goat health cards' },
      { value: '546', label: 'Farmers trained' },
    ],
    snapshot: 'Nov 2026',
    url: 'https://app.powerbi.com/view?r=eyJrIjoiOThjMTNjMjgtYzA0MC00Y2FkLTllZGMtNzRjMzFkYmY3YTU1IiwidCI6IjQ4NGVhM2IxLTU0YjYtNDhkYi04YzZhLWZkN2IyNWRhYzI1ZiJ9&pageName=ReportSection',
  },
}
// Older links use this id.
POWERBI_CONFIG['ghats-goat'] = POWERBI_CONFIG['easternghats-goat']

const PROGRAM_TABS = ['pondy-fish', 'easternghats-goat']

// Measured: both reports are 16:9 pages, and Power BI adds a fixed 60px zoom + footer bar below.
// The iframe is made 60px taller than the visible stage so that bar sits outside the crop.
const REPORT_RATIO = 16 / 9
const POWERBI_CHROME_PX = 60
const OVERSCAN_PX = 4
const SETTLE_MS = 1400 // the report shell loads before its visuals finish rendering
const SLOW_MS = 20000

function ReportStage({ config }) {
  const [status, setStatus] = useState('loading') // loading | ready | slow
  const settleTimer = useRef(0)

  useEffect(() => {
    const slow = setTimeout(() => setStatus((s) => (s === 'loading' ? 'slow' : s)), SLOW_MS)
    const settle = settleTimer.current
    return () => {
      clearTimeout(slow)
      clearTimeout(settle)
    }
  }, [])

  const handleLoad = () => {
    settleTimer.current = setTimeout(() => setStatus('ready'), SETTLE_MS)
  }

  return (
    <div className="pbi-stage" style={{ '--accent': config.accent }}>
      <iframe
        title={`${config.name} — ${config.reportName}`}
        src={config.url}
        className="pbi-iframe"
        onLoad={handleLoad}
        allow="fullscreen"
      />
      {status !== 'ready' && (
        <div className={`pbi-loader${status === 'slow' ? ' pbi-loader--slow' : ''}`} role="status" aria-live="polite">
          <div className="pbi-loader__skeleton" aria-hidden="true">
            <span /><span /><span /><span />
          </div>
          {status === 'slow' ? (
            <div className="pbi-loader__msg">
              <p>The report is taking longer than usual to load.</p>
              <a href={config.url} target="_blank" rel="noopener noreferrer" className="pbi-btn pbi-btn--accent">
                Open report in a new tab <FiExternalLink />
              </a>
            </div>
          ) : (
            <p className="pbi-loader__label">Loading the Power BI report…</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function PowerBIDashboardPage() {
  const { programId } = useParams()
  const navigate = useNavigate()
  const config = POWERBI_CONFIG[programId] || POWERBI_CONFIG['pondy-fish']

  const [reloadKey, setReloadKey] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const shellRef = useRef(null)

  const exitExpanded = useCallback(() => {
    setExpanded(false)
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {})
  }, [])

  const enterExpanded = () => {
    setExpanded(true)
    // Native fullscreen where supported (desktop, Android); iPhone falls back to the CSS overlay.
    const el = shellRef.current
    if (el?.requestFullscreen) {
      el.requestFullscreen()
        .then(() => screen.orientation?.lock?.('landscape'))
        .catch(() => {})
    }
  }

  useEffect(() => {
    if (!expanded) return
    const onKey = (e) => e.key === 'Escape' && exitExpanded()
    const onFsChange = () => !document.fullscreenElement && setExpanded(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('fullscreenchange', onFsChange)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('fullscreenchange', onFsChange)
      document.body.style.overflow = overflow
    }
  }, [expanded, exitExpanded])

  return (
    <Motion.main
      className="pbi-page"
      style={{ '--accent': config.accent }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pbi-wash" aria-hidden="true" />
      <div className="pbi-container">
        <div className="pbi-topbar">
          <button type="button" onClick={() => navigate(-1)} className="pbi-back">
            <FiArrowLeft aria-hidden="true" /> <span>Back</span>
          </button>
          <nav className="pbi-switcher" aria-label="Programme dashboards">
            {PROGRAM_TABS.map((id) => {
              const item = POWERBI_CONFIG[id]
              const active = config.id === id
              return (
                <Link
                  key={id}
                  to={`/dashboard/powerbi/${id}`}
                  className={`pbi-switcher__tab${active ? ' is-active' : ''}`}
                  style={{ '--tab-accent': item.accent }}
                  aria-current={active ? 'page' : undefined}
                >
                  <i aria-hidden="true" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <header className="pbi-header">
          <p className="pbi-eyebrow">
            <i aria-hidden="true" /> {config.tag} · Power BI dashboard
          </p>
          <h1 className="pbi-title">
            {config.name} <em>{config.reportName}</em>
          </h1>
          <p className="pbi-summary">{config.summary}</p>
        </header>

        <section className="pbi-highlights" aria-label="Highlights">
          {config.highlights.map((item, i) => (
            <Motion.div
              key={item.label}
              className="pbi-highlight"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </Motion.div>
          ))}
          <p className="pbi-highlights__note">Highlights from the report · {config.snapshot}</p>
        </section>

        <div className="pbi-toolbar">
          <div className="pbi-toolbar__info">
            <span className="pbi-badge">
              <FiBarChart2 aria-hidden="true" /> Live Power BI report
            </span>
            <p className="pbi-toolbar__hint">Use the tabs inside the report to explore each section.</p>
          </div>
          <div className="pbi-toolbar__actions">
            <button type="button" className="pbi-icon-btn" onClick={() => setReloadKey((k) => k + 1)} aria-label="Reload report" title="Reload report">
              <FiRefreshCw />
            </button>
            <button type="button" className="pbi-icon-btn" onClick={enterExpanded} aria-label="View full screen" title="View full screen">
              <FiMaximize2 />
            </button>
            <a href={config.url} target="_blank" rel="noopener noreferrer" className="pbi-icon-btn" aria-label="Open report in a new tab" title="Open in a new tab">
              <FiExternalLink />
            </a>
          </div>
        </div>

        <button type="button" className="pbi-mobile-hint" onClick={enterExpanded}>
          <FiSmartphone aria-hidden="true" />
          <span>Tap to view the report full screen in landscape</span>
        </button>

        <div ref={shellRef} className={`pbi-shell${expanded ? ' is-expanded' : ''}`}>
          {expanded && (
            <button type="button" className="pbi-close" onClick={exitExpanded} aria-label="Exit full screen">
              <FiX />
            </button>
          )}
          <ReportStage key={`${config.id}-${reloadKey}`} config={config} />
        </div>

        <p className="pbi-footnote">
          This dashboard is built and published by the programme team in Microsoft Power BI. New data can take up to an hour to appear here.
        </p>
      </div>

      <style>{`
        /* Same palette as the Reports page: warm paper, deep green ink, glass cards. */
        .pbi-page {
          --ink: #18312e;
          --paper: #f6f1e7;
          --green: #1b8066;
          --deep: #143f38;
          --line: rgba(24,49,46,0.12);
          --muted: #5f6f69;
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 100vh;
          background: var(--paper);
          color: var(--ink);
          padding: 112px 0 88px;
          font-family: var(--font-body);
        }
        .pbi-wash {
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 8% 10%, rgba(151,211,180,0.34), transparent 24%),
            radial-gradient(circle at 94% 30%, color-mix(in srgb, var(--accent) 20%, transparent), transparent 26%),
            repeating-linear-gradient(15deg, rgba(89,68,37,0.025) 0 1px, transparent 1px 7px);
        }
        .pbi-container {
          width: min(1440px, 100%);
          margin: 0 auto;
          padding: 0 clamp(16px, 3vw, 40px);
        }

        /* top bar */
        .pbi-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: clamp(28px, 4vw, 44px);
        }
        .pbi-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px 10px 12px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.5);
          color: var(--ink);
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .pbi-back:hover { background: var(--ink); color: #fff; }
        .pbi-switcher {
          display: inline-flex;
          gap: 4px;
          padding: 5px;
          border-radius: 999px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.85);
          box-shadow: 0 12px 30px rgba(26,37,47,0.07);
          backdrop-filter: blur(14px);
        }
        .pbi-switcher__tab {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          color: var(--muted);
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .pbi-switcher__tab i {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--tab-accent);
        }
        .pbi-switcher__tab:hover { color: var(--ink); }
        .pbi-switcher__tab.is-active {
          color: #fff;
          background: linear-gradient(135deg, var(--deep), var(--green));
          box-shadow: 0 8px 18px rgba(20,143,119,0.22);
        }
        .pbi-switcher__tab.is-active i { background: #fff; }

        /* header */
        .pbi-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0 0 14px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--green);
        }
        .pbi-eyebrow i { width: 26px; height: 1px; background: var(--green); }
        .pbi-title {
          margin: 0;
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(2.6rem, 5.4vw, 4.8rem);
          line-height: 0.98;
          letter-spacing: -0.03em;
        }
        .pbi-title em {
          display: block;
          font-style: italic;
          color: var(--accent);
          font-size: 0.6em;
          letter-spacing: -0.01em;
          margin-top: 8px;
        }
        .pbi-summary {
          max-width: 640px;
          margin: 18px 0 0;
          font-size: 15px;
          line-height: 1.75;
          color: var(--muted);
        }

        /* highlights: glass cards like the Reports page */
        .pbi-highlights {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin: clamp(28px, 4vw, 40px) 0 0;
        }
        .pbi-highlight {
          display: grid;
          gap: 6px;
          padding: 20px clamp(16px, 2vw, 24px);
          border-radius: 20px;
          background: rgba(255,255,255,0.56);
          border: 1px solid rgba(255,255,255,0.88);
          box-shadow: 0 14px 30px rgba(38,57,49,0.07);
          backdrop-filter: blur(14px);
        }
        .pbi-highlight strong {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(2rem, 3.2vw, 2.7rem);
          line-height: 1;
          color: var(--ink);
        }
        .pbi-highlight span {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .pbi-highlights__note {
          grid-column: 1 / -1;
          margin: 2px 0 0;
          font-size: 11px;
          letter-spacing: 0.06em;
          color: #7b8983;
        }

        /* toolbar */
        .pbi-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin: clamp(30px, 4vw, 44px) auto 14px;
          max-width: calc((100svh - 150px) * 16 / 9);
        }
        .pbi-toolbar__info { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
        .pbi-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 13px;
          border-radius: 999px;
          background: var(--deep);
          color: #fff;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .pbi-badge svg { color: #f2c811; font-size: 13px; }
        .pbi-toolbar__hint { margin: 0; font-size: 12px; color: var(--muted); }
        .pbi-toolbar__actions { display: flex; gap: 8px; }
        .pbi-icon-btn {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.55);
          color: var(--ink);
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
        }
        .pbi-icon-btn:hover { background: var(--ink); color: #fff; }
        .pbi-icon-btn:focus-visible, .pbi-back:focus-visible, .pbi-switcher__tab:focus-visible, .pbi-mobile-hint:focus-visible {
          outline: 2px solid var(--green);
          outline-offset: 2px;
        }

        /* report frame: a 16:9 window that crops Power BI's bottom bar */
        .pbi-shell {
          margin: 0 auto;
          max-width: calc((100svh - 150px) * 16 / 9);
          padding: 8px;
          border-radius: 26px;
          background: linear-gradient(145deg, var(--deep), #1d6b59);
          box-shadow: 0 25px 70px rgba(29,47,42,0.2);
        }
        .pbi-stage {
          position: relative;
          aspect-ratio: ${REPORT_RATIO};
          overflow: hidden;
          border-radius: 19px;
          background: #fff;
          isolation: isolate;
        }
        /* Overscan by a few px so sub-pixel rounding never lets Power BI's white zoom row peek in. */
        .pbi-iframe {
          position: absolute;
          top: 0;
          left: -${OVERSCAN_PX / 2}px;
          width: calc(100% + ${OVERSCAN_PX}px);
          height: calc(100% + ${POWERBI_CHROME_PX + OVERSCAN_PX}px);
          border: 0;
          display: block;
        }

        /* loading */
        .pbi-loader {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: grid;
          place-items: center;
          align-content: center;
          gap: 18px;
          padding: 24px;
          text-align: center;
          background: var(--paper);
        }
        .pbi-loader--slow { background: rgba(246,241,231,0.96); }
        .pbi-loader__skeleton {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          width: min(420px, 70%);
        }
        .pbi-loader__skeleton span {
          height: 54px;
          border-radius: 12px;
          background: linear-gradient(90deg, rgba(24,49,46,0.05), rgba(24,49,46,0.11), rgba(24,49,46,0.05));
          background-size: 200% 100%;
          animation: pbiShimmer 1.4s ease-in-out infinite;
        }
        .pbi-loader__skeleton span:nth-child(2) { animation-delay: 0.12s; }
        .pbi-loader__skeleton span:nth-child(3) { animation-delay: 0.24s; }
        .pbi-loader__skeleton span:nth-child(4) { animation-delay: 0.36s; }
        .pbi-loader__label { margin: 0; font-size: 12px; color: var(--muted); }
        .pbi-loader__msg { display: grid; gap: 14px; justify-items: center; }
        .pbi-loader__msg p { margin: 0; font-size: 14px; color: var(--ink); }
        .pbi-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 18px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }
        .pbi-btn--accent { background: var(--deep); color: #fff; }
        @keyframes pbiShimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }

        /* full screen (native where available, CSS overlay otherwise) */
        .pbi-shell.is-expanded {
          position: fixed;
          inset: 0;
          z-index: 10000;
          max-width: none;
          margin: 0;
          padding: 0;
          border-radius: 0;
          display: grid;
          place-items: center;
          background: #0f2825;
          box-shadow: none;
        }
        .pbi-shell.is-expanded .pbi-stage {
          width: min(100vw, calc(100svh * ${REPORT_RATIO}));
          border-radius: 0;
        }
        .pbi-close {
          position: fixed;
          top: 14px;
          right: 14px;
          z-index: 3;
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(20,63,56,0.88);
          color: #fff;
          cursor: pointer;
        }

        .pbi-mobile-hint { display: none; }
        .pbi-footnote {
          margin: 16px auto 0;
          max-width: calc((100svh - 150px) * 16 / 9);
          font-size: 12px;
          line-height: 1.6;
          color: #7b8983;
        }

        @media (max-width: 900px) {
          .pbi-highlights { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 760px) {
          .pbi-page { padding-top: 96px; }
          .pbi-switcher { width: 100%; }
          .pbi-switcher__tab { flex: 1; justify-content: center; padding: 9px 10px; font-size: 11px; }
          .pbi-highlights { gap: 8px; }
          .pbi-highlight { padding: 16px; border-radius: 16px; }
          .pbi-toolbar__hint { display: none; }
          .pbi-toolbar { margin-bottom: 10px; }
          .pbi-shell { padding: 5px; border-radius: 16px; }
          .pbi-stage { border-radius: 12px; }
          .pbi-mobile-hint {
            display: flex;
            align-items: center;
            gap: 10px;
            width: 100%;
            margin-bottom: 10px;
            padding: 13px 14px;
            border-radius: 14px;
            border: 1px solid rgba(255,255,255,0.88);
            background: rgba(255,255,255,0.56);
            color: var(--ink);
            font-family: inherit;
            font-size: 13px;
            text-align: left;
            cursor: pointer;
          }
          .pbi-mobile-hint svg { color: var(--green); flex-shrink: 0; }
          /* Phones held upright: rotate the report to landscape inside the overlay. */
          @media (orientation: portrait) {
            .pbi-shell.is-expanded .pbi-stage {
              position: absolute;
              top: 50%;
              left: 50%;
              width: min(100svh, calc(100vw * ${REPORT_RATIO}));
              transform: translate(-50%, -50%) rotate(90deg);
            }
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .pbi-loader__skeleton span { animation: none; }
        }
      `}</style>
    </Motion.main>
  )
}
