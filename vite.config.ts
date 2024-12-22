import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-plugin-tsconfig-paths';


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lodash-es')) {
              return 'lodash-es-vendor';
            }
            if (id.includes('react-dom')) {
              return 'react-dom';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})