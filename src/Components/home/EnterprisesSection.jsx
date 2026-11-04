import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import LazyVideo from '../Common/LazyVideo'

const enterprises = [
  {
    id: 'protein-systems',
    category: 'Aquaculture & Poultry',
    title: 'Sustainable Protein Systems',
    bullets: [
      'Integrating Pondy Fish and The Poultry Reserve to create year-round income',
      'Improve family and community nutrition systems',
      'Support sustainable rural livelihoods through efficient farming practices'
    ],
    bg: 'rgba(231, 29, 54, 1.0)', // Solid Vibrant Red
    shadow: 'rgba(231, 29, 54, 0.35)',
    icon: (
      <svg width="75" height="75" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#38bdf8" />
        <path d="M72 50C72 60 55 65 48 65C35 65 28 58 28 50C28 42 35 35 48 35C55 35 72 40 72 50Z" fill="#ffffff" />
        <path d="M28 50L18 40V60L28 50Z" fill="#ffffff" />
        <circle cx="60" cy="50" r="7" fill="#38bdf8" />
        <path d="M48 35C45 42 45 58 48 65" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M38 40C36 45 36 55 38 60" stroke="#0284c7" strokeWidth="1" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'farming-landscapes',
    category: 'Agriculture & Agroforestry',
    title: 'Regenerative Farming Landscapes',
    bullets: [
      'Combining Guavas AcreRise, Tamarind Grove, and Tribey Coffee orchards',
      'Promote climate-resilient agriculture and local biodiversity',
      'Ensure long-term economic opportunities for farming communities'
    ],
    bg: 'rgba(217, 119, 6, 1.0)', // Solid Vibrant Orange
    shadow: 'rgba(217, 119, 6, 0.35)',
    icon: (
      <svg width="75" height="75" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#22c55e" />
        {/* Stylized leaf/plant inside */}
        <path d="M50 20C50 20 68 35 68 55C68 65 60 72 50 72C40 72 32 65 32 55C32 35 50 20 50 20Z" fill="#ffffff" />
        <path d="M50 72V24" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M50 48C56 42 62 46 64 50" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 58C44 52 38 56 36 60" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'value-creation',
    category: 'Livestock & Rural Crafts',
    title: 'Community Enterprise & Value Creation',
    bullets: [
      'Bringing together Eastern Ghats Goats and Tassar Fashion handlooms',
      'Strengthen rural entrepreneurship and preserve heritage artisanal skills',
      'Generate stable livelihoods through value-added product channels'
    ],
    bg: 'rgba(19, 154, 67, 1.0)', // Solid Vibrant Green
    shadow: 'rgba(19, 154, 67, 0.35)',
    icon: (
      <svg width="75" height="75" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#eab308" />
        {/* Stylized loom/craft shuttle */}
        <path d="M30 40H70L80 50L70 60H30L20 50L30 40Z" fill="#ffffff" />
        <circle cx="50" cy="50" r="6" fill="#eab308" />
        <line x1="35" y1="50" x2="65" y2="50" stroke="#ca8a04" strokeWidth="3" />
      </svg>
    )
  }
]

export default function EnterprisesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="enterprises-sec" ref={ref}>
      {/* Background autoplay video loop */}
      <LazyVideo
        src="/videos/enterprises.mp4"
        className="enterprises-sec__video"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="enterprises-sec__overlay" />

      <div className="container enterprises-sec__container">
        <div className="enterprises-sec__layout">
          {/* Left Column: Heading */}
          <motion.div 
            className="enterprises-sec__left"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="enterprises-sec__eyebrow">IN-HOUSE ENTERPRISES</span>
            <h2 className="enterprises-sec__heading-main">
              Shape Your Future with<br />
              <span className="heading-colored">OUR INHOUSE</span><br />
              <span className="heading-colored">ENTERPRISES</span>
            </h2>
            <p className="enterprises-sec__desc-left">
              Building sustainable livelihoods through integrated farming, value addition, and rural entrepreneurship.
            </p>
          </motion.div>

          {/* Right Column: Staggered Cards */}
          <div className="enterprises-sec__right">
            <div className="enterprises-sec__staggered-stack">
              {enterprises.map((ent, idx) => (
                <motion.div
                  key={ent.id}
                  className={`enterprise-card-ref enterprise-card-ref--${ent.id}`}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: idx * 0.2, duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
                  whileHover={{ y: -8, scale: 1.02, zIndex: 10 }}
                  style={{ 
                    background: ent.bg,
                    boxShadow: `0 15px 35px rgba(0, 0, 0, 0.4), 0 0 25px ${ent.shadow}`
                  }}
                >
                  <div className="enterprise-card-ref__body">
                    <span className="enterprise-card-ref__category">
                      {ent.category}
                    </span>
                    <h3 className="enterprise-card-ref__title">{ent.title}</h3>
                    
                    <ul className="enterprise-card-ref__list">
                      {ent.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="enterprise-card-ref__item">
                          <span className="bullet-dot-ref" />
                          <span className="bullet-text-ref">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom Right Illustration */}
                    <div className="enterprise-card-ref__illustration">
                      {ent.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .enterprises-sec {
          position: relative;
          width: 100%;
          padding: clamp(100px, 12vw, 155px) 0;
          overflow: hidden;
          background: #000000;
        }
        .enterprises-sec__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }
        .enterprises-sec__overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.075);
          backdrop-filter: contrast(102%) brightness(99%);
          z-index: 1;
        }
        .enterprises-sec__container {
          position: relative;
          z-index: 2;
        }

        /* Two-Column Grid Layout */
        .enterprises-sec__layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 60px;
          align-items: center;
        }

        /* Left Column Heading Styles */
        .enterprises-sec__left {
          color: white;
        }
        .enterprises-sec__eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.35em;
          color: #ffffff;
          opacity: 0.65;
          text-transform: uppercase;
          display: block;
          margin-bottom: 20px;
        }
        .enterprises-sec__heading-main {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          line-height: 1.15;
          font-weight: 300;
          color: white;
          letter-spacing: -0.015em;
          margin-bottom: 25px;
        }
        .heading-colored {
          font-weight: 800;
          color: #ff5252; /* Coral red color matching the reference image heading */
          letter-spacing: 0.02em;
        }
        .enterprises-sec__desc-left {
          font-size: 15.5px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.75;
          font-weight: 300;
          max-width: 440px;
        }

        /* Right Column Staggered Layout */
        .enterprises-sec__right {
          position: relative;
          width: 100%;
        }
        .enterprises-sec__staggered-stack {
          position: relative;
          height: 820px; /* Bounded height to align staggered stack layout */
          width: 100%;
        }

        /* Staggered overlapping cards positioning */
        @media (min-width: 960px) {
          .enterprise-card-ref--protein-systems {
            position: absolute;
            top: 0;
            left: 140px;
            z-index: 3;
            width: 360px;
          }
          .enterprise-card-ref--farming-landscapes {
            position: absolute;
            top: 260px;
            left: 70px;
            z-index: 4;
            width: 360px;
          }
          .enterprise-card-ref--value-creation {
            position: absolute;
            top: 520px;
            left: 0px;
            z-index: 5;
            width: 360px;
          }
        }

        /* Card Container Styles */
        .enterprise-card-ref {
          border-radius: 14px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .enterprise-card-ref__body {
          position: relative;
          padding: 30px 30px 40px 30px;
          min-height: 250px;
          display: flex;
          flex-direction: column;
        }
        .enterprise-card-ref__category {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
        }
        .enterprise-card-ref__title {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 18px;
          color: white;
          margin-bottom: 20px;
          line-height: 1.35;
        }

        /* Card Bullets List */
        .enterprise-card-ref__list {
          list-style: none;
          padding: 0;
          margin: 0 0 25px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 82%; /* Ensure text doesn't flow underneath illustration */
        }
        .enterprise-card-ref__item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }
        .bullet-dot-ref {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffffff;
          margin-top: 7px;
          flex-shrink: 0;
        }
        .bullet-text-ref {
          font-size: 13px;
          color: #ffffff;
          line-height: 1.45;
          font-weight: 300;
        }

        /* Bottom-Right Illustration SVG placement */
        .enterprise-card-ref__illustration {
          position: absolute;
          right: 20px;
          bottom: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
          transition: all 0.3s ease;
        }
        .enterprise-card-ref:hover .enterprise-card-ref__illustration {
          transform: scale(1.08) rotate(4deg);
        }

        /* Responsiveness */
        @media (max-width: 960px) {
          .enterprises-sec__layout {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .enterprises-sec__staggered-stack {
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 25px;
            max-width: 500px;
            margin: 0 auto;
          }
          .enterprise-card-ref {
            width: 100% !important;
            position: static !important;
            transform: none !important;
          }
          .enterprises-sec__desc-left {
            max-width: 100%;
          }
          .enterprise-card-ref__body {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  )
}
