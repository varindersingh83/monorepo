import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure the output directory is set to 'dist'
    assetsDir: 'assets', // Ensure assets are placed in 'assets' directory
  },
  server: {
    proxy: {
      '/login': 'http://localhost:4000', // Adjust the port to match your backend server
      '/admin_dashboard': 'http://localhost:4000',
      '/logout': 'http://localhost:4000',
      '/admin/add-blog': 'http://localhost:4000',
      // Add other backend routes as needed
    }
  }
});

