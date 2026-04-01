import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

import { philosophyCards } from '../data/landing';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function PhilosophySection() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useScrollReveal(sectionRef, { selector: '[data-reveal]', y: 40, stagger: 0.06 });

	return (
		<section id="sejarah" ref={sectionRef} className="section-shell border-t border-white/10 bg-night px-6 py-24 md:px-10 lg:px-16 lg:py-32">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-end">
					<div className="space-y-6">
						<p data-reveal className="eyebrow">Kurasi Konsep</p>
						<h2 data-reveal className="font-display text-4xl leading-[0.92] text-mist sm:text-5xl lg:text-6xl">
							Garis imajiner Jogja dibaca seperti instalasi yang membentang.
						</h2>
					</div>
					<p data-reveal className="max-w-2xl justify-self-end text-base leading-relaxed text-mist/72 md:text-lg">
						Lima simpul ini membentuk narasi spasial yang khas. Kami menerjemahkannya sebagai panel-panel besar dengan nuansa arsip, lanskap, dan cahaya yang bergerak pelan.
					</p>
				</div>

				<div className="mt-14 flex snap-x gap-5 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
					{philosophyCards.map((card) => (
						<article key={card.title} data-reveal className="group relative min-w-[18rem] snap-start overflow-hidden rounded-[2rem] border border-white/10 bg-black/20 sm:min-w-[21rem] lg:min-w-[24rem]">
							<div className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.05]" style={{ backgroundImage: card.background }}></div>
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03),rgba(0,0,0,0.82)_78%)]"></div>
							<div className="relative flex min-h-[30rem] flex-col justify-between p-6 sm:p-7">
								<div className="flex items-start justify-between gap-4">
									<p className="text-[0.68rem] uppercase tracking-[0.28em] text-mist/46">Garis Imajiner</p>
									<div className="heritage-mark flex h-10 w-10 items-center justify-center rounded-full text-mist/68 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mist">
										<ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
									</div>
								</div>

								<div className="space-y-3">
									<p className="text-sm uppercase tracking-[0.22em] text-sun/72">{card.subtitle}</p>
									<h3 className="font-display text-4xl leading-none text-mist sm:text-5xl">{card.title}</h3>
									<p className="translate-y-6 text-sm leading-relaxed text-mist/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-mist/74 group-hover:opacity-100 sm:text-base">
										{card.description}
									</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}