import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/assignments': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/execute-query': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/hint': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
