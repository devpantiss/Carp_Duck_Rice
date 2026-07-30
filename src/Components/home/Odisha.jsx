import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

// ── Map projection: W=600 H=700 LON 81.0–87.8 LAT 17.4–23.0 ─────────────────
const W = 600, H = 700;

// ── Accurate district paths from real lat/lon data ────────────────────────────
const DISTRICTS = {
  "Sundargarh": { path: "M 202.9,100.0 L 229.4,68.8 L 264.7,50.0 L 317.6,56.2 L 370.6,56.2 L 401.5,112.5 L 383.8,181.2 L 330.9,225.0 L 273.5,212.5 L 225.0,175.0 L 202.9,137.5 Z", lx: 291.2, ly: 143 },
  "Jharsuguda": { path: "M 202.9,137.5 L 225.0,175.0 L 251.5,212.5 L 286.8,210.0 L 300.0,156.2 L 277.9,112.5 L 233.8,106.3 Z", lx: 255.9, ly: 168 },
  "Keonjhar": { path: "M 370.6,56.2 L 450.0,62.5 L 498.5,143.7 L 450.0,202.5 L 401.5,202.5 L 383.8,181.2 L 401.5,112.5 Z", lx: 427.9, ly: 138 },
  "Mayurbhanj": { path: "M 370.6,56.2 L 397.1,37.5 L 476.5,37.5 L 533.8,100.0 L 516.2,175.0 L 467.6,181.2 L 498.5,143.7 L 450.0,62.5 Z", lx: 466, ly: 108 },
  "Balasore": { path: "M 498.5,143.7 L 520.6,125.0 L 560.3,143.7 L 573.5,212.5 L 538.2,243.7 L 502.9,218.7 L 467.6,181.2 L 516.2,175.0 Z", lx: 533, ly: 183 },
  "Bhadrak": { path: "M 467.6,185.0 L 498.5,168.8 L 520.6,197.5 L 538.2,243.7 L 516.2,293.8 L 485.3,281.2 L 457.1,250.0 Z", lx: 500, ly: 238 },
  "Jajpur": { path: "M 425.3,210.0 L 460.6,193.8 L 487.1,225.0 L 469.4,272.5 L 436.8,290.0 L 414.7,277.5 L 416.5,240.0 Z", lx: 450, ly: 252 },
  "Kendrapada": { path: "M 457.1,240.0 L 487.1,225.0 L 527.6,243.7 L 518.8,310.0 L 478.2,315.0 L 450.0,290.0 Z", lx: 494, ly: 281 },
  "Jagatsinghpur": { path: "M 439.4,315.0 L 460.6,277.5 L 487.1,322.5 L 474.7,360.0 L 439.4,352.5 L 430.6,327.5 Z", lx: 460, ly: 330 },
  "Cuttack": { path: "M 377.6,272.5 L 416.5,240.0 L 441.2,265.0 L 458.8,302.5 L 430.6,350.0 L 395.3,352.5 L 368.8,315.0 Z", lx: 415, ly: 308 },
  "Dhenkanal": { path: "M 372.4,215.0 L 416.5,187.5 L 442.9,218.7 L 432.4,272.5 L 397.1,285.0 L 372.4,272.5 L 368.8,240.0 Z", lx: 405, ly: 252 },
  "Angul": { path: "M 319.4,222.5 L 363.5,185.0 L 398.8,222.5 L 381.2,260.0 L 354.7,290.0 L 337.1,277.5 L 315.9,247.5 Z", lx: 358, ly: 248 },
  "Sambalpur": { path: "M 248.8,215.0 L 289.4,210.0 L 319.4,222.5 L 315.9,247.5 L 337.1,277.5 L 284.1,302.5 L 240.0,277.5 L 218.8,240.0 L 222.4,185.0 Z", lx: 274, ly: 252 },
  "Deogarh": { path: "M 319.4,185.0 L 355.0,178.0 L 372.4,215.0 L 368.8,240.0 L 337.1,248.0 L 315.9,235.0 Z", lx: 350, ly: 218 },
  "Subarnapur": { path: "M 218.8,235.0 L 245.3,210.0 L 275.3,260.0 L 254.1,297.5 L 218.8,277.5 L 201.2,250.0 Z", lx: 238, ly: 258 },
  "Bargarh": { path: "M 169.4,140.0 L 213.5,131.3 L 225.0,172.5 L 248.8,215.0 L 218.8,277.5 L 174.7,265.0 L 148.2,227.5 L 157.1,172.5 Z", lx: 187, ly: 212 },
  "Bolangir": { path: "M 169.4,265.0 L 213.5,272.5 L 233.8,315.0 L 216.2,377.5 L 174.7,390.0 L 134.1,365.0 L 142.9,302.5 Z", lx: 184, ly: 332 },
  "Boudh": { path: "M 231.2,277.5 L 280.6,302.5 L 310.6,347.5 L 271.8,377.5 L 222.4,352.5 L 213.5,315.0 Z", lx: 261, ly: 337 },
  "Nuapada": { path: "M 114.7,272.5 L 142.9,227.5 L 169.4,252.5 L 160.6,315.0 L 134.1,365.0 L 95.3,340.0 L 86.5,290.0 Z", lx: 128, ly: 310 },
  "Kalahandi": { path: "M 134.1,365.0 L 174.7,385.0 L 216.2,377.5 L 216.2,440.0 L 187.1,477.5 L 142.9,477.5 L 107.6,440.0 L 98.8,390.0 Z", lx: 163, ly: 428 },
  "Kandhamal": { path: "M 231.2,315.0 L 280.6,315.0 L 315.9,352.5 L 307.1,415.0 L 266.5,452.5 L 218.8,440.0 L 207.4,390.0 L 227.6,340.0 Z", lx: 260, ly: 388 },
  "Nayagarh": { path: "M 307.1,352.5 L 351.2,322.5 L 372.4,360.0 L 351.2,402.5 L 315.9,415.0 L 291.2,390.0 L 301.8,352.5 Z", lx: 332, ly: 378 },
  "Khordha": { path: "M 351.2,322.5 L 381.2,290.0 L 407.6,322.5 L 398.8,377.5 L 361.8,385.0 L 344.1,360.0 Z", lx: 375, ly: 350 },
  "Puri": { path: "M 377.6,310.0 L 407.6,290.0 L 442.9,315.0 L 439.4,372.5 L 410.3,402.5 L 377.6,385.0 L 368.8,347.5 Z", lx: 408, ly: 356 },
  "Ganjam": { path: "M 240.0,440.0 L 308.8,415.0 L 337.1,452.5 L 342.4,515.0 L 308.8,552.5 L 245.3,540.0 L 201.2,502.5 L 218.8,452.5 Z", lx: 272, ly: 490 },
  "Gajapati": { path: "M 240.0,477.5 L 286.8,452.5 L 315.9,502.5 L 307.1,565.0 L 264.7,590.0 L 218.8,565.0 L 210.0,515.0 Z", lx: 264, ly: 528 },
  "Rayagada": { path: "M 169.4,477.5 L 216.2,477.5 L 240.0,515.0 L 222.4,577.5 L 187.1,602.5 L 142.9,577.5 L 130.6,527.5 L 148.2,477.5 Z", lx: 184, ly: 532 },
  "Koraput": { path: "M 98.8,440.0 L 142.9,440.0 L 169.4,477.5 L 151.8,540.0 L 107.6,565.0 L 72.4,540.0 L 54.7,502.5 L 77.6,452.5 Z", lx: 113, ly: 503 },
  "Nabarangpur": { path: "M 72.4,452.5 L 116.5,440.0 L 134.1,477.5 L 116.5,540.0 L 81.2,552.5 L 45.9,527.5 L 37.1,490.0 L 63.5,452.5 Z", lx: 85, ly: 498 },
  "Malkangiri": { path: "M 37.1,547.5 L 81.2,540.0 L 107.6,577.5 L 90.0,635.0 L 54.7,647.5 L 19.4,622.5 L 15.9,577.5 Z", lx: 58, ly: 595 },
};

// ── Highlighted districts with colors ─────────────────────────────────────────
const HIGHLIGHTED = {
  Khordha: { color: '#0288d1', ring: true, subtitle: 'Headquarters', beneficiaries: '15,000+', pop: '2.25M', area: '2,813 km²', programs: ['CDR Park', 'Pondy Fish', 'Smart City'] },
  Cuttack: { color: '#f59e0b', ring: false, subtitle: 'Silver City', beneficiaries: '12,000+', pop: '2.62M', area: '3,932 km²', programs: ['Silver Craft', 'River Delta', 'Trade Hub'] },
  Jajpur: { color: '#1e88e5', ring: true, subtitle: 'Industrial Hub', beneficiaries: '8,400+', pop: '1.83M', area: '2,899 km²', programs: ['Steel Zone', 'River Craft', 'Mineral Belt'] },
  Keonjhar: { color: '#f97316', ring: false, subtitle: 'Mining Region', beneficiaries: '6,100+', pop: '1.80M', area: '8,303 km²', programs: ['Iron Mines', 'Tribal Craft', 'Hill Forest'] },
  Sundargarh: { color: '#9333ea', ring: true, subtitle: 'Tribal Heritage', beneficiaries: '7,300+', pop: '2.08M', area: '9,712 km²', programs: ['Tribal Hub', 'Steel Plant', 'Eco Tourism'] },
  Angul: { color: '#7c3aed', ring: false, subtitle: 'Coal & Power', beneficiaries: '5,200+', pop: '1.27M', area: '6,375 km²', programs: ['Coal Connect', 'Power Grid', 'Forest Zone'] },
  Kalahandi: { color: '#059669', ring: false, subtitle: 'Agriculture Zone', beneficiaries: '4,800+', pop: '1.57M', area: '7,920 km²', programs: ['Agri Connect', 'Water Harvest', 'Rural Aid'] },
  Kendrapada: { color: '#16a34a', ring: false, subtitle: 'Coastal Program', beneficiaries: '3,900+', pop: '1.44M', area: '2,644 km²', programs: ['Coastal Nets', 'Bhitarkanika', 'Fish Market'] },
};

const ORDER = ['Khordha', 'Cuttack', 'Jajpur', 'Keonjhar', 'Sundargarh', 'Angul', 'Kalahandi', 'Kendrapada'];

// ── Inject CSS ────────────────────────────────────────────────────────────────
(() => {
  if (document.getElementById('odi-styles')) return;
  const s = document.createElement('style');
  s.id = 'odi-styles';
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Teko:wght@300;400;500;600&display=swap');
    @keyframes odi-ring { 0%{transform:scale(1);opacity:.85} 70%{transform:scale(2.8);opacity:0} 100%{transform:scale(2.8);opacity:0} }
    .odi-ring  { position:absolute;inset:0;border-radius:50%;border:2px solid currentColor;animation:odi-ring 2s ease-out infinite; }
    .odi-ring2 { animation-delay:.65s; }
    .odi-row:hover { background:rgba(255,255,255,.07)!important; }
  `;
  document.head.appendChild(s);
})();

// ── Pin ───────────────────────────────────────────────────────────────────────
function Pin({ color, label, ring, isActive, onClick }) {
  return (
    <motion.div onClick={onClick} whileHover={{ scale: 1.18 }} whileTap={{ scale: .92 }}
      style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
      <div style={{ position: 'relative', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {ring && (<><div className="odi-ring" style={{ color, borderColor: color }} /><div className="odi-ring odi-ring2" style={{ color, borderColor: color }} /></>)}
        <motion.div animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: .4 }}
          style={{ width: 16, height: 16, borderRadius: '50%', background: color, border: '2.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: isActive ? `0 0 14px ${color},0 0 5px ${color}` : `0 0 7px ${color}99` }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'white' }} />
        </motion.div>
      </div>
      <motion.span animate={{ opacity: isActive ? 1 : .72, x: isActive ? 2 : 0 }}
        style={{ color: isActive ? 'white' : '#a0b4c8', fontSize: 10, fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, letterSpacing: '.06em', textShadow: '0 1px 5px rgba(0,0,0,.95)', whiteSpace: 'nowrap' }}>
        {label}
      </motion.span>
    </motion.div>
  );
}

// ── Sidebar detail card ───────────────────────────────────────────────────────
function SideDetail({ name }) {
  const d = HIGHLIGHTED[name];
  if (!d) return null;
  return (
    <motion.div key={name}
      initial={{ opacity: 0, y: 14, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: .97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      style={{ background: 'rgba(5,10,22,.98)', border: `1px solid ${d.color}44`, borderLeft: `3px solid ${d.color}`, borderRadius: 10, padding: '14px 16px', backdropFilter: 'blur(12px)', boxShadow: `0 8px 26px rgba(0,0,0,.45),0 0 16px ${d.color}18` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ color: d.color, fontSize: 8, letterSpacing: '.22em', fontWeight: 700, marginBottom: 3, fontFamily: "'Rajdhani',sans-serif" }}>{d.subtitle.toUpperCase()}</div>
          <div style={{ color: 'white', fontSize: 22, fontWeight: 700, fontFamily: "'Teko',sans-serif", letterSpacing: '.08em', lineHeight: 1 }}>{name.toUpperCase()}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: d.color, fontSize: 20, fontWeight: 700, fontFamily: "'Teko',sans-serif" }}>{d.beneficiaries}</div>
          <div style={{ color: 'rgba(255,255,255,.3)', fontSize: 8, letterSpacing: '.12em', fontFamily: "'Rajdhani',sans-serif" }}>BENEFICIARIES</div>
        </div>
      </div>
      <div style={{ color: 'rgba(255,255,255,.28)', fontSize: 8, letterSpacing: '.15em', marginBottom: 6, marginTop: 10, fontFamily: "'Rajdhani',sans-serif" }}>ACTIVE PROGRAMS</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {d.programs.map((p, i) => (
          <motion.span key={p} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * .07 }}
            style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 20, padding: '3px 10px', color: '#94a3b8', fontSize: 9.5, fontFamily: "'Rajdhani',sans-serif", fontWeight: 500 }}>
            {p}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function OdishaMap() {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState('Khordha');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const toggle = n => setSelected(p => p === n ? null : n);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'radial-gradient(ellipse at 52% 36%,#0a1e32 0%,#040c18 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: "'Rajdhani',sans-serif", overflow: 'hidden' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}
        style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ color: '#1e3a52', fontSize: 9, letterSpacing: '.38em', marginBottom: 2 }}>DISTRICT OPERATIONS MAP</div>
        <div style={{ color: 'white', fontSize: 26, fontWeight: 700, letterSpacing: '.18em', fontFamily: "'Teko',sans-serif", lineHeight: 1 }}>🗺 ODISHA</div>
        <div style={{ color: '#1a3348', fontSize: 9, letterSpacing: '.2em', marginTop: 2 }}>STATE OF INDIA · 30 DISTRICTS</div>
      </motion.div>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', width: '100%', maxWidth: 1100 }}>

        {/* ═══ MAP ═══ */}
        <motion.div ref={ref}
          initial={{ opacity: 0, scale: .93 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: .85, ease: [.22, 1, .36, 1] }}
          style={{ position: 'relative', flex: 1, minWidth: 0 }}>

          {/* Neighbour labels */}
          {[
            {
              text: 'Jharkhand',
              top: '5%',
              left: '65%',
              tx: '0%',
              size: 13
            },
            { text: 'CHHATTISGARH', top: '33%', left: '-1%', tx: '0', size: 11 },
            { text: 'ANDHRA PRADESH', bottom: '3%', left: '8%', tx: '0', size: 11 },
          ].map(({ text, top, bottom, left, tx, size }) => (
            <div key={text} style={{ position: 'absolute', top, bottom, left, transform: `translateX(${tx})`, color: 'rgba(255,255,255,.22)', fontSize: size, fontWeight: 700, letterSpacing: '.14em', zIndex: 5, pointerEvents: 'none' }}>
              {text}
            </div>
          ))}

          {/* Bay of Bengal */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: .8 }}
            style={{ position: 'absolute', right: '0%', top: '53%', color: '#1460a0', fontSize: 14, fontWeight: 700, letterSpacing: '.08em', lineHeight: 1.6, textAlign: 'center', zIndex: 5, pointerEvents: 'none', fontFamily: "'Teko',sans-serif" }}>
            <div>BAY OF</div><div>BENGAL</div>
          </motion.div>

          {/* India inset */}
          <motion.div initial={{ opacity: 0, scale: .6 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 1, type: 'spring' }}
            style={{ position: 'absolute', bottom: '3%', right: '1%', width: 68, height: 68, borderRadius: '50%', background: '#8a9299', border: '3px solid #6a7480', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5 }}>
            <svg viewBox="0 0 120 140" width="58" height="58">
              <path d="M40,5 L75,5 L90,15 L100,30 L105,50 L98,65 L110,80 L105,100 L90,115 L70,125 L55,130 L40,120 L25,105 L15,85 L10,65 L20,45 L15,25 L30,12 Z" fill="white" stroke="#bbb" strokeWidth="1.5" />
              <path d="M72,72 L80,70 L85,76 L82,84 L74,86 L68,80 Z" fill="#e74c3c" />
              <circle cx="76" cy="79" r="2.5" fill="#c0392b" />
            </svg>
          </motion.div>

          {/* Ambient glow */}
          <motion.div animate={{ scale: [1, 1.12, 1], opacity: [.3, .5, .3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(2,136,209,.35) 0%,transparent 70%)', top: '49%', left: '63%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 1 }} />
          <motion.div animate={{ scale: [1, 1.08, 1], opacity: [.25, .42, .25] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
            style={{ position: 'absolute', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,51,234,.32) 0%,transparent 70%)', top: '19%', left: '49%', transform: 'translate(-50%,-50%)', pointerEvents: 'none', zIndex: 1 }} />

          {/* ── SVG ── */}
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', filter: 'drop-shadow(0 4px 24px rgba(0,0,0,.55))' }}>
            <defs>
              <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0c3454" />
                <stop offset="100%" stopColor="#061a2a" />
              </linearGradient>
              <filter id="sel-glow">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Sea background */}
            <rect x="490" y="100" width="115" height="605" fill="url(#sea)" opacity=".75" rx="6" />

            {/* All districts */}
            {Object.entries(DISTRICTS).map(([name, { path: d, lx, ly }], i) => {
              const hl = HIGHLIGHTED[name];
              const isHL = !!hl;
              const isSel = selected === name;
              const isHov = hovered === name;

              const fill = isHL
                ? (isSel ? hl.color : isHov ? hl.color + 'bb' : hl.color + '38')
                : (selected ? '#0e2238' : '#122840');
              const stroke = isHL
                ? (isSel ? 'rgba(255,255,255,.7)' : hl.color + '77')
                : 'rgba(255,255,255,.07)';

              return (
                <motion.g key={name}
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: .06 + i * .016, duration: .5 }}
                  onMouseEnter={() => setHovered(name)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => isHL && toggle(name)}
                  style={{ cursor: isHL ? 'pointer' : 'default' }}>
                  <path d={d} fill={fill} stroke={stroke}
                    strokeWidth={isSel ? 2.2 : isHL ? 1.2 : .5}
                    filter={isSel ? `drop-shadow(0 0 10px ${hl.color})` : 'none'}
                    style={{ transition: 'fill .2s,stroke .2s' }} />
                  <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                    fontSize={name.length > 10 ? 7 : name.length > 7 ? 8 : 9}
                    fill={isSel ? '#fff' : isHL ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.32)'}
                    fontWeight={isHL ? '700' : '400'}
                    style={{ userSelect: 'none', pointerEvents: 'none', fontFamily: "'Rajdhani',sans-serif", transition: 'fill .2s' }}>
                    {name}
                  </text>
                </motion.g>
              );
            })}

            {/* ODISHA watermark */}
            <motion.text x="235" y="360" textAnchor="middle" dominantBaseline="middle"
              initial={{ opacity: 0 }} animate={inView ? { opacity: .06 } : {}} transition={{ delay: .7, duration: 1 }}
              fontSize="70" fontWeight="900" fill="white"
              style={{ fontFamily: "'Teko',sans-serif", letterSpacing: '.14em', pointerEvents: 'none' }}>
              ODISHA
            </motion.text>

            {/* Bhubaneswar */}
            <motion.g initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: .95, type: 'spring', stiffness: 280 }}>
              <circle cx="389" cy="338" r="7" fill="#facc15" stroke="#ef4444" strokeWidth="2.5" />
              <circle cx="389" cy="338" r="3" fill="#ef4444" />
              <text x="400" y="339" fontSize="8.5" fontWeight="700" fill="white"
                style={{ fontFamily: "'Rajdhani',sans-serif", textShadow: '0 1px 4px rgba(0,0,0,.9)' }}>Bhubaneswar</text>
            </motion.g>
          </svg>

          {/* Pins overlay — positioned using lx/ly percentages */}
          {Object.entries(HIGHLIGHTED).map(([name, { color, ring }], i) => {
            const { lx, ly } = DISTRICTS[name];
            return (
              <motion.div key={name}
                initial={{ opacity: 0, scale: .2 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: .45 + i * .09, type: 'spring', stiffness: 300, damping: 20 }}
                style={{ position: 'absolute', top: `${(ly / H * 100).toFixed(2)}%`, left: `${(lx / W * 100).toFixed(2)}%`, transform: 'translate(-50%,-50%)', zIndex: 10 }}>
                <Pin color={color} label={name} ring={ring} isActive={selected === name} onClick={() => toggle(name)} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══ SIDEBAR ═══ */}
        <motion.div initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .3, ease: [.22, 1, .36, 1] }}
          style={{ width: 288, display: 'flex', flexDirection: 'column', gap: 7, flexShrink: 0 }}>

          {ORDER.map((name, i) => {
            const d = HIGHLIGHTED[name], isA = selected === name;
            return (
              <motion.div key={name} className="odi-row"
                initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: .45 + i * .07, type: 'spring', stiffness: 260, damping: 22 }}
                onClick={() => toggle(name)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: isA ? 'rgba(255,255,255,.09)' : 'rgba(255,255,255,.03)', border: isA ? `1px solid ${d.color}99` : '1px solid rgba(255,255,255,.07)', borderRadius: 10, padding: '11px 14px', cursor: 'pointer', transition: 'background .2s,border .2s', boxShadow: isA ? `0 0 14px ${d.color}33` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <motion.div animate={isA ? { scale: [1, 1.5, 1] } : { scale: 1 }} transition={{ duration: .4 }}
                    style={{ width: 9, height: 9, borderRadius: '50%', background: d.color, boxShadow: `0 0 7px ${d.color}`, flexShrink: 0 }} />
                  <div>
                    <div style={{ color: 'white', fontSize: 13, fontWeight: 700, letterSpacing: '.04em' }}>{name}</div>
                    <div style={{ color: 'rgba(255,255,255,.35)', fontSize: 9, letterSpacing: '.08em', marginTop: 1 }}>{d.subtitle}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: d.color, fontSize: 13, fontWeight: 700, fontFamily: "'Teko',sans-serif" }}>{d.beneficiaries}</span>
                  <motion.span animate={{ x: isA ? 4 : 0 }} style={{ color: 'rgba(255,255,255,.18)', fontSize: 13 }}>→</motion.span>
                </div>
              </motion.div>
            );
          })}

          <AnimatePresence mode="wait">
            {selected && HIGHLIGHTED[selected] && <SideDetail key={selected} name={selected} />}
          </AnimatePresence>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .9 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 10, overflow: 'hidden' }}>
            {[{ v: '8', l: 'DISTRICTS' }, { v: '58.7K+', l: 'FAMILIES' }, { v: '24+', l: 'PROGRAMS' }].map(({ v, l }, i) => (
              <div key={l} style={{ padding: '13px 8px', textAlign: 'center', borderRight: i < 2 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
                <div style={{ color: 'white', fontSize: 20, fontWeight: 700, fontFamily: "'Teko',sans-serif" }}>{v}</div>
                <div style={{ color: 'rgba(255,255,255,.28)', fontSize: 8, letterSpacing: '.15em', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Legend */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.1 }}
        style={{ marginTop: 14, display: 'flex', gap: 7, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.entries(HIGHLIGHTED).map(([name, { color }]) => (
          <motion.div key={name} whileHover={{ y: -2, scale: 1.06 }} onClick={() => toggle(name)}
            style={{ display: 'flex', alignItems: 'center', gap: 5, background: selected === name ? `${color}22` : 'rgba(255,255,255,.04)', border: `1px solid ${selected === name ? color + '77' : 'rgba(255,255,255,.08)'}`, borderRadius: 20, padding: '4px 11px', cursor: 'pointer', transition: 'background .2s,border .2s' }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}` }} />
            <span style={{ color: 'rgba(255,255,255,.72)', fontSize: 10, fontWeight: 600, letterSpacing: '.05em' }}>{name}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
        style={{ color: 'rgba(255,255,255,.08)', fontSize: 9, letterSpacing: '.2em', marginTop: 10 }}>
        CLICK ANY HIGHLIGHTED DISTRICT TO EXPLORE
      </motion.p>
    </div>
  );
}