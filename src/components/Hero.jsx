import Flower from './Flower';
import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Photo from './Photo';
import { ArrowUpRight, MapPin, Move, Sparkles } from 'lucide-react';

const HeroScene = lazy(() => import('./HeroScene'));

class SceneBoundary extends Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.error ? null : this.props.children; }
}

export default function Hero() {
  const ref = useRef();
  const [inView, setInView] = useState(true);
  const [enableScene, setEnableScene] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); }, []);

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnableScene(!media.matches);
    const timer = setTimeout(update, 700);
    media.addEventListener('change', update);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(ref.current);
    const visibility = () => setInView(!document.hidden && ref.current.getBoundingClientRect().bottom > 0);
    document.addEventListener('visibilitychange', visibility);
    return () => { clearTimeout(timer); media.removeEventListener('change', update); observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  return <section className="hero container">
    <div className="hero-copy">
      <div className="location-pill"><span className="status-dot" /> YOUR LOCAL STYLE DESTINATION</div>
      <h1>A little style.<br />A lot of <span className="serif">you.</span><span className="hero-star" aria-hidden="true"><Flower /></span></h1>
      <p>Everyday favourites. A fresh point of view.<br className="desktop-break" /> Discover clothes that feel like you, right here in Bithoor.</p>
      <div className="hero-actions"><Link className="button button-dark" to="/collection">Explore the collection <ArrowUpRight size={17} /></Link><Link className="hero-secondary" to="/visit">Find our shop <ArrowUpRight size={15} /></Link></div>
      <div className="hero-location"><div className="icon-circle"><MapPin size={18} strokeWidth={1.5} /></div><div><strong>Good style, close to home.</strong><span>Bithoor, Kanpur, Uttar Pradesh</span></div></div>
    </div>
    <div className="hero-visual" ref={ref}>
      <div className={`hero-still ${ready && enableScene && !failed ? 'scene-ready' : ''}`}>
        <div className="still-panel still-shirt"><Photo src="/images/style-shirts.jpg" fallback="/images/shirts.svg" alt="" eager /></div>
        <div className="still-panel still-model"><Photo src="/images/hero-photo.jpg" fallback="/images/hero-editorial.svg" alt="" eager /></div>
        <div className="still-panel still-denim"><Photo src="/images/style-denim.jpg" fallback="/images/denim.svg" alt="" eager /></div>
      </div>
      <div className="hero-canvas" aria-hidden="true">
        {enableScene && !failed && <SceneBoundary onFailure={onFailure}><Suspense fallback={null}><HeroScene active={inView} onReady={onReady} onFailure={onFailure} /></Suspense></SceneBoundary>}
      </div>
      <span className="sr-only">Fashion inspiration showing an outfit, a shirt and denim in a layered display.</span>
      <div className="hero-sticker"><Sparkles size={17} /><span>Made for your<br /><strong>everyday.</strong></span></div>
      <span className="hero-visual-top">THE MEETU EDIT / EVERYDAY STYLE</span>
      <span className="hero-visual-bottom">{ready && enableScene && !failed ? <><Move size={12} /> MOVE TO EXPLORE</> : 'A LITTLE WINDOW INTO YOUR STYLE'}</span>
      <span className="hero-art-note">Illustrative styles</span>
    </div>
  </section>;
}
