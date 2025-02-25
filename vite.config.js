import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import Handlebars from 'vite-plugin-handlebars';
import { HotReloadHbs, helpers } from './vite.plugin.js';
import dataHome from './src/data.js';
import data20200606 from './src/blog/posts/plants_2020-06-06.json';

const pageData = {
  '/index.html': dataHome,
  '/blog/plants_2020-06-06.html': data20200606,
  '/about/index.html': {
    title: 'About',
  },
};

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  css: {
    codeSplit: false,
  },
  plugins: [
    ViteMinifyPlugin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
    }),
    Handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        return pageData[pagePath];
      },
      helpers,
    }),
    HotReloadHbs(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
