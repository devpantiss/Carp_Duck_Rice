import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The existing production bundle is intentionally monolithic to preserve
    // the application's current load behavior.
    chunkSizeWarningLimit: 1200,
  },
})
