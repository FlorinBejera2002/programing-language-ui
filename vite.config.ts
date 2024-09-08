import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Verifică că aliasul indică spre folderul src sau alt folder relevant
    },
  },
});
