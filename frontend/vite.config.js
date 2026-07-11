import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      // Any request starting with /api will be forwarded to the FastAPI server
      '/api': {
        target: 'http://localhost:8000', // Matches Uvicorn's default port
        changeOrigin: true,
        // We removed the rewrite function so that "/api" remains in the URL path
      }
    }
  },
})