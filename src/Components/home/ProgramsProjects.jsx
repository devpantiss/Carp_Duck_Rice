import { Link } from 'react-router-dom'
import Slider from 'react-slick'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import LazyVideo from '../Common/LazyVideo'

const programs = [
  {
    id: 'pondy-fish',
    titleFirst: 'PONDY',
    titleSecond: 'FISH',
    tag: 'Sustainable Fisheries',
    color: '#0d2233',
    accent: '#4ecdc4',
    stat: '12,000+',
    statLabel: 'Fishers Supported',
    emoji: '🐟',
    video: '/videos/pondy-fish.mp4',
    desc: 'Reviving traditional aquaculture and restoring native coastal wetlands through community cooperatives.',
    secondaryDesc: 'Empowering local fishing families with modern organic aquaculture tools and direct market access.'
  },
  {
    id: 'guavas-acrerise',
    titleFirst: 'GUAVAS',
    titleSecond: 'ACRERISE',
    tag: 'Sustainable Agriculture',
    color: '#0d2214',
    accent: '#a8e063',
    stat: '8,400',
    statLabel: 'Acres Cultivated',
    emoji: '🌿',
    video: '/videos/guavas.mp4',
    desc: 'Transforming smallholder farms into high-yield multi-layered food forests and sustainable fruit orchards.',
    secondaryDesc: 'Improving crop resilience and restoring soil health across thousands of agricultural families.'
  },
  {
    id: 'easternghats-goat',
    titleFirst: 'EASTERN GHAT',
    titleSecond: 'GOATS',
    tag: 'Livestock Farming',
    color: '#2a0d1a',
    accent: '#f7b731',
    stat: '3,200',
    statLabel: 'Goats Raised',
    emoji: '🐐',
    video: '/videos/goats.mp4',
    desc: 'Securing critical tribal safety nets and income stability through scientific rotational livestock grazing.',
    secondaryDesc: 'Providing year-round livelihood buffers and community-managed veterinary support networks.'
  },
  {
    id: 'tamarind-grove',
    titleFirst: 'TAMARIND',
    titleSecond: 'GROVE',
    tag: 'Agroforestry',
    color: '#1a0d02',
    accent: '#e17055',
    stat: '5,600',
    statLabel: 'Trees Cultivated',
    emoji: '🌳',
    video: '/videos/tamarind-grove.mp4',
    desc: 'Building drought-resistant microclimates and establishing high-margin tribal processing hubs.',
    secondaryDesc: 'Restoring dryland soils while enabling women-led processing self-help groups.'
  },
  {
    id: 'tassar-fashion',
    titleFirst: 'TASSAR',
    titleSecond: 'FASHION',
    tag: 'Rural Textiles & Fashion',
    color: '#2d142c',
    accent: '#ff7675',
    stat: '1,500+',
    statLabel: 'Artisans Supported',
    emoji: '🧵',
    video: '/videos/tassar-fashion.mp4',
    desc: 'Empowering handloom weavers by scaling organic heritage silk crafts to premium international fashion markets.',
    secondaryDesc: 'Revitalizing traditional silk ikat craft cooperatives with solar-powered handloom centers.'
  },
  {
    id: 'mega-poultry',
    titleFirst: 'THE POULTRY',
    titleSecond: 'RESERVE',
    tag: 'Poultry Farming',
    color: '#0d2030',
    accent: '#00cec9',
    stat: '2,200+',
    statLabel: 'Poultry Farms Setup',
    emoji: '🐣',
    video: '/videos/mega-poultry.mp4',
    desc: 'Securing secondary household cash flow and combating local malnutrition with high-productivity backyard coops.',
    secondaryDesc: 'Providing landless rural families with stable daily protein sources and cooperative pricing power.'
  },
  {
    id: 'tribey-coffee',
    titleFirst: 'TRIBEY',
    titleSecond: 'COFFEE',
    tag: 'Organic Shade Agriculture',
    color: '#1a100a',
    accent: '#c09067',
    stat: '4,500+',
    statLabel: 'Farmers Engaged',
    emoji: '☕',
    video: '/videos/coffee.mp4',
    desc: 'Cultivating premium shade-grown Arabica coffee under native forest canopies with tribal farmer cooperatives.',
    secondaryDesc: 'Enabling direct-trade market pathways and local processing centers managed entirely by community groups.'
  }
]

function CustomPrevArrow({ onClick }) {
  return (
    <button className="slick-full-arrow slick-full-prev" onClick={onClick} aria-label="Previous Slide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

function CustomNextArrow({ onClick }) {
  return (
    <button className="slick-full-arrow slick-full-next" onClick={onClick} aria-label="Next Slide">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

function ProgramSlide({ program, index }) {
  return (
    <div className="p-slide" style={{ '--ca': program.accent }}>
      {/* Background autoplay loop video */}
      <LazyVideo
        src={program.video}
        className="p-slide__video"
      />

      {/* Cinematic dark left-to-right gradient overlay for text readability */}
      <div className="p-slide__overlay" />

      {/* Slide content wrapper centered inside the slider */}
      <div className="p-slide__container">
        <div className="p-slide__content">
          {/* Eyebrow badge */}
          <span className="p-slide__tag-eyebrow">
            WHAT WE DO &nbsp;•&nbsp; {program.tag}
          </span>

          {/* Large heading with colored words similar to reference layout */}
          <h3 className="p-slide__heading">
            {program.titleFirst} <span style={{ color: program.accent }}>{program.titleSecond}</span>
          </h3>

          {/* First descriptive text */}
          <p className="p-slide__desc">
            {program.desc}
          </p>

          {/* Second descriptive line displaying the key impact statistic */}
          <p className="p-slide__subdesc">
            <strong>{program.stat}</strong> {program.statLabel}. {program.secondaryDesc}
          </p>

          {/* Action Buttons */}
          <div className="p-slide__actions">
            <Link to={`/programs/${program.id}`} className="p-slide__btn" style={{ '--accent-glow': program.accent }}>
              Explore {program.titleFirst} {program.titleSecond} →
            </Link>

            {(program.id === 'pondy-fish' || program.id === 'easternghats-goat') && (
              <Link
                to={`/dashboard/powerbi/${program.id}`}
                className="p-slide__dashboard-btn"
                style={{ '--ca': program.accent }}
              >
                <span>📊</span> SEE DASHBOARD
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProgramsProjects() {

  const sliderSettings = {
    dots: true,
    fade: true, // Ultra-smooth cinematic transition
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dotsClass: "slick-dots full-slick-dots"
  }

  return (
    <>
      {/* ═══════════════ PROGRAMS ═══════════════ */}
      <section className="pp-sec pp-sec--programs-full" id="programs">
        <div className="pp-full-slider-container">
          <Slider {...sliderSettings}>
            {programs.map((p, i) => (
              <ProgramSlide key={p.id} program={p} index={i} />
            ))}
          </Slider>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .pp-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 80px);
          position: relative;
          z-index: 2;
        }

        /* ── Eyebrow ── */
        .pp-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.35em;
          color: #c0392b;
          margin-bottom: 12px;
        }
        .pp-eyebrow--lt { color: rgba(255,255,255,0.6); }
        .pp-bar {
          display: inline-block;
          width: 26px; height: 2px;
          background: currentColor;
          flex-shrink: 0;
        }

        /* ── Headings ── */
        .pp-h2 {
          font-family: 'Bebas Neue', var(--font-display, serif);
          font-size: clamp(54px, 8vw, 96px);
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #0d0d0d;
          line-height: 0.9;
          margin-bottom: 18px;
        }
        .pp-h2--lt { color: white; }

        /* ── Full Programs Section ── */
        .pp-sec--programs-full {
          background: #000000;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .pp-full-slider-container {
          width: 100%;
          position: relative;
        }

        /* ── Individual Slides ── */
        .p-slide {
          position: relative;
          width: 100%;
          height: 680px;
          display: flex !important;
          align-items: center;
          overflow: hidden;
        }

        /* ── Video Background ── */
        .p-slide__video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }

        /* ── Left-to-Right Gradients — Explicit User Directive: 7-8% Opacity ── */
        .p-slide__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(0, 0, 0, 0.12) 0%,
            rgba(0, 0, 0, 0.075) 50%,
            rgba(0, 0, 0, 0.04) 100%
          );
          backdrop-filter: contrast(102%) brightness(99%);
          z-index: 1;
        }

        /* ── Content Layout ── */
        .p-slide__container {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 80px);
          height: 100%;
          display: flex;
          align-items: center;
        }

        .p-slide__content {
          max-width: 780px;
          text-align: left;
          color: #ffffff;
        }

        .p-slide__tag-eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: var(--ca);
          margin-bottom: 20px;
          text-transform: uppercase;
          background: rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(12px);
          padding: 6px 16px;
          border-radius: 99px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .p-slide__heading {
          font-family: 'Bebas Neue', var(--font-display, serif);
          font-size: clamp(3rem, 6.5vw, 5.5rem);
          line-height: 0.95;
          font-weight: 400;
          margin-bottom: 24px;
          letter-spacing: 0.05em;
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9);
        }

        .p-slide__desc {
          font-size: clamp(15px, 1.6vw, 18px);
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 16px;
          font-weight: 400;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.85);
        }

        .p-slide__subdesc {
          font-size: clamp(13px, 1.3vw, 15px);
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 36px;
          font-weight: 400;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
        }
        .p-slide__subdesc strong {
          color: var(--ca);
          font-weight: 600;
        }

        /* ── Outline & Action Buttons ── */
        .p-slide__actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .p-slide__btn {
          display: inline-block;
          padding: 14px 34px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          color: #ffffff;
          border: 1.5px solid rgba(255, 255, 255, 0.45);
          border-radius: 99px;
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .p-slide__btn:hover {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25), 0 0 15px var(--accent-glow)44;
        }

        .p-slide__dashboard-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 34px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          color: #0d0d0d;
          background: var(--ca, #4ecdc4);
          border: 1.5px solid var(--ca, #4ecdc4);
          border-radius: 99px;
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }
        .p-slide__dashboard-btn:hover {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), 0 0 25px var(--ca);
        }

        /* ── Full Carousel Arrows ── */
        .slick-full-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.65);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .slick-full-arrow:hover {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
        }
        .slick-full-prev {
          left: 30px;
        }
        .slick-full-next {
          right: 30px;
        }

        @media (max-width: 900px) {
          .slick-full-arrow {
            display: none !important;
          }
          .p-slide {
            height: 600px;
          }
        }

        /* Custom Dots at bottom of Full View Slider */
        .full-slick-dots {
          bottom: 30px !important;
          z-index: 5;
        }
        .full-slick-dots li button:before {
          color: #ffffff !important;
          opacity: 0.25 !important;
          font-size: 8px !important;
        }
        .full-slick-dots li.slick-active button:before {
          color: #ffffff !important;
          opacity: 0.9 !important;
          font-size: 10px !important;
        }

      `}</style>
    </>
  )
}
