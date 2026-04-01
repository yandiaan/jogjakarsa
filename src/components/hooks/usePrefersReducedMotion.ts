import { useEffect, useState } from 'react';

export const usePrefersReducedMotion = () => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return undefined;
		}

		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		const updateMatch = () => setPrefersReducedMotion(mediaQuery.matches);

		updateMatch();
		mediaQuery.addEventListener('change', updateMatch);

		return () => {
			mediaQuery.removeEventListener('change', updateMatch);
		};
	}, []);

	return prefersReducedMotion;
};