import React from 'react'
import CountUp from 'react-countup'
import { FiTrendingUp, FiShoppingBag, FiLayers, FiCoffee, FiDollarSign } from 'react-icons/fi'

export default function RevenueView() {
  const financialKPIs = [
    { label: 'Revenue Today', value: 84250, trend: '+15%', desc: 'Product yields + bookings' },
    { label: 'Weekly Gross', value: 485000, trend: '+11%', desc: 'Week starting July 15' },
    { label: 'Monthly Forecast', value: 1840000, trend: '+18%', desc: 'July estimation' },
    { label: 'Year-to-Date Yield', value: 12450000, trend: '+8%', desc: 'FY2026-27 total ledger' }
  ]

  const programRevenue = [
    { name: '🐟 Pondy Fish', value: '₹1,85,000', percent: 78, color: 'var(--water-mid)' },
    { name: '🦆 Duck Habitat', value: '₹1,06,000', percent: 55, color: 'var(--accent-teal)' },
    { name: '🌾 Rice Ecology', value: '₹1,22,000', percent: 62, color: 'var(--rice-gold)' },
    { name: '🐐 Eastern Ghats Goat', value: '₹98,000', percent: 48, color: 'var(--reed-brown)' },
    { name: '☕ Tribey Coffee', value: '₹42,500', percent: 35, color: '#8b5cf6' },
    { name: '🧵 Tassar Fashion', value: '₹2,25,000', percent: 92, color: '#a855f7' },
    { name: '🌳 Tamarind Grove', value: '₹64,000', percent: 40, color: 'var(--rice-green)' }
  ]

  const sources = [
    { category: 'Direct Product Sales', value: '₹4,12,000', percent: 45, icon: <FiShoppingBag /> },
    { category: 'Gift Shop (Silk & Crafts)', value: '₹2,55,000', percent: 28, icon: <FiLayers /> },
    { category: 'Cafe & Tribey Coffee Sales', value: '₹96,000', percent: 11, icon: <FiCoffee /> },
    { category: 'Eco Lodge & Seminars Bookings', value: '₹1,35,000', percent: 16, icon: <FiDollarSign /> }
  ]

  const topSelling = [
    { item: 'Raw Heritage Gold Tassar Silk', sales: '85 kg', value: '₹2,55,000', stock: 'In Stock' },
    { item: 'TRIBEY Organic Coffee Beans', sales: '120 kg', value: '₹96,000', stock: 'Low Stock' },
    { item: 'Organic Carp (Live Harvest)', sales: '450 units', value: '₹1,35,000', stock: 'In Stock' },
    { item: 'Dried Tamarind Pulp (Vacuum Packed)', sales: '180 packs', value: '₹17,100', stock: 'In Stock' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div className="tab-view-header">
        <h2 className="section-title-serif">Financial Yield &amp; Revenue Ledger</h2>
        <p className="section-desc">Track sales distribution, lodge bookings, and wholesale export yields for the 7 livelihood loops.</p>
      </div>

      {/* KPI Counters */}
      <div className="stats-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {financialKPIs.map((kpi, idx) => (
          <div key={idx} className="os-glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-light)', fontWeight: 600 }}>{kpi.label}</span>
              <span style={{ fontSize: '10px', color: 'var(--rice-green)', background: 'rgba(30,132,73,0.08)', padding: '2px 8px', borderRadius: '20px', fontWeight: 700 }}>
                {kpi.trend}
              </span>
            </div>
            <h3 style={{ fontSize: '26px', fontWeight: 600 }}>
              ₹<CountUp end={kpi.value} separator="," duration={2} />
            </h3>
            <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>{kpi.desc}</span>
          </div>
        ))}
      </div>

      {/* Program Breakdown & Source Splits */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px' }}>
        
        {/* Revenue by Program */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '16px' }}>Revenue Yield by Livelihood Program</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {programRevenue.map((prog, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600 }}>
                  <span>{prog.name}</span>
                  <span style={{ color: 'var(--text-dark)' }}>{prog.value}</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(0,0,0,0.04)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${prog.percent}%`, height: '100%', background: prog.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source breakdowns */}
        <div className="os-glass-card">
          <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '16px' }}>Income Channel Share</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {sources.map((src, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.3)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--accent-teal)', fontSize: '16px' }}>{src.icon}</span>
                  <div>
                    <span style={{ display: 'block', fontSize: '12px', fontWeight: 600 }}>{src.category}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-light)' }}>{src.percent}% channel yield</span>
                  </div>
                </div>
                <strong>{src.value}</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top Selling Products List */}
      <div className="os-glass-card">
        <h3 className="section-title-serif" style={{ fontSize: '18px', marginBottom: '12px' }}>Ecosystem Assets Sales Leaderboard</h3>
        <table className="db-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Asset Category</th>
              <th>Volume Sold</th>
              <th>Total Value Generated</th>
              <th>Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {topSelling.map((p, idx) => (
              <tr key={idx}>
                <td className="font-semibold">{p.item}</td>
                <td>{p.sales}</td>
                <td>{p.value}</td>
                <td>
                  <span className={`table-status table-status--${p.stock === 'In Stock' ? 'in-stock' : 'low-stock'}`}>
                    {p.stock}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
