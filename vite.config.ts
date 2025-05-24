import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.JPG', '**/*.PNG'],  // Add JPG and other image formats
  plugins: [react()],
  build: {
    assetsDir: 'assets',  // Specify a custom directory for assets
  },
})
