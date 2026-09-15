import { useState, useEffect } from 'react';

export function useLoadedImage(url: string | null) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>('loading');

  useEffect(() => {
    if (!url) {
      setImage(null);
      setStatus('failed');
      return;
    }

    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;

    img.onload = () => {
      setImage(img);
      setStatus('loaded');
    };

    img.onerror = () => {
      setImage(null);
      setStatus('failed');
    };
  }, [url]);

  return [image, status] as const;
}
