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
            return 'react'; // Separate React-related libraries into a chunk
          }
          if (id.includes('node_modules/lodash')) {
            return 'lodash'; // Separate lodash into its own chunk
          }
          if (id.includes('node_modules')) {
            return 'vendor'; // Put everything else into the vendor chunk
          }
        },
      },
    },
  },
})