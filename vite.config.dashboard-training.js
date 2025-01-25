import { defineConfig } from 'vite';
import { resolve } from 'path'
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
    plugins: [react(), commonjs()],
    base: '/training/',
    server: {
        port: 3000, // 你可以选择一个你喜欢的端口
        open: 'index-dashboard-training.html', // 确保打开的是 index.dashboard.html
        proxy: {
            "/template_data/data": {
                target: "http://127.0.0.1:8011", //目标url
                changeOrigin: true, //支持跨域
            },
            "/files/": {
                target: "http://127.0.0.1:8011", // 目标url
                changeOrigin: true, // 支持跨域
            },
            "/template_data/ws": {
                target: "ws://127.0.0.1:8011", //目标url
                changeOrigin: true, //支持跨域
                ws: true,
            },
        },
    },
    build: {
        outDir: "dashboard-training",
        sourcemap: true,
        target: "esnext",
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index-dashboard-training.html'),
            },
        },
        output: {
            entryFileNames: 'assets/[name].js',
            chunkFileNames: 'assets/[name].js',
            assetFileNames: 'assets/[name].[ext]',
        },

    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/setupTests",
        mockReset: true,
    },
});