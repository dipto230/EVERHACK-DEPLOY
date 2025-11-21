/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  animation: {
    "glow": "glow 2s ease-in-out infinite",
    "glow-pulse": "glowPulse 1.6s ease-in-out infinite",
    "gradient-x": "gradientX 6s ease infinite",
    "pulse-slow": "pulse 6s infinite",
    "pulse-slower": "pulse 10s infinite",
    "fade-in": "fadeIn 1.5s ease-out forwards",
  },
  keyframes: {
    glow: {
      "0%, 100%": { textShadow: "0 0 10px rgba(255,255,255,.4)" },
      "50%": { textShadow: "0 0 20px rgba(255,255,255,.7)" },
    },
    glowPulse: {
      "0%, 100%": { opacity: 0.6 },
      "50%": { opacity: 1 },
    },
    gradientX: {
      "0%, 100%": { backgroundPosition: "0% 50%" },
      "50%": { backgroundPosition: "100% 50%" },
    },
    fadeIn: {
      "0%": { opacity: 0, transform: "translateY(10px)" },
      "100%": { opacity: 1, transform: "translateY(0)" },
    },
  }
}
,
  },
  plugins: [],
}