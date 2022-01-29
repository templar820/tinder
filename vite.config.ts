import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = 80;

export default defineConfig({
  server: {
    port,
  },
  plugins: [react()]
});
