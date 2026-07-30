import { useState } from 'react'
import { FiArrowUpRight, FiCheckCircle, FiClock, FiLayers, FiZap } from 'react-icons/fi'

const periods = {
  Today: { value: '84.6', movement: '+8.2%', caption: 'Live park momentum', points: [28, 43, 37, 59, 55, 76, 84] },
  Week: { value: '91.2', movement: '+12.4%', caption: 'Seven-day operating rhythm', points: [42, 49, 44, 63, 68, 73, 91] },
  Season: { value: '88.8', movement: '+16.8%', caption: 'Monsoon season outlook', points: [31, 38, 54, 62, 57, 76, 89] }
}

const priorities = [
  ['Pond Alpha feed window', '14:30 · Aquaculture', 'Ready'],
  ['Canopy moisture review', '16:00 · Orchard', 'Scheduled'],
  ['Coffee tasting session', '17:30 · Visitor experience', '12 seats']
]

export default function OperationsCommandBoard() {
  const [period, setPeriod] = useState('Today')
  const [priority, setPriority] = useState(0)
  const data = periods[period]
  const curve = data.points.map((point, index) => `${index * 42},${100 - point}`).join(' ')

  return <section className="command-board">
    <header><div><span>Control room</span><h2>Where the park’s day comes together.</h2></div><div className="command-board__tabs">{Object.keys(periods).map(item => <button className={item === period ? 'active' : ''} onClick={() => setPeriod(item)} key={item}>{item}</button>)}</div></header>
    <div className="command-board__grid">
      <article className="command-board__momentum"><div className="command-board__heading"><span><FiZap /> Operating momentum</span><b>{data.movement}</b></div><div className="command-board__score"><strong>{data.value}</strong><small>/ 100</small><p>{data.caption}</p></div><svg viewBox="0 0 252 100" preserveAspectRatio="none"><defs><linearGradient id="command-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#148f77" stopOpacity=".28" /><stop offset="1" stopColor="#148f77" stopOpacity="0" /></linearGradient></defs><polyline points={`${curve} 252,100 0,100`} fill="url(#command-fill)" stroke="none" /><polyline points={curve} fill="none" stroke="#148f77" strokeWidth="3" vectorEffect="non-scaling-stroke" /></svg></article>
      <article className="command-board__priorities"><div className="command-board__heading"><span><FiLayers /> Priority queue</span><b>03 open</b></div><div>{priorities.map(([title, detail, status], index) => <button onClick={() => setPriority(index)} key={title} className={priority === index ? 'selected' : ''}><i>{index + 1}</i><span><strong>{title}</strong><small>{detail}</small></span><em>{status}</em></button>)}</div></article>
      <article className="command-board__status"><div className="command-board__heading"><span><FiClock /> Next checkpoint</span></div><div className="command-board__time">14<span>:30</span></div><p>Water-quality confirmation before the afternoon Pond Alpha feed.</p><button><FiCheckCircle /> Mark readiness confirmed <FiArrowUpRight /></button></article>
    </div>
  </section>
}
