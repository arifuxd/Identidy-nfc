import { BarChart3, RefreshCcw, Trash2, UserRoundX } from 'lucide-react';

const cards = [
  { title: 'Straight to the Bin', desc: '88% of cards are discarded within a week.', icon: Trash2 },
  { title: 'Reprint. Regret. Repeat.', desc: 'Every update means another costly reprint cycle.', icon: RefreshCcw },
  { title: 'Forgotten Connections', desc: 'No lead capture means opportunities get lost.', icon: UserRoundX },
  { title: 'No Digital Trail', desc: 'No view data and no follow-up insights.', icon: BarChart3 },
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
                <div className="pain-icon"><Trash2 size={16} strokeWidth={2} /></div>
                <div className="stat-callout-number">88%</div>
                <div className="stat-callout-label">discarded within 7 days</div>
              </div>

              {cards.map((c, i) => (
                <div key={i} className="pain-card reveal">
                  <div className="pain-icon"><c.icon size={16} strokeWidth={2} /></div>
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
