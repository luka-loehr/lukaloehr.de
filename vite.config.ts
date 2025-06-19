import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // For custom domain (lukaloehr.de), use '/' instead of '/repo-name/'
  resolve: {
    alias: {
      fs: 'fs', // only if needed by a library; remove if unsure
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    include: ['lucide-react'],
  },
  server: {
    port: 3000,
    open: true,
  },
});
