import { useEffect } from 'react';
import { ensureGsapPlugins, gsap, prefersReducedMotion } from '../../lib/gsap';
export default function TravelMotion() {
 useEffect(() => {
  if (prefersReducedMotion()) return;
  ensureGsapPlugins();
  const context = gsap.context(() => {
   gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(section => {
    gsap.from(section, {
     y: 24, opacity: 0, duration: 1, ease: 'power2.out',
     scrollTrigger: { trigger: section, start: 'top 93%', once: true },
    });
   });
  });
  return () => context.revert();
 }, []);
 return null;
}
