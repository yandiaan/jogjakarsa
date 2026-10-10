import { copy, type Language } from '../../lib/travel/locale';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ensureGsapPlugins, gsap, prefersReducedMotion } from '../../lib/gsap';

export default function TravelHero({ language = 'id' }: { language?: Language }) {
 const t = (text: string) => copy(language, text);
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
    <p className="jk-kicker hero-enter">{t("Travel agency lokal / Daerah Istimewa Yogyakarta")}</p>
    <h1 className="hero-enter">{t("Perjalanan custom.")}<br /><em>{t("Khusus di Jogja.")}</em></h1>
    <p className="jk-hero-description hero-enter">{t("Kami sedang membangun layanan itinerary, aktivitas lokal, serta mobil dan pengemudi dalam satu rencana. Untuk pasangan, keluarga, dan kelompok teman yang ingin trip sesuai kebutuhan.")}</p>
    <div className="jk-actions hero-enter">
     <a className="jk-button" href="#rencana">{t("Coba planner perjalanan")}<ArrowUpRight size={17} aria-hidden="true" /></a>
     <a className="jk-text-link" href="#cara-kerja">{t("Lihat cara kerjanya")}<ArrowDown size={15} aria-hidden="true" /></a>
    </div>
   </div>
   <div className="jk-shell">
    <div className="hero-film">
     <video ref={video} muted loop playsInline preload="metadata" poster="/prambanan-sunrise.webp" onPause={() => setPlaying(false)} onPlay={() => setPlaying(true)} aria-label={t("Pemandangan Jogja dari udara")}>
      <source src="/video/drone-footage.webm" type="video/webm" />
     </video>
     <div className="hero-film-shade" />
     <div className="hero-film-caption"><span>{t("Lebih dekat dengan Jogja.")}</span><p>{t("Pelan-pelan. Dengan rasa ingin tahu.")}</p></div>
     <div className="hero-route-card" aria-label={language === 'en' ? 'Sample itinerary' : 'Contoh perjalanan'}>
      <div className="route-card-top"><span>{t("Perjalananmu berikutnya")}</span><ArrowUpRight size={17} aria-hidden="true" /></div>
      <h2>{t("Sehari, banyak cerita.")}</h2>
      <div className="hero-route-stops"><span>{t("Taman Sari")}</span><i /><span>{t("Kotagede")}</span><i /><span>{t("Kuliner malam")}</span></div>
      <p>{t("Contoh rute · Budaya & kuliner")}</p>
     </div>
     <button type="button" className="film-control" onClick={toggleVideo} aria-label={t(playing ? 'Jeda video Jogja' : 'Putar video Jogja')}>{playing ? <Pause size={16} /> : <Play size={16} />}</button>
    </div>
    <div className="hero-scope"><span>{t("Fokus di Daerah Istimewa Yogyakarta")}</span><span>{t("Demo planner 1–3 hari")}<b>·</b>{t("Booking belum aktif")}</span></div>
   </div>
  </section>
 );
}
