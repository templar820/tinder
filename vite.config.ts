import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = process.env.PORT || 3000;

export default defineConfig({
  server: {
    port,
  },
  plugins: [react()]
});
