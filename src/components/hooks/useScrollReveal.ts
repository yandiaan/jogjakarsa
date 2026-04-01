import type { RefObject } from 'react';

import { ensureGsapPlugins, gsap } from '../../lib/gsap';
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
				gsap.set(nodes, { autoAlpha: 1, y: 0, clearProps: 'filter' });
				return undefined;
			}

			nodes.forEach((node, index) => {
				gsap.fromTo(
					node,
					{ autoAlpha: 0, y, filter: 'blur(8px)' },
					{
						autoAlpha: 1,
						y: 0,
						filter: 'blur(0px)',
						duration: 0.9,
						delay: index * stagger,
						ease: 'power3.out',
						scrollTrigger: {
							trigger: node,
							start,
							onEnter: () => undefined,
						},
					},
				);
			});

			return undefined;
		},
		{ dependencies: [prefersReducedMotion, selector, y, stagger, start], scope },
	);
};