import Flower from './Flower';
import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Photo from './Photo';
import { categories } from '../data/collection';
import { shop } from '../data/shop';

export default function Gallery({ items, selectedId, onSelect, onClose }) {
  const dialog = useRef();
  const opener = useRef(document.activeElement);
  const item = items.find(i => i.id === selectedId);
  const current = items.findIndex(i => i.id === selectedId);
  const go = direction => onSelect(items[(current + direction + items.length) % items.length].id);
  useLayoutEffect(() => {
    if (!item) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (opener.current?.isConnected) opener.current.focus({ preventScroll: true });
    };
  }, [Boolean(item)]);
  if (!item) return null;
  const category = categories.find(c => c.slug === item.category);
  return <dialog ref={dialog} className="gallery" aria-labelledby="gallery-title" onCancel={event => { event.preventDefault(); onClose(); }}
    onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={event => { if (items.length > 1 && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); go(event.key === 'ArrowLeft' ? -1 : 1); } }}>
    <div className="gallery-inner"><button className="icon-button gallery-close" onClick={onClose} aria-label="Close gallery" autoFocus><X size={20} /></button>
      <div className="gallery-image"><Photo src={item.image} fallback={item.fallback} alt={`${item.title} — illustrative clothing style`} eager /><span className="image-badge">STYLE INSPIRATION</span></div>
      <div className="gallery-copy"><p className="eyebrow">{category.name}</p><h2 id="gallery-title">{item.title}</h2><p>{item.subtitle}</p><div className="gallery-notice"><SparkleMark /><p>This is an illustrative style, rather than a confirmed item in stock. Visit or call us to explore current designs, fabrics and sizes.</p></div><a className="button button-dark" href={shop.phoneHref}><Phone size={16} /> Ask the shop about {category.shortName.toLowerCase()}</a><Link className="text-link" to="/visit" onClick={onClose}>Plan your visit <ArrowUpRight size={15} /></Link>
        <div className="gallery-controls"><span>{String(current + 1).padStart(2, '0')} <span>/ {String(items.length).padStart(2, '0')}</span></span><div><button className="icon-button" aria-label="Previous style" disabled={items.length < 2} onClick={() => go(-1)}><ChevronLeft size={18} /></button><button className="icon-button" aria-label="Next style" disabled={items.length < 2} onClick={() => go(1)}><ChevronRight size={18} /></button></div></div>
      </div>
    </div>
  </dialog>;
}

function SparkleMark() { return <span aria-hidden="true"><Flower /></span>; }
