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
          green: '#2E5A44',     // Hijau Daun Singkong
          orange: '#C85A32',    // Oranye Ubi Jalar
          purple: '#6B4C7B',    // Ungu Talas
          cream: '#FDFBF7',     // Krem Hangat
          border: '#E6E1D6',    // Border lembut
          surface: '#FFFFFF',
          dark: '#1C2E24',
          subtle: '#F4EFE6'
        },
        tuber: {
          singkong: '#2E5A44',
          ubi: '#C85A32',
          talas: '#6B4C7B',
          rice: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      // Skala huruf dinaikkan agar sesuai spesifikasi aksesibilitas lapangan
      // (teks isi minimal 16px). text-xs kini 14px, text-sm 16px.
      fontSize: {
        xs: ['0.875rem', { lineHeight: '1.35rem' }],
        sm: ['1rem', { lineHeight: '1.6rem' }],
        base: ['1.0625rem', { lineHeight: '1.7rem' }],
      },
      scale: {
        '98': '0.98',
        '102': '1.02',
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(28, 46, 36, 0.08)',
        'lift': '0 18px 40px -12px rgba(28, 46, 36, 0.22)',
        'glow-orange': '0 10px 30px -8px rgba(200, 90, 50, 0.55)',
        'glow-green': '0 10px 30px -8px rgba(46, 90, 68, 0.5)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'pop': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-6deg)' },
          '75%': { transform: 'rotate(6deg)' },
        },
        'progress-stripes': {
          '0%': { backgroundPosition: '1rem 0' },
          '100%': { backgroundPosition: '0 0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.3s ease-out both',
        'scale-in': 'scale-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pop': 'pop 0.35s ease-out',
        'shimmer': 'shimmer 2.5s linear infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'progress-stripes': 'progress-stripes 1s linear infinite',
      },
    },
  },
  plugins: [],
}
