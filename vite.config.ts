import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // 🔥 разрешает внешний доступ
    allowedHosts: ["8b44-188-163-97-29.ngrok-free.app"],
    hmr: {
      clientPort: 443, // важно для HMR через https (ngrok)
    },
    /*proxy: {
      "/api": {
        target: `https://${based_urls.back}`,
        changeOrigin: true,
        // если на бэке нет /api в начале, уберем его:
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },*/
  },
})
