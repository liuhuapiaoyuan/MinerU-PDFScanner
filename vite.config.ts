import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import SemiPlugin from "vite-plugin-semi-theme";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(),
    SemiPlugin({
      theme: "@semi-bot/semi-theme-strapi"
    }),

  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // 配置 @ 符号指向 src 目录
    },
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
