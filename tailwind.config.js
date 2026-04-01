/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				ink: '#08111f',
				mist: '#f4efe7',
				sun: '#f4c17a',
				clay: '#d27a57',
				lagoon: '#92b9ff',
				cypress: '#7dc5ad',
			},
			fontFamily: {
				display: ['"Space Grotesk"', 'sans-serif'],
				sans: ['"Manrope"', 'sans-serif'],
				accent: ['"Instrument Serif"', 'serif'],
			},
			boxShadow: {
				glow: '0 32px 80px rgba(6, 11, 22, 0.45)',
			},
			backgroundImage: {
				'hero-haze':
					'radial-gradient(circle at top left, rgba(244,193,122,0.24), transparent 32%), radial-gradient(circle at top right, rgba(146,185,255,0.24), transparent 30%), linear-gradient(180deg, rgba(7,14,25,0.96), rgba(8,17,31,1))',
			},
		},
	},
	plugins: [],
};