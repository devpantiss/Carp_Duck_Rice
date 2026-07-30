import { FiCloud, FiDroplet, FiHeart, FiFeather, FiUsers } from 'react-icons/fi'

const signals = [
  ['Park Health Index', '94.8', 'All ecological loops balanced', FiHeart],
  ['Sustainability Score', '89%', '+4.2% from last month', FiFeather],
  ['Water Resource', '72%', '3.8 days of reserve flow', FiDroplet],
  ['Live Visitors', '142', '31 returning guests today', FiUsers],
]

export default function ParkIntelligence() {
  return <section className="park-intelligence">
    <header><div><span>Park-wide intelligence</span><h2>One living system, beautifully in balance.</h2></div><div className="park-intelligence__weather"><FiCloud /><div><strong>29°C · Partly cloudy</strong><small>Rain probability 18% · Gentle south-east wind</small></div></div></header>
    <div className="park-intelligence__signals">{signals.map(([label, value, detail, Icon]) => <article key={label}><Icon /><span>{label}</span><strong>{value}</strong><p>{detail}</p></article>)}</div>
    <div className="park-intelligence__bottom"><div><span>Today’s operating narrative</span><p>Water, pasture, and canopy systems are exchanging resources efficiently. Visitor activity is expected to peak between 16:00–18:30.</p></div><div><span>Upcoming observance</span><strong>Monsoon Harvest Walk</strong><small>Friday · 17:00 · 24 places reserved</small></div><div><span>Maintenance pulse</span><strong>2 scheduled tasks</strong><small>North irrigation valve · Coffee roaster filter</small></div></div>
  </section>
}
