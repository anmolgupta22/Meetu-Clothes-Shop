import Flower from '../components/Flower';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, MapPin, Shirt } from 'lucide-react';
import Instagram from '../components/InstagramIcon';
import Hero from '../components/Hero';
import Photo from '../components/Photo';
import StyleCard from '../components/StyleCard';
import Gallery from '../components/Gallery';
import { categories, styles } from '../data/collection';
import { shop } from '../data/shop';

export function ValuesStrip() {
  return <div className="values-strip"><span>Everyday favourites</span><span aria-hidden="true"><Flower /></span><span>Something for everyone</span><span aria-hidden="true"><Flower /></span><span>Discover in store</span><span aria-hidden="true"><Flower /></span><span>Your neighbourhood. Your style.</span></div>;
}

export function InstagramBanner() {
  return <section className="instagram-banner container"><div><p className="eyebrow">A LITTLE MORE MEETU</p><h2>Keep your feed <span className="serif">in style.</span></h2><p>A closer look at your local clothing shop.</p></div><a className="button button-cream" href={shop.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={17} /> Follow {shop.instagramHandle} <ArrowUpRight size={16} /></a><span className="banner-flower" aria-hidden="true"><Flower /></span></section>;
}

export function ShopFeature({ full = false }) {
  return <section className={`shop-feature container ${full ? 'shop-feature-full' : ''}`}><div className="shop-art"><span className="shop-art-top">ROOTED IN BITHOOR</span><span className="shop-flower" aria-hidden="true"><Flower /></span><h3>Style feels better<br />close to <span className="serif">home.</span></h3><span className="shop-art-bottom">MEETU CLOTHES / KANPUR</span><span className="shop-art-circle" /></div><div className="shop-copy"><p className="eyebrow"><span className="tiny-rule" /> MEET YOUR NEIGHBOURHOOD SHOP</p><h2>Good clothes.<br />A personal touch.</h2><p>Welcome to Meetu Clothes, a local stop for ready-made clothing in Bithoor, Kanpur. From women’s suits and girls’ wear to shirts, denim and daily essentials, discover your everyday wardrobe in one place.</p><p>See the colours. Feel the fabrics. Find your fit.<br />The full collection is waiting for you in store.</p><div className="shop-benefits"><span><Shirt size={16} /> Explore clothing in person</span><span><MapPin size={16} /> Right here in Bithoor</span></div><Link to={full ? '/visit' : '/our-shop'} className="text-link">{full ? 'Come say hello' : 'Get to know our shop'} <ArrowUpRight size={17} /></Link></div></section>;
}

export default function Home() {
  const [selected, setSelected] = useState(null);
  const featured = styles.slice(0, 3);
  return <>
    <Hero /><ValuesStrip />
    <section className="category-section container"><div className="section-heading"><div><p className="eyebrow">SOMETHING FOR EVERY KIND OF DAY</p><h2>Find your <span className="serif">everyday.</span></h2></div><Link to="/collection" className="text-link">View all collections <ArrowUpRight size={17} /></Link></div>
      <div className="category-grid">{categories.map((category, index) => <Link className="category-card" to={`/collection/${category.slug}`} key={category.slug}><div className="category-image"><Photo src={category.image} thumbnail={category.thumbnail} imageWidth={category.imageWidth} sizes="(max-width: 480px) 44vw, (max-width: 900px) 29vw, 16vw" fallback={category.fallback} alt={`${category.name} — illustrative style`} /><span className="category-number">0{index + 1}</span><span className="category-arrow"><ArrowUpRight size={18} /></span></div><h3>{category.name}</h3><span>Explore the edit <ArrowRight size={12} /></span></Link>)}</div>
      <p className="inspiration-note">A little style inspiration. Visit the shop for current designs, sizes and availability.</p>
    </section>
    <section className="featured-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">THE EVERYDAY EDIT</p><h2>Looks to <span className="serif">love.</span></h2></div><p>Easy pieces. Your own personality.<br />Take a closer look at a little inspiration.</p></div><div className="styles-grid">{featured.map(item => <StyleCard key={item.id} item={item} onOpen={setSelected} sizes="(max-width: 480px) 90vw, 30vw" />)}</div><div className="featured-bottom"><span className="inspiration-note">Illustrative styles · Available designs may vary in store.</span><Link className="text-link" to="/collection">Find your inspiration <ArrowUpRight size={16} /></Link></div></div></section>
    <ShopFeature />
    <section className="visit-teaser container"><div><p className="eyebrow">LET’S MEET IN PERSON</p><h2>Your next favourite<br />is just a <span className="serif">visit away.</span></h2></div><div><p><MapPin size={18} /> Maharshi Balmiki Nagar, Subedar Nagar<br /><span>Bithoor, Kanpur · Uttar Pradesh 209217</span></p><Link className="button button-dark" to="/visit">Plan your visit <ArrowUpRight size={17} /></Link></div></section>
    <InstagramBanner />
    {selected && <Gallery items={featured} selectedId={selected} onSelect={setSelected} onClose={() => setSelected(null)} />}
  </>;
}
