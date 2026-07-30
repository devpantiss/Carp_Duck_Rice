import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const testimonials = [
  {
    name: 'Dr. Priya Mahapatra',
    role: 'Ecologist, IIT Bhubaneswar',
    text: 'I have studied integrated farming systems across India, and the CDR Park is among the finest examples of natural synergy I have ever encountered. The carp-duck-rice loop here is textbook perfection made real.',
    location: 'Bhubaneswar, Odisha',
    avatar: '👩‍🔬',
    rating: 5,
  },
  {
    name: 'Arjun Sengupta',
    role: 'Wildlife Photographer',
    text: 'The morning light on the water, ducks moving between rice rows, a flash of red carp beneath — I filled three memory cards and still felt I had not captured enough. This park is a living painting.',
    location: 'Kolkata, West Bengal',
    avatar: '📸',
    rating: 5,
  },
  {
    name: 'Meena & Rajan Nair',
    role: 'Travellers & Nature Enthusiasts',
    text: 'We arrived strangers to rural Odisha and left carrying something we cannot fully name. The coracle ride at dusk, the rice planting, the evening fire — it is now our most treasured travel memory.',
    location: 'Kochi, Kerala',
    avatar: '✈️',
    rating: 5,
  },
  {
    name: 'Prof. Alan Whitmore',
    role: 'Sustainable Agriculture Researcher, UK',
    text: 'A remarkable demonstration of how traditional ecological knowledge creates systems more efficient than modern industrial farming. Every university agricultural department should study this place.',
    location: 'Oxford, United Kingdom',
    avatar: '🎓',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="testimonials" ref={ref}>
      {/* Background water ripple art */}
      <div className="testimonials__bg">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" fill="none" className="testimonials__bg-svg">
          {[100,200,300,400].map((r,i)=>(
            <circle key={i} cx="720" cy="200" r={r} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          ))}
          {[80,160,240,320].map((r,i)=>(
            <circle key={i} cx="200" cy="100" r={r} stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
          ))}
          {[60,120,180].map((r,i)=>(
            <circle key={i} cx="1240" cy="300" r={r} stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
          ))}
        </svg>
      </div>

      <div className="container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.45)' }}>
            <span style={{ background: 'rgba(255,255,255,0.25)', display: 'block', width: 32, height: 1 }} />
            Visitor Voices
          </div>
          <h2 className="display-heading" style={{ color: 'white' }}>
            Words from <em style={{ color: 'var(--accent-gold)' }}>Those Who Came</em>
          </h2>
        </motion.div>

        <div className="testimonials__layout">
          {/* Big quote */}
          <div className="testimonials__quote-area">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="testimonials__quote"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7 }}
              >
                <div className="testimonials__quote-mark">"</div>
                <blockquote className="testimonials__text">
                  {testimonials[current].text}
                </blockquote>
                <div className="testimonials__author">
                  <div className="testimonials__avatar">{testimonials[current].avatar}</div>
                  <div>
                    <div className="testimonials__name">{testimonials[current].name}</div>
                    <div className="testimonials__role">{testimonials[current].role}</div>
                    <div className="testimonials__location">📍 {testimonials[current].location}</div>
                  </div>
                </div>
                <div className="testimonials__stars">
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === current ? 'active' : ''}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail list */}
          <div className="testimonials__list">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className={`testimonials__item ${i === current ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="testimonials__item-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonials__item-name">{t.name}</div>
                  <div className="testimonials__item-role">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonials {
          padding: var(--section-pad) 0;
          background: var(--water-dark);
          position: relative;
          overflow: hidden;
        }
        .testimonials__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .testimonials__bg-svg { width: 100%; height: 100%; }
        .testimonials__header { margin-bottom: 60px; }
        .testimonials__layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 80px;
          align-items: start;
        }
        .testimonials__quote-mark {
          font-family: var(--font-display);
          font-size: 120px;
          line-height: 0.6;
          color: var(--accent-gold);
          opacity: 0.4;
          margin-bottom: 20px;
        }
        .testimonials__text {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2.5vw, 1.7rem);
          font-weight: 300;
          line-height: 1.65;
          color: rgba(255,255,255,0.85);
          font-style: italic;
          margin-bottom: 36px;
        }
        .testimonials__author {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }
        .testimonials__avatar {
          width: 52px;
          height: 52px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 1px solid rgba(255,255,255,0.15);
        }
        .testimonials__name {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 400;
          color: white;
          margin-bottom: 4px;
        }
        .testimonials__role {
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.1em;
          margin-bottom: 4px;
        }
        .testimonials__location {
          font-size: 11px;
          color: rgba(255,255,255,0.35);
        }
        .testimonials__stars {
          color: var(--accent-gold);
          font-size: 16px;
          letter-spacing: 3px;
        }
        .testimonials__dots {
          display: flex;
          gap: 8px;
          margin-top: 32px;
        }
        .testimonials__dot {
          width: 24px;
          height: 2px;
          background: rgba(255,255,255,0.2);
          border-radius: 1px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .testimonials__dot.active {
          background: var(--accent-gold);
          width: 48px;
        }
        .testimonials__list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .testimonials__item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          cursor: pointer;
          transition: all 0.3s;
        }
        .testimonials__item:hover,
        .testimonials__item.active {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.15);
        }
        .testimonials__item.active {
          border-left: 3px solid var(--accent-gold);
        }
        .testimonials__item-avatar {
          font-size: 20px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.07);
          border-radius: 50%;
        }
        .testimonials__item-name {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 400;
          color: rgba(255,255,255,0.8);
          margin-bottom: 3px;
        }
        .testimonials__item-role {
          font-size: 10px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.1em;
        }
        @media (max-width: 900px) {
          .testimonials__layout { grid-template-columns: 1fr; }
          .testimonials__list { flex-direction: row; flex-wrap: wrap; }
          .testimonials__item { flex: 1; min-width: 180px; }
        }
      `}</style>
    </section>
  )
}