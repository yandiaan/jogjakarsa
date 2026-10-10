import { useRef, useEffect } from 'react';
import { gsap, prefersReducedMotion } from '../../lib/gsap';

export default function BudayaHeroSection() {
 const container = useRef<HTMLElement>(null);
 useEffect(() => {
  if (!container.current || prefersReducedMotion()) return;
  const context = gsap.context(() => {
   gsap.from('.culture-enter', { y: 30, opacity: 0, duration: 1.1, stagger: 0.15, ease: 'power3.out' });
   gsap.from('.culture-photo', { scale: 1.06, duration: 2, ease: 'power2.out' });
  }, container);
  return () => context.revert();
 }, []);
 return (
  <section ref={container} className="relative min-h-[85vh] flex items-center overflow-hidden pt-32 pb-20">
   <div className="absolute inset-0"><img src="/prambanan-sunrise.webp" alt="Candi Prambanan saat matahari terbit" className="culture-photo w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-night" /></div>
   <div className="jk-shell relative z-10">
    <p className="jk-kicker culture-enter">Panduan perjalanan / budaya Jogja</p>
    <h1 className="culture-enter text-5xl md:text-7xl lg:text-8xl leading-[1.05] mt-6">Kenali budayanya.<br /><em>Rencanakan perjalananmu.</em></h1>
    <p className="culture-enter culture-context">Dari arsitektur hingga seni pertunjukan, temukan cerita di balik pengalaman lokal. Panduan ini membantu kamu memilih minat untuk trip custom bersama Jogjakarsa.</p>
    <div className="culture-enter flex flex-wrap items-center gap-6 mt-8"><a className="jk-button" href="#pilar-budaya">Baca panduan budaya</a><a className="jk-text-link" href="/#rencana">Coba planner trip Jogja</a></div>
   </div>
  </section>
 );
}
