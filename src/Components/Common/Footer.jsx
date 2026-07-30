import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'

const footerLinks = {
  'Explore': ['The Park', 'Ecosystem', 'Activities', 'Conservation'],
  'Visit': ['Plan Your Trip', 'Group Bookings', 'Educational Tours', 'Seasonal Guide'],
  'Connect': ['About Us', 'Gallery', 'News & Updates', 'Contact'],
}

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <footer className="footer" ref={ref}>
      {/* Water wave top border */}
      <div className="footer__wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#1a252f"/>
        </svg>
      </div>

      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <motion.div
              className="footer__brand"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="footer__logo">
                <img
                  src="/logo-horizontal.png"
                  alt="Carp, Rice & Duck Livelihood Park"
                  className="footer__logo-img"
                />
              </div>
              <p className="footer__tagline">
                Where water breathes, rice dreams, and wings find home. A cinematic sanctuary of rural livelihood set against the eternal sky.
              </p>
              <div className="footer__conversation">
                <p className="footer__conversation-title">Join the Conversation</p>
                <div className="footer__socials">
                  <a href="#" className="footer__social" aria-label="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a href="#" className="footer__social" aria-label="Twitter">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                    </svg>
                  </a>
                  <a href="#" className="footer__social" aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  </a>
                  <a href="#" className="footer__social" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                </div>
                <a href="#" className="footer__downloads-btn">Downloads</a>
              </div>
              <div className="footer__est">
                <span>est.</span>
                <span className="footer__est-year">2024</span>
                <span>Odisha, India</span>
              </div>
            </motion.div>

            {/* Links columns */}
            {Object.entries(footerLinks).map(([title, links], colIdx) => (
              <motion.div
                key={title}
                className="footer__col"
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 * (colIdx + 1) }}
              >
                <h4 className="footer__col-title">{title}</h4>
                <ul>
                  {links.map(link => (
                    <li key={link}>
                      <a href="#" className="footer__col-link">{link}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact column */}
            <motion.div
              className="footer__col"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h4 className="footer__col-title">Contact</h4>
              <div className="footer__contact-item">
                <span className="footer__contact-label">Location</span>
                <p>Plot No 1215/1500, Khandagiri Bari, Bank of India Lane,<br/>Bhubaneswar, Odisha<br/>India — 751030</p>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-label">Hours</span>
                <p>Daily: 6:00 AM – 6:00 PM<br/>Guided tours from sunrise</p>
              </div>
              <div className="footer__contact-item">
                <span className="footer__contact-label">Enquiry</span>
                <a href="mailto:visit@cdrpark.in">info@pantiss.org</a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p>© 2024 Carp, Duck & Rice Livelihood Park. All rights reserved.</p>
            <p>Developed by- Aditya Sahu</p>
            <div className="footer__bottom-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--text-dark);
          color: rgba(255,255,255,0.7);
          position: relative;
          margin-top: 0;
        }
        .footer__wave {
          position: absolute;
          top: -79px; left: 0; right: 0;
          height: 80px;
          pointer-events: none;
        }
        .footer__wave svg {
          width: 100%; height: 100%;
        }
        .footer__main {
          padding: 80px 0 60px;
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr 1.3fr;
          gap: 40px;
        }
        .footer__brand {}
        .footer__logo {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .footer__logo-img {
          height: 64px;
          width: auto;
          object-fit: contain;
          display: block;
          flex-shrink: 0;
          background: transparent;
          filter: drop-shadow(0 2px 10px rgba(255,255,255,0.7));
        }
        .footer__logo-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 400;
          color: var(--cloud-white);
          line-height: 1.1;
        }
        .footer__logo-sub {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent-gold);
          margin-top: 4px;
        }
        .footer__tagline {
          font-size: 13px;
          line-height: 1.75;
          color: rgba(255,255,255,0.45);
          max-width: 320px;
          margin-bottom: 28px;
        }
        /* ── Join the Conversation ── */
        .footer__conversation {
          margin-bottom: 28px;
        }
        .footer__conversation-title {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 400;
          color: var(--accent-gold);
          letter-spacing: 0.04em;
          margin-bottom: 14px;
        }
        .footer__socials {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
        }
        .footer__social {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          background: #c0392b;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: background 0.3s, transform 0.2s;
          flex-shrink: 0;
        }
        .footer__social:hover {
          background: #a93226;
          transform: translateY(-2px);
        }
        .footer__downloads-btn {
          display: inline-block;
          width: 100%;
          padding: 11px 0;
          background: #c0392b;
          color: white;
          text-align: center;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          border-radius: 6px;
          text-decoration: none;
          transition: background 0.3s, transform 0.2s;
        }
        .footer__downloads-btn:hover {
          background: #a93226;
          transform: translateY(-1px);
        }
        .footer__est {
          display: flex;
          align-items: baseline;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.25);
          text-transform: uppercase;
        }
        .footer__est-year {
          font-family: var(--font-display);
          font-size: 22px;
          color: rgba(255,255,255,0.15);
        }
        .footer__col-title {
          font-family: var(--font-body);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 24px;
        }
        .footer__col ul { list-style: none; }
        .footer__col-link {
          display: block;
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          padding: 6px 0;
          transition: color 0.3s, padding-left 0.3s;
        }
        .footer__col-link:hover {
          color: var(--cloud-white);
          padding-left: 8px;
        }
        .footer__contact-item {
          margin-bottom: 20px;
        }
        .footer__contact-label {
          font-size: 9px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent-gold);
          display: block;
          margin-bottom: 6px;
        }
        .footer__contact-item p,
        .footer__contact-item a {
          font-size: 12.5px;
          line-height: 1.7;
          color: rgba(255,255,255,0.55);
        }
        .footer__contact-item a:hover { color: var(--cloud-white); }
        .footer__bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 20px 0;
        }
        .footer__bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer__bottom p {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.05em;
        }
        .footer__bottom-links {
          display: flex;
          gap: 24px;
        }
        .footer__bottom-links a {
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.3s;
        }
        .footer__bottom-links a:hover { color: var(--cloud-white); }
        @media (max-width: 1100px) {
          .footer__grid { grid-template-columns: 1fr 1fr 1fr; }
          .footer__brand { grid-column: 1 / -1; }
        }
        @media (max-width: 600px) {
          .footer__grid { grid-template-columns: 1fr 1fr; }
          .footer__bottom-inner { flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>
    </footer>
  )
}