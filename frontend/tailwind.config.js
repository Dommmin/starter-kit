/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   daisyui: {
      themes: ['light', 'dark'],
   },
   plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'), require('daisyui')],
};
