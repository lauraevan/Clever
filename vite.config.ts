import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative, so a build can be served from a sub-path (githack, Pages, a
  // folder) as well as from a domain root.
  base: './',
  plugins: [react()],
})
