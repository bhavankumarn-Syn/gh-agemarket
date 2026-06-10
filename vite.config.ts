import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  base: "/gh-agemarket",
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        process: true,
      },
    }),
  ],

  preview: {
    port: 3000,
    host: true,
    allowedHosts: true
  },

  server: {
    port: 5174,
    strictPort: false, // allows 5174, 5175, etc.
    allowedHosts: true
  },
})
