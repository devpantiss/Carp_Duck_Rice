import { motion } from "framer-motion";
import LazyVideo from "../Common/LazyVideo";

export default function HeroSection() {

  return (
    <section className="hero-sec">
      {/* Fixed Viewport Background Video Container — Scoped strictly to Hero section via clip-path */}
      <div className="hero-fixed-video-container">
        <LazyVideo
          eager
          src="/videos/home-hero.mp4"
          className="hero-fixed-video"
        />

        {/* 7-8% Opacity Overlay for maximum media clarity (User Directive) */}
        <div className="hero-overlay" />
      </div>

      {/* Hero Content — Scrolls naturally over the fixed hero background video */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="hero-inner"
        >
          <span className="hero-badge">Cinematic Eco-Sanctuary</span>
          <h1 className="hero-title">
            Carp, Duck <em>&amp;</em> Rice
          </h1>
          <p className="hero-subtitle">
            Where water breathes, rice dreams, and wings find home.
          </p>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="hero-scroll-indicator"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.8 },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
        >
          <span className="hero-scroll-text">Explore Sanctuary</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      <style>{`
        /* Hero Section with Container Clipping for Fixed Background */
        .hero-sec {
          position: relative;
          width: 100%;
          height: 100vh;
          clip-path: inset(0 0 0 0);
          background: #0d1a0d;
        }

        /* Fixed Video Container — Video stays fixed in viewport ONLY while inside the hero section bounds */
        .hero-fixed-video-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }

        .hero-fixed-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Explicit User Directive: 7-8% Opacity for video background clarity */
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.075);
          backdrop-filter: contrast(105%) brightness(98%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: 0 24px;
        }

        .hero-inner {
          max-width: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #f7d070;
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(12px);
          padding: 8px 20px;
          border-radius: 99px;
          border: 1px solid rgba(247, 208, 112, 0.3);
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.2rem, 7vw, 6.8rem);
          line-height: 1.05;
          font-weight: 300;
          letter-spacing: -0.02em;
          margin: 0 0 20px;
          color: #ffffff;
          text-shadow: 0 4px 24px rgba(0, 0, 0, 0.7), 0 1px 4px rgba(0,0,0,0.9);
        }

        .hero-title em {
          font-style: italic;
          font-family: var(--font-accent);
          color: #f7d070;
        }

        .hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.35rem);
          font-weight: 300;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.8);
          max-width: 680px;
          margin: 0;
          line-height: 1.6;
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.85);
          cursor: pointer;
        }

        .hero-scroll-text {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0,0,0,0.8);
        }
      `}</style>
    </section>
  );
}