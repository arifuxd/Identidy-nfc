import Image from 'next/image';

const rows = [
  { bad: '✗ Outdated immediately', good: '✓ Always up-to-date' },
  { bad: '✗ $50-200 per reprint', good: '✓ One-time cost, no reprints' },
  { bad: '✗ Discarded within days', good: '✓ Permanent digital presence' },
  { bad: '✗ No analytics', good: '✓ Full view & lead tracking' },
  { bad: '✗ Environmental cost', good: '✓ Carbon-neutral sharing' },
];

export default function Eco() {
  return (
    <section id="eco" className="eco-section eco-soft eco-short">
      <div className="eco-container">
        <div className="section-header reveal" style={{ marginBottom: 20 }}>
          <div className="eyebrow-label">THE DIFFERENCE</div>
          <h2 className="section-headline" style={{ color: '#102a6b' }}>Paper card vs digital card</h2>
        </div>

        <div className="difference-grid reveal diff-color-grid">
          <div className="difference-head diff-red">Paper Business Card</div>
          <div className="difference-head good diff-green-logo"><Image src="/identidy-logo.svg" alt="Identidy" width={110} height={24} style={{ width: '110px', height: 'auto' }} /></div>
          {rows.map((r, i) => (
            <div key={`row-${i}`} className="difference-row">
              <div className="difference-cell bad diff-red-cell">{r.bad}</div>
              <div className="difference-cell good diff-green-cell">{r.good}</div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <div className="tree-counter"><span role="img" aria-label="tree">🌳</span><span className="tree-counter-num">8,524</span><span>trees cut today for business cards</span></div>
        </div>
      </div>
    </section>
  );
}
