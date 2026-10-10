import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ensureGsapPlugins, gsap, prefersReducedMotion } from '../../lib/gsap';

export default function TravelHero() {
 const scope = useRef<HTMLElement>(null);
 const video = useRef<HTMLVideoElement>(null);
 const [playing, setPlaying] = useState(false);
 useEffect(() => {
  if (prefersReducedMotion()) return;
  let mounted = true;
  video.current?.play().then(() => { if (mounted) setPlaying(true); }).catch(() => undefined);
  ensureGsapPlugins();
  const context = gsap.context(() => {
   gsap.from('.hero-enter', { y: 30, opacity: 0, duration: 1.2, stagger: 0.14, ease: 'power3.out' });
   gsap.fromTo('.hero-film', { scale: 0.92, borderRadius: 32 }, {
    scale: 1, borderRadius: 8, ease: 'none',
    scrollTrigger: { trigger: '.hero-film', start: 'top 90%', end: 'top 15%', scrub: 1 },
   });
  }, scope);
  return () => { mounted = false; context.revert(); };
 }, []);
 const toggleVideo = async () => {
  if (!video.current) return;
  if (video.current.paused) {
   try { await video.current.play(); setPlaying(true); } catch { setPlaying(false); }
  } else { video.current.pause(); setPlaying(false); }
 };
 return (
  <section id="top" className="jk-hero" ref={scope}>
   <div className="jk-shell jk-hero-intro">
    <p className="jk-kicker hero-enter">Perjalanan personal, berakar di Jogja</p>
    <h1 className="hero-enter">Jogja punya cerita.<br /><em>Temukan bagianmu.</em></h1>
    <p className="jk-hero-description hero-enter">Budaya, rasa, dan tempat yang ingin kamu kenal. Kami bantu menyusun semuanya menjadi perjalanan yang terasa milikmu.</p>
    <div className="jk-actions hero-enter">
     <a className="jk-button" href="#rencana">Rancang perjalanan <ArrowUpRight size={17} aria-hidden="true" /></a>
     <a className="jk-text-link" href="#cara-kerja">Lihat cara kerjanya <ArrowDown size={15} aria-hidden="true" /></a>
    </div>
   </div>
   <div className="jk-shell">
    <div className="hero-film">
     <video ref={video} muted loop playsInline preload="metadata" poster="/prambanan-sunrise.webp" onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} aria-label="Pemandangan Jogja dari udara">
      <source src="/video/drone-footage.webm" type="video/webm" />
     </video>
     <div className="hero-film-shade" />
     <div className="hero-film-caption"><span>Lebih dekat dengan Jogja.</span><p>Pelan-pelan. Dengan rasa ingin tahu.</p></div>
     <div className="hero-route-card" aria-label="Contoh perjalanan">
      <div className="route-card-top"><span>Perjalananmu berikutnya</span><ArrowUpRight size={17} aria-hidden="true" /></div>
      <h2>Sehari, banyak cerita.</h2>
      <div className="hero-route-stops"><span>Taman Sari</span><i /><span>Kotagede</span><i /><span>Kuliner malam</span></div>
      <p>Contoh rute · Budaya & kuliner</p>
     </div>
     <button type="button" className="film-control" onClick={toggleVideo} aria-label={playing ? 'Jeda video Jogja' : 'Putar video Jogja'}>{playing ? <Pause size={16} /> : <Play size={16} />}</button>
    </div>
    <div className="hero-scope"><span>Fokus di Daerah Istimewa Yogyakarta</span><span>Rute personal <b>·</b> Estimasi terbuka <b>·</b> Ditinjau manusia</span></div>
   </div>
  </section>
 );
}
