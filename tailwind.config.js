/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zambeel: {
          purple: {
            DEFAULT: '#6B38F8',
            dark: '#181335',
            darker: '#130E2B',
            surface: '#221B47',
            light: '#8F5BFE',
            accent: '#5E2EE8'
          },
          alert: {
            bg: '#FFF000',
            text: '#851A1A'
          },
          whatsapp: '#25D366'
        }
      },
      fontFamily: {
        sans: ['Hetrixo', 'Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        hetrixo: ['Hetrixo', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
