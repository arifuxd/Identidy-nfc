import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const links = [
    { href: '#features', label: 'Features' },
    { href: '#how', label: 'How It Works' },
    { href: '#themes', label: 'Themes' },
    { href: '#pricing', label: 'Pricing' },
  ];

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <Image src="/identidy-logo.svg" alt="Identidy" width={122} height={28} style={{ width: '122px', height: 'auto' }} priority />
          </a>
          <ul className="nav-links">{links.map((l) => (<li key={l.href}><a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a></li>))}</ul>
          <div className="nav-actions">
            <a href="#pricing" className="btn-primary-sm">Get Started <span className="arrow">→</span></a>
            <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}><span /><span /><span /></button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} role="dialog" aria-modal="true">
        <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close">×</button>
        {links.map((l) => (<a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>))}
        <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ color: '#3ad5dd' }}>Get Started →</a>
      </div>
    </>
  );
}
