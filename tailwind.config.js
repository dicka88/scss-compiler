// module.exports = {
//   purge: [],
//   theme: {
//     extend: {},
//   },
//   variants: {},
//   plugins: [],
// }
module.exports = {
	important: true,
	theme: {
		screens: {
			sm: '320px',
			md: '768px',
			lg: '1024px',
			xl: '1280px'
		},
		fontFamily: {
			display: ["Gilroy", "sans-serif"],
			body: ["Graphik", "sans-serif"],
		},
		extend: {
			colors: {
				cyan: "#9cdbff",
			},
			margin: {
				"96": "24rem",
				"128": "32rem",
			},
		},
	},
	variants: {
		opacity: ["responsive", "hover"],
	},
};
