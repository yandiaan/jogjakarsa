import { useState } from 'react';

interface HeritageItem {
	id: number;
	label: string;
	title: string;
	period: string;
	imageUrl: string;
}

const HERITAGE_ITEMS: HeritageItem[] = [
	{
		id: 1,
		label: 'Arsitektur',
		title: 'Borobudur',
		period: 'Abad ke-9 M',
		imageUrl: 'https://picsum.photos/seed/borobudur-temple/600/900',
	},
	{
		id: 2,
		label: 'Istana',
		title: 'Keraton',
		period: 'Est. 1755',
		imageUrl: 'https://picsum.photos/seed/keraton-palace/600/900',
	},
	{
		id: 3,
		label: 'Kriya',
		title: 'Batik Tulis',
		period: 'UNESCO 2009',
		imageUrl: 'https://picsum.photos/seed/batik-textile/600/900',
	},
	{
		id: 4,
		label: 'Pertunjukan',
		title: 'Wayang Kulit',
		period: 'UNESCO 2003',
		imageUrl: 'https://picsum.photos/seed/wayang-shadow/600/900',
	},
	{
		id: 5,
		label: 'Candi',
		title: 'Prambanan',
		period: 'Abad ke-9 M',
		imageUrl: '/prambanan-sunrise.webp',
	},
];

interface AccordionItemProps {
	item: HeritageItem;
	isActive: boolean;
	onHover: () => void;
}

function AccordionItem({ item, isActive, onHover }: AccordionItemProps) {
	return (
		<div
			className="relative flex-shrink-0 overflow-hidden rounded-[1.25rem] cursor-pointer"
			style={{
				height: '390px',
				width: isActive ? '290px' : '46px',
				transition: 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)',
				border: isActive
					? '1px solid rgba(244,193,122,0.28)'
					: '1px solid rgba(244,239,231,0.07)',
			}}
			onMouseEnter={onHover}
		>
			{/* Background image */}
			<img
				src={item.imageUrl}
				alt={item.title}
				className="absolute inset-0 h-full w-full object-cover"
				style={{
					transition: 'transform 800ms cubic-bezier(0.4, 0, 0.2, 1)',
					transform: isActive ? 'scale(1.0)' : 'scale(1.08)',
				}}
				onError={(e) => {
					(e.target as HTMLImageElement).src =
						`https://placehold.co/600x900/040913/f4efe7?text=${encodeURIComponent(item.title)}`;
				}}
			/>

			{/* Dark overlay */}
			<div
				className="absolute inset-0"
				style={{
					background: `rgba(4,9,19,${isActive ? 0.3 : 0.7})`,
					transition: 'background 800ms ease',
				}}
			/>

			{/* Warm vignette on active */}
			<div
				className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(244,193,122,0.14),transparent_55%)]"
				style={{
					opacity: isActive ? 1 : 0,
					transition: 'opacity 600ms ease',
				}}
			/>

			{/* Active: caption slides up from bottom */}
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

			{/* Inactive: vertical title */}
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
		</div>
	);
}

export function HeritageAccordion() {
	const [activeIndex, setActiveIndex] = useState(4);

	return (
		<div className="flex flex-row items-center gap-2">
			{HERITAGE_ITEMS.map((item, index) => (
				<AccordionItem
					key={item.id}
					item={item}
					isActive={index === activeIndex}
					onHover={() => setActiveIndex(index)}
				/>
			))}
		</div>
	);
}
