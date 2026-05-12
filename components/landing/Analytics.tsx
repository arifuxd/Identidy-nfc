import { useMemo, useState } from 'react';

const leads = [
  { name: 'Sarah Kim', date: 'Today, 2:14 PM' },
  { name: 'James Liu', date: 'Today, 11:30 AM' },
  { name: 'Priya Nair', date: 'Yesterday' },
];

const statsByTab: Record<string, { views: string; leads: string }> = {
  '7d': { views: '324', leads: '19' },
  '30d': { views: '1,247', leads: '89' },
  'All time': { views: '8,940', leads: '642' },
};

export default function AnalyticsPreview() {
  const [activeTab, setActiveTab] = useState<'7d' | '30d' | 'All time'>('7d');
  const stats = useMemo(() => statsByTab[activeTab], [activeTab]);

  return (
    <section id="analytics" className="analytics-section">
      <div className="container">
        <div className="analytics-inner">
          <div className="reveal">
            <div className="eyebrow-label" style={{ textAlign: 'left' }}>PROFILE ANALYTICS</div>
            <h2 className="analytics-headline">Know exactly who is discovering you.</h2>
            <ul className="analytics-feature-list">{['Real-time profile view counter', 'Lead capture trend tracking', 'Date range filters: 7d / 30d / Lifetime', 'Visitor and lead tracking'].map((f, i) => (<li key={i}><span className="analytics-arrow">→</span>{f}</li>))}</ul>
          </div>
          <div className="analytics-card reveal">
            <div className="analytics-card-header"><span className="analytics-card-title">Dashboard</span><div className="filter-tabs">{(['7d', '30d', 'All time'] as const).map((tab) => (<button key={tab} className={`filter-tab${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>{tab}</button>))}</div></div>
            <div className="analytics-stats"><div><span className="analytics-stat-num">{stats.views}</span><div className="analytics-stat-label">Profile Views</div></div><div><span className="analytics-stat-num">{stats.leads}</span><div className="analytics-stat-label">Leads Captured</div></div></div>
            <table className="leads-table"><thead><tr><th>Name</th><th>Date</th><th></th></tr></thead><tbody>{leads.map((lead, i) => (<tr key={i}><td style={{ fontWeight: 500 }}>{lead.name}</td><td style={{ color: '#888', fontSize: 12 }}>{lead.date}</td><td><button className="vcf-btn">Save Contact</button></td></tr>))}</tbody></table>
          </div>
        </div>
      </div>
    </section>
  );
}
