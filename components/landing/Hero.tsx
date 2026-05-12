import { useEffect, useMemo, useState } from 'react';

const faces = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
];

type CheckState = 'idle' | 'checking' | 'available' | 'taken';

export default function Hero() {
  const [slug, setSlug] = useState('');
  const [state, setState] = useState<CheckState>('idle');
  const [message, setMessage] = useState('Type a username to check availability');

  const normalized = useMemo(() => slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''), [slug]);

  useEffect(() => {
    if (!normalized) {
      setState('idle');
      setMessage('Type a username to check availability');
      return;
    }

    setState('checking');
    setMessage('Checking availability...');

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/slug/check?slug=${encodeURIComponent(normalized)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data?.available) {
          setState('available');
          setMessage(`@${data.normalized} is available`);
        } else {
          setState('taken');
          setMessage(`@${data?.normalized || normalized} is not available`);
        }
      } catch {
        setState('taken');
        setMessage('Could not verify right now. Please try again.');
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [normalized]);

  return (
    <section id="hero" className="hero">
      <div className="hero-inner">
        <div className="hero-left">
          <div className="eyebrow-pill"><div className="eyebrow-dot" />NFC-Powered Digital Identity</div>
          <h1 className="hero-headline">Your Identidy.<br /><span className="underline-teal">One Tap.<svg viewBox="0 0 180 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2 6 C30 2, 60 9, 90 5 C120 1, 150 8, 178 5" stroke="#3ad5dd" strokeWidth="3" strokeLinecap="round" fill="none" /></svg></span><br />Everywhere.</h1>
          <p className="hero-sub">Share your professional profile instantly.<br />No app needed. No paper wasted.</p>
          <div className="claim-wrap">
            <div className="claim-input-shell">
              <span className="claim-prefix">identidy.net/</span>
              <input className="claim-input" value={slug} onChange={(e)=>setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,''))} placeholder="yourname" />
              <button className="claim-btn claim-btn-sm" type="button">Claim it</button>
            </div>
            <div className={`claim-status ${state === 'available' ? 'ok' : state === 'taken' ? 'no' : ''}`}>{message}</div>
          </div>
          <div className="hero-ctas"><a href="#pricing" className="btn-hero-primary">Get Your Identidy Card</a><a href="#how" className="btn-hero-secondary">See How It Works →</a></div>
          <div className="social-proof"><div className="avatars real-faces">{faces.map((src,i)=><img key={i} src={src} alt="Identidy user" className="avatar-face" loading="lazy" />)}</div><span className="social-proof-text">Trusted by 500++ professionals</span></div>
        </div>
        <div className="hero-right">
          <div className="phone-cluster">
            <div className="blob blob-1" /><div className="blob blob-2" />
            <div className="floating-badge"><div className="badge-dot" /><span className="badge-text">247 profile views today</span></div>
            <div className="phone-frame phone-main"><div className="phone-notch" /><div className="phone-profile-header"><div className="phone-avatar">AJ</div><div className="phone-name">Alex Johnson</div><div className="phone-title">Product Designer</div></div><div className="phone-links"><div className="phone-link-btn">Portfolio</div><div className="phone-link-btn">LinkedIn</div><div className="phone-link-btn">Email Me</div></div><div className="phone-connect-btn">Save Contact</div></div>
            <div className="phone-frame phone-secondary"><div className="phone-notch" style={{ width: 50, height: 14, borderRadius: '0 0 8px 8px' }} /><div className="mini-analytics"><div className="mini-label">Views this week</div><div className="mini-stat">1,247</div></div></div>
            <div className="phone-frame phone-card" style={{ background: 'white' }}><div className="phone-notch" style={{ width: 50, height: 14, borderRadius: '0 0 8px 8px' }} /><div style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><div style={{ fontSize: 9, fontWeight: 600, color: '#666', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Scan Me</div><div style={{ fontSize: 8, fontWeight: 500, color: '#1447af', letterSpacing: '0.05em' }}>identidy.net/alexj</div></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
