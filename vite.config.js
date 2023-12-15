import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createProxyMiddleware } from 'http-proxy-middleware'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),

  // ...
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
  ],


  resolve: {
    alias: {
      '@': '/src',
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/index.scss" as *;`,
      },
    },
  },
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.1.100:7861',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
  },
 
  build: {
    outDir: 'dist',
  }
})
