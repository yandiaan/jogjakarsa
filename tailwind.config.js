/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				ink: '#08111f',
				night: '#040913',
				mist: '#f4efe7',
				sun: '#f4c17a',
				clay: '#d27a57',
				lagoon: '#92b9ff',
				cypress: '#7dc5ad',
			},
			fontFamily: {
				display: ['"EB Garamond"', 'serif'],
				sans: ['"Alegreya Sans"', 'sans-serif'],
				accent: ['"Alegreya Sans"', 'sans-serif'],
			},
			boxShadow: {
				glow: '0 32px 80px rgba(6, 11, 22, 0.45)',
				glass: '0 22px 60px rgba(4, 9, 19, 0.42)',
			},
			backgroundImage: {
				'hero-haze':
					'radial-gradient(circle at top left, rgba(244,193,122,0.24), transparent 32%), radial-gradient(circle at top right, rgba(146,185,255,0.24), transparent 30%), linear-gradient(180deg, rgba(7,14,25,0.96), rgba(8,17,31,1))',
				'story-depth':
					'radial-gradient(circle at top, rgba(244,193,122,0.18), transparent 26%), radial-gradient(circle at bottom right, rgba(146,185,255,0.16), transparent 28%), linear-gradient(180deg, rgba(5,9,19,1), rgba(8,17,31,1))',
			},
		},
	},
	plugins: [],
};