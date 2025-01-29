import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dali: '#00ADAB',
        'dali-gray': '#beb4a8',
        'dali-orange': '#e59809'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-dali': 'linear-gradient(300deg, #00ADAB, #beb4a8, #00ADAB)',
      },
      animation: {
        'gradient-dali': 'gradient-dali 18s ease infinite',
      },
      keyframes: {
        'gradient-dali': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;