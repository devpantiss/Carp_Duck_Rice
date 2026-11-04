import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'What We Do', href: '/what-we-do' },
  { label: 'Gallery',    href: '/gallery' },
  { label: 'Dashboard',  href: '/dashboard' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
      >
        {/* ── Official Livelihood Park Logo ── */}
        <Link to="/" className="navbar__logo">
          <img
            src="/images/brand/logo-horizontal.png"
            alt="Carp, Rice & Duck Livelihood Park"
            className="navbar__logo-img"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.07 }}
            >
              <Link to={link.href} className="navbar__link">
                {link.label}
                <span className="navbar__link-dot" />
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.div
          className="navbar__cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Link to="/contact" className="navbar__cta-btn">
            <span>Contact</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{    clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mobile-menu__inner">
              <div className="mobile-menu__label">Navigation</div>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0,  opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link to={link.href} className="mobile-menu__link">
                    <span className="mobile-menu__index">0{i + 1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="mobile-menu__contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p>Harmony in Water, Rice &amp; Wings</p>
                <p>cdrpark@livelihood.in</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* ── Navbar base ── */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px clamp(20px, 5vw, 72px);
          transition: all 0.5s ease;
        }
        .navbar--scrolled {
          background: rgba(253, 254, 255, 0.96);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          padding: 10px clamp(20px, 5vw, 72px);
          box-shadow: 0 2px 20px rgba(0,0,0,0.08);
        }

        /* ── Official Livelihood Park logo image ── */
        .navbar__logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          background: transparent;
          padding: 0;
          box-shadow: none;
          transition: all 0.35s ease;
        }
        .navbar__logo-img {
          height: 76px;
          width: auto;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 1px 3px rgba(255,255,255,0.7)) drop-shadow(0 2px 8px rgba(0,0,0,0.5));
          transition: height 0.4s ease, transform 0.35s ease, filter 0.35s ease;
        }
        .navbar--scrolled .navbar__logo-img {
          height: 58px;
          filter: none;
        }
        .navbar__logo:hover .navbar__logo-img {
          transform: scale(1.04);
        }

        /* ── Desktop nav links ── */
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 40px;
          list-style: none;
        }
        .navbar__link {
          font-family: var(--font-body, 'DM Sans', sans-serif);
          font-size: 11.5px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.88);
          position: relative;
          padding-bottom: 4px;
          transition: color 0.3s;
          text-decoration: none;
        }
        .navbar--scrolled .navbar__link {
          color: #2a3a2a;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #c8a000;
          transition: width 0.35s ease;
        }
        .navbar__link:hover::after    { width: 100%; }
        .navbar__link:hover           { color: white; }
        .navbar--scrolled .navbar__link:hover { color: #111; }

        /* ── CTA ── */
        .navbar__cta {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .navbar__cta-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border: 1px solid rgba(255,255,255,0.55);
          color: white;
          font-family: var(--font-body, 'DM Sans', sans-serif);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.35s ease;
          border-radius: 99px;
        }
        .navbar--scrolled .navbar__cta-btn {
          border-color: #222;
          color: #222;
        }
        .navbar__cta-btn:hover {
          background: #c8a000;
          border-color: #c8a000;
          color: #111;
        }

        /* ── Hamburger ── */
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          width: 28px;
          padding: 2px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .navbar__hamburger span {
          display: block;
          height: 1px;
          background: white;
          transition: all 0.35s ease;
          transform-origin: center;
        }
        .navbar--scrolled .navbar__hamburger span { background: #222; }
        .navbar__hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .navbar__hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .navbar__hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

        /* ── Mobile menu ── */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: #0d1a0d;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .mobile-menu__inner {
          padding: 80px 60px;
          width: 100%;
          max-width: 560px;
        }
        .mobile-menu__label {
          font-size: 9px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 40px;
        }
        .mobile-menu__link {
          display: flex;
          align-items: center;
          gap: 20px;
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: clamp(2rem, 7vw, 4rem);
          font-weight: 300;
          color: white;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          text-decoration: none;
          transition: color 0.3s;
        }
        .mobile-menu__link:hover { color: #c8a000; }
        .mobile-menu__index {
          font-family: var(--font-body, 'DM Sans', sans-serif);
          font-size: 10px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.1em;
        }
        .mobile-menu__contact {
          margin-top: 40px;
        }
        .mobile-menu__contact p {
          font-size: 11px;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .navbar__links   { display: none; }
          .navbar__cta-btn { display: none; }
          .navbar__hamburger { display: flex; }
        }
      `}</style>
    </>
  )
}
