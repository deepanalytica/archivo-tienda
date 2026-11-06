import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({plugins:[react()],base:'/archivo-tienda/ar-studio/',build:{outDir:'dist',emptyOutDir:true}});