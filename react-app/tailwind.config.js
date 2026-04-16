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
        'border-input': '#bec9dd',
        'header-gray': '#5b667d',
        'success-bg': '#e8f7ec',
        'success-text': '#1f6b35',
        'error-bg': '#ffecef',
        'error-text': '#9c1a2a',
        'error-border': '#f2c8d0',
        'btn-light-bg': '#e7eef8',
        'table-header': '#f3f6fb',
        'question-bg': '#fafcff',
        'question-border-dashed': '#c7d3e8',
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 6px 24px rgb(0 47 108 / 12%)',
      },
      borderRadius: {
        'stepper': '10px',
      },
    },
  },
  plugins: [],
}
