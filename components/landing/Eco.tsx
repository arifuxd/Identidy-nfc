const rows = [
  { bad: '✗ Outdated immediately', good: '✓ Always up-to-date' },
  { bad: '✗ $50-200 per reprint', good: '✓ One-time cost, no reprints' },
  { bad: '✗ Discarded within days', good: '✓ Permanent digital presence' },
  { bad: '✗ No analytics', good: '✓ Full view & lead tracking' },
  { bad: '✗ Environmental cost', good: '✓ Carbon-neutral sharing' },
];

export default function Eco() {
  return (
    <section id="eco" className="eco-section eco-soft">
      <div className="eco-container">
        <div className="section-header reveal" style={{ marginBottom: 30 }}>
          <div className="eyebrow-label">THE DIFFERENCE</div>
          <h2 className="section-headline" style={{ color: '#102a6b' }}>Paper card vs Identidy digital card</h2>
        </div>

        <div className="difference-grid reveal">
          <div className="difference-head">Paper Business Card</div>
          <div className="difference-head good">Identidy Digital Card</div>
          {rows.map((r, i) => (
            <div key={`row-${i}`} className="difference-row">
              <div className="difference-cell bad">{r.bad}</div>
              <div className="difference-cell good">{r.good}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 34 }}>
          <div className="tree-counter"><span role="img" aria-label="tree">🌳</span><span className="tree-counter-num">8,524</span><span>trees cut today for business cards</span></div>
        </div>
      </div>
    </section>
  );
}
