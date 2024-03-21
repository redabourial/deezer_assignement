import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    api: {root:'/api'},
  }, 
  server: {
    host: true,
    port: 80,
    proxy: {
      '/api/': {
        target: 'http://django:8000/',
      },
    }
  },
})
