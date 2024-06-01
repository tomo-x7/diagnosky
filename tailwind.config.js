/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				green: {
					DEFAULT: "#008000",
				},
			},
			width:{
				main:"500px"
			}
		},
		screens: {
			sp: { max: "500px" },
			mini:{max:"330px"}
		},
	},
	plugins: [],
};
