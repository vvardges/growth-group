import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-plugin-tsconfig-paths';


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react')) {
            return 'react';
          }
          if (id.includes('node_modules/lodash-es')) {
            return 'lodash';
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'router';
          }
          if (id.includes('node_modules/styled-components')) {
            return 'styled-components';
          }

          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})