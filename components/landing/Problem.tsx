import AnimatedIcon from './AnimatedIcon';

const cards = [
  { title: 'Straight to the Bin', desc: '88% of cards are discarded within a week.', icon: '/animated%20icons/straight-to-bin.json' },
  { title: 'Reprint. Regret. Repeat.', desc: 'Every update means another costly reprint cycle.', icon: '/animated%20icons/reprint-regret-repeat.json' },
  { title: 'Forgotten Connections', desc: 'No lead capture means opportunities get lost.', icon: '/animated%20icons/forgotten-connection.json' },
  { title: 'No Digital Trail', desc: 'No view data and no follow-up insights.', icon: '/animated%20icons/no-digital-trail.json' },
];

export default function Problem() {
  return (
    <section id="problem" className="problem-section" style={{ padding: 'var(--section-padding)' }}>
      <div className="container">
        <div className="problem-inner">
          <div className="problem-left reveal">
            <div className="problem-section-label">THE PROBLEM</div>
            <h2 className="problem-headline">Paper cards lose impact too fast.</h2>
            <p className="problem-body">Printed cards get outdated, forgotten, and expensive to maintain.</p>
          </div>

          <div className="stagger">
            <div className="pain-grid pain-bento-grid">
              <div className="pain-card reveal pain-stat-tall">
                <div className="pain-graph-wrap">
                  <div className="pain-mini-chart" aria-label="Discard rate chart">
                    <svg viewBox="0 0 180 74" role="img" aria-hidden="true">
                      <path d="M6 62H174" stroke="#d4e2ff" strokeWidth="2" strokeLinecap="round" />
                      <rect x="16" y="36" width="18" height="26" rx="4" fill="#bdd7ff" />
                      <rect x="48" y="28" width="18" height="34" rx="4" fill="#8fbaff" />
                      <rect x="80" y="18" width="18" height="44" rx="4" fill="#5f96ef" />
                      <rect x="112" y="10" width="18" height="52" rx="4" fill="#2f6ed3" />
                      <rect x="144" y="4" width="18" height="58" rx="4" fill="#1447af" />
                      <path d="M22 34C45 24 59 31 84 18C106 7 124 13 154 4" fill="none" stroke="#3ad5dd" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="stat-callout-number">88%</div>
                <div className="stat-callout-label">discarded within 7 days</div>
              </div>

              {cards.map((c, i) => (
                <div key={i} className="pain-card reveal">
                  <div className="pain-icon"><AnimatedIcon src={c.icon} className="pain-icon-lottie" size={19} title={`${c.title} icon`} /></div>
                  <div className="pain-card-title">{c.title}</div>
                  <div className="pain-card-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
