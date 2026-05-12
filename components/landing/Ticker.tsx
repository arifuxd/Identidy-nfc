const items = [
  '500++ Active Professionals',
  '12,000+ Profile Views',
  'One-Time Payment, No Subscriptions',
  'Variety of Themes',
  'Zero Paper. Zero Waste.',
  'Free Custom Design',
  'Save Contact in Seconds',
];

export default function Ticker() {
  const all = [...items, ...items];
  return <div className="ticker-wrap" id="ticker"><div className="ticker-track">{all.map((item, i) => <span key={i} className="ticker-item">{item}<span className="ticker-sep">■</span></span>)}</div></div>;
}
