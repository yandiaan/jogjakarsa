import { useRef } from 'react';

import { ensureGsapPlugins, gsap } from '../lib/gsap';
import ScrollSection from './ScrollSection';
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
				return undefined;
			}

			gsap.set('[data-hero-panel]', { autoAlpha: 0, y: 36, scale: 0.96 });
			gsap.set('[data-hero-copy]', { autoAlpha: 0, y: 28 });
			gsap.set('[data-hero-float]', { autoAlpha: 0, y: 24 });

			const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
			intro
				.to('[data-hero-copy]', {
					autoAlpha: 1,
					y: 0,
					duration: 0.9,
					stagger: 0.12,
				})
				.to(
					'[data-hero-panel]',
					{
						autoAlpha: 1,
						y: 0,
						scale: 1,
						duration: 1,
					},
					0.12,
				)
				.to(
					'[data-hero-float]',
					{
						autoAlpha: 1,
						y: 0,
						duration: 0.8,
						stagger: 0.1,
					},
					0.3,
				);

			gsap.to('[data-hero-float="left"]', {
				yPercent: -7,
				repeat: -1,
				yoyo: true,
				duration: 4.8,
				ease: 'sine.inOut',
			});

			gsap.to('[data-hero-float="right"]', {
				yPercent: 7,
				repeat: -1,
				yoyo: true,
				duration: 5.4,
				ease: 'sine.inOut',
			});

			const scrollTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.current,
					start: 'top top',
					end: 'bottom top+=12%',
					scrub: true,
				},
			});

			scrollTimeline
				.to('[data-hero-copy-group]', { yPercent: -18, autoAlpha: 0.32 }, 0)
				.to('[data-hero-panel]', { yPercent: 12, scale: 1.06 }, 0)
				.to('[data-hero-orbit]', { scale: 1.16, autoAlpha: 0.8 }, 0)
				.to('[data-hero-backdrop]', { scale: 1.12, yPercent: -6 }, 0);

			return undefined;
		},
		{ dependencies: [prefersReducedMotion], scope: sectionRef },
	);

	return (
		<ScrollSection
			sectionRef={sectionRef}
			className="bg-hero-haze border-b border-white/10"
			contentClassName="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,.98fr)]"
		>
			<>
				<div data-hero-copy-group className="relative z-10 flex flex-col gap-7">
					<p data-hero-copy className="eyebrow">
						Astro + React Islands + GSAP
					</p>
					<div className="space-y-6">
						<h1
							data-hero-copy
							className="max-w-4xl text-balance font-display text-5xl leading-[0.88] tracking-[-0.06em] text-mist sm:text-6xl lg:text-7xl xl:text-[6.75rem]"
						>
							Scroll stories that feel staged, not stacked.
						</h1>
						<p data-hero-copy className="max-w-2xl text-base text-mist/74 md:text-lg lg:text-xl">
							A cinematic landing page scaffold with pinned storytelling, scrubbed timelines, depth-driven parallax,
							and smooth scroll orchestration ready for custom content.
						</p>
					</div>
					<div data-hero-copy className="flex flex-col gap-4 sm:flex-row">
						<a
							href="#story-pinned"
							className="inline-flex items-center justify-center rounded-full bg-mist px-6 py-3 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
						>
							See the pinned timeline
						</a>
						<a
							href="#parallax-showcase"
							className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-mist/84 backdrop-blur transition-colors duration-300 hover:bg-white/10"
						>
							Jump to depth layers
						</a>
					</div>
					<div data-hero-copy className="grid gap-4 sm:grid-cols-3">
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
							<p className="text-xs uppercase tracking-[0.22em] text-mist/45">Pinned</p>
							<p className="mt-2 text-sm text-mist/72">Timeline choreography with staged transitions and sticky copy.</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
							<p className="text-xs uppercase tracking-[0.22em] text-mist/45">Scrubbed</p>
							<p className="mt-2 text-sm text-mist/72">Scroll depth becomes the narrative dial for every scene.</p>
						</div>
						<div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
							<p className="text-xs uppercase tracking-[0.22em] text-mist/45">Islanded</p>
							<p className="mt-2 text-sm text-mist/72">Only the animated sections hydrate, keeping the shell lean.</p>
						</div>
					</div>
				</div>

				<div className="relative min-h-[28rem] lg:min-h-[40rem]">
					<div
						data-hero-backdrop
						className="absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_top_left,rgba(244,193,122,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(125,197,173,0.22),transparent_30%),linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] blur-3xl"
					></div>
					<div
						data-hero-panel
						className="glass-panel story-grid relative flex h-full min-h-[28rem] overflow-hidden rounded-[2.4rem] border border-white/10 px-6 py-6 sm:px-8 sm:py-8"
					>
						<div data-hero-orbit className="absolute -left-8 top-10 h-32 w-32 rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(244,193,122,0.35),transparent_66%)] blur-xl"></div>
						<div className="absolute -bottom-12 right-8 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(146,185,255,0.26),transparent_62%)] blur-2xl"></div>

						<div className="relative flex h-full w-full flex-col justify-between gap-6">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="text-xs uppercase tracking-[0.26em] text-mist/45">Story canvas</p>
									<p className="mt-2 max-w-xs text-sm text-mist/68">
										Use this surface for a hero video, scene illustration, or 3D stage later.
									</p>
								</div>
								<div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-mist/58">
									Viewport locked
								</div>
							</div>

							<div className="relative flex flex-1 items-end justify-center">
								<div className="absolute inset-x-8 bottom-0 h-36 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(244,193,122,0.26),transparent_68%)] blur-2xl"></div>
								<div className="absolute left-[8%] top-[14%] h-28 w-28 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))] backdrop-blur-xl"></div>
								<div className="relative flex h-[21rem] w-full max-w-[28rem] items-end justify-center rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(146,185,255,0.16),rgba(210,122,87,0.12)_56%,rgba(8,17,31,0.04))] px-4 pb-4 pt-10 shadow-glow sm:h-[24rem]">
									<div className="absolute inset-x-8 top-8 h-32 rounded-[1.8rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]"></div>
									<div className="absolute inset-x-12 bottom-12 h-28 rounded-[999px] bg-[radial-gradient(circle,rgba(125,197,173,0.22),transparent_72%)] blur-2xl"></div>
									<div className="relative z-10 grid w-full gap-3 rounded-[1.6rem] border border-white/10 bg-[#0a1323]/72 p-4 backdrop-blur-xl">
										<div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-mist/45">
											<span>Scene layers</span>
											<span>03 active</span>
										</div>
										<div className="grid gap-2">
											<div className="h-3 rounded-full bg-white/10">
												<div className="h-full w-[84%] rounded-full bg-sun"></div>
											</div>
											<div className="h-3 rounded-full bg-white/10">
												<div className="h-full w-[66%] rounded-full bg-cypress"></div>
											</div>
											<div className="h-3 rounded-full bg-white/10">
												<div className="h-full w-[92%] rounded-full bg-lagoon"></div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								<div
									data-hero-float="left"
									className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 text-sm text-mist/72 backdrop-blur"
								>
									Pinned section transitions and copy shifts live in one timeline.
								</div>
								<div
									data-hero-float="right"
									className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 text-sm text-mist/72 backdrop-blur"
								>
									Parallax layers and ambient gradients stay isolated to their own island.
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		</ScrollSection>
	);
}