import { CustomEase } from 'gsap/CustomEase';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { navItems } from '../data/landing';
import { gsap, prefersReducedMotion } from '../lib/gsap';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(CustomEase);
}

export default function SiteNavbar() {
	const containerRef = useRef<HTMLDivElement>(null);
	const hasOpenedRef = useRef(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Scroll detection
	useEffect(() => {
		const onScroll = () => setIsScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// Setup: CustomEase + shape hover effects
	useEffect(() => {
		if (!containerRef.current) return;

		try {
			CustomEase.create('karsa', '0.65, 0.01, 0.05, 0.99');
			gsap.defaults({ ease: 'karsa', duration: 0.7 });
		} catch {
			gsap.defaults({ ease: 'power2.out', duration: 0.7 });
		}

		const ctx = gsap.context(() => {
			// Hide all shape elements on init
			gsap.set(containerRef.current!.querySelectorAll('.shape-element'), {
				opacity: 0,
				scale: 0,
			});

			const menuItems = containerRef.current!.querySelectorAll('.menu-list-item[data-shape]');
			const shapesContainer = containerRef.current!.querySelector('.ambient-background-shapes');

			menuItems.forEach((item) => {
				const idx = item.getAttribute('data-shape');
				const shape = shapesContainer?.querySelector(`.bg-shape-${idx}`);
				if (!shape) return;
				const els = shape.querySelectorAll('.shape-element');

				const onEnter = () => {
					shapesContainer?.querySelectorAll('.bg-shape').forEach((s) => s.classList.remove('active'));
					shape.classList.add('active');
					gsap.fromTo(
						els,
						{ scale: 0.45, opacity: 0, rotation: -8 },
						{ scale: 1, opacity: 1, rotation: 0, duration: 0.65, stagger: 0.07, ease: 'back.out(1.5)', overwrite: 'auto' },
					);
				};

				const onLeave = () => {
					gsap.to(els, {
						scale: 0.8,
						opacity: 0,
						duration: 0.3,
						ease: 'power2.in',
						onComplete: () => shape.classList.remove('active'),
						overwrite: 'auto',
					});
				};

				item.addEventListener('mouseenter', onEnter);
				item.addEventListener('mouseleave', onLeave);
				(item as any)._cleanup = () => {
					item.removeEventListener('mouseenter', onEnter);
					item.removeEventListener('mouseleave', onLeave);
				};
			});
		}, containerRef);

		return () => {
			ctx.revert();
			containerRef.current?.querySelectorAll('.menu-list-item[data-shape]').forEach((item: any) => item._cleanup?.());
		};
	}, []);

	// Menu open/close animation
	useEffect(() => {
		if (!containerRef.current) return;

		// Skip close animation on initial mount — nothing is open yet
		if (!isMenuOpen && !hasOpenedRef.current) return;
		if (isMenuOpen) hasOpenedRef.current = true;

		const reduced = prefersReducedMotion();
		const el = containerRef.current;

		const wrap = el.querySelector('.nav-overlay-wrapper');
		const panel = el.querySelector('.menu-content');
		const overlay = el.querySelector('.menu-overlay');
		const links = el.querySelectorAll('.nav-link');
		const fades = el.querySelectorAll('[data-menu-fade]');
		const menuBtn = el.querySelector('.kinetic-menu-btn');
		const btnTexts = menuBtn ? Array.from(menuBtn.querySelectorAll('.btn-text')) : [];
		const btnIcon = menuBtn?.querySelector('.btn-icon') ?? null;

		const tl = gsap.timeline();

		if (isMenuOpen) {
			wrap?.setAttribute('data-nav', 'open');

			if (reduced) {
				gsap.set(wrap, { display: 'block' });
				return;
			}

			tl.set(wrap, { display: 'block' })
				.set(panel, { xPercent: 100 })
				.fromTo(btnTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.12, duration: 0.45, ease: 'power2.inOut' })
				.fromTo(btnIcon, { rotate: 0 }, { rotate: 315, duration: 0.5, ease: 'power2.inOut' }, '<')
				.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55 }, '<')
				.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.72, ease: 'power3.inOut' }, '<+=0.04')
				.fromTo(
					links,
					{ yPercent: 140, rotate: 8, opacity: 0 },
					{ yPercent: 0, rotate: 0, opacity: 1, stagger: 0.07, duration: 0.65 },
					'<+=0.3',
				);

			if (fades.length) {
				tl.fromTo(
					fades,
					{ autoAlpha: 0, yPercent: 35 },
					{ autoAlpha: 1, yPercent: 0, stagger: 0.05, duration: 0.5, clearProps: 'all' },
					'<+=0.1',
				);
			}
		} else {
			wrap?.setAttribute('data-nav', 'closed');

			if (reduced) {
				gsap.set(wrap, { display: 'none' });
				return;
			}

			tl.to(overlay, { autoAlpha: 0, duration: 0.4 })
				.to(panel, { xPercent: 108, duration: 0.55, ease: 'power3.inOut' }, '<')
				.to(btnTexts, { yPercent: 0, duration: 0.4, ease: 'power2.inOut' }, '<+=0.08')
				.to(btnIcon, { rotate: 0, duration: 0.4, ease: 'power2.inOut' }, '<')
				.set(wrap, { display: 'none' });
		}

		return () => { tl.kill(); };
	}, [isMenuOpen]);

	// Escape key
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
		};
		window.addEventListener('keydown', handler);
		return () => window.removeEventListener('keydown', handler);
	}, [isMenuOpen]);

	return (
		<div ref={containerRef}>
			{/* Fixed Header */}
			<header className="pointer-events-none fixed inset-x-0 top-0 z-[80] px-6 py-5 sm:px-10">
				<div
					className="absolute inset-0 transition-opacity duration-700"
					style={{
						background: 'linear-gradient(180deg, rgba(4,9,19,0.68) 0%, transparent 100%)',
						opacity: isScrolled ? 1 : 0,
					}}
				/>
				<div className="relative mx-auto flex max-w-7xl items-center justify-between">
					{/* Logo */}
					<a href="#top" className="pointer-events-auto group flex items-center gap-3">
						<div className="heritage-mark flex h-10 w-10 items-center justify-center rounded-full text-sun transition-all duration-500 group-hover:shadow-[0_0_28px_rgba(244,193,122,0.32)]">
							<Sparkles className="h-4 w-4" strokeWidth={1.8} />
						</div>
						<div>
							<p className="font-display text-xl leading-none text-mist">jogjakarsa.id</p>
							<p className="mt-1 text-[0.62rem] uppercase tracking-[0.3em] text-mist/40">Digital Heritage</p>
						</div>
					</a>

					{/* Kinetic Menu Button */}
					<button
						type="button"
						onClick={() => setIsMenuOpen((v) => !v)}
						className="kinetic-menu-btn pointer-events-auto relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.08]"
						aria-label="Toggle navigation"
						aria-expanded={isMenuOpen}
					>
						{/* Text swap area */}
						<div className="nav-btn-text-wrap relative h-[1.05rem] overflow-hidden">
							<span className="btn-text block leading-[1.05rem] text-[0.68rem] uppercase tracking-[0.24em] text-mist/60">Menu</span>
							<span className="btn-text block leading-[1.05rem] text-[0.68rem] uppercase tracking-[0.24em] text-mist/60">Tutup</span>
						</div>

						{/* Plus / Cross icon */}
						<div className="btn-icon flex-shrink-0 text-mist/50">
							<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16" fill="none">
								<path d="M7.33333 16L7.33333 0L8.66667 0L8.66667 16L7.33333 16Z" fill="currentColor" />
								<path d="M16 8.66667L0 8.66667L0 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
								<path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor" />
								<path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor" />
								<path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor" />
								<path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor" />
							</svg>
						</div>
					</button>
				</div>
			</header>

			{/* Fullscreen Menu Overlay */}
			<div data-nav="closed" className="nav-overlay-wrapper fixed inset-0 z-[90] hidden" role="dialog" aria-modal="true" aria-label="Site navigation">
				{/* Dimming backdrop */}
				<div className="menu-overlay absolute inset-0" style={{ background: 'rgba(4,9,19,0.52)' }} onClick={() => setIsMenuOpen(false)} />

				{/* Slide-in panel */}
				<nav className="menu-content absolute inset-y-0 right-0 w-full overflow-hidden md:w-[60vw] lg:w-[54vw]">
					{/* Layered background */}
					<div className="menu-bg absolute inset-0">
						<div className="backdrop-layer first absolute inset-0" style={{ background: 'rgb(5,10,20)' }} />
						<div
							className="backdrop-layer second absolute inset-0"
							style={{
								background: 'linear-gradient(148deg, rgba(244,193,122,0.055) 0%, rgba(146,185,255,0.032) 55%, transparent 100%)',
							}}
						/>
						<div className="backdrop-layer absolute inset-0 backdrop-blur-[1.5px]" />

						{/* Heritage SVG shapes */}
						<div className="ambient-background-shapes absolute inset-0 overflow-hidden">
							{/* Shape 1 — Kawung concentric circles (Jogja) */}
							<svg className="bg-shape bg-shape-1 absolute inset-0 h-full w-full" viewBox="0 0 560 820" fill="none" preserveAspectRatio="xMidYMid slice">
								<circle className="shape-element" cx="140" cy="220" r="104" stroke="rgba(244,193,122,0.14)" strokeWidth="1" fill="none" />
								<circle className="shape-element" cx="140" cy="220" r="70" stroke="rgba(244,193,122,0.1)" strokeWidth="1" fill="none" />
								<circle className="shape-element" cx="140" cy="220" r="38" stroke="rgba(244,193,122,0.16)" strokeWidth="1" fill="rgba(244,193,122,0.04)" />
								<circle className="shape-element" cx="140" cy="220" r="12" fill="rgba(244,193,122,0.18)" />
								<circle className="shape-element" cx="425" cy="150" r="78" stroke="rgba(210,122,87,0.12)" strokeWidth="1" fill="none" />
								<circle className="shape-element" cx="425" cy="150" r="46" fill="rgba(210,122,87,0.05)" />
								<circle className="shape-element" cx="490" cy="645" r="112" stroke="rgba(244,193,122,0.09)" strokeWidth="1" fill="none" />
								<circle className="shape-element" cx="490" cy="645" r="68" fill="rgba(244,193,122,0.04)" />
								<circle className="shape-element" cx="68" cy="578" r="44" stroke="rgba(210,122,87,0.12)" strokeWidth="1" fill="none" />
							</svg>

							{/* Shape 2 — Parang waves (Sejarah) */}
							<svg className="bg-shape bg-shape-2 absolute inset-0 h-full w-full" viewBox="0 0 560 820" fill="none" preserveAspectRatio="xMidYMid slice">
								<path className="shape-element" d="M-60 275 Q80 160, 230 275 Q380 390, 530 275 Q680 160, 830 275" stroke="rgba(146,185,255,0.17)" strokeWidth="52" fill="none" strokeLinecap="round" />
								<path className="shape-element" d="M-60 430 Q80 315, 230 430 Q380 545, 530 430 Q680 315, 830 430" stroke="rgba(125,197,173,0.13)" strokeWidth="36" fill="none" strokeLinecap="round" />
								<path className="shape-element" d="M-60 580 Q80 465, 230 580 Q380 695, 530 580" stroke="rgba(146,185,255,0.09)" strokeWidth="24" fill="none" strokeLinecap="round" />
								<path className="shape-element" d="M-60 175 Q80 60, 230 175 Q380 290, 530 175" stroke="rgba(146,185,255,0.07)" strokeWidth="18" fill="none" strokeLinecap="round" />
							</svg>

							{/* Shape 3 — Constellation / Aksara dots (Budaya) */}
							<svg className="bg-shape bg-shape-3 absolute inset-0 h-full w-full" viewBox="0 0 560 820" fill="none" preserveAspectRatio="xMidYMid slice">
								<circle className="shape-element" cx="100" cy="155" r="5" fill="rgba(244,193,122,0.52)" />
								<circle className="shape-element" cx="215" cy="108" r="7" fill="rgba(244,193,122,0.42)" />
								<circle className="shape-element" cx="362" cy="182" r="4.5" fill="rgba(210,122,87,0.46)" />
								<circle className="shape-element" cx="492" cy="138" r="5.5" fill="rgba(244,193,122,0.36)" />
								<circle className="shape-element" cx="158" cy="355" r="9" fill="rgba(146,185,255,0.34)" />
								<circle className="shape-element" cx="312" cy="308" r="5.5" fill="rgba(244,193,122,0.4)" />
								<circle className="shape-element" cx="458" cy="382" r="6.5" fill="rgba(125,197,173,0.38)" />
								<circle className="shape-element" cx="76" cy="512" r="4.5" fill="rgba(210,122,87,0.38)" />
								<circle className="shape-element" cx="264" cy="490" r="7.5" fill="rgba(244,193,122,0.34)" />
								<circle className="shape-element" cx="418" cy="532" r="5.5" fill="rgba(146,185,255,0.34)" />
								<circle className="shape-element" cx="522" cy="470" r="4.5" fill="rgba(244,193,122,0.38)" />
								<circle className="shape-element" cx="132" cy="658" r="5.5" fill="rgba(125,197,173,0.34)" />
								<circle className="shape-element" cx="338" cy="688" r="6.5" fill="rgba(210,122,87,0.32)" />
								<line className="shape-element" x1="100" y1="155" x2="215" y2="108" stroke="rgba(244,193,122,0.14)" strokeWidth="0.8" />
								<line className="shape-element" x1="215" y1="108" x2="362" y2="182" stroke="rgba(244,193,122,0.11)" strokeWidth="0.8" />
								<line className="shape-element" x1="362" y1="182" x2="492" y2="138" stroke="rgba(210,122,87,0.1)" strokeWidth="0.8" />
								<line className="shape-element" x1="158" y1="355" x2="312" y2="308" stroke="rgba(146,185,255,0.12)" strokeWidth="0.8" />
								<line className="shape-element" x1="312" y1="308" x2="458" y2="382" stroke="rgba(125,197,173,0.11)" strokeWidth="0.8" />
								<line className="shape-element" x1="76" y1="512" x2="264" y2="490" stroke="rgba(210,122,87,0.1)" strokeWidth="0.8" />
								<line className="shape-element" x1="264" y1="490" x2="418" y2="532" stroke="rgba(146,185,255,0.1)" strokeWidth="0.8" />
							</svg>

							{/* Shape 4 — Merapi mountain silhouette (Wisata) */}
							<svg className="bg-shape bg-shape-4 absolute inset-0 h-full w-full" viewBox="0 0 560 820" fill="none" preserveAspectRatio="xMidYMid slice">
								<path className="shape-element" d="M28 720 L192 338 L312 510 L408 262 L542 720 Z" fill="rgba(244,193,122,0.055)" stroke="rgba(244,193,122,0.14)" strokeWidth="1" strokeLinejoin="round" />
								<path className="shape-element" d="M82 720 L244 415 L342 558 L432 378 L520 720 Z" fill="rgba(210,122,87,0.04)" stroke="rgba(210,122,87,0.09)" strokeWidth="1" strokeLinejoin="round" />
								<circle className="shape-element" cx="408" cy="262" r="36" fill="rgba(244,193,122,0.1)" />
								<circle className="shape-element" cx="408" cy="262" r="19" fill="rgba(244,193,122,0.15)" />
								<circle className="shape-element" cx="408" cy="262" r="7" fill="rgba(244,193,122,0.32)" />
							</svg>

							{/* Shape 5 — Ceplok batik floral (Kuliner) */}
							<svg className="bg-shape bg-shape-5 absolute inset-0 h-full w-full" viewBox="0 0 560 820" fill="none" preserveAspectRatio="xMidYMid slice">
								<path className="shape-element" d="M280 408 Q325 345, 378 408 Q325 472, 280 408" fill="rgba(125,197,173,0.15)" />
								<path className="shape-element" d="M280 408 Q235 345, 182 408 Q235 472, 280 408" fill="rgba(125,197,173,0.15)" />
								<path className="shape-element" d="M280 408 Q345 368, 280 315 Q215 368, 280 408" fill="rgba(125,197,173,0.12)" />
								<path className="shape-element" d="M280 408 Q345 448, 280 502 Q215 448, 280 408" fill="rgba(125,197,173,0.12)" />
								<circle className="shape-element" cx="280" cy="408" r="25" fill="rgba(125,197,173,0.2)" />
								<circle className="shape-element" cx="280" cy="408" r="11" fill="rgba(125,197,173,0.32)" />
								<circle className="shape-element" cx="128" cy="238" r="42" stroke="rgba(125,197,173,0.15)" strokeWidth="1" fill="rgba(125,197,173,0.04)" />
								<circle className="shape-element" cx="128" cy="238" r="20" fill="rgba(125,197,173,0.1)" />
								<circle className="shape-element" cx="462" cy="612" r="54" stroke="rgba(146,185,255,0.14)" strokeWidth="1" fill="rgba(146,185,255,0.04)" />
								<circle className="shape-element" cx="462" cy="612" r="25" fill="rgba(146,185,255,0.09)" />
								<path className="shape-element" d="M462 582 Q485 558, 508 582 Q485 606, 462 582" fill="rgba(125,197,173,0.1)" />
								<path className="shape-element" d="M462 582 Q439 558, 416 582 Q439 606, 462 582" fill="rgba(125,197,173,0.1)" />
							</svg>

							{/* Shape 6 — Lereng diagonal batik + diamonds (Teknologi) */}
							<svg className="bg-shape bg-shape-6 absolute inset-0 h-full w-full" viewBox="0 0 560 820" fill="none" preserveAspectRatio="xMidYMid slice">
								<line className="shape-element" x1="-80" y1="260" x2="460" y2="800" stroke="rgba(146,185,255,0.13)" strokeWidth="30" strokeLinecap="round" />
								<line className="shape-element" x1="80" y1="80" x2="620" y2="620" stroke="rgba(244,193,122,0.09)" strokeWidth="22" strokeLinecap="round" />
								<line className="shape-element" x1="232" y1="18" x2="662" y2="448" stroke="rgba(125,197,173,0.09)" strokeWidth="18" strokeLinecap="round" />
								<rect className="shape-element" x="0" y="0" width="34" height="34" fill="rgba(146,185,255,0.14)" transform="translate(76,196) rotate(45)" />
								<rect className="shape-element" x="0" y="0" width="26" height="26" fill="rgba(244,193,122,0.16)" transform="translate(270,350) rotate(45)" />
								<rect className="shape-element" x="0" y="0" width="30" height="30" fill="rgba(125,197,173,0.13)" transform="translate(403,486) rotate(45)" />
								<rect className="shape-element" x="0" y="0" width="18" height="18" fill="rgba(146,185,255,0.17)" transform="translate(173,538) rotate(45)" />
								<rect className="shape-element" x="0" y="0" width="22" height="22" fill="rgba(244,193,122,0.13)" transform="translate(478,198) rotate(45)" />
							</svg>
						</div>

						{/* Left-edge gold accent border */}
						<div
							className="absolute inset-y-0 left-0 w-px"
							style={{
								background: 'linear-gradient(180deg, transparent 0%, rgba(244,193,122,0.28) 28%, rgba(244,193,122,0.14) 72%, transparent 100%)',
							}}
						/>

						{/* Grain overlay for texture */}
						<div className="story-grain absolute inset-0" />
					</div>

					{/* Panel close button */}
					<button
						type="button"
						onClick={() => setIsMenuOpen(false)}
						className="absolute right-7 top-7 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-mist/40 transition-colors hover:text-mist/70"
						aria-label="Close menu"
						data-menu-fade
					>
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
							<path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
						</svg>
					</button>

					{/* Panel content */}
					<div className="relative z-10 flex h-full flex-col justify-between px-10 py-14 md:px-14 lg:px-16">
						{/* Logo inside panel */}
						<div>
							<a href="#top" onClick={() => setIsMenuOpen(false)} className="group mb-14 inline-flex items-center gap-3" data-menu-fade>
								<div className="heritage-mark flex h-9 w-9 items-center justify-center rounded-full text-sun">
									<Sparkles className="h-3.5 w-3.5" strokeWidth={1.8} />
								</div>
								<div>
									<p className="font-display text-lg leading-none text-mist/80 transition-colors duration-300 group-hover:text-mist">jogjakarsa.id</p>
									<p className="mt-0.5 text-[0.58rem] uppercase tracking-[0.3em] text-mist/32">Digital Heritage</p>
								</div>
							</a>

							{/* Nav links */}
							<ul className="menu-list space-y-0.5">
								{navItems.map((item, i) => (
									<li key={item} className="menu-list-item" data-shape={String(i + 1)}>
										<a href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="nav-link group flex items-baseline gap-5 py-2 pr-4">
											<span className="w-7 flex-shrink-0 text-[0.58rem] uppercase tracking-[0.22em] text-mist/25 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
											<span className="nav-link-text font-display text-[2.85rem] leading-none text-mist/72 transition-colors duration-500 group-hover:text-mist md:text-[3.25rem] lg:text-[3.6rem]">
												{item}
											</span>
										</a>
									</li>
								))}
							</ul>
						</div>

						{/* Panel footer */}
						<div className="flex items-end justify-between border-t border-white/[0.07] pt-6" data-menu-fade>
							<div>
								<p className="mb-1 text-[0.58rem] uppercase tracking-[0.24em] text-mist/28">Lokasi</p>
								<p className="font-display text-sm text-mist/48">Yogyakarta, Indonesia</p>
							</div>
							<div className="text-right">
								<p className="mb-1 text-[0.58rem] uppercase tracking-[0.24em] text-mist/28">Mode</p>
								<p className="font-display text-sm text-mist/48">Exhibition Mode</p>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}
