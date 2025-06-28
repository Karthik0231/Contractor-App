/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/navigation/**/*.{js,jsx,ts,tsx}",
  ],
 theme: {
    extend: {
      colors: {
        primary: '#1E2634',
        accent: '#AC8D53',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        error: '#EF4444',
        textMain: '#1E293B',
        disabled: '#E5E7EB',
        placeholder: '#94A3B8',
        textMain: '#AC1577',      //  Pink 600
      },
    },
  },
  plugins: [],
}

