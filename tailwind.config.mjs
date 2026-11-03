/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,md,ts}'],
  theme: {
    extend: {
      colors: {
        // Arc-reactor blue. 400 is the glow colour; use 600+ for text on white.
        arc: {
          50: '#effbff',
          100: '#d8f5ff',
          200: '#b0ebff',
          300: '#74dcfb',
          400: '#33c7f2',
          500: '#0ba9dc',
          600: '#0287b5',
          700: '#066c92',
          800: '#0b5878',
          900: '#0f4a64',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: { prose: '44rem' },
    },
  },
  plugins: [],
};
