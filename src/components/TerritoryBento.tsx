import { Compass, MapPinned } from 'lucide-react';
import { useRef } from 'react';

import { territoryCards } from '../data/landing';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function TerritoryBento() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useScrollReveal(sectionRef, { selector: '[data-reveal]', y: 34, stagger: 0.05 });

	return (
		<section id="jogja" ref={sectionRef} className="section-shell border-t border-white/10 bg-[#050911] px-6 py-24 md:px-10 lg:px-16 lg:py-32">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="space-y-6">
						<p data-reveal className="eyebrow">Peta Atmosferik</p>
						<h2 data-reveal className="max-w-3xl font-display text-4xl leading-[0.92] text-mist sm:text-5xl lg:text-6xl">
							Wilayah-wilayah dibuka seperti bento gallery yang menyimpan banyak cara memandang Jogja.
						</h2>
					</div>
					<div data-reveal className="glass-panel flex items-center gap-4 rounded-[1.8rem] px-5 py-4 text-sm leading-relaxed text-mist/70 lg:max-w-sm">
						<MapPinned className="h-5 w-5 shrink-0 text-sun" strokeWidth={1.75} />
						<span>Setiap bidang bisa berkembang jadi gerbang wilayah interaktif, peta naratif, atau indeks destinasi.</span>
					</div>
				</div>

				<div className="mt-14 grid auto-rows-[13rem] gap-5 lg:grid-cols-4 lg:auto-rows-[15rem]">
					{territoryCards.map((card) => (
						<article
							key={card.title}
							data-reveal
							className={`group relative overflow-hidden rounded-[2rem] border border-white/10 ${card.className}`.trim()}
						>
							<div className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.05]" style={{ backgroundImage: card.background }}></div>
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06),rgba(0,0,0,0.82)_82%)]"></div>
							<div className="relative flex h-full flex-col justify-between p-6">
								<div className="flex items-start justify-between gap-4">
									<p className="text-[0.68rem] uppercase tracking-[0.26em] text-mist/42">Wilayah</p>
									<Compass className="h-5 w-5 text-mist/58 transition-transform duration-500 group-hover:rotate-45 group-hover:text-sun" strokeWidth={1.6} />
								</div>
								<div>
									<h3 className="font-display text-3xl leading-none text-mist sm:text-4xl">{card.title}</h3>
									<p className="mt-3 max-w-md text-sm leading-relaxed text-mist/72 sm:text-base">{card.caption}</p>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}