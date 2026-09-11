import { useEffect } from 'react';

function upsertMeta(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Sets the document title and meta description (plus Open Graph equivalents)
 * for the current page. Call once per route component:
 *
 *   usePageMeta({
 *     title: 'Services | Sreedevigeotech',
 *     description: '…',
 *   });
 */
export default function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
  }, [title, description]);
}
