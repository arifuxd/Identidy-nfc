import { useEffect, useMemo, useRef, useState } from 'react';

type ThemeItem = { title: string; src: string };

const items: ThemeItem[] = [
  { title: 'Designer', src: '/style-previews/style-1.png' },
  { title: 'Developer', src: '/style-previews/style-2.png' },
  { title: 'Gamer', src: '/style-previews/style-3.png' },
  { title: 'Football', src: '/style-previews/style-4.png' },
  { title: 'Corporate', src: '/style-previews/style-5.png' },
  { title: 'Cinematographer', src: '/style-previews/style-6.png' },
  { title: 'Creator', src: '/style-previews/style-7.png' },
  { title: 'Minimal', src: '/style-previews/style-8.png' },
];

const POSITIONS = [-2, -1, 0, 1, 2] as const;

const posClass = (pos: number) => {
  if (pos === -2) return 'pos-m2';
  if (pos === -1) return 'pos-m1';
  if (pos === 0) return 'pos-0';
  if (pos === 1) return 'pos-p1';
  return 'pos-p2';
};

export default function ThemesShowcase() {
  const [active, setActive] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const timerRef = useRef<number | null>(null);
  const dragStartX = useRef<number | null>(null);
  const viewportRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const imageRefs = useRef<Record<number, HTMLImageElement | null>>({});
  const [panByIndex, setPanByIndex] = useState<Record<number, number>>({});

  const visible = useMemo(() => {
    return POSITIONS.map((pos) => {
      const idx = (active + pos + items.length) % items.length;
      return { idx, pos, item: items[idx] };
    });
  }, [active]);

  const measurePan = () => {
    const next: Record<number, number> = {};
    visible.forEach(({ idx }) => {
      const vp = viewportRefs.current[idx];
      const img = imageRefs.current[idx];
      if (!vp || !img) return;
      const overflow = Math.max(0, img.scrollHeight - vp.clientHeight);
      next[idx] = overflow;
    });
    setPanByIndex(next);
  };

  useEffect(() => {
    const t = window.setTimeout(measurePan, 40);
    const onResize = () => measurePan();
    window.addEventListener('resize', onResize);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [visible]);

  const startAuto = () => {
    timerRef.current = window.setInterval(() => {
      setActive((v) => (v + 1) % items.length);
    }, 3000);
  };

  const resetAuto = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    startAuto();
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const moveBy = (delta: number) => {
    setActive((v) => (v + delta + items.length * 20) % items.length);
    resetAuto();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartX.current = e.clientX;
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    setDragX(e.clientX - dragStartX.current);
  };

  const onPointerUp = () => {
    if (dragStartX.current === null) return;
    const dx = dragX;
    dragStartX.current = null;

    const stepWidth = 90;
    const steps = Math.floor(Math.abs(dx) / stepWidth);

    setDragging(false);
    setDragX(0);

    if (steps < 1) return;
    if (dx < 0) moveBy(steps);
    else moveBy(-steps);
  };

  return (
    <section id="themes" className="themes-section">
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow-label">STYLE SHOWCASE</div>
          <h2 className="section-headline">A variety of themes for everyone.</h2>
          <p className="section-sub">Designers, developers, gamers, football fans, corporate teams and cinematographers.</p>
        </div>

        <div className="theme-stage reveal">
          <button className="theme-nav-btn left" onClick={() => moveBy(-1)} aria-label="Previous theme">←</button>

          <div
            className={`theme-window${dragging ? ' dragging' : ''}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {visible
              .slice()
              .sort((a, b) => a.pos - b.pos)
              .map(({ item, idx, pos }) => (
                <article
                  key={idx}
                  className={`theme-pos-card ${posClass(pos)}`}
                  style={{ ['--drag-x' as never]: `${dragX}px`, ['--pan-distance' as never]: `${panByIndex[idx] ?? 0}px` } as React.CSSProperties}
                >
                  <div className="theme-vscroll-viewport" ref={(el) => { viewportRefs.current[idx] = el; }}>
                    <img
                      src={item.src}
                      alt={item.title}
                      className="theme-vscroll-image"
                      loading="lazy"
                      draggable={false}
                      ref={(el) => { imageRefs.current[idx] = el; }}
                      onLoad={measurePan}
                    />
                  </div>
                  <div className="theme-card-title">{item.title}</div>
                </article>
              ))}
          </div>

          <button className="theme-nav-btn right" onClick={() => moveBy(1)} aria-label="Next theme">→</button>
        </div>
      </div>
    </section>
  );
}


