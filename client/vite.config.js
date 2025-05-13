import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Allows the '@' alias for importing from 'src' folder
    },
  },
  server: {
    hmr: {
      protocol: 'ws', // Ensure you're using WebSockets for HMR
      host: 'localhost', // Make sure it's set to localhost or your correct address
    },
  },
});
