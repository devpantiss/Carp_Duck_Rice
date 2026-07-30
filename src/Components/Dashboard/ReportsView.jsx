import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFileText, FiDownload, FiCheckCircle } from 'react-icons/fi'

export default function ReportsView() {
  const [downloadingReport, setDownloadingReport] = useState(null)
  const [progress, setProgress] = useState(0)
  const [success, setSuccess] = useState(false)

  const reports = [
    { title: 'Financial Audit Report', desc: 'Detailed profit/loss ledger, product sells breakdown, tourism and lodge revenue curves.', category: 'Financial', size: '2.4 MB' },
    { title: 'Water & Bio Filtration Logs', desc: 'pH records, dissolved oxygen telemetry curves, micro-sensor alerts from Wetland Filtration Pond.', category: 'Ecology', size: '1.8 MB' },
    { title: 'Visitor Dynamics Audit', desc: 'School group registrations, international eco-tourists statistics, and tour guide indices.', category: 'Tourism', size: '1.2 MB' },
    { title: 'CSR & Sustainable Livelihoods', desc: 'Artisans loom outputs, coffee self-help groups wages, and rural park livelihood index audits.', category: 'CSR', size: '3.1 MB' },
    { title: 'Scientific Biodiversity Research', desc: 'Khaki Campbell nesting indices, Eastern Ghats goats breeding census, canopy canopy ratios.', category: 'Research', size: '4.8 MB' },
    { title: 'Government Return Audit', desc: 'Environmental compliances, zero-chemical certification index for silk handlooms.', category: 'Government', size: '1.5 MB' }
  ]

  const triggerDownload = (title) => {
    setDownloadingReport(title)
    setProgress(0)
    setSuccess(false)

    // Simulate compilation progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setSuccess(true)
          setTimeout(() => {
            setDownloadingReport(null)
            setSuccess(false)
          }, 2000)
          return 100
        }
        return prev + 25
      })
    }, 400500) // Fast and smooth
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative' }}>
      
      {/* Header */}
      <div className="tab-view-header">
        <h2 className="section-title-serif">Compliance &amp; System Reports</h2>
        <p className="section-desc">Generate, inspect, and export verified records for CSR partners, government checkers, and scientific audits.</p>
      </div>

      {/* Grid of Report Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        {reports.map((rep, idx) => (
          <div key={idx} className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', justifycontent: 'space-between', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--accent-gold)', background: 'rgba(212,172,13,0.1)', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase' }}>
                  {rep.category}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>{rep.size}</span>
              </div>
              <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-dark)' }}>{rep.title}</h4>
              <p style={{ fontSize: '11.5px', color: 'var(--text-light)', marginTop: '8px', lineHeight: '1.5' }}>{rep.desc}</p>
            </div>
            
            <button
              onClick={() => triggerDownload(rep.title)}
              className="btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', width: 'max-content', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              <FiDownload />
              <span>Export PDF Report</span>
            </button>
          </div>
        ))}
      </div>

      {/* Simulated Compilation Progress Modal */}
      <AnimatePresence>
        {downloadingReport && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="os-glass-card"
              style={{ width: '360px', padding: '32px', textAlign: 'center', background: 'white' }}
            >
              {!success ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  <FiFileText style={{ fontSize: '42px', color: 'var(--accent-gold)', animation: 'float 2s infinite ease-in-out' }} />
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-dark)' }}>Compiling PDF Document</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>Gathering environmental telemetry maps...</p>
                  </div>
                  {/* Progress track */}
                  <div style={{ height: '6px', width: '100%', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      style={{ height: '100%', background: 'var(--accent-gold)' }}
                    />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700 }}>{progress}%</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                  <FiCheckCircle style={{ fontSize: '48px', color: 'var(--rice-green)' }} />
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-dark)' }}>Download Ready</h4>
                    <p style={{ fontSize: '11px', color: 'var(--text-light)', marginTop: '4px' }}>PDF document generated and downloaded!</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
