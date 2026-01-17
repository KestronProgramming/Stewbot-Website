import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

const __dirname = import.meta.dirname || new URL('.', import.meta.url).pathname.slice(1);

export default defineConfig(({ command }) => ({
  plugins: [preact()],
  root: '.',
  base: command === 'build' ? '/Stewbot-Website/' : '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html')
    }
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  server: {
    port: 8080,
    open: false
  }
}));
