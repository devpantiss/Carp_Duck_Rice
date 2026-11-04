import { motion } from 'framer-motion'
import LazyVideo from '../Common/LazyVideo'

export default function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero__media">
        <LazyVideo
          eager
          className="about-hero__video"
          src="/videos/forest.mp4"
        />
      </div>
      <div className="about-hero__overlay" />
      <motion.div
        className="about-hero__content container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
      >
        <div className="section-label" style={{ color: 'rgba(255,255,255,0.62)', justifyContent: 'center' }}>
          <span style={{ background: 'rgba(255,255,255,0.35)', display: 'block', width: 32, height: 1 }} />
          About CDR Park
          <span style={{ background: 'rgba(255,255,255,0.35)', display: 'block', width: 32, height: 1 }} />
        </div>
        <h1 className="about-hero__title">A Living <em>Livelihood</em> Landscape</h1>
        <p className="about-hero__sub">
          Carp, duck, and rice come together here as a practical model for ecological restoration,
          village income, and hands-on learning.
        </p>
      </motion.div>

      <style>{`
        .about-hero {
          position: relative;
          height: 100vh;
          min-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .about-hero__media,
        .about-hero__video,
        .about-hero__overlay {
          position: absolute;
          inset: 0;
        }
        .about-hero__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .about-hero__overlay {
          background:
            linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.58) 100%),
            linear-gradient(90deg, rgba(13,32,24,0.45), rgba(13,32,24,0.08));
        }
        .about-hero__content {
          position: relative;
          z-index: 1;
          color: white;
          text-align: center;
          max-width: 820px;
        }
        .about-hero__title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 9vw, 8rem);
          font-weight: 300;
          line-height: 0.98;
          margin-top: 18px;
        }
        .about-hero__title em {
          color: var(--accent-gold);
          font-style: italic;
        }
        .about-hero__sub {
          max-width: 620px;
          margin: 22px auto 0;
          font-size: clamp(13px, 1.5vw, 16px);
          line-height: 1.8;
          color: rgba(255,255,255,0.72);
          letter-spacing: 0.04em;
        }
      `}</style>
    </section>
  )
}
