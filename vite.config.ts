import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@/core': path.resolve(__dirname, './src/core'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/contexts': path.resolve(__dirname, './src/contexts'),
      '@/animations': path.resolve(__dirname, './src/animations'),
      '@/primitives': path.resolve(__dirname, './src/primitives'),
      '@/theme': path.resolve(__dirname, './src/theme'),
    },
  },
});
