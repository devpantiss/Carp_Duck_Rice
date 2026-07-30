import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const programData = {
  'pondy-fish': {
    title: 'Pondy Fish',
    subtitle: 'pondy fish aquaculture',
    video: '/16490647-hd_1920_1080_60fps.mp4',
    color: '#0d2233',
    accent: '#4ecdc4',
    emoji: '🐟',
    hero: 'Reviving the waters, one pond at a time.',
    overview: `Pondy Fish is Pantiss's flagship aquaculture initiative, working with over 12,000 fishing families across coastal and inland Odisha. The program restores indigenous pond-fish ecosystems using traditional ecological knowledge combined with modern sustainable aquaculture practices.`,
    impact: [
      { v: '12,000+', l: 'Fishers Supported' },
      { v: '340',     l: 'Ponds Restored' },
      { v: '₹2.4Cr',  l: 'Annual Income Generated' },
      { v: '18',      l: 'Districts Covered' },
    ],
    approach: [
      { title: 'Ecosystem Restoration', desc: 'Rehabilitating degraded pond ecosystems using indigenous species and organic inputs.' },
      { title: 'Market Linkage', desc: 'Connecting fishers directly to urban markets, eliminating exploitative middlemen.' },
      { title: 'Capacity Building', desc: 'Training in sustainable harvesting, water quality management, and record keeping.' },
      { title: 'Women Leadership', desc: '60% of pond management committees are led by women from fishing communities.' },
    ],
    societyIntro: 'Traditional fishers in Odisha face highly seasonal incomes, high debt cycles from loan sharks, and volatile urban supply chains that absorb most of their trade value.',
    societyPoints: [
      { title: 'Cooperative Bargaining', desc: 'Organizes individual fishers into registered producer groups that negotiate bulk prices directly with commercial vendors, securing fair trade.' },
      { title: 'Women-Led Preservation', desc: 'Establishes solar drying and packaging centers managed entirely by women cooperatives, adding value and extending product shelf life.' },
      { title: 'Asset Stabilization', desc: 'Reduces seasonality of income, providing stable, year-round revenues through multi-species fish culture cycles.' }
    ],
    natureIntro: 'Intensive commercial fish farms often use antibiotic feeds and dump saline wastewater, destroying native wetlands and making adjacent agricultural land barren.',
    naturePoints: [
      { title: 'Pond Rehabilitation', desc: 'Reclaims high-salinity abandoned ponds by establishing natural water filtration systems and native plant borders.' },
      { title: 'Polyculture Dynamics', desc: 'Utilizes a mix of surface, mid-water, and bottom feeders to maintain clean water and eliminate organic waste accumulations.' },
      { title: 'Chemical-Free Habitats', desc: 'Prohibits synthetic veterinary medicines or chemical additives, protecting local groundwater tables and adjacent paddy fields.' }
    ]
  },
  'guavas-acrerise': {
    title: 'Guavas AcreRise',
    subtitle: 'Sustainable Agriculture ',
    video: '/WhatsApp Video 2026-06-03 at 17.39.43.mp4',
    color: '#0d2214',
    accent: '#a8e063',
    emoji: '🌿',
    hero: 'Growing abundance from the ground up.',
    overview: `AcreRise transforms smallholder guava farming through integrated agroforestry systems. Working across 8,400 acres in partnership with 2,100 farmer families, the program creates climate-resilient food systems that restore biodiversity while improving livelihoods.`,
    impact: [
      { v: '8,400',   l: 'Acres Cultivated' },
      { v: '2,100',   l: 'Farmer Families' },
      { v: '3.2x',    l: 'Yield Increase' },
      { v: '28',      l: 'Agroforest Species' },
    ],
    approach: [
      { title: 'Agroforestry Design', desc: 'Multi-layer food forests combining guava with nitrogen-fixing trees and ground crops.' },
      { title: 'Organic Certification', desc: 'Supporting farmers through the certification process to access premium organic markets.' },
      { title: 'Water Conservation', desc: 'Rainwater harvesting and drip irrigation to reduce dependency on erratic rainfall.' },
      { title: 'Farmer Cooperatives', desc: 'Collective bargaining power through legally registered producer cooperatives.' },
    ],
    societyIntro: 'Smallholder farmers are highly vulnerable to erratic rain patterns, soil degradation, and single-crop wholesale price crashes that lock them in poverty.',
    societyPoints: [
      { title: 'Income Diversification', desc: 'Integrates guava trees with high-value companion ground crops like ginger, turmeric, and beans to triple agricultural revenues.' },
      { title: 'Fair Trade Cooperatives', desc: 'Farmers consolidate their fruit harvests to sell to premium organic food brands, capturing larger profit margins.' },
      { title: 'Debt Relief & Savings', desc: 'Generates consistent weekly market sales that help smallholders clear old debts and establish community credit pools.' }
    ],
    natureIntro: 'Standard single-crop monoculture farming depletes essential nutrients from soil, requiring extensive synthetic chemical fertilizers that poison groundwater.',
    naturePoints: [
      { title: 'Carbon Capture', desc: 'Dense multi-strata agroforests sequester carbon at 4x the rate of traditional agricultural fields, acting as active carbon sinks.' },
      { title: 'Soil Restoration', desc: 'Nitrogen-fixing helper trees build rich organic matter and mulch, restoring long-term soil structures and fertility.' },
      { title: 'Microclimate Stabilization', desc: 'The canopy acts as a cooling shield that reduces soil evaporation, protecting crops from heat stress.' }
    ]
  },
  'easternghats-goat': {
    title: 'Eastern Ghat Goats',
    subtitle: 'Livestock Farming',
    video: '/12339388_1920_1080_25fps.mp4',
    color: '#2a0d1a',
    accent: '#f7b731',
    emoji: '🐐',
    hero: 'Building rural prosperity through sustainable livestock.',
    overview: `Goat Farm supports rural households through scientific goat rearing, veterinary healthcare, improved breeds, and market access. The initiative helps farming families generate stable income while strengthening food security and resilience.`,
    impact: [
      { v: '3,200', l: 'Goats Raised' },
      { v: '850', l: 'Families Supported' },
      { v: '₹3.5Cr', l: 'Annual Income Generated' },
      { v: '12', l: 'Blocks Covered' },
    ],
    approach: [
      { title: 'Breed Improvement', desc: 'Introducing high-quality breeds for better productivity and disease resistance.' },
      { title: 'Veterinary Care', desc: 'Regular health camps and vaccination drives.' },
      { title: 'Farmer Training', desc: 'Hands-on training in feeding, breeding and management.' },
      { title: 'Market Linkages', desc: 'Connecting farmers directly with buyers for better pricing.' },
    ],
    societyIntro: 'Tribal families in Odisha lack stable banking and credit systems, leaving them highly vulnerable to sudden health or seasonal emergency costs.',
    societyPoints: [
      { title: 'Living Assets', desc: 'Goats act as a robust, easily tradable financial security net that can be quickly liquidated for immediate cash in times of crisis.' },
      { title: 'Veterinary Support Networks', desc: 'Trains local youth as community veterinary mentors, reducing livestock disease mortality rates by 80%.' },
      { title: 'Women Asset Ownership', desc: 'Goats are managed and owned primarily by tribal women, increasing their financial independence and family decision-making status.' }
    ],
    natureIntro: 'Unregulated, dense goat grazing can strip hillsides of all vegetation, leading to massive soil erosion and forest desertification.',
    naturePoints: [
      { title: 'Rotational Grazing Plans', desc: 'Implements community-managed rotational schedules to give grazed grasslands ample time to recover and regrow.' },
      { title: 'Manure Integration', desc: 'Collects livestock manure to fertilize adjacent community vegetable gardens, replacing synthetic inputs.' },
      { title: 'Silvopastoral Buffers', desc: 'Restores degraded scrub forest land with edible fodder trees, preventing overgrazing of native forests.' }
    ]
  },
  'tamarind-grove': {
    title: 'Tamarind Grove',
    subtitle: 'Agroforestry ',
    video: '/17263107-hd_1080_1920_60fps.mp4',
    color: '#1a0d02',
    accent: '#e17055',
    emoji: '🌳',
    hero: 'Growing value from every tree.',
    overview: `Tamarind Field promotes large-scale tamarind cultivation through sustainable agroforestry systems. Farmers benefit from long-term income generation, soil conservation, and access to value-added tamarind processing opportunities.`,
    impact: [
      { v: '5,600', l: 'Trees Cultivated' },
      { v: '1,400', l: 'Farmers Engaged' },
      { v: '₹4.8Cr', l: 'Market Value Generated' },
      { v: '20', l: 'Villages Covered' },
    ],
    approach: [
      { title: 'Tree Plantation', desc: 'Large-scale plantation drives across community lands and farms.' },
      { title: 'Value Addition', desc: 'Processing tamarind into market-ready products.' },
      { title: 'Farmer Cooperatives', desc: 'Building producer groups for collective marketing.' },
      { title: 'Sustainable Agriculture', desc: 'Integrating tamarind with diversified farming systems.' },
    ],
    societyIntro: 'Forest-dwelling communities collect raw tamarind but are forced to sell it at extremely low prices to middlemen due to lack of local processing tools.',
    societyPoints: [
      { title: 'Local Processing Units', desc: 'Establishes community-managed solar deshelling and de-seeding machinery run by village groups.' },
      { title: 'Value-Added Margins', desc: 'Helps communities convert raw tamarind into pastes, blocks, and concentrate, increasing selling prices by 300%.' },
      { title: 'Tribal Rights & Incomes', desc: 'Secures fair income streams for forest-dependent gatherers, directly supporting indigenous community rights.' }
    ],
    natureIntro: 'Climate-change-driven heatwaves and droughts are rapidly drying up soils and destroying water tables in rural Odisha.',
    naturePoints: [
      { title: 'Drought Resilience', desc: 'Tamarind is a long-lived, extremely deep-rooted tree that can thrive in dry soils and stabilize local water tables.' },
      { title: 'Fire & Wind Barriers', desc: 'Serves as natural windbreaks and green belts that protect adjacent crops from severe heat and wild bushfires.' },
      { title: 'Microfauna Havens', desc: 'Protects critical microfauna and pollinators by maintaining native shade and green cover in parched landscapes.' }
    ]
  },
  'tassar-fashion': {
    title: 'Tassar Fashion',
    subtitle: 'Rural Textile & Fashion Development',
    video: '/15838333_1920_1080_60fps.mp4',
    color: '#2d142c',
    accent: '#ff7675',
    emoji: '🧵',
    hero: 'Weaving livelihoods, styling futures.',
    overview: 'Tassar Fashion is a sustainable initiative empowering rural weavers and artisans. We scale local heritage crafts into premium global textiles, directly supporting self-help groups and handloom weavers across rural hubs.',
    impact: [
      { v: '1,500+', l: 'Artisans Supported' },
      { v: '80+', l: 'Looms Restructured' },
      { v: '₹1.8Cr', l: 'Weaver Revenues' },
      { v: '6', l: 'Clusters Created' }
    ],
    approach: [
      { title: 'Handloom Revival', desc: 'Reviving traditional weaving methods with modern, efficient loom technologies.' },
      { title: 'Market Integration', desc: 'Partnering with premium apparel brands to retail artisan collections internationally.' },
      { title: 'Skill Training', desc: 'Regular workshops in contemporary design, quality control, and business management.' },
      { title: 'Eco-dyeing Loops', desc: 'Using 100% organic vegetable dyes, avoiding synthetic chemical pollutants.' }
    ],
    societyIntro: 'Rural handloom weavers are losing their livelihood to industrial power looms and lack direct market channels, forcing migration to urban labor camps.',
    societyPoints: [
      { title: 'Direct Trade Premium', desc: 'Ensures weavers receive up to 70% of the final product value directly, bypassing middleman layers.' },
      { title: 'Heritage Conservation', desc: 'Protects the traditional ikat and tassar silk weaving techniques by training youth cohorts.' },
      { title: 'Women Artisan Hubs', desc: 'Provides safe, local workspaces for female silk-spinners, bolstering rural household autonomy.' }
    ],
    natureIntro: 'Commercial textile factories dump heavily toxic chemical dyes into rivers, polluting agricultural land and underground clean water tables.',
    naturePoints: [
      { title: '100% Organic Dyes', desc: 'Uses natural indigo, turmeric, and madder roots for coloring, keeping river systems clean.' },
      { title: 'Waste Silk Recycling', desc: 'Repurposes silk remnants and cocoons into secondary handicraft products to ensure zero waste.' },
      { title: 'Solar Powered Weaving', desc: 'Powers weaving centers with clean solar energy micro-grids, reducing greenhouse emissions.' }
    ]
  },
  'mega-poultry': {
    title: 'The Poultry Reserve',
    subtitle: 'Poultry Farming & Livelihood Generation',
    video: '/10998151-uhd_3840_2160_30fps.mp4',
    color: '#0d2030',
    accent: '#00cec9',
    emoji: '🐣',
    hero: 'Empowering backyard farmers with micro-enterprises.',
    overview: 'The Poultry Reserve is designed to establish high-productivity backyard poultry farms for marginalized families. The initiative secures critical secondary income streams and combats malnutrition through veterinary support and training.',
    impact: [
      { v: '2,200+', l: 'Poultry Farms Setup' },
      { v: '1,900', l: 'Families Supported' },
      { v: '85%', l: 'Malnutrition Drop' },
      { v: '14', l: 'Blocks Covered' }
    ],
    approach: [
      { title: 'Backyard Infrastructure', desc: 'Providing predator-proof housing and high-efficiency brooding materials.' },
      { title: 'Veterinary Support', desc: 'Delivering regular vaccinations and high-quality organic feed formulations.' },
      { title: 'Cooperative Sales', desc: 'Grouping egg and poultry sales to local markets to secure higher trade prices.' },
      { title: 'Nutrition Education', desc: 'Training communities on integrating high-protein diets into local kitchens.' }
    ],
    societyIntro: 'Rural landless families face intense seasonal starvation and high infant malnutrition due to the lack of steady proteins and secondary cash sources.',
    societyPoints: [
      { title: 'Daily Cash Inflow', desc: 'Ensures families earn stable cash revenues from daily egg sales to local retail networks.' },
      { title: 'Nutrition Anchor', desc: 'Guarantees direct access to fresh, high-protein organic eggs for children and pregnant mothers.' },
      { title: 'Landless Empowerment', desc: 'Backyard coops require minimal land footprint, empowering landless laborers to run micro-enterprises.' }
    ],
    natureIntro: 'Large-scale industrial poultry farms generate massive toxic nitrogen runoffs and use chemical growth hormones that pollute environments.',
    naturePoints: [
      { title: 'Litter-to-Compost Loop', desc: 'Converts nitrogen-rich poultry waste into organic crop fertilizers for local vegetable gardens.' },
      { title: 'Free-Range Foraging', desc: 'Encourages organic insect-and-seed foraging, reducing the carbon footprint of importing feeds.' },
      { title: 'Zero Hormone Ethics', desc: 'Enforces strictly organic, hormone-free rearing to protect local soil health and human wellness.' }
    ]
  },
  'tribey-coffee': {
    title: 'Tribey Coffee',
    subtitle: 'tribey coffee cultivation',
    video: '/coffee.mp4',
    color: '#1a100a',
    accent: '#c09067',
    emoji: '☕',
    hero: 'Cultivating shade-grown organic coffee under tribal stewardship.',
    overview: 'Tribey Coffee is an agroforestry and sustainable livelihoods initiative supporting tribal farmers. Cultivated beneath high-canopy shade trees in the Eastern Ghats, our organic Arabica coffee provides marginalized households with premium income while protecting the forest.',
    impact: [
      { v: '4,500+', l: 'Farmers Engaged' },
      { v: '1,800',  l: 'Acres Planted' },
      { v: '₹3.2Cr', l: 'Artisan Revenue' },
      { v: '9',      l: 'Districts Reached' }
    ],
    approach: [
      { title: 'Shade-Grown Cultivation', desc: 'Planting organic coffee under native forest canopies to maintain microclimates and protect biodiversity.' },
      { title: 'Tribal Stewardship', desc: 'Empowering tribal self-help groups with coffee harvesting, wet-processing, and grading skills.' },
      { title: 'Community Washing', desc: 'Establishing solar-powered pulping and washing stations to process fresh coffee cherries locally.' },
      { title: 'Direct Trade Access', desc: 'Connecting tribal cooperatives directly to premium roaster networks, securing fair-trade prices.' }
    ],
    societyIntro: 'Tribal communities in remote forest areas often lack reliable cash crops and are vulnerable to seasonal unemployment and land degradation.',
    societyPoints: [
      { title: 'Year-Round Cash Flow', desc: 'Provides consistent seasonal income through harvesting, processing, and direct bean sales to premium markets.' },
      { title: 'Local Processing Hubs', desc: 'Solar-powered community processing units create skilled jobs for youth in washing, hulling, and sorting.' },
      { title: 'Empowering Self-Help Groups', desc: 'Organizes local women into cooperatives that manage secondary roasting and packaging enterprises.' }
    ],
    natureIntro: 'Deforestation and single-crop agriculture clear-cut hillsides, causing severe soil erosion, habitat loss, and drying of water tables.',
    naturePoints: [
      { title: 'Canopy Preservation', desc: 'Encourages the maintenance of diverse native forest canopies, protecting local microclimates and habitats.' },
      { title: 'Soil Bio-Retention', desc: 'Deep-rooting coffee shrubs and helper shade trees bind soil layers, preventing highland erosion.' },
      { title: 'Organic Nutrient Cycles', desc: 'Uses natural leaf litter compost and strictly prohibits synthetic agrochemicals, keeping streams clean.' }
    ]
  }
}

export default function ProgramPage() {
  const { id } = useParams()
  const p = programData[id]

  const { ref: heroRef, inView: heroIn } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: impRef, inView: impIn }   = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: symbRef, inView: symbIn } = useInView({ triggerOnce: true, threshold: 0.1 })
  const { ref: appRef, inView: appIn }   = useInView({ triggerOnce: true, threshold: 0.1 })

  if (!p) return (
    <div style={{ padding: '120px 40px', textAlign: 'center' }}>
      <h2>Program not found</h2>
      <Link to="/">← Back to Home</Link>
    </div>
  )

  return (
    <div className="pg-root" style={{ '--pc': p.color, '--pa': p.accent }}>

      {/* ── HERO ── */}
      <section className="pg-hero" ref={heroRef}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0
          }}
        >
          <source src={p.video} type="video/mp4" />
        </video>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 1
          }}
        />
        
        <div className="pg-wrap">
          <div className="pg-hero__inner">
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroIn ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Link to="/what-we-do" className="pg-back">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 8H3M7 12L3 8l4-4" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All Programs
              </Link>
         
              <div className="pg-eyebrow">{p.subtitle}</div>
              <h1 className="pg-h1">{p.title}</h1>
              <p className="pg-hero__tagline">"{p.hero}"</p>
              <p className="pg-hero__overview">{p.overview}</p>
              <a href="#symbiosis" className="pg-cta">
                View Ecological Balance
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: 4 }}>
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── IMPACT STATS ── */}
      <section className="pg-impact" ref={impRef}>
        <div className="pg-wrap">
          <motion.div
            className="pg-eyebrow pg-eyebrow--dk"
            initial={{ opacity: 0, x: -16 }}
            animate={impIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span className="pg-bar" />OUR IMPACT
          </motion.div>
          <div className="pg-impact__grid">
            {p.impact.map((s, i) => (
              <motion.div
                key={s.l}
                className="pg-istat"
                initial={{ opacity: 0, y: 30 }}
                animate={impIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="pg-istat__v">{s.v}</span>
                <span className="pg-istat__l">{s.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIETY & NATURE ALIGNMENT ── */}
      <section className="pg-symbiosis" id="symbiosis" ref={symbRef}>
        <div className="pg-wrap">
          <motion.div
            className="pg-eyebrow pg-eyebrow--dk"
            initial={{ opacity: 0, x: -16 }}
            animate={symbIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span className="pg-bar" />SOCIO-ECOLOGICAL BALANCE
          </motion.div>
          <motion.h2
            className="pg-h2"
            style={{ color: '#1a2a3a', marginBottom: 44 }}
            initial={{ opacity: 0, y: 24 }}
            animate={symbIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            SOCIETY &amp; NATURE ALIGNMENT
          </motion.h2>

          <div className="pg-symbiosis__grid">
            {/* Society Column */}
            <motion.div 
              className="symbiosis-col symbiosis-col--society"
              initial={{ opacity: 0, x: -30 }}
              animate={symbIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <div className="symbiosis-col__header">
                <span className="symbiosis-col__emoji">👥</span>
                <div>
                  <span className="symbiosis-col__label">Livelihood &amp; Society</span>
                  <h3 className="symbiosis-col__title">Empowering Communities</h3>
                </div>
              </div>
              <p className="symbiosis-col__intro">{p.societyIntro}</p>
              <div className="symbiosis-col__points">
                {p.societyPoints.map((pt, i) => (
                  <div key={i} className="symbiosis-point">
                    <h4 className="symbiosis-point__title">{pt.title}</h4>
                    <p className="symbiosis-point__desc">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Nature Column */}
            <motion.div 
              className="symbiosis-col symbiosis-col--nature"
              initial={{ opacity: 0, x: 30 }}
              animate={symbIn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="symbiosis-col__header">
                <span className="symbiosis-col__emoji">🌍</span>
                <div>
                  <span className="symbiosis-col__label">Environment &amp; Nature</span>
                  <h3 className="symbiosis-col__title">Restoring Ecosystems</h3>
                </div>
              </div>
              <p className="symbiosis-col__intro">{p.natureIntro}</p>
              <div className="symbiosis-col__points">
                {p.naturePoints.map((pt, i) => (
                  <div key={i} className="symbiosis-point">
                    <h4 className="symbiosis-point__title">{pt.title}</h4>
                    <p className="symbiosis-point__desc">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="pg-approach" id="approach" ref={appRef}>
        <div className="pg-wrap">
          <motion.div
            className="pg-eyebrow pg-eyebrow--lt"
            initial={{ opacity: 0, x: -16 }}
            animate={appIn ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            <span className="pg-bar" />HOW WE WORK
          </motion.div>
          <motion.h2
            className="pg-h2"
            initial={{ opacity: 0, y: 24 }}
            animate={appIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            OUR APPROACH
          </motion.h2>
          <div className="pg-approach__grid">
            {p.approach.map((a, i) => (
              <motion.div
                key={a.title}
                className="pg-acard"
                initial={{ opacity: 0, y: 32 }}
                animate={appIn ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              >
                <span className="pg-acard__num">0{i + 1}</span>
                <h3 className="pg-acard__title">{a.title}</h3>
                <p className="pg-acard__desc">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OTHER PROGRAMS ── */}
      <section className="pg-more">
        <div className="pg-wrap">
          <div className="pg-more__head">
            <span className="pg-eyebrow pg-eyebrow--dk"><span className="pg-bar"/>MORE PROGRAMS</span>
          </div>
          <div className="pg-more__grid">
            {Object.entries(programData)
              .filter(([k]) => k !== id)
              .slice(0, 3)
              .map(([k, q]) => (
                <Link key={k} to={`/programs/${k}`} className="pg-mcard"
                  style={{ '--mc': q.color, '--ma': q.accent }}>
                  <span className="pg-mcard__emoji">{q.emoji}</span>
                  <div>
                    <p className="pg-mcard__sub">{q.subtitle.split('•')[0].trim()}</p>
                    <h4 className="pg-mcard__title">{q.title}</h4>
                  </div>
                  <svg className="pg-mcard__arr" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .pg-root { --pc: #1a2a3a; --pa: #4ecdc4; }

        .pg-wrap {
          max-width: 1300px; margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 88px);
          position: relative; z-index: 2;
        }

        .pg-back {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          text-decoration: none; margin-bottom: 56px;
          transition: color 0.25s;
          padding-top: 110px;
        }
        .pg-back:hover { color: rgba(255,255,255,0.9); }

        .pg-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.3em;
          color: var(--pa, #4ecdc4);
          margin-bottom: 12px;
        }
        .pg-eyebrow--dk { color: #888; }
        .pg-eyebrow--lt { color: rgba(255,255,255,0.55); }
        .pg-bar {
          display: inline-block; width: 26px; height: 2px;
          background: currentColor; flex-shrink: 0;
        }

        .pg-hero {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          background: transparent;
        }
        .pg-hero__inner {
          display: grid; grid-template-columns: 1fr auto;
          gap: 60px; align-items: center;
        }
        .pg-h1 {
          font-family: 'Bebas Neue', var(--font-display, serif);
          font-size: clamp(56px, 9vw, 120px);
          font-weight: 400; letter-spacing: 0.06em;
          color: white; line-height: 0.9;
          margin-bottom: 22px;
        }
        .pg-hero__tagline {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: clamp(16px, 1.8vw, 22px);
          font-style: italic; font-weight: 300;
          color: var(--pa, #4ecdc4);
          margin-bottom: 24px; line-height: 1.4;
        }
        .pg-hero__overview {
          font-size: 15px; line-height: 1.8;
          color: rgba(255,255,255,0.65);
          max-width: 560px; margin-bottom: 36px;
        }
        .pg-cta {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 13px 28px;
          background: var(--pa, #4ecdc4);
          color: var(--pc, #0d2233);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          text-decoration: none; border-radius: 4px;
          transition: opacity 0.25s, transform 0.25s;
        }
        .pg-cta:hover { opacity: 0.88; transform: translateY(-2px); }

        .pg-impact {
          background: #f6f5f3;
          padding: 80px 0;
        }
        .pg-impact__grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 2px; margin-top: 32px;
          border-radius: 16px; overflow: hidden;
          border: 1px solid #e8e5e0;
        }
        .pg-istat {
          padding: 36px 28px; background: white;
          display: flex; flex-direction: column; gap: 8px;
          transition: background 0.25s;
        }
        .pg-istat:hover { background: #fafaf8; }
        .pg-istat__v {
          font-family: 'Bebas Neue', serif;
          font-size: 52px; font-weight: 400;
          color: #c0392b; letter-spacing: 0.04em; line-height: 1;
        }
        .pg-istat__l {
          font-size: 10px; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #999;
        }

        /* Symbiosis Section Styling */
        .pg-symbiosis {
          background: #ffffff;
          padding: 96px 0;
          border-bottom: 1px solid #e8e5e0;
        }
        .pg-symbiosis__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        .symbiosis-col {
          display: flex;
          flex-direction: column;
        }
        .symbiosis-col__header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }
        .symbiosis-col__emoji {
          font-size: 36px;
          background: #f6f5f3;
          padding: 8px;
          border-radius: 12px;
          line-height: 1;
        }
        .symbiosis-col__label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #888;
          display: block;
          margin-bottom: 4px;
        }
        .symbiosis-col__title {
          font-family: 'Bebas Neue', serif;
          font-size: 28px;
          font-weight: 400;
          letter-spacing: 0.05em;
          margin: 0;
          line-height: 1.1;
        }
        .symbiosis-col--society .symbiosis-col__title {
          color: #e67e22;
        }
        .symbiosis-col--nature .symbiosis-col__title {
          color: #27ae60;
        }
        .symbiosis-col__intro {
          font-size: 15px;
          line-height: 1.75;
          color: #555;
          margin-bottom: 32px;
          font-weight: 300;
        }
        .symbiosis-col__points {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .symbiosis-point {
          background: #fafaf9;
          border: 1px solid #e8e5e0;
          border-radius: 12px;
          padding: 20px 24px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .symbiosis-point:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.04);
        }
        .symbiosis-point__title {
          font-family: var(--font-display, serif);
          font-size: 16px;
          font-weight: 500;
          color: #1a2a3a;
          margin: 0 0 8px 0;
        }
        .symbiosis-point__desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: #666;
          margin: 0;
        }

        .pg-approach {
          background: var(--pc, #0d2233);
          padding: 96px 0 108px;
        }
        .pg-h2 {
          font-family: 'Bebas Neue', serif;
          font-size: clamp(42px, 6vw, 72px);
          font-weight: 400; letter-spacing: 0.07em;
          color: white; line-height: 0.92;
          margin-bottom: 52px;
        }
        .pg-approach__grid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .pg-acard {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 32px 28px;
          transition: background 0.3s, border-color 0.3s;
        }
        .pg-acard:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.15);
        }
        .pg-acard__num {
          font-family: monospace; font-size: 11px;
          font-weight: 700; letter-spacing: 0.1em;
          color: var(--pa, #4ecdc4); opacity: 0.7;
          display: block; margin-bottom: 14px;
        }
        .pg-acard__title {
          font-family: var(--font-display, 'Playfair Display', serif);
          font-size: 20px; font-weight: 400;
          color: white; margin-bottom: 12px;
        }
        .pg-acard__desc {
          font-size: 13px; line-height: 1.7;
          color: rgba(255,255,255,0.55);
        }

        .pg-more { background: #f6f5f3; padding: 72px 0 80px; }
        .pg-more__head { margin-bottom: 32px; }
        .pg-more__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .pg-mcard {
          display: flex; align-items: center; gap: 18px;
          background: var(--mc, #1a2a3a);
          border-radius: 14px; padding: 24px 22px;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 2px 14px rgba(0,0,0,0.12);
        }
        .pg-mcard:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.2); }
        .pg-mcard__emoji { font-size: 36px; flex-shrink: 0; }
        .pg-mcard__sub {
          font-size: 9.5px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: var(--ma, rgba(255,255,255,0.5));
          margin-bottom: 5px;
        }
        .pg-mcard__title {
          font-family: var(--font-display, serif);
          font-size: 18px; font-weight: 400; color: white;
        }
        .pg-mcard__arr {
          margin-left: auto; color: var(--ma, rgba(255,255,255,0.4));
          flex-shrink: 0; opacity: 0;
          transition: opacity 0.3s;
        }
        .pg-mcard:hover .pg-mcard__arr { opacity: 1; }

        @media (max-width: 900px) {
          .pg-hero__inner { grid-template-columns: 1fr; }
          .pg-impact__grid { grid-template-columns: repeat(2, 1fr); }
          .pg-symbiosis__grid { grid-template-columns: 1fr; gap: 48px; }
          .pg-approach__grid { grid-template-columns: 1fr; }
          .pg-more__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}