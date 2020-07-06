const cssnano = require("cssnano");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
	plugins: [
		require("tailwindcss"),
		require("autoprefixer"),
		cssnano({ present: "default" }),
		// purgecss({
		// 	content: ["./views/**/*.html"],
		// 	defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
		// }),
	],
};
