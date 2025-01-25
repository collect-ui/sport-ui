import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
// https://vitejs.dev/config/
export default defineConfig({
    assetsInclude: ['**/*.doc', '**/*.docx'], // 添加 .doc 和 .docx 文件
    plugins: [react(), commonjs()],
    base: '/collect-ui/',
    server: {
        proxy: {
            // "/template_data/data": {
            //     target: "http://127.0.0.1:8011", //目标url
            //     changeOrigin: true, //支持跨域
            // },
            // "/files/": {
            //     target: "http://127.0.0.1:8011", // 目标url
            //     changeOrigin: true, // 支持跨域
            // },
            // "/template_data/ws": {
            //     target: "ws://127.0.0.1:8011", //目标url
            //     changeOrigin: true, //支持跨域
            //     ws: true,
            // },

            "/template_data/data": {
                target: "http://127.0.0.1:8015", //目标url
                changeOrigin: true, //支持跨域
            },
            "/files/": {
                target: "http://127.0.0.1:8015", // 目标url
                changeOrigin: true, // 支持跨域
            },
            "/data/": {
                target: "http://127.0.0.1:8015", //目标url
                changeOrigin: true, //支持跨域
            },
            "/template_data/ws": {
                target: "ws://127.0.0.1:8015", //目标url
                changeOrigin: true, //支持跨域
                ws: true,
            },
        },
    },
    build: {
        outDir: "build",
        sourcemap: true,
        target: "esnext",
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/setupTests",
        mockReset: true,
    },
});
