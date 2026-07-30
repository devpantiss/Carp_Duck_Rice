import { motion } from 'framer-motion'
import { FiActivity, FiArrowUpRight, FiCheck, FiClock, FiStar } from 'react-icons/fi'

const programs = {
  pondy: {
    eyebrow: 'Living water intelligence', title: 'Pond health & harvest outlook', score: 94, accent: 'var(--water-mid)',
    metrics: [['Water temperature', '26.4°C', 'Stable through 15:00'], ['Feeding timeline', '14:30', 'Next feed · Pond Alpha'], ['Harvest outlook', '1.8 t', '18 days · +12% forecast']],
    bars: [['Dissolved oxygen', 82], ['Pond capacity', 74], ['Seasonal growth', 88]],
    note: 'Morning sampling confirms a balanced water cycle. Aeration can remain in eco mode until the afternoon feed.'
  },
  guavas: {
    eyebrow: 'Orchard intelligence', title: 'Canopy health & harvest rhythm', score: 91, accent: 'var(--rice-green)',
    metrics: [['Orchard health', '91/100', 'Canopy vitality excellent'], ['Fruit maturity', '68%', 'Peak window in 19 days'], ['Pollination', '86%', 'Above seasonal baseline']],
    bars: [['Soil moisture', 74], ['Irrigation readiness', 96], ['Tree distribution', 83]],
    note: 'Block A is ripening evenly. A light irrigation cycle tonight protects fruit size without stressing roots.'
  },
  goats: {
    eyebrow: 'Herd intelligence', title: 'Pasture care & herd readiness', score: 98, accent: 'var(--reed-brown)',
    metrics: [['Herd health', '98.2%', '3 routine checks today'], ['Vaccinations', '100%', 'Next cluster · Aug 02'], ['Growth progress', '+8.4%', 'Ahead of seasonal plan']],
    bars: [['Feed reserve', 77], ['Paddock recovery', 69], ['Medical compliance', 100]],
    note: 'The doe herd is calm and grazing well. Paddock 3 is ready for a short evening rotation after sanitation.'
  },
  tamarind: {
    eyebrow: 'Forest intelligence', title: 'Canopy resilience & carbon story', score: 93, accent: 'var(--accent-teal)',
    metrics: [['Forest health', '93/100', '450 trees monitored'], ['Carbon impact', '18.6 t', 'Projected this season'], ['Rainfall capture', '72 mm', '7-day accumulation']],
    bars: [['Canopy density', 86], ['Soil recharge', 71], ['Harvest readiness', 64]],
    note: 'The grove is retaining moisture beautifully. Leaf density remains above target, strengthening the rain-runoff loop.'
  },
  tassar: {
    eyebrow: 'Atelier intelligence', title: 'Craft flow & collection performance', score: 89, accent: 'var(--accent-gold)',
    metrics: [['Loom status', '8 / 10', '6 active · 2 finishing'], ['Silk production', '18.2 m', 'Today’s woven length'], ['Export signals', '04', 'Buyer enquiries this week']],
    bars: [['Artisan productivity', 87], ['Collection completion', 63], ['Workshop capacity', 80]],
    note: 'The monsoon collection is moving through finishing with strong quality checks. Two artisan slots open after 16:00.'
  },
  poultry: {
    eyebrow: 'Reserve intelligence', title: 'Flock wellbeing & production flow', score: 96, accent: '#f97316',
    metrics: [['Egg production', '380', '94% of daily target'], ['Hatch rate', '92%', '+3.1% vs last cycle'], ['Farm temperature', '27.1°C', 'Comfort zone maintained']],
    bars: [['Bird health', 96], ['Feed consumption', 72], ['Production efficiency', 90]],
    note: 'The flock is settled and intake is steady. North coop cooling can remain on a low, efficient setting.'
  },
  coffee: {
    eyebrow: 'Roastery intelligence', title: 'Bean quality & service rhythm', score: 92, accent: '#8b5cf6',
    metrics: [['Bean quality', '87 / 100', 'Cupping batch C-14'], ['Roast progress', '68%', 'Medium reserve profile'], ['Coffee orders', '28', '11 awaiting dispatch']],
    bars: [['Plantation health', 89], ['Processing queue', 58], ['Tasting sessions', 76]],
    note: 'Today’s roast is tracking a warm chocolate finish. The tasting table is ready for the 17:30 visitor session.'
  }
}

const trendPaths = {
  pondy: 'M0 80 C28 68 41 75 63 54 S98 45 121 52 S160 15 190 25 S230 14 260 8',
  guavas: 'M0 75 C32 70 48 60 72 64 S109 38 135 44 S180 20 205 31 S240 9 260 14',
  goats: 'M0 72 C22 50 47 66 70 48 S110 55 136 32 S180 41 205 20 S235 27 260 10',
  tamarind: 'M0 82 C35 65 44 58 70 62 S108 31 135 42 S174 52 205 28 S240 15 260 18',
  tassar: 'M0 70 C25 78 48 50 70 58 S110 28 135 39 S178 25 205 33 S235 10 260 18',
  poultry: 'M0 76 C22 61 48 67 70 47 S110 48 135 26 S176 35 205 16 S239 24 260 7',
  coffee: 'M0 80 C27 66 46 71 70 55 S108 29 135 40 S180 19 205 25 S239 5 260 12'
}

export default function ProgramIntelligence({ program }) {
  const data = programs[program]
  if (!data) return null

  return (
    <section className="program-intelligence" style={{ '--program-accent': data.accent }}>
      <div className="program-intelligence__intro">
        <div>
          <span>{data.eyebrow}</span>
          <h2>{data.title}</h2>
        </div>
        <div className="program-intelligence__score" aria-label={`Health score ${data.score} out of 100`}>
          <svg viewBox="0 0 42 42"><circle className="program-intelligence__track" cx="21" cy="21" r="15.9" /><circle className="program-intelligence__ring" cx="21" cy="21" r="15.9" pathLength="100" style={{ strokeDasharray: `${data.score} 100` }} /></svg>
          <strong>{data.score}</strong><small>index</small>
        </div>
      </div>

      <div className="program-intelligence__grid">
        {data.metrics.map(([label, value, detail], index) => (
          <motion.article key={label} className="program-intelligence__metric" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
            <span>{label}</span><strong>{value}</strong><p><FiCheck /> {detail}</p>
          </motion.article>
        ))}
      </div>

      <div className="program-intelligence__lower">
        <article className="program-intelligence__bars">
          <div className="program-intelligence__card-heading"><span>Live operating signals</span><FiActivity /></div>
          {data.bars.map(([label, value]) => <div className="program-intelligence__bar" key={label}><div><span>{label}</span><strong>{value}%</strong></div><i><b style={{ width: `${value}%` }} /></i></div>)}
        </article>
        <article className="program-intelligence__brief">
          <div className="program-intelligence__card-heading"><span>AI field note</span><FiStar /></div>
          <p>{data.note}</p>
          <footer><span><FiClock /> refreshed just now</span><button>View field brief <FiArrowUpRight /></button></footer>
        </article>
      </div>

      <div className="program-analytics-deck">
        <article className="program-analytics-deck__chart">
          <div className="program-intelligence__card-heading"><span>Seven-day performance curve</span><span>+12.4% <FiArrowUpRight /></span></div>
          <div className="program-analytics-deck__chart-body">
            <div className="program-analytics-deck__value"><strong>{data.score}.6</strong><small>performance score</small></div>
            <svg viewBox="0 0 260 100" preserveAspectRatio="none" aria-label="Seven day performance chart"><defs><linearGradient id={`fill-${program}`} x1="0" x2="0" y1="0" y2="1"><stop stopColor="var(--program-accent)" stopOpacity=".25"/><stop offset="1" stopColor="var(--program-accent)" stopOpacity="0"/></linearGradient></defs><path d={`${trendPaths[program]} L260 100 L0 100 Z`} fill={`url(#fill-${program})`} /><path d={trendPaths[program]} fill="none" stroke="var(--program-accent)" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg>
          </div>
          <footer><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Today</span></footer>
        </article>
        <article className="program-analytics-deck__compare">
          <div className="program-intelligence__card-heading"><span>Target runway</span><span>Q3</span></div>
          <div className="program-analytics-deck__donut"><i style={{ '--donut-progress': `${data.score * 3.6}deg` }} /><strong>{data.score}%</strong></div>
          <p>Current trajectory is <b>above plan</b>. Forecast target arrives 4 days early.</p>
        </article>
        <article className="program-analytics-deck__activity">
          <div className="program-intelligence__card-heading"><span>Live activity ledger</span><span className="program-live-dot">live</span></div>
          <ul><li><i /> Sensor reading verified <time>2m</time></li><li><i /> Field team update logged <time>18m</time></li><li><i /> Tomorrow’s checklist prepared <time>1h</time></li></ul>
        </article>
      </div>
    </section>
  )
}
