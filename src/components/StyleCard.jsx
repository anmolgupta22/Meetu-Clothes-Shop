import { ArrowUpRight } from 'lucide-react';
import Photo from './Photo';
import { categories } from '../data/collection';

export default function StyleCard({ item, onOpen, sizes = '(max-width: 760px) 45vw, 30vw' }) {
  const category = categories.find(c => c.slug === item.category);
  return <button className="style-card" onClick={() => onOpen(item.id)} aria-label={`View ${item.title}`}>
    <div className="style-image"><Photo src={item.image} thumbnail={item.thumbnail} imageWidth={item.imageWidth} sizes={sizes} fallback={item.fallback} alt={`${category.name} style inspiration`} /><span className="image-badge">{category.name}</span><span className="image-open"><ArrowUpRight size={21} /></span></div>
    <div className="style-caption"><div><h3>{item.title}</h3><p>{item.subtitle}</p></div><ArrowUpRight size={18} /></div>
  </button>;
}
