import {cpSync, existsSync, mkdirSync} from 'node:fs';

import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig} from 'electron-vite';
import {resolve} from 'path';

export default defineConfig({
  main: {
    root: resolve('extension/src/main'),
    build: {
      externalizeDeps: {exclude: ['tree-kill']},
      outDir: resolve('extension_out/main'),
      rolldownOptions: {
        input: resolve('extension/src/main/lynxExtension.ts'),
        output: {entryFileNames: 'mainEntry.cjs', format: 'cjs'},
      },
    },
    plugins: [
      {
        name: 'copy-skills',
        closeBundle() {
          const srcDir = resolve(__dirname, 'node_modules/skills/dist');
          const destDir = resolve(__dirname, '../extension_out/main/skills');
          if (existsSync(srcDir)) {
            mkdirSync(destDir, {recursive: true});
            cpSync(srcDir, destDir, {recursive: true});
            console.log('Successfully copied skills CLI to extension_out/main/skills');
          } else {
            console.error('Could not find skills dist folder at', srcDir);
          }

          const yamlSrcDir = resolve(__dirname, 'node_modules/yaml');
          const yamlDestDir = resolve(__dirname, '../extension_out/main/skills/node_modules/yaml');
          if (existsSync(yamlSrcDir)) {
            mkdirSync(yamlDestDir, {recursive: true});
            cpSync(yamlSrcDir, yamlDestDir, {recursive: true});
            console.log('Successfully copied yaml dependency to extension_out/main/skills/node_modules/yaml');
          } else {
            console.error('Could not find yaml folder at', yamlSrcDir);
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@lynx_common': resolve(__dirname, '..', 'src/common'),
        '@lynx_main': resolve(__dirname, '..', 'src/main'),
      },
    },
  },
  renderer: {
    root: resolve('extension/src/renderer'),
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'extension',
        filename: 'rendererEntry.mjs',
        exposes: {
          Extension: resolve('extension/src/renderer/Extension.tsx'),
        },
        shared: {
          react: {generate: false},
          'react-dom': {generate: false},
          'react-redux': {generate: false},
          '@heroui/react': {generate: false},
          '@heroui/styles': {generate: false},
          'react-aria': {generate: false},
        },
      }),
    ],
    resolve: {
      alias: {
        '@lynx_module': resolve(__dirname, '..', 'module/src'),
        '@lynx_extension': resolve(__dirname, '..', 'extension/src'),
        '@lynx_common': resolve(__dirname, '..', 'src/common'),
        '@lynx': resolve(__dirname, '..', 'src/renderer/mainWindow'),
        '@lynx_shared': resolve(__dirname, '..', 'src/renderer/shared'),
        '@lynx_assets': resolve(__dirname, '..', 'src/renderer/shared/assets'),
      },
    },
    build: {
      outDir: resolve('extension_out/renderer'),
      rolldownOptions: {
        input: resolve('extension/src/renderer/index.html'),
        treeshake: {moduleSideEffects: false},
      },
      assetsDir: '',
      minify: false,
      target: 'esnext',
      cssCodeSplit: false,
      modulePreload: false,
    },
    publicDir: resolve(__dirname, 'extension/src/renderer/Public'),
  },
});
