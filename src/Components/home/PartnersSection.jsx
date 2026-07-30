import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const partners = [
  {
    name: 'National Skill Development Corporation (NSDC)',
    logo: '/NSDC-Preview-removebg-preview_ztn40e.jpg'
  },
  {
    name: 'Logistics Skill Council (LSC)',
    logo: '/LSC-logo-300x138-removebg-preview_fefyvr.jpg'
  },
  {
    name: 'Rubber, Chemical & Petrochemical Skill Development Council',
    logo: '/RCPSDC_ag2fwu.jpg'
  },
  {
    name: 'University Grants Commission (UGC)',
    logo: '/UGC-removebg-preview_l5xzoo.jpg'
  },
  {
    name: 'Skill Council for Mining Sector (SCMS)',
    logo: '/SCMS_ehl7t2.jpg'
  },
  {
    name: 'Management & Entrepreneurship and Professional Skills Council (MEPSC)',
    logo: '/mepsc-png-cropped_1_rquk2z.jpg'
  }
]

// Duplicate partners array to enable a seamless, continuous marquee effect
const doublePartners = [...partners, ...partners, ...partners]

export default function PartnersSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section className="partners-sec" ref={ref}>
      {/* Drifting organic leaves, flowers, and wave patterns in background */}
      <div className="nature-bg">
        <div className="nature-bg__overlay" />
        
        {/* Leaf 1 - Floating Tamarind/Fern structure */}
        <div className="leaf leaf-1">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="0.75" opacity="0.12">
            <path d="M12 2C12 2 17 7 17 12C17 17 12 22 12 22M12 2C12 2 7 7 7 12C7 17 12 22 12 22" />
            <path d="M12 6c2-1 4-1 4 1s-2 3-4 2m0-4c-2-1-4-1-4 1s2 3 4 2" />
            <path d="M12 11c2.5-1 5-1 5 1s-2.5 3-5 2m0-4c-2.5-1-5-1-5 1s2.5 3 5 2" />
          </svg>
        </div>

        {/* Leaf 2 - Water pond ripples */}
        <div className="leaf leaf-2">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="var(--water-light)" strokeWidth="0.5" opacity="0.15">
            <circle cx="50" cy="50" r="40" strokeDasharray="5, 10" />
            <circle cx="50" cy="50" r="25" strokeDasharray="3, 6" />
            <circle cx="50" cy="50" r="10" />
          </svg>
        </div>

        {/* Leaf 3 - Floral structure */}
        <div className="leaf leaf-3">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--rice-gold)" strokeWidth="0.8" opacity="0.12">
            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M12 2c0 3-2 4-2 6s2 2 2 4 2-2 2-4-2-3-2-6" />
            <path d="M2 12c3 0 4 2 6 2s2-2 4-2-2-2-4-2-3 2-6 2" />
          </svg>
        </div>

        {/* Leaf 4 - Broad foliage */}
        <div className="leaf leaf-4">
          <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="var(--rice-green)" strokeWidth="0.7" opacity="0.15">
            <path d="M3 20c8-2 13-8 15-15m-15 15c4-8 10-12 16-12" />
            <path d="M10 12c2-2 4-3 6-3m-10 7c2-2 5-3 8-3" />
          </svg>
        </div>
      </div>

      <div className="container partners-sec__container">
        {/* Header Block */}
        <motion.div 
          className="partners-sec__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label" style={{ color: 'rgba(255,255,255,0.6)', justifyContent: 'center' }}>
            TRUSTED ECOSYSTEM PARTNERS
          </div>
          <h2 className="partners-sec__title">Our Partners</h2>
        </motion.div>

        {/* Horizontal Auto-Scrolling Marquee Track */}
        <div className="partners-sec__marquee-container">
          <div className="marquee-fade-left" />
          <div className="marquee-fade-right" />
          
          <div className="partners-sec__marquee-track">
            {doublePartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="partner-marquee-item"
                title={partner.name}
              >
                {/* Logo Wrapper */}
                <div className="partner-logo-circle">
                  <img className="partner-logo-img" src={partner.logo} alt={`${partner.name} logo`} />
                </div>
                <span className="partner-logo-name">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .partners-sec {
          position: relative;
          width: 100%;
          padding: 90px 0;
          background: #060c10; /* Premium deep dark forest night theme */
          overflow: hidden;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .partners-sec__container {
          position: relative;
          z-index: 2;
        }
        .partners-sec__header {
          text-align: center;
          margin-bottom: 60px;
        }
        .partners-sec__title {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 4.5vw, 3.5rem);
          color: white;
          margin-top: 10px;
          font-weight: 300;
          letter-spacing: -0.015em;
        }
        
        /* Drifting nature elements background */
        .nature-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .nature-bg__overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(6, 12, 16, 0.4) 0%, #060c10 85%);
          z-index: 1;
        }
        .leaf {
          position: absolute;
          z-index: 0;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .leaf-1 {
          top: 10%;
          left: 6%;
          animation: float-leaf-y 9s infinite alternate;
        }
        .leaf-2 {
          top: 50%;
          right: 5%;
          animation: float-leaf-x 11s infinite alternate;
        }
        .leaf-3 {
          bottom: 8%;
          left: 15%;
          animation: float-leaf-rotate 15s infinite linear;
        }
        .leaf-4 {
          top: 30%;
          right: 20%;
          animation: float-leaf-y 10s infinite alternate-reverse;
        }

        @keyframes float-leaf-y {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          100% { transform: translateY(-30px) rotate(15deg); opacity: 0.9; }
        }
        @keyframes float-leaf-x {
          0% { transform: translateX(0) rotate(0deg); opacity: 0.5; }
          100% { transform: translateX(40px) rotate(-15deg); opacity: 0.85; }
        }
        @keyframes float-leaf-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Marquee Display Outer Wrapper */
        .partners-sec__marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 20px 0;
        }
        
        /* Edge gradients to blend marquee track */
        .marquee-fade-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 120px;
          background: linear-gradient(to right, #060c10 15%, transparent 100%);
          z-index: 10;
          pointer-events: none;
        }
        .marquee-fade-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 120px;
          background: linear-gradient(to left, #060c10 15%, transparent 100%);
          z-index: 10;
          pointer-events: none;
        }

        /* Scrolling Marquee Track */
        .partners-sec__marquee-track {
          display: flex;
          gap: 34px;
          width: max-content;
          animation: infinite-marquee 30s linear infinite;
          padding-left: 20px;
        }
        .partners-sec__marquee-container:hover .partners-sec__marquee-track,
        .partners-sec__marquee-track:hover {
          animation-play-state: paused !important;
          -webkit-animation-play-state: paused !important;
        }

        @keyframes infinite-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); } /* Shift exactly one full set of logos */
        }

        /* Partner Marquee Card Item */
        .partner-marquee-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          width: 190px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        
        .partner-logo-circle {
          width: 180px;
          height: 112px;
          border-radius: 8px;
          background: linear-gradient(180deg, #ffffff 0%, #f4f8fb 100%);
          border: 1px solid rgba(255, 255, 255, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(12, 28, 36, 0.05) inset;
          opacity: 1;
          filter: none;
          overflow: hidden;
        }
        .partner-marquee-item:hover .partner-logo-circle {
          opacity: 1;
          filter: none;
          background: #ffffff;
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.38), 0 0 24px rgba(255, 255, 255, 0.12);
          transform: translateY(-4px) scale(1.03);
        }
        .partner-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: normal;
          filter: contrast(1.12) saturate(1.12);
          transition: transform 0.4s, filter 0.4s;
        }
        .partner-marquee-item:hover .partner-logo-img {
          filter: contrast(1.18) saturate(1.18);
        }
        
        .partner-logo-name {
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 1.45;
          opacity: 0;
          transform: translateY(8px);
          transition: all 0.35s ease;
          pointer-events: none;
          max-width: 180px;
        }
        .partner-marquee-item:hover .partner-logo-name {
          opacity: 1;
          transform: translateY(0);
          color: rgba(255, 255, 255, 0.85);
        }

        @media (max-width: 768px) {
          .partners-sec__marquee-track {
            gap: 24px;
          }
          .partner-marquee-item {
            width: 150px;
          }
          .partner-logo-circle {
            width: 145px;
            height: 92px;
            padding: 12px;
            opacity: 0.9;
            filter: none;
          }
          .partner-logo-img {
            width: 100%;
            height: 100%;
          }
          .partner-logo-name {
            opacity: 0.8;
            transform: translateY(0);
            font-size: 10.5px;
          }
          .marquee-fade-left, .marquee-fade-right {
            width: 60px;
          }
        }
      `}</style>
    </section>
  )
}
