import type { RefObject } from 'react';

import { ensureGsapPlugins, gsap, ScrollTrigger } from '../../lib/gsap';
import { useGsapContext } from './useGsapContext';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface UseScrollRevealOptions {
	selector?: string;
	y?: number;
	stagger?: number;
	start?: string;
}

export const useScrollReveal = (
	scope: RefObject<Element | null>,
	options: UseScrollRevealOptions = {},
) => {
	const prefersReducedMotion = usePrefersReducedMotion();
	const {
		selector = '[data-reveal]',
		y = 36,
		stagger = 0.08,
		start = 'top 82%',
	} = options;

	useGsapContext(
		() => {
			ensureGsapPlugins();

			const nodes = gsap.utils.toArray<HTMLElement>(selector, scope.current ?? undefined);

			if (!nodes.length) {
				return undefined;
			}

			if (prefersReducedMotion) {
				gsap.set(nodes, { autoAlpha: 1, y: 0 });
				return undefined;
			}

			// Pre-set the hidden state so static HTML doesn't flash visible
			// before the batch trigger fires.
			gsap.set(nodes, { autoAlpha: 0, y });

			ScrollTrigger.batch(nodes, {
				start,
				once: true,
				interval: 0.12,
				batchMax: 8,
				onEnter: (batch) => {
					gsap.to(batch, {
						autoAlpha: 1,
						y: 0,
						duration: 0.7,
						stagger,
						ease: 'power3.out',
						overwrite: 'auto',
					});
				},
			});

			return undefined;
		},
		{ dependencies: [prefersReducedMotion, selector, y, stagger, start], scope },
	);
};