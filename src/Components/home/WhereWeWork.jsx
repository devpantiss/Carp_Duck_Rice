import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import India from '@react-map/india';

// ── DATA ──────────────────────────────────────────────────────────────────────
const highlightedStates = {
  Odisha:       { color: '#1565c0', glowColor: 'rgba(21,101,192,0.45)',  ring: true,  small: false },
  Chhattisgarh: { color: '#4a148c', glowColor: 'rgba(74,20,140,0.3)',    ring: false, small: false },
  Jharkhand:    { color: '#e65100', glowColor: 'rgba(230,81,0,0.3)',     ring: false, small: false },
  Assam:        { color: '#006064', glowColor: 'rgba(0,96,100,0.3)',     ring: false, small: false },
  'Tamil Nadu': { color: '#f9a825', glowColor: 'rgba(249,168,37,0.3)',   ring: true,  small: false },
};

const statePinPositions = {
  Odisha:       { x: '50%', y: '54%' },
  Chhattisgarh: { x: '42%', y: '48%' },
  Jharkhand:    { x: '51%', y: '42%' },
  Assam:        { x: '81%', y: '33%' },
  'Tamil Nadu': { x: '30%', y: '82%' },
};

const stateDetails = {
  Odisha:       { capital: 'Bhubaneswar', population: '41.9M', area: '155,707 km²', region: 'East India',      subtitle: 'Headquarters',    beneficiaries: '12,000+', programs: ['CDR Park', 'Pondy Fish', 'Sustainable Fisheries'] },
  Chhattisgarh: { capital: 'Raipur',      population: '25.5M', area: '135,192 km²', region: 'Central India',   subtitle: 'Agriculture Zone', beneficiaries: '5,400+',  programs: ['Agri Zone', 'Rural Connect', 'Crop Aid'] },
  Jharkhand:    { capital: 'Ranchi',       population: '33M',   area: '79,716 km²',  region: 'East India',      subtitle: 'Textile Hub',      beneficiaries: '3,200+',  programs: ['Textile Hub', 'Weave Forward', 'Craft Link'] },
  Assam:        { capital: 'Dispur',       population: '31.2M', area: '78,438 km²',  region: 'Northeast India', subtitle: 'Northeast Hub',    beneficiaries: '2,800+',  programs: ['Tea Connect', 'River Delta', 'NE Craft'] },
  'Tamil Nadu': { capital: 'Chennai',      population: '72.1M', area: '130,058 km²', region: 'South India',     subtitle: 'Coastal Program',  beneficiaries: '4,100+',  programs: ['Coastal Nets', 'Fish Market', 'Sea Harvest'] },
};

const stateOrder = ['Odisha', 'Jharkhand', 'Chhattisgarh', 'Tamil Nadu', 'Assam'];

// ── STYLES ────────────────────────────────────────────────────────────────────
const injectStyles = () => {
  if (document.getElementById('india-map-styles')) return;
  const style = document.createElement('style');
  style.id = 'india-map-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&family=Teko:wght@300;400;500&display=swap');
    @keyframes pulse-ring {
      0%   { transform: scale(1);   opacity: 0.9; }
      70%  { transform: scale(2.6); opacity: 0;   }
      100% { transform: scale(2.6); opacity: 0;   }
    }
    @keyframes spin-orbit {
      from { transform: rotate(0deg) translateX(14px) rotate(0deg); }
      to   { transform: rotate(360deg) translateX(14px) rotate(-360deg); }
    }
    .pin-pulse {
      position: absolute; inset: 0;
      border-radius: 50%;
      border: 2px solid currentColor;
      animation: pulse-ring 2s ease-out infinite;
    }
    .pin-pulse-2 { animation-delay: 0.6s; }
    .orbit-dot {
      position: absolute;
      width: 5px; height: 5px;
      border-radius: 50%;
      background: #f9a825;
      top: 50%; left: 50%;
      margin-top: -2.5px; margin-left: -2.5px;
      animation: spin-orbit 2.5s linear infinite;
    }
    .state-row:hover { background: rgba(255,255,255,0.06) !important; }
  `;
  document.head.appendChild(style);
};
injectStyles();

// ── PIN COMPONENT (map — untouched logic) ─────────────────────────────────────
function Pin({ color, label, ring, small, isActive, onClick }) {
  const size = small ? 18 : 24;
  return (
    <motion.div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer' }} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {ring && (<><div className="pin-pulse" style={{ color, borderColor: color }} /><div className="pin-pulse pin-pulse-2" style={{ color, borderColor: color }} /></>)}
        {small && <div className="orbit-dot" />}
        <motion.div
          animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ width: size * 0.75, height: size * 0.75, borderRadius: '50%', background: color, border: '2.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: isActive ? `0 0 18px ${color}, 0 0 6px ${color}` : `0 0 8px ${color}88` }}
        >
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'white' }} />
        </motion.div>
      </div>
      <motion.span animate={{ opacity: isActive ? 1 : 0.85, x: isActive ? 2 : 0 }} style={{ color: isActive ? 'white' : '#cbd5e0', fontSize: small ? 10 : 12, fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: '0.06em', textShadow: '0 1px 6px rgba(0,0,0,0.9)', whiteSpace: 'nowrap' }}>
        {label}
      </motion.span>
    </motion.div>
  );
}

// ── STATE CARD (map — untouched logic) ────────────────────────────────────────
function StateCard({ state, onClose }) {
  const cfg = highlightedStates[state];
  const info = stateDetails[state];
  if (!cfg || !info) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: 'rgba(10,20,35,0.92)', border: `1px solid ${cfg.color}55`, borderLeft: `3px solid ${cfg.color}`, borderRadius: 10, padding: '14px 22px', minWidth: 300, zIndex: 30, backdropFilter: 'blur(12px)', boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 20px ${cfg.color}22`, fontFamily: "'Rajdhani', sans-serif" }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: cfg.color, boxShadow: `0 0 8px ${cfg.color}` }} />
          <span style={{ color: 'white', fontSize: 18, fontWeight: 700, letterSpacing: '0.08em' }}>{state.toUpperCase()}</span>
        </div>
        <motion.button whileHover={{ scale: 1.2, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>✕</motion.button>
      </div>
      <div style={{ display: 'inline-block', background: `${cfg.color}22`, border: `1px solid ${cfg.color}44`, borderRadius: 4, padding: '2px 8px', color: cfg.color, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', marginBottom: 12 }}>{info.region.toUpperCase()}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[{ icon: '🏛', label: 'Capital', value: info.capital }, { icon: '👥', label: 'Population', value: info.population }, { icon: '📐', label: 'Area', value: info.area }].map(({ icon, label, value }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '8px 10px', borderTop: `2px solid ${cfg.color}44` }}>
            <div style={{ fontSize: 14 }}>{icon}</div>
            <div style={{ color: '#64748b', fontSize: 9, letterSpacing: '0.1em', marginTop: 2 }}>{label.toUpperCase()}</div>
            <div style={{ color: 'white', fontSize: 12, fontWeight: 600, marginTop: 2 }}>{value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
function Sidebar({ selected, onSelect }) {
  const activeInfo   = selected ? stateDetails[selected] : null;
  const activeCfg    = selected ? highlightedStates[selected] : null;

  const totalFamilies  = '27.5K+';
  const totalPrograms  = '12+';

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      style={{
        width: 300,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        fontFamily: "'Rajdhani', sans-serif",
        flexShrink: 0,
      }}
    >
      {/* State rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {stateOrder.map((state, i) => {
          const cfg  = highlightedStates[state];
          const info = stateDetails[state];
          const isActive = selected === state;
          return (
            <motion.div
              key={state}
              className="state-row"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 260, damping: 22 }}
              onClick={() => onSelect(state)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: isActive ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
                border: isActive ? `1px solid ${cfg.color}88` : '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10,
                padding: '12px 16px',
                cursor: 'pointer',
                transition: 'background 0.2s, border 0.2s',
                boxShadow: isActive ? `0 0 16px ${cfg.color}22` : 'none',
              }}
            >
              {/* Left */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <motion.div
                  animate={isActive ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: 10, height: 10, borderRadius: '50%', background: cfg.color, boxShadow: `0 0 8px ${cfg.color}`, flexShrink: 0 }}
                />
                <div>
                  <div style={{ color: 'white', fontSize: 15, fontWeight: 700, letterSpacing: '0.04em' }}>{state}</div>
                  <div style={{ color: '#64748b', fontSize: 10, letterSpacing: '0.08em', marginTop: 1 }}>{info.subtitle}</div>
                </div>
              </div>

              {/* Right */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: cfg.color, fontSize: 15, fontWeight: 700 }}>{info.beneficiaries}</span>
                <motion.span
                  animate={{ x: isActive ? 3 : 0 }}
                  style={{ color: '#334155', fontSize: 14 }}
                >→</motion.span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        {selected && activeInfo && activeCfg && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit ={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{
              background: 'rgba(10,20,40,0.95)',
              border: `1px solid ${activeCfg.color}44`,
              borderLeft: `3px solid ${activeCfg.color}`,
              borderRadius: 10,
              padding: '16px 18px',
              backdropFilter: 'blur(12px)',
              boxShadow: `0 8px 28px rgba(0,0,0,0.4), 0 0 20px ${activeCfg.color}18`,
            }}
          >
            {/* Tag + count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ color: activeCfg.color, fontSize: 9, letterSpacing: '0.2em', fontWeight: 600, marginBottom: 4 }}>
                  {activeInfo.subtitle.toUpperCase()}
                </div>
                <div style={{ color: 'white', fontSize: 26, fontWeight: 700, fontFamily: "'Teko', sans-serif", letterSpacing: '0.08em', lineHeight: 1 }}>
                  {selected.toUpperCase()}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: activeCfg.color, fontSize: 22, fontWeight: 700, fontFamily: "'Teko', sans-serif" }}>
                  {activeInfo.beneficiaries}
                </div>
                <div style={{ color: '#475569', fontSize: 9, letterSpacing: '0.12em' }}>BENEFICIARIES</div>
              </div>
            </div>

            {/* Programs */}
            <div style={{ color: '#475569', fontSize: 9, letterSpacing: '0.15em', marginBottom: 8, marginTop: 12 }}>
              ACTIVE PROGRAMS
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {activeInfo.programs.map((prog, i) => (
                <motion.span
                  key={prog}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 20,
                    padding: '4px 12px',
                    color: '#94a3b8',
                    fontSize: 11,
                    fontWeight: 500,
                  }}
                >
                  {prog}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        {[
          { value: stateOrder.length, label: 'STATES' },
          { value: totalFamilies,     label: 'FAMILIES' },
          { value: totalPrograms,     label: 'PROGRAMS' },
        ].map(({ value, label }, i) => (
          <div
            key={label}
            style={{
              padding: '14px 10px',
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}
          >
            <div style={{ color: 'white', fontSize: 22, fontWeight: 700, fontFamily: "'Teko', sans-serif" }}>{value}</div>
            <div style={{ color: '#475569', fontSize: 9, letterSpacing: '0.15em', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function IndiaMapDashboard() {
  const [selected, setSelected] = useState('Odisha');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handlePinClick  = (state) => setSelected(prev => prev === state ? null : state);
  const handleMapSelect = (name)  => { if (highlightedStates[name]) setSelected(prev => prev === name ? null : name); };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 60% 40%, #0d2137 0%, #080f1a 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Rajdhani', sans-serif",
      padding: 24,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ textAlign: 'center', marginBottom: 24 }}
      >
        <div style={{ color: '#64748b', fontSize: 10, letterSpacing: '0.35em', marginBottom: 4 }}>INTERACTIVE REGIONAL MAP</div>
        <div style={{ color: 'white', fontSize: 28, fontWeight: 700, letterSpacing: '0.15em', fontFamily: "'Teko', sans-serif" }}>
          🇮🇳 INDIA
        </div>
      </motion.div>

      {/* Body: map + sidebar */}
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', width: '100%', maxWidth: 1080 }}>

        {/* ── MAP (completely untouched) ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative', flex: 1, minWidth: 0 }}
        >
          {/* Glow Odisha */}
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(21,101,192,0.38) 0%, transparent 70%)', top: '44%', left: '57%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 1 }} />
          {/* Glow Tamil Nadu */}
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,168,37,0.3) 0%, transparent 70%)', top: '82%', left: '44%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 1 }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <India type="select-single" size={700} mapColor="#b8cfe0" strokeColor="#0d1b2a" strokeWidth={1} hoverColor="#7fb3d3" selectColor="#1565c0" hints={false} onSelect={handleMapSelect} />
          </div>

          {Object.entries(statePinPositions).map(([state, pos], i) => {
            const cfg = highlightedStates[state];
            if (!cfg) return null;
            return (
              <motion.div key={state} initial={{ opacity: 0, scale: 0.3 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 280, damping: 20 }}
                style={{ position: 'absolute', top: pos.y, left: pos.x, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                <Pin color={cfg.color} label={state} ring={cfg.ring} small={cfg.small} isActive={selected === state} onClick={() => handlePinClick(state)} />
              </motion.div>
            );
          })}

          <AnimatePresence mode="wait">
            {selected && <StateCard key={selected} state={selected} onClose={() => setSelected(null)} />}
          </AnimatePresence>
        </motion.div>
        {/* ── END MAP ── */}

        {/* Sidebar */}
        <Sidebar selected={selected} onSelect={(s) => setSelected(prev => prev === s ? null : s)} />
      </div>

      {/* Legend */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1, duration: 0.5 }}
        style={{ marginTop: 20, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.entries(highlightedStates).map(([state, cfg]) => (
          <motion.div key={state} whileHover={{ y: -2, scale: 1.05 }} onClick={() => setSelected(prev => prev === state ? null : state)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: selected === state ? `${cfg.color}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${selected === state ? cfg.color + '66' : 'rgba(255,255,255,0.08)'}`, borderRadius: 20, padding: '5px 12px', cursor: 'pointer', transition: 'background 0.2s, border 0.2s' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }} />
            <span style={{ color: '#cbd5e0', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em' }}>{state}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
        style={{ color: '#334155', fontSize: 10, letterSpacing: '0.2em', marginTop: 14 }}>
        CLICK A PIN OR STATE TO EXPLORE
      </motion.p>
    </div>
  );
}