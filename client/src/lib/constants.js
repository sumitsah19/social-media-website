
const RAW_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';
export const ORIGIN_URL = RAW_URL.replace(/\/api\/?$/i, '').replace(/\/+$/, '');
export const API_URL = `${ORIGIN_URL}/api`;
export const MEDIA_URL = ORIGIN_URL;

export const getStrapiMedia = (url) => {
  if (!url) return null;
  return url.startsWith('http') ? url : `${MEDIA_URL}${url}`;
};


export const CATEGORIES = [
  { name: 'Home',      slug: '/',          path: '/' },
  { name: 'Bollywood', slug: 'bollywood',  path: '/bollywood' },
  { name: 'Hollywood', slug: 'hollywood',  path: '/hollywood' },
  { name: 'OTT',       slug: 'ott',        path: '/ott' },
  { name: 'TV',        slug: 'tv',         path: '/tv' },
  { name: 'Music',     slug: 'music',      path: '/music' },
  { name: 'Photos',    slug: 'photos',     path: '/photos' },
  { name: 'Videos',    slug: 'videos',     path: '/videos' },
  { name: 'Reviews',   slug: 'reviews',    path: '/reviews' },
];

// -------------------------------
// Pagination / counts
// -------------------------------
export const ITEMS_PER_PAGE = 12;
export const FEATURED_COUNT = 6;
export const RELATED_ARTICLES_COUNT = 4;
export const POPULAR_COUNT = 5;
export const TRENDING_COUNT = 10;

// -------------------------------
// Reading time (words per minute)
// -------------------------------
export const WORDS_PER_MINUTE = 200;

// -------------------------------
// Social share URLs
// -------------------------------
export const SOCIAL_SHARE = {
  facebook: (url) =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  twitter: (url, text = '') =>
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  whatsapp: (url, text = '') =>
    `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`.trim())}`,
  linkedin: (url) =>
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
};

// -------------------------------
// Date formats
// -------------------------------
export const DATE_FORMATS = {
  full: 'MMMM DD, YYYY',
  short: 'MMM DD, YYYY',
  relative: 'relative',
};
