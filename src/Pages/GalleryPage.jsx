import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/* ────────────────────────────────────────────
   Gallery data — SVG illustrated scenes
   Each item is a mini hand-crafted artwork
──────────────────────────────────────────── */
const galleryItems = [
  {
    id: 1, category: 'pondy fish', title: 'Feeding Swarm',
    sub: 'Carp feeding at dawn', span: 'tall',
    palette: ['#ffd54f','#ff6f00','#ef5350'],
    scene: (
      <img src="/pondy_fish_1.jpg" alt="Feeding Swarm" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 2, category: 'guavas arcrerise', title: 'Guava Harvest',
    sub: 'Freshly plucked guavas in a wicker basket', span: 'wide',
    palette: ['#14532d','#22c55e','#f9a825'],
    scene: (
      <img src="/guavas_1.jpg" alt="Guava Harvest" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },

  {
    id: 4, category: 'pondy fish', title: 'Seed Stocking',
    sub: 'Fingerlings ready for release', span: 'wide',
    palette: ['#1565c0','#0d47a1','#8d6e63'],
    scene: (
      <img src="/pondy_fish_2.jpg" alt="Seed Stocking" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 5, category: 'tamarind grove', title: 'Tamarind Canopy',
    sub: 'Layered tamarind leaves catching soft light', span: 'tall',
    palette: ['#1b5e20','#66bb6a','#dce775'],
    scene: (
      <img src="/tamarind_grove_1.jpg" alt="Tamarind Canopy" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 6, category: 'tamarind grove', title: 'Harvest Bowl',
    sub: 'Ripe tamarind pods gathered for processing', span: 'square',
    palette: ['#3e2723','#8d4a24','#d7a35d'],
    scene: (
      <img src="/tamarind_grove_2.jpg" alt="Harvest Bowl" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 7, category: 'tamarind grove', title: 'Grove Trunk',
    sub: 'Mature trees and new tamarind leaf growth', span: 'square',
    palette: ['#2e7d32','#9ccc65','#5d4037'],
    scene: (
      <img src="/tamarind_grove_3.jpg" alt="Grove Trunk" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 8, category: 'pondy fish', title: 'Market Day',
    sub: 'Fresh local catch ready for sale', span: 'square',
    palette: ['#e91e63','#81d4fa','#4caf50'],
    scene: (
      <img src="/pondy_fish_3.jpg" alt="Market Day" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 9, category: 'tamarind grove', title: 'Handpicked Pod',
    sub: 'Fresh tamarind pod held after harvest', span: 'wide',
    palette: ['#8d6e63','#c0a36e','#f5f5f5'],
    scene: (
      <img src="/tamarind_grove_4.jpg" alt="Handpicked Pod" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 21, category: 'tamarind grove', title: 'Pod on Branch',
    sub: 'Tamarind pod hanging among compound leaves', span: 'tall',
    palette: ['#558b2f','#c7a66a','#1b5e20'],
    scene: (
      <img src="/tamarind_grove_5.jpg" alt="Pod on Branch" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 10, category: 'pondy fish', title: 'Silver Carp Sorting',
    sub: 'Grading the morning harvest', span: 'square',
    palette: ['#90caf9','#546e7a','#b3e5fc'],
    scene: (
      <img src="/pondy_fish_4.jpg" alt="Silver Carp Sorting" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 11, category: 'pondy fish', title: 'Community Netting',
    sub: 'Cooperative fishers drawing the net', span: 'wide',
    palette: ['#0d1b4b','#1a237e','#ff8f00'],
    scene: (
      <img src="/pondy_fish_5.jpg" alt="Community Netting" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 12, category: 'guavas arcrerise', title: 'Ruby Guava Harvest',
    sub: 'Sun-ripened pink guava showing rich inner flesh', span: 'wide',
    palette: ['#f48fb1','#81c784','#e57373'],
    scene: (
      <img src="/guavas_2.jpg" alt="Ruby Guava Harvest" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 13, category: 'guavas arcrerise', title: 'Canopy Gathering',
    sub: 'Freshly dropped guavas resting on orchard leaves', span: 'wide',
    palette: ['#1b5e20','#aed581','#fff9c4'],
    scene: (
      <img src="/guavas_3.jpg" alt="Canopy Gathering" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 14, category: 'guavas arcrerise', title: 'Ripening Clusters',
    sub: 'Guavas maturing naturally under the orchard sun', span: 'tall',
    palette: ['#33691e','#d4e157','#ffd54f'],
    scene: (
      <img src="/guavas_4.jpg" alt="Ripening Clusters" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 15, category: 'guavas arcrerise', title: 'Orchard Handpick',
    sub: 'Carefully sorted yellow and green guavas ready for selection', span: 'square',
    palette: ['#827717','#c5e1a5','#fff59d'],
    scene: (
      <img src="/guavas_5.jpg" alt="Orchard Handpick" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 16, category: 'eastern ghat goats', title: 'Hillside Grazing',
    sub: 'Goat herd grazing in selected pastures of Eastern Ghats', span: 'wide',
    palette: ['#4e342e','#d7ccc8','#8d6e63'],
    scene: (
      <img src="/goats_1.jpg" alt="Hillside Grazing" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 17, category: 'eastern ghat goats', title: 'Pastoral Journey',
    sub: 'Tribal pastoralist leading the herd on their daily path', span: 'wide',
    palette: ['#0d47a1','#bbdefb','#1565c0'],
    scene: (
      <img src="/goats_2.jpg" alt="Pastoral Journey" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 18, category: 'eastern ghat goats', title: 'Monsoon Trail',
    sub: 'Black goat herd guided along a dirt path under gray skies', span: 'square',
    palette: ['#212121','#f8bbd0','#e91e63'],
    scene: (
      <img src="/goats_3.jpg" alt="Monsoon Trail" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 19, category: 'eastern ghat goats', title: 'Playful Companions',
    sub: 'Two young goats nudging and playing close up', span: 'tall',
    palette: ['#5d4037','#ffe0b2','#ff9800'],
    scene: (
      <img src="/goats_4.jpg" alt="Playful Companions" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 20, category: 'eastern ghat goats', title: 'Motherhood',
    sub: 'Goat and kid resting peacefully together in the grass', span: 'wide',
    palette: ['#3e2723','#f5f5f5','#5d4037'],
    scene: (
      <img src="/goats_5.jpg" alt="Motherhood" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 22, category: 'tassar fashion', title: 'Cocoon Harvest',
    sub: 'Handpicked golden Tassar cocoons', span: 'square',
    palette: ['#d7a35d', '#8d4a24', '#f5f5f5'],
    scene: (
      <img src="/tassar_fashion_1.jpg" alt="Cocoon Harvest" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 23, category: 'tassar fashion', title: 'Artisan Weaving',
    sub: 'Traditional handloom weaving process', span: 'wide',
    palette: ['#8d6e63', '#ffd54f', '#3e2723'],
    scene: (
      <img src="/tassar_fashion_2.jpg" alt="Artisan Weaving" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 24, category: 'tassar fashion', title: 'Intricate Patterns',
    sub: 'Detailed traditional ikat designs', span: 'tall',
    palette: ['#ef5350', '#ff6f00', '#ffd54f'],
    scene: (
      <img src="/tassar_fashion_3.jpg" alt="Intricate Patterns" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 25, category: 'tassar fashion', title: 'Golden Spindles',
    sub: 'Tassar silk yarn wound on bobbins', span: 'square',
    palette: ['#ff8f00', '#8d6e63', '#0d47a1'],
    scene: (
      <img src="/tassar_fashion_4.jpg" alt="Golden Spindles" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 26, category: 'tassar fashion', title: 'Modern Elegance',
    sub: 'Showcasing organic handloom silk drapes', span: 'wide',
    palette: ['#c7a66a', '#1b5e20', '#ffe0b2'],
    scene: (
      <img src="/tassar_fashion_5.jpg" alt="Modern Elegance" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 27, category: 'the poultry reserve', title: 'Sustainable Coop',
    sub: 'Backyard poultry house in a green garden', span: 'wide',
    palette: ['#2e7d32', '#9ccc65', '#5d4037'],
    scene: (
      <img src="/mega_poultry_1.jpg" alt="Sustainable Coop" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 28, category: 'the poultry reserve', title: 'Daily Feeding',
    sub: 'Country chickens feeding in the courtyard', span: 'square',
    palette: ['#ff9800', '#ffe0b2', '#5d4037'],
    scene: (
      <img src="/mega_poultry_2.jpg" alt="Daily Feeding" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 29, category: 'the poultry reserve', title: 'Organic Harvest',
    sub: 'Freshly gathered country eggs in a basket', span: 'tall',
    palette: ['#ffd54f', '#f5f5f5', '#8d6e63'],
    scene: (
      <img src="/mega_poultry_3.jpg" alt="Organic Harvest" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 30, category: 'the poultry reserve', title: 'Coop Building',
    sub: 'Community assembling a bamboo poultry coop', span: 'wide',
    palette: ['#1565c0', '#aed581', '#bbdefb'],
    scene: (
      <img src="/mega_poultry_4.jpg.jpg" alt="Coop Building" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 31, category: 'the poultry reserve', title: 'Livelihood Pride',
    sub: 'Rural woman with her country poultry enterprise', span: 'square',
    palette: ['#e91e63', '#4caf50', '#81d4fa'],
    scene: (
      <img src="/mega_poultry_5.jpg" alt="Livelihood Pride" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 32, category: 'tribey coffee', title: 'Shade Cultivation',
    sub: 'Organic coffee shrubs growing under a diverse forest canopy', span: 'wide',
    palette: ['#3e2723', '#8d6e63', '#aed581'],
    scene: (
      <img src="/coffee_1.jpg" alt="Shade Cultivation" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 33, category: 'tribey coffee', title: 'Ripe Cherries',
    sub: 'Bright red coffee cherries ready for handpicking', span: 'square',
    palette: ['#c0392b', '#8d6e63', '#fff9c4'],
    scene: (
      <img src="/coffee_2.jpg" alt="Ripe Cherries" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 34, category: 'tribey coffee', title: 'Artisan Drying',
    sub: 'Coffee beans drying on community drying mats', span: 'tall',
    palette: ['#ffd54f', '#f5f5f5', '#8d6e63'],
    scene: (
      <img src="/coffee_3.jpg" alt="Artisan Drying" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 35, category: 'tribey coffee', title: 'Quality Sorting',
    sub: 'Carefully grading and sorting harvested coffee beans', span: 'wide',
    palette: ['#1565c0', '#aed581', '#bbdefb'],
    scene: (
      <img src="/coffee_4.jpg" alt="Quality Sorting" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
  {
    id: 36, category: 'tribey coffee', title: 'Community Roast',
    sub: 'Tribal women roasting small batches of single-origin coffee', span: 'square',
    palette: ['#3e2723', '#ffd54f', '#e67e22'],
    scene: (
      <img src="/coffee_5.jpg" alt="Community Roast" style={{width:'100%',height:'100%',objectFit:'cover'}} />
    ),
  },
]

const categories = ['all', 'pondy fish', 'guavas arcrerise', 'eastern ghat goats', 'tamarind grove', 'tassar fashion', 'the poultry reserve', 'tribey coffee']

/* ──────────────────────────
   LIGHTBOX COMPONENT
────────────────────────── */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handle = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [onClose])

  return (
    <motion.div className="lightbox"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}>
      <motion.div className="lightbox__card"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25,0.46,0.45,0.94] }}
        onClick={e => e.stopPropagation()}>
        <div className="lightbox__image">{item.scene}</div>
        <div className="lightbox__info">
          <div className="lightbox__cat">{item.category}</div>
          <h3 className="lightbox__title">{item.title}</h3>
          <p className="lightbox__sub">{item.sub}</p>
          <button className="lightbox__close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Close
          </button>
        </div>
      </motion.div>
      <style>{`
        .lightbox {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(0,0,0,0.85);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .lightbox__card {
          background: white; max-width: 860px; width: 100%;
          display: grid; grid-template-columns: 1fr 280px;
          overflow: hidden; max-height: 90vh;
        }
        .lightbox__image { overflow: hidden; aspect-ratio: 1/1.1; }
        .lightbox__info {
          padding: 40px 32px;
          display: flex; flex-direction: column; gap: 12px;
          background: var(--cloud-white);
          overflow-y: auto;
        }
        .lightbox__cat {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--accent-teal); font-weight: 600;
        }
        .lightbox__title {
          font-family: var(--font-display); font-size: 28px;
          font-weight: 300; color: var(--text-dark); line-height: 1.1;
        }
        .lightbox__sub {
          font-size: 13px; color: var(--text-light); line-height: 1.6;
        }
        .lightbox__palette {
          display: flex; gap: 8px; margin-top: 8px;
        }
        .lightbox__close {
          display: flex; align-items: center; gap: 8px;
          margin-top: auto; padding: 12px 0;
          font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--text-light); cursor: pointer;
          border-top: 1px solid rgba(0,0,0,0.08);
          background: none; border-left: none; border-right: none; border-bottom: none;
          transition: color 0.3s;
        }
        .lightbox__close:hover { color: var(--text-dark); }
        @media (max-width: 700px) {
          .lightbox__card { grid-template-columns: 1fr; }
          .lightbox__image { aspect-ratio: 1/0.8; }
        }
      `}</style>
    </motion.div>
  )
}

/* ──────────────────────────
   GALLERY HERO
────────────────────────── */
function GalleryHero() {
  return (
    <section className="gallery-hero">
      <div className="gallery-hero__bg">
        <motion.img
          src="/gallery_hero.png"
          alt="Carp Duck Rice Park Gallery background"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
      <div className="gallery-hero__overlay"/>
      <motion.div className="gallery-hero__text container"
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}>
        <div className="section-label" style={{ color:'rgba(255,255,255,0.7)', justifyContent:'center' }}>
          <span style={{ background:'rgba(255,255,255,0.4)', display:'block', width:32, height:1 }}/>
          Visual Archive
          <span style={{ background:'rgba(255,255,255,0.4)', display:'block', width:32, height:1 }}/>
        </div>
        <h1 className="gallery-hero__title">The <em>Gallery</em></h1>
        <p className="gallery-hero__sub">Life through the lens — pondy fish, guavas arcrerise, eastern ghat goats, and the tamarind grove that breathes them all</p>
      </motion.div>
      <style>{`
        .gallery-hero {
          position: relative; height: 55vh; min-height: 400px;
          display: flex; align-items: center; justify-content: center; overflow: hidden;
          background: var(--text-dark);
        }
        .gallery-hero__bg { position: absolute; inset: 0; z-index: 0; }
        .gallery-hero__overlay {
          position: absolute; inset: 0;
          background: 
            radial-gradient(circle at center, rgba(26, 37, 47, 0.25) 0%, rgba(26, 37, 47, 0.7) 100%),
            linear-gradient(180deg, rgba(26, 82, 118, 0.15) 0%, rgba(26, 37, 47, 0.8) 100%);
          z-index: 1;
        }
        .gallery-hero__text {
          position: relative; z-index: 2; text-align: center; color: white;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
        }
        .gallery-hero__title {
          font-family: var(--font-display);
          font-size: clamp(3.5rem, 9vw, 8rem);
          font-weight: 300; letter-spacing: -0.03em; line-height: 1;
        }
        .gallery-hero__title em { color: var(--accent-gold); font-style: italic; }
        .gallery-hero__sub {
          font-size: clamp(12px,1.4vw,15px); color: rgba(255,255,255,0.75);
          max-width: 480px; margin: 16px auto 0; letter-spacing: 0.05em; line-height: 1.7;
        }
      `}</style>
    </section>
  )
}

/* ──────────────────────────
   MASONRY GRID
────────────────────────── */
function GalleryGrid() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxItem, setLightboxItem] = useState(null)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  const filtered = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(i => i.category === activeFilter)

  const spanClass = { tall: 'grid-tall', wide: 'grid-wide', square: '' }

  return (
    <section className="gallery-grid-section" ref={ref}>
      <div className="container">
        {/* Filter bar */}
        <motion.div className="gallery-filter"
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}>
          {categories.map(cat => (
            <button key={cat} className={`gallery-filter__btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}>
              {cat === 'all' ? 'All Works' : cat.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              <span className="gallery-filter__count">
                {cat === 'all' ? galleryItems.length : galleryItems.filter(i => i.category === cat).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Masonry */}
        <motion.div className="gallery-masonry" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                className={`gallery-item ${spanClass[item.span] || ''}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => setLightboxItem(item)}>
                <div className="gallery-item__scene">{item.scene}</div>
                <div className="gallery-item__info">
                  <div className="gallery-item__cat">{item.category}</div>
                  <div className="gallery-item__title">{item.title}</div>
                  <div className="gallery-item__sub">{item.sub}</div>
                </div>
                <div className="gallery-item__hover-overlay">
                  <div className="gallery-item__hover-icon">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="15" stroke="white" strokeWidth="1.5"/>
                      <path d="M10 16h12M16 10v12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="gallery-item__hover-text">{item.title}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)}/>}
      </AnimatePresence>

      <style>{`
        .gallery-grid-section {
          padding: var(--section-pad) 0;
          background: var(--cloud-white);
        }
        .gallery-filter {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-bottom: 52px;
        }
        .gallery-filter__btn {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 20px;
          border: 1px solid rgba(0,0,0,0.1);
          background: white;
          font-family: var(--font-body); font-size: 11.5px;
          font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-light); cursor: pointer;
          transition: all 0.3s var(--ease-cinematic);
        }
        .gallery-filter__btn:hover { border-color: var(--text-dark); color: var(--text-dark); }
        .gallery-filter__btn.active {
          background: var(--text-dark); color: white; border-color: var(--text-dark);
        }
        .gallery-filter__count {
          font-size: 9px; background: rgba(255,255,255,0.2);
          padding: 1px 6px; border-radius: 10px;
        }
        .gallery-filter__btn.active .gallery-filter__count { background: rgba(255,255,255,0.2); }
        .gallery-filter__btn:not(.active) .gallery-filter__count { background: var(--sky-horizon); color: var(--text-light); }

        .gallery-masonry {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 320px;
          gap: 16px;
          grid-auto-flow: dense;
        }
        .gallery-item {
          position: relative; overflow: hidden;
          cursor: pointer; background: var(--sky-horizon);
          transition: box-shadow 0.4s var(--ease-cinematic);
        }
        .gallery-item.grid-tall { grid-row: span 2; }
        .gallery-item.grid-wide { grid-column: span 2; }
        .gallery-item:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.16); }

        .gallery-item__scene {
          position: absolute; inset: 0; overflow: hidden;
          transition: transform 0.6s var(--ease-cinematic);
        }
        .gallery-item:hover .gallery-item__scene { transform: scale(1.04); }

        .gallery-item__info {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 32px 24px 24px;
          background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%);
          transform: translateY(60px);
          transition: transform 0.4s var(--ease-cinematic);
        }
        .gallery-item:hover .gallery-item__info { transform: translateY(0); }
        .gallery-item__cat {
          font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--accent-gold); margin-bottom: 4px;
        }
        .gallery-item__title {
          font-family: var(--font-display); font-size: 20px;
          font-weight: 300; color: white; margin-bottom: 4px;
        }
        .gallery-item__sub { font-size: 11px; color: rgba(255,255,255,0.6); }

        .gallery-item__hover-overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 12px; opacity: 0;
          transition: opacity 0.3s;
          background: rgba(26,37,47,0.2);
        }
        .gallery-item:hover .gallery-item__hover-overlay { opacity: 1; }
        .gallery-item__hover-text {
          font-family: var(--font-display); font-size: 18px;
          color: white; font-style: italic;
        }

        @media (max-width: 900px) {
          .gallery-masonry { grid-template-columns: repeat(2,1fr); grid-auto-rows: 260px; }
          .gallery-item.grid-wide { grid-column: span 1; }
        }
        @media (max-width: 580px) {
          .gallery-masonry { grid-template-columns: 1fr; grid-auto-rows: 300px; }
          .gallery-item.grid-tall { grid-row: span 1; }
        }
      `}</style>
    </section>
  )
}

/* ──────────────────────────
   PAGE
────────────────────────── */
export default function GalleryPage() {
  return (
    <motion.main className="page-wrapper"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}>
      <GalleryHero />
      <GalleryGrid />
    </motion.main>
  )
}