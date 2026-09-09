/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0e2b20',       // Deepest restaurant green
          primary: '#134434',    // Deep restaurant green
          light: '#1e5e49',      // Medium forest green
          leaf: '#2d8659',       // Fresh leaf green
          emerald: '#38a169',    // Vibrant natural green
          accent: '#e67e22',     // Warm appetizing saffron orange
          accentHover: '#cf6d17',
          gold: '#f59e0b',       // Warm golden highlight
          cream: '#faf6f0',      // Warm off-white background
          surface: '#ffffff',    // White card surface
          charcoal: '#1c2822',   // Deep charcoal text
          muted: '#61756c',      // Subdued slate/green text
          border: '#e6ece8'      // Subtle natural border
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(19, 68, 52, 0.08)',
        'elevated': '0 12px 30px -4px rgba(19, 68, 52, 0.12)',
        'float': '0 20px 40px -6px rgba(19, 68, 52, 0.18)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
