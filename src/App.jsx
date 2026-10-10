import Flower from './components/Flower';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowUpRight, MapPin, Menu, Phone, X } from 'lucide-react';
import Instagram from './components/InstagramIcon';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Visit from './pages/Visit';
import NotFound from './pages/NotFound';
import { categories } from './data/collection';
import { businessSchema, shop } from './data/shop';

function Brand() {
  return <Link className="brand" to="/" aria-label="Meetu Clothes home"><span>meetu<span className="brand-dot">.</span></span><small>CLOTHES & EVERYDAY STYLE</small></Link>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef();
  const nav = useRef();
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = event => {
      if (event.key === 'Escape') { setOpen(false); toggle.current.focus(); }
      if (event.key === 'Tab') {
        const controls = [toggle.current, ...nav.current.querySelectorAll('a')];
        const first = controls[0], last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth > 760) setOpen(false); };
    document.addEventListener('keydown', onKey); window.addEventListener('resize', onResize);
    return () => { document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open]);
  return <><div className="announcement"><span>A little style. A lot of you.</span><span className="announcement-location"><MapPin size={11} /> Bithoor, Kanpur</span></div><header className="header"><div className="header-inner container"><Brand /><nav className="desktop-nav" aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/collection">Collection</NavLink><NavLink to="/our-shop">Our shop</NavLink><NavLink to="/visit">Visit & contact</NavLink></nav><a className="header-instagram" href={shop.instagram} target="_blank" rel="noopener noreferrer" aria-label="Meetu Clothes on Instagram"><Instagram size={18} /></a><Link className="header-visit" to="/visit">Visit the shop <ArrowUpRight size={15} /></Link><button ref={toggle} className="menu-toggle icon-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button></div>
    {open && <nav ref={nav} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" onClick={event => { if (event.target.closest("a")) setOpen(false); }}><NavLink to="/" end>Home</NavLink><NavLink to="/collection">Collection <ArrowUpRight size={18} /></NavLink><NavLink to="/our-shop">Our shop</NavLink><NavLink to="/visit">Visit & contact</NavLink><a href={shop.phoneHref}><Phone size={16} /> {shop.phone}</a></nav>}</header></>;
}

function Footer() {
  return <><footer className="footer container"><div className="footer-top"><div><Brand /><p>Good clothes. Better days.<br />Your neighbourhood wardrobe destination.</p></div><div><h3>Explore</h3><Link to="/collection">Our collection</Link><Link to="/our-shop">Our shop</Link><Link to="/visit">Visit & contact</Link></div><div><h3>Come say hello</h3><p>{shop.address[0]}<br />{shop.address[1]}<br />Bithoor, Kanpur</p><a href={shop.phoneHref}>{shop.phone} <ArrowUpRight size={12} /></a></div><div><h3>Stay in the loop</h3><a className="footer-social" href={shop.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={16} /> {shop.instagramHandle} <ArrowUpRight size={12} /></a><span className="footer-flower" aria-hidden="true"><Flower /></span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Meetu Clothes. All rights reserved.</span><span>Discover online. Find your favourites in store.</span><Link to="/visit">Made for Bithoor <MapPin size={11} /></Link></div></footer><div className="mobile-contact"><a href={shop.phoneHref}><Phone size={16} /> Call the shop</a><a href={shop.directions} target="_blank" rel="noopener noreferrer"><MapPin size={16} /> Get directions</a></div></>;
}

function PageEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const category = categories.find(c => `/collection/${c.slug}` === pathname);
    const titles = { '/': 'Everyday style in Bithoor, Kanpur', '/collection': 'Explore our clothing collection', '/our-shop': 'Your neighbourhood clothing shop', '/visit': 'Visit & contact in Bithoor, Kanpur' };
    const title = category?.name || titles[pathname] || 'Page not found';
    document.title = `${title} — Meetu Clothes`;
    const description = category?.description || 'Discover ready-made suits, girls’ wear, shirts, jeans and essentials at Meetu Clothes in Bithoor, Kanpur. Call +91 81760 91991 or visit our shop.';
    document.querySelector('meta[name="description"]').setAttribute('content', description);
    document.querySelector('meta[property="og:title"]').setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]').setAttribute('content', description);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  return <><a className="skip-link" href="#main-content">Skip to content</a><PageEffects /><Header /><main id="main-content"><Routes><Route path="/" element={<Home />} /><Route path="/collection" element={<Collection />} /><Route path="/collection/:slug" element={<Collection />} /><Route path="/our-shop" element={<About />} /><Route path="/visit" element={<Visit />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /><script type="application/ld+json">{JSON.stringify(businessSchema)}</script></>;
}
