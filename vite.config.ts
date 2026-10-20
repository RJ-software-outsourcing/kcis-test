import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// GitHub Pages serves the site at /kcis-test/ (repo name). Keep in sync with
// `basepath` in src/main.tsx (both derive from import.meta.env.BASE_URL).
export default defineConfig({
  base: '/kcis-test/',
  plugins: [
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
})
