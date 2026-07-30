import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX, FiCalendar, FiClock, FiSettings, FiActivity } from 'react-icons/fi'

export default function OperationsView() {
  const [approvals, setApprovals] = useState([
    { id: 1, type: 'Harvest', details: 'Harvest 180kg Organic Carp from Pond Alpha', requestedBy: 'Amit Pradhan', time: '10 mins ago' },
    { id: 2, type: 'Wholesale Export', details: 'Export 80kg Arabica Coffee Beans to CSR Client', requestedBy: 'Rajesh Mishra', time: '25 mins ago' },
    { id: 3, type: 'Maintenance Override', details: 'Activate automated ground irrigation grid 4', requestedBy: 'Priyanka Naik', time: '1 hour ago' }
  ])

  const [activeTasks, setActiveTasks] = useState([
    { id: 1, task: 'Recalibrate Pond pH sensors', assignedTo: 'Amit', priority: 'High', status: 'In Progress' },
    { id: 2, task: 'Sanitize Duck Nesting Area C', assignedTo: 'Priyanka', priority: 'Medium', status: 'Pending' },
    { id: 3, task: 'Package Tamarind Pulp boxes', assignedTo: 'Self-Help Group 2', priority: 'Low', status: 'Completed' }
  ])

  const schedule = [
    { time: '08:00 AM', title: 'Ground Irrigation Sync', type: 'system' },
    { time: '10:00 AM', title: 'Wetland Duck Vaccination Check', type: 'veterinary' },
    { time: '11:30 AM', title: 'CSR Tour Guide Briefing', type: 'visitor' },
    { time: '02:00 PM', title: 'Coffee Drying Bed moisture check', type: 'harvest' },
    { time: '04:30 PM', title: 'Silk loom thread replenishment', type: 'looms' }
  ]

  const handleApprove = (id) => {
    alert(`Request ${id} Approved successfully. System processes triggered.`)
    setApprovals((prev) => prev.filter((a) => a.id !== id))
  }

  const handleReject = (id) => {
    alert(`Request ${id} Rejected. Action logged.`)
    setApprovals((prev) => prev.filter((a) => a.id !== id))
  }

  const toggleTaskStatus = (id) => {
    setActiveTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatus = t.status === 'Pending' ? 'In Progress' : (t.status === 'In Progress' ? 'Completed' : 'Pending')
          return { ...t, status: nextStatus }
        }
        return t
      })
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div className="tab-view-header">
        <h2 className="section-title-serif">Operations &amp; Logistics Control</h2>
        <p className="section-desc">Approve harvest requests, monitor vehicle runs, track staff assignments, and sync sensor overrides.</p>
      </div>

      {/* Approvals Queue & Gantt Timeline */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
        
        {/* Pending approvals queue */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '16px' }}>Pending Director Approvals</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AnimatePresence mode="popLayout">
              {approvals.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-light)', fontSize: '13px' }}>
                  🎉 All approvals cleared! Operational queues normal.
                </motion.div>
              ) : (
                approvals.map((app) => (
                  <motion.div
                    key={app.id}
                    layout
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    style={{ border: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.35)', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--accent-gold)', background: 'rgba(212,172,13,0.1)', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase' }}>
                        {app.type}
                      </span>
                      <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text-dark)', marginTop: '6px' }}>{app.details}</strong>
                      <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-light)', marginTop: '2px' }}>Requested by {app.requestedBy} · {app.time}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleApprove(app.id)}
                        style={{ background: 'var(--rice-green)', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                        title="Approve"
                      >
                        <FiCheck />
                      </button>
                      <button
                        onClick={() => handleReject(app.id)}
                        style={{ background: 'rgba(0,0,0,0.08)', color: 'var(--text-dark)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                        title="Reject"
                      >
                        <FiX />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Daily Schedule Timeline */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '14px' }}>Daily Operations Timeline</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto' }}>
            {schedule.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-dark)' }}>{item.time}</span>
                  <div style={{ width: '1px', height: '30px', background: 'rgba(0,0,0,0.06)', marginTop: '4px' }} />
                </div>
                <div style={{ background: 'rgba(255,255,255,0.3)', padding: '10px 14px', borderRadius: '12px', flex: 1, border: '1px solid rgba(0,0,0,0.03)' }}>
                  <span style={{ fontSize: '8.5px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.05em' }}>{item.type}</span>
                  <h5 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)', marginTop: '2px' }}>{item.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Staff Assignments Checklist & Vehicle Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        
        {/* Active Checklist */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '12px' }}>Maintenance Tasks Assignment</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => toggleTaskStatus(t.id)}
                style={{
                  border: '1px solid rgba(0,0,0,0.05)',
                  background: t.status === 'Completed' ? 'rgba(30,132,73,0.04)' : 'rgba(255,255,255,0.35)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textDecoration: t.status === 'Completed' ? 'line-through' : 'none',
                  opacity: t.status === 'Completed' ? 0.75 : 1
                }}
              >
                <div>
                  <strong style={{ fontSize: '13px', color: 'var(--text-dark)' }}>{t.task}</strong>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-light)', marginTop: '2px' }}>Assigned: {t.assignedTo} · Priority: {t.priority}</span>
                </div>
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 700,
                    color: t.status === 'Completed' ? 'var(--rice-green)' : (t.status === 'In Progress' ? 'var(--water-mid)' : 'var(--text-light)'),
                    background: t.status === 'Completed' ? 'rgba(30,132,73,0.1)' : (t.status === 'In Progress' ? 'rgba(46,134,193,0.1)' : 'rgba(0,0,0,0.05)'),
                    padding: '3px 8px',
                    borderRadius: '20px',
                    textTransform: 'uppercase'
                  }}
                >
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicles list & delivery statuses */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '12px' }}>Vehicle Fleet &amp; Cargo Shipments</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { id: 'V-01', type: 'Electric Cart', load: 'School Tour Shuttle', battery: '92%', status: 'Active' },
              { id: 'V-02', type: 'Wetland Tractor', load: 'Rice Fertilizer Supply', battery: '58%', status: 'Idle' },
              { id: 'V-03', type: 'Cargo Loader', load: 'Coffee/Silk Export run', battery: '85%', status: 'En Route' }
            ].map((v, idx) => (
              <div key={idx} style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.3)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)' }}>{v.id} ({v.type})</h5>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)', display: 'block', marginTop: '2px' }}>Cargo: {v.load} · Battery: {v.battery}</span>
                </div>
                <span style={{ fontSize: '9px', fontWeight: 700, color: v.status === 'Active' || v.status === 'En Route' ? 'var(--water-mid)' : 'var(--text-light)', background: v.status === 'Active' || v.status === 'En Route' ? 'rgba(46,134,193,0.1)' : 'rgba(0,0,0,0.05)', padding: '3px 8px', borderRadius: '20px', textTransform: 'uppercase' }}>
                  {v.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
