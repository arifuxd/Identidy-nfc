import { PenLine, ShoppingBag, Zap } from 'lucide-react';

const steps = [
  { title: 'Order Your Card', desc: 'Choose your card style and place your one-time order in minutes.', Icon: ShoppingBag },
  { title: 'Build Your Profile', desc: 'Add links and contact details. Your profile goes live instantly.', Icon: PenLine },
  { title: 'Tap. Share. Connect.', desc: 'One tap opens your profile and lets people save contact fast.', Icon: Zap },
];

export default function HowItWorks() {
  return (
    <section id="how" className="how-section">
      <div className="container">
        <div className="section-header reveal"><div className="eyebrow-label">HOW IT WORKS</div><h2 className="section-headline">Three simple steps to go live.</h2><p className="section-sub">No app needed. No tech skills required.</p></div>
        <div className="steps-row">{steps.map((s,i)=><div key={i} style={{display:'contents'}}><div className="step-card reveal"><div className="step-icon-wrap"><s.Icon size={22} strokeWidth={2} /></div><div className="step-title">{s.title}</div><div className="step-desc">{s.desc}</div></div>{i<2 && <div className="steps-connector" aria-hidden="true" />}</div>)}</div>
      </div>
    </section>
  );
}
