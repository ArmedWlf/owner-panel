/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Vazirmatn', 'Tahoma', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#EEF1F6',
          100: '#D7DCE7',
          300: '#8C97B3',
          500: '#3E4A6B',
          700: '#1F2A47',
          900: '#101833',
          950: '#0A0F22',
        },
        amber: {
          50: '#FFF6E6',
          100: '#FEEAC2',
          300: '#F7C468',
          500: '#F2A93B',
          600: '#DB8F1F',
          700: '#B3720F',
        },
        route: {
          bg: '#EEF1F4',
          line: '#C7CEDA',
        },
      },
      boxShadow: {
        panel: '0 1px 2px rgba(16,24,51,0.04), 0 8px 24px -12px rgba(16,24,51,0.18)',
      },
      backgroundImage: {
        'dash-line':
          'repeating-linear-gradient(90deg, #C7CEDA 0, #C7CEDA 10px, transparent 10px, transparent 18px)',
      },
    },
  },
  plugins: [],
};
