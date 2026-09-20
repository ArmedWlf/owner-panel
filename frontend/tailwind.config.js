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
        'panel-lg': '0 4px 6px rgba(16,24,51,0.04), 0 24px 48px -16px rgba(16,24,51,0.24)',
        glow: '0 0 0 1px rgba(242,169,59,0.25), 0 8px 24px -6px rgba(242,169,59,0.35)',
        'inner-line': 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'dash-line':
          'repeating-linear-gradient(90deg, #C7CEDA 0, #C7CEDA 10px, transparent 10px, transparent 18px)',
        'ink-radial':
          'radial-gradient(120% 120% at 100% 0%, rgba(242,169,59,0.14) 0%, rgba(10,15,34,0) 55%)',
        'amber-gradient': 'linear-gradient(135deg, #F7C468 0%, #F2A93B 55%, #DB8F1F 100%)',
        'glass-stroke':
          'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp .4s ease-out both',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
