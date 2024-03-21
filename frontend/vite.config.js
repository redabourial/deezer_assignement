import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    define: {
      api_root: 'http://django:8000/api/',
    },
    proxy: {
      '/api': {
        target: 'http://django:8000/',
      },
    }
  },
})
