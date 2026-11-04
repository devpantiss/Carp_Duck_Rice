import { useState } from 'react'
import { FiCheck, FiChevronRight, FiClipboard, FiMapPin, FiMessageCircle, FiSun } from 'react-icons/fi'

const notes = [
  { time: '08:15', title: 'Pond edge inspection', body: 'Waterline is clear; natural aeration and fish activity are healthy.', place: 'Pond Alpha' },
  { time: '10:40', title: 'Orchard walk-through', body: 'Pollinator activity is strong across the eastern canopy rows.', place: 'Guava AcreRise' },
  { time: '12:05', title: 'Visitor readiness check', body: 'Interpretation trail, drinking points, and rest pavilion are ready.', place: 'Central promenade' }
]

export default function HumanFieldReport() {
  const [selected, setSelected] = useState(0)
  const note = notes[selected]
  return <section className="human-field-report">
    <header><div><span><FiClipboard /> Human field report</span><h2>What the people on the ground are seeing.</h2><p>Today’s verified observations from the livelihood park team.</p></div><div className="human-field-report__stamp"><FiSun /><span>Filed today</span><strong>13:20</strong></div></header>
    <div className="human-field-report__grid">
      <article className="human-field-report__identity"><img src="/images/backgrounds/park-hero.jpg" alt="Livelihood park field team" /><div><span>Field lead</span><strong>Ananya Pradhan</strong><small>Community operations · Morning route complete</small><div className="human-field-report__signed"><FiCheck /> Reviewed &amp; signed off</div></div></article>
      <article className="human-field-report__note"><div className="human-field-report__note-head"><span><FiMapPin /> {note.place}</span><button onClick={() => setSelected((selected + 1) % notes.length)}>Next observation <FiChevronRight /></button></div><time>{note.time}</time><h3>{note.title}</h3><p>“{note.body}”</p><div className="human-field-report__progress"><span>Route completion</span><i><b /></i><strong>86%</strong></div></article>
      <article className="human-field-report__checks"><span><FiMessageCircle /> Team pulse</span><strong>All 14 field members checked in.</strong><p>Two community guides are preparing for the evening wetland walk.</p><button onClick={() => setSelected(2)}>Read the visitor update <FiChevronRight /></button></article>
    </div>
    <nav aria-label="Field observations">{notes.map((item, index) => <button onClick={() => setSelected(index)} className={selected === index ? 'active' : ''} key={item.title}><i>{item.time}</i><span>{item.title}</span></button>)}</nav>
  </section>
}
