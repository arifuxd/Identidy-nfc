export default function CTABanner() {
  return (
    <section id="cta" className="cta-banner">
      <div className="cta-circle-1" aria-hidden="true" /><div className="cta-circle-2" aria-hidden="true" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}><div className="cta-eyebrow"><span className="accent">■</span> READY TO BEGIN?</div><h2 className="cta-headline">Your Identidy lives here.</h2><p className="cta-sub">Join 500+ professionals replacing paper cards with digital Identidy.</p><div className="cta-buttons"><a href="#pricing" className="btn-cta-white">Request Access</a><a href="#pricing" className="btn-cta-ghost">View Pricing</a></div><div className="cta-note">One-time payment. Free custom design. No recurring fees.</div></div>
    </section>
  );
}
