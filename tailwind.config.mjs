/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Deep space background palette
        'space': {
          50: '#f4f6fb',
          100: '#e6ebf5',
          200: '#c6d2e8',
          300: '#93a8d2',
          400: '#5b78b6',
          500: '#3a559b',
          600: '#2b4080',
          700: '#233468',
          800: '#182347',
          900: '#0b1226',
          950: '#050810',
        },
        // Orbital cyan / instrument glow
        'orbit': {
          50: '#effcfd',
          100: '#d0f5fa',
          200: '#a6ebf4',
          300: '#67dbeb',
          400: '#22c1da',
          500: '#08a3c0',
          600: '#0a82a2',
          700: '#106884',
          800: '#16556c',
          900: '#17475c',
        },
        // Solar amber accent (thrusters / highlights)
        'thruster': {
          50: '#fff9eb',
          100: '#fff0c7',
          200: '#ffdf88',
          300: '#ffc849',
          400: '#ffb01f',
          500: '#f99106',
          600: '#dd6b02',
          700: '#b74906',
          800: '#94380c',
          900: '#7a2f0d',
        },
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'space-gradient': `radial-gradient(ellipse 100% 60% at 50% 0%,
          rgba(58, 85, 155, 0.25) 0%,
          rgba(11, 18, 38, 0.9) 45%,
          rgba(5, 8, 16, 1) 100%)`,
      },
      boxShadow: {
        'orbit': '0 0 30px rgba(34, 193, 218, 0.25)',
        'orbit-sm': '0 0 15px rgba(34, 193, 218, 0.15)',
        'thruster': '0 0 25px rgba(255, 176, 31, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
