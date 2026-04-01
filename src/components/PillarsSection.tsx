import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

import { pillarCards } from '../data/landing';
import { useScrollReveal } from './hooks/useScrollReveal';

export default function PillarsSection() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useScrollReveal(sectionRef, { selector: '[data-reveal]', y: 38, stagger: 0.06 });

	return (
		<section id="budaya" ref={sectionRef} className="section-shell border-t border-white/10 bg-night px-6 py-24 md:px-10 lg:px-16 lg:py-32">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:items-end">
					<div className="space-y-6">
						<p data-reveal className="eyebrow">Navigasi Utama</p>
						<h2 data-reveal className="font-display text-4xl leading-[0.92] text-mist sm:text-5xl lg:text-6xl">
							Empat pilar besar dibuka seperti ruang pamer yang bisa kamu masuki satu per satu.
						</h2>
					</div>
					<p data-reveal className="max-w-2xl justify-self-end text-base leading-relaxed text-mist/72 md:text-lg">
						Setiap bidang dirancang sebagai portal. Saat versi lengkap dibangun, area ini bisa menjadi navigasi utama menuju pengalaman tematik yang lebih dalam.
					</p>
				</div>

				<div className="mt-14 grid gap-5 md:grid-cols-2">
					{pillarCards.map((card) => (
						<a
							key={card.title}
							data-reveal
							href={`#${card.title.toLowerCase()}`}
							className="group relative overflow-hidden rounded-[2.1rem] border border-white/10"
						>
							<div className="absolute inset-0 scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.05]" style={{ backgroundImage: card.background }}></div>
							<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.82)_80%)]"></div>
							<div className="relative flex min-h-[22rem] flex-col justify-between p-6 md:min-h-[24rem] md:p-7">
								<div className="flex items-start justify-between gap-4">
									<p className="text-[0.68rem] uppercase tracking-[0.26em] text-mist/42">Pilar</p>
									<div className="heritage-mark flex h-11 w-11 items-center justify-center rounded-full text-mist/62 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-sun">
										<ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
									</div>
								</div>

								<div>
									<h3 className="font-display text-4xl leading-none text-mist sm:text-5xl">{card.title}</h3>
									<p className="mt-3 max-w-md translate-y-5 text-sm leading-relaxed text-mist/0 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-mist/74 group-hover:opacity-100 sm:text-base">
										{card.description}
									</p>
									<div className="mt-6 inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-mist/62">
										<span>Buka</span>
										<span className="h-px w-10 bg-mist/28 transition-all duration-500 group-hover:w-16 group-hover:bg-sun/60"></span>
									</div>
								</div>
							</div>
						</a>
					))}
				</div>
			</div>
		</section>
	);
}