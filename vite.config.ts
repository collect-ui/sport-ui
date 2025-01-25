import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import commonjs from "vite-plugin-commonjs"

export default defineConfig({
  plugins: [react(), commonjs()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  base: '/collect-ui/',
  server: {
    proxy: {
      "/template_data/data": {
        target: "http://127.0.0.1:8011", // 目标url
        changeOrigin: true, // 支持跨域
      },
      "/files/": {
        target: "http://127.0.0.1:8011", // 目标url
        changeOrigin: true, // 支持跨域
      },
      "/template_data/ws": {
        target: "ws://127.0.0.1:8011", // 目标url
        changeOrigin: true, // 支持跨域
        ws: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})