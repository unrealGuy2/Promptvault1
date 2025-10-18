// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 1. Primary Colors
        indigo: {
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#4F46E5',
        },
        // 2. Secondary (Semantic) Colors
        success: '#10B981', // Emerald 500
        warning: '#F59E0B', // Amber 500
        danger: '#F43F5E',  // Rose 500
        // 3. Supporting Colors
        cyan: {
          400: '#22D3EE',
        },
        purple: {
          400: '#A78BFA',
        },
      },
    },
  },
  plugins: [],
}
export default config