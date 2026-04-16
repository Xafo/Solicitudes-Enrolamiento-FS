/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ficohsa-blue': '#002f6c',
        'ficohsa-red': '#d71920',
        'bg-app': '#f5f7fa',
        'text-main': '#202938',
        'border-light': '#dbe3f0',
      },
    },
  },
  plugins: [],
}
