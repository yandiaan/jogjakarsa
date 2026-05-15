import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function BudayaHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
      });
      
      gsap.to('.hero-bg', {
        scale: 1.05,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0 hero-bg">
        <div className="absolute inset-0 bg-ink/70 z-10" />
        <img 
          src="../../public/prambanan-sunrise.webp" 
          alt="Jogjakarta Culture" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-5xl" ref={textRef}>
        <div className="text-center flex flex-col items-center">
          <div className="hero-element inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sun/10 border border-sun/20 text-sun text-sm font-medium tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-sun animate-pulse" />
            WARISAN NUSANTARA
          </div>
          
          <h1 className="hero-element font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-mist mb-6 leading-[1.1]">
            Napas Kehidupan <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sun via-amber-200 to-sun italic">
              Budaya Jawa
            </span>
          </h1>
          
          <p className="hero-element text-lg md:text-2xl text-mist/80 max-w-3xl font-sans leading-relaxed mb-10">
            Menyelami 7 unsur kebudayaan universal yang mengakar kuat di tanah Yogyakarta, 
            membentuk jati diri dan kearifan lokal yang tak lekang oleh waktu.
          </p>

          <button className="hero-element group relative px-8 py-4 bg-sun text-ink font-bold rounded-full overflow-hidden transition-transform hover:scale-105">
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative flex items-center gap-2">
              Jelajahi Pilar Budaya
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      
      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-ink to-transparent z-10" />
    </section>
  );
}
