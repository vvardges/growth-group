import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-plugin-tsconfig-paths';


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Check for individual libraries and assign them to specific chunks
          if (id.includes('node_modules/react')) {
            return 'react'; // Separate React-related libraries into a 'react' chunk
          }
          if (id.includes('node_modules/lodash-es')) {
            return 'lodash'; // Separate lodash-es into a 'lodash' chunk
          }
          if (id.includes('node_modules/react-router-dom')) {
            return 'router'; // Separate react-router-dom into a 'router' chunk
          }
          if (id.includes('node_modules/styled-components')) {
            return 'styled-components'; // Separate styled-components into a 'styled-components' chunk
          }

          // If none of the above conditions are matched, bundle in the vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'; // All other third-party dependencies
          }
        },
      },
    },
  },
})