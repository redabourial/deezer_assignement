import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 80,
    define: {
      api_root: '/api/',
    },
    proxy: {
      '/api': {
        target: 'http://django:8000/',
      },
    }
  },
})
