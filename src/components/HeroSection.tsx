import { ArrowDown } from 'lucide-react';
import { useRef } from 'react';

import { ensureGsapPlugins, gsap } from '../lib/gsap';
import { useGsapContext } from './hooks/useGsapContext';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export default function HeroSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const prefersReducedMotion = usePrefersReducedMotion();

	useGsapContext(
		() => {
			ensureGsapPlugins();

			if (prefersReducedMotion) {
				gsap.set('[data-hero-reveal]', { autoAlpha: 1, y: 0, scale: 1 });
				gsap.set('[data-hero-background]', { clearProps: 'all' });
				return undefined;
			}

			gsap.set('[data-hero-background]', { scale: 1.08, autoAlpha: 0.72 });
			gsap.set('[data-hero-reveal]', { autoAlpha: 0, y: 36 });
			gsap.set('[data-hero-meta]', { autoAlpha: 0, y: 24 });
			gsap.set('[data-scroll-indicator]', { autoAlpha: 0, y: 18 });

			const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
			intro
				.to('[data-hero-background]', {
					scale: 1,
					autoAlpha: 1,
					duration: 1.6,
				}, 0)
				.to('[data-hero-reveal]', {
					autoAlpha: 1,
					y: 0,
					duration: 1,
					stagger: 0.12,
				}, 0.12)
				.to('[data-hero-meta]', { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.38)
				.to('[data-scroll-indicator]', { autoAlpha: 1, y: 0, duration: 0.75 }, 0.65);

			gsap.to('[data-scroll-indicator]', {
				y: 10,
				repeat: -1,
				yoyo: true,
				duration: 1.2,
				ease: 'sine.inOut',
			});

			const scrollTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top top',
					end: 'bottom top',
					scrub: true,
				},
			});

			scrollTimeline
				.to('[data-hero-background]', { scale: 1.12, yPercent: 8, autoAlpha: 0.46 }, 0)
				.to('[data-hero-overlay]', { opacity: 0.88 }, 0)
				.to('[data-hero-copy-shell]', { yPercent: -12, autoAlpha: 0.12 }, 0)
				.to('[data-hero-info-shell]', { yPercent: 10 }, 0);

			return undefined;
		},
		{ dependencies: [prefersReducedMotion], scope: sectionRef },
	);

	return (
		<section id="top" ref={sectionRef} className="section-shell flex min-h-screen items-center border-b border-white/10 bg-hero-haze">
			<div className="absolute inset-0">
				<img
					data-hero-background
					src="/prambanan-sunrise.webp"
					alt="Lanskap budaya Jogja dengan suasana fajar"
					className="h-full w-full object-cover"
				/>
				<div
					data-hero-overlay
					className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,19,0.32),rgba(4,9,19,0.76)_48%,rgba(4,9,19,0.96)_100%)] opacity-70"
				></div>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,193,122,0.22),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(146,185,255,0.16),transparent_32%)]"></div>
				<div className="heritage-grid absolute inset-0 opacity-35"></div>
			</div>

			<div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-6 py-32 md:px-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:px-16 lg:py-40">
				<div data-hero-copy-shell className="space-y-8 text-center lg:text-left">
					<p data-hero-reveal className="eyebrow">
						Digital Heritage Exhibition
					</p>
					<div className="space-y-6 cinematic-copy">
						<h1 data-hero-reveal className="font-display text-6xl leading-[0.82] text-mist sm:text-7xl lg:text-[6.3rem] xl:text-[8rem]">
							Jogja Karsa
						</h1>
						<p data-hero-reveal className="mx-auto max-w-3xl text-base leading-relaxed text-mist/76 md:text-lg lg:mx-0 lg:text-[1.12rem]">
							“Setiap sudut Jogja menyimpan warisan yang tidak selesai di masa lalu, melainkan terus hidup sebagai pengalaman yang bisa dipandang, dibaca, dan dirasakan kembali.”
						</p>
					</div>

					<div data-hero-meta className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
						<a
							href="#jogja"
							className="inline-flex items-center justify-center rounded-full bg-mist px-6 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
						>
							Masuk ke Pameran
						</a>
						<div className="glass-pill inline-flex items-center justify-center rounded-full px-5 py-3 text-sm text-mist/76">
							Pelestarian budaya dalam format interaktif
						</div>
					</div>
				</div>

				<div data-hero-info-shell className="grid gap-4 sm:max-w-xl sm:justify-self-end">
					<div data-hero-meta className="story-grid overflow-hidden rounded-[2rem] border border-white/10 p-5 md:p-6">
						<div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
							<div>
								<p className="font-accent text-xs uppercase tracking-[0.24em] text-mist/42">Curatorial Frame</p>
								<h2 className="mt-2 font-display text-3xl leading-none text-mist md:text-4xl">Warisan sebagai Ruang</h2>
							</div>
							<div className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-mist/56">
								Dark Exhibition Mode
							</div>
						</div>
						<p className="mt-5 text-sm leading-relaxed text-mist/72 md:text-base">
							Beranda ini disusun seperti galeri digital: atmosfer gelap, aksen emas redup, komposisi asimetris, dan tiap bagian muncul sebagai panel yang dikurasi.
						</p>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div data-hero-meta className="rounded-[1.6rem] border border-white/10 p-4">
							<p className="font-accent text-xs uppercase tracking-[0.22em] text-mist/42">Tone</p>
							<p className="mt-3 text-sm leading-relaxed text-mist/74">Elegan, kontemplatif, dan sedikit teatrikal seperti ruang pamer yang tenang.</p>
						</div>
						<div data-hero-meta className="rounded-[1.6rem] border border-white/10 p-4">
							<p className="font-accent text-xs uppercase tracking-[0.22em] text-mist/42">Motion</p>
							<p className="mt-3 text-sm leading-relaxed text-mist/74">Reveal halus, zoom lambat pada citra, dan scroll yang terasa seperti kuratorial walkthrough.</p>
						</div>
					</div>
				</div>
			</div>

			<a
				href="#sejarah"
				data-scroll-indicator
				className="absolute bottom-10 left-1/2 z-20 inline-flex -translate-x-1/2 flex-col items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-mist/54"
			>
				<span>Scroll ke bawah</span>
				<span className="heritage-mark flex h-11 w-11 items-center justify-center rounded-full text-sun">
					<ArrowDown className="h-4 w-4" strokeWidth={1.8} />
				</span>
			</a>
		</section>
	);
}