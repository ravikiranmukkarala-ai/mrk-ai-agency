/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mrk-bg': '#0A0D12',
        'mrk-surface-1': '#111720',
        'mrk-surface-2': '#141B25',
        'mrk-surface-3': '#1D2533',
        'mrk-cyan': '#00F2FE',
        'mrk-cyan-glow': 'rgba(0, 242, 254, 0.35)',
        'mrk-blue': '#4FACFE',
        'mrk-indigo': '#6366F1',
        'mrk-violet': '#7928CA',
        'mrk-text': '#F5F7FA',
        'mrk-muted': '#9CA3AF',
        'mrk-border': 'rgba(200, 215, 235, 0.10)',
        'mrk-border-light': 'rgba(200, 215, 235, 0.18)',
        'mrk-border-cyan': 'rgba(0, 242, 254, 0.40)'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace', 'Consolas', 'Courier New']
      },
      boxShadow: {
        'cyan-glow': '0 0 28px rgba(0, 242, 254, 0.35)',
        'cyan-subtle': '0 0 16px rgba(0, 242, 254, 0.18)',
        'surface-elevated': '0 20px 50px rgba(0, 0, 0, 0.5)'
      },
      animation: {
        'spin-slow': 'spin 24s linear infinite',
        'spin-reverse': 'spin-reverse 18s linear infinite',
        'pulse-subtle': 'pulse 5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    },
  },
  plugins: [],
}
