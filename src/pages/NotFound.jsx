import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return <section className="not-found container"><p className="eyebrow">404 / A LITTLE DETOUR</p><h1>Let’s find your<br /><span className="serif">way back.</span></h1><p>This page isn’t here. Your next favourite might be in our collection.</p><Link className="button button-dark" to="/collection">Explore the collection <ArrowUpRight size={17} /></Link></section>;
}
