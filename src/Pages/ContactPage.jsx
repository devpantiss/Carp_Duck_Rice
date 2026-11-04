import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* ──────────────────────────
   CONTACT HERO
────────────────────────── */
function ContactHero() {
  return (
    <section className="contact-hero">
      <div className="contact-hero__bg">
        <motion.img
          src="/images/backgrounds/contact-hero.jpg"
          alt="Carp Duck Rice Park background"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
      <div className="contact-hero__overlay"/>
      <motion.div className="contact-hero__text container"
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9 }}>
        <div className="section-label" style={{ color:'rgba(255,255,255,0.7)', justifyContent:'center' }}>
          <span style={{ background:'rgba(255,255,255,0.4)', display:'block', width:32, height:1 }}/>
          Come Find Us
          <span style={{ background:'rgba(255,255,255,0.4)', display:'block', width:32, height:1 }}/>
        </div>
        <h1 className="contact-hero__title">Plan Your <em>Visit</em></h1>
        <p className="contact-hero__sub">
          Write to us, call, or simply arrive at dawn — the park gates open every day with the sun
        </p>
      </motion.div>
      <style>{`
        .contact-hero {
          position: relative; height: 60vh; min-height: 420px;
          display: flex; align-items: center; justify-content: center; overflow: hidden;
          background: var(--text-dark);
        }
        .contact-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .contact-hero__overlay {
          position: absolute; inset: 0;
          background: 
            radial-gradient(circle at center, rgba(26, 37, 47, 0.25) 0%, rgba(26, 37, 47, 0.7) 100%),
            linear-gradient(180deg, rgba(26, 82, 118, 0.15) 0%, rgba(26, 37, 47, 0.8) 100%);
          z-index: 1;
        }
        .contact-hero__text {
          position: relative; z-index: 2; text-align: center; color: white;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
        }
        .contact-hero__title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 9vw, 8rem);
          font-weight: 300; letter-spacing: -0.03em; line-height: 1;
          margin-bottom: 16px;
        }
        .contact-hero__title em { color: var(--accent-gold); font-style: italic; }
        .contact-hero__sub {
          font-size: clamp(12px,1.4vw,15px);
          color: rgba(255,255,255,0.75); max-width: 460px;
          margin: 0 auto; line-height: 1.7; letter-spacing: 0.05em;
        }
      `}</style>
    </section>
  )
}

/* ──────────────────────────
   QUICK INFO STRIP
────────────────────────── */
const infoItems = [
  { icon: '🕕', label: 'Daily Hours', value: '6:00 AM – 6:00 PM', note: '365 days a year, no closures' },
  { icon: '📍', label: 'Location', value: 'Bhubaneswar, Odisha', note: '45 min from airport' },
  { icon: '📞', label: 'Phone', value: '+91 94370 XXXXX', note: 'Mon–Sun, 7 AM – 7 PM' },
  { icon: '✉️', label: 'Email', value: 'visit@cdrpark.in', note: 'Response within 24 hrs' },
]

function InfoStrip() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  return (
    <section className="info-strip" ref={ref}>
      {infoItems.map((item, i) => (
        <motion.div key={item.label} className="info-strip__item"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.1 }}>
          <div className="info-strip__icon">{item.icon}</div>
          <div className="info-strip__label">{item.label}</div>
          <div className="info-strip__value">{item.value}</div>
          <div className="info-strip__note">{item.note}</div>
        </motion.div>
      ))}
      <style>{`
        .info-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: var(--text-dark);
        }
        .info-strip__item {
          padding: 44px 36px;
          border-right: 1px solid rgba(255,255,255,0.07);
          text-align: center;
        }
        .info-strip__item:last-child { border-right: none; }
        .info-strip__icon { font-size: 28px; margin-bottom: 16px; }
        .info-strip__label {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--accent-gold); margin-bottom: 8px; font-weight: 600;
        }
        .info-strip__value {
          font-family: var(--font-display); font-size: 18px; font-weight: 400;
          color: white; margin-bottom: 6px;
        }
        .info-strip__note { font-size: 11px; color: rgba(255,255,255,0.35); }
        @media (max-width: 900px) { .info-strip { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 500px) { .info-strip { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

/* ──────────────────────────
   CONTACT FORM + SIDEBAR
────────────────────────── */
const visitTypes = [
  'Individual / Family Visit',
  'School Educational Tour',
  'Photography Session',
  'Research & Academic Visit',
  'Corporate / Team Outing',
  'Guided Experience Booking',
  'Press & Media',
  'Partnership / Collaboration',
  'Other',
]

const groupSizes = ['Just me', '2–5 people', '6–15 people', '16–30 people', '30+ people']

function ContactForm() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({
    name: '', email: '', phone: '', visitType: '', groupSize: '', date: '', message: '',
  })
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState('form') // 'form' | 'sending' | 'sent'

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.visitType) e.visitType = 'Please select a visit type'
    if (!form.message.trim()) e.message = 'Please tell us about your planned visit'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStep('sending')
    await new Promise(r => setTimeout(r, 1800))
    setStep('sent')
  }

  return (
    <section className="contact-main" ref={ref}>
      <div className="container">
        <div className="contact-main__layout">

          {/* ── FORM COLUMN ── */}
          <motion.div className="contact-form-col"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0 }}>
            <div className="section-label">Send a Message</div>
            <h2 className="display-heading">Get in <em>Touch</em></h2>
            <div className="divider"/>

            <AnimatePresence mode="wait">
              {step === 'form' && (
                <motion.form key="form" onSubmit={handleSubmit}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="contact-form" noValidate>

                  {/* Row 1: name + email */}
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label className="contact-form__label">Full Name *</label>
                      <input className={`contact-form__input ${errors.name ? 'error' : ''}`}
                        type="text" placeholder="Your full name"
                        value={form.name} onChange={set('name')}/>
                      {errors.name && <span className="contact-form__error">{errors.name}</span>}
                    </div>
                    <div className="contact-form__field">
                      <label className="contact-form__label">Email Address *</label>
                      <input className={`contact-form__input ${errors.email ? 'error' : ''}`}
                        type="email" placeholder="your@email.com"
                        value={form.email} onChange={set('email')}/>
                      {errors.email && <span className="contact-form__error">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Row 2: phone + date */}
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label className="contact-form__label">Phone (optional)</label>
                      <input className="contact-form__input"
                        type="tel" placeholder="+91 XXXXX XXXXX"
                        value={form.phone} onChange={set('phone')}/>
                    </div>
                    <div className="contact-form__field">
                      <label className="contact-form__label">Planned Visit Date</label>
                      <input className="contact-form__input"
                        type="date" value={form.date} onChange={set('date')}/>
                    </div>
                  </div>

                  {/* Row 3: visit type + group size */}
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label className="contact-form__label">Visit Type *</label>
                      <select className={`contact-form__input ${errors.visitType ? 'error' : ''}`}
                        value={form.visitType} onChange={set('visitType')}>
                        <option value="">Select visit type...</option>
                        {visitTypes.map(t => <option key={t}>{t}</option>)}
                      </select>
                      {errors.visitType && <span className="contact-form__error">{errors.visitType}</span>}
                    </div>
                    <div className="contact-form__field">
                      <label className="contact-form__label">Group Size</label>
                      <select className="contact-form__input"
                        value={form.groupSize} onChange={set('groupSize')}>
                        <option value="">Select group size...</option>
                        {groupSizes.map(g => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="contact-form__field">
                    <label className="contact-form__label">Your Message *</label>
                    <textarea className={`contact-form__input contact-form__textarea ${errors.message ? 'error' : ''}`}
                      placeholder="Tell us about your planned visit, any special requirements, questions, or how we can help..."
                      rows={5} value={form.message} onChange={set('message')}/>
                    {errors.message && <span className="contact-form__error">{errors.message}</span>}
                  </div>

                  {/* Newsletter opt-in */}
                  <label className="contact-form__checkbox">
                    <input type="checkbox" style={{ accentColor: 'var(--accent-gold)' }}/>
                    <span>Keep me updated about park events and seasonal highlights</span>
                  </label>

                  <button type="submit" className="btn-primary contact-form__submit">
                    <span>Send Message</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </motion.form>
              )}

              {step === 'sending' && (
                <motion.div key="sending" className="contact-form__sending"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="contact-form__spinner"/>
                  <p>Sending your message...</p>
                </motion.div>
              )}

              {step === 'sent' && (
                <motion.div key="sent" className="contact-form__success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}>
                  <div className="contact-form__success-icon">🌾</div>
                  <h3 className="contact-form__success-title">Thank you, {form.name}!</h3>
                  <p className="contact-form__success-body">
                    Your message has been received. Our team will reach out within 24 hours to help plan your visit to CDR Livelihood Park.
                  </p>
                  <div className="contact-form__success-detail">
                    <div><span>Visit type</span><strong>{form.visitType || '—'}</strong></div>
                    {form.date && <div><span>Planned date</span><strong>{new Date(form.date).toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' })}</strong></div>}
                    {form.groupSize && <div><span>Group size</span><strong>{form.groupSize}</strong></div>}
                  </div>
                  <button className="btn-outline" style={{ marginTop: 24 }}
                    onClick={() => { setStep('form'); setForm({ name:'', email:'', phone:'', visitType:'', groupSize:'', date:'', message:'' }) }}>
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── SIDEBAR ── */}
          <motion.div className="contact-sidebar"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.2 }}>

            {/* Map illustration */}
            <div className="contact-sidebar__map">
              <svg viewBox="0 0 360 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',display:'block'}}>
                <defs>
                  <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e3f2fd"/><stop offset="100%" stopColor="#c8e6c9"/>
                  </linearGradient>
                </defs>
                <rect width="360" height="280" fill="url(#mapBg)" rx="2"/>
                {/* Grid lines */}
                {[60,120,180,240].map(x=><line key={x} x1={x} y1={0} x2={x} y2={280} stroke="white" strokeWidth="0.8" opacity="0.7"/>)}
                {[56,112,168,224].map(y=><line key={y} x1={0} y1={y} x2={360} y2={y} stroke="white" strokeWidth="0.8" opacity="0.7"/>)}
                {/* Water body */}
                <ellipse cx="180" cy="160" rx="110" ry="70" fill="#81d4fa" opacity="0.8"/>
                <ellipse cx="180" cy="160" rx="95" ry="58" fill="#b3e5fc" opacity="0.5"/>
                {/* Rice fields */}
                <rect x="40" y="60" width="80" height="60" fill="#a5d6a7" rx="2" opacity="0.9"/>
                <rect x="230" y="55" width="90" height="70" fill="#81c784" rx="2" opacity="0.9"/>
                <rect x="40" y="180" width="70" height="55" fill="#c8e6c9" rx="2" opacity="0.9"/>
                <rect x="250" y="180" width="70" height="55" fill="#a5d6a7" rx="2" opacity="0.9"/>
                {/* Roads */}
                <line x1="0" y1="140" x2="360" y2="140" stroke="#bdbdbd" strokeWidth="6"/>
                <line x1="180" y1="0" x2="180" y2="280" stroke="#bdbdbd" strokeWidth="6"/>
                <line x1="0" y1="140" x2="360" y2="140" stroke="white" strokeWidth="2" strokeDasharray="10 8"/>
                {/* Park boundary */}
                <rect x="28" y="30" width="304" height="220" fill="none" stroke="#d4ac0d" strokeWidth="2" strokeDasharray="8 5" rx="4"/>
                {/* Pin */}
                <g transform="translate(180,130)">
                  <path d="M0,-28 C-14,-28 -22,-18 -22,-8 C-22,8 0,28 0,28 C0,28 22,8 22,-8 C22,-18 14,-28 0,-28 Z"
                    fill="#ef5350" stroke="white" strokeWidth="2"/>
                  <circle cx="0" cy="-8" r="7" fill="white"/>
                  <text x="0" y="4" textAnchor="middle" fontSize="9" fill="#ef5350" fontWeight="700">CDR</text>
                </g>
                {/* Label */}
                <text x="180" y="20" textAnchor="middle" fontSize="9" fill="#546e7a" letterSpacing="3" fontFamily="sans-serif">BHUBANESWAR, ODISHA</text>
                {/* Compass */}
                <g transform="translate(330,30)">
                  <circle cx="0" cy="0" r="16" fill="white" opacity="0.9"/>
                  <text x="0" y="-4" textAnchor="middle" fontSize="7" fill="#1a252f" fontWeight="700" fontFamily="sans-serif">N</text>
                  <path d="M0,-2 L2,5 L0,4 L-2,5 Z" fill="#1a252f"/>
                </g>
              </svg>
              <div className="contact-sidebar__map-label">
                <span>📍</span>
                <span>45 min from Bhubaneswar Airport · NH-16 bypass</span>
              </div>
            </div>

            {/* Entry fees */}
            <div className="contact-sidebar__section">
              <h4 className="contact-sidebar__section-title">Entry Fees</h4>
              {[
                { label: 'Adults', price: '₹150' },
                { label: 'Children (under 12)', price: '₹80' },
                { label: 'Students (with ID)', price: '₹60' },
                { label: 'Guided Tour add-on', price: '₹350' },
                { label: 'Coracle Ride', price: '₹200 / boat' },
                { label: 'Photography Pass', price: '₹500' },
              ].map(item => (
                <div key={item.label} className="contact-sidebar__fee-row">
                  <span>{item.label}</span>
                  <span className="contact-sidebar__fee-price">{item.price}</span>
                </div>
              ))}
            </div>

            {/* Getting there */}
            <div className="contact-sidebar__section">
              <h4 className="contact-sidebar__section-title">Getting Here</h4>
              {[
                { mode: '✈️', label: 'By Air', detail: 'Biju Patnaik Airport — 45 min drive via NH-16' },
                { mode: '🚂', label: 'By Train', detail: 'Bhubaneswar Station — 30 min auto-rickshaw ride' },
                { mode: '🚌', label: 'By Bus', detail: 'State buses from Master Canteen Square, hourly' },
                { mode: '🚗', label: 'By Car', detail: 'Ample parking available at the park gate' },
              ].map(item => (
                <div key={item.label} className="contact-sidebar__transport">
                  <span className="contact-sidebar__transport-mode">{item.mode}</span>
                  <div>
                    <div className="contact-sidebar__transport-label">{item.label}</div>
                    <div className="contact-sidebar__transport-detail">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        .contact-main { padding: var(--section-pad) 0; background: var(--cloud-white); }
        .contact-main__layout {
          display: grid; grid-template-columns: 1fr 380px; gap: 80px; align-items: start;
        }
        /* Form */
        .contact-form { display: flex; flex-direction: column; gap: 22px; margin-top: 36px; }
        .contact-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .contact-form__field { display: flex; flex-direction: column; gap: 8px; }
        .contact-form__label {
          font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--text-light); font-weight: 500;
        }
        .contact-form__input {
          padding: 14px 18px;
          background: white; border: 1px solid rgba(0,0,0,0.12);
          font-family: var(--font-body); font-size: 14px; color: var(--text-dark);
          outline: none; appearance: none; -webkit-appearance: none;
          transition: border-color 0.3s;
        }
        .contact-form__input:focus { border-color: var(--water-mid); }
        .contact-form__input.error { border-color: #ef5350; }
        .contact-form__textarea { resize: vertical; min-height: 130px; }
        .contact-form__error { font-size: 10.5px; color: #ef5350; }
        .contact-form__checkbox {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 12.5px; color: var(--text-light); line-height: 1.6; cursor: pointer;
        }
        .contact-form__checkbox input { margin-top: 3px; }
        .contact-form__submit { align-self: flex-start; margin-top: 8px; }
        .contact-form__sending {
          display: flex; flex-direction: column; align-items: center;
          gap: 20px; padding: 60px; text-align: center;
          color: var(--text-light); font-size: 14px;
        }
        .contact-form__spinner {
          width: 40px; height: 40px;
          border: 2px solid var(--sky-noon);
          border-top-color: var(--duck-teal);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .contact-form__success {
          padding: 48px; background: var(--sky-horizon);
          border: 1px solid rgba(0,0,0,0.07);
          margin-top: 36px;
        }
        .contact-form__success-icon { font-size: 48px; margin-bottom: 16px; }
        .contact-form__success-title {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 300; color: var(--text-dark); margin-bottom: 12px;
        }
        .contact-form__success-body {
          font-size: 14px; line-height: 1.8; color: var(--text-light);
          margin-bottom: 24px; max-width: 440px;
        }
        .contact-form__success-detail {
          display: flex; flex-direction: column; gap: 8px;
        }
        .contact-form__success-detail div {
          display: flex; justify-content: space-between;
          font-size: 12.5px; padding: 10px 0;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .contact-form__success-detail span { color: var(--text-light); }
        .contact-form__success-detail strong { color: var(--text-dark); font-weight: 500; }
        /* Sidebar */
        .contact-sidebar {}
        .contact-sidebar__map {
          margin-bottom: 32px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .contact-sidebar__map-label {
          display: flex; gap: 8px; align-items: center;
          padding: 12px 16px; background: var(--text-dark);
          font-size: 11px; color: rgba(255,255,255,0.55);
        }
        .contact-sidebar__section { margin-bottom: 32px; }
        .contact-sidebar__section-title {
          font-size: 9px; font-weight: 700; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--text-light);
          margin-bottom: 16px; padding-bottom: 10px;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }
        .contact-sidebar__fee-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 0; border-bottom: 1px solid rgba(0,0,0,0.05);
          font-size: 13px; color: var(--text-mid);
        }
        .contact-sidebar__fee-row:last-child { border-bottom: none; }
        .contact-sidebar__fee-price {
          font-family: var(--font-display); font-size: 16px;
          font-weight: 400; color: var(--water-dark);
        }
        .contact-sidebar__transport {
          display: flex; gap: 14px; align-items: flex-start;
          padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .contact-sidebar__transport:last-child { border-bottom: none; }
        .contact-sidebar__transport-mode { font-size: 20px; flex-shrink: 0; width: 28px; }
        .contact-sidebar__transport-label {
          font-size: 12px; font-weight: 600; color: var(--text-dark); margin-bottom: 3px;
        }
        .contact-sidebar__transport-detail { font-size: 11.5px; color: var(--text-light); line-height: 1.5; }

        @media (max-width: 1100px) { .contact-main__layout { grid-template-columns: 1fr; } }
        @media (max-width: 600px) { .contact-form__row { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

/* ──────────────────────────
   FAQ SECTION
────────────────────────── */
const faqs = [
  { q: 'Do I need to book in advance?', a: 'Individual and family visits do not require advance booking — simply arrive at the gate. For guided tours, school groups, or special experiences, we recommend booking 3–7 days in advance by calling or emailing us.' },
  { q: 'What is the best time of year to visit?', a: 'Each season offers something unique. Autumn (October–November) is considered the most beautiful — rice is golden, migratory birds have arrived, and the weather is perfect. Monsoon (June–August) is spectacular for paddy planting, and winter is ideal for birdwatching.' },
  { q: 'Can children participate in all activities?', a: 'Yes! The park is highly family-friendly. Duck herding, coracle rides, rice watching, and the nature walk are particularly popular with children. The eco workshop has a specially designed children\'s program for ages 6 and above.' },
  { q: 'Is food available at the park?', a: 'Our visitor centre serves simple, locally-sourced meals throughout the day — traditional Odisha rice dishes, fresh fish preparations, and seasonal produce. We also have a café with beverages and light snacks.' },
  { q: 'Are pets allowed?', a: 'We love animals, but for the wellbeing of the resident ducks, fish, and birds, we request that visitors leave pets at home. Service animals are welcome with appropriate documentation.' },
  { q: 'Can I photograph the park commercially?', a: 'A photography pass (₹500) covers personal and non-commercial photography. For commercial shoots, editorial features, or documentary work, please contact us in advance to arrange a commercial photography permit.' },
  { q: 'What should I wear and bring?', a: 'Light, comfortable clothing in muted colours is recommended to avoid disturbing birds. Good walking shoes or sandals that can get wet are ideal. Bring sunscreen, a hat, and water. We provide everything needed for guided activities.' },
  { q: 'Do you offer accommodation?', a: 'We do not have overnight accommodation within the park currently, though this is planned for 2025. We can recommend guesthouses and homestays within 5km of the park that offer traditional Odisha hospitality.' },
]

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="faq" ref={ref}>
      <div className="container">
        <motion.div className="faq__header"
          initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}>
          <div className="section-label">Visitor Questions</div>
          <h2 className="display-heading">Frequently <em>Asked</em></h2>
          <div className="divider"/>
        </motion.div>

        <div className="faq__list">
          {faqs.map((faq, i) => (
            <motion.div key={i} className={`faq__item ${openIdx === i ? 'open' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.07 }}>
              <button className="faq__question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                <span>{faq.q}</span>
                <motion.div className="faq__toggle"
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 9h10M9 4v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div className="faq__answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.25,0.46,0.45,0.94] }}>
                    <p>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div className="faq__cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4 }}>
          <div className="faq__cta-text">
            <h3>Still have questions?</h3>
            <p>Our team is happy to help — call, email, or simply drop by.</p>
          </div>
          <div className="faq__cta-btns">
            <a href="tel:+919437000000" className="btn-primary"><span>Call Us</span></a>
            <a href="mailto:visit@cdrpark.in" className="btn-outline">Send Email</a>
          </div>
        </motion.div>
      </div>
      <style>{`
        .faq { padding: var(--section-pad) 0; background: var(--earth-warm); }
        .faq__header { max-width: 480px; margin-bottom: 52px; }
        .faq__list { max-width: 800px; }
        .faq__item {
          border-bottom: 1px solid rgba(0,0,0,0.09);
        }
        .faq__item:first-child { border-top: 1px solid rgba(0,0,0,0.09); }
        .faq__question {
          width: 100%; display: flex; align-items: center; justify-content: space-between;
          gap: 24px; padding: 22px 0;
          text-align: left; cursor: pointer; background: none; border: none;
          font-family: var(--font-display); font-size: 18px; font-weight: 400;
          color: var(--text-dark); transition: color 0.3s;
        }
        .faq__item.open .faq__question { color: var(--water-dark); }
        .faq__toggle {
          width: 36px; height: 36px; flex-shrink: 0;
          border: 1px solid rgba(0,0,0,0.12);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-dark); background: white; transition: all 0.3s;
        }
        .faq__item.open .faq__toggle {
          background: var(--text-dark); color: white; border-color: var(--text-dark);
        }
        .faq__answer { overflow: hidden; }
        .faq__answer p {
          font-size: 14px; line-height: 1.85; color: var(--text-light);
          padding: 0 0 24px; max-width: 640px;
        }
        .faq__cta {
          display: flex; align-items: center; justify-content: space-between;
          gap: 40px; margin-top: 64px; padding: 44px 52px;
          background: var(--text-dark);
        }
        .faq__cta-text h3 {
          font-family: var(--font-display); font-size: 26px; font-weight: 300;
          color: white; margin-bottom: 8px;
        }
        .faq__cta-text p { font-size: 13px; color: rgba(255,255,255,0.45); }
        .faq__cta-btns { display: flex; gap: 16px; flex-shrink: 0; }
        @media (max-width: 700px) {
          .faq__cta { flex-direction: column; padding: 32px 28px; }
          .faq__cta-btns { flex-direction: column; width: 100%; }
        }
      `}</style>
    </section>
  )
}

/* ──────────────────────────
   PAGE ASSEMBLY
────────────────────────── */
export default function ContactPage() {
  return (
    <motion.main className="page-wrapper"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}>
      <ContactHero />
      <InfoStrip />
      <ContactForm />
      <FAQSection />
    </motion.main>
  )
}