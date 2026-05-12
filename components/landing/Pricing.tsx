const baseFeatures = [
  'Free Custom Design',
  'Digital Profile URL',
  'Lead Capture Inbox',
  'Profile Analytics',
  'Save Contact',
  'Variety of Themes',
  'One-Time Payment',
  'No Subscription',
  '24/7 Support',
];

const logoDark = '/identidy-logo.svg';
const logoWhite = '/identidy-logo-white.svg';

export default function Pricing() {
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="section-header reveal"><div className="eyebrow-label">SIMPLE PRICING</div><h2 className="section-headline">Own it once. Use it forever.</h2><p className="section-sub">One-time payment. Free custom design. 24/7 support.</p></div>
        <div className="pricing-grid stagger">{[
          { name: 'White NFC Card', price: '499', className: 'white-card', cta: 'Get White Card', logo: logoDark },
          { name: 'Black NFC Card', price: '599', className: 'black-card calm-hover', cta: 'Get Black Card', featured: true, logo: logoWhite },
          { name: 'Black Metal Card', price: '1,799', className: 'metal-card', cta: 'Get Metal Card', premium: true, logo: logoWhite },
        ].map((card) => (<div key={card.name} className={`pricing-card reveal${card.featured ? ' featured' : ''}${card.premium ? ' premium' : ''}`}>{card.featured && <div className="popular-badge">Most Popular</div>}{card.premium && <div className="premium-badge">Premium</div>}<div className={`nfc-card ${card.className}`}><img src={card.logo} alt="Identidy logo" className="price-logo" /></div><h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginBottom: 4 }}>{card.name}</h3><div className="price-display"><span className="price-amount">{card.price}</span><span className="price-currency">Tk</span><span className="price-period">one-time</span></div><ul className="feature-list">{baseFeatures.map((f, i) => (<li key={i}><span className="feature-check">✓</span>{f}</li>))}</ul><a href="#cta" className="btn-card-base btn-card-blue">{card.cta}</a></div>))}</div>
      </div>
    </section>
  );
}
