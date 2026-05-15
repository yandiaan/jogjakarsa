import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { HeritageAccordion } from './ui/interactive-image-accordion';

import { ensureGsapPlugins, prefersReducedMotion, ScrollTrigger } from '../lib/gsap';

export default function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const [scrollProgress, setScrollProgress] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener('resize', check);
		return () => window.removeEventListener('resize', check);
	}, []);

	useEffect(() => {
		if (!sectionRef.current) return;

		if (prefersReducedMotion()) {
			setScrollProgress(1);
			return;
		}

		ensureGsapPlugins();

		const trigger = ScrollTrigger.create({
			trigger: sectionRef.current,
			start: 'top top',
			end: 'bottom bottom',
			scrub: true,
			onUpdate: (self) => setScrollProgress(self.progress),
		});

		return () => trigger.kill();
	}, []);

	// rawP completes at ~62 % of section scroll, leaving a "resting" phase at full expansion
	const rawP = Math.min(scrollProgress * 1.62, 1);

	// heroRatio: fades in during the resting phase (scrollProgress 0.72 → 0.92)
	const heroRatio = Math.min(Math.max((scrollProgress - 0.72) / 0.2, 0), 1);

	const mediaW = isMobile ? 260 + rawP * 700 : 380 + rawP * 1230;
	const mediaH = isMobile ? 340 + rawP * 260 : 440 + rawP * 440;
	const textShift = rawP * (isMobile ? 165 : 148);
	const bgOpacity = Math.max(1 - rawP * 1.45, 0);
	const titleOpacity = Math.max(1 - rawP * 2.9, 0);
	const cardOverlay = Math.max(0.62 - rawP * 0.52, 0.1);
	const cardRadius = 20;
	const cardScale = 1.07 - rawP * 0.07;

	return (
		<>
			{/* ─── EXPANSION — 260 vh tall, sticky inner ─────────────── */}
			<section
				id="top"
				ref={sectionRef}
				className="relative"
				style={{ height: '300vh' }}
			>
				<div className="sticky top-0 h-screen overflow-hidden">

					{/* Always-dark base so the card has a canvas as bg fades */}
					<div className="absolute inset-0 z-0" style={{ background: 'var(--night)' }} />

					{/* Background image — fades out as card expands */}
					<div className="absolute inset-0 z-0" style={{ opacity: bgOpacity }}>
						<img
							src="/prambanan-sunrise.webp"
							alt="Warisan budaya Yogyakarta"
							className="h-full w-full object-cover"
							fetchPriority="high"
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
						className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
						style={{
							width: `${mediaW}px`,
							height: `${mediaH}px`,
							maxWidth: '98vw',
							maxHeight: '93vh',
							borderRadius: `${cardRadius}px`,
							boxShadow: `0 ${Math.round(20 - rawP * 14)}px ${Math.round(80 - rawP * 40)}px rgba(0,0,0,${(0.5 - rawP * 0.18).toFixed(2)})`,
						}}
					>
						<video
							src="/video/drone-footage.webm"
							autoPlay
							loop
							muted
							playsInline
							className="h-full w-full object-cover"
							style={{ transform: `scale(${cardScale})`, transformOrigin: 'center center' }}
						/>
						{/* Darkening layer lifts as card expands */}
						<div
							className="absolute inset-0"
							style={{ background: `rgba(4,9,19,${cardOverlay.toFixed(2)})` }}
						/>
						{/* Warm top accent — fades with title */}
						<div
							className="absolute inset-0"
							style={{
								background: 'radial-gradient(ellipse at 50% -10%, rgba(244,193,122,0.1), transparent 52%)',
								opacity: Math.max(1 - rawP * 2.2, 0),
							}}
						/>
					</div>

					{/* Split title ─────────────────────────────────── */}
					<div
						className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-1 select-none md:gap-2"
						style={{ opacity: titleOpacity }}
					>
						<h1
							className="font-display text-mist"
							style={{
								fontSize: 'clamp(3.4rem, 9.5vw, 9rem)',
								lineHeight: 1,
								letterSpacing: '-0.04em',
								transform: `translateX(-${textShift}vw)`,
								mixBlendMode: 'difference',
							}}
						>
							Jogja
						</h1>
						<h1
							className="font-display text-mist"
							style={{
								fontSize: 'clamp(3.4rem, 9.5vw, 9rem)',
								lineHeight: 1,
								letterSpacing: '-0.04em',
								transform: `translateX(${textShift}vw)`,
								mixBlendMode: 'difference',
							}}
						>
							Karsa
						</h1>
					</div>

					{/* Corner meta labels ───────────────────────────── */}
					<div
						className="pointer-events-none absolute bottom-[10vh] z-20 flex w-full items-end justify-between px-8 select-none md:px-16"
						style={{ opacity: Math.max(1 - rawP * 5.5, 0) }}
					>
						<div style={{ transform: `translateX(-${textShift * 0.38}vw)` }}>
							<p className="text-[0.58rem] uppercase tracking-[0.32em] text-mist/38">Lokasi</p>
							<p className="mt-0.5 font-display text-sm text-mist/55">Yogyakarta, Indonesia</p>
						</div>
						<div className="text-right" style={{ transform: `translateX(${textShift * 0.38}vw)` }}>
							<p className="text-[0.58rem] uppercase tracking-[0.32em] text-mist/38">Mode</p>
							<p className="mt-0.5 font-display text-sm text-mist/55">Exhibition Mode</p>
						</div>
					</div>

					{/* Scroll hint ────────────────────────────────── */}
					{rawP < 0.04 && (
						<div className="pointer-events-none absolute bottom-[8vh] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 select-none">
							<p className="text-[0.6rem] uppercase tracking-[0.3em] text-mist/44">Gulir untuk menjelajah</p>
							<ChevronDown className="h-4 w-4 animate-bounce text-sun/55" strokeWidth={1.5} />
						</div>
					)}

					{/* ─── HERO COPY OVERLAY ─────────────────────────── */}
					{/* Fades in over the fullscreen card once rawP = 1 */}
					<div
						className="absolute inset-0 z-30 flex flex-col items-center justify-center"
						style={{
							opacity: heroRatio,
							pointerEvents: heroRatio > 0.05 ? 'auto' : 'none',
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
