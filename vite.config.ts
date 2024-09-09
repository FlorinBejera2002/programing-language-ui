import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Verifică că aliasul indică spre folderul src sau alt folder relevant
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://164.90.166.249:3001', // URL-ul backend-ului tău
        changeOrigin: true,  // Schimbă originea cererii pentru a evita problemele CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Rescrie calea cererii pentru a elimina prefixul "/api"
      },
    }
  }
});
