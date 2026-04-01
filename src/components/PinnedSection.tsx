import { useRef, useState } from 'react';

import { createMediaMatcher, ensureGsapPlugins, gsap } from '../lib/gsap';
import { useGsapContext } from './hooks/useGsapContext';
import { useMediaQuery } from './hooks/useMediaQuery';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

const beats = [
	{
		label: 'Act I',
		title: 'Pin the narrative frame',
		copy: 'Lock the viewport to one stage so copy, metrics, and media can hand off with deliberate timing instead of disappearing in normal document flow.',
		accent: 'bg-sun',
	},
	{
		label: 'Act II',
		title: 'Scrub the middle beats',
		copy: 'Tie progress to scroll depth. Each beat can enter, hold, and dissolve without competing for the user’s attention.',
		accent: 'bg-cypress',
	},
	{
		label: 'Act III',
		title: 'Release into the next section',
		copy: 'Finish with a confident exit state so the transition into parallax or media layers feels intentional instead of abrupt.',
		accent: 'bg-lagoon',
	},
];

export default function PinnedSection() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const stickyRef = useRef<HTMLDivElement | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const prefersReducedMotion = usePrefersReducedMotion();
	const isDesktop = useMediaQuery('(min-width: 1024px)');
	const enableAnimation = isDesktop && !prefersReducedMotion;

	useGsapContext(
		() => {
			if (!enableAnimation) {
				return undefined;
			}

			ensureGsapPlugins();
			const matcher = createMediaMatcher();

			matcher.add('(min-width: 1024px)', () => {
				const panels = gsap.utils.toArray<HTMLElement>('[data-beat-panel]');
				const markers = gsap.utils.toArray<HTMLElement>('[data-beat-marker]');
				const activeIndexRef = { current: 0 };

				gsap.set(panels, { autoAlpha: 0, yPercent: 14 });
				gsap.set(markers, { scale: 0.84, autoAlpha: 0.36 });
				gsap.set(panels[0], { autoAlpha: 1, yPercent: 0 });
				gsap.set(markers[0], { scale: 1, autoAlpha: 1 });

				const timeline = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						pin: stickyRef.current,
						start: 'top top',
						end: '+=240%',
						scrub: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						onUpdate: (self) => {
							const nextIndex = Math.min(beats.length - 1, Math.floor(self.progress * beats.length));
							if (nextIndex !== activeIndexRef.current) {
								activeIndexRef.current = nextIndex;
								setActiveIndex(nextIndex);
							}
						},
					},
				});

				timeline.to('[data-beat-fill]', { scaleY: 1, transformOrigin: 'top top', ease: 'none' }, 0);
				timeline.to('[data-pinned-ambient="1"]', { xPercent: -8, yPercent: 12, scale: 1.08, ease: 'none' }, 0);
				timeline.to('[data-pinned-ambient="2"]', { xPercent: 6, yPercent: -16, scale: 1.12, ease: 'none' }, 0);

				beats.forEach((_, index) => {
					const panelStart = index * 0.33 + 0.03;
					const markerStart = index * 0.33;

					timeline.to(
						panels[index],
						{
							autoAlpha: 1,
							yPercent: 0,
							duration: 0.12,
						},
						panelStart,
					);

					timeline.to(
						markers[index],
						{
							autoAlpha: 1,
							scale: 1,
							duration: 0.08,
						},
						markerStart,
					);

					if (index < beats.length - 1) {
						timeline.to(
							panels[index],
							{
								autoAlpha: 0.16,
								yPercent: -12,
								duration: 0.12,
							},
							panelStart + 0.21,
						);
					}
				});

				return () => {
					matcher.revert();
				};
			});

			return () => {
				matcher.revert();
			};
		},
		{ dependencies: [enableAnimation], scope: sectionRef },
	);

	return (
		<section id="story-pinned" ref={sectionRef} className="relative overflow-clip border-b border-white/10 bg-[#081321]">
			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,33,0.42),rgba(9,19,33,0.88))]"></div>
			<div data-pinned-ambient="1" className="absolute left-[-10rem] top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(244,193,122,0.14),transparent_66%)] blur-3xl"></div>
			<div data-pinned-ambient="2" className="absolute right-[-8rem] top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(146,185,255,0.16),transparent_66%)] blur-3xl"></div>

			<div ref={stickyRef} className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-24 md:px-10 lg:px-16 lg:py-28">
				<div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center">
					<div className="relative z-10 flex flex-col gap-6 lg:pr-10">
						<p className="eyebrow">Pinned Storytelling Section</p>
						<h2 className="text-balance font-display text-4xl leading-[0.94] tracking-[-0.05em] text-mist sm:text-5xl lg:text-6xl">
							One viewport, three deliberate beats.
						</h2>
						<p className="max-w-xl text-base text-mist/72 md:text-lg">
							This section demonstrates a pinned scroll timeline. On desktop it locks the canvas and advances the
							story in place. On smaller screens and reduced-motion environments, it falls back to a stacked layout.
						</p>

						<div className="mt-4 grid gap-5 lg:grid-cols-[auto_1fr]">
							<div className="relative hidden w-8 justify-center lg:flex">
								<div className="h-full w-px rounded-full bg-white/10"></div>
								<div data-beat-fill className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-sun via-cypress to-lagoon" style={{ transform: 'scaleY(0)' }}></div>
							</div>

							<div className="space-y-4">
								{beats.map((beat, index) => {
									const isActive = index === activeIndex;

									return (
										<div key={beat.title} className="flex items-start gap-4">
											<div
												data-beat-marker
												className={`mt-1.5 h-3 w-3 rounded-full border border-white/10 ${beat.accent}`.trim()}
											></div>
											<div>
												<p className={`text-xs uppercase tracking-[0.24em] ${isActive ? 'text-mist/72' : 'text-mist/38'}`.trim()}>
													{beat.label}
												</p>
												<p className={`mt-2 text-base ${isActive ? 'text-mist' : 'text-mist/48'}`.trim()}>{beat.title}</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					<div className="relative z-10 min-h-[28rem] lg:min-h-[34rem]">
						<div className="absolute inset-0 rounded-[2.4rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] blur-3xl"></div>
						<div className={`relative grid gap-5 ${enableAnimation ? 'min-h-[34rem]' : ''}`.trim()}>
							{beats.map((beat, index) => {
								const isActive = index === activeIndex;

								return (
									<article
										key={beat.title}
										data-beat-panel
										className={`glass-panel story-grid rounded-[2.2rem] border border-white/10 p-7 md:p-8 ${enableAnimation ? 'absolute inset-0' : 'relative'} ${isActive ? 'ring-1 ring-white/10' : ''}`.trim()}
									>
										<div className="absolute inset-0 rounded-[2.2rem] bg-[radial-gradient(circle_at_top_left,rgba(244,193,122,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(146,185,255,0.12),transparent_34%)]"></div>
										<div className="relative flex h-full flex-col justify-between gap-8">
											<div>
												<p className="text-sm uppercase tracking-[0.24em] text-mist/45">{beat.label}</p>
												<h3 className="mt-4 max-w-xl font-display text-3xl leading-tight tracking-[-0.04em] text-mist md:text-4xl">
													{beat.title}
												</h3>
												<p className="mt-4 max-w-xl text-base text-mist/72 md:text-lg">{beat.copy}</p>
											</div>

											<div className="grid gap-4 md:grid-cols-[1.15fr_.85fr]">
												<div className="rounded-[1.8rem] border border-white/10 bg-[#081220]/70 p-5">
													<div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-mist/44">
														<span>Trigger</span>
														<span>{index === 0 ? 'pin + intro' : index === 1 ? 'scrub handoff' : 'release'}</span>
													</div>
													<div className="mt-5 h-40 rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] p-4">
														<div className="grid h-full gap-3">
															<div className="h-3 rounded-full bg-white/10">
																<div className={`h-full rounded-full ${beat.accent}`.trim()} style={{ width: `${70 + index * 10}%` }}></div>
															</div>
															<div className="h-3 rounded-full bg-white/10">
																<div className="h-full w-[62%] rounded-full bg-white/40"></div>
															</div>
															<div className="mt-auto grid gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
																<p className="text-sm text-mist/70">Use card swaps, pinned metrics, or product media here.</p>
															</div>
														</div>
													</div>
												</div>

												<div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
													<p className="text-xs uppercase tracking-[0.24em] text-mist/44">Key idea</p>
													<p className="mt-4 text-lg leading-relaxed text-mist/82">
														{index === 0 && 'Keep the viewport fixed so users read the choreography, not the layout.'}
														{index === 1 && 'Expose progress through motion, copy changes, and restrained ambient light.'}
														{index === 2 && 'Resolve the pin cleanly so the next section inherits momentum without a snap.'}
													</p>
												</div>
											</div>
										</div>
									</article>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}