module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			animation: {
				'onAppear': 'onAppear .2s ease-in'
			},
			keyframes: {
				onAppear: {
					'0%': { transform: 'translateX(-50%)', opacity: 0 },
					'100%': { transform: 'translateX(0)', opacity: 1 },
				},
			},
		},
	},
	plugins: [],
}
