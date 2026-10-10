import { useState } from 'react';
import { ArrowUpRight, Clock3, Copy, MapPin, Navigation, Phone, Check } from 'lucide-react';
import Instagram from '../components/InstagramIcon';
import { shop } from '../data/shop';

export default function Visit() {
  const [copyStatus, setCopyStatus] = useState('');
  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(`${shop.name}, ${shop.address.join(', ')}, ${shop.locality}. Location: 26.601928, 80.272251`);
      setCopyStatus('Address copied');
    } catch { setCopyStatus('Copy unavailable. Select the address below to copy it.'); }
  }
  return <div className="visit-page container"><div className="page-intro"><p className="eyebrow">GOOD STYLE IS CLOSER THAN YOU THINK</p><h1>Come say <span className="serif">hello.</span></h1><p>See the clothes. Feel the fabrics. Find something you love.<br />We look forward to welcoming you to Meetu Clothes.</p></div>
    <div className="visit-layout"><div className="contact-card"><span className="location-pill"><span className="status-dot" /> BITHOOR, KANPUR</span><h2>Your neighbourhood<br />clothing destination.</h2><div className="contact-detail"><MapPin size={21} /><div><h3>Find the shop</h3><address>{shop.name}<br />{shop.address[0]}<br />{shop.address[1]}<br />{shop.locality}</address><button className="text-link copy-address" onClick={copyAddress}>{copyStatus === 'Address copied' ? <Check size={14} /> : <Copy size={14} />} Copy address</button><span className="copy-status" role="status">{copyStatus}</span></div></div><div className="contact-detail"><Phone size={19} /><div><h3>Call us</h3><a className="contact-phone" href={shop.phoneHref}>{shop.phone} <ArrowUpRight size={15} /></a><p>Ask about sizes, styles and availability.</p></div></div><div className="contact-detail"><Clock3 size={20} /><div><h3>Planning a visit?</h3><p>Please call to confirm the shop’s opening hours.</p></div></div><a className="button button-dark" href={shop.directions} target="_blank" rel="noopener noreferrer"><Navigation size={16} /> Get directions <ArrowUpRight size={17} /></a></div>
      <div className="map-card"><div className="map-header"><MapPin size={16} /><strong>A little closer to your next favourite.</strong></div><iframe title="Meetu Clothes location in Bithoor, Kanpur" src="https://maps.google.com/maps?q=26.601928,80.272251&z=16&output=embed" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /><div className="map-footer"><div><span className="status-dot" /> MEETU CLOTHES</div><a href={shop.map} target="_blank" rel="noopener noreferrer">Open Google Maps <ArrowUpRight size={14} /></a></div><p className="map-fallback">If the map doesn’t load, use “Get directions” to open our location.</p></div>
    </div>
    <section className="contact-instagram"><div className="instagram-icon"><Instagram size={29} /></div><div><p className="eyebrow">LET’S STAY IN TOUCH</p><h2>A little style in your feed.</h2><p>Explore our Instagram, or message us with your clothing questions.</p></div><a className="button button-outline" href={shop.instagram} target="_blank" rel="noopener noreferrer">{shop.instagramHandle} <ArrowUpRight size={17} /></a></section>
  </div>;
}
