module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			display: ['Oswald', 'sans-serif'],
			sans: ['Source Sans Pro', 'sans-serif']
		},
		backgroundImage: {
			'blue-red-gradient': 'linear-gradient(125deg, #d7d2c9, #82899c)',
			'gradient-fade': 'linear-gradient(90deg, #d7d2c9, #60677a)'
		},
		extend: {
			colors: {
				svelteOrange: '#FF3E00',
				svelteDark: '#F03A00',
				beige: '#d2b097',
				hotPink: '#FF1966',
				dark: '#111111',
				light: '#FAFAFA'
			}
		},
		listStyleType: {
			none: 'none',
			disc: 'disc',
			decimal: 'decimal',
			square: 'square',
			roman: 'upper-roman'
		}
	},
	plugins: []
}
