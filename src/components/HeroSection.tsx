import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { HeritageAccordion } from './ui/interactive-image-accordion';

import { ensureGsapPlugins, prefersReducedMotion, ScrollTrigger } from '../lib/gsap';

export default function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);
	const cardOverlayRef = useRef<HTMLDivElement>(null);
	const cardAccentRef = useRef<HTMLDivElement>(null);
	const titleWrapRef = useRef<HTMLDivElement>(null);
	const titleLeftRef = useRef<HTMLHeadingElement>(null);
	const titleRightRef = useRef<HTMLHeadingElement>(null);
	const metaWrapRef = useRef<HTMLDivElement>(null);
	const metaLeftRef = useRef<HTMLDivElement>(null);
	const metaRightRef = useRef<HTMLDivElement>(null);
	const scrollHintRef = useRef<HTMLDivElement>(null);
	const heroOverlayRef = useRef<HTMLDivElement>(null);

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener('resize', check, { passive: true });
		return () => window.removeEventListener('resize', check);
	}, []);

	useEffect(() => {
		if (!sectionRef.current) return;

		const applyProgress = (progress: number) => {
			const rawP = Math.min(progress * 2.0, 1);
			const heroRatio = Math.min(Math.max((progress - 0.55) / 0.13, 0), 1);

			const mediaW = isMobile ? 260 + rawP * 700 : 380 + rawP * 1230;
			const mediaH = isMobile ? 340 + rawP * 260 : 440 + rawP * 440;
			const textShift = rawP * (isMobile ? 165 : 148);
			const bgOpacity = Math.max(1 - rawP * 1.45, 0);
			const titleOpacity = Math.max(1 - rawP * 2.9, 0);
			const cardOverlay = Math.max(0.62 - rawP * 0.52, 0.1);
			const cardAccentOpacity = Math.max(1 - rawP * 2.2, 0);
			const metaOpacity = Math.max(1 - rawP * 5.5, 0);

			const card = cardRef.current;
			if (card) {
				card.style.width = `${mediaW}px`;
				card.style.height = `${mediaH}px`;
			}
			if (bgRef.current) bgRef.current.style.opacity = String(bgOpacity);
			if (cardOverlayRef.current) cardOverlayRef.current.style.background = `rgba(4,9,19,${cardOverlay.toFixed(2)})`;
			if (cardAccentRef.current) cardAccentRef.current.style.opacity = String(cardAccentOpacity);
			if (titleWrapRef.current) titleWrapRef.current.style.opacity = String(titleOpacity);
			if (titleLeftRef.current) titleLeftRef.current.style.transform = `translate3d(-${textShift}vw,0,0)`;
			if (titleRightRef.current) titleRightRef.current.style.transform = `translate3d(${textShift}vw,0,0)`;
			if (metaWrapRef.current) metaWrapRef.current.style.opacity = String(metaOpacity);
			if (metaLeftRef.current) metaLeftRef.current.style.transform = `translate3d(-${textShift * 0.38}vw,0,0)`;
			if (metaRightRef.current) metaRightRef.current.style.transform = `translate3d(${textShift * 0.38}vw,0,0)`;
			if (scrollHintRef.current) scrollHintRef.current.style.opacity = rawP < 0.04 ? '1' : '0';
			if (heroOverlayRef.current) {
				heroOverlayRef.current.style.opacity = String(heroRatio);
				heroOverlayRef.current.style.pointerEvents = heroRatio > 0.05 ? 'auto' : 'none';
			}
		};

		if (prefersReducedMotion()) {
			applyProgress(1);
			return;
		}

		ensureGsapPlugins();
		applyProgress(0);

		const getVideo = () => sectionRef.current?.querySelector('video') ?? null;

		const trigger = ScrollTrigger.create({
			trigger: sectionRef.current,
			start: 'top top',
			end: 'bottom bottom',
			scrub: true,
			onUpdate: (self) => applyProgress(self.progress),
			onLeave: () => {
				// Hero is past — stop decoding the drone footage to free GPU
				// for the next section's first paint.
				getVideo()?.pause();
			},
			onEnterBack: () => {
				const v = getVideo();
				if (v?.paused) void v.play().catch(() => undefined);
			},
		});

		return () => {
			trigger.kill();
		};
	}, [isMobile]);

	const initialW = isMobile ? 260 : 380;
	const initialH = isMobile ? 340 : 440;

	return (
		<>
			{/* ─── EXPANSION — 260 vh tall, sticky inner ─────────────── */}
			<section
				id="top"
				ref={sectionRef}
				className="relative"
				style={{ height: '400vh' }}
			>
				<div className="sticky top-0 h-screen overflow-hidden" style={{ contain: 'layout paint' }}>

					{/* Always-dark base so the card has a canvas as bg fades */}
					<div className="absolute inset-0 z-0" style={{ background: 'var(--night)' }} />

					{/* Background image — fades out as card expands */}
					<div ref={bgRef} className="absolute inset-0 z-0" style={{ opacity: 1, willChange: 'opacity' }}>
						<img
							src="/prambanan-sunrise.webp"
							alt="Warisan budaya Yogyakarta"
							className="h-full w-full object-cover"
							fetchPriority="high"
							decoding="async"
						/>
						<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,19,0.22),rgba(4,9,19,0.6)_60%,rgba(4,9,19,0.96))]" />
						<div
							className="absolute inset-0"
							style={{
								background:
									'radial-gradient(circle at top left, rgba(244,193,122,0.16), transparent 30%), radial-gradient(circle at bottom right, rgba(146,185,255,0.12), transparent 30%)',
							}}
						/>
						<div className="heritage-grid absolute inset-0 opacity-[0.22]" />
					</div>

					{/* Expanding media card ─────────────────────────── */}
					<div
						ref={cardRef}
						className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
						style={{
							width: `${initialW}px`,
							height: `${initialH}px`,
							maxWidth: '98vw',
							maxHeight: '93vh',
							borderRadius: '20px',
							boxShadow: '0 16px 60px rgba(0,0,0,0.42)',
							willChange: 'width, height',
							contain: 'layout paint',
						}}
					>
						<video
							src="/video/drone-footage.webm"
							autoPlay
							loop
							muted
							playsInline
							preload="metadata"
							className="h-full w-full object-cover"
						/>
						{/* Darkening layer lifts as card expands */}
						<div
							ref={cardOverlayRef}
							className="absolute inset-0"
							style={{ background: 'rgba(4,9,19,0.62)' }}
						/>
						{/* Warm top accent — fades with title */}
						<div
							ref={cardAccentRef}
							className="absolute inset-0"
							style={{
								background: 'radial-gradient(ellipse at 50% -10%, rgba(244,193,122,0.1), transparent 52%)',
								opacity: 1,
							}}
						/>
					</div>

					{/* Split title ─────────────────────────────────── */}
					<div
						ref={titleWrapRef}
						className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-1 select-none md:gap-2"
						style={{ opacity: 1, willChange: 'opacity' }}
					>
						<h1
							ref={titleLeftRef}
							className="font-display text-mist"
							style={{
								fontSize: 'clamp(3.4rem, 9.5vw, 9rem)',
								lineHeight: 1,
								letterSpacing: '-0.04em',
								transform: 'translate3d(0,0,0)',
								mixBlendMode: 'difference',
								willChange: 'transform',
							}}
						>
							Jogja
						</h1>
						<h1
							ref={titleRightRef}
							className="font-display text-mist"
							style={{
								fontSize: 'clamp(3.4rem, 9.5vw, 9rem)',
								lineHeight: 1,
								letterSpacing: '-0.04em',
								transform: 'translate3d(0,0,0)',
								mixBlendMode: 'difference',
								willChange: 'transform',
							}}
						>
							Karsa
						</h1>
					</div>

					{/* Corner meta labels ───────────────────────────── */}
					<div
						ref={metaWrapRef}
						className="pointer-events-none absolute bottom-[10vh] z-20 flex w-full items-end justify-between px-8 select-none md:px-16"
						style={{ opacity: 1, willChange: 'opacity' }}
					>
						<div ref={metaLeftRef} style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}>
							<p className="text-[0.58rem] uppercase tracking-[0.32em] text-mist/38">Lokasi</p>
							<p className="mt-0.5 font-display text-sm text-mist/55">Yogyakarta, Indonesia</p>
						</div>
						<div ref={metaRightRef} className="text-right" style={{ transform: 'translate3d(0,0,0)', willChange: 'transform' }}>
							<p className="text-[0.58rem] uppercase tracking-[0.32em] text-mist/38">Mode</p>
							<p className="mt-0.5 font-display text-sm text-mist/55">Exhibition Mode</p>
						</div>
					</div>

					{/* Scroll hint ────────────────────────────────── */}
					<div
						ref={scrollHintRef}
						className="pointer-events-none absolute bottom-[8vh] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 select-none"
						style={{ opacity: 1, transition: 'opacity 200ms ease' }}
					>
						<p className="text-[0.6rem] uppercase tracking-[0.3em] text-mist/44">Gulir untuk menjelajah</p>
						<ChevronDown className="h-4 w-4 animate-bounce text-sun/55" strokeWidth={1.5} />
					</div>

					{/* ─── HERO COPY OVERLAY ─────────────────────────── */}
					{/* Fades in over the fullscreen card once rawP = 1 */}
					<div
						ref={heroOverlayRef}
						className="absolute inset-0 z-30 flex flex-col items-center justify-center"
						style={{
							opacity: 0,
							pointerEvents: 'none',
							willChange: 'opacity',
						}}
					>
						{/* Readability vignette */}
						<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,9,19,0.72)_0%,rgba(4,9,19,0.42)_55%,transparent_80%)]" />

						<div className="relative mx-auto w-full max-w-7xl grid gap-10 px-6 py-12 md:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-16 lg:py-16">
							{/* Left column */}
							<div className="space-y-6 text-center lg:text-left">
								<p className="eyebrow">Digital Heritage Exhibition</p>
								<div className="cinematic-copy space-y-5">
									<h1 className="font-display text-5xl leading-[0.84] text-mist sm:text-6xl lg:text-[5.8rem] xl:text-[7rem]">
										Jogja Karsa
									</h1>
									<p className="mx-auto max-w-3xl text-base leading-relaxed text-mist/76 lg:mx-0 lg:text-[1.08rem]">
										"Setiap sudut Jogja menyimpan warisan yang tidak selesai di masa lalu, melainkan terus hidup sebagai pengalaman yang bisa dipandang, dibaca, dan dirasakan kembali."
									</p>
								</div>
								<div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
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

							{/* Right column — heritage accordion, desktop only */}
							<div className="hidden lg:flex lg:items-center lg:justify-end">
								<HeritageAccordion />
							</div>
						</div>

						{/* Scroll down cue — pinned to bottom */}
						<a
							href="#sejarah"
							className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.62rem] uppercase tracking-[0.28em] text-mist/46 transition-colors hover:text-mist/72"
						>
							<span>Scroll ke bawah</span>
							<span className="heritage-mark flex h-10 w-10 items-center justify-center rounded-full text-sun">
								<ChevronDown className="h-4 w-4" strokeWidth={1.8} />
							</span>
						</a>
					</div>

				</div>
			</section>
		</>
	);
}
