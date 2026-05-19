import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:4081",
                changeOrigin: true,
                // если на бэке нет /api в начале, уберем его:
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
            "/ws": {
                target: "ws://127.0.0.1:4081", // твой тестовый backend
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            "@lib/ws": path.resolve(__dirname, "src/lib/ws/WebSocketClient"),
            "@api": path.resolve(__dirname, "src/lib/api/index"),
            "@tokens": path.resolve(__dirname, "src/lib/api/tokens"),
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
