import { ArrowDown, MapPin } from 'lucide-react';

export default function TravelHero() {
	return (
		<section id="top" className="relative isolate overflow-hidden bg-ink px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44 lg:px-16 lg:pb-28">
			<div className="absolute inset-0 -z-20">
				<img src="/prambanan-sunrise.webp" alt="Prambanan pada pagi hari" className="h-full w-full object-cover opacity-55" fetchPriority="high" />
				<div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,31,0.98)_0%,rgba(8,17,31,0.82)_42%,rgba(8,17,31,0.3)_100%)]" />
			</div>
			<div aria-hidden="true" className="absolute bottom-0 left-[8%] top-0 -z-10 w-px bg-sun/55" />
			<div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(18rem,0.5fr)] lg:items-end">
				<div>
					<p className="text-sm font-bold text-sun">Perjalanan personal di Daerah Istimewa Yogyakarta</p>
					<h1 className="mt-5 max-w-3xl font-display text-6xl leading-[0.84] text-mist sm:text-7xl lg:text-[6.5rem]">Jogja, sesuai cara kamu menjalaninya.</h1>
					<p className="mt-7 max-w-xl text-lg leading-relaxed text-mist/78">
						Mulai dari rasa ingin tahu, bukan paket jadi. Kami bantu menyusun perjalanan budaya, kuliner, dan tempat yang punya cerita—dengan ritme yang sesuai untukmu.
					</p>
					<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
						<a href="#rencana" className="inline-flex min-h-12 items-center justify-center gap-2 bg-sun px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-mist">Mulai susun perjalanan <ArrowDown className="h-4 w-4" aria-hidden="true" /></a>
						<p className="text-sm text-mist/60">Contoh rute dan estimasi tersedia untuk dicoba.</p>
					</div>
				</div>
				<div className="border-l border-mist/25 pl-5 text-sm text-mist/72 sm:max-w-sm lg:mb-3">
					<MapPin className="h-5 w-5 text-sun" aria-hidden="true" />
					<p className="mt-4 leading-relaxed">Kota Yogyakarta · Sleman · Bantul · Kulon Progo · Gunungkidul</p>
					<p className="mt-2 text-mist/48">Rute dibuat dari pengalaman lokal yang sedang kami kurasi.</p>
				</div>
			</div>
		</section>
	);
}
