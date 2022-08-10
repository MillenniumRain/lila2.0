/** @type {import('tailwindcss').Config} */
const cell = '90px';
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			width: cell,
			height: cell,
			animation: {
				'spin-slow': 'spin 12s linear infinite',
			},
			maxHeight: {
				card: '50%',
			},
		},
	},
	plugins: [],
};
