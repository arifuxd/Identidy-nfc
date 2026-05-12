export default function LeadCapture() {
  const values = ['No third-party form tools', 'Instant lead capture', 'Save contact in one tap', 'Never miss a connection again'];

  return (
    <section id="leads" className="leads-section">
      <div className="container">
        <div className="leads-inner leads-simple-layout">
          <div className="leads-phone-wrap reveal"><div className="leads-phone"><div className="leads-phone-notch" /><div className="leads-phone-header"><div className="leads-phone-avatar">AJ</div><div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Alex Johnson</div><div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Product Designer</div></div><div className="leads-form"><div className="leads-form-title">Connect with Alex</div><div className="leads-input">Your Name</div><div className="leads-input">Phone Number</div><div className="leads-input">Email Address</div><div className="leads-submit">Save Contact</div></div></div></div>
          <div className="reveal"><div className="eyebrow-label" style={{ textAlign: 'left' }}>LEAD CAPTURE</div><h2 className="section-headline" style={{ textAlign: 'left' }}>Turn every tap into a real connection.</h2><p className="section-sub" style={{ textAlign: 'left', margin: 0 }}>Built-in lead capture on every profile for end users.</p><div className="leads-values" style={{ marginTop: 22, gridTemplateColumns: '1fr' }}>{values.map((v,i)=><div key={i} className="leads-value-item"><span className="leads-check">✓</span>{v}</div>)}</div></div>
        </div>
      </div>
    </section>
  );
}

