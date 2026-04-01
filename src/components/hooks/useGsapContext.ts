import { useEffect, useLayoutEffect, type DependencyList, type RefObject } from 'react';

import { gsap } from '../../lib/gsap';

type GsapCallback = () => void | (() => void);

interface UseGsapContextOptions {
	dependencies?: DependencyList;
	scope?: RefObject<Element | null>;
}

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export const useGsapContext = (
	callback: GsapCallback,
	options: UseGsapContextOptions = {},
) => {
	const { dependencies = [], scope } = options;

	useIsomorphicLayoutEffect(() => {
		if (typeof window === 'undefined') {
			return undefined;
		}

		let cleanup: void | (() => void);
		const context = gsap.context(() => {
			cleanup = callback();
		}, scope?.current ?? undefined);

		return () => {
			cleanup?.();
			context.revert();
		};
	}, dependencies);
};