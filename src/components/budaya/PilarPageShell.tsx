import { useRef, useEffect } from 'react';
import { gsap, ensureGsapPlugins } from '../../lib/gsap';
import type { SubSection } from '../../data/pilar1';
import { ArrowLeft } from 'lucide-react';

interface PilarPageProps {
  pilarNumber: number;
  titleLine1: string;
  titleLine2: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  sections: SubSection[];
  prevPilar?: { href: string; label: string };
  nextPilar?: { href: string; label: string };
}

export default function PilarPageShell({
  pilarNumber,
  titleLine1,
  titleLine2,
  description,
  heroImage,
  heroAlt,
  sections,
  prevPilar,
  nextPilar,
}: PilarPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroClass = `pilar-hero-el`;

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.from(`.${heroClass}`, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Pin the entire sub-section wrapper (header + cards) together.
      // The trigger is .sub-section-wrapper, and we only translate the .horizontal-track.
      const wrappers = gsap.utils.toArray<HTMLElement>('.sub-section-wrapper');

      wrappers.forEach((wrapper) => {
        const track = wrapper.querySelector('.horizontal-track') as HTMLElement;
        if (!track) return;

        const totalScrollWidth = track.scrollWidth - wrapper.clientWidth;
        if (totalScrollWidth <= 0) return;

        gsap.to(track, {
          x: -totalScrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 80px',
            end: () => `+=${totalScrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-ink text-mist min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/70 to-ink z-10" />
          <img
            src={heroImage}
            alt={heroAlt}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-6xl pb-16 pt-32">
          <a
            href="/budaya"
            className={`${heroClass} inline-flex items-center gap-2 text-sun/80 hover:text-sun text-sm font-medium tracking-wider mb-8 transition-colors group`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            KEMBALI KE 7 PILAR
          </a>

          <div className={`${heroClass} inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sun/10 border border-sun/20 text-sun text-sm font-medium tracking-wider mb-6`}>
            <span className="w-2 h-2 rounded-full bg-sun animate-pulse" />
            PILAR {pilarNumber}
          </div>

          <h1 className={`${heroClass} font-serif text-5xl md:text-7xl font-bold text-mist mb-4 leading-[1.1]`}>
            {titleLine1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sun via-amber-200 to-sun italic">
              {titleLine2}
            </span>
          </h1>

          <p className={`${heroClass} text-xl md:text-2xl text-mist/70 max-w-3xl font-sans leading-relaxed`}>
            {description}
          </p>
        </div>
      </section>

      {/* ─── Sub-sections ─── */}
      {sections.map((section, sIdx) => (
        <SubSectionBlock key={section.id} section={section} />
      ))}

      {/* ─── Bottom Navigation ─── */}
      <section className="py-20 border-t border-mist/10">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevPilar ? (
            <a
              href={prevPilar.href}
              className="font-sans text-mist/60 hover:text-sun transition-colors text-sm tracking-wider"
            >
              ← {prevPilar.label}
            </a>
          ) : (
            <a
              href="/budaya"
              className="font-sans text-mist/60 hover:text-sun transition-colors text-sm tracking-wider"
            >
              ← Kembali ke 7 Pilar
            </a>
          )}

          <a
            href="/budaya"
            className="font-serif text-xl md:text-2xl text-mist hover:text-sun transition-colors"
          >
            7 Pilar Kebudayaan
          </a>

          {nextPilar ? (
            <a
              href={nextPilar.href}
              className="font-sans text-mist/60 hover:text-sun transition-colors text-sm tracking-wider"
            >
              {nextPilar.label} →
            </a>
          ) : (
            <span className="font-sans text-mist/30 text-sm tracking-wider">
              Segera Hadir →
            </span>
          )}
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  SubSectionBlock — shared across all Pilar pages                          */
/* ────────────────────────────────────────────────────────────────────────── */

function SubSectionBlock({ section }: { section: SubSection }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || typeof window === 'undefined') return;
    ensureGsapPlugins();

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current!.querySelectorAll('.sub-header-el'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Spacer before pinned area — so the header entrance animation still fires */}
      <div className="pt-24" />

      {/* 
        Everything inside .sub-section-wrapper gets pinned together:
        the header (subtitle, title, quote) + the horizontal card track.
      */}
      <div className="sub-section-wrapper overflow-hidden" id={`hs-${section.id}`}>
        {/* Sub header — now INSIDE the pinned wrapper */}
        <div className="container mx-auto px-6 max-w-6xl pb-8">
          <div className="flex items-center gap-4 mb-4 sub-header-el">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sun/10 border border-sun/30 text-sun text-sm font-bold font-sans">
              {section.number}
            </span>
            <p className="text-sun/80 text-sm font-medium tracking-[0.2em] uppercase">
              {section.subtitle}
            </p>
          </div>

          <h2 className="sub-header-el font-serif text-3xl md:text-5xl font-bold text-mist mb-6">
            {section.title}
          </h2>

          <blockquote className="sub-header-el border-l-4 border-sun/40 pl-6 text-mist/70 text-lg md:text-xl italic max-w-4xl leading-relaxed">
            "{section.quote}"
          </blockquote>
        </div>

        {/* Horizontal card track */}
        <div className="horizontal-track flex gap-8 px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] py-6 w-max">
          {section.points.map((point, pIdx) => (
            <div
              key={pIdx}
              className="point-card group flex-shrink-0 w-[88vw] sm:w-[75vw] md:w-[65vw] lg:w-[52vw] h-[380px] rounded-2xl border border-mist/10 bg-gradient-to-br from-mist/[0.04] to-transparent backdrop-blur-sm hover:border-sun/40 transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row"
            >
              {/* Image */}
              <div className="relative w-full md:w-[45%] h-48 md:h-full overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink/60 z-10 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent z-10 md:hidden" />
                <img
                  src={point.image}
                  alt={point.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 z-20 inline-flex items-center justify-center w-10 h-10 rounded-full bg-ink/60 backdrop-blur-md border border-mist/20 text-sun text-sm font-bold font-sans">
                  {String(pIdx + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Text */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-4 right-6 text-[6rem] font-serif font-bold text-mist/[0.03] leading-none select-none pointer-events-none">
                  {String(pIdx + 1).padStart(2, '0')}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-sun" />
                    <span className="text-sun/70 text-xs font-medium tracking-[0.15em] uppercase">
                      Point {pIdx + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-mist mb-4 group-hover:text-sun transition-colors duration-300 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-mist/65 font-sans leading-relaxed text-sm md:text-[0.95rem] line-clamp-5">
                    {point.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-mist/10 group-hover:bg-sun/20 transition-colors" />
                  <span className="text-mist/30 text-xs font-mono group-hover:text-sun/50 transition-colors">
                    {section.number}.{pIdx + 1}
                  </span>
                </div>

                <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-sun/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 pb-6">
          {section.points.map((_, i) => (
            <div key={i} className="w-8 h-1 rounded-full bg-mist/15" />
          ))}
        </div>
      </div>
    </div>
  );
}
