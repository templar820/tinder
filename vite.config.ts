import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const port = process.env.PORT || 3000;

console.log(process.env, port);

export default defineConfig({
  server: {
    port,
  },
  plugins: [react()],
  define: {
    PORT: String(port),
  }
});
