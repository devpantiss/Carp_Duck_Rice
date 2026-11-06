import { Fragment, useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { motion as Motion, stagger, useAnimate, useInView, useReducedMotion } from 'framer-motion'
import CountUp from 'react-countup'

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  e.currentTarget.style.setProperty('--mx', `${x}px`)
  e.currentTarget.style.setProperty('--my', `${y}px`)
}

const problemLines = [
  'For a generation, our fields were fed with chemicals.',
  'The soil grew tired. The ponds went quiet.',
  'Farmers spent more, and earned less.',
  'But nature had solved this long ago.',
]

const forces = [
  { name: 'Rice', essence: 'Foundation.', morph: 'Energy', className: 'rice' },
  { name: 'Carp', essence: 'Balance.', morph: 'Intelligence', className: 'carp' },
  { name: 'Duck', essence: 'Adaptation.', morph: 'Momentum', className: 'duck' },
]

const insights = ['Nothing wasted.', 'Everything connected.', 'Every action creates value elsewhere.']
const metrics = [
  {
    name: 'Efficiency',
    value: 98,
    suffix: '%',
    subtitle: 'Resource cycling',
    description: 'Nutrients cycle between carp, ducks, and rice with near-zero waste.',
    accent: '#74e6ac',
    alpha: 'rgba(116, 230, 172, 0.15)',
    icon: (
      <svg viewBox="0 0 100 100" className="metric-icon" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
        <circle cx="50" cy="50" r="30" strokeDasharray="10 6" opacity="0.3" />
        <path d="M50 20 A30 30 0 0 1 80 50 A30 30 0 0 1 50 80 A30 30 0 0 1 20 50 A30 30 0 0 1 50 20" strokeDasharray="20 40">
          <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="8s" repeatCount="indefinite" />
        </path>
      </svg>
    )
  },
  {
    name: 'Resilience',
    value: 3.5,
    suffix: 'x',
    decimals: 1,
    subtitle: 'Ecological stability',
    description: 'Natural pest and weed control creates high resistance to crop stress.',
    accent: '#6eb3ff',
    alpha: 'rgba(110, 179, 255, 0.15)',
    icon: (
      <svg viewBox="0 0 100 100" className="metric-icon" stroke="currentColor" fill="none" strokeWidth="1.5">
        <circle cx="30" cy="30" r="4" fill="currentColor" />
        <circle cx="70" cy="30" r="4" fill="currentColor" />
        <circle cx="50" cy="65" r="4" fill="currentColor" />
        <circle cx="30" cy="70" r="3" opacity="0.5" />
        <circle cx="70" cy="70" r="3" opacity="0.5" />
        <line x1="30" y1="30" x2="70" y2="30" />
        <line x1="30" y1="30" x2="50" y2="65" />
        <line x1="70" y1="30" x2="50" y2="65" />
        <line x1="30" y1="30" x2="30" y2="70" opacity="0.5" />
        <line x1="70" y1="30" x2="70" y2="70" opacity="0.5" />
        <line x1="50" y1="65" x2="30" y2="70" opacity="0.5" />
        <line x1="50" y1="65" x2="70" y2="70" opacity="0.5" />
      </svg>
    )
  },
  {
    name: 'Sustainability',
    value: 100,
    suffix: '%',
    subtitle: 'Organic methodology',
    description: 'Zero reliance on artificial chemicals, restoring water and soil purity.',
    accent: '#f3c969',
    alpha: 'rgba(243, 201, 105, 0.15)',
    icon: (
      <svg viewBox="0 0 100 100" className="metric-icon" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 85 V30 M50 50 C65 40 75 45 75 45 M50 65 C35 55 25 60 25 60" />
        <path d="M50 30 C50 15 35 15 35 15 C35 15 35 30 50 30 Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M50 30 C50 15 65 15 65 15 C65 15 65 30 50 30 Z" fill="currentColor" fillOpacity="0.15" />
      </svg>
    )
  },
  {
    name: 'Growth',
    value: 45,
    prefix: '+',
    suffix: '%',
    subtitle: 'Livelihood improvement',
    description: 'Three integrated yield cycles provide farmers with stable, year-round revenues.',
    accent: '#ff8a7a',
    alpha: 'rgba(255, 138, 122, 0.15)',
    icon: (
      <svg viewBox="0 0 100 100" className="metric-icon" stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 75 L40 55 L60 62 L80 35" />
        <polygon points="80,35 80,45 70,35" fill="currentColor" />
        <line x1="20" y1="75" x2="80" y2="75" strokeWidth="1" opacity="0.3" />
      </svg>
    )
  }
]

function AmbientLayer() {
  return (
    <div className="concept-cinema__ambient" aria-hidden="true">
      <div className="concept-cinema__glow concept-cinema__glow--green" />
      <div className="concept-cinema__glow concept-cinema__glow--gold" />
      <div className="concept-cinema__rings">
        <span />
        <span />
        <span />
      </div>
      {Array.from({ length: 44 }).map((_, index) => (
        <i
          key={index}
          style={{
            '--x': `${(index * 37) % 100}%`,
            '--y': `${(index * 53) % 100}%`,
            '--delay': `${(index % 12) * 0.35}s`,
            '--size': `${2 + (index % 4)}px`,
          }}
        />
      ))}
    </div>
  )
}

const revealEase = [0.22, 1, 0.36, 1]
const LINE_GAP = 0.4 // seconds between lines that enter view together (reading pace)
const ANSWER_BEAT = 0.9 // a breath before the gold answer, so the wilted field registers first
const WORD_GAP = 0.07
const LINE_SHIFT = 26

const hiddenStyle = (reduceMotion, shift) => ({
  opacity: 0,
  transform: `translateY(${reduceMotion ? 0 : shift}px)`,
  filter: reduceMotion ? 'blur(0px)' : 'blur(5px)',
})
const shownStyle = { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }
const GLOW_OFF = '0 0 0px rgba(243,201,105,0)'

function RevealLine({ children, index, isAnswer, schedule, reduceMotion, onVisibility }) {
  const [scope, animate] = useAnimate()
  const inView = useInView(scope, { amount: 0.5, margin: '0px 0px -8% 0px' })

  const token = useRef(0)

  useEffect(() => {
    const el = scope.current
    if (!el) return
    // Answer words animate individually; other lines animate as a whole.
    const target = isAnswer ? el.querySelectorAll('.concept-cinema__problem-word') : el
    const current = ++token.current

    if (inView) {
      schedule(index, isAnswer, (delay) => {
        if (token.current !== current) return // left view before its turn came
        onVisibility(index, true, delay)
        const duration = reduceMotion ? 0.5 : isAnswer ? 0.9 : 1.1
        animate(target, shownStyle, {
          duration,
          ease: revealEase,
          delay: isAnswer && !reduceMotion ? stagger(WORD_GAP, { startDelay: delay }) : delay,
        })
        if (isAnswer) {
          animate(el, { textShadow: [GLOW_OFF, '0 0 44px rgba(243,201,105,0.32)', '0 0 26px rgba(243,201,105,0.12)'] }, { duration: 1.8, ease: 'easeOut', delay: delay + 0.25 })
        }
      })
    } else {
      onVisibility(index, false, 0)
      // Exit quickly toward the side the line left from, so a replay follows the scroll direction.
      const leftAbove = el.getBoundingClientRect().top < 0
      animate(target, hiddenStyle(reduceMotion, leftAbove ? -LINE_SHIFT : LINE_SHIFT), { duration: 0.35, ease: 'easeOut' })
      if (isAnswer) animate(el, { textShadow: GLOW_OFF }, { duration: 0.3 })
    }
  }, [inView, index, isAnswer, schedule, reduceMotion, animate, scope, onVisibility])

  const initial = hiddenStyle(reduceMotion, LINE_SHIFT)

  if (isAnswer) {
    const words = children.split(' ')
    return (
      <h2 ref={scope} className="concept-cinema__problem-line is-gold" aria-label={children}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="concept-cinema__problem-word" aria-hidden="true" style={initial}>
              {word}
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </h2>
    )
  }

  return (
    <p ref={scope} className="concept-cinema__problem-line" style={initial}>
      {children}
    </p>
  )
}

// ── Field illustration ───────────────────────────────────────────────
// Line-art paddy that follows the text: 0 idle → 1 chemicals → 2 tired → 3 dimmed → 4 alive.
const FIELD_STALKS = Array.from({ length: 30 }, (_, i) => {
  const left = i < 15
  const k = i % 15
  const back = k % 3 === 1
  return {
    id: i,
    x: left ? 40 + k * 31 + ((k * 37) % 11) : 1400 - k * 31 - ((k * 29) % 13),
    y: back ? 238 : 270 + (k % 3) * 5,
    s: back ? 0.6 + (k % 4) * 0.05 : 0.86 + (k % 5) * 0.07,
    back,
    flip: (k % 2 === 0) !== left,
    droop: (left ? -1 : 1) * (16 + ((k * 7) % 12)),
    delay: (left ? 14 - k : 14 - k) * 28 + (left ? 0 : 14),
  }
})
// Reeds along the pond edge — these stay in frame on narrow screens, where the sides are cropped.
const POND_REEDS = [455, 480, 506, 532, 908, 934, 960, 986].map((x, k) => {
  const left = x < 720
  return {
    id: 30 + k,
    x,
    y: 274 + (k % 2) * 6,
    s: 0.72 + (k % 3) * 0.09,
    back: false,
    flip: k % 2 === 1,
    droop: (left ? -1 : 1) * (18 + ((k * 5) % 9)),
    delay: (left ? k : k - 4) * 40,
  }
})
FIELD_STALKS.push(...POND_REEDS)
const FIELD_DROPS = [170, 300, 470, 970, 1150, 1290]

function Stalk({ stalk }) {
  return (
    <g transform={`translate(${stalk.x} ${stalk.y}) scale(${stalk.flip ? -stalk.s : stalk.s} ${stalk.s})`} opacity={stalk.back ? 0.55 : 1}>
      <g className="cdr-stalk" style={{ '--droop': `${stalk.droop * (stalk.flip ? -1 : 1)}deg`, '--d': `${stalk.delay}ms` }}>
        <g className="cdr-sway" style={{ animationDelay: `${-(stalk.id % 7) * 0.7}s` }}>
          <path className="cdr-leaf" d="M0 -6 C -8 -32 -20 -50 -36 -58" />
          <path className="cdr-leaf" d="M1 -16 C 8 -42 18 -56 32 -62" />
          <path className="cdr-stem" d="M0 0 C 1 -35 2 -70 6 -100 C 9 -116 18 -124 28 -122" />
          {[[9, -106, -60], [14, -114, -40], [20, -119, -20], [26, -121, 0]].map(([gx, gy, r]) => (
            <ellipse key={gx} className="cdr-grain" cx={gx} cy={gy} rx="2.6" ry="1.3" transform={`rotate(${r} ${gx} ${gy})`} />
          ))}
        </g>
      </g>
    </g>
  )
}

function FieldIllustration({ phase }) {
  return (
    <div className={`cdr-field cdr-field--p${phase}`} aria-hidden="true">
      <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="cdrPondGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#74e6ac" stopOpacity="0.28" />
            <stop offset="1" stopColor="#74e6ac" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cdrSunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#f3c969" stopOpacity="0.32" />
            <stop offset="1" stopColor="#f3c969" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* sun rising behind the hills */}
        <g className="cdr-sun">
          <ellipse cx="720" cy="132" rx="170" ry="80" fill="url(#cdrSunGlow)" />
          <path className="cdr-sun-arc" d="M676 136 A44 44 0 0 1 764 136" />
        </g>

        {/* landscape contours */}
        <path className="cdr-contour" pathLength="1" d="M0 146 C 200 118 380 134 560 128 C 760 120 900 142 1080 126 C 1240 114 1360 130 1440 122" />
        <path className="cdr-contour cdr-contour--2" pathLength="1" d="M0 196 C 140 178 300 186 520 206" />
        <path className="cdr-contour cdr-contour--2" pathLength="1" d="M920 206 C 1140 186 1300 178 1440 192" />
        <path className="cdr-contour cdr-contour--3" pathLength="1" d="M0 228 C 180 214 360 222 540 240" />
        <path className="cdr-contour cdr-contour--3" pathLength="1" d="M900 240 C 1080 222 1260 214 1440 226" />

        {/* pond */}
        <ellipse className="cdr-pond-glow" cx="720" cy="264" rx="260" ry="46" fill="url(#cdrPondGlow)" />
        <ellipse className="cdr-pond" pathLength="1" cx="720" cy="264" rx="200" ry="22" />
        <path className="cdr-shimmer" d="M610 262 h34 M688 270 h52 M770 258 h28" />
        {[0, 1, 2].map((r) => (
          <ellipse key={r} className="cdr-ripple" cx="736" cy="264" rx="54" ry="6" style={{ animationDelay: `${r * 1.3}s` }} />
        ))}

        {/* carp leaping */}
        <g transform="translate(650 262)">
          <g className="cdr-fish">
            <path d="M0 0 C 7 -6 18 -6 24 0 C 18 6 7 6 0 0 Z M24 0 L31 -5 L31 5 Z" />
          </g>
        </g>

        {/* duck gliding */}
        <g transform="translate(830 258)">
          <g className="cdr-duck">
            <g transform="scale(-1 1)">
              <path d="M0 0 C 2 -7 14 -10 24 -6 C 26 -12 29 -17 34 -17 C 39 -17 41 -13 40 -10 L 46 -9 L 40 -7 C 38 -3 36 0 32 2 C 22 5 6 4 0 0 Z" />
            </g>
            <path className="cdr-duck-wake" d="M-50 6 h44" />
          </g>
        </g>

        {/* chemical drops */}
        {FIELD_DROPS.map((x, i) => (
          <g key={x} transform={`translate(${x} 20)`}>
            <path className="cdr-drop" style={{ animationDelay: `${i * 0.45}s` }} d="M0 0 C 3 5 4 8 0 11 C -4 8 -3 5 0 0 Z" />
          </g>
        ))}

        {FIELD_STALKS.map((stalk) => (
          <Stalk key={stalk.id} stalk={stalk} />
        ))}
      </svg>
    </div>
  )
}

function fieldReducer(state, { index, visible }) {
  const vis = [...state.vis]
  vis[index] = visible
  let phase = state.phase
  if (vis[problemLines.length - 1]) phase = 4
  else {
    const last = vis.slice(0, -1).lastIndexOf(true)
    // When nothing is visible, keep the last phase so the field doesn't reset while still on screen.
    if (last >= 0) phase = last + 1
  }
  return { vis, phase }
}

function ProblemScene() {
  const reduceMotion = useReducedMotion()
  // Lines that enter view together are batched per frame, sorted top-to-bottom,
  // and queued so they always read in order, one after another.
  const nextSlot = useRef(0)
  const queue = useRef([])
  const frame = useRef(0)
  const schedule = useCallback((index, isAnswer, run) => {
    queue.current.push({ index, isAnswer, run })
    if (frame.current) return
    frame.current = requestAnimationFrame(() => {
      frame.current = 0
      const batch = queue.current.sort((a, b) => a.index - b.index)
      queue.current = []
      const now = performance.now() / 1000
      for (const item of batch) {
        const start = Math.max(now, nextSlot.current) + (item.isAnswer && !reduceMotion ? ANSWER_BEAT : 0)
        nextSlot.current = start + (reduceMotion ? 0.1 : LINE_GAP)
        item.run(start - now)
      }
    })
  }, [reduceMotion])

  // The illustration changes when each line actually appears (after its queued delay).
  const [field, dispatch] = useReducer(fieldReducer, { vis: problemLines.map(() => false), phase: 0 })
  const timers = useRef({})
  const onVisibility = useCallback((index, visible, delay) => {
    clearTimeout(timers.current[index])
    if (visible) timers.current[index] = setTimeout(() => dispatch({ index, visible: true }), delay * 1000)
    else dispatch({ index, visible: false })
  }, [])
  useEffect(() => {
    const pending = timers.current
    return () => {
      Object.values(pending).forEach(clearTimeout)
      cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <section className="concept-cinema__chapter concept-cinema__chapter--problem">
      <FieldIllustration phase={field.phase} />
      <div className="concept-cinema__problem-stack">
        {problemLines.map((line, index) => (
          <RevealLine
            key={line}
            index={index}
            isAnswer={index === problemLines.length - 1}
            schedule={schedule}
            reduceMotion={reduceMotion}
            onVisibility={onVisibility}
          >
            {line}
          </RevealLine>
        ))}
      </div>
    </section>
  )
}

function DiscoveryScene() {
  return (
    <section className="concept-cinema__chapter concept-cinema__chapter--discovery">
      <Motion.div
        className="concept-cinema__aerial"
        initial={{ opacity: 0, scale: 1.1, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 1.2 }}
      >
        <svg viewBox="0 0 920 520" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ccWater" cx="50%" cy="50%" r="50%">
              <stop stopColor="#76e6b0" stopOpacity="0.42" />
              <stop offset="1" stopColor="#0b0f14" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ccFlow" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#f3c969" stopOpacity="0.7" />
              <stop offset="1" stopColor="#76e6b0" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <ellipse cx="460" cy="260" rx="330" ry="186" fill="url(#ccWater)" />
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <Motion.path
              key={item}
              d={`M${112 + item * 64} ${352 - item * 22} C ${262 + item * 30} ${196 - item * 16}, ${510 + item * 28} ${390 - item * 28}, ${794 - item * 38} ${170 + item * 34}`}
              stroke="url(#ccFlow)"
              strokeWidth="1.35"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.72 }}
              viewport={{ once: false, amount: 0.45 }}
              transition={{ duration: 1.6, delay: item * 0.08 }}
            />
          ))}
        </svg>
      </Motion.div>
      <Motion.p
        className="concept-cinema__discovery-text"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        In one ecosystem, three independent forces created a self-sustaining cycle.
      </Motion.p>
    </section>
  )
}


function ForcesScene() {
  return (
    <section className="concept-cinema__chapter concept-cinema__chapter--forces">
      <div className="concept-cinema__forces">
        {forces.map((force, index) => (
          <Motion.article
            className={`concept-cinema__force concept-cinema__force--${force.className}`}
            key={force.name}
            initial={{ opacity: 0, y: 56, filter: 'blur(16px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.42 }}
            transition={{ duration: 0.9, delay: index * 0.12 }}
          >
            <div className="concept-cinema__force-bg">
              <img loading="lazy" decoding="async" src={`/images/concept/${force.className}.jpg`} alt={force.name} />
              <div className="concept-cinema__force-overlay" />
            </div>
            <div className="concept-cinema__force-copy">
              <span>{force.essence}</span>
              <h3>{force.name}</h3>
            </div>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}

function InsightScene() {
  return (
    <section className="concept-cinema__chapter concept-cinema__chapter--insight">
      <div className="concept-cinema__flow" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="concept-cinema__insights">
        {insights.map((line, index) => (
          <Motion.p
            key={line}
            initial={{ opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.62 }}
            transition={{ duration: 0.8, delay: index * 0.14 }}
          >
            {line}
          </Motion.p>
        ))}
      </div>
    </section>
  )
}

function VisionScene() {
  return (
    <section className="concept-cinema__chapter concept-cinema__chapter--vision">
      <Motion.div
        className="concept-cinema__identity"
        initial={{ opacity: 0, scale: 0.78 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.45 }}
        transition={{ duration: 1 }}
      >
        <div className="concept-cinema__identity-ring" />
        <Motion.div
          className="concept-cinema__orbit"
          initial={{ scale: 0.2, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.45 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {forces.map((force, index) => {
            let positionStyle = {}
            if (index === 0) {
              positionStyle = { left: '50%', top: '10%' }
            } else if (index === 1) {
              positionStyle = { left: '84.6%', top: '70%' }
            } else {
              positionStyle = { left: '15.4%', top: '70%' }
            }

            return (
              <span
                className={`concept-cinema__morph concept-cinema__morph--${force.className}`}
                key={force.name}
                style={positionStyle}
              >
                {force.name} → {force.morph}
              </span>
            )
          })}
        </Motion.div>
        <div className="concept-cinema__logo">
          <img loading="lazy" decoding="async" src="/images/brand/logo-square.png" alt="Carp, Rice & Duck Logo" style={{ width: '90px', height: '90px', objectFit: 'contain', background: 'transparent' }} />
        </div>
      </Motion.div>
      <div className="concept-cinema__vision-copy">
        {['We didn&apos;t invent the system.', 'We learned from it.', 'We built a company around it.'].map((line, index) => (
          <Motion.h2
            className={index === 1 ? 'is-gold' : ''}
            dangerouslySetInnerHTML={{ __html: line }}
            key={line}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.8, delay: index * 0.16 }}
          />
        ))}
      </div>
    </section>
  )
}

const getEcoStatus = (rice, carp, duck) => {
  if (rice === 0) {
    return {
      status: 'imbalance',
      title: 'Empty Field',
      desc: 'Plant rice to establish the foundational energy supply for the ecosystem.',
      color: '#ff8a7a'
    }
  }
  if (carp === 0 && duck === 0) {
    return {
      status: 'critical',
      title: 'Monoculture Imbalance',
      desc: 'Without fish and ducks, weeds and pests will overrun the rice. This state requires synthetic fertilizers and toxic pesticides, destroying organic sustainability.',
      color: '#ff6b6b'
    }
  }
  if (carp === 0) {
    return {
      status: 'warning',
      title: 'Missing Weed Controller',
      desc: 'No carp in the water allows algae and weeds to compete with rice for nutrients. Farmers must manually weed or add herbicides.',
      color: '#f3c969'
    }
  }
  if (duck === 0) {
    return {
      status: 'warning',
      title: 'Missing Pest Controller',
      desc: 'No ducks present. Planthoppers and snails will multiply rapidly, threatening the rice leaves. Yield is highly vulnerable.',
      color: '#f3c969'
    }
  }
  if (duck > 80 && rice < 40) {
    return {
      status: 'danger',
      title: 'Overgrazing Snails',
      desc: 'Duck density is too high for the amount of rice. Snails are depleted, and ducks may start feeding on young rice shoots.',
      color: '#ff8a7a'
    }
  }
  if (rice >= 60 && carp >= 50 && duck >= 50) {
    return {
      status: 'optimal',
      title: 'Perfect Ecological Symbiosis',
      desc: 'Rice provides shelter and shade. Carp consume weed seeds and fertilize soil. Ducks eat insect pests. The system is self-sustaining and organic yield is maximized!',
      color: '#74e6ac'
    }
  }
  return {
    status: 'stable',
    title: 'Balanced Polyculture',
    desc: 'The symbiotic cycle is active. Natural pest and weed control are working, keeping chemical usage at zero.',
    color: '#6eb3ff'
  }
}

function ImpactScene() {
  const [rice, setRice] = useState(70)
  const [carp, setCarp] = useState(60)
  const [duck, setDuck] = useState(50)

  // Dynamic calculations based on biological inputs
  const nutrientLoop = Math.min(100, Math.round(15 + (carp * 0.7) + (duck * 0.6)))
  const pestControl = Math.min(100, Math.round((duck * 0.9) + (carp * 0.2)))
  const weedControl = Math.min(100, Math.round((carp * 1.0) + (duck * 0.2)))
  const economicYield = Math.min(100, Math.round((rice * 0.5) + (carp * 0.25) + (duck * 0.25)))
  
  const status = getEcoStatus(rice, carp, duck)
  
  // Overall Health Score:
  const overallHealth = Math.round((nutrientLoop + pestControl + weedControl + economicYield) / 4)

  return (
    <section className="concept-cinema__chapter concept-cinema__chapter--impact">
      <div className="concept-cinema__metrics">
        {metrics.map((metric, index) => {
          let liveValue = metric.value
          if (metric.name === 'Efficiency') liveValue = nutrientLoop
          if (metric.name === 'Resilience') liveValue = Number((pestControl * 0.03 + weedControl * 0.02).toFixed(1))
          if (metric.name === 'Sustainability') liveValue = Math.max(0, 100 - (carp === 0 || duck === 0 ? 80 : 0))
          if (metric.name === 'Growth') liveValue = economicYield

          return (
            <Motion.div
              className="concept-cinema__metric"
              key={metric.name}
              style={{
                '--accent': metric.accent,
                '--accent-alpha': metric.alpha
              }}
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 70, filter: 'blur(14px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.8, delay: index * 0.12 }}
            >
              <div className="concept-cinema__metric-glow" />
              <div className="concept-cinema__metric-header">
                <span className="concept-cinema__metric-subtitle">{metric.subtitle}</span>
                <div className="concept-cinema__metric-icon-wrapper">
                  {metric.icon}
                </div>
              </div>
              <div className="concept-cinema__metric-body">
                <div className="concept-cinema__metric-num">
                  {metric.prefix && <span>{metric.prefix}</span>}
                  <CountUp 
                    start={0} 
                    end={liveValue} 
                    decimals={metric.name === 'Resilience' ? 1 : 0} 
                    duration={1} 
                    preserveValue 
                  />
                  {metric.suffix && <span>{metric.suffix}</span>}
                </div>
                <h4 className="concept-cinema__metric-title">{metric.name}</h4>
                <p className="concept-cinema__metric-desc">{metric.description}</p>
              </div>
            </Motion.div>
          )
        })}
      </div>

      <Motion.div 
        className="concept-cinema__sim"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="concept-cinema__sim-header">
          <h3>Ecosystem Symbiosis Simulator</h3>
          <p>Tweak the input densities of the three key forces to observe the real-time ecological and economic feedback of the polyculture loop.</p>
        </div>

        <div className="concept-cinema__sim-grid">
          {/* Controls Column */}
          <div className="concept-cinema__sim-controls">
            <h4 className="concept-cinema__sim-section-title">Biological Inputs</h4>
            
            <div className="concept-cinema__sim-slider-group" style={{ '--accent': '#f3c969', '--accent-alpha': 'rgba(243, 201, 105, 0.2)' }}>
              <div className="concept-cinema__sim-slider-label">
                <span>🌾 Rice Field Density</span>
                <span className="value-badge">{rice}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={rice} 
                onChange={(e) => setRice(Number(e.target.value))} 
                className="concept-cinema__sim-range"
              />
            </div>

            <div className="concept-cinema__sim-slider-group" style={{ '--accent': '#74e6ac', '--accent-alpha': 'rgba(116, 230, 172, 0.2)' }}>
              <div className="concept-cinema__sim-slider-label">
                <span>🐟 Carp Population</span>
                <span className="value-badge">{carp}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={carp} 
                onChange={(e) => setCarp(Number(e.target.value))} 
                className="concept-cinema__sim-range"
              />
            </div>

            <div className="concept-cinema__sim-slider-group" style={{ '--accent': '#6eb3ff', '--accent-alpha': 'rgba(110, 179, 255, 0.2)' }}>
              <div className="concept-cinema__sim-slider-label">
                <span>🦆 Duck Population</span>
                <span className="value-badge">{duck}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={duck} 
                onChange={(e) => setDuck(Number(e.target.value))} 
                className="concept-cinema__sim-range"
              />
            </div>

            {/* Micro Flow Visual inside controls column */}
            <div className="concept-cinema__sim-diagram-container">
              <svg viewBox="0 0 200 160" className="concept-cinema__sim-flow-svg">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 2 L 8 5 L 0 8 z" fill="rgba(255,255,255,0.4)" />
                  </marker>
                </defs>
                
                {/* Connection paths */}
                <path 
                  d="M 100 25 Q 60 70 50 110" 
                  fill="none" 
                  stroke={duck > 0 && rice > 0 ? "rgba(110, 179, 255, 0.5)" : "rgba(255,255,255,0.1)"} 
                  strokeWidth="2" 
                  strokeDasharray="5, 5"
                  className={duck > 0 && rice > 0 ? "flow-active-rd" : ""}
                  markerEnd="url(#arrow)"
                />
                <path 
                  d="M 55 125 Q 100 135 145 125" 
                  fill="none" 
                  stroke={duck > 0 && carp > 0 ? "rgba(116, 230, 172, 0.5)" : "rgba(255,255,255,0.1)"} 
                  strokeWidth="2" 
                  strokeDasharray="5, 5"
                  className={duck > 0 && carp > 0 ? "flow-active-dc" : ""}
                  markerEnd="url(#arrow)"
                />
                <path 
                  d="M 150 110 Q 140 70 100 25" 
                  fill="none" 
                  stroke={carp > 0 && rice > 0 ? "rgba(243, 201, 105, 0.5)" : "rgba(255,255,255,0.1)"} 
                  strokeWidth="2" 
                  strokeDasharray="5, 5"
                  className={carp > 0 && rice > 0 ? "flow-active-cr" : ""}
                  markerEnd="url(#arrow)"
                />

                {/* Nodes */}
                <g transform="translate(100, 20)">
                  <circle r="16" fill="rgba(243, 201, 105, 0.15)" stroke="#f3c969" strokeWidth="1" />
                  <text y="4" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Rice</text>
                </g>
                <g transform="translate(50, 120)">
                  <circle r="16" fill="rgba(110, 179, 255, 0.15)" stroke="#6eb3ff" strokeWidth="1" />
                  <text y="4" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Duck</text>
                </g>
                <g transform="translate(150, 120)">
                  <circle r="16" fill="rgba(116, 230, 172, 0.15)" stroke="#74e6ac" strokeWidth="1" />
                  <text y="4" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Carp</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Feedback Column */}
          <div className="concept-cinema__sim-feedback">
            <div className="concept-cinema__sim-health">
              <div className="concept-cinema__sim-health-title">Ecosystem Symbiosis Rating</div>
              <div className="concept-cinema__sim-health-score" style={{ color: status.color }}>
                {overallHealth}
                <span className="percent-sign">%</span>
              </div>
            </div>

            <h4 className="concept-cinema__sim-section-title">Polyculture Outputs</h4>
            
            <div className="concept-cinema__sim-bar-group">
              <div className="bar-label">
                <span>🔄 Nutrient Loop Recycling</span>
                <span>{nutrientLoop}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${nutrientLoop}%`, background: 'linear-gradient(90deg, #5beca4, #74e6ac)' }} />
              </div>
            </div>

            <div className="concept-cinema__sim-bar-group">
              <div className="bar-label">
                <span>🐛 Pest Management Rate</span>
                <span>{pestControl}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${pestControl}%`, background: 'linear-gradient(90deg, #6eb3ff, #3884ff)' }} />
              </div>
            </div>

            <div className="concept-cinema__sim-bar-group">
              <div className="bar-label">
                <span>🌿 Weed Control Level</span>
                <span>{weedControl}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${weedControl}%`, background: 'linear-gradient(90deg, #f3c969, #e2b03d)' }} />
              </div>
            </div>

            <div className="concept-cinema__sim-bar-group">
              <div className="bar-label">
                <span>💰 Total Land Productivity</span>
                <span>{economicYield}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${economicYield}%`, background: 'linear-gradient(90deg, #ff8a7a, #ff5e49)' }} />
              </div>
            </div>

            {/* Alert Status Box */}
            <div className="concept-cinema__sim-alert" style={{ borderColor: status.color, background: `linear-gradient(135deg, rgba(11, 15, 20, 0.95), ${status.color}15)` }}>
              <div className="alert-badge" style={{ background: status.color }}>{status.title}</div>
              <p className="alert-desc">{status.desc}</p>
            </div>
          </div>
        </div>
      </Motion.div>
    </section>
  )
}

function FinalScene() {
  return (
    <section className="concept-cinema__chapter concept-cinema__chapter--final">
      <Motion.h2
        initial={{ opacity: 0, y: 38 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.64 }}
        transition={{ duration: 0.8 }}
      >
        The future isn&apos;t built against nature.
      </Motion.h2>
      <Motion.h2
        className="is-gold"
        initial={{ opacity: 0, y: 38 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.64 }}
        transition={{ duration: 0.8, delay: 0.18 }}
      >
        It&apos;s built like nature.
      </Motion.h2>
    </section>
  )
}

export default function ConceptualizationSection() {
  return (
    <section className="concept-cinema">
      <div className="concept-cinema__fixed-bg">
        <AmbientLayer />
      </div>
      <ProblemScene />
      <DiscoveryScene />
      <ForcesScene />
      <InsightScene />
      <VisionScene />
      <ImpactScene />
      <FinalScene />

      <style>{`
        .concept-cinema {
          position: relative;
          background: #0B0F14;
          color: white;
          overflow: hidden;
          isolation: isolate;
        }
        .concept-cinema__fixed-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .concept-cinema__chapter {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          display: grid;
          place-items: center;
          padding: clamp(28px, 5vw, 76px);
          isolation: isolate;
          z-index: 1;
        }
        .concept-cinema__ambient,
        .concept-cinema__glow,
        .concept-cinema__rings {
          position: absolute;
          inset: 0;
          z-index: -4;
        }
        .concept-cinema__ambient {
          background:
            radial-gradient(circle at 50% 76%, rgba(35,106,80,0.22), transparent 34%),
            linear-gradient(180deg, #05070a 0%, #0B0F14 48%, #07110f 100%);
        }
        .concept-cinema__glow {
          filter: blur(36px);
          opacity: 0.72;
          animation: conceptBreath 8s ease-in-out infinite;
        }
        .concept-cinema__glow--green {
          background: radial-gradient(circle at 22% 24%, rgba(91,236,164,0.22), transparent 34%);
        }
        .concept-cinema__glow--gold {
          background: radial-gradient(circle at 78% 68%, rgba(243,201,105,0.18), transparent 32%);
          animation-delay: -3s;
        }
        .concept-cinema__rings span {
          position: absolute;
          left: 50%;
          top: 53%;
          width: min(58vw, 780px);
          aspect-ratio: 1;
          border: 1px solid rgba(118,230,176,0.13);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: conceptPulse 8s ease-in-out infinite;
        }
        .concept-cinema__rings span:nth-child(2) {
          width: min(40vw, 540px);
          border-color: rgba(243,201,105,0.12);
          animation-delay: -2.4s;
        }
        .concept-cinema__rings span:nth-child(3) {
          width: min(22vw, 330px);
          animation-delay: -4.8s;
        }
        .concept-cinema__ambient i {
          position: absolute;
          left: var(--x);
          top: var(--y);
          width: var(--size);
          height: var(--size);
          border-radius: 999px;
          background: rgba(210,255,228,0.62);
          box-shadow: 0 0 22px rgba(111,230,166,0.48);
          animation: conceptDrift 8s ease-in-out infinite;
          animation-delay: var(--delay);
        }
        .concept-cinema__problem-stack {
          display: grid;
          gap: clamp(18px, 2.6vw, 40px);
          text-align: center;
          max-width: 1240px;
        }
        .concept-cinema__problem-line,
        .concept-cinema__discovery-text,
        .concept-cinema__insights p,
        .concept-cinema__vision-copy h2,
        .concept-cinema__chapter--final h2 {
          font-family: var(--font-display);
          font-weight: 300;
          letter-spacing: 0;
          text-wrap: balance;
        }
        /* Setup lines are smaller so the whole story fits one screen; the gold answer is the largest. */
        .concept-cinema__problem-line {
          margin: 0;
          font-size: clamp(2.1rem, 4.6vw, 5.5rem);
          line-height: 1.06;
          color: rgba(255,255,255,0.92);
          text-wrap: balance;
        }
        .concept-cinema__problem-line.is-gold {
          margin-top: clamp(10px, 2vw, 32px);
          font-size: clamp(2.6rem, 6.2vw, 7.25rem);
          line-height: 1.02;
        }
        .concept-cinema__problem-word {
          display: inline-block;
        }
        .is-gold {
          color: #f3c969 !important;
        }
        /* ── Problem scene: field illustration ── */
        .concept-cinema__chapter.concept-cinema__chapter--problem {
          --field-h: clamp(180px, 32vh, 330px);
          padding-bottom: calc(var(--field-h) * 0.72);
        }
        .concept-cinema__problem-stack {
          position: relative;
          z-index: 1;
        }
        .cdr-field {
          --line: rgba(255,255,255,0.13);
          --stalk: rgba(168,176,172,0.5);
          --grain: rgba(176,176,166,0.4);
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: var(--field-h);
          z-index: 0;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 30%, #000 88%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0%, #000 30%, #000 88%, transparent 100%);
          transition: opacity 1.6s ease, filter 1.6s ease;
        }
        .cdr-field svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }
        .cdr-field path,
        .cdr-field ellipse {
          fill: none;
          stroke-width: 1.2;
          stroke-linecap: round;
          vector-effect: non-scaling-stroke;
          transition: stroke 1.8s ease, fill 1.8s ease, opacity 1.4s ease;
        }
        .cdr-field--p3 { opacity: 0.55; }
        .cdr-field--p4 {
          --line: rgba(116,230,172,0.3);
          --stalk: rgba(116,230,172,0.78);
          --grain: #f3c969;
        }

        .cdr-contour {
          stroke: var(--line);
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 2.4s cubic-bezier(0.22,1,0.36,1), stroke 1.8s ease !important;
        }
        .cdr-contour--2 { opacity: 0.7; transition-delay: 0.2s !important; }
        .cdr-contour--3 { opacity: 0.5; transition-delay: 0.35s !important; }
        .cdr-field:not(.cdr-field--p0) .cdr-contour { stroke-dashoffset: 0; }

        .cdr-pond {
          stroke: var(--line);
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 2s cubic-bezier(0.22,1,0.36,1) 0.3s, stroke 1.8s ease !important;
        }
        .cdr-field:not(.cdr-field--p0) .cdr-pond { stroke-dashoffset: 0; }
        .cdr-shimmer { stroke: var(--line); opacity: 0; }
        .cdr-field--p1 .cdr-shimmer,
        .cdr-field--p4 .cdr-shimmer { opacity: 0.8; }
        .cdr-pond-glow { opacity: 0; }
        .cdr-field--p4 .cdr-pond-glow { opacity: 1; }

        /* stalks: grow in, wilt, then stand back up */
        .cdr-stem, .cdr-leaf { stroke: var(--stalk); }
        .cdr-leaf { opacity: 0.8; }
        .cdr-grain { fill: var(--grain) !important; stroke: none !important; }
        .cdr-stalk {
          transform: rotate(0deg) scaleY(0);
          transition: transform 1.6s cubic-bezier(0.22,1,0.36,1) var(--d);
        }
        .cdr-field--p1 .cdr-stalk { transform: rotate(calc(var(--droop) * 0.2)) scaleY(1); }
        .cdr-field--p2 .cdr-stalk,
        .cdr-field--p3 .cdr-stalk { transform: rotate(var(--droop)) scaleY(0.9); }
        .cdr-field--p4 .cdr-stalk {
          transform: rotate(0deg) scaleY(1);
          transition: transform 1.8s cubic-bezier(0.34,1.36,0.64,1) var(--d);
        }
        .cdr-field--p4 .cdr-sway { animation: cdrSway 5.5s ease-in-out infinite; }

        /* chemical drops fall while the field is struggling */
        .cdr-drop {
          fill: rgba(196,204,214,0.5) !important;
          stroke: none !important;
          opacity: 0;
        }
        .cdr-field--p1 .cdr-drop,
        .cdr-field--p2 .cdr-drop,
        .cdr-field--p3 .cdr-drop { animation: cdrDrop 2.7s cubic-bezier(0.55,0,0.9,0.5) infinite; }

        /* life returns */
        .cdr-sun {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 2s ease 0.4s, transform 2.4s cubic-bezier(0.22,1,0.36,1) 0.4s;
        }
        .cdr-sun-arc { stroke: rgba(243,201,105,0.7); }
        .cdr-field--p4 .cdr-sun { opacity: 1; transform: translateY(0); }
        .cdr-ripple {
          stroke: rgba(116,230,172,0.5);
          opacity: 0;
          transform-box: fill-box;
          transform-origin: center;
        }
        .cdr-field--p4 .cdr-ripple { animation: cdrRipple 3.9s ease-out infinite; }
        .cdr-fish, .cdr-duck { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .cdr-fish path { fill: rgba(243,201,105,0.85) !important; stroke: none !important; }
        .cdr-duck path { fill: rgba(240,236,224,0.85) !important; stroke: none !important; }
        .cdr-duck .cdr-duck-wake { fill: none !important; stroke: rgba(116,230,172,0.4) !important; }
        .cdr-field--p4 .cdr-fish { animation: cdrLeap 7s ease-in-out 1.4s infinite; }
        .cdr-field--p4 .cdr-duck { opacity: 1; transition: opacity 1.6s ease 1s; animation: cdrGlide 18s ease-in-out infinite alternate; }

        @keyframes cdrSway {
          0%, 100% { transform: rotate(-1.6deg); }
          50% { transform: rotate(1.6deg); }
        }
        @keyframes cdrDrop {
          0% { opacity: 0; transform: translateY(0); }
          15% { opacity: 1; }
          85% { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(200px); }
        }
        @keyframes cdrRipple {
          0% { opacity: 0.7; transform: scale(0.4); }
          100% { opacity: 0; transform: scale(2.4); }
        }
        @keyframes cdrLeap {
          0% { opacity: 0; transform: translate(0, 6px) rotate(-55deg); }
          3% { opacity: 1; }
          12% { transform: translate(34px, -44px) rotate(0deg); }
          21% { opacity: 1; transform: translate(68px, 6px) rotate(55deg); }
          24%, 100% { opacity: 0; transform: translate(68px, 6px) rotate(55deg); }
        }
        @keyframes cdrGlide {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-60px, 1px); }
          100% { transform: translate(-120px, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cdr-field *, .cdr-field { animation: none !important; transition-duration: 0.4s !important; transition-delay: 0s !important; }
        }
        .concept-cinema__aerial {
          position: absolute;
          inset: 7vh 5vw 22vh;
          display: grid;
          place-items: center;
        }
        .concept-cinema__aerial svg {
          width: min(980px, 90vw);
          filter: drop-shadow(0 34px 80px rgba(0,0,0,0.35));
        }
        .concept-cinema__discovery-text {
          position: relative;
          max-width: 920px;
          margin-top: min(38vh, 340px);
          font-size: clamp(2.1rem, 5.2vw, 5.8rem);
          line-height: 1.05;
          text-align: center;
          color: rgba(255,255,255,0.92);
        }
        .concept-cinema__forces {
          width: min(1240px, 94vw);
          min-height: min(76vh, 720px);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .concept-cinema__force {
          position: relative;
          overflow: hidden;
          display: grid;
          align-content: end;
          min-width: 0;
          background: rgba(255,255,255,0.04);
        }
        .concept-cinema__force::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0.78;
          z-index: 1;
          pointer-events: none;
        }
        .concept-cinema__force--rice { color: #f3c969; }
        .concept-cinema__force--rice::before {
          background: linear-gradient(180deg, rgba(243,201,105,0.05), rgba(91,236,164,0.13));
        }
        .concept-cinema__force--carp { color: #74e6ac; }
        .concept-cinema__force--carp::before {
          background: radial-gradient(circle at 50% 42%, rgba(116,230,172,0.16), transparent 48%);
        }
        .concept-cinema__force--duck { color: #e8f0ff; }
        .concept-cinema__force--duck::before {
          background: linear-gradient(135deg, rgba(243,201,105,0.08), rgba(110,154,255,0.13));
        }
        .concept-cinema__force-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .concept-cinema__force-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .concept-cinema__force:hover .concept-cinema__force-bg img {
          transform: scale(1.1);
        }
        .concept-cinema__force-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(11, 15, 20, 0.2) 0%, rgba(11, 15, 20, 0.85) 100%);
          transition: background 0.5s ease;
        }
        .concept-cinema__force:hover .concept-cinema__force-overlay {
          background: linear-gradient(180deg, rgba(11, 15, 20, 0.1) 0%, rgba(11, 15, 20, 0.95) 100%);
        }
        .concept-cinema__force-copy {
          position: relative;
          z-index: 2;
          padding: clamp(24px, 4vw, 48px);
        }
        .concept-cinema__force-copy span {
          display: block;
          margin-bottom: 16px;
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 4rem);
          color: white;
        }
        .concept-cinema__force-copy h3 {
          font-family: var(--font-display);
          font-size: clamp(4rem, 9vw, 9.5rem);
          font-weight: 300;
          line-height: 0.86;
        }
        .concept-cinema__flow {
          position: absolute;
          inset: 18vh 7vw;
          animation: conceptSweep 7s ease-in-out infinite alternate;
        }
        .concept-cinema__flow span {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(116,230,172,0.85), rgba(243,201,105,0.8), transparent);
          box-shadow: 0 0 26px rgba(116,230,172,0.34);
        }
        .concept-cinema__flow span:nth-child(1) { top: 25%; transform: rotate(-8deg); }
        .concept-cinema__flow span:nth-child(2) { top: 50%; transform: rotate(4deg); }
        .concept-cinema__flow span:nth-child(3) { top: 72%; transform: rotate(-2deg); }
        .concept-cinema__insights {
          display: grid;
          gap: 18px;
          text-align: center;
        }
        .concept-cinema__insights p {
          font-size: clamp(2.5rem, 6.8vw, 7.4rem);
          line-height: 0.96;
          color: rgba(255,255,255,0.95);
        }
        .concept-cinema__chapter--vision {
          align-content: center;
          gap: clamp(36px, 7vh, 72px);
        }
        .concept-cinema__identity {
          position: relative;
          width: min(430px, 78vw);
          aspect-ratio: 1;
          display: grid;
          place-items: center;
        }
        .concept-cinema__identity-ring {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.16);
          background:
            radial-gradient(circle, rgba(116,230,172,0.18), transparent 35%),
            conic-gradient(from 90deg, transparent, rgba(116,230,172,0.46), rgba(243,201,105,0.44), transparent);
          mask-image: radial-gradient(circle, transparent 56%, black 57%);
          animation: conceptSpin 12s linear infinite;
        }
        .concept-cinema__orbit {
          position: absolute;
          inset: 0;
          animation: conceptSpin 12s linear infinite;
          pointer-events: none;
        }
        .concept-cinema__morph {
          position: absolute;
          padding: 10px 14px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.76);
          pointer-events: auto;
          animation: conceptSpinCounter 12s linear infinite;
          will-change: transform;
        }
        .concept-cinema__logo {
          width: 158px;
          height: 158px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          background: linear-gradient(145deg, rgba(243,201,105,0.2), rgba(116,230,172,0.2)), rgba(11,15,20,0.86);
          box-shadow: inset 0 0 50px rgba(255,255,255,0.06), 0 28px 90px rgba(0,0,0,0.44);
          font-family: var(--font-display);
          font-size: 38px;
          color: white;
        }
        .concept-cinema__vision-copy {
          text-align: center;
        }
        .concept-cinema__vision-copy h2 {
          font-size: clamp(2.4rem, 5.8vw, 6.8rem);
          line-height: 1.02;
          color: rgba(255,255,255,0.92);
        }
        .concept-cinema__metrics {
          width: min(1200px, 94vw);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(16px, 2.5vw, 32px);
          padding: 40px 0;
        }
        .concept-cinema__metric {
          position: relative;
          min-height: 290px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 30px 24px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          overflow: hidden;
          transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
          cursor: pointer;
          will-change: transform;
        }
        .concept-cinema__metric:hover {
          border-color: var(--accent);
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4), 0 0 20px var(--accent-alpha);
        }
        .concept-cinema__metric-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          background: radial-gradient(circle 160px at var(--mx, 50%) var(--my, 50%), var(--accent-alpha), transparent 85%);
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .concept-cinema__metric:hover .concept-cinema__metric-glow {
          opacity: 1;
        }
        .concept-cinema__metric-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          z-index: 1;
        }
        .concept-cinema__metric-subtitle {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          font-family: var(--font-display);
        }
        .concept-cinema__metric-icon-wrapper {
          color: var(--accent);
          opacity: 0.85;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        .concept-cinema__metric:hover .concept-cinema__metric-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          opacity: 1;
        }
        .metric-icon {
          width: 28px;
          height: 28px;
        }
        .concept-cinema__metric-body {
          display: flex;
          flex-direction: column;
          width: 100%;
          z-index: 1;
        }
        .concept-cinema__metric-num {
          font-family: var(--font-display);
          font-size: clamp(3.2rem, 5vw, 4.6rem);
          font-weight: 300;
          line-height: 1;
          color: white;
          margin-bottom: 8px;
          display: flex;
          align-items: baseline;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        .concept-cinema__metric-num span {
          font-size: 0.6em;
          color: var(--accent);
          margin-left: 2px;
        }
        .concept-cinema__metric-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 400;
          color: var(--accent);
          margin-bottom: 12px;
          letter-spacing: 0.05em;
        }
        .concept-cinema__metric-desc {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.65);
          font-weight: 300;
        }

        /* Simulator Container */
        .concept-cinema__sim {
          width: min(1200px, 94vw);
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 24px;
          padding: 44px;
          margin-top: 60px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .concept-cinema__sim-header {
          margin-bottom: 40px;
          text-align: left;
        }
        .concept-cinema__sim-header h3 {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          font-weight: 300;
          color: white;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .concept-cinema__sim-header p {
          font-size: 15px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.6);
          max-width: 760px;
          font-weight: 300;
        }
        .concept-cinema__sim-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 56px;
        }
        .concept-cinema__sim-section-title {
          font-family: var(--font-display);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.4);
          margin-bottom: 28px;
          font-weight: 400;
        }
        .concept-cinema__sim-slider-group {
          margin-bottom: 24px;
        }
        .concept-cinema__sim-slider-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 400;
        }
        .concept-cinema__sim-slider-label .value-badge {
          background: var(--accent-alpha);
          color: var(--accent);
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 12px;
          font-weight: bold;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .concept-cinema__sim-range {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.1);
          outline: none;
          transition: background 0.3s;
        }
        .concept-cinema__sim-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--accent);
          cursor: pointer;
          border: 2px solid #0B0F14;
          box-shadow: 0 0 10px var(--accent);
          transition: transform 0.2s;
        }
        .concept-cinema__sim-range::-webkit-slider-thumb:hover {
          transform: scale(1.25);
        }
        .concept-cinema__sim-diagram-container {
          display: flex;
          justify-content: center;
          margin-top: 36px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
        }
        .concept-cinema__sim-flow-svg {
          width: 100%;
          max-width: 320px;
          height: auto;
        }
        
        /* Dashed flow animation */
        @keyframes flowDash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .flow-active-rd, .flow-active-dc, .flow-active-cr {
          animation: flowDash 1.2s linear infinite;
        }
        .flow-active-rd { stroke-dasharray: 6, 4; stroke: #6eb3ff; }
        .flow-active-dc { stroke-dasharray: 6, 4; stroke: #74e6ac; }
        .flow-active-cr { stroke-dasharray: 6, 4; stroke: #f3c969; }

        /* Feedback styling */
        .concept-cinema__sim-health {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 16px;
          padding: 20px 24px;
          margin-bottom: 36px;
        }
        .concept-cinema__sim-health-title {
          font-family: var(--font-display);
          font-size: 15px;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 300;
        }
        .concept-cinema__sim-health-score {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 300;
          line-height: 1;
          display: flex;
          align-items: baseline;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
          transition: color 0.4s ease;
        }
        .concept-cinema__sim-health-score .percent-sign {
          font-size: 16px;
          margin-left: 2px;
          opacity: 0.7;
        }
        .concept-cinema__sim-bar-group {
          margin-bottom: 20px;
        }
        .concept-cinema__sim-bar-group .bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
          font-weight: 300;
        }
        .concept-cinema__sim-bar-group .bar-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 99px;
          overflow: hidden;
        }
        .concept-cinema__sim-bar-group .bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .concept-cinema__sim-alert {
          border-left: 3px solid;
          border-radius: 12px;
          padding: 20px;
          margin-top: 36px;
          transition: border-color 0.4s ease;
        }
        .concept-cinema__sim-alert .alert-badge {
          display: inline-block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 10px;
          border-radius: 6px;
          color: #0B0F14;
          font-weight: bold;
          margin-bottom: 10px;
          transition: background 0.4s ease;
        }
        .concept-cinema__sim-alert .alert-desc {
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.75);
          margin: 0;
          font-weight: 300;
        }

        @media (max-width: 900px) {
          .concept-cinema__sim {
            padding: 28px;
          }
          .concept-cinema__sim-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .concept-cinema__chapter--final {
          background: #020305;
          text-align: center;
          align-content: center;
          gap: 20px;
        }
        .concept-cinema__chapter--final h2 {
          font-size: clamp(2.7rem, 6.8vw, 7.2rem);
          line-height: 1;
          color: rgba(255,255,255,0.93);
        }
        @keyframes conceptPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.32; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.88; }
        }
        @keyframes conceptDrift {
          0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.2; }
          50% { transform: translate3d(18px, -22px, 0); opacity: 0.78; }
        }
        @keyframes conceptBreath {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(0, -18px, 0) scale(1.04); }
        }
        @keyframes conceptSweep {
          from { transform: translateX(-3%); }
          to { transform: translateX(3%); }
        }
        @keyframes conceptSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes conceptSpinCounter {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        @media (max-width: 900px) {
          .concept-cinema__forces {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .concept-cinema__force {
            min-height: 34vh;
          }
          .concept-cinema__force-visual svg {
            width: 54%;
          }
          .concept-cinema__metrics {
            grid-template-columns: 1fr 1fr;
          }
          .concept-cinema__metric {
            min-height: 240px;
          }
        }
        /* Phones & small tablets: chapters size to their content instead of a full screen each. */
        @media (max-width: 760px) {
          .concept-cinema__chapter {
            min-height: 0;
            padding: clamp(72px, 12svh, 112px) 20px;
          }
          .concept-cinema__chapter.concept-cinema__chapter--problem {
            min-height: 92svh;
            --field-h: clamp(150px, 26svh, 210px);
            padding-bottom: calc(var(--field-h) * 0.8);
          }
          .concept-cinema__chapter--final {
            min-height: 70svh;
          }
          .concept-cinema__chapter--discovery {
            gap: 12px;
          }
          .concept-cinema__aerial {
            position: relative;
            inset: auto;
            width: 100%;
          }
          .concept-cinema__aerial svg {
            width: 100%;
          }
          .concept-cinema__discovery-text {
            margin-top: 0;
            font-size: clamp(1.9rem, 7.4vw, 2.6rem);
            line-height: 1.12;
          }
          .concept-cinema__forces {
            width: 100%;
          }
          .concept-cinema__force {
            min-height: clamp(200px, 30svh, 260px);
          }
          .concept-cinema__flow {
            inset: 12% 0;
            opacity: 0.45;
          }
          .concept-cinema__insights {
            gap: 14px;
          }
          .concept-cinema__insights p {
            font-size: clamp(2.2rem, 9.4vw, 3.2rem);
            line-height: 1.06;
          }
          .concept-cinema__vision-copy h2 {
            font-size: clamp(1.9rem, 7.8vw, 2.8rem);
            line-height: 1.12;
          }
          .concept-cinema__chapter--final h2 {
            font-size: clamp(2.2rem, 9.6vw, 3.4rem);
            line-height: 1.08;
          }
          .concept-cinema__metrics {
            width: 100%;
            padding: 0;
            gap: 14px;
          }
          .concept-cinema__metric {
            padding: 24px 20px;
          }
          .concept-cinema__sim {
            width: 100%;
            margin-top: 40px;
            padding: 24px 18px;
            border-radius: 20px;
          }
        }
        @media (max-width: 560px) {
          .concept-cinema__chapter {
            padding: clamp(64px, 10svh, 96px) 16px;
          }
          .concept-cinema__metrics {
            grid-template-columns: 1fr;
          }
          .concept-cinema__metric {
            min-height: auto;
          }
          .concept-cinema__logo {
            width: 128px;
            height: 128px;
            font-size: 30px;
          }
        }
      `}</style>
    </section>
  )
}
