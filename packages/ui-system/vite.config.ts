import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig, Plugin } from 'vite';
import dts from 'vite-plugin-dts';

const preserveUseClient = (): Plugin => {
  return {
    name: 'preserve-use-client',
    enforce: 'post',
    transform(code: string, id: string) {
      if (id.endsWith('.ts') || id.endsWith('.tsx')) {
        return {
          code: `"use client";\n${code}`,
          map: null,
        };
      }
      return null;
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['./src/**/*', './index.ts'], // Specify the paths to include for type declarations
      exclude: ['**/*.test.ts', '**/*.test.tsx', './src/stories/**/*'], // Specify the paths to exclude from type declarations
    }),
    preserveUseClient(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/mixins.scss";`,
      },
    },
  },
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'MyUILibrary',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
