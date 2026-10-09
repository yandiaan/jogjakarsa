export default function TravelHeader() {
	return (
		<header className="absolute inset-x-0 top-0 z-20 px-6 py-6 md:px-10 lg:px-16">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
				<a href="#top" className="font-display text-2xl text-mist sm:text-3xl">jogjakarsa</a>
				<nav aria-label="Navigasi utama" className="flex items-center gap-4 text-sm font-bold text-mist sm:gap-7">
					<a href="#cara-kerja" className="hidden transition-colors hover:text-sun sm:block">Cara kerja</a>
					<a href="#rencana" className="border border-mist/35 px-4 py-2.5 transition-colors hover:border-sun hover:text-sun">Rencanakan trip</a>
				</nav>
			</div>
		</header>
	);
}
