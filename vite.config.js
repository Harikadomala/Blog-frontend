import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  host:'0.0.0.0',
  // eslint-disable-next-line no-undef
  port:parseInt(process.env.PORT) || 5173,
  plugins: [react()],
})
