import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const programs = [
  {
    id: 'pondy-fish',
    titleLines: ['Pondy Fish'],
    subtitle: 'World Fisheries Day',
    dateBadge: '21 November',
    accent: '#2076b4',
    background: '#f1f6fa',
    glow: 'rgba(32, 118, 180, 0.12)',
    border: 'rgba(32, 118, 180, 0.15)',
    icon: '/icons/icon_1.png'
  },
  {
    id: 'guavas-acrerise',
    titleLines: ['Guavas', 'AcreRise'],
    subtitle: 'Celebrated as part of regional Harvest, Fruit & Agricultural Festivals (No official World Guava Day)',
    dateBadge: 'Throughout the Year',
    accent: '#27ae60',
    background: '#f2f8f4',
    glow: 'rgba(39, 174, 96, 0.12)',
    border: 'rgba(39, 174, 96, 0.15)',
    icon: '/icons/icon_2.png'
  },
  {
    id: 'easternghats-goat',
    titleLines: ['Eastern Ghats', 'Goats'],
    subtitle: 'National Goat Day (India)',
    dateBadge: '13 July',
    accent: '#8d6e63',
    background: '#fdf6f0',
    glow: 'rgba(141, 110, 99, 0.12)',
    border: 'rgba(141, 110, 99, 0.15)',
    icon: '/icons/icon_3.png'
  },
  {
    id: 'tamarind-grove',
    titleLines: ['Tamarind', 'Grove'],
    subtitle: 'International Day of Forests',
    dateBadge: '21 March',
    accent: '#558b2f',
    background: '#f5f8f2',
    glow: 'rgba(85, 139, 47, 0.12)',
    border: 'rgba(85, 139, 47, 0.15)',
    icon: '/icons/icon_4.png'
  },
  {
    id: 'tassar-fashion',
    titleLines: ['Tassar', 'Fashion'],
    subtitle: 'National Handloom Day (India)',
    dateBadge: '7 August',
    accent: '#7b1fa2',
    background: '#f9f2fa',
    glow: 'rgba(123, 31, 162, 0.12)',
    border: 'rgba(123, 31, 162, 0.15)',
    icon: '/icons/icon_5.png'
  },
  {
    id: 'mega-poultry',
    titleLines: ['The Poultry', 'Reserve'],
    subtitle: 'World Egg Day',
    dateBadge: 'Second Friday of October',
    accent: '#d97706',
    background: '#fdfaf2',
    glow: 'rgba(217, 119, 6, 0.12)',
    border: 'rgba(217, 119, 6, 0.15)',
    icon: '/icons/icon_6.png'
  },
  {
    id: 'tribey-coffee',
    titleLines: ['TRIBEY', 'COFFEE'],
    subtitle: 'International Coffee Day',
    dateBadge: '1 October',
    accent: '#5d4037',
    background: '#f8f4f2',
    glow: 'rgba(93, 64, 55, 0.12)',
    border: 'rgba(93, 64, 55, 0.15)',
    icon: '/icons/icon_8.png'
  }
]

export default function CelebrationsSection() {
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="celebrations-sec" ref={sectionRef}>
      {/* Gold Dust Particles */}
      <div className="gold-particle gold-particle--1" />
      <div className="gold-particle gold-particle--2" />
      <div className="gold-particle gold-particle--3" />
      <div className="gold-particle gold-particle--4" />
      <div className="gold-particle gold-particle--5" />
      <div className="gold-particle gold-particle--6" />

      <div className="container">
        {/* Top Header */}
        <motion.div
          className="celebrations-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="header-radial-glow" />
          <span className="celebrations-header__label">OUR PROGRAMS. OUR CELEBRATIONS.</span>
          <h2 className="celebrations-header__title">
            Honoring Nature. Empowering Livelihoods.
          </h2>

          {/* Decorative Divider */}
          <div className="celebrations-divider">
            <span className="divider-line" />
            <svg className="divider-leaf" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17 8C8 8 4 14 4 20C4 20 9 20 14 15C16.5 12.5 18 10 18 10C18 10 19 8.5 20 7C18.5 7.5 17 8 17 8Z" />
            </svg>
            <span className="divider-line" />
          </div>

          <p className="celebrations-header__desc">
            Each initiative we celebrate is more than a program—it's a promise to our land,<br className="desktop-only-br" />
            our people, and a sustainable future.
          </p>
        </motion.div>

        {/* Program Cards Showcase Grid */}
        <div className="celebrations-grid">
          {programs.map((prog, i) => (
            <motion.div
              key={prog.id}
              className="celebration-card"
              style={{
                '--accent': prog.accent,
                '--background': prog.background,
                '--glow': prog.glow,
                '--border': prog.border
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              {/* Double-circle floating frame overlapping card boundary */}
              <div className="card-outer-circle">
                <div className="card-inner-circle">
                  <img src={prog.icon} alt={prog.titleLines.join(' ')} className="card-illustration" />
                </div>
              </div>

              {/* Title Case / Uppercase Headings */}
              <h3 className={`card-title ${prog.id === 'tribey-coffee' ? 'uppercase-title' : ''}`}>
                {prog.titleLines.map((line, idx) => (
                  <span key={idx} className="title-line">{line}</span>
                ))}
              </h3>

              {/* Centered Accent Line */}
              <span className="card-accent-line" />

              {/* Subtitle */}
              <p className="card-subtitle">{prog.subtitle}</p>

              {/* Solid Date Badge Pill */}
              <div className="card-date-badge">
                <svg className="badge-calendar-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span className="badge-text">{prog.dateBadge}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        /* Celebrations Section Container */
        .celebrations-sec {
          background-color: #FAF7F2;
          background-image: url('/celebrations-bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        /* Watercolor blurred backgrounds */
        .watercolor-bg {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.18;
          pointer-events: none;
          z-index: 0;
        }
        .watercolor-bg--left {
          background: radial-gradient(circle, rgba(212, 172, 13, 0.3) 0%, rgba(250, 247, 242, 0) 70%);
          top: -120px;
          left: -180px;
        }
        .watercolor-bg--right {
          background: radial-gradient(circle, rgba(135, 165, 130, 0.3) 0%, rgba(250, 247, 242, 0) 70%);
          bottom: -120px;
          right: -180px;
        }

        /* Floating gold dust particles */
        .gold-particle {
          position: absolute;
          width: 3.5px;
          height: 3.5px;
          border-radius: 50%;
          background-color: #d4ac0d;
          opacity: 0.38;
          pointer-events: none;
          z-index: 1;
        }
        .gold-particle--1 { top: 18%; left: 14%; animation: float 9s ease-in-out infinite; }
        .gold-particle--2 { top: 26%; right: 16%; animation: float 11s ease-in-out infinite 1.2s; }
        .gold-particle--3 { top: 48%; left: 9%; animation: float 8s ease-in-out infinite 2.2s; }
        .gold-particle--4 { top: 64%; right: 8%; animation: float 10s ease-in-out infinite 1.7s; }
        .gold-particle--5 { bottom: 15%; left: 16%; animation: float 9s ease-in-out infinite 0.7s; }
        .gold-particle--6 { bottom: 22%; right: 22%; animation: float 12s ease-in-out infinite 2.8s; }

        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.38; }
          50% { transform: translateY(-18px) scale(1.35); opacity: 0.68; }
        }

        /* Watercolor botanical branch illustrations in corners */
        .botanical-branch {
          position: absolute;
          top: 0;
          width: 260px;
          height: 260px;
          pointer-events: none;
          z-index: 1;
          opacity: 0.85;
          background-size: contain;
          background-repeat: no-repeat;
        }
        .botanical-branch--left {
          left: 0;
          background-image: url('https://res.cloudinary.com/dxzhnns58/image/upload/v1761651882/leaf-left_a4wz2a.png');
          background-position: top left;
        }
        .botanical-branch--right {
          right: 0;
          background-image: url('https://res.cloudinary.com/dxzhnns58/image/upload/v1761651882/leaf-right_a4wz2b.png');
          background-position: top right;
        }

        /* Header styling */
        .celebrations-header {
          position: relative;
          text-align: center;
          margin-bottom: 84px;
          z-index: 2;
        }
        .header-radial-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 450px;
          height: 180px;
          background: radial-gradient(circle, rgba(212, 172, 13, 0.04) 0%, transparent 65%);
          pointer-events: none;
          z-index: -1;
        }
        .celebrations-header__label {
          display: block;
          font-family: var(--font-body, 'DM Sans', sans-serif);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 8px;
          color: #bfa57a;
          margin-bottom: 14px;
          text-transform: uppercase;
        }
        .celebrations-header__title {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: clamp(2.4rem, 4vw, 3.8rem);
          font-weight: 300;
          line-height: 1.25;
          color: #1a252f;
          margin: 0 0 20px 0;
          letter-spacing: -0.015em;
        }

        /* Header Divider */
        .celebrations-divider {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          width: 100%;
          max-width: 240px;
          margin: 0 auto 24px auto;
        }
        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, rgba(212,172,13,0) 0%, rgba(212,172,13,0.38) 50%, rgba(212,172,13,0) 100%);
          flex-grow: 1;
        }
        .divider-leaf {
          color: #8da686;
          transform: rotate(20deg);
        }

        .celebrations-header__desc {
          font-family: var(--font-body, 'DM Sans', sans-serif);
          font-size: 14.5px;
          line-height: 1.8;
          color: #616a6b;
          max-width: 750px;
          margin: 0 auto;
          font-weight: 300;
          text-wrap: balance;
        }

        /* Responsive grid row */
        .celebrations-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 20px;
          align-items: stretch;
          width: 100%;
          position: relative;
          z-index: 2;
          padding-top: 40px;
        }

        /* Card styles */
        .celebration-card {
          background-color: var(--background);
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 24px;
          padding: 56px 18px 24px 18px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: pointer;
          position: relative;
        }

        .celebration-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06), 0 0 20px var(--glow);
        }

        /* Dual-circle floating framed illustration */
        .card-outer-circle {
          position: absolute;
          top: -48px;
          left: 50%;
          transform: translateX(-50%);
          width: 96px;
          height: 96px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 3;
          background: transparent;
        }
        .card-inner-circle {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: 1px solid rgba(0,0,0,0.04);
          overflow: hidden;
        }
        .celebration-card:hover .card-outer-circle {
          transform: translateX(-50%) scale(1.06);
        }
        .celebration-card:hover .card-inner-circle {
          box-shadow: 0 8px 20px rgba(0,0,0,0.05);
        }

        .card-illustration {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .celebration-card:hover .card-illustration {
          transform: scale(1.06);
        }

        /* Typography & layout elements */
        .card-title {
          font-family: var(--font-body, 'DM Sans', sans-serif);
          font-size: 18px;
          font-weight: 500;
          color: #2c3e50;
          margin: 18px 0 10px 0;
          line-height: 1.25;
          letter-spacing: -0.01em;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .card-title.uppercase-title {
          text-transform: uppercase;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .title-line {
          display: block;
        }

        .card-accent-line {
          display: block;
          width: 24px;
          height: 2px;
          background-color: var(--accent);
          margin-bottom: 14px;
          opacity: 0.75;
          border-radius: 2px;
        }

        .card-subtitle {
          font-family: var(--font-body, 'DM Sans', sans-serif);
          font-size: 11px;
          line-height: 1.5;
          color: #7f8c8d;
          margin: 0 0 24px 0;
          font-weight: 300;
          flex-grow: 1;
        }

        /* Date Pill badge */
        .card-date-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 6px;
          background-color: var(--accent);
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          width: 100%;
          box-sizing: border-box;
        }
        .badge-calendar-icon {
          flex-shrink: 0;
          opacity: 0.9;
        }
        .badge-text {
          font-family: var(--font-body, 'DM Sans', sans-serif);
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          text-align: center;
          line-height: 1.25;
        }

        .celebration-card:hover .card-date-badge {
          box-shadow: 0 8px 18px var(--glow);
          transform: translateY(-1px);
        }

        /* Layout modifications */
        .desktop-only-br {
          display: block;
        }

        /* Breakpoints matching mockup specifications */
        @media (max-width: 1400px) {
          .celebrations-grid {
            gap: 12px;
          }
          .celebration-card {
            padding: 48px 12px 20px 12px;
          }
          .card-outer-circle {
            width: 86px;
            height: 86px;
            top: -43px;
          }
          .card-inner-circle {
            width: 76px;
            height: 76px;
          }
        }

        @media (max-width: 1100px) {
          .celebrations-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
          .botanical-branch {
            width: 200px;
            height: 200px;
          }
        }

        @media (max-width: 768px) {
          .celebrations-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
            padding-top: 40px;
          }
          .celebrations-sec {
            padding: 90px 0;
          }
          .botanical-branch {
            display: none; /* Hide corners on smaller screens to prevent overlap */
          }
        }

        @media (max-width: 540px) {
          .celebrations-grid {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            padding: 48px 8px 24px 8px;
            gap: 16px;
            width: calc(100% + 16px);
            margin-left: -8px;
          }
          .celebrations-grid::-webkit-scrollbar {
            display: none;
          }
          .celebration-card {
            flex: 0 0 260px;
            scroll-snap-align: start;
            min-height: 310px;
          }
          .celebrations-sec {
            padding: 70px 0;
          }
          .desktop-only-br {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}
