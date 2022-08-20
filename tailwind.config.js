/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const cell = '90px';

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			width: cell,
			height: cell,
			animation: {
				'spin-slow': 'spin 12s linear infinite',
				'spin-ultraslow': 'spin 2500s linear infinite',
				'pulse-slow': 'pulse 1s linear infinite',
				'ping-slow': 'ping 1s linear infinite',
			},

			maxHeight: {
				card: '50%',
			},
			boxShadow: {
				card: '0px 0px 0px 5px rgba(255, 255, 255, 0.75) ,  inset  0px 0px 0px 5px rgba(255, 255, 255, 0.75);',
				dice: 'inset 0 5px white, inset 0 -5px #bbb, inset 5px 0 #d7d7d7, inset -5px 0 #d7d7d7',
				dot: 'inset 0 3px #111, inset 0 -3px #555;',
			},
			fontFamily: {
				rubik: ['Rubik Dirt', ...defaultTheme.fontFamily.sans],
				russo: ['Russo One', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
