import { useRef, useState } from 'react';

import { ScrollTrigger, ensureGsapPlugins, gsap } from '../lib/gsap';
import { useProgressStore } from '../store/useProgressStore';
import { useGsapContext } from './hooks/useGsapContext';
import { useMediaQuery } from './hooks/useMediaQuery';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

const pillars = ['Sejarah', 'Budaya', 'Kuliner', 'Lanskap', 'Inovasi'];

const beats = [
	{
		label: 'Akar Keraton',
		title: 'Jogja lahir dari pusat yang memegang ingatan.',
		copy:
			'Yogyakarta tumbuh dari ritme keraton, tempat nilai, ruang, dan kehidupan sehari-hari menyusun diri menjadi satu lanskap batin.',
		note: '1755 menjadi simpul awal ketika kota ini memilih bentuknya sendiri.',
		accent: 'from-sun/80 to-clay/70',
	},
	{
		label: 'Kota Perjuangan',
		title: 'Sejarahnya tidak diam di belakang kaca.',
		copy:
			'Di Jogja, jejak perjuangan tinggal di benteng, jalan, dan nama-nama yang terus diucapkan. Masa lalu tetap bergerak bersama hari ini.',
		note: 'Banyak ruang publik terasa seperti arsip hidup yang masih dipakai dan dihuni.',
		accent: 'from-clay/80 to-cypress/70',
	},
	{
		label: 'Warisan Hidup',
		title: 'Yang diwariskan bukan hanya bangunan, tetapi cara memandang waktu.',
		copy:
			'Sejarah menjadi napas yang menjaga pilar lain: budaya, kuliner, lanskap, dan inovasi. Ia bukan pembuka yang selesai, melainkan fondasi yang terus menyala.',
		note: 'Di sinilah jejak pertamamu ditandai sebelum perjalanan melebar ke pilar lain.',
		accent: 'from-cypress/80 to-lagoon/70',
	},
];

export default function StorySection() {
	const sectionRef = useRef(null);
	const stickyRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const isDesktop = useMediaQuery('(min-width: 1024px)');
	const prefersReducedMotion = usePrefersReducedMotion();
	const enablePin = isDesktop && !prefersReducedMotion;
	const interactionCompleted = useProgressStore((state) => state.interactionCompleted);

	useGsapContext(
		() => {
			ensureGsapPlugins();

			const { markSectionVisited, openAwanDialog } = useProgressStore.getState();
			const checkpoints = {
				story: false,
				mid: false,
				final: false,
			};

			const revealStory = () => {
				if (!checkpoints.story) {
					markSectionVisited('story', 66);
					checkpoints.story = true;
				}
			};

			const showMidMessage = () => {
				if (!checkpoints.mid) {
					openAwanDialog({
						message:
							'Di Jogja, sejarah tidak disimpan di masa lalu saja. Ia masih hidup di jalan, halaman, dan upacara yang terus diulang.',
						placement: 'left',
					});
					checkpoints.mid = true;
				}
			};

			const showInteractionPrompt = () => {
				if (!checkpoints.final && !useProgressStore.getState().interactionCompleted) {
					openAwanDialog({
						message:
							'Jika kamu siap, tandai Sejarah sebagai jejak pertamamu. Setelah ini, pilar lain akan menunggu giliran untuk dibuka.',
						placement: 'right',
						ctaLabel: 'Aku siap',
					});
					checkpoints.final = true;
				}
			};

			if (prefersReducedMotion) {
				revealStory();
				showMidMessage();
				return undefined;
			}

			if (enablePin) {
				const cards = gsap.utils.toArray('[data-story-card]');
				const labels = gsap.utils.toArray('[data-story-label]');
				const activeIndexRef = { current: 0 };

				gsap.set(cards, { autoAlpha: 0, yPercent: 14 });
				gsap.set(labels, { autoAlpha: 0.38, x: 0 });
				gsap.set(cards[0], { autoAlpha: 1, yPercent: 0 });
				gsap.set(labels[0], { autoAlpha: 1, x: 8 });

				const timeline = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						pin: stickyRef.current,
						start: 'top top',
						end: '+=250%',
						scrub: true,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						onEnter: revealStory,
						onEnterBack: revealStory,
						onUpdate: (self) => {
							const nextIndex = Math.min(beats.length - 1, Math.floor(self.progress * beats.length));

							if (nextIndex !== activeIndexRef.current) {
								activeIndexRef.current = nextIndex;
								setActiveIndex(nextIndex);
							}

							if (self.progress > 0.36) {
								showMidMessage();
							}

							if (self.progress > 0.76) {
								showInteractionPrompt();
							}
						},
					},
				});

				timeline
					.to('[data-story-progress]', { scaleY: 1, transformOrigin: 'top top', ease: 'none' }, 0)
					.to('[data-story-art]', { yPercent: 16, scale: 1.08, ease: 'none' }, 0)
					.to('[data-story-ornament="warm"]', { xPercent: -10, yPercent: 16, scale: 1.1, ease: 'none' }, 0)
					.to('[data-story-ornament="cool"]', { xPercent: 8, yPercent: -14, scale: 1.12, ease: 'none' }, 0);

				beats.forEach((_, index) => {
					const labelStart = index * 0.33;
					const cardStart = index * 0.33 + 0.03;

					timeline.to(labels[index], { autoAlpha: 1, x: 8, duration: 0.08 }, labelStart);
					timeline.to(cards[index], { autoAlpha: 1, yPercent: 0, duration: 0.12 }, cardStart);

					if (index < beats.length - 1) {
						timeline.to(cards[index], { autoAlpha: 0.14, yPercent: -12, duration: 0.12 }, cardStart + 0.2);
					}
				});

				return undefined;
			}

			gsap.fromTo(
				'[data-story-card]',
				{ autoAlpha: 0, y: 34 },
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.85,
					stagger: 0.12,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: sectionRef.current,
						start: 'top 74%',
						onEnter: revealStory,
					},
				},
			);

			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: 'center center',
				onEnter: showMidMessage,
			});

			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: 'bottom 40%',
				onEnter: showInteractionPrompt,
			});

			return undefined;
		},
		{ dependencies: [enablePin, interactionCompleted, prefersReducedMotion], scope: sectionRef },
	);

	return (
		<>
			<section id="story-section" ref={sectionRef} className="section-shell border-t border-white/10 bg-story-depth">
				<div className="absolute inset-0">
					<img data-story-art src="/sejarah-scroll.svg" alt="Stylized Sejarah backdrop" className="h-full w-full object-cover opacity-40" />
					<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,19,0.62),rgba(4,9,19,0.9)_100%)]"></div>
				</div>
				<div data-story-ornament="warm" className="absolute left-[-10rem] top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(244,193,122,0.16),transparent_68%)] blur-3xl"></div>
				<div data-story-ornament="cool" className="absolute right-[-8rem] top-1/3 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(146,185,255,0.18),transparent_70%)] blur-3xl"></div>

				<div ref={stickyRef} className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-24 md:px-10 lg:px-16 lg:py-28">
					<div className="grid w-full gap-10 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:items-center">
						<div className="relative z-10 space-y-7 lg:pr-10">
							<p className="eyebrow">Pilar 1 dari 5</p>
							<div className="space-y-5">
								<h2 className="font-display text-4xl leading-[0.92] text-mist sm:text-5xl lg:text-6xl">Sejarah: kota yang terus mengingat.</h2>
								<p className="max-w-xl text-base leading-relaxed text-mist/76 md:text-lg">
									Jogjakarsa akan bergerak melalui lima pilar. Vertical slice ini membuka satu pilar terlebih dahulu:
									sejarah, fondasi yang membuat lapisan lain terasa hidup.
								</p>
							</div>

							<div className="flex flex-wrap gap-3">
								{pillars.map((pillar) => {
									const isActive = pillar === 'Sejarah';

									return (
										<span
											key={pillar}
											className={`rounded-full px-4 py-2 text-sm ${isActive ? 'bg-mist text-ink' : 'glass-pill text-mist/66'}`.trim()}
										>
											{pillar}
										</span>
									);
								})}
							</div>

							<div className="glass-panel rounded-[1.8rem] p-5">
								<div className="grid gap-4 sm:grid-cols-2">
									<div>
										<p className="font-accent text-xs uppercase tracking-[0.24em] text-mist/44">Jejak waktu</p>
										<p className="mt-3 text-3xl text-mist">1755</p>
										<p className="mt-2 text-sm leading-relaxed text-mist/72">Tahun yang menandai bentuk baru Yogyakarta di ingatan Nusantara.</p>
									</div>
									<div>
										<p className="font-accent text-xs uppercase tracking-[0.24em] text-mist/44">Rasa ruang</p>
										<p className="mt-3 text-3xl text-mist">Hidup</p>
										<p className="mt-2 text-sm leading-relaxed text-mist/72">Sejarah hadir sebagai ruang yang masih dipakai, dilafalkan, dan dijaga.</p>
									</div>
								</div>
							</div>

							<div className="grid gap-5 lg:grid-cols-[auto_1fr]">
								<div className="relative hidden w-8 justify-center lg:flex">
									<div className="h-full w-px rounded-full bg-white/10"></div>
									<div data-story-progress className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-sun via-cypress to-lagoon" style={{ transform: 'scaleY(0)' }}></div>
								</div>

								<div className="space-y-4">
									{beats.map((beat, index) => {
										const isActive = index === activeIndex;

										return (
											<div key={beat.title} className="flex items-start gap-4">
												<div className={`mt-1.5 h-3 w-3 rounded-full ${isActive ? 'bg-sun' : 'bg-white/20'}`.trim()}></div>
												<div data-story-label className={isActive ? 'text-mist' : 'text-mist/42'}>
													<p className="font-accent text-xs uppercase tracking-[0.24em]">{beat.label}</p>
													<p className="mt-2 text-sm leading-relaxed md:text-base">{beat.title}</p>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>

						<div className="relative z-10 min-h-[30rem] lg:min-h-[35rem]">
							<div className="absolute inset-0 rounded-[2.4rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))] blur-3xl"></div>
							<div className={`relative grid gap-5 ${enablePin ? 'min-h-[35rem]' : ''}`.trim()}>
								{beats.map((beat) => (
									<article
										key={beat.title}
										data-story-card
										className={`glass-panel story-grid overflow-hidden rounded-[2.2rem] border border-white/10 p-7 md:p-8 ${enablePin ? 'absolute inset-0' : 'relative'}`.trim()}
									>
										<div className={`absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.02))]`}></div>
										<div className={`absolute inset-x-10 top-10 h-48 rounded-[2rem] bg-gradient-to-br ${beat.accent} blur-3xl opacity-30`}></div>
										<div className="relative flex h-full flex-col justify-between gap-8">
											<div>
												<p className="font-accent text-xs uppercase tracking-[0.24em] text-mist/46">{beat.label}</p>
												<h3 className="mt-4 max-w-2xl font-display text-3xl leading-[0.96] text-mist md:text-5xl">{beat.title}</h3>
												<p className="mt-5 max-w-xl text-base leading-relaxed text-mist/74 md:text-lg">{beat.copy}</p>
											</div>

											<div className="grid gap-4 md:grid-cols-[1.1fr_.9fr]">
												<div className="rounded-[1.6rem] border border-white/10 bg-[#081220]/68 p-5">
													<p className="font-accent text-xs uppercase tracking-[0.22em] text-mist/42">Catatan Awan</p>
													<p className="mt-4 text-sm leading-relaxed text-mist/74 md:text-base">{beat.note}</p>
												</div>

												<div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
													<p className="font-accent text-xs uppercase tracking-[0.22em] text-mist/42">Suasana</p>
													<div className="mt-4 h-28 rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))] p-4">
														<div className="grid h-full gap-3">
															<div className="h-2 rounded-full bg-white/10">
																<div className="h-full w-[78%] rounded-full bg-sun"></div>
															</div>
															<div className="h-2 rounded-full bg-white/10">
																<div className="h-full w-[62%] rounded-full bg-cypress"></div>
															</div>
															<div className="mt-auto text-xs uppercase tracking-[0.24em] text-mist/44">Sejarah bergerak perlahan</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</article>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="section-shell border-t border-white/10 bg-night px-6 py-24 md:px-10 lg:px-16 lg:py-32">
				<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] lg:items-end">
					<div className="space-y-6">
						<p className="eyebrow">Bab Pertama Selesai</p>
						<h2 className="max-w-3xl font-display text-4xl leading-[0.94] text-mist sm:text-5xl lg:text-6xl">
							Ini baru fondasi kami. Pilar lain masih menunggu untuk dibuka.
						</h2>
						<p className="max-w-2xl text-base leading-relaxed text-mist/74 md:text-lg">
							Setiap cerita akan membuka pintu ke cerita berikutnya. Vertical slice ini berhenti di Sejarah agar jejak pertamamu terasa utuh.
						</p>
					</div>

					<div className="glass-panel rounded-[2rem] p-8">
						<p className="font-accent text-xs uppercase tracking-[0.24em] text-mist/44">Setelah ini</p>
						<ul className="mt-5 space-y-3 text-sm leading-relaxed text-mist/72 md:text-base">
							<li>Budaya akan membuka ritme upacara, ruang, dan bahasa yang hidup.</li>
							<li>Kuliner akan bergerak melalui rasa, aroma, dan rute yang lebih intim.</li>
							<li>Lanskap dan inovasi akan memperlebar Jogja ke masa depan.</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	);
}