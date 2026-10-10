import Flower from '../components/Flower';
import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, filterStyles } from '../data/collection';
import StyleCard from '../components/StyleCard';
import Gallery from '../components/Gallery';
import NotFound from './NotFound';
import { shop } from '../data/shop';

export default function Collection() {
  const { slug } = useParams();
  const [params, setParams] = useSearchParams();
  const [selected, setSelected] = useState(null);
  const category = categories.find(c => c.slug === slug);
  const query = params.get('q') || '';
  const items = filterStyles(slug || 'all', query);
  if (slug && !category) return <NotFound />;
  function setQuery(value) {
    const next = new URLSearchParams(params);
    if (value) next.set('q', value); else next.delete('q');
    setParams(next, { replace: true, preventScrollReset: true });
    setSelected(null);
  }
  return <div className="collection-page container"><div className="page-topline"><Link to="/" className="breadcrumb">Home</Link><span>/</span><Link to="/collection" className="breadcrumb">Collection</Link>{category && <><span>/</span><span>{category.name}</span></>}</div>
    <div className="collection-heading"><div><p className="eyebrow">{category ? category.eyebrow : 'YOUR WARDROBE, YOUR WAY'}</p><h1>{category ? category.name : <>Find your kind of <span className="serif">style.</span></>}</h1><p>{category ? category.description : 'From everyday essentials to a little something special. Explore what we’re all about, then find your favourites in store.'}</p></div><div className="collection-heading-art" aria-hidden="true"><Flower /><span>THE MEETU EDIT</span></div></div>
    <div className="collection-tools"><div className="search-wrap"><Search size={18} aria-hidden="true" /><input type="search" aria-label="Search clothing styles" placeholder="Search suits, shirts, jeans…" value={query} onChange={event => setQuery(event.target.value)} />{query && <button className="clear-search" aria-label="Clear search" onClick={() => setQuery('')}><X size={15} /></button>}</div><span className="browse-hint"><SlidersHorizontal size={16} /> Browse by category</span></div>
    <nav className="category-filters" aria-label="Clothing categories"><Link className={!slug ? 'active' : ''} to="/collection" aria-current={!slug ? 'page' : undefined}>All styles</Link>{categories.map(c => <Link key={c.slug} to={`/collection/${c.slug}`} className={slug === c.slug ? 'active' : ''} aria-current={slug === c.slug ? 'page' : undefined}>{c.shortName}</Link>)}</nav>
    <div className="results-meta" role="status" aria-live="polite"><span>{items.length} {items.length === 1 ? 'style' : 'styles'} to explore</span><span>STYLE INSPIRATION · DISCOVER IN STORE</span></div>
    {items.length ? <div className="styles-grid collection-results">{items.map(item => <StyleCard key={item.id} item={item} onOpen={setSelected} />)}</div> : <div className="empty-state"><Search size={32} /><h2>No styles found just yet.</h2><p>Try a different search or browse all clothing categories.</p><Link className="button button-dark" to="/collection">Reset filters <ArrowLeft size={16} /></Link></div>}
    <div className="collection-disclaimer"><span aria-hidden="true"><Flower /></span><div><h3>A little inspiration. A lot more in store.</h3><p>These images and illustrations show style ideas, rather than live inventory. Call or visit to discover current clothing, sizes and designs.</p></div><a className="text-link" href={shop.phoneHref}>Ask the shop <ArrowUpRight size={17} /></a></div>
    {selected && <Gallery items={items} selectedId={selected} onSelect={setSelected} onClose={() => setSelected(null)} />}
  </div>;
}
