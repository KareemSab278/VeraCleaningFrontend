import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/VeraCleaningFrontend/', // Add this line to specify the base path for GitHub Pages
    plugins: [react()],
})