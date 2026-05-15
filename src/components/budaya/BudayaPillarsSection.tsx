import { useRef, useEffect, useState } from 'react';
import { gsap, ensureGsapPlugins } from '../../lib/gsap';
import { tujuhPilar } from '../../data/budaya';
import { ProgressiveBlur } from '../ui/progressive-blur';
import { motion } from 'motion/react';

if (typeof window !== 'undefined') {
  ensureGsapPlugins();
}

export default function BudayaPillarsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = gsap.utils.toArray('.pillar-card');
    
    const ctx = gsap.context(() => {
      cards.forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i % 2 === 0 ? 0 : 0.2
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-ink relative z-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-mist mb-6">
            7 Pilar Kebudayaan
          </h2>
          <div className="w-24 h-1 bg-sun mx-auto rounded-full opacity-50 mb-6" />
          <p className="text-mist/70 font-sans text-lg max-w-2xl mx-auto">
            Mengenal lebih dekat tujuh unsur kebudayaan universal yang hidup dan berkembang
            di tengah masyarakat Yogyakarta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tujuhPilar.map((pillar, index) => {
            const isLast = index === 6;
            const gridClass = isLast ? "md:col-span-2 lg:col-span-3 lg:w-2/3 lg:mx-auto" : "";

            return (
              <PillarCard
                key={pillar.id}
                pillar={pillar}
                gridClass={gridClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Individual Pillar Card with ProgressiveBlur ── */

const pilarLinks: Record<string, string> = {
  pilar1: '/budaya/pilar1',
  pilar2: '/budaya/pilar2',
};

function PillarCard({ pillar, gridClass }: { pillar: any; gridClass: string }) {
  const [isHover, setIsHover] = useState(false);
  const href = pilarLinks[pillar.id];
  const Tag = href ? 'a' : 'div';
  const linkProps = href ? { href } : {};

  return (
    <Tag
      {...linkProps}
      className={`pillar-card group relative rounded-2xl overflow-hidden bg-ink/50 border border-mist/10 hover:border-sun/50 transition-colors duration-500 flex flex-col min-h-[360px] cursor-pointer no-underline ${gridClass}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={pillar.image}
          alt={pillar.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-80 grayscale group-hover:grayscale-0"
        />
      </div>

      {/* Progressive blur overlay — visible on hover */}
      <ProgressiveBlur
        className="pointer-events-none absolute bottom-0 left-0 h-[80%] w-full z-[5]"
        blurIntensity={0.6}
        animate={isHover ? 'visible' : 'hidden'}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Static dark gradient — always visible for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent z-[6] transition-opacity duration-500 group-hover:opacity-60" />

      {/* Text content */}
      <div className="relative z-10 p-8 flex flex-col h-full justify-end">
        <motion.div
          animate={isHover ? 'hover' : 'rest'}
          variants={{
            rest: { y: 0 },
            hover: { y: -8 },
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <h3 className="font-serif text-2xl font-bold text-mist mb-3 group-hover:text-sun transition-colors duration-300">
            {pillar.title}
          </h3>
          <p className="text-mist/70 font-sans leading-relaxed group-hover:text-mist/90 transition-colors duration-300">
            {pillar.description}
          </p>
        </motion.div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-sun transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-20" />
    </Tag>
  );
}
