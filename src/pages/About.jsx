import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Shirt, Sparkles } from 'lucide-react';
import { ShopFeature, InstagramBanner } from './Home';

export default function About() {
  return <><div className="page-intro container"><p className="eyebrow">MEET MEETU CLOTHES</p><h1>Your neighbourhood.<br />Your <span className="serif">style.</span></h1><p>A local clothing shop in Bithoor, Kanpur.<br />A place to explore, discover and dress your everyday.</p></div><ShopFeature full />
    <section className="about-promises container"><div><Shirt size={25} strokeWidth={1.5} /><h3>A little of everything</h3><p>Suits, girls’ wear, shirts, jeans, trousers and everyday essentials. Explore clothing for different needs in one shop.</p></div><div><Sparkles size={25} strokeWidth={1.5} /><h3>Find it in person</h3><p>Clothing feels different when you can see it up close. Visit to explore the colours, textures and available sizes.</p></div><div><MapPin size={25} strokeWidth={1.5} /><h3>Close to home</h3><p>You’ll find us at Maharshi Balmiki Nagar, Subedar Nagar, in Bithoor, Kanpur. Call us for directions and opening hours.</p></div></section>
    <section className="about-invite container"><p className="eyebrow">THERE’S MORE WAITING IN STORE</p><h2>Make a little room<br />for a new <span className="serif">favourite.</span></h2><Link className="button button-dark" to="/visit">Visit Meetu Clothes <ArrowUpRight size={17} /></Link></section><InstagramBanner /></>;
}
