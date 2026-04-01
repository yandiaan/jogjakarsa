import { Menu, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { navItems } from '../data/landing';

export default function SiteNavbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			setIsScrolled(window.scrollY > 16);
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);

	return (
		<header className="pointer-events-none fixed inset-x-0 top-0 z-[80] flex justify-center px-3 py-3 sm:px-6 sm:py-5">
			<div
				className={`pointer-events-auto heritage-nav w-full max-w-7xl rounded-full px-4 py-3 transition-all duration-500 sm:px-6 ${isScrolled ? 'bg-[#070d16]/74 shadow-glass' : 'bg-[#070d16]/36'}`.trim()}
			>
				<div className="grid items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
					<a href="#top" className="flex items-center gap-3">
						<div className="heritage-mark flex h-10 w-10 items-center justify-center rounded-full text-sun">
							<Sparkles className="h-4 w-4" strokeWidth={1.8} />
						</div>
						<div>
							<p className="font-display text-xl leading-none text-mist">jogjakarsa.id</p>
							<p className="mt-1 text-[0.65rem] uppercase tracking-[0.28em] text-mist/44">Digital Heritage</p>
						</div>
					</a>

					<nav className="hidden items-center justify-center gap-7 lg:flex">
						{navItems.map((item) => (
							<a key={item} href={`#${item.toLowerCase()}`} className="text-sm tracking-[0.18em] text-mist/68 transition-colors duration-300 hover:text-mist">
								{item}
							</a>
						))}
					</nav>

					<div className="flex items-center justify-end gap-3">
						<div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-mist/52 md:inline-flex">
							Exhibition Mode
						</div>
						<button
							type="button"
							onClick={() => setIsMenuOpen((value) => !value)}
							className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-mist lg:hidden"
							aria-label="Toggle navigation"
						>
							{isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
						</button>
					</div>
				</div>

				{isMenuOpen && (
					<nav className="mt-4 grid gap-2 border-t border-white/10 pt-4 lg:hidden">
						{navItems.map((item) => (
							<a
								key={item}
								href={`#${item.toLowerCase()}`}
								onClick={() => setIsMenuOpen(false)}
								className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm tracking-[0.18em] text-mist/72"
							>
								{item}
							</a>
						))}
					</nav>
				)}
			</div>
		</header>
	);
}