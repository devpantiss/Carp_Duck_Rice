import { Link } from 'react-router-dom'
import LazyVideo from '../Common/LazyVideo'

const programsData = [
  {
    id: 'pondy-fish',
    title: 'Pondy Fish',
    tag: 'Sustainable Fisheries',
    accent: '#4ecdc4',
    stat: '12,000+',
    statLabel: 'Fishers Supported',
    emoji: 'ðŸŸ',
    video: '/videos/pondy-fish.mp4',
    desc: 'Reviving traditional aquaculture and restoring native coastal wetlands through community cooperatives.',
  },
  {
    id: 'guavas-acrerise',
    title: 'Guavas AcreRise',
    tag: 'Sustainable Agriculture',
    accent: '#a8e063',
    stat: '8,400',
    statLabel: 'Acres Cultivated',
    emoji: 'ðŸŒ¿',
    video: '/videos/guavas.mp4',
    desc: 'Transforming smallholder farms into high-yield multi-layered food forests and sustainable fruit orchards.',
  },
  {
    id: 'easternghats-goat',
    title: 'Eastern Ghats Goats',
    tag: 'Livestock Farming',
    accent: '#f7b731',
    stat: '3,200',
    statLabel: 'Goats Raised',
    emoji: 'ðŸ',
    video: '/videos/goats.mp4',
    desc: 'Securing critical tribal safety nets and income stability through scientific rotational livestock grazing.',
  },
  {
    id: 'tamarind-grove',
    title: 'Tamarind Grove',
    tag: 'Agroforestry',
    accent: '#e17055',
    stat: '5,600',
    statLabel: 'Trees Cultivated',
    emoji: 'ðŸŒ³',
    video: '/videos/tamarind-grove.mp4',
    desc: 'Building drought-resistant microclimates and establishing high-margin tribal processing hubs.',
  },
  {
    id: 'tassar-fashion',
    title: 'Tassar Fashion',
    tag: 'Rural Textiles & Fashion',
    accent: '#ff7675',
    stat: '1,500+',
    statLabel: 'Artisans Supported',
    emoji: 'ðŸ§µ',
    video: '/videos/tassar-fashion.mp4',
    desc: 'Empowering handloom weavers by scaling organic heritage silk crafts to premium international fashion markets.',
  },
  {
    id: 'mega-poultry',
    title: 'The Poultry Reserve',
    tag: 'Poultry Farming',
    accent: '#00cec9',
    stat: '2,200+',
    statLabel: 'Poultry Farms Setup',
    emoji: '🐣',
    video: '/videos/mega-poultry.mp4',
    desc: 'Securing secondary household cash flow and combating local malnutrition with high-productivity backyard coops.',
  },
  {
    id: 'tribey-coffee',
    title: 'Tribey Coffee',
    tag: 'Organic Shade Agriculture',
    accent: '#c09067',
    stat: '4,500+',
    statLabel: 'Farmers Engaged',
    emoji: '☕',
    video: '/videos/coffee.mp4',
    desc: 'Cultivating premium Arabica coffee under native forest canopies, ensuring sustainable tribal income and microclimate protection.',
  }
]

function ProgramShowcaseCard({ program }) {
  return (
    <div
      className="showcase-card"
      style={{ '--accent': program.accent }}
    >
      <div className="showcase-card__video-wrapper">
        <LazyVideo
          src={program.video}
          className="showcase-card__video"
        />
        <div className="showcase-card__video-overlay" />
      </div>
      <div className="showcase-card__content">
        <div className="showcase-card__header">
          <span className="showcase-card__emoji">{program.emoji}</span>
          <span className="showcase-card__tag">{program.tag}</span>
        </div>
        <h4 className="showcase-card__title">{program.title}</h4>
        <p className="showcase-card__desc">{program.desc}</p>
        <div className="showcase-card__footer">
          <div className="showcase-card__stat">
            <span className="showcase-card__stat-val">{program.stat}</span>
            <span className="showcase-card__stat-label">{program.statLabel}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {(program.id === 'pondy-fish' || program.id === 'easternghats-goat') && (
              <Link
                to={`/dashboard/powerbi/${program.id}`}
                className="showcase-card__db-btn"
                style={{ '--accent-c': program.accent }}
              >
                SEE DASHBOARD ↗
              </Link>
            )}
            <Link to={`/programs/${program.id}`} className="showcase-card__link">
              Explore <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProgramShowcaseSection() {
  return (
    <section className="program-showcase-section">
      <div className="program-showcase-section__sky" />
      <div className="container">
        <div className="seasons__showcase-section">
          <div className="showcase-section__header">
            <span className="showcase-section__eyebrow">PROGRAM SHOWCASE</span>
            <h3 className="showcase-section__title">Livelihood Park</h3>
            <p className="showcase-section__subtitle">Explore our seven core initiatives driving sustainable economic empowerment across the region.</p>
          </div>

          <div className="seasons__showcase-grid">
            {programsData.map((p) => (
              <ProgramShowcaseCard key={p.id} program={p} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .program-showcase-section {
          position: relative;
          padding: var(--section-pad) 0;
          overflow: hidden;
        }
 background: linear-gradient(
  135deg,
  #000000 0%,
  #111111 40%,
  #1f1f1f 100%
);
        .program-showcase-section__sky::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.18);
        }
        .program-showcase-section > .container { position: relative; z-index: 1; }

        /* Program Showcase Section */
        .seasons__showcase-section {
          position: relative;
          z-index: 1;
          margin-top: 12px;
        }
        .showcase-section__header {
          text-align: center;
          margin-bottom: 42px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .showcase-section__eyebrow {
          font-size: 10px;
          letter-spacing: 0.35em;
          color: #ffb300;
          font-weight: 700;
          display: block;
          margin-bottom: 12px;
        }
        .showcase-section__title {
          font-family: var(--font-display);
          font-size: clamp(32px, 5vw, 44px);
          color: black;
          margin-bottom: 16px;
          font-weight: 300;
          letter-spacing: -0.01em;
        }
        .showcase-section__subtitle {
          font-size: 14.5px;
          color: rgba(11, 0, 0, 0.65);
          line-height: 1.6;
          font-weight: 300;
        }

        /* Showcase Grid */
        .seasons__showcase-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 20px;
          align-items: stretch;
        }

        /* Program Card */
        .showcase-card {
          position: relative;
          min-height: 340px;
          border-radius: 12px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(23, 3, 3, 0.14);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 28px;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: pointer;
          box-shadow: none;
          isolation: isolate;
        }
        .showcase-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 26px rgba(0, 0, 0, 0.18);
        }
        .showcase-card__video-wrapper {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .showcase-card__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
          transform: scale(1.01);
          transition: transform 0.7s cubic-bezier(0.25, 0.8, 0.25, 1), filter 0.7s ease;
          pointer-events: none;
        }
        .showcase-card:hover .showcase-card__video {
          transform: scale(1.06);
          filter: saturate(1.08) contrast(1.05);
        }
        .showcase-card__video-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.14) 46%, rgba(0, 0, 0, 0.08) 100%),
            linear-gradient(to right, rgba(0, 0, 0, 0.14), transparent 58%);
          z-index: 1;
        }
        .showcase-card__content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 100%;
          justify-content: flex-end;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.65);
        }
        .showcase-card__header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }
        .showcase-card__emoji {
          font-size: 20px;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25));
        }
        .showcase-card__tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .showcase-card__title {
          font-family: var(--font-display);
          font-size: 22px;
          color: white;
          margin-bottom: 10px;
          font-weight: 400;
          text-wrap: balance;
        }
        .showcase-card__desc {
          font-size: 13px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.86);
          font-weight: 300;
          margin: 0 0 20px 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          transition: color 0.3s;
        }
        .showcase-card:hover .showcase-card__desc {
          color: rgba(255, 255, 255, 0.96);
        }
        .showcase-card__footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
          padding-top: 15px;
          margin-top: auto;
        }
        .showcase-card__stat {
          display: flex;
          flex-direction: column;
        }
        .showcase-card__stat-val {
          font-size: 16px;
          font-weight: 700;
          color: var(--accent);
          line-height: 1.2;
        }
        .showcase-card__stat-label {
          font-size: 9px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }
        .showcase-card__db-btn {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #000000;
          background: var(--accent-c, #4ecdc4);
          padding: 6px 14px;
          border-radius: 99px;
          text-decoration: none;
          transition: all 0.3s ease;
          pointer-events: auto;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .showcase-card__db-btn:hover {
          background: #ffffff;
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px var(--accent-c);
        }
        .showcase-card__link {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: white;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.3s;
          pointer-events: auto;
        }
        .showcase-card:hover .showcase-card__link {
          color: var(--accent);
        }
        .showcase-card__link span {
          transition: transform 0.3s;
        }
        .showcase-card:hover .showcase-card__link span {
          transform: translateX(4px);
        }

        /* Responsiveness */
        @media (max-width: 1100px) {
          .seasons__showcase-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 18px;
          }
        }
        @media (max-width: 680px) {
          .seasons__showcase-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .showcase-card {
            min-height: 320px;
            padding: 24px;
          }
        }
      `}</style>
    </section>
  )
}
