import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export const ensureGsapPlugins = () => {
	if (registered || typeof window === 'undefined') {
		return;
	}

	gsap.registerPlugin(ScrollTrigger);
	registered = true;
};

export const prefersReducedMotion = () => {
	if (typeof window === 'undefined') {
		return false;
	}

	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const createMediaMatcher = () => {
	ensureGsapPlugins();
	return gsap.matchMedia();
};

export { gsap, ScrollTrigger };