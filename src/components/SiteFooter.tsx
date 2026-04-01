import { Camera, Mail, MapPinned, Play, Send } from 'lucide-react';

import { footerLinks } from '../data/landing';

export default function SiteFooter() {
	return (
		<footer className="section-shell border-t border-white/10 bg-[#04070d] px-6 py-16 md:px-10 lg:px-16 lg:py-20">
			<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
				<div className="space-y-5">
					<p className="font-display text-3xl text-mist sm:text-4xl">jogjakarsa.id</p>
					<p className="max-w-md text-sm leading-relaxed text-mist/64 md:text-base">
						Sebuah kerangka digital heritage yang memperlakukan beranda seperti ruang pamer: tenang, gelap, dan penuh lapisan makna.
					</p>
				</div>

				<div>
					<p className="text-[0.68rem] uppercase tracking-[0.26em] text-mist/40">Navigasi</p>
					<ul className="mt-4 space-y-3 text-sm text-mist/68">
						{footerLinks.navigation.map((item) => (
							<li key={item}>
								<a href={`#${item.toLowerCase()}`} className="transition-colors duration-300 hover:text-mist">{item}</a>
							</li>
						))}
					</ul>
				</div>

				<div>
					<p className="text-[0.68rem] uppercase tracking-[0.26em] text-mist/40">Kontak</p>
					<ul className="mt-4 space-y-3 text-sm text-mist/68">
						<li className="flex items-center gap-2"><Mail className="h-4 w-4 text-sun" strokeWidth={1.7} /><a href="mailto:hello@jogjakarsa.id">hello@jogjakarsa.id</a></li>
						<li className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-sun" strokeWidth={1.7} /><span>Yogyakarta, Indonesia</span></li>
					</ul>
				</div>

				<div>
					<p className="text-[0.68rem] uppercase tracking-[0.26em] text-mist/40">Sosial</p>
					<div className="mt-4 flex items-center gap-3">
						<a href="#" className="heritage-mark flex h-11 w-11 items-center justify-center rounded-full text-mist/70 transition-colors duration-300 hover:text-sun"><Camera className="h-4 w-4" strokeWidth={1.7} /></a>
						<a href="#" className="heritage-mark flex h-11 w-11 items-center justify-center rounded-full text-mist/70 transition-colors duration-300 hover:text-sun"><Send className="h-4 w-4" strokeWidth={1.7} /></a>
						<a href="#" className="heritage-mark flex h-11 w-11 items-center justify-center rounded-full text-mist/70 transition-colors duration-300 hover:text-sun"><Play className="h-4 w-4" strokeWidth={1.7} /></a>
					</div>
				</div>
			</div>

			<div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-mist/38 sm:flex-row sm:items-center sm:justify-between">
				<p>© 2026 Jogjakarsa. Digital Heritage Exhibition Draft.</p>
				<p>Designed for calm immersion.</p>
			</div>
		</footer>
	);
}