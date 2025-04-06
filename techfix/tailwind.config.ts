import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        bit: '#6DE1F3',
        bitDark: '#4BC8E0',
        white: '#FFFFFF',
        byte: '#0F172A',
        byteDarker: '#070D1A',
        petrol: '#134E4A',
        petrolDark: '#0A2E2B',
        deepPetrol: '#0B1C2B',
        deepPetrolDarker: '#050D16',
        accent: '#FF6B6B',
        accentDark: '#E05A5A',
        success: {
          light: '#4CAF50',
          DEFAULT: '#43A047',
          dark: '#388E3C',
        },
        warning: {
          light: '#FFC107',
          DEFAULT: '#FFB300',
          dark: '#FFA000',
        },
        error: {
          light: '#EF5350',
          DEFAULT: '#E53935',
          dark: '#D32F2F',
        },
        info: {
          light: '#29B6F6',
          DEFAULT: '#1E88E5',
          dark: '#1976D2',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-byte': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-dark': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'gradient-bit': 'linear-gradient(135deg, #6DE1F3 0%, #4BC8E0 100%)',
        'gradient-petrol': 'linear-gradient(135deg, #134E4A 0%, #0A2E2B 100%)',
        'gradient-deep': 'linear-gradient(135deg, #0B1C2B 0%, #050D16 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'ping-slow': {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      boxShadow: {
        'bit': '0 0 15px rgba(109, 225, 243, 0.3)',
        'bit-lg': '0 0 30px rgba(109, 225, 243, 0.5)',
        'petrol': '0 0 15px rgba(19, 78, 74, 0.3)',
        'petrol-lg': '0 0 30px rgba(19, 78, 74, 0.5)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
};

export default config; 