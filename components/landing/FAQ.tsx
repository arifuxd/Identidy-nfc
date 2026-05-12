import { useState } from 'react';
const faqs = [
  { q: "What's included in the one-time price?", a: "Your Identidy card, custom design, profile URL, analytics, lead capture inbox, and Save Contact support." },
  { q: "Are there monthly or yearly fees?", a: "No. One-time payment only." },
  { q: "How does NFC sharing work?", a: "Tap the card and your profile opens instantly on phone browser." },
  { q: "How fast can I set up?", a: "Most users finish setup in under 2 minutes." },
];
export default function FAQ() { const [open, setOpen] = useState<number | null>(null); return <section id="faq" className="faq-section"><div className="container"><div className="section-header reveal"><h2 className="section-headline">Frequently Asked Questions</h2><p className="section-sub">Everything you need to know about Identidy cards.</p></div><div className="faq-list">{faqs.map((f,i)=><div key={i} className={`faq-item${open===i?' open':''}`}><button className="faq-question" onClick={()=>setOpen(open===i?null:i)}>{f.q}<span className="faq-toggle">+</span></button><div className="faq-answer"><p>{f.a}</p></div></div>)}</div></div></section>; }
