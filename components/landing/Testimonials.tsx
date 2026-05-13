import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const items = [
  { quote: 'Within two weeks of switching to Identidy, I had 47 contact requests I would have lost before.', name: 'Arif Hossain', title: 'Business Development Manager, Dhaka', image: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { quote: 'Pulled out my Identidy card at a conference and everyone asked where I got it.', name: 'Nusrat Jahan', title: 'Founder, Bloom Studio, Dhaka', image: 'https://randomuser.me/api/portraits/women/52.jpg' },
  { quote: 'Setup took less than two minutes and I started getting real leads quickly.', name: 'Tanvir Ahmed', title: 'Sales Director, Chattogram', image: 'https://randomuser.me/api/portraits/men/54.jpg' },
  { quote: 'No more paper clutter. Just tap, connect, done.', name: 'Farhana Rahman', title: 'Independent Consultant, Sylhet', image: 'https://randomuser.me/api/portraits/women/31.jpg' },
];

const STEP_MS = 3200;
const TRANSITION_MS = 520;
const GAP = 20;

export default function Testimonials() {
  const total = items.length;
  const [start, setStart] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [animating, setAnimating] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const onResize = () => setCardsPerView(window.innerWidth <= 900 ? 1 : 3);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const visible = useMemo(
    () => Array.from({ length: cardsPerView }, (_, i) => items[(start + i) % total]),
    [start, cardsPerView, total]
  );

  const nextCard = items[(start + cardsPerView) % total];
  const prevCard = items[(start - 1 + total) % total];
  const trackCards = direction === 1 ? [...visible, nextCard] : [prevCard, ...visible];

  const move = useCallback((nextDirection: 1 | -1) => {
    if (animating) return;
    setDirection(nextDirection);
    setAnimating(true);
  }, [animating]);

  useEffect(() => {
    const timer = window.setInterval(() => move(1), STEP_MS);
    return () => window.clearInterval(timer);
  }, [move]);

  useEffect(() => {
    if (!animating) return;
    const timer = window.setTimeout(() => {
      setStart((v) => (v + direction + total) % total);
      setAnimating(false);
    }, TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [animating, direction, total]);

  const stepExpr = `calc((100% - ${(cardsPerView - 1) * GAP}px) / ${cardsPerView} + ${GAP}px)`;
  const baseTransform = direction === 1 ? 'translateX(0)' : `translateX(calc(-1 * ${stepExpr}))`;
  const animateTransform = direction === 1 ? `translateX(calc(-1 * ${stepExpr}))` : 'translateX(0)';

  return (
    <section id="reviews" className="testimonials-section">
      <div className="container">
        <div className="section-header reveal" style={{ textAlign: 'left', marginBottom: 24 }}>
          <div className="eyebrow-label" style={{ textAlign: 'left' }}>WHAT PROFESSIONALS SAY</div>
          <h2 className="section-headline" style={{ textAlign: 'left' }}>The card that never goes to waste.</h2>
        </div>

        <div className="testimonials-carousel-controls reveal">
          <button className="carousel-btn" type="button" aria-label="Previous testimonial" onClick={() => move(-1)}>
            <ChevronLeft size={18} />
          </button>
          <button className="carousel-btn" type="button" aria-label="Next testimonial" onClick={() => move(1)}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="testimonials-carousel-stage">
          <div
            className="testimonials-step-track"
            style={{
              transform: animating ? animateTransform : baseTransform,
              transition: animating ? `transform ${TRANSITION_MS}ms ease` : 'none',
            }}
          >
            {trackCards.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="testimonial-card testimonial-equal"
                style={{ flex: `0 0 calc((100% - ${(cardsPerView - 1) * GAP}px) / ${cardsPerView})` }}
              >
                <div className="stars">★★★★★</div>
                <p className="testimonial-text">{t.quote}</p>
                <div className="testimonial-author">
                  <img className="author-avatar-image" src={t.image} alt={t.name} loading="lazy" />
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-title">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
