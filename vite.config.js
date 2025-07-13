import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    base: '/VeraCleaningFrontend/', // horrible name why did i pick it bruh
    plugins: [react()],
})