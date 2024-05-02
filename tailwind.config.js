/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#008000',
        },
      },
    },
  },
  plugins: [],
}

