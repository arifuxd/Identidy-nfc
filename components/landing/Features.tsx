import { BarChart3, Download, Globe, Inbox, Palette } from 'lucide-react';

const iconProps = { size: 18, strokeWidth: 2 };

export default function Features() {
  return (
    <section id="features" className="features-section">
      <div className="container">
        <div className="features-header reveal"><div><div className="eyebrow-label" style={{ textAlign: 'left' }}>WHAT YOU GET</div><h2 className="section-headline" style={{ textAlign: 'left', maxWidth: 560 }}>Everything your Identidy profile needs.</h2></div></div>
        <div className="features-grid stagger">
          <div className="feat-col-8 feat-card feat-card-blue reveal"><div className="feat-icon feat-icon-white"><Globe {...iconProps} /></div><div className="url-bar"><div className="url-favicon" /><span className="url-text"><span className="url-static">identidy.net/</span><span className="url-typing">yourname</span></span></div><h3 className="feat-title feat-title-white" style={{ fontSize: 22 }}>Your URL. Your Identidy.</h3><p className="feat-desc feat-desc-white">A unique shareable link that stays up to date all the time.</p></div>
          <div className="feat-col-4 feat-card reveal"><div className="feat-icon"><Inbox {...iconProps} /></div><h3 className="feat-title">Lead Capture Inbox</h3><p className="feat-desc">Every visitor who submits info appears instantly.</p></div>
          <div className="feat-col-4 feat-card feat-card-teal reveal"><div className="feat-icon"><Download {...iconProps} /></div><h3 className="feat-title">Save Contact</h3><p className="feat-desc">One tap lets people save your contact directly.</p></div>
          <div className="feat-col-4 feat-card reveal"><div className="feat-icon"><BarChart3 {...iconProps} /></div><h3 className="feat-title">Profile Analytics</h3><p className="feat-desc">Real-time profile views and lead trends.</p></div>
          <div className="feat-col-4 feat-card reveal"><div className="feat-icon"><Palette {...iconProps} /></div><h3 className="feat-title">Variety of Themes</h3><p className="feat-desc">Styles for designers, developers, gamers, corporate, and creators. Color options are also available.</p></div>
        </div>
      </div>
    </section>
  );
}
