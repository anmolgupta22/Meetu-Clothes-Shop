import { useEffect, useState } from 'react';

export default function Photo({ src, fallback, alt, thumbnail, imageWidth = 1200, sizes = '100vw', className = '', eager = false, ...props }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  return <img {...props} className={className} src={!src || failed ? fallback : src} alt={alt}
    srcSet={src && thumbnail && !failed ? `${thumbnail} 480w, ${src} ${imageWidth}w` : undefined} sizes={thumbnail && !failed ? sizes : undefined}
    loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async"
    onError={() => { if (src && !failed) setFailed(true); }} />;
}
