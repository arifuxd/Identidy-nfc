import { useMemo, useState } from 'react';

const items = [
  { quote: 'Within two weeks of switching to Identidy, I had 47 contact requests I would have lost before.', name: 'Marcus R.', title: 'Business Development Manager', image: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { quote: 'Pulled out my Identidy card at a conference and everyone asked where I got it.', name: 'Priya S.', title: 'Founder, Bloom Studio', image: 'https://randomuser.me/api/portraits/women/52.jpg' },
  { quote: 'Setup took less than two minutes and I started getting real leads quickly.', name: 'James L.', title: 'Sales Director', image: 'https://randomuser.me/api/portraits/men/54.jpg' },
  { quote: 'No more paper clutter. Just tap, connect, done.', name: 'Aisha M.', title: 'Independent Consultant', image: 'https://randomuser.me/api/portraits/women/31.jpg' },
];

export default function Testimonials() {
  const [start, setStart] = useState(0);
  const visible = useMemo(() => [0, 1, 2].map((n) => items[(start + n) % items.length]), [start]);
  return (
    <section id="reviews" className="testimonials-section"><div className="container"><div className="section-header" style={{ textAlign: 'left', marginBottom: 24 }}><div className="eyebrow-label" style={{ textAlign: 'left' }}>WHAT PROFESSIONALS SAY</div><h2 className="section-headline" style={{ textAlign: 'left' }}>The card that never goes to waste.</h2></div><div className="testimonials-carousel-controls reveal"><button className="carousel-btn" onClick={() => setStart((s) => (s - 1 + items.length) % items.length)}>←</button><button className="carousel-btn" onClick={() => setStart((s) => (s + 1) % items.length)}>→</button></div><div className="testimonials-carousel">{visible.map((t, i) => (<div key={`${t.name}-${i}`} className="testimonial-card reveal testimonial-equal"><div className="stars">5/5</div><p className="testimonial-text">{t.quote}</p><div className="testimonial-author"><img className="author-avatar-image" src={t.image} alt={t.name} loading="lazy" /><div><div className="author-name">{t.name}</div><div className="author-title">{t.title}</div></div></div></div>))}</div></div></section>
  );
}
