import { Compass, X } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { gsap, prefersReducedMotion } from '../../lib/gsap';

interface HeritageItem {
	id: number;
	label: string;
	title: string;
	period: string;
	imageUrl: string;
	description: string;
	tags: string[];
	coordinates: string;
}

const HERITAGE_ITEMS: HeritageItem[] = [
	{
		id: 1,
		label: 'Arsitektur',
		title: 'Borobudur',
		period: 'Abad ke-9 M',
		imageUrl: 'https://picsum.photos/seed/borobudur-temple/600/900',
		description:
			'Candi Buddha Mahayana terbesar di dunia, dirancang sebagai mandala vertikal yang menuntun ziarah dari kamadhatu menuju arupadhatu. Relief-reliefnya menyimpan kisah Karmawibhangga dan Lalitavistara yang dapat dibaca seperti gulungan batu.',
		tags: ['UNESCO 1991', 'Wangsa Syailendra', 'Magelang'],
		coordinates: '7.6079°S, 110.2038°E',
	},
	{
		id: 2,
		label: 'Istana',
		title: 'Keraton',
		period: 'Est. 1755',
		imageUrl: 'https://picsum.photos/seed/keraton-palace/600/900',
		description:
			'Kediaman Sultan Yogyakarta dan jantung budaya Mataram Islam yang masih dijaga sebagai institusi hidup. Tata ruangnya membaca sumbu imajiner Merapi–Laut Selatan sebagai filosofi keseimbangan kosmologis.',
		tags: ['Perjanjian Giyanti', 'Kasultanan', 'Sumbu Filosofis'],
		coordinates: '7.8053°S, 110.3642°E',
	},
	{
		id: 3,
		label: 'Kriya',
		title: 'Batik Tulis',
		period: 'UNESCO 2009',
		imageUrl: 'https://picsum.photos/seed/batik-textile/600/900',
		description:
			'Seni rupa tekstil dengan pola filosofis yang diturunkan turun-temurun. Setiap motif — Parang, Kawung, Sidomukti — membawa makna sosial, doa, dan tata laku yang menyertai pemakainya sepanjang siklus hidup.',
		tags: ['Warisan Tak Benda', 'Canting & Malam', 'Kriya Tangan'],
		coordinates: 'Kotagede & Imogiri',
	},
	{
		id: 4,
		label: 'Pertunjukan',
		title: 'Wayang Kulit',
		period: 'UNESCO 2003',
		imageUrl: 'https://picsum.photos/seed/wayang-shadow/600/900',
		description:
			'Teater bayangan yang mengangkat lakon Mahabharata dan Ramayana dalam dialog Jawa. Dalang berperan sebagai narator, sutradara, dan pengrawit sekaligus, ditopang gamelan dan tembang yang berlangsung semalam suntuk.',
		tags: ['Mahabharata', 'Gamelan', 'Tradisi Lisan'],
		coordinates: 'Pakeliran Jawa',
	},
	{
		id: 5,
		label: 'Candi',
		title: 'Prambanan',
		period: 'Abad ke-9 M',
		imageUrl: '/prambanan-sunrise.webp',
		description:
			'Kompleks candi Hindu termegah di Indonesia, persembahan untuk Trimurti — Brahma, Wisnu, Siwa. Relief Ramayana melingkari pelataran utama, menjadi panggung paling agung dari kisah Rama dan Sinta dalam batu.',
		tags: ['UNESCO 1991', 'Trimurti', 'Sleman'],
		coordinates: '7.7520°S, 110.4915°E',
	},
];

interface AccordionItemProps {
	item: HeritageItem;
	isActive: boolean;
	isHidden: boolean;
	onHover: () => void;
	onOpen: (item: HeritageItem, imgEl: HTMLImageElement) => void;
}

function AccordionItem({ item, isActive, isHidden, onHover, onOpen }: AccordionItemProps) {
	const imgRef = useRef<HTMLImageElement>(null);

	return (
		<button
			type="button"
			className="relative flex-shrink-0 overflow-hidden rounded-[1.25rem] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-sun/40"
			style={{
				height: '390px',
				width: isActive ? '290px' : '46px',
				transition: 'width 380ms cubic-bezier(0.4, 0, 0.2, 1), opacity 220ms ease',
				border: isActive
					? '1px solid rgba(244,193,122,0.28)'
					: '1px solid rgba(244,239,231,0.07)',
				opacity: isHidden ? 0 : 1,
				pointerEvents: isHidden ? 'none' : 'auto',
			}}
			onMouseEnter={onHover}
			onClick={() => {
				if (imgRef.current) onOpen(item, imgRef.current);
			}}
			aria-label={`Buka detail ${item.title}`}
		>
			<img
				ref={imgRef}
				src={item.imageUrl}
				alt={item.title}
				loading="lazy"
				decoding="async"
				className="absolute inset-0 h-full w-full object-cover"
				style={{
					transition: 'transform 480ms cubic-bezier(0.4, 0, 0.2, 1)',
					transform: isActive ? 'scale(1.0)' : 'scale(1.08)',
				}}
				onError={(e) => {
					(e.target as HTMLImageElement).src =
						`https://placehold.co/600x900/040913/f4efe7?text=${encodeURIComponent(item.title)}`;
				}}
			/>

			<div
				className="absolute inset-0"
				style={{
					background: `rgba(4,9,19,${isActive ? 0.3 : 0.7})`,
					transition: 'background 380ms ease',
				}}
			/>

			<div
				className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(244,193,122,0.14),transparent_55%)]"
				style={{
					opacity: isActive ? 1 : 0,
					transition: 'opacity 600ms ease',
				}}
			/>

			<div
				className="absolute inset-x-0 bottom-0 p-5"
				style={{
					opacity: isActive ? 1 : 0,
					transform: isActive ? 'translateY(0)' : 'translateY(8px)',
					transition: 'opacity 380ms ease, transform 380ms ease',
					transitionDelay: isActive ? '260ms' : '0ms',
				}}
			>
				<p className="font-accent text-[0.58rem] uppercase tracking-[0.28em] text-sun/65 mb-1.5">
					{item.label}
				</p>
				<h3 className="font-display text-2xl leading-none text-mist">{item.title}</h3>
				<p className="mt-1.5 font-accent text-[0.66rem] uppercase tracking-[0.2em] text-mist/46">
					{item.period}
				</p>
			</div>

			<div
				className="absolute inset-0 flex items-center justify-center"
				style={{
					opacity: isActive ? 0 : 1,
					transition: 'opacity 300ms ease',
				}}
			>
				<p
					className="font-display text-[0.82rem] text-mist/52 whitespace-nowrap"
					style={{
						writingMode: 'vertical-rl',
						textOrientation: 'mixed',
						letterSpacing: '0.16em',
					}}
				>
					{item.title}
				</p>
			</div>
		</button>
	);
}

interface HeritageModalProps {
	item: HeritageItem;
	sourceRect: DOMRect;
	onClose: () => void;
}

function HeritageModal({ item, sourceRect, onClose }: HeritageModalProps) {
	const backdropRef = useRef<HTMLDivElement>(null);
	const imageFrameRef = useRef<HTMLDivElement>(null);
	const imageOverlayRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const closingRef = useRef(false);

	const playOpenAnimation = useCallback(() => {
		const frame = imageFrameRef.current;
		const backdrop = backdropRef.current;
		const content = contentRef.current;
		const overlay = imageOverlayRef.current;
		if (!frame || !backdrop || !content || !overlay) return;

		if (prefersReducedMotion()) {
			gsap.set([backdrop, content, overlay], { autoAlpha: 1 });
			return;
		}

		const target = frame.getBoundingClientRect();
		const dx = sourceRect.left - target.left;
		const dy = sourceRect.top - target.top;
		const sx = sourceRect.width / target.width;
		const sy = sourceRect.height / target.height;

		// Position the image frame so it visually overlaps the accordion item.
		gsap.set(frame, {
			x: dx,
			y: dy,
			scaleX: sx,
			scaleY: sy,
			transformOrigin: 'top left',
			borderRadius: '20px',
			willChange: 'transform',
		});
		gsap.set(backdrop, { autoAlpha: 0 });
		gsap.set(overlay, { autoAlpha: 0 });
		gsap.set(content, { autoAlpha: 0, y: 22 });

		// Smooth premium ease — fast out, slow settle (Apple-style)
		const morphEase = 'expo.out';

		const tl = gsap.timeline({
			defaults: { overwrite: 'auto' },
			onComplete: () => {
				// Free GPU memory once the morph has settled.
				gsap.set(frame, { willChange: 'auto' });
			},
		});

		// Backdrop blooms in first to set the stage.
		tl.to(backdrop, { autoAlpha: 1, duration: 0.65, ease: 'power2.out' }, 0);

		// The hero morph — long, deliberate, decelerating.
		tl.to(
			frame,
			{
				x: 0,
				y: 0,
				scaleX: 1,
				scaleY: 1,
				borderRadius: '28px',
				duration: 1.05,
				ease: morphEase,
			},
			0.05,
		);

		// Overlays bloom in over the second half of the morph.
		tl.to(overlay, { autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 0.55);

		// Content panel slides up after the image has nearly settled.
		tl.to(
			content,
			{
				autoAlpha: 1,
				y: 0,
				duration: 0.75,
				ease: 'power3.out',
			},
			0.62,
		);
	}, [sourceRect]);

	const handleClose = useCallback(() => {
		if (closingRef.current) return;
		closingRef.current = true;

		const frame = imageFrameRef.current;
		const backdrop = backdropRef.current;
		const content = contentRef.current;
		const overlay = imageOverlayRef.current;

		if (!frame || !backdrop || !content || !overlay || prefersReducedMotion()) {
			onClose();
			return;
		}

		const target = frame.getBoundingClientRect();
		const dx = sourceRect.left - target.left;
		const dy = sourceRect.top - target.top;
		const sx = sourceRect.width / target.width;
		const sy = sourceRect.height / target.height;

		gsap.set(frame, { willChange: 'transform' });

		const tl = gsap.timeline({
			defaults: { overwrite: 'auto' },
			onComplete: onClose,
		});

		// Content panel slips down first to clear the stage.
		tl.to(content, { autoAlpha: 0, y: 14, duration: 0.4, ease: 'power2.in' }, 0);
		tl.to(overlay, { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 0.02);

		// The image gently returns to its accordion home.
		tl.to(
			frame,
			{
				x: dx,
				y: dy,
				scaleX: sx,
				scaleY: sy,
				borderRadius: '20px',
				duration: 0.85,
				ease: 'expo.inOut',
			},
			0.1,
		);

		// Backdrop fades last so the image lands against a stable surface.
		tl.to(backdrop, { autoAlpha: 0, duration: 0.55, ease: 'power2.in' }, 0.35);
	}, [sourceRect, onClose]);

	useLayoutEffect(() => {
		playOpenAnimation();
	}, [playOpenAnimation]);

	useEffect(() => {
		const root = document.documentElement;
		const prevOverflow = root.style.overflow;
		root.style.overflow = 'hidden';

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};
		window.addEventListener('keydown', onKey);

		return () => {
			root.style.overflow = prevOverflow;
			window.removeEventListener('keydown', onKey);
		};
	}, [handleClose]);

	return (
		<div className="fixed inset-0 z-[120]" role="dialog" aria-modal="true" aria-label={item.title}>
			<div
				ref={backdropRef}
				className="absolute inset-0"
				style={{
					background: 'rgba(4,9,19,0.82)',
					backdropFilter: 'blur(10px)',
				}}
				onClick={handleClose}
			/>

			<div className="relative h-full w-full flex items-center justify-center px-4 py-6 sm:px-8 sm:py-10 lg:px-14 lg:py-12">
				<div className="relative grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] lg:gap-10">
					{/* Image card (FLIP target) */}
					<div
						ref={imageFrameRef}
						className="relative overflow-hidden bg-night"
						style={{
							height: 'min(82vh, 760px)',
							borderRadius: '24px',
							border: '1px solid rgba(244,193,122,0.18)',
							boxShadow: '0 28px 80px rgba(0,0,0,0.55)',
						}}
					>
						<img
							src={item.imageUrl}
							alt={item.title}
							className="absolute inset-0 h-full w-full object-cover"
							onError={(e) => {
								(e.target as HTMLImageElement).src =
									`https://placehold.co/1200x1500/040913/f4efe7?text=${encodeURIComponent(item.title)}`;
							}}
						/>

						<div
							ref={imageOverlayRef}
							className="absolute inset-0"
						>
							<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(244,193,122,0.22),transparent_55%)]" />
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,9,19,0.05),rgba(4,9,19,0.88)_82%)]" />

							{/* Top meta */}
							<div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 lg:p-8">
								<div className="heritage-mark flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.28em] text-sun/80">
									<Compass className="h-3 w-3" strokeWidth={1.8} />
									<span>{item.coordinates}</span>
								</div>
							</div>

							{/* Bottom title block */}
							<div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
								<p className="font-accent text-[0.62rem] uppercase tracking-[0.32em] text-sun/72 mb-3">
									{item.label}
								</p>
								<h2 className="font-display text-4xl leading-[0.92] text-mist sm:text-5xl lg:text-6xl">
									{item.title}
								</h2>
								<p className="mt-3 font-accent text-[0.68rem] uppercase tracking-[0.24em] text-mist/52">
									{item.period}
								</p>
							</div>
						</div>
					</div>

					{/* Content panel */}
					<div
						ref={contentRef}
						className="flex flex-col gap-7 self-stretch py-2 lg:py-4"
					>
						<div className="space-y-4">
							<p className="eyebrow">Detail Pameran</p>
							<p className="text-base leading-relaxed text-mist/78 lg:text-[1.05rem]">
								{item.description}
							</p>
						</div>

						<div className="space-y-3">
							<p className="text-[0.6rem] uppercase tracking-[0.28em] text-mist/40">Penanda</p>
							<div className="flex flex-wrap gap-2">
								{item.tags.map((tag) => (
									<span
										key={tag}
										className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-mist/72"
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						<div className="mt-auto flex flex-col gap-3 border-t border-white/[0.08] pt-6">
							<a
								href={`#${item.title.toLowerCase().replace(/\s+/g, '-')}`}
								className="group inline-flex items-center justify-between rounded-full bg-mist px-6 py-3.5 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
							>
								<span>Jelajahi Lebih Dalam</span>
								<span className="font-display text-base text-ink/70 transition-transform duration-300 group-hover:translate-x-1">
									→
								</span>
							</a>
							<button
								type="button"
								onClick={handleClose}
								className="text-[0.66rem] uppercase tracking-[0.28em] text-mist/46 transition-colors hover:text-mist/80"
							>
								Tutup tampilan
							</button>
						</div>
					</div>
				</div>

				<button
					type="button"
					onClick={handleClose}
					className="heritage-mark absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full text-mist/60 transition-colors hover:text-mist sm:right-8 sm:top-8"
					aria-label="Tutup modal"
				>
					<X className="h-4 w-4" strokeWidth={1.6} />
				</button>
			</div>
		</div>
	);
}

export function HeritageAccordion() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [modalState, setModalState] = useState<{ item: HeritageItem; sourceRect: DOMRect } | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleOpen = (item: HeritageItem, imgEl: HTMLImageElement) => {
		const rect = imgEl.getBoundingClientRect();
		setModalState({ item, sourceRect: rect });
	};

	const handleClose = () => {
		setModalState(null);
	};

	return (
		<>
			<div className="flex flex-row items-center gap-2">
				{HERITAGE_ITEMS.map((item, index) => (
					<AccordionItem
						key={item.id}
						item={item}
						isActive={index === activeIndex}
						isHidden={modalState?.item.id === item.id}
						onHover={() => setActiveIndex(index)}
						onOpen={handleOpen}
					/>
				))}
			</div>

			{mounted && modalState
				? createPortal(
						<HeritageModal
							key={modalState.item.id}
							item={modalState.item}
							sourceRect={modalState.sourceRect}
							onClose={handleClose}
						/>,
						document.body,
					)
				: null}
		</>
	);
}