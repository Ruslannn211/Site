import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    /*server: {
        port: 5173,
        host: true, // 🔥 разрешает внешний доступ
        allowedHosts: ["8b44-188-163-97-29.ngrok-free.app"],
        hmr: {
            clientPort: 443, // важно для HMR через https (ngrok)
        },
        /!*proxy: {
          "/api": {
            target: `https://${based_urls.back}`,
            changeOrigin: true,
            // если на бэке нет /api в начале, уберем его:
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },*!/
    },*/
    resolve: {
        alias: {
            "@lib/ws": path.resolve(__dirname, "src/lib/ws/WebSocketClient"),
            "@api": path.resolve(__dirname, "src/lib/api"),
            "@types-lib": path.resolve(__dirname, "src/lib/types/index"),
            "@types-lib/events": path.resolve(__dirname, "src/lib/ws/types"),
            "@store/thunks": path.resolve(__dirname, "src/store"),
            "@store": path.resolve(__dirname, "src/store/store"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@admin-pages": path.resolve(__dirname, "src/admin-pages"),
            "@components": path.resolve(__dirname, "src/components"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
        },
    },
})
