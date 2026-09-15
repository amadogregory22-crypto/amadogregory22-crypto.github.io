export async function svgDataUrlToPng(svgDataUrl: string, width: number, height: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("No 2d context"));
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = svgDataUrl;
  });
}

/**
 * Converts any local or remote image URL to a self-contained Base64 Data URL (PNG).
 * This ensures Outlook, Word Engine and offline email clients display images without missing links.
 */
export async function imageUrlToBase64Png(url: string, maxWidth?: number, maxHeight?: number): Promise<string> {
  if (!url || typeof url !== 'string') return '';
  if (url.startsWith('data:image/')) return url;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        let w = img.naturalWidth || img.width || 100;
        let h = img.naturalHeight || img.height || 100;

        if (maxWidth && w > maxWidth) {
          h = Math.round((h * maxWidth) / w);
          w = maxWidth;
        }
        if (maxHeight && h > maxHeight) {
          w = Math.round((w * maxHeight) / h);
          h = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, w);
        canvas.height = Math.max(1, h);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(url);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        // Fallback to fetch if canvas tainted
        fetchBlobAsDataUrl(url).then(resolve).catch(() => resolve(url));
      }
    };

    img.onerror = () => {
      fetchBlobAsDataUrl(url).then(resolve).catch(() => resolve(url));
    };

    img.src = url;
  });
}

async function fetchBlobAsDataUrl(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    if (!res.ok) return url;
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          resolve(url);
        }
      };
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch {
    return url;
  }
}

