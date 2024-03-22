import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['antd']
  },
  plugins: [react()],
  define: {
    api: { root: '/api' }
  },
  build: {
    sourcemap: true,
    minify: 'terser'
  },
  server: {
    host: true,
    port: 80,
    proxy: {
      '/api/': {
        target: 'http://django:8000/'
      }
    }
  }
})
