export default function TravelFooter() {
	return (
		<footer className="bg-ink px-6 py-12 text-mist md:px-10 lg:px-16">
			<div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-mist/15 pt-8 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="font-display text-3xl">jogjakarsa</p>
					<p className="mt-3 max-w-md text-sm leading-relaxed text-mist/60">Perjalanan lokal yang disusun dengan perhatian pada orang, tempat, dan ritme perjalanan.</p>
				</div>
				<div className="text-sm text-mist/55"><a href="mailto:hello@jogjakarsa.id" className="hover:text-sun">hello@jogjakarsa.id</a><p className="mt-2">Yogyakarta, Indonesia</p></div>
			</div>
		</footer>
	);
}
