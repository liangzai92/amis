import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import { fileURLToPath } from 'node:url'
import { jsxScopedCssPlugin } from 'rollup-plugin-jsx-scoped-css'
import svgr from 'vite-plugin-svgr'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const projectRootDir = path.resolve(__dirname)

export default defineConfig({
  plugins: [
    react(),
    jsxScopedCssPlugin(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        svgProps: {
          className: 'icon',
        },
        prettier: false,
        dimensions: false,
      },
    }),
  ],
  server: {
    port: 3300,
  },
  resolve: {
    alias: {
      '@': path.resolve(projectRootDir, 'src'),
    },
  },
})
