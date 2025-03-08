import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import UnoCSS from 'unocss/vite'
import { presetWind, presetIcons } from 'unocss'

export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      presets: [
        presetWind(), // Enables Tailwind-like utilities
        presetIcons()  // Enables icon utilities
      ]
    }),
    viteStaticCopy({
      targets: [
        { src: 'src/manifest.json', dest: '' } // Copy manifest.json to dist/
      ]
    })
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  base: "./"
});
