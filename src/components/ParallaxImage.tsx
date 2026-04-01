import { useRef } from 'react';

import { createMediaMatcher, ensureGsapPlugins, gsap } from '../lib/gsap';
import ScrollSection from './ScrollSection';
import { useGsapContext } from './hooks/useGsapContext';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export default function ParallaxImage() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const prefersReducedMotion = usePrefersReducedMotion();

	useGsapContext(
		() => {
			ensureGsapPlugins();

			if (prefersReducedMotion) {
				gsap.set('[data-depth-layer]', { clearProps: 'all' });
				return undefined;
			}

			const matcher = createMediaMatcher();

			matcher.add(
				{
					desktop: '(min-width: 1024px)',
					mobile: '(max-width: 1023px)',
				},
				(context) => {
					const { desktop } = context.conditions as { desktop: boolean; mobile: boolean };
					const yMultiplier = desktop ? 1 : 0.7;

					const timeline = gsap.timeline({
						scrollTrigger: {
							trigger: sectionRef.current,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true,
						},
					});

					timeline
						.fromTo('[data-parallax-copy]', { yPercent: 10, autoAlpha: 0.4 }, { yPercent: -10, autoAlpha: 1, ease: 'none' }, 0)
						.fromTo('[data-depth-layer="back"]', { yPercent: -12, scale: 1.04 }, { yPercent: 18 * yMultiplier, scale: 1.12, ease: 'none' }, 0)
						.fromTo('[data-depth-layer="mid"]', { yPercent: -6, scale: 1.02 }, { yPercent: 28 * yMultiplier, scale: 1.08, ease: 'none' }, 0)
						.fromTo('[data-depth-layer="front"]', { yPercent: 0 }, { yPercent: 38 * yMultiplier, ease: 'none' }, 0)
						.fromTo('[data-depth-layer="glow"]', { yPercent: -18, autoAlpha: 0.55 }, { yPercent: 24 * yMultiplier, autoAlpha: 1, ease: 'none' }, 0)
						.to('[data-parallax-frame]', { yPercent: -8, scale: 1.02, ease: 'none' }, 0);

					return () => {
						matcher.revert();
					};
				},
			);

			return () => {
				matcher.revert();
			};
		},
		{ dependencies: [prefersReducedMotion], scope: sectionRef },
	);

	return (
		<ScrollSection
			sectionRef={sectionRef}
				id="parallax-showcase"
				className="bg-[linear-gradient(180deg,#07101c_0%,#08111f_40%,#0a1525_100%)]"
				eyebrow="Parallax Image Section"
				title={<>Layered depth that keeps motion readable.</>}
				body={
					<p>
						This scene uses layered gradients and cards instead of external imagery so the starter stays runnable out of
						the box. Replace each layer with your own media without changing the scroll wiring.
					</p>
				}
				contentClassName="grid gap-10 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:items-center"
			>
				<div data-parallax-copy className="relative z-10 space-y-6 lg:pr-10">
					<div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
						<p className="text-xs uppercase tracking-[0.24em] text-mist/42">Depth mapping</p>
						<div className="mt-5 space-y-4">
							<div className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-[#091324]/72 px-4 py-3">
								<span className="text-sm text-mist/70">Background haze</span>
								<span className="text-xs uppercase tracking-[0.22em] text-mist/42">Slow drift</span>
							</div>
							<div className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-[#091324]/72 px-4 py-3">
								<span className="text-sm text-mist/70">Midground frame</span>
								<span className="text-xs uppercase tracking-[0.22em] text-mist/42">Primary scale</span>
							</div>
							<div className="flex items-center justify-between rounded-[1.3rem] border border-white/10 bg-[#091324]/72 px-4 py-3">
								<span className="text-sm text-mist/70">Foreground notes</span>
								<span className="text-xs uppercase tracking-[0.22em] text-mist/42">Fastest travel</span>
							</div>
						</div>
					</div>

					<p className="max-w-xl text-base text-mist/72 md:text-lg">
						Keep foreground details crisp and let ambient glows move slower than content cards. The result feels more
						physical than simply scaling a single screenshot.
					</p>
				</div>

				<div className="relative min-h-[30rem] lg:min-h-[42rem]">
					<div className="sticky top-0 flex min-h-[30rem] items-center lg:min-h-screen lg:py-10">
						<div
							data-parallax-frame
							className="glass-panel story-grid relative mx-auto flex w-full max-w-[40rem] items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 px-5 py-6 shadow-glow sm:px-8 sm:py-8"
						>
							<div data-depth-layer="glow" className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,193,122,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(125,197,173,0.18),transparent_34%),radial-gradient(circle_at_center,rgba(146,185,255,0.16),transparent_42%)]"></div>
							<div data-depth-layer="back" className="absolute inset-x-8 top-10 h-[52%] rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02))] blur-[2px]"></div>
							<div data-depth-layer="mid" className="absolute inset-x-12 bottom-20 top-20 rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(146,185,255,0.18),rgba(255,255,255,0.04)_45%,rgba(210,122,87,0.1)_100%)]"></div>
							<div className="absolute inset-x-12 bottom-16 h-24 rounded-[999px] bg-[radial-gradient(circle,rgba(244,193,122,0.24),transparent_72%)] blur-2xl"></div>

							<div className="relative z-10 grid w-full gap-4 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
								<div data-depth-layer="front" className="space-y-4">
									<div className="rounded-[1.6rem] border border-white/10 bg-[#081220]/78 p-5 backdrop-blur-xl">
										<p className="text-xs uppercase tracking-[0.24em] text-mist/44">Foreground copy</p>
										<p className="mt-4 text-lg leading-relaxed text-mist/82">
											Let this card travel the furthest to sell the depth difference.
										</p>
									</div>
									<div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
										<p className="text-xs uppercase tracking-[0.24em] text-mist/44">Transition note</p>
										<p className="mt-4 text-sm text-mist/72">
											Blend from this scene into a testimonial wall, gallery, or final CTA while keeping the same motion curve.
										</p>
									</div>
								</div>

								<div className="rounded-[2rem] border border-white/10 bg-[#081220]/62 p-5 backdrop-blur-xl">
									<div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-mist/42">
										<span>Parallax frame</span>
										<span>Replaceable media</span>
									</div>
									<div className="mt-4 grid gap-4">
										<div className="h-40 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))]"></div>
										<div className="grid gap-3 sm:grid-cols-2">
											<div className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4">
												<p className="text-xs uppercase tracking-[0.22em] text-mist/40">Back layer</p>
												<p className="mt-2 text-sm text-mist/72">Landscape, skyline, or subtle motion video.</p>
											</div>
											<div className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4">
												<p className="text-xs uppercase tracking-[0.22em] text-mist/40">Front layer</p>
												<p className="mt-2 text-sm text-mist/72">Product frame, caption block, or art-directed still.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ScrollSection>
	);
}