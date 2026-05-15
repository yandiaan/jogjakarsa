import { useEffect } from 'react';
import Lenis from 'lenis';

import { ensureGsapPlugins, gsap, ScrollTrigger } from '../lib/gsap';
import { useProgressStore } from '../store/useProgressStore';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';

export default function SmoothScroll() {
	const prefersReducedMotion = usePrefersReducedMotion();
	const setLenisInstance = useProgressStore((s: any) => s.setLenisInstance);

	useEffect(() => {
		if (prefersReducedMotion) {
			return undefined;
		}

		ensureGsapPlugins();

		const lenis = new Lenis({
			duration: 1.15,
			smoothWheel: true,
			syncTouch: false,
			touchMultiplier: 1.1,
		});

		setLenisInstance(lenis);

		const updateScrollTrigger = () => ScrollTrigger.update();
		const raf = (time: number) => {
			lenis.raf(time * 1000);
		};

		lenis.on('scroll', updateScrollTrigger);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);
		ScrollTrigger.refresh();

		return () => {
			lenis.off('scroll', updateScrollTrigger);
			gsap.ticker.remove(raf);
			lenis.destroy();
			setLenisInstance(null);
		};
	}, [prefersReducedMotion]);

	return null;
}