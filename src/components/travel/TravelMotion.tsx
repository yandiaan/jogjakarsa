import { useEffect } from 'react';
import { ensureGsapPlugins, gsap, prefersReducedMotion } from '../../lib/gsap';
export default function TravelMotion() {
 useEffect(() => {
  if (prefersReducedMotion()) return;
  ensureGsapPlugins();
  const context = gsap.context(() => {});
  const animated = new Set<HTMLElement>();
  const scan = () => gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(section => {
   if (animated.has(section)) return;
   // React's effect signals an actual committed render, after Astro's hydrate event.
   if (section.closest('astro-island') && !section.closest('[data-travel-ready]')) return;
   animated.add(section);
   context.add(() => {
    gsap.from(section, {
     y: 24, opacity: 0, duration: 1, ease: 'power2.out',
     scrollTrigger: { trigger: section, start: 'top 93%', once: true },
    });
   });
  });
  window.addEventListener('jogjakarsa:ready', scan);
  scan();
  return () => { window.removeEventListener('jogjakarsa:ready', scan); context.revert(); };
 }, []);
 return null;
}
