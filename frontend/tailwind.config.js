/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Light mode
        light: {
          bg:      '#F8FAFC',
          card:    '#FFFFFF',
          secondary: '#F1F5F9',
          border:  '#E2E8F0',
          text:    '#0F172A',
          muted:   '#64748B',
        },
        // Dark mode
        dark: {
          bg:      '#0F172A',
          surface: '#1E293B',
          elevated:'#334155',
          border:  '#475569',
          text:    '#F8FAFC',
          muted:   '#94A3B8',
        },
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        accent: {
          400: '#22D3EE',
          500: '#06B6D4',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger:  '#EF4444',
      },
      animation: {
        'fade-in':     'fadeIn 0.3s ease',
        'slide-up':    'slideUp 0.3s ease',
        'slide-down':  'slideDown 0.3s ease',
        'scale-in':    'scaleIn 0.2s ease',
        'shimmer':     'shimmer 2s infinite linear',
        'float':       'float 6s ease-in-out infinite',
        'glow-pulse':  'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: 0 },                    to: { opacity: 1 } },
        slideUp:   { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideDown: { from: { opacity: 0, transform: 'translateY(-16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: 0, transform: 'scale(0.95)' }, to: { opacity: 1, transform: 'scale(1)' } },
        shimmer:   { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 20px rgba(59,130,246,0.3)' }, '50%': { boxShadow: '0 0 40px rgba(59,130,246,0.6)' } },
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
        'card-lg': '0 10px 40px rgba(0,0,0,0.15)',
        'glow':    '0 0 30px rgba(59,130,246,0.25)',
        'glow-lg': '0 0 60px rgba(59,130,246,0.4)',
        'inner':   'inset 0 2px 4px rgba(0,0,0,0.1)',
      },
      backdropBlur: { xs: '2px' },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'shimmer':         'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        'hero-dark':       'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)',
        'hero-light':      'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)',
        'card-gradient':   'linear-gradient(135deg, rgba(59,130,246,0.05), rgba(6,182,212,0.05))',
      },
    },
  },
  plugins: [],
}