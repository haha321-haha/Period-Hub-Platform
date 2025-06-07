/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors - soft pinks
        primary: {
          50: '#fdf2f6',
          100: '#fce7ef',
          200: '#fbd0e0',
          300: '#f9a8c5',
          400: '#f57ba6',
          500: '#ec5387',
          600: '#db3168',
          700: '#be214f',
          800: '#9d1f43',
          900: '#851e3d',
          950: '#4a0a1e'
        },
        // Secondary colors - mint greens
        secondary: {
          50: '#f0faf7',
          100: '#d9f2ea',
          200: '#b6e6d7',
          300: '#8ad3be',
          400: '#5bb89f',
          500: '#3d9d85',
          600: '#2f7f6d',
          700: '#286559',
          800: '#245249',
          900: '#20443e',
          950: '#0d2723'
        },
        // Accent colors - warm accents
        accent: {
          50: '#fff8ed',
          100: '#ffefd4',
          200: '#ffdca8',
          300: '#ffc470',
          400: '#ffa337',
          500: '#ff8412',
          600: '#f96207',
          700: '#cc4308',
          800: '#a23410',
          900: '#832d11',
          950: '#461406'
        },
        // Neutral colors - warm neutrals
        neutral: {
          50: '#f9f7f5',
          100: '#f1eeea',
          200: '#e2dcd5',
          300: '#cec4ba',
          400: '#b5a79a',
          500: '#a08e7e',
          600: '#8c7968',
          700: '#746356',
          800: '#625249',
          900: '#52453e',
          950: '#2b241f'
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--tw-prose-body)',
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            h1: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
            },
            h2: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
            },
            h3: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
            },
            h4: {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
            },
          },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
